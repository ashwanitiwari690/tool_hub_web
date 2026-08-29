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

@Component({
  selector: 'app-word-counter',
  imports: [FormsModule, ToolPageLayout, InfoSection, FaqSection, RelatedTools, AdSlot, ResetButton],
  templateUrl: './word-counter.html',
  styleUrl: './word-counter.scss',
})
export class WordCounter implements OnInit {
  private readonly tool = getToolBySlug('word-counter')!;
  readonly relatedTools = getRelatedTools(this.tool);
  readonly breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Text Tools', route: '/tools/text' },
    { label: this.tool.name },
  ];

  readonly text = signal('');

  readonly words = computed(() => {
    const trimmed = this.text().trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  });

  readonly characters = computed(() => this.text().length);
  readonly charactersNoSpaces = computed(() => this.text().replace(/\s/g, '').length);

  readonly sentences = computed(() => {
    const trimmed = this.text().trim();
    if (!trimmed) return 0;
    const matches = trimmed.match(/[^.!?]+[.!?]+/g);
    return matches ? matches.length : trimmed.length ? 1 : 0;
  });

  readonly paragraphs = computed(() => {
    const trimmed = this.text().trim();
    return trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length : 0;
  });

  readonly readingTimeMinutes = computed(() => Math.max(1, Math.ceil(this.words() / 200)));

  readonly faqItems = [
    {
      question: 'How is the word count calculated?',
      answer: 'Words are counted by splitting your text on whitespace, so hyphenated words count as one word.',
    },
    {
      question: 'Does this tool store my text?',
      answer: 'No. All counting happens instantly in your browser — your text is never uploaded anywhere.',
    },
    {
      question: 'How is reading time estimated?',
      answer: 'Reading time is estimated at an average of 200 words per minute.',
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

  reset(): void {
    this.text.set('');
  }
}
