import { CategoryDefinition } from '../models/tool.model';

export const CATEGORIES: CategoryDefinition[] = [
  {
    slug: 'text',
    name: 'Text Tools',
    description: 'Count, clean, sort and transform text instantly.',
    icon: 'text',
    route: '/tools/text',
  },
  {
    slug: 'developer',
    name: 'Developer Tools',
    description: 'Format, validate and convert code and data.',
    icon: 'code',
    route: '/tools/developer',
  },
  {
    slug: 'image',
    name: 'Image Tools',
    description: 'Compress, resize and convert images in your browser.',
    icon: 'image',
    route: '/tools/image',
  },
  {
    slug: 'calculator',
    name: 'Calculators',
    description: 'Everyday, financial and health calculators.',
    icon: 'calculator',
    route: '/tools/calculator',
  },
  {
    slug: 'pdf',
    name: 'PDF Tools',
    description: 'Merge, split and convert PDF files locally.',
    icon: 'pdf',
    route: '/tools/pdf',
  },
  {
    slug: 'qr',
    name: 'QR Tools',
    description: 'Generate QR codes for links, text and Wi-Fi.',
    icon: 'qr',
    route: '/tools/qr',
  },
  {
    slug: 'converter',
    name: 'Converters',
    description: 'Convert units, numbers, time and data sizes.',
    icon: 'converter',
    route: '/tools/converter',
  },
];
