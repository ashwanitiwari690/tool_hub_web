export type ToolCategory =
  | 'text'
  | 'developer'
  | 'image'
  | 'calculator'
  | 'pdf'
  | 'qr'
  | 'converter';

export interface CategoryFaq {
  question: string;
  answer: string;
}

export interface CategoryUseCase {
  title: string;
  description: string;
}

export interface CategoryDefinition {
  slug: ToolCategory;
  name: string;
  description: string;
  icon: string;
  route: string;
  intro?: string;
  whyUseful?: string;
  useCases?: CategoryUseCase[];
  faqs?: CategoryFaq[];
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
