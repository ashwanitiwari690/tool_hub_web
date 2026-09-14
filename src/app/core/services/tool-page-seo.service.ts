import { Injectable, inject } from '@angular/core';
import { ToolDefinition } from '../models/tool.model';
import { RecentToolsService } from './recent-tools.service';
import { SeoService } from './seo.service';
import {
  BreadcrumbItem,
  FaqItem,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildSoftwareAppSchema,
} from './structured-data.util';

/**
 * Every tool page needs the same three things on init: record it as a recent
 * tool, set its SEO metadata, and publish its structured data (breadcrumb,
 * FAQ, SoftwareApplication schema). Centralized here instead of duplicated
 * in every tool component's ngOnInit.
 */
@Injectable({ providedIn: 'root' })
export class ToolPageSeoService {
  private readonly seo = inject(SeoService);
  private readonly recentTools = inject(RecentToolsService);

  init(tool: ToolDefinition, breadcrumbItems: BreadcrumbItem[], faqItems: FaqItem[]): void {
    this.recentTools.record(tool.slug);
    this.seo.update({
      title: tool.name,
      description: tool.description,
      path: tool.route,
    });
    this.seo.setStructuredData([
      buildBreadcrumbSchema(breadcrumbItems),
      buildFaqSchema(faqItems),
      buildSoftwareAppSchema(tool),
    ]);
  }
}
