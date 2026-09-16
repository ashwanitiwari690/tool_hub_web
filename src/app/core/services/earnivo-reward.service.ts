import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

const EARNIVO_CONFIG = environment.earnivo;

// The query parameter Earnivo appends to this site's URL when it sends a
// visitor here from a Website Promotion campaign. Must match
// VERIFICATION_TOKEN_PARAM in the Earnivo backend
// (website-verification.service.ts) — it is the whole handshake.
const TOKEN_PARAM = 'ev_token';

// sessionStorage, deliberately, not localStorage: the token belongs to one
// visit in one tab. A visitor who closes the tab and comes back tomorrow
// through a fresh Earnivo link should get that new link's token, never a
// stale one left behind on the device.
const TOKEN_KEY = 'earnivo:token';
const CLAIMED_KEY = 'earnivo:claimed';

export type EarnivoRewardState =
  | 'inactive' // no token in this tab — the widget renders nothing
  | 'loading' // validating the token with Earnivo
  | 'waiting' // valid, still counting down the required visit time
  | 'ready' // time is up, the visitor may claim
  | 'claiming'
  | 'claimed'
  | 'error';

interface SessionResponse {
  campaignName: string;
  taskTitle: string;
  rewardAmount: string;
  requiredSeconds: number;
  remainingSeconds: number;
  status: string;
  alreadyCompleted: boolean;
  expired: boolean;
}

interface ConfirmResponse {
  status: string;
  rewardAmount: string | null;
  alreadyCompleted: boolean;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  error?: { code: string; message: string };
}

/**
 * Drives the Earnivo visit-reward widget.
 *
 * The flow, end to end: a visitor taps a Website Promotion task in the
 * Earnivo app, which opens this site with a one-time token in the URL. That
 * token is stashed in sessionStorage (so it survives the visitor browsing
 * around the site) and stripped from the address bar, then validated against
 * Earnivo, which answers with how much longer the visit has to last. Once the
 * countdown reaches zero the widget offers a claim button, and clicking it
 * posts the token back — that call is the only thing that credits the reward.
 *
 * Nothing here is trusted by Earnivo: the countdown below is a UX nicety, and
 * the server independently re-checks how long the visit actually lasted
 * before it credits anything.
 */
