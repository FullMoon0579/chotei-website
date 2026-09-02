# Seasonal Photos and Colors Implementation Plan

**Goal:** Replace the supplied autumn, winter and special-course photos, unify philosophy body text, and set the reservation background to #D8B780.

**Architecture:** Keep the existing React carousel, course dialogs, menu content and layout. Add optimized WebP assets with new descriptive filenames to avoid stale image caches. Preserve the first two seasonal galleries and all unrelated content.

**Tech Stack:** Existing React/TypeScript/CSS/Vinext, Node tests, Sharp for web image conversion.

## 1. Asset preparation

- Read all eleven supplied JPGs from the external drive without changing the originals.
- Convert to WebP with original proportions and a maximum 1800px edge.
- Images 1–4: autumn (vegetables, matsutake/wagyu, prawn/ginkgo, fig soup).
- Images 5–8: winter (matsutake/oxtail soup, chestnut chicken, seafood/vegetables, golden shark fin).
- Images 9–11: abalone, Buddha Jumps Over the Wall, bear-paw course dialogs respectively.
- Ask about the missing twelfth photo; retain the existing shark-fin course image until the user confirms a replacement.

## 2. Minimal source updates

- Modify `app/ChoteiSite.tsx`: update photo arrays and three-language image descriptions. Remove the philosophy paragraph-specific highlight class.
- Modify `app/globals.css`: remove `.philosophy__body .is-highlight`; set `--reservation-gold: #D8B780`.
- Do not change dish lists, menu artwork, reservation notices, carousel timing or layout.

## 3. Verification and handoff

- Update `tests/rendered-html.test.mjs` to assert image order, existence, four images per season, unchanged spring/summer, matching descriptions, unified philosophy text and exact reservation color.
- Run `pnpm run test`, `pnpm run lint`, and a strict TypeScript check of modified application modules.
- Confirm the source remains limited to this request. Save the validated site version; request approval before public deployment.

## Results

- All eleven source JPGs were available and converted successfully; originals were not modified.
- Autumn and winter each reference exactly four new photos in upload order. Spring and summer remain unchanged.
- The three received special-course photos are mapped by dish: abalone, Buddha Jumps Over the Wall, bear paw. The existing shark-fin photo is retained pending clarification about the missing twelfth image.
- Removed the last-paragraph color override; all philosophy body paragraphs inherit #706a63.
- Reservation background is exactly #D8B780 in all languages.
- Production build, all seven regression tests, ESLint and strict TypeScript checks of the application modules passed.
- Public deployment is pending approval.
