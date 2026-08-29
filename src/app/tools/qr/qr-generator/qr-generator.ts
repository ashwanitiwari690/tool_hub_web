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
import { LoadingState } from '../../../shared/components/loading-state/loading-state';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';

type QrType = 'url' | 'text' | 'wifi';
type WifiEncryption = 'WPA' | 'WEP' | 'nopass';

@Component({
  selector: 'app-qr-generator',
  imports: [
    FormsModule,
    ToolPageLayout,
    InfoSection,
    FaqSection,
    RelatedTools,
    AdSlot,
    ResetButton,
    LoadingState,
    ErrorMessage,
  ],
  templateUrl: './qr-generator.html',
  styleUrl: './qr-generator.scss',
})
export class QrGenerator implements OnInit {
  private readonly tool = getToolBySlug('qr-generator')!;
  readonly relatedTools = getRelatedTools(this.tool);
  readonly breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'QR Tools', route: '/tools/qr' },
    { label: this.tool.name },
  ];

  readonly type = signal<QrType>('url');
  readonly urlValue = signal('');
  readonly textValue = signal('');
  readonly wifiSsid = signal('');
  readonly wifiPassword = signal('');
  readonly wifiEncryption = signal<WifiEncryption>('WPA');

  readonly qrDataUrl = signal('');
  readonly processing = signal(false);
  readonly error = signal('');

  readonly faqItems = [
    {
      question: 'Is the QR code generated locally?',
      answer: 'Yes. The QR code is generated entirely in your browser — the content you enter is never sent to a server.',
    },
    {
      question: 'Do QR codes generated here expire?',
      answer: 'No. The QR code simply encodes the text you provide and works for as long as that content is valid.',
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

  setType(type: QrType): void {
    this.type.set(type);
    this.qrDataUrl.set('');
    this.error.set('');
  }

  private buildContent(): string | null {
    switch (this.type()) {
      case 'url': {
        const value = this.urlValue().trim();
        if (!value) return null;
        return /^https?:\/\//i.test(value) ? value : `https://${value}`;
      }
      case 'text':
        return this.textValue().trim() || null;
      case 'wifi': {
        const ssid = this.wifiSsid().trim();
        if (!ssid) return null;
        const encryption = this.wifiEncryption();
        const password = encryption === 'nopass' ? '' : this.wifiPassword();
        return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
      }
    }
  }

  async generate(): Promise<void> {
    const content = this.buildContent();
    if (!content) {
      this.error.set('Please fill in the required fields first.');
      return;
    }

    this.processing.set(true);
    this.error.set('');
    try {
      const QRCode = await import('qrcode');
      const dataUrl = await QRCode.toDataURL(content, { width: 320, margin: 2 });
      this.qrDataUrl.set(dataUrl);
    } catch {
      this.error.set('Something went wrong while generating the QR code. Please try again.');
    } finally {
      this.processing.set(false);
    }
  }

  download(): void {
    if (!this.qrDataUrl()) return;
    const link = document.createElement('a');
    link.href = this.qrDataUrl();
    link.download = 'qr-code.png';
    link.click();
  }

  reset(): void {
    this.urlValue.set('');
    this.textValue.set('');
    this.wifiSsid.set('');
    this.wifiPassword.set('');
    this.qrDataUrl.set('');
    this.error.set('');
  }
}
