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
import { FaqSection } from '../../shared/components/faq-section/faq-section';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ToolCard, FaqSection],
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
      question: 'What is ToolNova?',
      answer:
        'ToolNova is a free, web-based utility platform providing fast, focused tools for text editing, code formatting, image processing, calculations, and conversions. Every utility is designed to run directly in your browser with no installation needed.',
    },
    {
      question: 'Are the tools free to use?',
      answer:
        'Yes. All utilities on ToolNova are 100% free with no hidden charges, paywalls, premium subscriptions, or usage limits.',
    },
    {
      question: 'Do I need an account to use the tools?',
      answer:
        'No registration or sign-up is required. You can access and use every tool immediately without providing an email address or password.',
    },
    {
      question: 'Are files, text, or images uploaded to a server?',
      answer:
        'No. ToolNova tools execute directly in your web browser using client-side JavaScript, the HTML5 Canvas API, and modern browser APIs. Your text, code snippets, and image files remain on your device and are never transmitted to our backend servers.',
    },
    {
      question: 'Which tools work locally on my device?',
      answer:
        'All tools currently available on ToolNova—including the Word Counter, Case Converter, JSON Formatter, JSON Validator, Image Compressor, Image Resizer, QR Code Generator, Percentage Calculator, Age Calculator, and Unit Converter—operate entirely client-side inside your browser session.',
    },
    {
      question: 'Does ToolNova work on mobile phones and tablets?',
      answer:
        'Yes. All tools, responsive controls, buttons, and input fields are optimized to function seamlessly on mobile smartphones, tablets, laptops, and desktop computers.',
    },
    {
      question: 'How can I report an issue or bug?',
      answer:
        'If you encounter unexpected behavior, a calculation error, or a rendering glitch, please email us directly at admobility.in@gmail.com with details about your browser, device, and the issue.',
    },
    {
      question: 'How can I suggest a new tool or feature?',
      answer:
        'We welcome tool requests and feature suggestions! Reach out to us at admobility.in@gmail.com with the tool concept or enhancement you would like to see on ToolNova.',
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
