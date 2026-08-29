import { Component, OnInit, inject } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { SeoService } from '../../core/services/seo.service';
import { buildBreadcrumbSchema } from '../../core/services/structured-data.util';
import { Breadcrumb } from '../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-contact',
  imports: [Breadcrumb],
  templateUrl: './contact.html',
})
export class Contact implements OnInit {
  readonly siteConfig = SITE_CONFIG;
  readonly breadcrumbItems = [{ label: 'Home', route: '/' }, { label: 'Contact' }];

  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Contact',
      description: `Get in touch with the ${SITE_CONFIG.name} team.`,
      path: '/contact',
    });
    this.seo.setStructuredData([buildBreadcrumbSchema(this.breadcrumbItems)]);
  }
}
