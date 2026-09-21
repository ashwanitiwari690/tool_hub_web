export interface GuideStep {
  title: string;
  detail: string;
}

export interface GuideFaqItem {
  question: string;
  answer: string;
}

export interface GuideSection {
  heading: string;
  content: string;
  codeExample?: string;
  tips?: string[];
}

export interface GuideDefinition {
  slug: string;
  title: string;
  description: string;
  updatedDate: string;
  introduction: string;
  sections?: GuideSection[];
  steps: GuideStep[];
  commonMistakes?: string[];
  faq: GuideFaqItem[];
  relatedToolSlugs: string[];
}
