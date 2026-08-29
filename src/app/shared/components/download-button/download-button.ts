import { Component, input } from '@angular/core';

@Component({
  selector: 'app-download-button',
  templateUrl: './download-button.html',
})
export class DownloadButton {
  readonly content = input.required<string>();
  readonly fileName = input('download.txt');
  readonly mimeType = input('text/plain');
  readonly label = input('Download');

  download(): void {
    const value = this.content();
    if (!value) return;
    const blob = new Blob([value], { type: this.mimeType() });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = this.fileName();
    link.click();
    URL.revokeObjectURL(url);
  }
}
