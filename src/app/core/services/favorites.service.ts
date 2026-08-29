import { Injectable, inject, signal } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly storage = inject(StorageService);
  private readonly key = 'favorites';
  readonly favorites = signal<string[]>(this.storage.get<string[]>(this.key, []));

  isFavorite(slug: string): boolean {
    return this.favorites().includes(slug);
  }

  toggle(slug: string): void {
    const current = this.favorites();
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    this.favorites.set(next);
    this.storage.set(this.key, next);
  }
}
