import { Component, OnInit, inject } from '@angular/core';
import { CATEGORIES } from '../../../core/data/categories.data';
import { TOOLS } from '../../../core/data/tools.data';
import { SITE_CONFIG } from '../../../core/config/site.config';
import { SeoService } from '../../../core/services/seo.service';
import { buildBreadcrumbSchema } from '../../../core/services/structured-data.util';
import { ToolCard } from '../../../shared/components/tool-card/tool-card';
import { CategoryCard } from '../../../shared/components/category-card/category-card';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-tools-index',
  imports: [ToolCard, CategoryCard, Breadcrumb],
  templateUrl: './tools-index.html',
  styleUrl: './tools-index.scss',
})
export class ToolsIndex implements OnInit {
  readonly categories = CATEGORIES;
  readonly tools = TOOLS;
  readonly breadcrumbItems = [{ label: 'Home', route: '/' }, { label: 'Tools' }];

  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: `All Tools`,
      description: `Browse every free online tool on ${SITE_CONFIG.name}, organized by category.`,
      path: '/tools',
    });
    this.seo.setStructuredData([buildBreadcrumbSchema(this.breadcrumbItems)]);
  }
}
