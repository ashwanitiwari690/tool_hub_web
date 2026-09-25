import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getToolBySlug, getRelatedTools } from '../../../core/data/tools.data';
import { getGuidesByToolSlug } from '../../../core/data/guides.data';
import { ToolPageSeoService } from '../../../core/services/tool-page-seo.service';
import { ToolPageLayout } from '../../../shared/components/tool-page-layout/tool-page-layout';
import { InfoSection } from '../../../shared/components/info-section/info-section';
import { FaqSection } from '../../../shared/components/faq-section/faq-section';
import { RelatedTools } from '../../../shared/components/related-tools/related-tools';
import { RelatedGuides } from '../../../shared/components/related-guides/related-guides';
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
    RelatedGuides,
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
  readonly relevantGuides = getGuidesByToolSlug('case-converter');
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
      question: 'Will converting case alter my original text?',
      answer:
        'No. Your input text remains intact in the editor area. The converted result is generated in a dedicated output panel with an instant one-click copy button.',
    },
    {
      question: 'What is the practical difference between camelCase and snake_case?',
      answer:
        'camelCase joins words with no delimiter and capitalizes each word after the first (commonly used for JavaScript/TypeScript variables). snake_case separates words with underscores in lowercase (common in Python, SQL column names, and database fields).',
    },
    {
      question: 'How does Sentence Case determine where a new sentence begins?',
      answer:
        'Sentence case identifies the beginning of the text as well as characters immediately following sentence terminators (. ! ?) and capitalizes the first letter while downcasing the remaining words.',
    },
    {
      question: 'Does Case Converter support accented and international characters?',
      answer:
        'Yes. Standard Unicode transformations are handled natively by your browser JavaScript engine, correctly transforming characters like é, ñ, ü, and accented letters.',
    },
    {
      question: 'Is my text sent to an external server?',
      answer:
        'Never. Case conversion runs 100% locally in your browser memory without transmitting any content over the network.',
    },
  ];

  private readonly toolPageSeo = inject(ToolPageSeoService);

  ngOnInit(): void {
    this.toolPageSeo.init(this.tool, this.breadcrumbItems, this.faqItems);
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
