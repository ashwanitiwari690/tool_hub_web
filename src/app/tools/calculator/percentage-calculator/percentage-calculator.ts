import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getToolBySlug, getRelatedTools } from '../../../core/data/tools.data';
import { ToolPageSeoService } from '../../../core/services/tool-page-seo.service';
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
      question: 'How do I calculate a percentage increase or decrease?',
      answer:
        'Select "Percentage Change", enter your original initial value in field A, and the updated new value in field B. A positive result indicates a percentage increase, while a negative percentage indicates a decrease.',
    },
    {
      question: 'How do I calculate a retail discount on a product?',
      answer:
        'To find the discount amount, use "What is X% of Y" where X is the discount percentage (e.g., 20%) and Y is the original price. Subtract this answer from the original price to find your final checkout cost.',
    },
    {
      question: 'Can percentages exceed 100%?',
      answer:
        'Yes. When the comparison value is greater than the base value, the percentage is above 100%. For example, 150 is 150% of 100.',
    },
    {
      question: 'What is the difference between percentage points and percent change?',
      answer:
        'Percentage points measure the absolute arithmetic difference between two percentages (e.g., from 10% to 15% is +5 percentage points). Percent change measures the relative growth: (15 - 10) / 10 = +50% growth.',
    },
    {
      question: 'Are my financial calculations saved or sent anywhere?',
      answer:
        'No. Every calculation executes in your browser memory via client-side JavaScript. None of your inputs, prices, or numbers are recorded or sent over the network.',
    },
  ];

  private readonly toolPageSeo = inject(ToolPageSeoService);

  ngOnInit(): void {
    this.toolPageSeo.init(this.tool, this.breadcrumbItems, this.faqItems);
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
