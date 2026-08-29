export interface GuideStep {
  title: string;
  detail: string;
}

export interface GuideFaqItem {
  question: string;
  answer: string;
}

export interface GuideDefinition {
  slug: string;
  title: string;
  description: string;
  updatedDate: string;
  introduction: string;
  steps: GuideStep[];
  faq: GuideFaqItem[];
  relatedToolSlugs: string[];
}
