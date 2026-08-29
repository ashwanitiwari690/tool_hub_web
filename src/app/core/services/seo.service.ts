import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SITE_CONFIG } from '../config/site.config';

export interface SeoData {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(data: SeoData): void {
    const fullTitle = data.title.includes(SITE_CONFIG.name)
      ? data.title
      : `${data.title} | ${SITE_CONFIG.name}`;
    const url = `${SITE_CONFIG.websiteUrl}${data.path}`;
    const image = data.ogImage ?? `${SITE_CONFIG.websiteUrl}/og-image.png`;

    this.titleService.setTitle(fullTitle);

    this.setTag('name', 'description', data.description);
    this.setTag('property', 'og:title', fullTitle);
    this.setTag('property', 'og:description', data.description);
    this.setTag('property', 'og:url', url);
    this.setTag('property', 'og:image', image);
    this.setTag('property', 'og:type', 'website');
    this.setTag('name', 'twitter:card', 'summary_large_image');
    this.setTag('name', 'twitter:title', fullTitle);
    this.setTag('name', 'twitter:description', data.description);

    this.setCanonical(url);
    this.setStructuredData([]);
  }

  /**
   * Replaces all JSON-LD structured data on the page. Call after `update()` on pages that
   * have schema to contribute (breadcrumbs, FAQ, tool metadata, guide steps). Pages that don't
   * call this end up with none, since `update()` clears any schema left over from the previous
   * route.
   */
  setStructuredData(schemas: (Record<string, unknown> | null)[]): void {
    this.document.querySelectorAll('script[data-toolnova-ld]').forEach((el) => el.remove());
    schemas
      .filter((schema): schema is Record<string, unknown> => schema !== null)
      .forEach((schema, index) => {
        const script = this.document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-toolnova-ld', String(index));
        script.text = JSON.stringify(schema);
        this.document.head.appendChild(script);
      });
  }

  private setTag(attr: 'name' | 'property', key: string, content: string): void {
    this.meta.updateTag({ [attr]: key, content });
  }

  private setCanonical(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
