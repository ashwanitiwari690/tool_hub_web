import { SITE_CONFIG } from '../config/site.config';
import { ToolDefinition } from '../models/tool.model';
import { GuideDefinition } from '../models/guide.model';

interface BreadcrumbItem {
  label: string;
  route?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const url = (path: string): string => `${SITE_CONFIG.websiteUrl}${path}`;

export function buildWebsiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.websiteUrl,
    description: SITE_CONFIG.description,
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.route ? { item: url(item.route) } : {}),
    })),
  };
}

export function buildFaqSchema(items: FaqItem[]): Record<string, unknown> | null {
  if (!items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildSoftwareAppSchema(tool: ToolDefinition): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: url(tool.route),
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any (runs in a web browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function buildHowToSchema(guide: GuideDefinition): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.description,
    step: guide.steps.map((step) => ({
      '@type': 'HowToStep',
      name: step.title,
      text: step.detail,
    })),
  };
}
