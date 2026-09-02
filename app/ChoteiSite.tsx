"use client";

/* eslint-disable @next/next/no-img-element -- restaurant and logo assets are pre-sized media files */

import { useEffect, useRef, useState } from "react";
import { menuArtwork, menuContent, type Language as Lang } from "./menu-content";
import { guestNoticeContent } from "./guest-notice-content";

type Season = "spring" | "summer" | "autumn" | "winter";
type CourseSelection = { title: string; detail: readonly string[]; image: string; price?: string; note?: string; document?: boolean };

const seasonalImages: Record<Season, string[]> = {
  spring: ["ingredient-spring-01.webp", "ingredient-spring-02.webp", "ingredient-spring-03.webp", "ingredient-spring-04.webp"],
  summer: ["ingredient-summer-01.webp", "ingredient-summer-02.webp", "ingredient-summer-03.webp", "ingredient-summer-04.webp"],
  autumn: ["autumn-vegetables.webp", "autumn-matsutake-wagyu.webp", "autumn-prawn-ginkgo.webp", "autumn-fig-soup.webp"],
  winter: ["winter-matsutake-oxtail.webp", "winter-chestnut-chicken.webp", "winter-seafood-vegetables.webp", "winter-golden-shark-fin.webp"],
};

const premiumCourseImages = ["winter-fukahire.webp", "special-abalone.webp", "special-buddha-soup.webp", "special-bear-paw.webp"];
const storeImages = ["space-entrance.webp", "space-dining-1.webp", "space-dining-2.webp", "space-dining-3.webp", "space-dining-4.webp", "space-private.webp"];
const storeSequence = [...storeImages, storeImages[0]];
const mapUrl = "https://www.google.com/maps/place/%E9%95%B7%E4%BA%AD+CHOTEI/@35.6636563,139.7256698,16.89z/data=!3m1!5s0x60188b7840b89495:0xdccd41a44c51eac2!4m6!3m5!1s0x60188b9febc424b5:0xad79b9012c244206!8m2!3d35.663729!4d139.730426!16s%2Fg%2F11xklmrgxx?entry=ttu&g_ep=EgoyMDI2MDgwMi4wIKXMDSoASAFQAw%3D%3D";

