import { Component, input } from '@angular/core';

@Component({
  selector: 'app-result-panel',
  templateUrl: './result-panel.html',
  styleUrl: './result-panel.scss',
})
export class ResultPanel {
  readonly heading = input('Result');
}
