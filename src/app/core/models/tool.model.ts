export type ToolCategory =
  | 'text'
  | 'developer'
  | 'image'
  | 'calculator'
  | 'pdf'
  | 'qr'
  | 'converter';

export interface CategoryDefinition {
  slug: ToolCategory;
  name: string;
  description: string;
  icon: string;
  route: string;
}

export interface ToolDefinition {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  route: string;
  keywords: string[];
  featured?: boolean;
}
