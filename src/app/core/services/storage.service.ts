import { Injectable } from '@angular/core';

/**
 * Single safe entry point for all localStorage access.
 * Never throws: corrupted or unavailable storage degrades to defaults.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly prefix = 'toolnova:';

  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(this.prefix + key);
      if (raw === null) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    } catch {
      // Storage unavailable (private mode, quota exceeded) — fail silently.
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch {
      // ignore
    }
  }
}
