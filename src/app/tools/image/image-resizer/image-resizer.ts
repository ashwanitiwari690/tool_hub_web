import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
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
import { FileDropZone } from '../../../shared/components/file-drop-zone/file-drop-zone';
import { LoadingState } from '../../../shared/components/loading-state/loading-state';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';

@Component({
  selector: 'app-image-resizer',
  imports: [
    FormsModule,
    ToolPageLayout,
    InfoSection,
    FaqSection,
    RelatedTools,
    RelatedGuides,
    AdSlot,
    ResetButton,
    FileDropZone,
    LoadingState,
    ErrorMessage,
  ],
  templateUrl: './image-resizer.html',
  styleUrl: './image-resizer.scss',
})
export class ImageResizer implements OnInit, OnDestroy {
  private readonly tool = getToolBySlug('image-resizer')!;
  readonly relatedTools = getRelatedTools(this.tool);
  readonly relevantGuides = getGuidesByToolSlug('image-resizer');
  readonly breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Image Tools', route: '/tools/image' },
    { label: this.tool.name },
  ];

  readonly originalUrl = signal('');
  readonly resultUrl = signal('');
  readonly originalWidth = signal(0);
  readonly originalHeight = signal(0);
  readonly targetWidth = signal(0);
  readonly targetHeight = signal(0);
  readonly lockAspectRatio = signal(true);
  readonly processing = signal(false);
  readonly error = signal('');

  private sourceImage: ImageBitmap | null = null;
  private resultBlob: Blob | null = null;
  private aspectRatio = 1;

  readonly faqItems = [
    {
      question: 'Is my picture uploaded to any remote server?',
      answer:
        'No. Resizing executes 100% locally inside your browser via the HTML5 Canvas API. Your pictures, graphics, and personal photos never leave your device.',
    },
    {
      question: 'Why does keeping "Lock Aspect Ratio" checked matter?',
      answer:
        'Locking the aspect ratio automatically scales height when width changes (or vice versa), preventing your photo from appearing stretched, squashed, or unnaturally distorted.',
    },
    {
      question: 'What happens if I upscale an image to larger dimensions?',
      answer:
        'Downscaling images retains crisp clarity while shrinking file weight. Upscaling a small image into large dimensions stretches existing pixel data, which inevitably results in blurriness or pixelation.',
    },
    {
      question: 'Can I resize images on mobile devices?',
      answer:
        'Yes. ToolNova is fully responsive and leverages the device hardware acceleration in Chrome, Safari, and Firefox on iOS and Android.',
    },
    {
      question: 'What file format is the resized image exported in?',
      answer:
        'The resized image is exported as a clean, high-resolution PNG file, preserving transparency and visual clarity.',
    },
  ];

  private readonly toolPageSeo = inject(ToolPageSeoService);

  ngOnInit(): void {
    this.toolPageSeo.init(this.tool, this.breadcrumbItems, this.faqItems);
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
      this.originalUrl.set(URL.createObjectURL(file));
      this.sourceImage = await createImageBitmap(file);
      this.originalWidth.set(this.sourceImage.width);
      this.originalHeight.set(this.sourceImage.height);
      this.targetWidth.set(this.sourceImage.width);
      this.targetHeight.set(this.sourceImage.height);
      this.aspectRatio = this.sourceImage.width / this.sourceImage.height;
      await this.resize();
    } catch {
      this.error.set('Something went wrong while processing your image. Please try another file.');
    } finally {
      this.processing.set(false);
    }
  }

  onWidthChange(value: number): void {
    this.targetWidth.set(value);
    if (this.lockAspectRatio() && this.aspectRatio > 0) {
      this.targetHeight.set(Math.round(value / this.aspectRatio));
    }
  }

  onHeightChange(value: number): void {
    this.targetHeight.set(value);
    if (this.lockAspectRatio() && this.aspectRatio > 0) {
      this.targetWidth.set(Math.round(value * this.aspectRatio));
    }
  }

  async resize(): Promise<void> {
    if (!this.sourceImage) return;
    const width = this.targetWidth();
    const height = this.targetHeight();
    if (width <= 0 || height <= 0) {
      this.error.set('Width and height must be greater than zero.');
      return;
    }

    this.processing.set(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');
      ctx.drawImage(this.sourceImage, 0, 0, width, height);

      const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('Resize failed');

      if (this.resultUrl()) URL.revokeObjectURL(this.resultUrl());
      this.resultBlob = blob;
      this.resultUrl.set(URL.createObjectURL(blob));
      this.error.set('');
    } catch {
      this.error.set('Something went wrong while resizing your image. Please try another file.');
    } finally {
      this.processing.set(false);
    }
  }

  download(): void {
    if (!this.resultBlob) return;
    const link = document.createElement('a');
    link.href = this.resultUrl();
    link.download = 'resized.png';
    link.click();
  }

  reset(): void {
    this.revokeUrls();
    this.sourceImage = null;
    this.resultBlob = null;
    this.originalWidth.set(0);
    this.originalHeight.set(0);
    this.targetWidth.set(0);
    this.targetHeight.set(0);
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
