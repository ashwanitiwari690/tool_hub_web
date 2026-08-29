import { Component, input } from '@angular/core';
import { Breadcrumb, BreadcrumbItem } from '../breadcrumb/breadcrumb';

@Component({
  selector: 'app-tool-page-layout',
  imports: [Breadcrumb],
  templateUrl: './tool-page-layout.html',
  styleUrl: './tool-page-layout.scss',
})
export class ToolPageLayout {
  readonly breadcrumbItems = input.required<BreadcrumbItem[]>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
