import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GuideDefinition } from '../../../core/models/guide.model';

@Component({
  selector: 'app-related-guides',
  imports: [RouterLink],
  templateUrl: './related-guides.html',
  styleUrl: './related-guides.scss',
})
export class RelatedGuides {
  readonly guides = input.required<GuideDefinition[]>();
  readonly heading = input('Helpful Guides & Tutorials');
}
