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
    if (Number.isNaN(date.getTime())) return 'Please select a valid calendar date.';
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
      question: 'How does the calculator account for leap years and varying month lengths?',
      answer:
        'The calculator uses JavaScript date primitives that adhere to the standard Gregorian calendar, accurately factoring in leap years (366 days) and the differing month lengths (28, 29, 30, or 31 days) across the elapsed timeline.',
    },
    {
      question: 'Is my date of birth saved or stored on any server?',
      answer:
        'No. Your birth date is processed strictly inside your web browser. Nothing is sent to a backend server, logged, or stored in cookies.',
    },
    {
      question: 'Why does my age in days differ slightly from a simple (years &times; 365) formula?',
      answer:
        'A simple multiplication by 365 ignores leap years (which add an extra leap day every four years) and the exact distribution of calendar days in partial months. Our tool calculates the precise chronological difference between the two dates.',
    },
    {
      question: 'Can I calculate the age of a past historical event or contract?',
      answer:
        'Yes. You can select any historical date from past centuries to calculate the exact chronological elapsed time to today.',
    },
    {
      question: 'Does time zone affect the calculated age?',
      answer:
        'Calculations use your device\'s local system clock and calendar. Entering a date calculates the elapsed span relative to today\'s date in your current time zone.',
    },
  ];

  private readonly toolPageSeo = inject(ToolPageSeoService);

  ngOnInit(): void {
    this.toolPageSeo.init(this.tool, this.breadcrumbItems, this.faqItems);
  }

  reset(): void {
    this.birthDate.set('');
  }
}
