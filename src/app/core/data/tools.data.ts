import { ToolDefinition } from '../models/tool.model';

/**
 * Central tool registry. Adding a new tool requires only:
 * 1. An entry here.
 * 2. A lazy route in app.routes.ts.
 * 3. The tool component itself.
 */
export const TOOLS: ToolDefinition[] = [
  {
    slug: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences and paragraphs instantly.',
    category: 'text',
    icon: 'text',
    route: '/tools/word-counter',
    keywords: ['word count', 'character count', 'text length'],
    featured: true,
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text to uppercase, lowercase, title case and more.',
    category: 'text',
    icon: 'text',
    route: '/tools/case-converter',
    keywords: ['uppercase', 'lowercase', 'title case', 'sentence case'],
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and beautify JSON online for free.',
    category: 'developer',
    icon: 'code',
    route: '/tools/json-formatter',
    keywords: ['json', 'format', 'beautify', 'pretty print'],
    featured: true,
  },
  {
    slug: 'json-validator',
    name: 'JSON Validator',
    description: 'Validate JSON syntax and find errors instantly.',
    category: 'developer',
    icon: 'code',
    route: '/tools/json-validator',
    keywords: ['json', 'validate', 'syntax check'],
  },
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress images in your browser without losing quality.',
    category: 'image',
    icon: 'image',
    route: '/tools/image-compressor',
    keywords: ['compress image', 'reduce image size', 'optimize image'],
    featured: true,
  },
  {
    slug: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize images to exact dimensions in your browser.',
    category: 'image',
    icon: 'image',
    route: '/tools/image-resizer',
    keywords: ['resize image', 'image dimensions', 'scale image'],
  },
  {
    slug: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for links, text and Wi-Fi for free.',
    category: 'qr',
    icon: 'qr',
    route: '/tools/qr-generator',
    keywords: ['qr code', 'generate qr', 'qr generator'],
    featured: true,
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, increases and decreases quickly.',
    category: 'calculator',
    icon: 'calculator',
    route: '/tools/percentage-calculator',
    keywords: ['percentage', 'percent calculator'],
    featured: true,
  },
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months and days.',
    category: 'calculator',
    icon: 'calculator',
    route: '/tools/age-calculator',
    keywords: ['age calculator', 'date of birth', 'how old am i'],
  },
  {
    slug: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert length, weight, temperature and more.',
    category: 'converter',
    icon: 'converter',
    route: '/tools/unit-converter',
    keywords: ['unit converter', 'length', 'weight', 'temperature'],
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): ToolDefinition[] {
  return TOOLS.filter((tool) => tool.category === category);
}

export function getFeaturedTools(): ToolDefinition[] {
  return TOOLS.filter((tool) => tool.featured);
}

export function getRelatedTools(tool: ToolDefinition, limit = 4): ToolDefinition[] {
  return TOOLS.filter((t) => t.slug !== tool.slug && t.category === tool.category).slice(0, limit);
}

export function searchTools(query: string): ToolDefinition[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return TOOLS.filter(
    (tool) =>
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q)),
  );
}
