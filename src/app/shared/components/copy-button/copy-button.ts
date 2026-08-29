import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.html',
})
export class CopyButton {
  readonly text = input.required<string>();
  readonly label = input('Copy');

  readonly copied = signal(false);

  async copy(): Promise<void> {
    const value = this.text();
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {
      this.copied.set(false);
    }
  }
}
