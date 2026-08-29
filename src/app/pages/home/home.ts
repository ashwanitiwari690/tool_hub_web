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
  readonly guides = GUIDES.slice(0, 3);

  readonly faqItems = [
    {
      question: 'Is ToolNova really free?',
      answer: 'Yes. Every tool on ToolNova is free to use, with no sign-up required.',
    },
    {
      question: 'Do you store my files or data?',
      answer:
        'Most tools process your data directly in your browser and never upload it anywhere. Check each tool page for its specific privacy note.',
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No account is needed. Favorites and recent tools are saved locally in your browser.',
    },
    {
      question: 'Does ToolNova work on mobile?',
      answer: 'Yes, every tool is designed to work comfortably on phones, tablets and desktops.',
    },
  ];

  private readonly seo = inject(SeoService);
  private readonly searchOverlay = inject(SearchOverlayService);

  ngOnInit(): void {
    this.seo.update({
      title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
      description: SITE_CONFIG.description,
      path: '/',
    });
    this.seo.setStructuredData([buildWebsiteSchema(), buildFaqSchema(this.faqItems)]);
  }

  openSearch(): void {
    this.searchOverlay.open();
  }
}
