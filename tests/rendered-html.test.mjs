import assert from "node:assert/strict";
import test from "node:test";

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
  assert.match(html, /<title>長亭 CHOTEI \| 中華料理と日本酒の邂逅<\/title>/);
  assert.match(html, /長亭由来/);
  assert.match(html, /Chinese Cuisine Meets Japanese Sake/);
  assert.match(html, /id="cuisine"/);
  assert.match(html, /id="sake"/);
  assert.match(html, /id="reservation"/);
  assert.match(html, /twitter:card/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("includes accessible navigation and primary actions", async () => {
  const html = await (await render()).text();
  assert.match(html, /aria-label="主要导航"/);
  assert.match(html, /href="#origin"/);
  assert.match(html, /href="#reservation"/);
  assert.match(html, /mailto:reservation@chotei\.jp/);
  assert.match(html, /aria-label="温かい木のカウンターがある長亭の空間"/);
});
