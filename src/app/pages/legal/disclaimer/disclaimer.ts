import { Component, OnInit, inject } from '@angular/core';
import { SITE_CONFIG } from '../../../core/config/site.config';
import { SeoService } from '../../../core/services/seo.service';
import { buildBreadcrumbSchema } from '../../../core/services/structured-data.util';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-disclaimer',
  imports: [Breadcrumb],
  templateUrl: './disclaimer.html',
})
export class Disclaimer implements OnInit {
  readonly siteConfig = SITE_CONFIG;
  readonly breadcrumbItems = [{ label: 'Home', route: '/' }, { label: 'Disclaimer' }];

  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Disclaimer',
      description: `Limitations and disclaimers for ${SITE_CONFIG.name}'s tools.`,
      path: '/disclaimer',
    });
    this.seo.setStructuredData([buildBreadcrumbSchema(this.breadcrumbItems)]);
  }
}
