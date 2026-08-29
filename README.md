# ToolNova

Free Online Tools — Simple, Fast & Private.

ToolNova is a static, client-side-only Angular application that bundles free browser-based
tools for text, developer, image, calculator, PDF, QR and converter tasks. There is no backend
and no database — wherever technically possible, tools process user data directly in the
browser and never upload it anywhere.

## Technology

- Angular 21 (standalone components, zoneless change detection)
- TypeScript 5.9
- SCSS with a centralized design-token system (light/dark/system themes)
- Angular Router with lazy-loaded routes for every page and tool
- Signals for reactive state instead of RxJS where a simple value suffices
- Static prerendering (`@angular/ssr` in static output mode) — every route is built into real,
  pre-rendered HTML at build time, then hydrated by Angular in the browser. There is still no
  Node.js server or backend involved in serving the deployed site.
- Vitest for unit tests
- No backend, no database, no authentication

## Requirements

- Node.js v24.19.0 (or the version already installed on your machine — the project does not
  pin a specific Node version beyond what Angular 21 requires)
- npm 11.x

## Installation

```bash
npm install
```

## Development

```bash
npm start
```

Open `http://localhost:4200/`. The app reloads automatically as you edit source files.

## Running unit tests

```bash
npm test
```

## Build

```bash
npm run build
```

Output is written to `dist/toolnova/browser`. Only this `browser` folder needs to be deployed —
it is a fully static site (real, pre-rendered `index.html` files for every route) and no
Node.js server is required in production, even though the build process itself uses
`@angular/ssr` internally to generate that HTML. Every route gets its own physical folder (e.g.
`tools/json-formatter/index.html`) containing the tool's full, crawlable content — not just an
empty `<app-root>` shell.

## Static deployment

The build output can be deployed to any static host or CDN. Real, prerendered routes are served
directly as static files by any host. Only truly unknown paths (typos, removed pages) need a
fallback, which should point at `index.csr.html` — the client-only app shell that lets Angular's
router render the app's own 404 page instead of silently serving the homepage:

- **Netlify / Cloudflare Pages** — `public/_redirects` (already included, `/* /index.csr.html 200`).
- **Vercel** — `vercel.json` (already included) rewrites unmatched paths to `index.csr.html`.
- **GitHub Pages** — GitHub Pages has no native SPA rewrite support. The common workaround is
  copying `index.csr.html` to `404.html` in the published output so unknown paths fall back to
  the app shell.

## Project structure

```text
src/app/
  core/       config (SITE_CONFIG, ADS_CONFIG), models, data (tool/category/guide registries),
              services (theme, storage, favorites, recent tools, SEO, search overlay)
  shared/     reusable UI components (ToolCard, ToolSearch, AdSlot, FaqSection, etc.)
  layout/     Header, Footer
  pages/      home, tools index/category pages, guides, about, contact, legal pages
  tools/      one folder per tool, grouped by category (text, developer, image, calculator,
              pdf, qr, converter)
```

## Adding a new tool

1. Add an entry to `src/app/core/data/tools.data.ts` (slug, name, description, category, icon,
   route, keywords).
2. Create the tool's component under `src/app/tools/<category>/<tool-slug>/`, following the
   pattern of an existing tool (workspace card, result panel, info sections, FAQ, related tools).
3. Add a lazy route in `src/app/app.routes.ts`:
   ```ts
   {
     path: 'tools/<tool-slug>',
     loadComponent: () => import('./tools/<category>/<tool-slug>/<tool-slug>').then(m => m.YourComponent),
   }
   ```
4. Add the new URL to `public/sitemap.xml`.
5. If the route has a path parameter (like `guides/:slug`), add it to
   `src/app/app.routes.server.ts` with a `getPrerenderParams` entry so the build knows to
   prerender every value, not just the pattern.

The tool registry (`tools.data.ts`) automatically drives the homepage's featured/related tools,
category pages, and the global search — no other file needs to change.

## SEO

- **Prerendering**: every route is rendered to full static HTML at build time (see Technology
  above), so crawlers and users get complete content immediately — no JavaScript execution
  needed to see the page.
- **Metadata**: every routed page calls `SeoService.update()` in `ngOnInit` to set a unique
  title, meta description, canonical URL and Open Graph/Twitter tags.
- **Structured data (JSON-LD)**: pages call `SeoService.setStructuredData()` with schema.org
  markup built from the same data already shown on the page (`src/app/core/services/
  structured-data.util.ts`) — `BreadcrumbList` on every page, `FAQPage` on pages with an FAQ
  section, `SoftwareApplication` on every tool page, and `HowTo` on guides. This is what makes
  rich results (FAQ snippets, breadcrumbs, step-by-step results) possible in Google Search —
  whether Google chooses to show them is still up to Google.
- `public/robots.txt` points crawlers at `public/sitemap.xml`, which lists every real page with
  `priority`/`changefreq` hints.
- Update `SITE_CONFIG.websiteUrl` in `src/app/core/config/site.config.ts` and the URLs in
  `sitemap.xml`/`robots.txt` to your real domain before going live — the JSON-LD, canonical
  URLs and Open Graph tags all derive from `SITE_CONFIG.websiteUrl`.
- Add a real `public/og-image.png` (1200×630) before launch — `SeoService` currently points
  `og:image` at that path by default, but no such image ships with the project yet.

### Submitting to Google Search Console

1. Deploy the site to your production domain.
2. Verify domain ownership in [Google Search Console](https://search.google.com/search-console).
3. Submit `https://yourdomain.com/sitemap.xml` under Sitemaps.
4. Monitor the Pages report for indexing issues and fix any reported errors.

Search ranking and indexing speed are controlled by Google and are never guaranteed.

## AdSense

See [ADSENSE_SETUP.md](./ADSENSE_SETUP.md) for the full preparation checklist. In short:
ads are disabled by default (`ADS_CONFIG.enabled = false` in
`src/app/core/config/ads.config.ts`) and `AdSlot` renders a placeholder until you enable them
and add your publisher ID. AdSense approval is never guaranteed.

## PWA

`public/manifest.webmanifest` provides basic installability metadata. Replace the placeholder
favicon-based icon with proper 192×192 and 512×512 PNG icons before relying on "Add to Home
Screen" across all platforms. No service worker / offline caching is included yet; add
`@angular/pwa` if you want offline support.

## Troubleshooting

- **Blank page after deployment**: check that your static host rewrites unknown paths to
  `index.csr.html`, not `index.html` (see Static deployment above) — `index.html` at the root is
  the prerendered homepage, not a generic app shell.
- **A tool doesn't appear in search or on the homepage**: confirm it has an entry in
  `tools.data.ts` — the registry is the single source of truth.
- **Dependency conflicts**: inspect the actual conflicting packages before reaching for
  `--force` or `--legacy-peer-deps`; this project intentionally avoids both.