@Injectable({ providedIn: 'root' })
export class EarnivoRewardService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly state = signal<EarnivoRewardState>('inactive');
  readonly secondsRemaining = signal(0);
  // The full visit length this campaign asks for, as configured by the agent
  // in Earnivo — kept alongside the countdown so the widget can draw real
  // progress instead of inferring a total from whatever it first saw.
  readonly requiredSeconds = signal(0);
  readonly rewardAmount = signal<string | null>(null);
  readonly campaignName = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  readonly visible = computed(() => this.state() !== 'inactive');

  private readonly pageActive = signal(this.isPageActive());
  // True while a countdown exists but is stalled because the visitor has
  // switched to another app or tab — Earnivo only credits time the visitor
  // actually spent looking at the page, so a backgrounded tab shouldn't keep
  // ticking down toward a reward it isn't earning.
  readonly paused = computed(() => this.state() === 'waiting' && !this.pageActive());

  private token: string | null = null;
  private countdown?: ReturnType<typeof setInterval>;
  private listenersBound = false;

  /**
   * Called once from the reward widget when it mounts. Safe to call on the
   * server (it no-ops) and safe to call twice — a second call while a session
   * is already live is ignored rather than restarting the countdown.
   */
  init(): void {
    if (!this.isBrowser || this.state() !== 'inactive') return;

    if (!EARNIVO_CONFIG.apiKey) {
      // A deployment without an Earnivo key is intentionally silent. The
      // production environment shipped with this project contains the key
      // used by the Website Verification campaign.
      return;
    }

    this.token = this.readToken();
    if (!this.token) return;

    // A visitor who already claimed in this tab shouldn't be offered the
    // button again just because they navigated to another page.
    if (this.readClaimed() === this.token) {
      this.state.set('claimed');
      return;
    }

    this.bindVisibilityListeners();
    this.state.set('loading');
    void this.loadSession(this.token);
  }

  async claim(): Promise<void> {
    if (!this.token || this.state() !== 'ready') return;
    this.state.set('claiming');
    this.errorMessage.set(null);

    try {
      const data = await this.post<ConfirmResponse>('/website-verification/confirm', this.token);
      this.rewardAmount.set(data.rewardAmount ?? this.rewardAmount());
      this.writeClaimed(this.token);
      this.state.set('claimed');
    } catch (error) {
      this.errorMessage.set(this.messageFor(error));
      // Back to 'ready', not 'error': a failed claim (flaky network, a few
      // seconds short) is retryable, and dropping the button would strand the
      // visitor with a reward they earned and cannot take.
      this.state.set('ready');
    }
  }

  dismiss(): void {
    this.stopCountdown();
    this.state.set('inactive');
  }

  private async loadSession(token: string): Promise<void> {
    try {
      const data = await this.post<SessionResponse>('/website-verification/session', token);
      this.campaignName.set(data.campaignName);
      this.rewardAmount.set(data.rewardAmount);

      if (data.alreadyCompleted) {
        this.writeClaimed(token);
        this.state.set('claimed');
        return;
      }
      if (data.expired) {
        this.errorMessage.set('This reward link has expired. Start the task again in the Earnivo app.');
        this.state.set('error');
        return;
      }

      this.requiredSeconds.set(data.requiredSeconds);
      this.secondsRemaining.set(data.remainingSeconds);
      if (data.remainingSeconds <= 0) {
        this.state.set('ready');
        return;
      }
      this.state.set('waiting');
      this.evaluateTimer();
    } catch (error) {
      this.errorMessage.set(this.messageFor(error));
      this.state.set('error');
    }
  }

  /**
   * Starts or stops the countdown interval to match the current state and
   * tab activity, without ever touching secondsRemaining itself. Called
   * whenever either input changes: entering/leaving 'waiting', and every
   * visibilitychange/focus/blur.
   */
  private evaluateTimer(): void {
    const shouldRun = this.state() === 'waiting' && this.pageActive();

    if (shouldRun && !this.countdown) {
      this.countdown = setInterval(() => this.tick(), 1000);
    } else if (!shouldRun && this.countdown) {
      this.stopCountdown();
    }
  }

  private tick(): void {
    const next = this.secondsRemaining() - 1;
    if (next <= 0) {
      this.secondsRemaining.set(0);
      this.stopCountdown();
      this.state.set('ready');
      return;
    }
    this.secondsRemaining.set(next);
  }

  private stopCountdown(): void {
    if (this.countdown) clearInterval(this.countdown);
    this.countdown = undefined;
  }

  private isPageActive(): boolean {
    return this.isBrowser && this.document.visibilityState === 'visible' && this.document.hasFocus();
  }

  /**
   * Bound once, the first time a token is found — so a deployment that never
   * sees an Earnivo visitor never touches these listeners at all. Tracks
   * both visibilitychange (tab switched away) and window focus/blur
   * (switched to another app while this tab stays visible on some OSes),
   * since either alone misses cases the other catches.
   */
  private bindVisibilityListeners(): void {
    if (this.listenersBound || !this.isBrowser) return;
    this.listenersBound = true;

    const view = this.document.defaultView;
    if (!view) return;

    const handleActivityChange = () => {
      this.pageActive.set(this.isPageActive());
      this.evaluateTimer();
    };

    this.document.addEventListener('visibilitychange', handleActivityChange);
    view.addEventListener('focus', handleActivityChange);
    view.addEventListener('blur', handleActivityChange);
  }

  // --- Token plumbing ------------------------------------------------------

  /**
   * Prefers a token in the current URL (a fresh arrival from the Earnivo app)
   * over one already in sessionStorage, so a visitor who comes back through a
   * second campaign link isn't stuck on the first visit's token. The parameter
   * is stripped from the address bar either way: it is a single-use
   * credential, and leaving it in the URL invites it into bookmarks, shared
   * links and referrer headers.
   */
  private readToken(): string | null {
    const url = new URL(this.document.location.href);
    const fromUrl = url.searchParams.get(TOKEN_PARAM);

    if (fromUrl) {
      this.write(TOKEN_KEY, fromUrl);
      url.searchParams.delete(TOKEN_PARAM);
      this.document.defaultView?.history.replaceState({}, '', url.toString());
      return fromUrl;
    }

    return this.read(TOKEN_KEY);
  }

  private readClaimed(): string | null {
    return this.read(CLAIMED_KEY);
  }

  private writeClaimed(token: string): void {
    this.write(CLAIMED_KEY, token);
  }

  // Every sessionStorage access is wrapped, in the same spirit as
  // StorageService: private-mode browsers and storage-blocking settings throw
  // on the very first read, and a reward widget must never be what breaks the
  // page it sits on.
  private read(key: string): string | null {
    try {
      return this.document.defaultView?.sessionStorage.getItem(key) ?? null;
    } catch {
      return null;
    }
  }

  private write(key: string, value: string): void {
    try {
      this.document.defaultView?.sessionStorage.setItem(key, value);
    } catch {
      // Storage unavailable — the visit still works, it just can't survive a
      // navigation to another page on this site.
    }
  }

  private async post<T>(path: string, token: string): Promise<T> {
    const response = await fetch(`${EARNIVO_CONFIG.apiBaseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: EARNIVO_CONFIG.apiKey, token }),
    });

    const body = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;
    if (!response.ok || !body?.success) {
      throw new Error(body?.error?.message ?? 'Could not reach Earnivo. Please try again.');
    }
    return body.data;
  }

  private messageFor(error: unknown): string {
    return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
  }
}
