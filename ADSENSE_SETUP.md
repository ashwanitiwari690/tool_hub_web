# AdSense Setup & Compliance Checklist

This document tracks what should be true of ToolNova before applying for Google AdSense, and
how to turn ads on once approved. **Meeting this checklist does not guarantee AdSense approval**
— approval is entirely at Google's discretion.

## Content quality checklist

- [ ] Every major tool page has genuine explanatory content (what it is, how to use it, an
      example, FAQ) — not just an input and a button.
- [ ] No thin-content or placeholder pages are linked from navigation or the sitemap.
- [ ] All content is original — no copied articles, no fabricated reviews, no fake user counts
      or statistics.
- [ ] Guides genuinely help users complete a task, rather than existing purely to rank in
      search.

## Navigation & structure checklist

- [ ] Header and footer navigation work on every page.
- [ ] No broken links or 404s in navigation, footer, or tool "Related Tools" sections.
- [ ] Breadcrumbs are present and accurate on tool, guide, and category pages.
- [ ] `sitemap.xml` only lists real, working, indexable pages.

## Required pages checklist

- [ ] About page (`/about`) — reviewed, no fabricated company history, awards, or team.
- [ ] Contact page (`/contact`) — a real, monitored email address in `SITE_CONFIG.contactEmail`.
- [ ] Privacy Policy (`/privacy-policy`) — reviewed and updated to reflect the actual
      analytics/ads services in use before launch.
- [ ] Terms (`/terms`) — reviewed.
- [ ] Disclaimer (`/disclaimer`) — reviewed, especially the financial/health calculator caveats.
- [ ] Cookie Policy (`/cookie-policy`) — updated with real cookie details once AdSense (or any
      analytics) is actually enabled.

All four legal pages currently contain clearly-labeled placeholder text and must be reviewed
(ideally by a legal professional) before the site is publicly launched with ads.

## Mobile usability checklist

- [ ] Every page is usable at 360px–430px widths with no horizontal scrolling.
- [ ] Touch targets (buttons, links) are comfortably tappable.
- [ ] Text remains readable without zooming.

## Ad placement checklist

- [ ] Ads never overlap or obscure tool controls or content.
- [ ] Ads are not placed directly next to buttons in a way that could cause accidental clicks.
- [ ] Ad slots have reserved dimensions so they don't shift content when they load (avoids
      layout shift / accidental clicks).
- [ ] No more ads than content on any page.

## Enabling AdSense

1. Get approved for a Google AdSense account.
2. Update `src/app/core/config/ads.config.ts`:
   ```ts
   export const ADS_CONFIG = {
     enabled: true,
     publisherId: 'ca-pub-XXXXXXXXXXXXXXXX', // your real publisher ID
   };
   ```
3. Add the AdSense loader script to `src/index.html`, using `ADS_CONFIG.publisherId` (do not
   hardcode the publisher ID directly in `index.html` — keep it driven by config so it stays in
   one place).
4. Replace the `AdSlot` placeholder markup with real `<ins class="adsbygoogle">` units once
   `ADS_CONFIG.enabled` is `true`.
5. Verify ads render correctly on desktop and mobile, and that Core Web Vitals (especially CLS)
   are not negatively affected — reserve space for ad slots ahead of time.

## Traffic & click policy (non-negotiable)

- Never click your own ads, for any reason, including "testing."
- Never ask users, directly or indirectly, to click ads ("support us by clicking our sponsors,"
  etc.).
- Never reward users (discounts, unlocked content, entries) for clicking or viewing ads.
- Never use bots, click farms, or paid traffic/click-exchange schemes to inflate impressions or
  clicks.
- Never disguise an ad as a tool button, download link, or navigation element.
- Report suspicious click activity to Google if you notice it.

## Ongoing

- Re-review this checklist whenever a new tool or page type is added.
- Re-review the legal pages whenever a new data-collecting service (analytics, ads, etc.) is
  added to the site.
