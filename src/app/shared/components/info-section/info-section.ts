import { Component, input } from '@angular/core';

@Component({
  selector: 'app-info-section',
  templateUrl: './info-section.html',
  styleUrl: './info-section.scss',
})
export class InfoSection {
  readonly heading = input.required<string>();
}
