import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../core/config/site.config';
import { CATEGORIES } from '../../core/data/categories.data';
import { getFeaturedTools } from '../../core/data/tools.data';
import { GUIDES } from '../../core/data/guides.data';
import { SeoService } from '../../core/services/seo.service';
import { buildFaqSchema, buildWebsiteSchema } from '../../core/services/structured-data.util';
import { SearchOverlayService } from '../../core/services/search-overlay.service';
import { ToolCard } from '../../shared/components/tool-card/tool-card';
import { CategoryCard } from '../../shared/components/category-card/category-card';
import { FaqSection } from '../../shared/components/faq-section/faq-section';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ToolCard, CategoryCard, FaqSection],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  readonly siteConfig = SITE_CONFIG;
  readonly categories = CATEGORIES;
  readonly featuredTools = getFeaturedTools();
  readonly guides = GUIDES.slice(0, 4);

  readonly faqItems = [
    {
      question: 'Is ToolNova completely free to use?',
      answer:
        'Yes. Every tool on ToolNova is 100% free with no hidden charges, trial periods, or mandatory subscriptions.',
    },
    {
      question: 'Are my files, code, or images uploaded to a server?',
      answer:
        'No. ToolNova tools execute directly in your web browser using client-side JavaScript, the HTML5 Canvas API, and modern Web APIs. Your images, code, and text remain on your device and are never sent to our servers.',
    },
    {
      question: 'Do I need to register or create an account?',
      answer:
        'No registration or sign-up is required. You can use any utility instantly, and your preferences (like dark theme and favorite tools) are saved locally on your device.',
    },
    {
      question: 'Does ToolNova work on mobile devices?',
      answer:
        'Yes. All utilities, forms, sliders, and buttons are designed with a responsive layout optimized for smartphones, tablets, laptops, and wide desktop screens.',
    },
    {
      question: 'What image formats can I compress or resize?',
      answer:
        'You can compress and resize standard web image formats including JPG/JPEG, PNG, and WebP directly within your browser.',
    },
    {
      question: 'How do I report a problem or suggest a new tool?',
      answer:
        'You can contact our support team directly via email at admobility.in@gmail.com. We actively review all bug reports and feature requests.',
    },
  ];

  private readonly seo = inject(SeoService);
  private readonly searchOverlay = inject(SearchOverlayService);

  ngOnInit(): void {
    this.seo.update({
      title: `${SITE_CONFIG.name} — Free Online Tools for Everyday Tasks`,
      description:
        'Free, fast, and private online tools for text manipulation, developer debugging, image compression, QR code generation, calculations, and unit conversions.',
      path: '/',
    });
    this.seo.setStructuredData([buildWebsiteSchema(), buildFaqSchema(this.faqItems)]);
  }

  openSearch(): void {
    this.searchOverlay.open();
  }
}
