import { Component, OnInit, inject } from '@angular/core';
import { SITE_CONFIG } from '../../../core/config/site.config';
import { SeoService } from '../../../core/services/seo.service';
import { buildBreadcrumbSchema } from '../../../core/services/structured-data.util';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-cookie-policy',
  imports: [Breadcrumb],
  templateUrl: './cookie-policy.html',
})
export class CookiePolicy implements OnInit {
  readonly siteConfig = SITE_CONFIG;
  readonly breadcrumbItems = [{ label: 'Home', route: '/' }, { label: 'Cookie Policy' }];

  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Cookie Policy',
      description: `How ${SITE_CONFIG.name} uses cookies and local storage.`,
      path: '/cookie-policy',
    });
    this.seo.setStructuredData([buildBreadcrumbSchema(this.breadcrumbItems)]);
  }
}
