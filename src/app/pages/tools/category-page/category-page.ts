import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryDefinition, ToolCategory } from '../../../core/models/tool.model';
import { CATEGORIES } from '../../../core/data/categories.data';
import { getToolsByCategory } from '../../../core/data/tools.data';
import { SeoService } from '../../../core/services/seo.service';
import { buildBreadcrumbSchema } from '../../../core/services/structured-data.util';
import { ToolCard } from '../../../shared/components/tool-card/tool-card';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-category-page',
  imports: [ToolCard, Breadcrumb, EmptyState],
  templateUrl: './category-page.html',
  styleUrl: './category-page.scss',
})
export class CategoryPage implements OnInit {
  category!: CategoryDefinition;
  tools: ReturnType<typeof getToolsByCategory> = [];
  breadcrumbItems: { label: string; route?: string }[] = [];

  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    const slug = this.route.snapshot.data['category'] as ToolCategory;
    this.category = CATEGORIES.find((c) => c.slug === slug)!;
    this.tools = getToolsByCategory(slug);
    this.breadcrumbItems = [
      { label: 'Home', route: '/' },
      { label: 'Tools', route: '/tools' },
      { label: this.category.name },
    ];

    this.seo.update({
      title: this.category.name,
      description: this.category.description,
      path: this.category.route,
    });
    this.seo.setStructuredData([buildBreadcrumbSchema(this.breadcrumbItems)]);
  }
}
