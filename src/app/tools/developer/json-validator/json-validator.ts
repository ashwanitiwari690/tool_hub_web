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
      question: 'What standards does this validator check against?',
      answer:
        'This validator checks compliance against the official RFC 8259 standard, which governs valid JSON interchange across all modern languages and web systems.',
    },
    {
      question: 'Are JavaScript object literals accepted as valid JSON?',
      answer:
        'No. JavaScript allows unquoted property keys, single quotes, functions, and trailing commas. Standard JSON strictly prohibits all of these.',
    },
    {
      question: 'Is my data transmitted to any external server during validation?',
      answer:
        'No. All validation executes entirely in your local browser sandbox via native JavaScript parsing engines. Your payloads never leave your computer.',
    },
    {
      question: 'Can this validator identify the exact line where my JSON is broken?',
      answer:
        'Yes. When validation fails, the native parser provides the exact token and position where the syntax breakdown occurred.',
    },
    {
      question: 'What types of values are supported in JSON?',
      answer:
        'JSON supports strings (enclosed in double quotes), numbers (integers and floating-point), booleans (true, false), arrays, objects, and null.',
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
