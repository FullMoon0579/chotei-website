import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { menuArtwork, menuContent } from "../app/menu-content.ts";
import { guestNoticeContent } from "../app/guest-notice-content.ts";

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
  assert.match(html, /images\/brand\/logo-signature\.webp/);
  assert.match(html, /images\/brand\/logo-vertical-black\.webp/);
  assert.match(html, /ふかひれコース/);
  assert.match(html, /鮑コース/);
  assert.match(html, /佛跳牆コース/);
  assert.match(html, /熊掌コース/);
  assert.match(html, /¥5,980/);
  assert.match(html, /¥19,800/);
  assert.match(html, /長亭のコースはすべて事前予約制です/);
  assert.match(html, /class="priced-courses"/);
  assert.match(html, /class="special-courses"/);
  assert.match(html, /images\/menus\/menu-5980\.webp/);
  assert.match(html, /images\/menus\/menu-8800\.webp/);
  assert.match(html, /images\/menus\/menu-13200\.webp/);
  assert.match(html, /images\/menus\/menu-19800\.webp/);
  assert.match(html, /24席（カウンター4席、テーブル20席）/);
  assert.doesNotMatch(html, /¥3,980|個室 6室/);
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
  assert.match(source, /guidance: guestNoticeContent\.ja/);
  assert.match(source, /section\.items\.map/);
  assert.match(source, /<NoticeText>\{paragraph\}<\/NoticeText>/);
  assert.match(css, /\.notice-modal > article \{[^}]*overflow-y: auto;/s);
  assert.match(css, /@keyframes scrollGuide/);
  assert.match(css, /\.scroll-mark\.is-hidden/);
  assert.match(css, /\.rail-title \{[^}]*flex-direction: column;[^}]*align-items: center;/s);
  assert.match(css, /\.rail-title i \{[^}]*width: 1px;[^}]*height: 80px;[^}]*margin-bottom: 34px;/s);
  assert.match(css, /\.rail-title h2 \{[^}]*flex-direction: column;[^}]*gap: 3px;/s);
  assert.match(source, /characters\.map\(\(character, index\)/);
  assert.match(source, /className=\{`site site--\$\{lang\}`\}/);
  assert.match(source, /上海蟹味噌ふかひれ/);
  assert.match(source, /basic: menuContent\.ja/);
  assert.match(source, /ingredient-summer-01\.webp/);
  assert.match(source, /winter-matsutake-oxtail\.webp/);
  assert.match(source, /spring: \["筍", "山菜", "桜鯛", "蛍烏賊"\]/);
  assert.match(source, /summer: \["鮎", "雲丹", "鱧", "茄子"\]/);
  assert.match(source, /winter: \["松茸と牛尾のスープ", "栗の油淋鶏", "海鮮と季節野菜の炒め", "ふかひれの黄金スープ"\]/);
  assert.match(css, /\.cuisine \{[^}]*min-height: 100svh;/s);
  assert.match(css, /\.hero h1 span, \.origin > h2 span, \.philosophy > h2 span \{ white-space: nowrap; \}/);
  assert.match(css, /\.site--en \.origin > h2 \{[^}]*font-size: clamp\(27px, 2\.5vw, 36px\);/s);
  assert.match(css, /\.site-header \{[^}]*background: rgba\(247, 245, 239, \.9\);/s);
  assert.match(css, /\.site-header\.is-scrolled \{[^}]*background: rgba\(247, 245, 239, \.94\);/s);
  assert.match(css, /\.philosophy \{[^}]*background: var\(--paper-warm\);/s);
  assert.match(css, /\.cuisine__layout \{[^}]*grid-template-columns:/s);
  assert.match(css, /\.cuisine__rail \{[^}]*flex-direction: column;/s);
  assert.match(css, /\.priced-courses \{[^}]*grid-template-columns: repeat\(4, minmax\(0, 1fr\)\);/s);
  assert.match(css, /\.priced-course__image img \{[^}]*object-fit: contain;/s);
  assert.match(css, /\.priced-course:focus \{ outline: 0; \}/);
  assert.match(css, /\.priced-course:focus-visible \{[^}]*outline: 2px solid var\(--gold\);/s);
  assert.doesNotMatch(css, /\.priced-course[^}]*flex-grow/);
  assert.match(css, /\.course-modal--document \.course-modal__image img \{ height: auto; object-fit: contain; \}/);
  assert.match(source, /courseTriggerRef\.current\?\.focus\(\)/);
  assert.match(css, /animation: storeCarousel 27s/);
  assert.doesNotMatch(css, /mix-blend-mode/);
  assert.match(css, /@keyframes storeCarousel/);
  assert.match(css, /--reservation-gold: #D8B780;/);
  assert.match(css, /\.reservation \{[^}]*place-items: center;/s);
  assert.doesNotMatch(css, /\.reservation__identity[^}]*border-right/);
  assert.match(source, /loading="eager" decoding="async"/);
  assert.doesNotMatch(source, /reservation__identity"><RailTitle[^\n]*BrandMark/);
  assert.doesNotMatch(source, /storeSlide|storeAnimating|CSSProperties/);
});

