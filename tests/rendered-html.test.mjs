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
  assert.match(html, /images\/real\/hero-counter\.webp/);
  assert.match(html, /images\/brand\/logo-new-black\.webp/);
  assert.match(html, /images\/brand\/logo-vertical-black\.webp/);
  assert.match(html, /ふかひれコース/);
  assert.match(html, /鮑コース/);
  assert.match(html, /佛跳牆コース/);
  assert.match(html, /熊掌コース/);
  assert.match(html, /¥3,980/);
  assert.match(html, /¥19,800/);
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
  assert.match(html, /alt="長亭のカウンター席"/);
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
  assert.match(css, /\.rail-title i \{[^}]*width: 2px;[^}]*height: 84px;/s);
});
