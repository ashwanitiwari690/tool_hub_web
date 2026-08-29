import { RenderMode, ServerRoute } from '@angular/ssr';
import { GUIDES } from './core/data/guides.data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'guides/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => GUIDES.map((guide) => ({ slug: guide.slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
