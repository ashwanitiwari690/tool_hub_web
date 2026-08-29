import { Injectable, signal } from '@angular/core';

/**
 * Coordinates opening the global search overlay from multiple entry points
 * (header search box, Ctrl+K shortcut) without duplicating overlay state.
 */
@Injectable({ providedIn: 'root' })
export class SearchOverlayService {
  readonly isOpen = signal(false);

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
