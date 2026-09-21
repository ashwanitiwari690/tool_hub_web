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
      question: 'How accurate are these unit conversions?',
      answer:
        'Conversions use standard international conversion factors (such as the exact 1 inch = 2.54 cm definition) and are rounded to six decimal places for clarity and precision.',
    },
    {
      question: 'Why cannot temperature be converted with a simple multiplier?',
      answer:
        'Unlike length or mass, temperature scales have different zero reference points. For example, 0°C is 32°F, while 0 Kelvin is absolute zero (-273.15°C). Converting temperature requires affine equations: (°C &times; 9/5) + 32 = °F.',
    },
    {
      question: 'What measurement standards are supported?',
      answer:
        'The converter supports the International System of Units (SI Metric), US Customary units, and British Imperial units across length, mass, temperature, and digital data storage.',
    },
    {
      question: 'Can I swap the units with one click?',
      answer:
        'Yes. Click the "⇄ Swap" button to instantly reverse your source and target measurement units without retyping your number.',
    },
    {
      question: 'Is any data transmitted when I convert units?',
      answer:
        'No. Every conversion calculation runs entirely client-side inside your web browser. No figures are recorded or sent to any server.',
    },
  ];

  private readonly toolPageSeo = inject(ToolPageSeoService);

  ngOnInit(): void {
    this.toolPageSeo.init(this.tool, this.breadcrumbItems, this.faqItems);
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
