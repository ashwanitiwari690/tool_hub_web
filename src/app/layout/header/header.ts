import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SITE_CONFIG } from '../../core/config/site.config';
import { ThemeService, ThemeMode } from '../../core/services/theme.service';
import { SearchOverlayService } from '../../core/services/search-overlay.service';

const MODE_CYCLE: ThemeMode[] = ['light', 'dark', 'system'];
const MODE_ICON: Record<ThemeMode, string> = { light: '☀', dark: '☾', system: '⚙' };

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly siteName = SITE_CONFIG.name;
  readonly mobileMenuOpen = signal(false);
  readonly modeIcon = MODE_ICON;

  constructor(
    readonly theme: ThemeService,
    readonly searchOverlay: SearchOverlayService,
  ) {}

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  cycleTheme(): void {
    const current = this.theme.mode();
    const next = MODE_CYCLE[(MODE_CYCLE.indexOf(current) + 1) % MODE_CYCLE.length];
    this.theme.setMode(next);
  }
}
