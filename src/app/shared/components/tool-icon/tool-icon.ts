import { Component, input } from '@angular/core';

/**
 * Minimal inline SVG icon set. Kept dependency-free to avoid pulling in
 * an icon library just for a handful of category glyphs.
 */
@Component({
  selector: 'app-tool-icon',
  templateUrl: './tool-icon.html',
})
export class ToolIcon {
  readonly name = input<string>('text');
}