test("shows four complete menu pages in order, without duplicate price captions", async () => {
  const html = await (await render()).text();
  const cards = html.match(/class="priced-courses">([\s\S]*?)<\/div>/)?.[1];
  assert.ok(cards);
  assert.deepEqual([...cards.matchAll(/src="([^"]+)"/g)].map(match => match[1]), menuArtwork);
  assert.equal([...cards.matchAll(/aria-haspopup="dialog"/g)].length, 4);
  assert.doesNotMatch(cards, /<b\b|<figcaption\b|>¥/);
  assert.equal([...html.matchAll(/src="\/images\/brand\/logo-signature.webp"/g)].length, 2);

  for (const language of ["ja", "en", "zh"]) {
    assert.deepEqual(menuContent[language].map(course => course.price), ["¥5,980", "¥8,800", "¥13,200", "¥19,800"]);
    assert.deepEqual(menuContent[language].map(course => course.detail.length), [7, 11, 12, 11]);
    assert.ok(menuContent[language][0].note);
  }
  assert.deepEqual(menuContent.ja.map(course => course.title), ["個園", "網師園", "留園", "長亭"]);
  assert.equal(menuContent.ja[0].detail[3], "辣子鶏");
  assert.ok(menuContent.ja[1].detail.includes("自慢の一本長亭酢豚"));
  assert.ok(menuContent.ja[2].detail.includes("フカヒレ餡かけ御飯"));
  assert.ok(menuContent.ja[3].detail.includes("黒トリュフとキャビアのタリオリーニ"));

  for (const asset of [...menuArtwork, "/images/brand/logo-signature.webp"]) {
    const data = await readFile(new URL(`../public${asset}`, import.meta.url));
    assert.equal(data.toString("ascii", 0, 4), "RIFF");
    assert.equal(data.toString("ascii", 8, 12), "WEBP");
    assert.ok(data.length > 1000);
  }
});

test("replaces guest notices consistently in all three languages", () => {
  assert.deepEqual(guestNoticeContent.ja.map(section => section.title), ["ご来店時のお願い", "キャンセルについて", "ご予約方法について", "お支払いについて"]);
  assert.equal(guestNoticeContent.ja[0].paragraphs.length, 4);
  assert.equal(guestNoticeContent.ja[0].paragraphs[2], "ご予約時間より **30分以上遅れてご来店される場合**、ご到着時点からお料理のご提供を開始いたします。");
  assert.deepEqual(guestNoticeContent.ja[1].items, ["ご予約日前日 00:00以降：**50％**", "当日キャンセル（ご連絡あり）：**100％**", "当日キャンセル（ご連絡なし）：**100％**"]);
  assert.equal(guestNoticeContent.ja[1].note, "※ ご予約いただいたプランに別途キャンセルポリシーが記載されている場合は、プラン内のキャンセルポリシーが優先されます。");
  for (const language of ["ja", "en", "zh"]) {
    const sections = guestNoticeContent[language];
    assert.equal(sections.length, 4);
    assert.equal(sections[1].items.length, 3);
    assert.match(sections[1].items[0], /00:00.*50/);
    assert.match(sections[1].items[1], /100/);
    assert.match(sections[1].items[2], /100/);
    assert.match(sections[3].paragraphs[1], /VISA \/ Master \/ JCB \/ AMEX \/ Diners \/ UnionPay/);
    assert.match(sections[3].paragraphs[2], /PayPay/);
    assert.doesNotMatch(JSON.stringify(sections), /Peccotter|Auto Reserve|ドレスコード|Dress code|着装要求/);
  }
});

test("uses the supplied seasonal and special-course photos in the requested slots", async () => {
  const source = await readFile(new URL("../app/ChoteiSite.tsx", import.meta.url), "utf8");
  const getImages = name => {
    const list = source.match(new RegExp(`${name}: \\[([^\\]]+)\\]`))?.[1];
    assert.ok(list, `${name} image list exists`);
    return [...list.matchAll(/"([^"]+)"/g)].map(match => match[1]);
  };
  assert.deepEqual(getImages("autumn"), ["autumn-vegetables.webp", "autumn-matsutake-wagyu.webp", "autumn-prawn-ginkgo.webp", "autumn-fig-soup.webp"]);
  assert.deepEqual(getImages("winter"), ["winter-matsutake-oxtail.webp", "winter-chestnut-chicken.webp", "winter-seafood-vegetables.webp", "winter-golden-shark-fin.webp"]);
  for (const season of ["spring", "summer"]) {
    assert.deepEqual(getImages(season), [1, 2, 3, 4].map(index => `ingredient-${season}-0${index}.webp`));
  }
  assert.match(source, /const premiumCourseImages = \["winter-fukahire.webp", "special-abalone.webp", "special-buddha-soup.webp", "special-bear-paw.webp"\]/);
  assert.match(source, /autumn: \["季節野菜の炒め", "松茸と和牛", "銀杏と大海老の椒塩仕立て", "無花果のスープ"\]/);
  assert.match(source, /autumn: \["Stir-fried seasonal vegetables", "Matsutake and wagyu", "Salt-and-pepper prawns with ginkgo", "Fig soup"\]/);
  assert.match(source, /autumn: \["炒时蔬", "松茸煎和牛", "椒盐银杏大虾球", "无花果汤"\]/);
  assert.match(source, /winter: \["Matsutake and oxtail soup", "Chestnut crispy chicken", "Stir-fried seafood and seasonal vegetables", "Shark fin in golden broth"\]/);
  assert.match(source, /winter: \["松茸牛尾汤", "栗子油淋鸡", "海鲜时蔬小炒", "金汤鱼翅"\]/);

  const newPhotos = [...getImages("autumn"), ...getImages("winter"), "special-abalone.webp", "special-buddha-soup.webp", "special-bear-paw.webp"];
  for (const filename of newPhotos) {
    const data = await readFile(new URL(`../public/images/real/${filename}`, import.meta.url));
    assert.equal(data.toString("ascii", 0, 4), "RIFF", filename);
    assert.equal(data.toString("ascii", 8, 12), "WEBP", filename);
    assert.ok(data.length > 1000 && data.length < 1_000_000, `${filename} is optimized for the web`);
  }
});

test("keeps philosophy paragraphs one color and uses the requested reservation background", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const source = await readFile(new URL("../app/ChoteiSite.tsx", import.meta.url), "utf8");
  assert.match(css, /\.philosophy__body \{[^}]*color: #706a63;/);
  assert.doesNotMatch(css, /\.philosophy__body \.is-highlight/);
  assert.doesNotMatch(source, /is-highlight/);
  assert.match(css, /--reservation-gold: #D8B780;/);
  assert.match(css, /\.reservation \{[^}]*background: var\(--reservation-gold\);/);
});
