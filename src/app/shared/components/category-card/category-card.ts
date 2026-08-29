import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryDefinition } from '../../../core/models/tool.model';
import { ToolIcon } from '../tool-icon/tool-icon';

@Component({
  selector: 'app-category-card',
  imports: [RouterLink, ToolIcon],
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss',
})
export class CategoryCard {
  readonly category = input.required<CategoryDefinition>();
}
