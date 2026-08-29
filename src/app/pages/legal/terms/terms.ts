import { Component, OnInit, inject } from '@angular/core';
import { SITE_CONFIG } from '../../../core/config/site.config';
import { SeoService } from '../../../core/services/seo.service';
import { buildBreadcrumbSchema } from '../../../core/services/structured-data.util';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-terms',
  imports: [Breadcrumb],
  templateUrl: './terms.html',
})
export class Terms implements OnInit {
  readonly siteConfig = SITE_CONFIG;
  readonly breadcrumbItems = [{ label: 'Home', route: '/' }, { label: 'Terms' }];

  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Terms of Service',
      description: `The terms for using ${SITE_CONFIG.name}.`,
      path: '/terms',
    });
    this.seo.setStructuredData([buildBreadcrumbSchema(this.breadcrumbItems)]);
  }
}
