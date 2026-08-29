import {
  Component,
  ElementRef,
  HostListener,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToolDefinition } from '../../../core/models/tool.model';
import { searchTools } from '../../../core/data/tools.data';
import { RecentToolsService } from '../../../core/services/recent-tools.service';
import { SearchOverlayService } from '../../../core/services/search-overlay.service';

@Component({
  selector: 'app-tool-search',
  templateUrl: './tool-search.html',
  styleUrl: './tool-search.scss',
})
export class ToolSearch {
  private readonly router = inject(Router);
  private readonly recentTools = inject(RecentToolsService);
  private readonly injector = inject(Injector);
  readonly overlay = inject(SearchOverlayService);

  readonly query = signal('');
  readonly activeIndex = signal(0);

  readonly results = computed<ToolDefinition[]>(() => searchTools(this.query()));

  private readonly input = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly isOpen = this.overlay.isOpen;

  @HostListener('window:keydown', ['$event'])
  onGlobalKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.open();
    } else if (event.key === 'Escape' && this.isOpen()) {
      this.close();
    }
  }

  open(): void {
    this.overlay.open();
    this.activeIndex.set(0);
    // The search input only exists in the DOM once the `@if` block renders after `isOpen`
    // flips, so focusing it requires waiting for that render rather than the current microtask.
    afterNextRender(() => this.input()?.nativeElement.focus(), { injector: this.injector });
  }

  close(): void {
    this.overlay.close();
    this.query.set('');
  }

  onQueryChange(value: string): void {
    this.query.set(value);
    this.activeIndex.set(0);
  }

  onKeydown(event: KeyboardEvent): void {
    const items = this.results();
    if (!items.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex.set((this.activeIndex() + 1) % items.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex.set((this.activeIndex() - 1 + items.length) % items.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.selectTool(items[this.activeIndex()]);
    }
  }

  selectTool(tool: ToolDefinition): void {
    this.recentTools.record(tool.slug);
    this.router.navigateByUrl(tool.route);
    this.close();
  }
}
