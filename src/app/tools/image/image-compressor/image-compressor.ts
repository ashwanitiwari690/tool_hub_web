import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
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
import { FileDropZone } from '../../../shared/components/file-drop-zone/file-drop-zone';
import { LoadingState } from '../../../shared/components/loading-state/loading-state';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';

type OutputFormat = 'image/jpeg' | 'image/webp';

@Component({
  selector: 'app-image-compressor',
  imports: [
    FormsModule,
    DecimalPipe,
    ToolPageLayout,
    InfoSection,
    FaqSection,
    RelatedTools,
    AdSlot,
    ResetButton,
    FileDropZone,
    LoadingState,
    ErrorMessage,
  ],
  templateUrl: './image-compressor.html',
  styleUrl: './image-compressor.scss',
})
export class ImageCompressor implements OnInit, OnDestroy {
  private readonly tool = getToolBySlug('image-compressor')!;
  readonly relatedTools = getRelatedTools(this.tool);
  readonly breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Image Tools', route: '/tools/image' },
    { label: this.tool.name },
  ];

  readonly originalUrl = signal('');
  readonly resultUrl = signal('');
  readonly originalSize = signal(0);
  readonly resultSize = signal(0);
  readonly quality = signal(0.7);
  readonly format = signal<OutputFormat>('image/jpeg');
  readonly processing = signal(false);
  readonly error = signal('');

  private sourceImage: ImageBitmap | null = null;
  private resultBlob: Blob | null = null;

  readonly reductionPercent = () => {
    if (!this.originalSize() || !this.resultSize()) return 0;
    return Math.round((1 - this.resultSize() / this.originalSize()) * 100);
  };

  readonly faqItems = [
    {
      question: 'Is my image uploaded to a server?',
      answer: 'No. Compression uses the Canvas API and runs entirely in your browser — the image never leaves your device.',
    },
    {
      question: 'Why did the file size increase?',
      answer: 'If the original image was already highly compressed, or you chose a high quality setting, the output can occasionally be larger.',
    },
    {
      question: 'Can I compress PNG images?',
      answer: 'You can upload a PNG, but the compressed output is produced as JPEG or WebP, which compress photographic images far more effectively.',
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

  async onFilesSelected(files: File[]): Promise<void> {
    const file = files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.error.set('Please select a valid image file.');
      return;
    }

    this.error.set('');
    this.processing.set(true);
    this.revokeUrls();

    try {
      this.originalSize.set(file.size);
      this.originalUrl.set(URL.createObjectURL(file));
      this.sourceImage = await createImageBitmap(file);
      await this.compress();
    } catch {
      this.error.set('Something went wrong while processing your image. Please try another file.');
    } finally {
      this.processing.set(false);
    }
  }

  async compress(): Promise<void> {
    if (!this.sourceImage) return;
    this.processing.set(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = this.sourceImage.width;
      canvas.height = this.sourceImage.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');
      ctx.drawImage(this.sourceImage, 0, 0);

      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob(resolve, this.format(), this.quality()),
      );
      if (!blob) throw new Error('Compression failed');

      if (this.resultUrl()) URL.revokeObjectURL(this.resultUrl());
      this.resultBlob = blob;
      this.resultSize.set(blob.size);
      this.resultUrl.set(URL.createObjectURL(blob));
    } catch {
      this.error.set('Something went wrong while compressing your image. Please try another file.');
    } finally {
      this.processing.set(false);
    }
  }

  download(): void {
    if (!this.resultBlob) return;
    const link = document.createElement('a');
    link.href = this.resultUrl();
    const ext = this.format() === 'image/webp' ? 'webp' : 'jpg';
    link.download = `compressed.${ext}`;
    link.click();
  }

  reset(): void {
    this.revokeUrls();
    this.sourceImage = null;
    this.resultBlob = null;
    this.originalSize.set(0);
    this.resultSize.set(0);
    this.error.set('');
  }

  ngOnDestroy(): void {
    this.revokeUrls();
  }

  private revokeUrls(): void {
    if (this.originalUrl()) URL.revokeObjectURL(this.originalUrl());
    if (this.resultUrl()) URL.revokeObjectURL(this.resultUrl());
    this.originalUrl.set('');
    this.resultUrl.set('');
  }
}
