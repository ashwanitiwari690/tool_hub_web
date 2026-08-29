import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getToolBySlug, getRelatedTools } from '../../../core/data/tools.data';
import { RecentToolsService } from '../../../core/services/recent-tools.service';
import { SeoService } from '../../../core/services/seo.service';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildSoftwareAppSchema,
} from '../../../core/services/structured-data.util';
import { ToolPageLayout } from '../../../shared/components/tool-page-layout/tool-page-layout';
import { InfoSection } from '../../../shared/components/info-section/info-section';
import { FaqSection } from '../../../shared/components/faq-section/faq-section';
import { RelatedTools } from '../../../shared/components/related-tools/related-tools';
import { AdSlot } from '../../../shared/components/ad-slot/ad-slot';
import { ResetButton } from '../../../shared/components/reset-button/reset-button';

type Mode = 'of' | 'isWhatPercent' | 'change';

@Component({
  selector: 'app-percentage-calculator',
  imports: [FormsModule, ToolPageLayout, InfoSection, FaqSection, RelatedTools, AdSlot, ResetButton],
  templateUrl: './percentage-calculator.html',
  styleUrl: './percentage-calculator.scss',
})
export class PercentageCalculator implements OnInit {
  private readonly tool = getToolBySlug('percentage-calculator')!;
  readonly relatedTools = getRelatedTools(this.tool);
  readonly breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Calculators', route: '/tools/calculator' },
    { label: this.tool.name },
  ];

  readonly mode = signal<Mode>('of');

  readonly a = signal<number | null>(null);
  readonly b = signal<number | null>(null);

  readonly result = computed<string | null>(() => {
    const a = this.a();
    const b = this.b();
    if (a === null || b === null || Number.isNaN(a) || Number.isNaN(b)) return null;

    switch (this.mode()) {
      case 'of':
        return this.formatNumber((a / 100) * b);
      case 'isWhatPercent':
        if (b === 0) return null;
        return `${this.formatNumber((a / b) * 100)}%`;
      case 'change':
        if (a === 0) return null;
        return `${this.formatNumber(((b - a) / Math.abs(a)) * 100)}%`;
    }
  });

  readonly faqItems = [
    {
      question: 'How do I calculate a percentage increase?',
      answer: 'Use "Percentage change", enter the original value first and the new value second. A positive result is an increase, a negative result is a decrease.',
    },
    {
      question: 'What does "X is what % of Y" mean?',
      answer: 'It answers questions like "40 is what percent of 200?" by dividing the first number by the second and multiplying by 100.',
    },
  ];

  private readonly seo = inject(SeoService);
  private readonly recentTools = inject(RecentToolsService);

  ngOnInit(): void {
    this.recentTools.record(this.tool.slug);
    this.seo.update({
      title: this.tool.name,
      description: this.tool.description,
      path: this.tool.route,
    });
    this.seo.setStructuredData([
      buildBreadcrumbSchema(this.breadcrumbItems),
      buildFaqSchema(this.faqItems),
      buildSoftwareAppSchema(this.tool),
    ]);
  }

  setMode(mode: Mode): void {
    this.mode.set(mode);
  }

  reset(): void {
    this.a.set(null);
    this.b.set(null);
  }

  private formatNumber(value: number): string {
    if (!Number.isFinite(value)) return '—';
    return Number(value.toFixed(2)).toString();
  }
}