const copy = {
  ja: {
    htmlLang: "ja",
    nav: ["長亭由来", "お料理", "メニュー", "店舗", "ご予約"],
    hero: { line1: "中国料理の技で", line2: "四季を奏でる" },
    origin: { rail: "長亭由来", lead: "五里に短亭\n十里に長亭", body: ["中国には、古くから伝わる言葉があります。長亭とは、旅の途中で足を休め、大切な人を送り、また迎える場所。", "出会いと再会を静かに見守り、人と人を結んできました。私たちは、その想いを「長亭」という名に込めました。"] },
    philosophy: { rail: "料理哲学", headline: "融合ではなく\n対話", body: ["長亭は、中国料理を礎としています。同時に、日本料理が大切にしてきた四季や食材、美意識からも着想を得ています。", "中国には「不時不食」、日本には「旬」という考えがあります。表現は異なっても、本当の美味しさは、自然に寄り添い、旬を尊ぶことから生まれる。", "中国料理の技法で、日本の四季を映し出す。一皿の中で、二つの食文化が自然に響き合う。それが、長亭の料理です。"] },
    cuisine: { rail: "お料理", seasons: { spring: "春", summer: "夏", autumn: "秋", winter: "冬" }, captions: { spring: ["筍", "山菜", "桜鯛", "蛍烏賊"], summer: ["鮎", "雲丹", "鱧", "茄子"], autumn: ["季節野菜の炒め", "松茸と和牛", "銀杏と大海老の椒塩仕立て", "無花果のスープ"], winter: ["松茸と牛尾のスープ", "栗の油淋鶏", "海鮮と季節野菜の炒め", "ふかひれの黄金スープ"] } },
    menus: {
      rail: "メニュー", notice: "長亭のコースはすべて事前予約制です", specialLabel: "特別コース", close: "閉じる",
      featured: [
        { title: "ふかひれコース", detail: ["季節の前菜三品", "上海蟹味噌ふかひれ", "上海風豚角煮", "広東点心", "季節野菜の炒め", "本日のデザート", "中国茶"] },
        { title: "鮑コース", detail: ["季節の前菜三品", "九頭干し鮑の煮込み", "和牛の香り焼き", "広東点心", "季節野菜の炒め", "本日のデザート", "中国茶"] },
        { title: "佛跳牆コース", detail: ["季節の前菜三品", "珍品佛跳牆", "よだれ鶏", "広東点心", "季節野菜の炒め", "本日のデザート", "中国茶"] },
        { title: "熊掌コース", detail: ["季節の前菜三品", "熊掌の醤油煮込み", "三種海鮮の炒め", "広東点心", "季節野菜の炒め", "本日のデザート", "中国茶"] },
      ],
      basic: menuContent.ja,
    },
    space: { rail: "店舗", labels: ["入口", "カウンター", "ダイニング", "テーブル席", "主室", "個室"] },
    info: { hours: "営業時間", hoursValue: "11:30–14:30 / 18:00–22:00", closed: "定休日", closedValue: "日曜日・不定休", tel: "電話番号", address: "住所", addressValue: "〒106-0032 東京都港区六本木7-13-9 1F", seats: "座席数", seatsValue: "24席（カウンター4席、テーブル20席）", map: "地図・アクセス" },
    reservation: {
      rail: "ご予約", siteLabel: "予約サイト", button: "予約",
      customerNotice: "お客様へのお知らせ", close: "閉じる",
      guidance: guestNoticeContent.ja,
    },
    footer: { copyright: "© 2026 CHOTEI. All rights reserved." },
  },
  en: {
    htmlLang: "en",
    nav: ["Origin", "Cuisine", "Menus", "Store", "Reserve"],
    hero: { line1: "Chinese technique", line2: "Japanese seasons" },
    origin: { rail: "Origin", lead: "A short pavilion at five li\nA long pavilion at ten", body: ["In ancient China, a changting was a place along the road where travellers rested, loved ones said farewell, and returning friends were welcomed home.", "Quietly watching over meetings and reunions, it connected one person to another. We placed that sentiment in our name: CHOTEI."] },
    philosophy: { rail: "Philosophy", headline: "Not fusion\nDialogue", body: ["CHOTEI is grounded in Chinese cuisine, while drawing inspiration from the seasons, ingredients and aesthetic clarity cherished in Japanese cooking.", "China speaks of eating in time; Japan speaks of shun, the precise moment of seasonality. Different expressions share one truth: flavour begins with listening to nature.", "Chinese technique reflects the Japanese seasons. Two culinary cultures resonate clearly within a single plate. This is the cuisine of CHOTEI."] },
    cuisine: { rail: "Cuisine", seasons: { spring: "Spring", summer: "Summer", autumn: "Autumn", winter: "Winter" }, captions: { spring: ["Bamboo shoot", "Mountain vegetables", "Sakura sea bream", "Firefly squid"], summer: ["Ayu sweetfish", "Sea urchin", "Pike conger", "Eggplant"], autumn: ["Stir-fried seasonal vegetables", "Matsutake and wagyu", "Salt-and-pepper prawns with ginkgo", "Fig soup"], winter: ["Matsutake and oxtail soup", "Chestnut crispy chicken", "Stir-fried seafood and seasonal vegetables", "Shark fin in golden broth"] } },
    menus: {
      rail: "Menus", notice: "All CHOTEI courses are offered by advance reservation", specialLabel: "Special courses", close: "Close",
      featured: [
        { title: "Shark fin course", detail: ["Three seasonal appetizers", "Shark fin with Shanghai crab roe", "Shanghai-style braised pork", "Cantonese dim sum", "Wok-fried seasonal vegetables", "Dessert of the day", "Chinese tea"] },
        { title: "Abalone course", detail: ["Three seasonal appetizers", "Braised nine-head dried abalone", "Pan-seared wagyu", "Cantonese dim sum", "Wok-fried seasonal vegetables", "Dessert of the day", "Chinese tea"] },
        { title: "Buddha Jumps Over the Wall", detail: ["Three seasonal appetizers", "Buddha Jumps Over the Wall", "Sichuan mouthwatering chicken", "Cantonese dim sum", "Wok-fried seasonal vegetables", "Dessert of the day", "Chinese tea"] },
        { title: "Rare delicacy course", detail: ["Three seasonal appetizers", "Red-braised bear paw", "Stir-fried three delicacies", "Cantonese dim sum", "Wok-fried seasonal vegetables", "Dessert of the day", "Chinese tea"] },
      ],
      basic: menuContent.en,
    },
    space: { rail: "Store", labels: ["Entrance", "Counter", "Dining room", "Table seating", "Main room", "Private room"] },
    info: { hours: "Hours", hoursValue: "11:30–14:30 / 18:00–22:00", closed: "Closed", closedValue: "Sundays and irregular holidays", tel: "Telephone", address: "Address", addressValue: "1F, 7-13-9 Roppongi, Minato-ku, Tokyo 106-0032", seats: "Seating", seatsValue: "24 seats (4 counter seats, 20 table seats)", map: "Map & directions" },
    reservation: {
      rail: "Reserve", siteLabel: "Reservation", button: "Reserve",
      customerNotice: "Notice to our guests", close: "Close",
      guidance: guestNoticeContent.en,
    },
    footer: { copyright: "© 2026 CHOTEI. All rights reserved." },
  },
  zh: {
    htmlLang: "zh-CN",
    nav: ["長亭由来", "四季料理", "菜单套餐", "店铺", "预约"],
    hero: { line1: "以中国料理之技", line2: "奏响日本四季" },
    origin: { rail: "長亭由来", lead: "五里短亭\n十里长亭", body: ["在中国古代，长亭是旅途中停歇的地方，也是送别挚友、迎接归人的所在。", "它静静见证相遇与重逢，将人与人相连。我们把这份心意放进“長亭”之名。"] },
    philosophy: { rail: "料理哲学", headline: "不是融合\n而是对话", body: ["長亭以中华料理为根基，同时从日本料理珍视的四季、食材与审美中获得启发。", "中国讲“不时不食”，日本讲“旬”。表达不同，却共同相信：真正的美味来自顺应自然、尊重当季。", "以中餐技法映照日本四季，让两种饮食文化在一盘之中清晰回应——这就是長亭的料理。"] },
    cuisine: { rail: "四季料理", seasons: { spring: "春", summer: "夏", autumn: "秋", winter: "冬" }, captions: { spring: ["竹笋", "山菜", "樱鲷", "萤火鱿"], summer: ["鲇鱼", "海胆", "海鳗", "茄子"], autumn: ["炒时蔬", "松茸煎和牛", "椒盐银杏大虾球", "无花果汤"], winter: ["松茸牛尾汤", "栗子油淋鸡", "海鲜时蔬小炒", "金汤鱼翅"] } },
    menus: {
      rail: "菜单套餐", notice: "長亭所有套餐均采用预约制", specialLabel: "特别套餐", close: "关闭",
      featured: [
        { title: "鱼翅套餐", detail: ["前菜三品", "上海蟹粉鱼翅", "上海红烧肉", "港式点心", "炒时蔬", "当日甜品", "中国茶"] },
        { title: "鲍鱼套餐", detail: ["前菜三品", "炖皇九头干鲍", "香煎和牛", "港式点心", "炒时蔬", "当日甜品", "中国茶"] },
        { title: "佛跳墙套餐", detail: ["前菜三品", "珍品佛跳墙", "香辣口水鸡", "港式点心", "炒时蔬", "当日甜品", "中国茶"] },
        { title: "熊掌套餐", detail: ["前菜三品", "红烧熊掌", "炒三鲜", "港式点心", "炒时蔬", "当日甜品", "中国茶"] },
      ],
      basic: menuContent.zh,
    },
    space: { rail: "店铺", labels: ["入口", "吧台", "用餐区", "餐桌席", "主厅", "包间"] },
    info: { hours: "营业时间", hoursValue: "11:30–14:30 / 18:00–22:00", closed: "休息日", closedValue: "周日及不定休", tel: "电话", address: "地址", addressValue: "〒106-0032 日本东京都港区六本木7-13-9 1F", seats: "座席", seatsValue: "24席（吧台4席、餐桌20席）", map: "地图与路线" },
    reservation: {
      rail: "预约", siteLabel: "预约网站", button: "预约",
      customerNotice: "致宾客的重要通知", close: "关闭",
      guidance: guestNoticeContent.zh,
    },
    footer: { copyright: "© 2026 CHOTEI. All rights reserved." },
  },
} as const;

