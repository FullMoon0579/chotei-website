# Menu, Logo and Guest Notice Implementation Plan

**Goal:** Replace the header/footer logo, present the four supplied menus in price order, and update seating and guest information in all three languages.

**Architecture:** Preserve the existing single-page React site, typography, seasonal gallery, special courses and reservation link. Use optimized full-page menu images for the four cards and a scrollable document view, with localized accessible menu content. Keep source PDFs unchanged.

**Tech Stack:** React, TypeScript, existing CSS, Vinext, Node tests, Poppler and Sharp for asset conversion.

## 1. Assets and source content

- Inspect all four PDF pages and transparent logo.
- Convert menu pages to WebP without cropping; trim only transparent logo margins.
- Add `app/menu-content.ts` with exact Japanese menu content plus English and Chinese translations.

## 2. Interface and guest information

- Update `app/ChoteiSite.tsx`: header/footer signature logo, ordered menu cards (5980/8800/13200/19800), no caption prices, document modal, updated seating and guest notice.
- Update `app/globals.css`: proportional logo sizing, uncropped menu sheets, visible keyboard focus and scrollable document dialog.
- Preserve all unrelated content, contact links, special courses and galleries.

## 3. Verification and handoff

- Update `tests/rendered-html.test.mjs` and add menu/content regression tests, including localized seat counts and cancellation/payment details.
- Run lint and the full test/build command.
- Prepare the validated version for hosting. Ask for approval before updating the publicly accessible site.

## Verification results

- ESLint: passed.
- Production build and all five Node regression tests: passed.
- Strict TypeScript check of the three changed application modules: passed.
- Full-project TypeScript check remains blocked by existing missing Cloudflare runtime declarations in unchanged `db/index.ts` and `worker/index.ts` (`cloudflare:workers`, `Fetcher`, `D1Database`). No database or Worker code was changed.
- All four menu images retain the complete 3:4 pages; the new signature logo retains its alpha channel and proportions.
- Public deployment requires approval; the current live version remains unchanged until then.
