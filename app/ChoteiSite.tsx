"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Lang = "ja" | "en" | "zh";
type Season = "spring" | "summer" | "autumn" | "winter";

const seasonalImages: Record<Season, string[]> = {
  spring: ["spring-appetizer.webp", "spring-sakuradai.webp", "spring-seafood.webp"],
  summer: ["summer-vegetables.webp", "summer-shrimp.webp", "summer-dumpling.webp"],
  autumn: ["autumn-matsutake.webp", "autumn-kinmedai.webp", "autumn-sake-fish.webp"],
  winter: ["winter-fukahire.webp", "winter-soup.webp", "winter-wagyu.webp"],
};

const menuImages = ["menu-lunch.webp", "menu-standard.webp", "menu-seasonal.webp", "menu-premium.webp"];
const storeImages = [
  "space-entrance.webp",
  "space-dining-1.webp",
  "space-dining-2.webp",
  "space-dining-3.webp",
  "space-dining-4.webp",
  "space-private.webp",
];

const copy = {
  ja: {
    htmlLang: "ja",
    nav: ["長亭由来", "お料理", "メニュー", "空間", "店舗", "ご予約"],
    hero: { location: "ROPPONGI, TOKYO", line1: "中国料理の技で、", line2: "四季を奏でる", sub: "Where Chinese Cuisine Meets Japanese Seasons" },
    origin: {
      rail: "長亭由来", en: "ORIGIN", lead: "五里に短亭、\n十里に長亭。",
      body: [
        "中国には、古くから伝わる言葉があります。長亭とは、旅の途中で足を休め、大切な人を送り、また迎える場所。",
        "出会いと再会を静かに見守り、人と人を結んできました。私たちは、その想いを「長亭」という名に込めました。",
      ],
    },
    philosophy: {
      rail: "料理哲学", en: "PHILOSOPHY", headline: "融合ではなく、対話。",
      body: [
        "長亭は、中国料理を礎としています。同時に、日本料理が大切にしてきた四季や食材、美意識からも着想を得ています。",
        "中国には「不時不食」、日本には「旬」という考えがあります。表現は異なっても、本当の美味しさは、自然に寄り添い、旬を尊ぶことから生まれる。",
        "中国料理の技法で、日本の四季を映し出す。一皿の中で、二つの食文化が自然に響き合う。それが、長亭の料理です。",
      ],
    },
    cuisine: { rail: "お料理", en: "SEASONAL CUISINE", seasons: { spring: "春", summer: "夏", autumn: "秋", winter: "冬" }, captions: {
      spring: ["季節の前菜", "桜鯛", "春の海鮮炒め"], summer: ["旬野菜の五彩炒め", "海老のトマトソース炒め", "本格手作り水餃子"], autumn: ["松茸と和牛", "金目鯛の姿蒸し", "地酒と金目鯛"], winter: ["ふかひれの姿煮", "羊肚菌の滋養湯", "黒毛和牛の炙り焼き"],
    } },
    menus: {
      rail: "メニュー", en: "COURSES & DRINKS", intro: "昼の定食から季節の晩餐、特別な日のための珍味コースまで。写真を選ぶと内容をご覧いただけます。",
      panels: [
        { title: "昼の定食", meta: "LUNCH · ¥1,200", detail: ["麻婆豆腐飯定食", "自家製担々麺定食", "日替わり定食"] },
        { title: "A / B コース", meta: "¥3,980 / ¥8,800", detail: ["季節の前菜・滋養スープ", "長亭酢豚・旬野菜と海鮮", "点心・食事・本日のデザート・茶"] },
        { title: "C / D コース", meta: "¥13,200 / ¥19,800", detail: ["季節の前菜・金湯ふかひれ", "松茸と和牛・鮑・旬魚", "季節の食事・デザート・果物・茶"] },
        { title: "特別コース", meta: "ADVANCE RESERVATION", detail: ["ふかひれコース", "鮑コース・佛跳牆コース", "熊掌コース・集合コース"] },
      ],
    },
    space: { rail: "空間", en: "THE SPACE", labels: ["入口", "カウンター", "ダイニング", "テーブル席", "主室", "個室"] },
    info: { rail: "店舗", en: "INFORMATION", hours: "営業時間", hoursValue: "11:30–14:30 / 18:00–22:00", closed: "定休日", closedValue: "日曜日・不定休", tel: "電話番号", address: "住所", addressValue: "〒106-0032 東京都港区六本木7-13-9 1F", seats: "座席数", seatsValue: "カウンター 4席 / 個室 6室", map: "地図・アクセス" },
    reservation: { rail: "ご予約", en: "RESERVATION", site: "予約サイト", button: "一休で予約する", notice: "予約時のお願い", rules: "アレルギー、お子様の同伴、遅刻などは事前に店舗へお知らせください。キャンセル規定は予約サイトでご確認ください。", alternative: "空席が見つからない場合は、お電話にてお問い合わせください。" },
    footer: { slogan: "Where Chinese Cuisine Meets Japanese Seasons", notice: "お知らせ", copyright: "© 2026 CHOTEI. All rights reserved." },
  },
  en: {
    htmlLang: "en",
    nav: ["Origin", "Cuisine", "Menus", "Space", "Information", "Reserve"],
    hero: { location: "ROPPONGI, TOKYO", line1: "Chinese technique,", line2: "Japanese seasons", sub: "Where Chinese Cuisine Meets Japanese Seasons" },
    origin: { rail: "Origin", en: "ORIGIN", lead: "A short pavilion at five li,\na long pavilion at ten.", body: ["In ancient China, a changting was a place along the road where travellers rested, loved ones said farewell, and returning friends were welcomed home.", "Quietly watching over meetings and reunions, it connected one person to another. We placed that sentiment in our name: CHOTEI."] },
    philosophy: { rail: "Philosophy", en: "PHILOSOPHY", headline: "Not fusion, but dialogue.", body: ["CHOTEI is grounded in Chinese cuisine, while drawing inspiration from the seasons, ingredients and aesthetic clarity cherished in Japanese cooking.", "China speaks of eating in time; Japan speaks of shun, the precise moment of seasonality. Different expressions share one truth: flavour begins with listening to nature.", "Chinese technique reflects the Japanese seasons. Two culinary cultures resonate clearly within a single plate. This is the cuisine of CHOTEI."] },
    cuisine: { rail: "Cuisine", en: "SEASONAL CUISINE", seasons: { spring: "Spring", summer: "Summer", autumn: "Autumn", winter: "Winter" }, captions: { spring: ["Seasonal appetizer", "Sakura sea bream", "Spring seafood"], summer: ["Five-colour seasonal vegetables", "Prawns in tomato sauce", "Handmade dumplings"], autumn: ["Matsutake and wagyu", "Steamed golden-eye snapper", "Regional sake and snapper"], winter: ["Braised shark fin", "Morel restorative soup", "Seared wagyu"] } },
    menus: { rail: "Menus", en: "COURSES & DRINKS", intro: "From relaxed lunches to seasonal dinners and delicacies reserved for special occasions. Select an image to view each course.", panels: [
      { title: "Lunch Sets", meta: "LUNCH · ¥1,200", detail: ["Mapo tofu rice set", "House tantan noodles", "Daily changing set"] },
      { title: "A / B Courses", meta: "¥3,980 / ¥8,800", detail: ["Seasonal appetizers and restorative soup", "CHOTEI sweet-and-sour pork, seafood and vegetables", "Dim sum, rice, dessert and tea"] },
      { title: "C / D Courses", meta: "¥13,200 / ¥19,800", detail: ["Seasonal appetizers and shark fin", "Matsutake, wagyu, abalone and seasonal fish", "Seasonal rice, dessert, fruit and tea"] },
      { title: "Special Courses", meta: "ADVANCE RESERVATION", detail: ["Shark fin course", "Abalone and Buddha Jumps Over the Wall courses", "Rare delicacy and collection courses"] },
    ] },
    space: { rail: "Space", en: "THE SPACE", labels: ["Entrance", "Counter", "Dining room", "Table seating", "Main room", "Private room"] },
    info: { rail: "Visit", en: "INFORMATION", hours: "Hours", hoursValue: "11:30–14:30 / 18:00–22:00", closed: "Closed", closedValue: "Sundays and irregular holidays", tel: "Telephone", address: "Address", addressValue: "1F, 7-13-9 Roppongi, Minato-ku, Tokyo 106-0032", seats: "Seating", seatsValue: "4 counter seats / 6 private rooms", map: "Map & directions" },
    reservation: { rail: "Reserve", en: "RESERVATION", site: "Reservation site", button: "Reserve on Ikyu", notice: "Before your reservation", rules: "Please tell us in advance about allergies, children or possible late arrival. Cancellation terms are shown on the reservation site.", alternative: "If online availability is limited, please contact us by telephone." },
    footer: { slogan: "Where Chinese Cuisine Meets Japanese Seasons", notice: "News", copyright: "© 2026 CHOTEI. All rights reserved." },
  },
  zh: {
    htmlLang: "zh-CN",
    nav: ["長亭由来", "四季料理", "菜单套餐", "用餐空间", "店铺信息", "预约"],
    hero: { location: "东京 · 六本木", line1: "以中国料理之技，", line2: "奏响日本四季", sub: "Where Chinese Cuisine Meets Japanese Seasons" },
    origin: { rail: "長亭由来", en: "ORIGIN", lead: "五里短亭，\n十里长亭。", body: ["在中国古代，长亭是旅途中停歇的地方，也是送别挚友、迎接归人的所在。", "它静静见证相遇与重逢，将人与人相连。我们把这份心意放进“長亭”之名。"] },
    philosophy: { rail: "料理哲学", en: "PHILOSOPHY", headline: "不是融合，而是对话。", body: ["長亭以中华料理为根基，同时从日本料理珍视的四季、食材与审美中获得启发。", "中国讲“不时不食”，日本讲“旬”。表达不同，却共同相信：真正的美味来自顺应自然、尊重当季。", "以中餐技法映照日本四季，让两种饮食文化在一盘之中清晰回应——这就是長亭的料理。"] },
    cuisine: { rail: "四季料理", en: "SEASONAL CUISINE", seasons: { spring: "春", summer: "夏", autumn: "秋", winter: "冬" }, captions: { spring: ["时令前菜", "樱鲷", "春季海鲜炒"], summer: ["旬野菜五彩炒", "番茄汁炒虾仁", "手工水饺"], autumn: ["松茸与和牛", "清蒸金目鲷", "地酒与金目鲷"], winter: ["红烧鱼翅", "羊肚菌滋养汤", "炙烤黑毛和牛"] } },
    menus: { rail: "菜单套餐", en: "COURSES & DRINKS", intro: "从轻松午餐、四季晚宴到为特别时刻准备的珍品套餐。选择图片查看内容。", panels: [
      { title: "午间定食", meta: "LUNCH · ¥1,200", detail: ["麻婆豆腐饭套餐", "自家制担担面套餐", "每日更替套餐"] },
      { title: "A / B 套餐", meta: "¥3,980 / ¥8,800", detail: ["季节前菜与滋补汤", "長亭酢豚、旬野菜与海鲜", "点心、主食、甜点与茶"] },
      { title: "C / D 套餐", meta: "¥13,200 / ¥19,800", detail: ["季节前菜与金汤鱼翅", "松茸和牛、鲍鱼与旬鱼", "季节主食、甜点、水果与茶"] },
      { title: "高级套餐", meta: "需提前预约", detail: ["鱼翅套餐", "鲍鱼套餐与佛跳墙套餐", "熊掌套餐与集合套餐"] },
    ] },
    space: { rail: "用餐空间", en: "THE SPACE", labels: ["入口", "吧台", "用餐区", "餐桌席", "主厅", "包间"] },
    info: { rail: "店铺", en: "INFORMATION", hours: "营业时间", hoursValue: "11:30–14:30 / 18:00–22:00", closed: "休息日", closedValue: "周日及不定休", tel: "电话", address: "地址", addressValue: "〒106-0032 日本东京都港区六本木7-13-9 1F", seats: "座席", seatsValue: "吧台4席 / 包间6间", map: "地图与路线" },
    reservation: { rail: "预约", en: "RESERVATION", site: "预约网站", button: "前往一休预约", notice: "预约注意事项", rules: "如有过敏、儿童同行或可能迟到，请提前告知店铺。取消规则请以预约网站说明为准。", alternative: "若线上没有合适座席，也可致电咨询。" },
    footer: { slogan: "Where Chinese Cuisine Meets Japanese Seasons", notice: "最新消息", copyright: "© 2026 CHOTEI. All rights reserved." },
  },
} as const;