type LogoVariant = "signature" | "vertical";

function BrandMark({ variant = "signature", className = "" }: { variant?: LogoVariant; className?: string }) {
  const logoFile = variant === "signature" ? "logo-signature.webp" : "logo-vertical-black.webp";
  return <a className={`brand brand--${variant} ${className}`} href="#top" aria-label="CHOTEI top"><img src={`/images/brand/${logoFile}`} alt="長亭 CHOTEI" /></a>;
}

function NoticeText({ children }: { children: string }) {
  return children.split(/\*\*(.*?)\*\*/g).map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part);
}

function RailTitle({ label, light = false }: { label: string; light?: boolean }) {
  const characters = /[\u3040-\u30ff\u3400-\u9fff]/.test(label) ? Array.from(label.replace(/\s/g, "")) : null;
  return <div className={`rail-title ${light ? "rail-title--light" : ""}`}><i /><h2 className={characters ? undefined : "rail-title__latin"} aria-label={label}>{characters ? characters.map((character, index) => <span aria-hidden="true" key={`${character}-${index}`}>{character}</span>) : label}</h2></div>;
}

export default function ChoteiSite() {
  const [lang, setLang] = useState<Lang>("ja");
  const [season, setSeason] = useState<Season>("spring");
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseSelection | null>(null);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const noticeTriggerRef = useRef<HTMLButtonElement>(null);
  const noticeCloseRef = useRef<HTMLButtonElement>(null);
  const courseTriggerRef = useRef<HTMLButtonElement | null>(null);
  const courseCloseRef = useRef<HTMLButtonElement>(null);
  const t = copy[lang];
  const seasonKeys = Object.keys(seasonalImages) as Season[];
  const activeSeasonImages = seasonalImages[season];

  useEffect(() => { document.documentElement.lang = t.htmlLang; }, [t.htmlLang]);

  useEffect(() => {
    const updateHeader = () => setHeaderScrolled(window.scrollY > 48);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setSeasonIndex(value => (value + 1) % activeSeasonImages.length), 4600);
    return () => window.clearInterval(timer);
  }, [season, activeSeasonImages.length]);

  useEffect(() => {
    if (!selectedCourse && !noticeOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        (noticeOpen ? noticeCloseRef : courseCloseRef).current?.focus();
        return;
      }
      if (event.key === "Escape") {
        if (noticeOpen) {
          setNoticeOpen(false);
          window.requestAnimationFrame(() => noticeTriggerRef.current?.focus());
        } else {
          setSelectedCourse(null);
          window.requestAnimationFrame(() => courseTriggerRef.current?.focus());
        }
      }
    };
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => (noticeOpen ? noticeCloseRef : courseCloseRef).current?.focus());
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [selectedCourse, noticeOpen]);

  const changeLanguage = (code: Lang) => { setLang(code); setSelectedCourse(null); setNoticeOpen(false); };
  const openCourse = (course: Omit<CourseSelection, "image">, image: string) => {
    courseTriggerRef.current = document.activeElement instanceof HTMLButtonElement ? document.activeElement : null;
    setSelectedCourse({ ...course, image });
  };
  const closeCourse = () => { setSelectedCourse(null); window.requestAnimationFrame(() => courseTriggerRef.current?.focus()); };
  const closeNotice = () => { setNoticeOpen(false); window.requestAnimationFrame(() => noticeTriggerRef.current?.focus()); };

  return (
    <main id="top" className={`site site--${lang}`}>
      <header className={`site-header ${headerScrolled ? "is-scrolled" : ""}`}>
        <BrandMark />
        <nav className="desktop-nav" aria-label="Primary navigation">{["origin", "cuisine", "menus", "store", "reservation"].map((id, index) => <a href={`#${id}`} key={id}>{t.nav[index]}</a>)}</nav>
        <div className="language" aria-label="Language">{(["ja", "en", "zh"] as Lang[]).map(code => <button key={code} onClick={() => changeLanguage(code)} className={lang === code ? "is-active" : ""} aria-pressed={lang === code}>{code === "ja" ? "JA" : code === "en" ? "EN" : "中文"}</button>)}</div>
        <details className="mobile-nav"><summary aria-label="Menu"><span /><span /></summary><nav>{["origin", "cuisine", "menus", "store", "reservation"].map((id, index) => <a href={`#${id}`} key={id}>{t.nav[index]}</a>)}</nav></details>
      </header>

      <section className="hero" aria-label="CHOTEI">
        <img src="/images/real/hero-private-dining.webp" alt="長亭の個室" fetchPriority="high" />
        <div className="hero__shade" />
        <div className="hero__copy"><h1><span>{t.hero.line1}</span><span>{t.hero.line2}</span></h1></div>
        <a className={`scroll-mark ${headerScrolled ? "is-hidden" : ""}`} href="#origin" aria-label={t.nav[0]} />
      </section>

      <section className="origin light-section" id="origin">
        <RailTitle label={t.origin.rail} />
        <h2>{t.origin.lead.split("\n").map(line => <span key={line}>{line}</span>)}</h2>
        <div className="origin__body">{t.origin.body.map(p => <p key={p}>{p}</p>)}</div>
      </section>

      <section className="philosophy light-section" id="philosophy">
        <RailTitle label={t.philosophy.rail} />
        <h2>{t.philosophy.headline.split("\n").map(line => <span key={line}>{line}</span>)}</h2>
        <div className="philosophy__body">{t.philosophy.body.map(p => <p key={p}>{p}</p>)}</div>
      </section>

      <section className="cuisine light-section" id="cuisine">
        <div className="cuisine__layout">
          <div className="cuisine__rail"><RailTitle label={t.cuisine.rail} /><div className="season-tabs" role="tablist" aria-label="Seasons">{seasonKeys.map(key => <button role="tab" aria-selected={season === key} className={season === key ? "is-active" : ""} key={key} onClick={() => { setSeason(key); setSeasonIndex(0); }}>{t.cuisine.seasons[key]}</button>)}</div></div>
          <div className="cuisine__stage" aria-live="off">{activeSeasonImages.map((image, index) => <img key={`${season}-${image}`} className={seasonIndex === index ? "is-active" : ""} src={`/images/real/${image}`} alt={t.cuisine.captions[season][index]} loading="lazy" aria-hidden={seasonIndex !== index} />)}</div>
        </div>
      </section>

      <section className="menus light-section" id="menus">
        <div className="menus__heading"><RailTitle label={t.menus.rail} /><p>{t.menus.notice}</p></div>
        <div className="priced-courses">{t.menus.basic.map((course, index) => <button type="button" className="priced-course" key={course.title} aria-haspopup="dialog" onClick={() => openCourse({ ...course, document: true }, menuArtwork[index])}><span className="priced-course__image"><img src={menuArtwork[index]} alt={`${course.title} ${course.price}`} width={1350} height={1800} loading="lazy" /></span></button>)}</div>
        <div className="special-courses"><h3>{t.menus.specialLabel}</h3><div>{t.menus.featured.map((course, index) => <button key={course.title} onClick={() => openCourse(course, `/images/real/${premiumCourseImages[index]}`)}>{course.title}</button>)}</div></div>
      </section>

      <section className="store light-section" id="store">
        <div className="store__gallery">
          <div className="store__rail"><RailTitle label={t.space.rail} /></div>
          <div className="store__viewport">
            <div className="store__track">
              {storeSequence.map((image, index) => <figure key={`${image}-${index}`}><img src={`/images/real/${image}`} alt={t.space.labels[index % storeImages.length]} loading="eager" decoding="async" /></figure>)}
            </div>
          </div>
        </div>
        <div className="store__information" id="information">
          <BrandMark variant="vertical" className="store__logo" />
          <dl>
            <div><dt>{t.info.hours}</dt><dd>{t.info.hoursValue}</dd></div>
            <div><dt>{t.info.closed}</dt><dd>{t.info.closedValue}</dd></div>
            <div><dt>{t.info.tel}</dt><dd><a href="tel:+815031013945">050-3101-3945</a></dd></div>
            <div><dt>{t.info.address}</dt><dd>{t.info.addressValue}<a className="map-link" href={mapUrl} target="_blank" rel="noreferrer">{t.info.map} ↗</a></dd></div>
            <div><dt>{t.info.seats}</dt><dd>{t.info.seatsValue}</dd></div>
          </dl>
        </div>
      </section>

      <section className="reservation" id="reservation">
        <div className="reservation__identity"><RailTitle label={t.reservation.rail} /></div>
        <div className="reservation__main"><h2>{t.reservation.siteLabel}</h2><a className="reserve-button" href="https://restaurant.ikyu.com/149159" target="_blank" rel="noreferrer"><span>{t.reservation.button}</span><i>↗</i></a><button type="button" ref={noticeTriggerRef} className="customer-notice-button" onClick={() => setNoticeOpen(true)}><span>{t.reservation.customerNotice}</span><i>＋</i></button></div>
      </section>

      <footer id="footer"><BrandMark /><div className="footer__languages">{(["ja", "en", "zh"] as Lang[]).map(code => <button key={code} onClick={() => changeLanguage(code)} aria-pressed={lang === code}>{code === "ja" ? "JA" : code === "en" ? "EN" : "中文"}</button>)}</div><small>{t.footer.copyright}</small></footer>

      {selectedCourse && <div className={`course-modal${selectedCourse.document ? " course-modal--document" : ""}`} role="dialog" aria-modal="true" aria-labelledby="course-title" onMouseDown={event => { if (event.target === event.currentTarget) closeCourse(); }}><article><button type="button" ref={courseCloseRef} className="course-modal__close" onClick={closeCourse} aria-label={t.menus.close}>×</button>{(!selectedCourse.document || lang === "ja") && <div className="course-modal__image"><img src={selectedCourse.image} alt={selectedCourse.document ? "" : selectedCourse.title} /></div>}<div className={selectedCourse.document && lang === "ja" ? "sr-only" : "course-modal__copy"}><h2 id="course-title">{selectedCourse.title}{selectedCourse.price && <small>{selectedCourse.price}</small>}</h2><ul>{selectedCourse.detail.map(item => <li key={item}>{item}</li>)}</ul>{selectedCourse.note && <p className="course-modal__note">{selectedCourse.note}</p>}</div></article></div>}
      {noticeOpen && <div className="notice-modal" role="dialog" aria-modal="true" aria-labelledby="notice-title" onMouseDown={event => { if (event.target === event.currentTarget) closeNotice(); }}><article><button type="button" ref={noticeCloseRef} className="notice-modal__close" onClick={closeNotice} aria-label={t.reservation.close}>×</button><header><div className="brand brand--vertical"><img src="/images/brand/logo-vertical-black.webp" alt="" /></div><h2 id="notice-title">{t.reservation.customerNotice}</h2></header><div className="notice-modal__body">{t.reservation.guidance.map(section => <section key={section.title}><h3>【{section.title}】</h3>{section.paragraphs.map(paragraph => <p key={paragraph}><NoticeText>{paragraph}</NoticeText></p>)}{section.subheading && <h4>{section.subheading}</h4>}{section.items && <ul>{section.items.map(item => <li key={item}><NoticeText>{item}</NoticeText></li>)}</ul>}{section.note && <p className="notice-modal__note"><NoticeText>{section.note}</NoticeText></p>}</section>)}</div></article></div>}
    </main>
  );
}
