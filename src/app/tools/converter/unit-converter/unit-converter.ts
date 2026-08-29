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
import { UNIT_CATEGORIES, TEMPERATURE_UNITS, convertTemperature } from './unit-conversion-data';

@Component({
  selector: 'app-unit-converter',
  imports: [FormsModule, ToolPageLayout, InfoSection, FaqSection, RelatedTools, AdSlot, ResetButton],
  templateUrl: './unit-converter.html',
  styleUrl: './unit-converter.scss',
})
export class UnitConverter implements OnInit {
  private readonly tool = getToolBySlug('unit-converter')!;
  readonly relatedTools = getRelatedTools(this.tool);
  readonly breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Converters', route: '/tools/converter' },
    { label: this.tool.name },
  ];

  readonly categories = [...UNIT_CATEGORIES, { id: 'temperature', label: 'Temperature', units: TEMPERATURE_UNITS }];
  readonly categoryId = signal(this.categories[0].id);
  readonly fromUnit = signal(this.categories[0].units[0].id);
  readonly toUnit = signal(this.categories[0].units[1].id);
  readonly inputValue = signal<number | null>(1);

  readonly currentUnits = computed(() => this.categories.find((c) => c.id === this.categoryId())!.units);

  readonly result = computed<string | null>(() => {
    const value = this.inputValue();
    if (value === null || Number.isNaN(value)) return null;

    if (this.categoryId() === 'temperature') {
      const converted = convertTemperature(value, this.fromUnit(), this.toUnit());
      return this.formatNumber(converted);
    }

    const units = this.currentUnits();
    const from = units.find((u) => u.id === this.fromUnit());
    const to = units.find((u) => u.id === this.toUnit());
    if (!from || !to) return null;

    const converted = (value * from.toBase) / to.toBase;
    return this.formatNumber(converted);
  });

  readonly faqItems = [
    {
      question: 'How accurate are these conversions?',
      answer: 'Conversions use standard, widely accepted conversion factors and are accurate to several decimal places.',
    },
    {
      question: 'Can I convert temperature the same way as length or weight?',
      answer: 'No — temperature scales have different zero points, so Celsius, Fahrenheit and Kelvin are converted using dedicated formulas rather than a simple multiplier.',
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

  onCategoryChange(id: string): void {
    this.categoryId.set(id);
    const units = this.categories.find((c) => c.id === id)!.units;
    this.fromUnit.set(units[0].id);
    this.toUnit.set(units[1]?.id ?? units[0].id);
  }

  swap(): void {
    const from = this.fromUnit();
    this.fromUnit.set(this.toUnit());
    this.toUnit.set(from);
  }

  reset(): void {
    this.inputValue.set(1);
    this.onCategoryChange(this.categories[0].id);
  }

  private formatNumber(value: number): string {
    if (!Number.isFinite(value)) return '—';
    return Number(value.toFixed(6)).toString();
  }
}