function BrandMark({ light = false }: { light?: boolean }) {
  return <a className={`brand ${light ? "brand--light" : ""}`} href="#top" aria-label="CHOTEI top"><span>長亭</span><small>CHOTEI · ROPPONGI</small></a>;
}

function RailTitle({ ja, en, light = false }: { ja: string; en: string; light?: boolean }) {
  return <div className={`rail-title ${light ? "rail-title--light" : ""}`}><i /><h2>{ja}</h2><span>{en}</span></div>;
}

export default function ChoteiSite() {
  const [lang, setLang] = useState<Lang>("ja");
  const [season, setSeason] = useState<Season>("spring");
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [menuIndex, setMenuIndex] = useState(0);
  const [storeIndex, setStoreIndex] = useState(0);
  const [storePaused, setStorePaused] = useState(false);
  const touchStart = useRef<number | null>(null);
  const t = copy[lang];
  const seasonKeys = Object.keys(seasonalImages) as Season[];
  const activeSeasonImages = seasonalImages[season];

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
  }, [t.htmlLang]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || storePaused) return;
    const timer = window.setInterval(() => setStoreIndex((value) => (value + 1) % storeImages.length), 3000);
    return () => window.clearInterval(timer);
  }, [storePaused]);

  const seasonCaption = t.cuisine.captions[season][seasonIndex];
  const activeMenu = t.menus.panels[menuIndex];

  const nextSeasonImage = (direction: number) => setSeasonIndex((value) => (value + direction + activeSeasonImages.length) % activeSeasonImages.length);
  const nextStoreImage = (direction: number) => setStoreIndex((value) => (value + direction + storeImages.length) % storeImages.length);

  const storeSequence = useMemo(() => [-1, 0, 1].map(offset => (storeIndex + offset + storeImages.length) % storeImages.length), [storeIndex]);

  return (
    <main id="top">
      <header className="site-header">
        <BrandMark light />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {["origin", "cuisine", "menus", "space", "information", "reservation"].map((id, index) => <a href={`#${id}`} key={id}>{t.nav[index]}</a>)}
        </nav>
        <div className="language" aria-label="Language">
          {(["ja", "en", "zh"] as Lang[]).map(code => <button key={code} onClick={() => setLang(code)} className={lang === code ? "is-active" : ""} aria-pressed={lang === code}>{code === "ja" ? "JA" : code === "en" ? "EN" : "中文"}</button>)}
        </div>
        <details className="mobile-nav"><summary aria-label="Menu"><span /><span /></summary><nav>{["origin", "cuisine", "menus", "space", "information", "reservation"].map((id, index) => <a href={`#${id}`} key={id}>{t.nav[index]}</a>)}</nav></details>
      </header>

      <section className="hero" aria-label="CHOTEI">
        <img src="/images/real/hero-counter.webp" alt="長亭のカウンター席" fetchPriority="high" />
        <div className="hero__shade" />
        <div className="hero__copy"><p>{t.hero.location}</p><h1><span>{t.hero.line1}</span><span>{t.hero.line2}</span></h1><small>{t.hero.sub}</small></div>
        <a className="scroll-mark" href="#origin"><span>SCROLL</span></a>
      </section>

      <section className="origin dark-section" id="origin">
        <RailTitle ja={t.origin.rail} en={t.origin.en} light />
        <div className="origin__location">ROPPONGI, TOKYO</div>
        <h2>{t.origin.lead.split("\n").map(line => <span key={line}>{line}</span>)}</h2>
        <div className="origin__body">{t.origin.body.map(p => <p key={p}>{p}</p>)}</div>
      </section>

      <section className="philosophy dark-section" id="philosophy">
        <RailTitle ja={t.philosophy.rail} en={t.philosophy.en} light />
        <h2>{t.philosophy.headline}</h2>
        <div className="philosophy__body">{t.philosophy.body.map((p, index) => <p key={p} className={index === 2 ? "is-highlight" : ""}>{p}</p>)}</div>
        <div className="philosophy__ghost" aria-hidden="true">不時不食</div>
      </section>

      <section className="cuisine light-section" id="cuisine">
        <RailTitle ja={t.cuisine.rail} en={t.cuisine.en} />
        <div className="season-tabs" role="tablist" aria-label="Seasons">{seasonKeys.map(key => <button role="tab" aria-selected={season === key} className={season === key ? "is-active" : ""} key={key} onClick={() => { setSeason(key); setSeasonIndex(0); }}>{t.cuisine.seasons[key]}</button>)}</div>
        <div className="cuisine__stage" onTouchStart={e => { touchStart.current = e.changedTouches[0].clientX; }} onTouchEnd={e => { if (touchStart.current === null) return; const delta = e.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 45) nextSeasonImage(delta < 0 ? 1 : -1); touchStart.current = null; }}>
          <button className="gallery-arrow gallery-arrow--left" onClick={() => nextSeasonImage(-1)} aria-label="Previous image">←</button>
          <figure key={`${season}-${seasonIndex}`}><img src={`/images/real/${activeSeasonImages[seasonIndex]}`} alt={seasonCaption} loading="lazy" /><figcaption>{seasonCaption}</figcaption></figure>
          <button className="gallery-arrow gallery-arrow--right" onClick={() => nextSeasonImage(1)} aria-label="Next image">→</button>
        </div>
        <div className="gallery-dots">{activeSeasonImages.map((_, index) => <button key={index} className={seasonIndex === index ? "is-active" : ""} onClick={() => setSeasonIndex(index)} aria-label={`Image ${index + 1}`} aria-current={seasonIndex === index ? "true" : undefined} />)}</div>
      </section>

      <section className="menus" id="menus">
        <div className="menus__heading"><RailTitle ja={t.menus.rail} en={t.menus.en} light /><p>{t.menus.intro}</p></div>
        <div className="menu-panels">{t.menus.panels.map((panel, index) => <button key={panel.title} className={`menu-panel ${menuIndex === index ? "is-active" : ""}`} onMouseEnter={() => setMenuIndex(index)} onFocus={() => setMenuIndex(index)} onClick={() => setMenuIndex(index)} aria-expanded={menuIndex === index}><img src={`/images/real/${menuImages[index]}`} alt={panel.title} loading="lazy" /><span className="menu-panel__shade" /><span className="menu-panel__copy"><b>{panel.title}</b><small>{panel.meta}</small></span></button>)}</div>
        <div className="menu-detail" aria-live="polite"><div><span>{String(menuIndex + 1).padStart(2, "0")}</span><h3>{activeMenu.title}</h3><p>{activeMenu.meta}</p></div><ul>{activeMenu.detail.map(item => <li key={item}>{item}</li>)}</ul></div>
      </section>

      <section className="space" id="space" onMouseEnter={() => setStorePaused(true)} onMouseLeave={() => setStorePaused(false)}>
        <div className="space__rail"><RailTitle ja={t.space.rail} en={t.space.en} light /></div>
        <div className="space__track">{storeSequence.map((index, position) => <figure key={`${index}-${position}`} className={position === 1 ? "is-current" : ""}><img src={`/images/real/${storeImages[index]}`} alt={t.space.labels[index]} loading="lazy" /><figcaption>{t.space.labels[index]}</figcaption></figure>)}</div>
        <div className="space__controls"><button onClick={() => nextStoreImage(-1)} aria-label="Previous space">←</button><span>{String(storeIndex + 1).padStart(2, "0")} / {String(storeImages.length).padStart(2, "0")}</span><button onClick={() => nextStoreImage(1)} aria-label="Next space">→</button></div>
      </section>

      <section className="information light-section" id="information">
        <RailTitle ja={t.info.rail} en={t.info.en} />
        <BrandMark />
        <dl>
          <div><dt>{t.info.hours}</dt><dd>{t.info.hoursValue}</dd></div>
          <div><dt>{t.info.closed}</dt><dd>{t.info.closedValue}</dd></div>
          <div><dt>{t.info.tel}</dt><dd><a href="tel:+815031013945">050-3101-3945</a></dd></div>
          <div><dt>{t.info.address}</dt><dd>{t.info.addressValue}<a className="map-link" href="https://www.google.com/maps/search/?api=1&query=東京都港区六本木7-13-9" target="_blank" rel="noreferrer">{t.info.map} ↗</a></dd></div>
          <div><dt>{t.info.seats}</dt><dd>{t.info.seatsValue}</dd></div>
        </dl>
      </section>

      <section className="reservation" id="reservation">
        <RailTitle ja={t.reservation.rail} en={t.reservation.en} light />
        <div className="reservation__main"><p>{t.reservation.site}</p><a className="reserve-button" href="https://restaurant.ikyu.com/149159" target="_blank" rel="noreferrer"><span>{t.reservation.button}</span><i>↗</i></a><details><summary>{t.reservation.notice}</summary><p>{t.reservation.rules}</p></details><small>{t.reservation.alternative} <a href="tel:+815031013945">050-3101-3945</a></small></div>
      </section>

      <footer id="footer"><BrandMark /><p>{t.footer.slogan}</p><div className="footer__languages">{(["ja", "en", "zh"] as Lang[]).map(code => <button key={code} onClick={() => setLang(code)} aria-pressed={lang === code}>{code === "ja" ? "JA" : code === "en" ? "EN" : "中文"}</button>)}</div><small>{t.footer.copyright}</small></footer>
      <a className="news-chip" href="#information">{t.footer.notice}</a>
    </main>
  );
}
