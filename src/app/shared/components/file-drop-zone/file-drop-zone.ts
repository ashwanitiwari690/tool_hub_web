import { Component, ElementRef, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-file-drop-zone',
  templateUrl: './file-drop-zone.html',
  styleUrl: './file-drop-zone.scss',
})
export class FileDropZone {
  readonly accept = input('*');
  readonly multiple = input(false);
  readonly hint = input('Drag & drop a file here, or click to browse');

  readonly filesSelected = output<File[]>();

  readonly isDragging = signal(false);
  private readonly fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  openPicker(): void {
    this.fileInput().nativeElement.click();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(): void {
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    const files = event.dataTransfer?.files;
    if (files?.length) this.emitFiles(files);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.emitFiles(input.files);
    input.value = '';
  }

  private emitFiles(files: FileList): void {
    this.filesSelected.emit(this.multiple() ? Array.from(files) : [files[0]]);
  }
}
