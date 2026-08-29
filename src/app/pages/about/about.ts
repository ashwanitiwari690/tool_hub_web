import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../core/config/site.config';
import { SeoService } from '../../core/services/seo.service';
import { buildBreadcrumbSchema } from '../../core/services/structured-data.util';
import { Breadcrumb } from '../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-about',
  imports: [Breadcrumb, RouterLink],
  templateUrl: './about.html',
})
export class About implements OnInit {
  readonly siteConfig = SITE_CONFIG;
  readonly breadcrumbItems = [{ label: 'Home', route: '/' }, { label: 'About' }];

  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'About',
      description: `Learn what ${SITE_CONFIG.name} is and why it exists.`,
      path: '/about',
    });
    this.seo.setStructuredData([buildBreadcrumbSchema(this.breadcrumbItems)]);
  }
}
