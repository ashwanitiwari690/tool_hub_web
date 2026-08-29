import { Component, OnInit, inject, signal } from '@angular/core';
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

@Component({
  selector: 'app-json-validator',
  imports: [FormsModule, ToolPageLayout, InfoSection, FaqSection, RelatedTools, AdSlot, ResetButton],
  templateUrl: './json-validator.html',
  styleUrl: './json-validator.scss',
})
export class JsonValidator implements OnInit {
  private readonly tool = getToolBySlug('json-validator')!;
  readonly relatedTools = getRelatedTools(this.tool);
  readonly breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Developer Tools', route: '/tools/developer' },
    { label: this.tool.name },
  ];

  readonly input = signal('');
  readonly status = signal<'idle' | 'valid' | 'invalid'>('idle');
  readonly errorMessage = signal('');

  readonly faqItems = [
    {
      question: 'What counts as valid JSON?',
      answer: 'Valid JSON follows the strict JSON specification — double-quoted keys and strings, no trailing commas, and only JSON-supported value types.',
    },
    {
      question: 'Is my data uploaded anywhere?',
      answer: 'No. Validation runs entirely in your browser using the built-in JSON.parse function.',
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

  validate(): void {
    if (!this.input().trim()) {
      this.status.set('idle');
      this.errorMessage.set('');
      return;
    }
    try {
      JSON.parse(this.input());
      this.status.set('valid');
      this.errorMessage.set('');
    } catch (e) {
      this.status.set('invalid');
      this.errorMessage.set((e as Error).message);
    }
  }

  reset(): void {
    this.input.set('');
    this.status.set('idle');
    this.errorMessage.set('');
  }
}
