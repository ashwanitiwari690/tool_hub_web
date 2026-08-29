import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  template: `<div class="loading-state" role="status">
    <span class="spinner" aria-hidden="true"></span>
    <span>{{ label() }}</span>
  </div>`,
  styleUrl: './loading-state.scss',
})
export class LoadingState {
  readonly label = input('Processing...');
}
