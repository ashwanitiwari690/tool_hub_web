import { Component, input } from '@angular/core';
import { ToolDefinition } from '../../../core/models/tool.model';
import { ToolCard } from '../tool-card/tool-card';

@Component({
  selector: 'app-related-tools',
  imports: [ToolCard],
  templateUrl: './related-tools.html',
  styleUrl: './related-tools.scss',
})
export class RelatedTools {
  readonly tools = input.required<ToolDefinition[]>();
  readonly heading = input('Related Tools');
}
