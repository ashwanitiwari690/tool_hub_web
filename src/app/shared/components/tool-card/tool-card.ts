import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToolDefinition } from '../../../core/models/tool.model';
import { FavoritesService } from '../../../core/services/favorites.service';
import { ToolIcon } from '../tool-icon/tool-icon';

@Component({
  selector: 'app-tool-card',
  imports: [RouterLink, ToolIcon],
  templateUrl: './tool-card.html',
  styleUrl: './tool-card.scss',
})
export class ToolCard {
  readonly tool = input.required<ToolDefinition>();

  constructor(readonly favorites: FavoritesService) {}

  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favorites.toggle(this.tool().slug);
  }
}
