import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },

  // Tools index
  {
    path: 'tools',
    loadComponent: () => import('./pages/tools/tools-index/tools-index').then((m) => m.ToolsIndex),
  },

  // Category listing pages
  {
    path: 'tools/text',
    loadComponent: () => import('./pages/tools/category-page/category-page').then((m) => m.CategoryPage),
    data: { category: 'text' },
  },
  {
    path: 'tools/developer',
    loadComponent: () => import('./pages/tools/category-page/category-page').then((m) => m.CategoryPage),
    data: { category: 'developer' },
  },
  {
    path: 'tools/image',
    loadComponent: () => import('./pages/tools/category-page/category-page').then((m) => m.CategoryPage),
    data: { category: 'image' },
  },
  {
    path: 'tools/calculator',
    loadComponent: () => import('./pages/tools/category-page/category-page').then((m) => m.CategoryPage),
    data: { category: 'calculator' },
  },
  {
    path: 'tools/pdf',
    loadComponent: () => import('./pages/tools/category-page/category-page').then((m) => m.CategoryPage),
    data: { category: 'pdf' },
  },
  {
    path: 'tools/qr',
    loadComponent: () => import('./pages/tools/category-page/category-page').then((m) => m.CategoryPage),
    data: { category: 'qr' },
  },
  {
    path: 'tools/converter',
    loadComponent: () => import('./pages/tools/category-page/category-page').then((m) => m.CategoryPage),
    data: { category: 'converter' },
  },

  // Individual tools (Phase 2)
  {
    path: 'tools/word-counter',
    loadComponent: () => import('./tools/text/word-counter/word-counter').then((m) => m.WordCounter),
  },
  {
    path: 'tools/case-converter',
    loadComponent: () => import('./tools/text/case-converter/case-converter').then((m) => m.CaseConverter),
  },
  {
    path: 'tools/json-formatter',
    loadComponent: () =>
      import('./tools/developer/json-formatter/json-formatter').then((m) => m.JsonFormatter),
  },
  {
    path: 'tools/json-validator',
    loadComponent: () =>
      import('./tools/developer/json-validator/json-validator').then((m) => m.JsonValidator),
  },
  {
    path: 'tools/image-compressor',
    loadComponent: () =>
      import('./tools/image/image-compressor/image-compressor').then((m) => m.ImageCompressor),
  },
  {
    path: 'tools/image-resizer',
    loadComponent: () => import('./tools/image/image-resizer/image-resizer').then((m) => m.ImageResizer),
  },
  {
    path: 'tools/qr-generator',
    loadComponent: () => import('./tools/qr/qr-generator/qr-generator').then((m) => m.QrGenerator),
  },
  {
    path: 'tools/percentage-calculator',
    loadComponent: () =>
      import('./tools/calculator/percentage-calculator/percentage-calculator').then(
        (m) => m.PercentageCalculator,
      ),
  },
  {
    path: 'tools/age-calculator',
    loadComponent: () =>
      import('./tools/calculator/age-calculator/age-calculator').then((m) => m.AgeCalculator),
  },
  {
    path: 'tools/unit-converter',
    loadComponent: () =>
      import('./tools/converter/unit-converter/unit-converter').then((m) => m.UnitConverter),
  },

  // Guides
  {
    path: 'guides',
    loadComponent: () => import('./pages/guides/guides-index/guides-index').then((m) => m.GuidesIndex),
  },
  {
    path: 'guides/:slug',
    loadComponent: () => import('./pages/guides/guide-detail/guide-detail').then((m) => m.GuideDetail),
  },

  // Company & legal
  { path: 'about', loadComponent: () => import('./pages/about/about').then((m) => m.About) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact) },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/legal/privacy-policy/privacy-policy').then((m) => m.PrivacyPolicy),
  },
  { path: 'terms', loadComponent: () => import('./pages/legal/terms/terms').then((m) => m.Terms) },
  {
    path: 'disclaimer',
    loadComponent: () => import('./pages/legal/disclaimer/disclaimer').then((m) => m.Disclaimer),
  },
  {
    path: 'cookie-policy',
    loadComponent: () =>
      import('./pages/legal/cookie-policy/cookie-policy').then((m) => m.CookiePolicy),
  },

  { path: '**', loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound) },
];
