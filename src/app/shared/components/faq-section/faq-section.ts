import { Component, input } from '@angular/core';

export interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq-section',
  templateUrl: './faq-section.html',
  styleUrl: './faq-section.scss',
})
export class FaqSection {
  readonly items = input.required<FaqItem[]>();
  readonly heading = input('Frequently Asked Questions');
}
