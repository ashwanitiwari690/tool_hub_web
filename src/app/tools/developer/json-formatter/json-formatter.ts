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
import { CopyButton } from '../../../shared/components/copy-button/copy-button';
import { DownloadButton } from '../../../shared/components/download-button/download-button';
import { ResultPanel } from '../../../shared/components/result-panel/result-panel';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';

@Component({
  selector: 'app-json-formatter',
  imports: [
    FormsModule,
    ToolPageLayout,
    InfoSection,
    FaqSection,
    RelatedTools,
    AdSlot,
    ResetButton,
    CopyButton,
    DownloadButton,
    ResultPanel,
    ErrorMessage,
  ],
  templateUrl: './json-formatter.html',
  styleUrl: './json-formatter.scss',
})
export class JsonFormatter implements OnInit {
  private readonly tool = getToolBySlug('json-formatter')!;
  readonly relatedTools = getRelatedTools(this.tool);
  readonly breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Developer Tools', route: '/tools/developer' },
    { label: this.tool.name },
  ];

  readonly input = signal('');
  readonly output = signal('');
  readonly error = signal('');

  readonly faqItems = [
    {
      question: 'Is my JSON data uploaded or stored on any server?',
      answer:
        'No. ToolNova performs all parsing, indentation, and minification locally in your web browser using native JavaScript engines. Sensitive tokens, credentials, and API responses never leave your device.',
    },
    {
      question: 'What is the difference between Format and Minify?',
      answer:
        'Format (pretty-print) adds structural line breaks and two-space indentation to make JSON readable for developers. Minify removes all non-essential whitespace, line breaks, and indentation to produce the most compact representation for network transmission.',
    },
    {
      question: 'Why does the tool show a syntax error on my JSON?',
      answer:
        'The JSON specification (RFC 8259) is strictly enforced. Common reasons include trailing commas after the last item, single quotes instead of double quotes, unquoted keys, or unescaped characters within strings.',
    },
    {
      question: 'Can I download the formatted JSON to my computer?',
      answer:
        'Yes. Click the Download button in the result panel to save your formatted or minified output directly as a valid .json file.',
    },
    {
      question: 'Can this tool format large JSON files?',
      answer:
        'Yes. Because processing runs client-side, the tool can handle multi-megabyte payloads limited only by your computer memory.',
    },
  ];

  private readonly toolPageSeo = inject(ToolPageSeoService);

  ngOnInit(): void {
    this.toolPageSeo.init(this.tool, this.breadcrumbItems, this.faqItems);
  }

  format(): void {
    this.transform((parsed) => JSON.stringify(parsed, null, 2));
  }

  minify(): void {
    this.transform((parsed) => JSON.stringify(parsed));
  }

  validate(): void {
    if (!this.input().trim()) {
      this.error.set('Please enter some JSON to validate.');
      this.output.set('');
      return;
    }
    try {
      JSON.parse(this.input());
      this.error.set('');
      this.output.set('Valid JSON ✓ The syntax conforms strictly to RFC 8259 specifications.');
    } catch (e) {
      this.output.set('');
      this.error.set(`Invalid JSON — ${(e as Error).message}`);
    }
  }

  private transform(fn: (parsed: unknown) => string): void {
    if (!this.input().trim()) {
      this.error.set('Please enter some JSON first.');
      this.output.set('');
      return;
    }
    try {
      const parsed = JSON.parse(this.input());
      this.output.set(fn(parsed));
      this.error.set('');
    } catch (e) {
      this.output.set('');
      this.error.set(`Invalid JSON syntax — ${(e as Error).message}`);
    }
  }

  reset(): void {
    this.input.set('');
    this.output.set('');
    this.error.set('');
  }
}
