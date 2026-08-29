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
import { CopyButton } from '../../../shared/components/copy-button/copy-button';
import { ResultPanel } from '../../../shared/components/result-panel/result-panel';

type CaseType = 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'snake' | 'kebab';

@Component({
  selector: 'app-case-converter',
  imports: [
    FormsModule,
    ToolPageLayout,
    InfoSection,
    FaqSection,
    RelatedTools,
    AdSlot,
    ResetButton,
    CopyButton,
    ResultPanel,
  ],
  templateUrl: './case-converter.html',
  styleUrl: './case-converter.scss',
})
export class CaseConverter implements OnInit {
  private readonly tool = getToolBySlug('case-converter')!;
  readonly relatedTools = getRelatedTools(this.tool);
  readonly breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Text Tools', route: '/tools/text' },
    { label: this.tool.name },
  ];

  readonly text = signal('');
  readonly result = signal('');

  readonly cases: { type: CaseType; label: string }[] = [
    { type: 'upper', label: 'UPPERCASE' },
    { type: 'lower', label: 'lowercase' },
    { type: 'title', label: 'Title Case' },
    { type: 'sentence', label: 'Sentence case' },
    { type: 'camel', label: 'camelCase' },
    { type: 'snake', label: 'snake_case' },
    { type: 'kebab', label: 'kebab-case' },
  ];

  readonly faqItems = [
    {
      question: 'Does this tool change my original text?',
      answer: 'No, the original input stays untouched. The converted result appears separately so you can compare.',
    },
    {
      question: 'What is the difference between camelCase and snake_case?',
      answer: 'camelCase joins words with no separator and capitalizes each word after the first, while snake_case joins words with underscores.',
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

  convert(type: CaseType): void {
    const input = this.text();
    if (!input) {
      this.result.set('');
      return;
    }

    const words = input.trim().split(/\s+/).filter(Boolean);

    switch (type) {
      case 'upper':
        this.result.set(input.toUpperCase());
        break;
      case 'lower':
        this.result.set(input.toLowerCase());
        break;
      case 'title':
        this.result.set(
          words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '),
        );
        break;
      case 'sentence': {
        const lower = input.toLowerCase();
        this.result.set(lower.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()));
        break;
      }
      case 'camel':
        this.result.set(
          words
            .map((w, i) =>
              i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
            )
            .join(''),
        );
        break;
      case 'snake':
        this.result.set(words.map((w) => w.toLowerCase()).join('_'));
        break;
      case 'kebab':
        this.result.set(words.map((w) => w.toLowerCase()).join('-'));
        break;
    }
  }

  reset(): void {
    this.text.set('');
    this.result.set('');
  }
}
