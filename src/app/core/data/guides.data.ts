import { GuideDefinition } from '../models/guide.model';

export const GUIDES: GuideDefinition[] = [
  {
    slug: 'how-to-format-json',
    title: 'How to Format JSON Online',
    description: 'A step-by-step guide to beautifying and validating JSON directly in your browser.',
    updatedDate: '2026-08-01',
    introduction:
      'JSON is easy for machines to read but hard for humans to scan when it arrives minified on a single line. Formatting adds indentation and line breaks so you can spot structure and errors quickly.',
    steps: [
      { title: 'Paste your JSON', detail: 'Copy the JSON text and paste it into the input box on the JSON Formatter tool.' },
      { title: 'Click Format', detail: 'The tool parses your JSON and re-prints it with consistent indentation.' },
      { title: 'Check for errors', detail: 'If the JSON is invalid, the tool tells you so you can fix the syntax before using it.' },
      { title: 'Copy or download', detail: 'Use the Copy button to grab the formatted result, or download it as a .json file.' },
    ],
    faq: [
      {
        question: 'Is my JSON uploaded anywhere?',
        answer: 'No. Formatting happens entirely in your browser using JavaScript — nothing is sent to a server.',
      },
      {
        question: 'What if my JSON has a trailing comma?',
        answer: 'Standard JSON does not allow trailing commas. The formatter will flag this as invalid JSON.',
      },
    ],
    relatedToolSlugs: ['json-formatter', 'json-validator'],
  },
  {
    slug: 'how-to-compress-image',
    title: 'How to Compress an Image Without Losing Quality',
    description: 'Learn how to reduce image file size in your browser before uploading or sharing.',
    updatedDate: '2026-08-01',
    introduction:
      'Large images slow down websites and take up storage. Compressing an image reduces its file size while keeping it visually close to the original.',
    steps: [
      { title: 'Choose your image', detail: 'Drag and drop a JPG, PNG or WebP file onto the Image Compressor tool, or click to browse.' },
      { title: 'Review the preview', detail: 'The tool shows the original size next to the estimated compressed size.' },
      { title: 'Adjust quality if needed', detail: 'Lower the quality slider for a smaller file, or raise it to keep more detail.' },
      { title: 'Download the result', detail: 'Save the compressed image directly to your device.' },
    ],
    faq: [
      {
        question: 'Is my image uploaded to a server?',
        answer: 'No. Compression happens locally using the Canvas API in your browser.',
      },
      {
        question: 'Which formats are supported?',
        answer: 'JPG, PNG and WebP are supported for compression.',
      },
    ],
    relatedToolSlugs: ['image-compressor', 'image-resizer'],
  },
  {
    slug: 'how-to-create-qr-code',
    title: 'How to Create a QR Code for Free',
    description: 'Generate a scannable QR code for a link, text or Wi-Fi network in seconds.',
    updatedDate: '2026-08-01',
    introduction:
      'QR codes make it easy to share a link or piece of text that someone can scan with a phone camera instead of typing it out.',
    steps: [
      { title: 'Choose a QR type', detail: 'Select whether you want to encode a URL, plain text, or Wi-Fi credentials.' },
      { title: 'Enter your content', detail: 'Type or paste the link, text or Wi-Fi details into the input field.' },
      { title: 'Preview the QR code', detail: 'The QR code updates instantly as you type.' },
      { title: 'Download as PNG', detail: 'Save the generated QR code image to use in print or online.' },
    ],
    faq: [
      {
        question: 'Do QR codes expire?',
        answer: 'No. A QR code generated here simply encodes your data — it does not expire or depend on our website.',
      },
    ],
    relatedToolSlugs: ['qr-generator'],
  },
  {
    slug: 'how-to-convert-image-format',
    title: 'How to Convert an Image to a Different Format',
    description: 'Convert images between JPG, PNG and WebP directly in your browser.',
    updatedDate: '2026-08-01',
    introduction:
      'Different situations call for different image formats — PNG for transparency, JPG for photos, WebP for smaller web-friendly files.',
    steps: [
      { title: 'Upload your image', detail: 'Select the image file you want to convert.' },
      { title: 'Pick the target format', detail: 'Choose JPG, PNG or WebP as the output format.' },
      { title: 'Convert', detail: 'The browser re-encodes the image using the Canvas API.' },
      { title: 'Download', detail: 'Save the converted file to your device.' },
    ],
    faq: [
      {
        question: 'Will converting to JPG lose transparency?',
        answer: 'Yes. JPG does not support transparency, so transparent areas will be filled with a background color.',
      },
    ],
    relatedToolSlugs: ['image-compressor', 'image-resizer'],
  },
];

export function getGuideBySlug(slug: string): GuideDefinition | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}
