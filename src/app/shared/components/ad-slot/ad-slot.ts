import { Component, input } from '@angular/core';
import { ADS_CONFIG } from '../../../core/config/ads.config';

export type AdSlotSize = 'banner' | 'rectangle' | 'sidebar';

const SLOT_HEIGHTS: Record<AdSlotSize, number> = {
  banner: 90,
  rectangle: 250,
  sidebar: 600,
};

@Component({
  selector: 'app-ad-slot',
  templateUrl: './ad-slot.html',
  styleUrl: './ad-slot.scss',
})
export class AdSlot {
  readonly size = input<AdSlotSize>('rectangle');
  readonly adsEnabled = ADS_CONFIG.enabled;

  get height(): number {
    return SLOT_HEIGHTS[this.size()];
  }
}
