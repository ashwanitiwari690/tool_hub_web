import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../../core/config/site.config';
import { SeoService } from '../../../core/services/seo.service';
import { buildBreadcrumbSchema } from '../../../core/services/structured-data.util';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-privacy-policy',
  imports: [Breadcrumb, RouterLink],
  templateUrl: './privacy-policy.html',
})
export class PrivacyPolicy implements OnInit {
  readonly siteConfig = SITE_CONFIG;
  readonly breadcrumbItems = [{ label: 'Home', route: '/' }, { label: 'Privacy Policy' }];

  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Privacy Policy',
      description: `How ${SITE_CONFIG.name} handles your data.`,
      path: '/privacy-policy',
    });
    this.seo.setStructuredData([buildBreadcrumbSchema(this.breadcrumbItems)]);
  }
}
