import { Injectable, inject, signal } from '@angular/core';
import { StorageService } from './storage.service';

const MAX_RECENT = 10;

@Injectable({ providedIn: 'root' })
export class RecentToolsService {
  private readonly storage = inject(StorageService);
  private readonly key = 'recent-tools';
  readonly recent = signal<string[]>(this.storage.get<string[]>(this.key, []));

  record(slug: string): void {
    const next = [slug, ...this.recent().filter((s) => s !== slug)].slice(0, MAX_RECENT);
    this.recent.set(next);
    this.storage.set(this.key, next);
  }
}
