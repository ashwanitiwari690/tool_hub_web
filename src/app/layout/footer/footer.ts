import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../core/config/site.config';
import { CATEGORIES } from '../../core/data/categories.data';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly siteConfig = SITE_CONFIG;
  readonly categories = CATEGORIES;
  readonly year = new Date().getFullYear();
}
