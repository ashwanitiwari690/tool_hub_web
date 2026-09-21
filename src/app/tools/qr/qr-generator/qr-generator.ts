import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getToolBySlug, getRelatedTools } from '../../../core/data/tools.data';
import { ToolPageSeoService } from '../../../core/services/tool-page-seo.service';
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
      question: 'Do QR codes created on ToolNova ever expire?',
      answer:
        'No. These are clean static QR codes. The encoded data is directly represented in the black-and-white matrix dots, meaning they work indefinitely without depending on any redirect server or subscription.',
    },
    {
      question: 'Is my Wi-Fi password or private URL sent to a server?',
      answer:
        'Never. The QR code is generated 100% locally in your web browser using client-side JavaScript. Your Wi-Fi network credentials, passwords, and URLs never leave your device.',
    },
    {
      question: 'How does a Wi-Fi QR code work when scanned by a phone?',
      answer:
        'Scanning a Wi-Fi QR code with a modern iOS or Android camera parses standard Wi-Fi protocol markers, prompting the user with a single-tap button to automatically join the network without typing passwords.',
    },
    {
      question: 'What is the recommended minimum print size for a QR code?',
      answer:
        'For business cards and flyers scanned at arm\'s length, print QR codes at a minimum size of 2 &times; 2 cm (0.8 &times; 0.8 inches). For posters or billboards, scale the code proportionally to viewing distance.',
    },
    {
      question: 'Can I use these QR codes for commercial products and marketing?',
      answer:
        'Yes. All QR codes generated here are 100% royalty-free and unrestricted for commercial packaging, restaurant menus, signage, and personal projects.',
    },
  ];

  private readonly toolPageSeo = inject(ToolPageSeoService);

  ngOnInit(): void {
    this.toolPageSeo.init(this.tool, this.breadcrumbItems, this.faqItems);
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
      this.error.set('Please enter the required information before generating.');
      return;
    }

    this.processing.set(true);
    this.error.set('');
    try {
      const QRCode = await import('qrcode');
      const dataUrl = await QRCode.toDataURL(content, { width: 340, margin: 2 });
      this.qrDataUrl.set(dataUrl);
    } catch {
      this.error.set('Something went wrong while generating the QR code. Please check your input.');
    } finally {
      this.processing.set(false);
    }
  }

  download(): void {
    if (!this.qrDataUrl()) return;
    const link = document.createElement('a');
    link.href = this.qrDataUrl();
    link.download = 'toolnova-qrcode.png';
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
