import { Component, OnInit, computed, inject } from '@angular/core';
import { EarnivoRewardService } from '../../../core/services/earnivo-reward.service';

/**
 * Floating panel shown only to visitors who arrived from an Earnivo Website
 * Promotion campaign — it renders nothing at all for everyone else, and
 * nothing on the server. It counts the required visit down, then offers the
 * claim button that credits the visitor's Earnivo wallet.
 *
 * All of the state lives in EarnivoRewardService rather than here, so the
 * countdown survives navigating between pages of this site: the service is
 * root-provided, this component is just its view.
 */
@Component({
  selector: 'app-earnivo-reward',
  templateUrl: './earnivo-reward.html',
  styleUrl: './earnivo-reward.scss',
})
export class EarnivoReward implements OnInit {
  protected readonly reward = inject(EarnivoRewardService);

  protected readonly formattedRemaining = computed(() => {
    const seconds = this.reward.secondsRemaining();
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, '0')}s`;
  });

  // Measured against the campaign's full required duration, so a visitor who
  // resumes mid-visit sees the bar already part-filled — which is the honest
  // picture, since the time they already spent does count.
  protected readonly progressPercent = computed(() => {
    const required = this.reward.requiredSeconds();
    if (required === 0) return 100;
    return Math.round(((required - this.reward.secondsRemaining()) / required) * 100);
  });

  ngOnInit(): void {
    this.reward.init();
  }
}
