import { Component, OnInit, computed, inject, signal } from '@angular/core';
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

@Component({
  selector: 'app-word-counter',
  imports: [
    FormsModule,
    ToolPageLayout,
    InfoSection,
    FaqSection,
    RelatedTools,
    RelatedGuides,
    AdSlot,
    ResetButton,
  ],
  templateUrl: './word-counter.html',
  styleUrl: './word-counter.scss',
})
export class WordCounter implements OnInit {
  private readonly tool = getToolBySlug('word-counter')!;
  readonly relatedTools = getRelatedTools(this.tool);
  readonly relevantGuides = getGuidesByToolSlug('word-counter');
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

  readonly readingTimeMinutes = computed(() => {
    const count = this.words();
    if (count === 0) return 0;
    return Math.max(1, Math.ceil(count / 225));
  });

  readonly faqItems = [
    {
      question: 'How does this tool calculate the total word count?',
      answer:
        'Words are calculated by tokenizing text on whitespace delimiters (spaces, tabs, and line breaks). Sequences of characters connected by hyphens (e.g., "state-of-the-art") are counted as a single word according to standard typographic conventions.',
    },
    {
      question: 'What is the difference between total characters and characters without spaces?',
      answer:
        'Total characters include every single keystroke, including spaces, tabs, and newline characters. Characters without spaces strip all whitespace before counting, which is useful for publishers or academic portals that evaluate pure textual length.',
    },
    {
      question: 'Is my text transmitted to a server or stored in a database?',
      answer:
        'No. ToolNova executes 100% of the counting logic client-side directly in your browser JavaScript runtime. Your writing never leaves your computer or phone.',
    },
    {
      question: 'How is reading time calculated?',
      answer:
        'Reading time is calculated using the standard average adult reading speed of 225 words per minute. For technical or complex texts, actual comprehension time may be slightly longer.',
    },
    {
      question: 'Can I check text written in other languages or alphabets?',
      answer:
        'Yes. The tool natively supports UTF-8 and Unicode characters, making it effective for English, Spanish, French, German, Hindi, Japanese, and any other language written in the browser.',
    },
  ];

  private readonly toolPageSeo = inject(ToolPageSeoService);

  ngOnInit(): void {
    this.toolPageSeo.init(this.tool, this.breadcrumbItems, this.faqItems);
  }

  reset(): void {
    this.text.set('');
  }
}
