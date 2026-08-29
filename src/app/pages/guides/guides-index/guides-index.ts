import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GUIDES } from '../../../core/data/guides.data';
import { SITE_CONFIG } from '../../../core/config/site.config';
import { SeoService } from '../../../core/services/seo.service';
import { buildBreadcrumbSchema } from '../../../core/services/structured-data.util';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-guides-index',
  imports: [RouterLink, Breadcrumb],
  templateUrl: './guides-index.html',
  styleUrl: './guides-index.scss',
})
export class GuidesIndex implements OnInit {
  readonly guides = GUIDES;
  readonly breadcrumbItems = [{ label: 'Home', route: '/' }, { label: 'Guides' }];

  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Guides',
      description: `Practical, step-by-step guides for getting the most out of ${SITE_CONFIG.name}'s free tools.`,
      path: '/guides',
    });
    this.seo.setStructuredData([buildBreadcrumbSchema(this.breadcrumbItems)]);
  }
}
