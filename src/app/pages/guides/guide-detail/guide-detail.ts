import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuideDefinition } from '../../../core/models/guide.model';
import { getGuideBySlug } from '../../../core/data/guides.data';
import { TOOLS } from '../../../core/data/tools.data';
import { SeoService } from '../../../core/services/seo.service';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildHowToSchema,
} from '../../../core/services/structured-data.util';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { FaqSection } from '../../../shared/components/faq-section/faq-section';
import { RelatedTools } from '../../../shared/components/related-tools/related-tools';

@Component({
  selector: 'app-guide-detail',
  imports: [Breadcrumb, FaqSection, RelatedTools],
  templateUrl: './guide-detail.html',
  styleUrl: './guide-detail.scss',
})
export class GuideDetail implements OnInit {
  guide: GuideDefinition | undefined;
  breadcrumbItems: { label: string; route?: string }[] = [];
  relatedTools: typeof TOOLS = [];

  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.guide = getGuideBySlug(slug);
    if (!this.guide) return;

    this.relatedTools = TOOLS.filter((t) => this.guide!.relatedToolSlugs.includes(t.slug));
    this.breadcrumbItems = [
      { label: 'Home', route: '/' },
      { label: 'Guides', route: '/guides' },
      { label: this.guide.title },
    ];

    this.seo.update({
      title: this.guide.title,
      description: this.guide.description,
      path: `/guides/${this.guide.slug}`,
    });
    this.seo.setStructuredData([
      buildBreadcrumbSchema(this.breadcrumbItems),
      buildHowToSchema(this.guide),
      buildFaqSchema(this.guide.faq),
    ]);
  }
}
