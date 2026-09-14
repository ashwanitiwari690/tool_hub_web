import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getToolBySlug, getRelatedTools } from '../../../core/data/tools.data';
import { ToolPageSeoService } from '../../../core/services/tool-page-seo.service';
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

  private readonly toolPageSeo = inject(ToolPageSeoService);

  ngOnInit(): void {
    this.toolPageSeo.init(this.tool, this.breadcrumbItems, this.faqItems);
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
