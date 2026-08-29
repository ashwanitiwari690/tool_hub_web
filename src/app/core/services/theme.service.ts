import { DOCUMENT } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from './storage.service';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storage = inject(StorageService);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly mode = signal<ThemeMode>(this.storage.get<ThemeMode>('theme', 'system'));

  private readonly media = this.isBrowser
    ? window.matchMedia?.('(prefers-color-scheme: dark)')
    : undefined;

  constructor() {
    effect(() => {
      const mode = this.mode();
      this.storage.set('theme', mode);
      this.applyTheme(mode);
    });

    this.media?.addEventListener?.('change', () => {
      if (this.mode() === 'system') this.applyTheme('system');
    });
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
  }

  private applyTheme(mode: ThemeMode): void {
    const resolved = mode === 'system' ? (this.media?.matches ? 'dark' : 'light') : mode;
    this.document.documentElement.setAttribute('data-theme', resolved);
  }
}
