import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished CHOTEI site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="ja">/);
  assert.match(html, /<title>長亭 CHOTEI \| 中国料理の技で、四季を奏でる<\/title>/);
  assert.match(html, /長亭由来/);
  assert.match(html, /Where Chinese Cuisine Meets Japanese Seasons/);
  assert.match(html, /id="cuisine"/);
  assert.match(html, /id="menus"/);
  assert.match(html, /id="store"/);
  assert.match(html, /id="information"/);
  assert.match(html, /id="reservation"/);
  assert.match(html, /twitter:card/);
  assert.match(html, /og\.webp/);
  assert.match(html, /images\/real\/hero-private-dining\.webp/);
  assert.match(html, /images\/real\/ingredient-spring-01\.webp/);
  assert.match(html, /images\/brand\/logo-new-black\.webp/);
  assert.match(html, /images\/brand\/logo-vertical-black\.webp/);
  assert.match(html, /ふかひれコース/);
  assert.match(html, /鮑コース/);
  assert.match(html, /佛跳牆コース/);
  assert.match(html, /熊掌コース/);
  assert.match(html, /¥3,980/);
  assert.match(html, /¥19,800/);
  assert.match(html, /長亭のコースはすべて事前予約制です/);
  assert.match(html, /class="priced-courses"/);
  assert.match(html, /class="special-courses"/);
  assert.match(html, /images\/real\/course-3980\.jpg/);
  assert.match(html, /images\/real\/course-8800\.jpg/);
  assert.match(html, /images\/real\/course-13200\.jpg/);
  assert.match(html, /images\/real\/course-19800\.jpg/);
  assert.doesNotMatch(html, /五里に短亭、|十里に長亭。|融合ではなく、対話。|要予約/);
  assert.doesNotMatch(html, /gallery-arrow|gallery-dots|<figcaption>/);
  assert.doesNotMatch(html, /IKYU RESTAURANT|ROPPONGI, TOKYO|>ORIGIN</);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("includes accessible navigation and primary actions", async () => {
  const html = await (await render()).text();
  assert.match(html, /aria-label="Primary navigation"/);
  assert.match(html, /href="#origin"/);
  assert.match(html, /href="#store"/);
  assert.match(html, /href="#reservation"/);
  assert.match(html, /href="https:\/\/restaurant\.ikyu\.com\/149159"/);
  assert.match(html, /お客様へのお知らせ/);
  assert.match(html, /href="https:\/\/www\.google\.com\/maps\/place\/%E9%95%B7%E4%BA%AD\+CHOTEI\//);
  assert.match(html, /href="tel:\+815031013945"/);
  assert.match(html, /alt="長亭の個室"/);
});

test("uses the refined Mincho font, notice modal, and animated scroll guide", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const source = await readFile(new URL("../app/ChoteiSite.tsx", import.meta.url), "utf8");
  const font = await readFile(new URL("../public/fonts/ShipporiMincho-Regular.woff2", import.meta.url));
  assert.match(css, /ShipporiMincho-Regular\.woff2/);
  assert.match(css, /font-family: "Shippori Mincho"/);
  assert.match(css, /font-weight: 300/);
  assert.ok(font.byteLength > 100_000);
  assert.match(source, /className="customer-notice-button"/);
  assert.match(source, /className="notice-modal" role="dialog" aria-modal="true"/);
  assert.match(source, /ご来店時のお願い/);
  assert.match(source, /ドレスコードについて/);
  assert.match(source, /ご予約方法についてのお知らせ/);
  assert.match(css, /\.notice-modal > article \{[^}]*overflow-y: auto;/s);
  assert.match(css, /@keyframes scrollGuide/);
  assert.match(css, /\.scroll-mark\.is-hidden/);
  assert.match(css, /\.rail-title \{[^}]*flex-direction: column;[^}]*align-items: center;/s);
  assert.match(css, /\.rail-title i \{[^}]*width: 1px;[^}]*height: 80px;[^}]*margin-bottom: 34px;/s);
  assert.match(css, /\.rail-title h2 \{[^}]*flex-direction: column;[^}]*gap: 3px;/s);
  assert.match(source, /characters\.map\(\(character, index\)/);
  assert.match(source, /className=\{`site site--\$\{lang\}`\}/);
  assert.match(source, /上海蟹味噌ふかひれ/);
  assert.match(source, /松茸と牛尾のスープ/);
  assert.match(source, /栗・海鮮・鶏肉の炒飯/);
  assert.match(source, /ingredient-summer-01\.webp/);
  assert.match(source, /ingredient-winter-01\.webp/);
  assert.match(source, /spring: \["筍", "山菜", "桜鯛", "蛍烏賊"\]/);
  assert.match(source, /summer: \["鮎", "雲丹", "鱧", "茄子"\]/);
  assert.match(source, /winter: \["河豚", "白子", "蟹", "牡蠣"\]/);
  assert.match(css, /\.cuisine \{[^}]*min-height: 100svh;/s);
  assert.match(css, /\.hero h1 span, \.origin > h2 span, \.philosophy > h2 span \{ white-space: nowrap; \}/);
  assert.match(css, /\.site--en \.origin > h2 \{[^}]*font-size: clamp\(27px, 2\.5vw, 36px\);/s);
  assert.match(css, /\.site-header \{[^}]*background: rgba\(247, 245, 239, \.9\);/s);
  assert.match(css, /\.site-header\.is-scrolled \{[^}]*background: rgba\(247, 245, 239, \.94\);/s);
  assert.match(css, /\.philosophy \{[^}]*background: var\(--paper-warm\);/s);
  assert.match(css, /\.cuisine__layout \{[^}]*grid-template-columns:/s);
  assert.match(css, /\.cuisine__rail \{[^}]*flex-direction: column;/s);
  assert.match(css, /\.priced-courses:hover \.priced-course \{[^}]*flex-grow: \.94;/s);
  assert.match(css, /\.priced-courses \.priced-course:hover \{[^}]*flex-grow: 1\.18;/s);
  assert.match(css, /\.priced-course:focus \{ outline: 0; \}/);
  assert.match(css, /\.priced-course:focus-visible > b \{[^}]*font-weight: 500;/s);
  assert.match(css, /animation: storeCarousel 27s/);
  assert.doesNotMatch(css, /mix-blend-mode/);
  assert.match(css, /@keyframes storeCarousel/);
  assert.match(css, /--reservation-gold: #c8ae62;/);
  assert.match(css, /\.reservation \{[^}]*place-items: center;/s);
  assert.doesNotMatch(css, /\.reservation__identity[^}]*border-right/);
  assert.match(source, /loading="eager" decoding="async"/);
  assert.doesNotMatch(source, /reservation__identity"><RailTitle[^\n]*BrandMark/);
  assert.doesNotMatch(source, /storeSlide|storeAnimating|CSSProperties/);
});
