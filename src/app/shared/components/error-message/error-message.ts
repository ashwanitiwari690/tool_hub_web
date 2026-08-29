import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `
    @if (message()) {
      <p class="error-message" role="alert">{{ message() }}</p>
    }
  `,
  styleUrl: './error-message.scss',
})
export class ErrorMessage {
  readonly message = input<string>('');
}
