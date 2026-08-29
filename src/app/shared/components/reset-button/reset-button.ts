import { Component, output } from '@angular/core';

@Component({
  selector: 'app-reset-button',
  template: `<button type="button" class="btn btn-ghost" (click)="reset.emit()">Reset</button>`,
})
export class ResetButton {
  readonly reset = output<void>();
}
