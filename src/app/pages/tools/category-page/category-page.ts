import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryDefinition, ToolCategory } from '../../../core/models/tool.model';
import { CATEGORIES } from '../../../core/data/categories.data';
import { getToolsByCategory } from '../../../core/data/tools.data';
import { getGuidesByCategory } from '../../../core/data/guides.data';
import { GuideDefinition } from '../../../core/models/guide.model';
import { SeoService } from '../../../core/services/seo.service';
import { buildBreadcrumbSchema, buildFaqSchema } from '../../../core/services/structured-data.util';
import { ToolCard } from '../../../shared/components/tool-card/tool-card';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { FaqSection } from '../../../shared/components/faq-section/faq-section';
import { RelatedGuides } from '../../../shared/components/related-guides/related-guides';

@Component({
  selector: 'app-category-page',
  imports: [RouterLink, ToolCard, Breadcrumb, EmptyState, FaqSection, RelatedGuides],
  templateUrl: './category-page.html',
  styleUrl: './category-page.scss',
})
export class CategoryPage implements OnInit {
  category!: CategoryDefinition;
  tools: ReturnType<typeof getToolsByCategory> = [];
  guides: GuideDefinition[] = [];
  breadcrumbItems: { label: string; route?: string }[] = [];

  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    const slug = this.route.snapshot.data['category'] as ToolCategory;
    this.category = CATEGORIES.find((c) => c.slug === slug)!;
    this.tools = getToolsByCategory(slug);
    this.guides = getGuidesByCategory(slug);

    this.breadcrumbItems = [
      { label: 'Home', route: '/' },
      { label: 'Tools', route: '/tools' },
      { label: this.category.name },
    ];

    this.seo.update({
      title: `${this.category.name} — Free Online Utilities | ToolNova`,
      description: this.category.description,
      path: this.category.route,
    });

    const schemas: (Record<string, unknown> | null)[] = [buildBreadcrumbSchema(this.breadcrumbItems)];
    if (this.category.faqs && this.category.faqs.length > 0) {
      schemas.push(buildFaqSchema(this.category.faqs));
    }
    this.seo.setStructuredData(schemas);
  }
}
