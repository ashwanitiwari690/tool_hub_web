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
import { ErrorMessage } from '../../../shared/components/error-message/error-message';

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

@Component({
  selector: 'app-age-calculator',
  imports: [FormsModule, ToolPageLayout, InfoSection, FaqSection, RelatedTools, AdSlot, ResetButton, ErrorMessage],
  templateUrl: './age-calculator.html',
  styleUrl: './age-calculator.scss',
})
export class AgeCalculator implements OnInit {
  private readonly tool = getToolBySlug('age-calculator')!;
  readonly relatedTools = getRelatedTools(this.tool);
  readonly breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Calculators', route: '/tools/calculator' },
    { label: this.tool.name },
  ];

  readonly birthDate = signal('');
  readonly today = new Date().toISOString().split('T')[0];

  readonly error = computed(() => {
    if (!this.birthDate()) return '';
    const date = new Date(this.birthDate());
    if (Number.isNaN(date.getTime())) return 'Please enter a valid date.';
    if (date.getTime() > Date.now()) return 'Date of birth cannot be in the future.';
    return '';
  });

  readonly age = computed<AgeResult | null>(() => {
    if (!this.birthDate() || this.error()) return null;

    const birth = new Date(this.birthDate());
    const now = new Date();

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const daysInPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += daysInPrevMonth;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays };
  });

  readonly faqItems = [
    {
      question: 'How is age calculated here?',
      answer: 'The tool calculates the exact number of years, months and days between your date of birth and today, accounting for varying month lengths.',
    },
    {
      question: 'Is my date of birth stored anywhere?',
      answer: 'No. The calculation happens entirely in your browser and is not saved or sent anywhere.',
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

  reset(): void {
    this.birthDate.set('');
  }
}
