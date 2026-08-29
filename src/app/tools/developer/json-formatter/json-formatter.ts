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
      question: 'Is my JSON sent to a server?',
      answer: 'No. Formatting and validation run entirely in your browser using JSON.parse and JSON.stringify.',
    },
    {
      question: 'What does "Minify" do?',
      answer: 'Minify removes all unnecessary whitespace to produce the smallest possible valid JSON output.',
    },
    {
      question: 'Why does formatting fail?',
      answer: 'Formatting fails when the input is not valid JSON — for example, missing quotes, trailing commas, or unbalanced brackets.',
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
      this.output.set('Valid JSON ✓');
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
    } catch {
      this.output.set('');
      this.error.set('Invalid JSON. Please check the input and try again.');
    }
  }

  reset(): void {
    this.input.set('');
    this.output.set('');
    this.error.set('');
  }
}
