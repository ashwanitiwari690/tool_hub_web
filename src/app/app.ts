import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { ToolSearch } from './shared/components/tool-search/tool-search';
import { ThemeService } from './core/services/theme.service';
import { EarnivoReward } from './shared/components/earnivo-reward/earnivo-reward';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ToolSearch, EarnivoReward],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly theme = inject(ThemeService);
}
