"use client";

/* eslint-disable @next/next/no-img-element -- restaurant and logo assets are pre-sized WebP files */

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type Lang = "ja" | "en" | "zh";
type Season = "spring" | "summer" | "autumn" | "winter";
type CourseSelection = { title: string; detail: readonly string[]; image: string };

const seasonalImages: Record<Season, string[]> = {
  spring: ["spring-appetizer.webp", "spring-sakuradai.webp", "spring-seafood.webp"],
  summer: ["summer-vegetables.webp", "summer-shrimp.webp", "summer-dumpling.webp"],
  autumn: ["autumn-matsutake.webp", "autumn-kinmedai.webp", "autumn-sake-fish.webp"],
  winter: ["winter-fukahire.webp", "winter-soup.webp", "winter-wagyu.webp"],
};

const premiumCourseImages = ["winter-fukahire.webp", "premium-abalone.webp", "winter-soup.webp", "menu-premium.webp"];
const basicCourseImages = ["menu-lunch.webp", "menu-standard.webp", "menu-seasonal.webp", "autumn-matsutake.webp"];
const storeImages = ["space-entrance.webp", "space-dining-1.webp", "space-dining-2.webp", "space-dining-3.webp", "space-dining-4.webp", "space-private.webp"];
const storeSlides = [storeImages[storeImages.length - 1], ...storeImages, storeImages[0]];
const mapUrl = "https://www.google.com/maps/place/%E9%95%B7%E4%BA%AD+CHOTEI/@35.6636563,139.7256698,16.89z/data=!3m1!5s0x60188b7840b89495:0xdccd41a44c51eac2!4m6!3m5!1s0x60188b9febc424b5:0xad79b9012c244206!8m2!3d35.663729!4d139.730426!16s%2Fg%2F11xklmrgxx?entry=ttu&g_ep=EgoyMDI2MDgwMi4wIKXMDSoASAFQAw%3D%3D";

const copy = {
  ja: {
    htmlLang: "ja",
    nav: ["長亭由来", "お料理", "メニュー", "店舗", "ご予約"],
    hero: { line1: "中国料理の技で", line2: "四季を奏でる" },
    origin: { rail: "長亭由来", lead: "五里に短亭\n十里に長亭", body: ["中国には、古くから伝わる言葉があります。長亭とは、旅の途中で足を休め、大切な人を送り、また迎える場所。", "出会いと再会を静かに見守り、人と人を結んできました。私たちは、その想いを「長亭」という名に込めました。"] },
    philosophy: { rail: "料理哲学", headline: "融合ではなく\n対話", body: ["長亭は、中国料理を礎としています。同時に、日本料理が大切にしてきた四季や食材、美意識からも着想を得ています。", "中国には「不時不食」、日本には「旬」という考えがあります。表現は異なっても、本当の美味しさは、自然に寄り添い、旬を尊ぶことから生まれる。", "中国料理の技法で、日本の四季を映し出す。一皿の中で、二つの食文化が自然に響き合う。それが、長亭の料理です。"] },
    cuisine: { rail: "お料理", seasons: { spring: "春", summer: "夏", autumn: "秋", winter: "冬" }, captions: { spring: ["季節の前菜", "桜鯛", "春の海鮮炒め"], summer: ["旬野菜の五彩炒め", "海老のトマトソース炒め", "本格手作り水餃子"], autumn: ["松茸と和牛", "金目鯛の姿蒸し", "地酒と金目鯛"], winter: ["ふかひれの姿煮", "羊肚菌の滋養湯", "黒毛和牛の炙り焼き"] } },
    menus: {
      rail: "メニュー", notice: "長亭のコースはすべて事前予約制です", specialLabel: "特別コース", close: "閉じる",
      featured: [
        { title: "ふかひれコース", detail: ["季節の前菜", "金湯ふかひれの姿煮", "旬の海鮮と野菜", "食事・本日のデザート・茶"] },
        { title: "鮑コース", detail: ["季節の前菜", "鮑の姿蒸し", "季節の魚料理", "食事・本日のデザート・茶"] },
        { title: "佛跳牆コース", detail: ["季節の前菜", "佛跳牆", "旬魚と季節野菜", "食事・果物・茶"] },
        { title: "熊掌コース", detail: ["季節の前菜", "熊掌の伝統煮込み", "料理長おまかせ料理", "食事・果物・茶"] },
      ],
      basic: [
        { title: "¥3,980", detail: ["季節の前菜", "本日のスープ", "長亭酢豚", "点心・食事・デザート・茶"] },
        { title: "¥8,800", detail: ["季節の前菜", "滋養スープ", "旬野菜と海鮮", "点心・食事・デザート・茶"] },
        { title: "¥13,200", detail: ["季節の前菜", "金湯ふかひれ", "松茸と和牛・旬魚", "季節の食事・デザート・茶"] },
        { title: "¥19,800", detail: ["季節の前菜", "ふかひれと鮑", "和牛・旬魚・季節野菜", "季節の食事・果物・茶"] },
      ],
    },
    space: { rail: "店舗", labels: ["入口", "カウンター", "ダイニング", "テーブル席", "主室", "個室"] },
    info: { hours: "営業時間", hoursValue: "11:30–14:30 / 18:00–22:00", closed: "定休日", closedValue: "日曜日・不定休", tel: "電話番号", address: "住所", addressValue: "〒106-0032 東京都港区六本木7-13-9 1F", seats: "座席数", seatsValue: "カウンター 4席 / 個室 6室", map: "地図・アクセス" },
    reservation: {
      rail: "ご予約", button: "予約",
      customerNotice: "お客様へのお知らせ", close: "閉じる",
      guidance: [
        { title: "ご来店時のお願い", paragraphs: ["ご予約当日のお帰りの時間（飛行機などの交通機関）にお決まりのある方は、事前にお問い合わせくださいますようお願いいたします。当日や直前のお申し出の場合、ご希望に添えない場合がございます。", "ご予約時間より30分以上遅れてご来店される場合、その時点からのお料理のご提供となります。また、途中退店される場合、コースの一部をお出しできない可能性もございますので、ご了承くださいませ。"] },
        { title: "ドレスコードについて", paragraphs: ["過度な軽装でのご来店はお控えいただいております。", "また、過度な香水をお付けになっている場合、ご入店をお断りする場合がございます。"] },
        { title: "ご予約方法についてのお知らせ", paragraphs: ["当店では「Peccotter（ペコッター）」「Auto Reserve（オートリザーブ）」「グルメリザーブ」など、当店がご案内していない予約代行サービスからのご予約は、日程・時間帯を問わず受け付けておりません。", "当サイトからご案内する一休レストラン、または店舗への直接のお問い合わせをご利用ください。予約代行サービス経由と判明した場合、ご予約を取り消す場合がございます。"] },
      ],
    },
    footer: { copyright: "© 2026 CHOTEI. All rights reserved." },
  },
  en: {
    htmlLang: "en",
    nav: ["Origin", "Cuisine", "Menus", "Store", "Reserve"],
    hero: { line1: "Chinese technique", line2: "Japanese seasons" },
    origin: { rail: "Origin", lead: "A short pavilion at five li\nA long pavilion at ten", body: ["In ancient China, a changting was a place along the road where travellers rested, loved ones said farewell, and returning friends were welcomed home.", "Quietly watching over meetings and reunions, it connected one person to another. We placed that sentiment in our name: CHOTEI."] },
    philosophy: { rail: "Philosophy", headline: "Not fusion\nDialogue", body: ["CHOTEI is grounded in Chinese cuisine, while drawing inspiration from the seasons, ingredients and aesthetic clarity cherished in Japanese cooking.", "China speaks of eating in time; Japan speaks of shun, the precise moment of seasonality. Different expressions share one truth: flavour begins with listening to nature.", "Chinese technique reflects the Japanese seasons. Two culinary cultures resonate clearly within a single plate. This is the cuisine of CHOTEI."] },
    cuisine: { rail: "Cuisine", seasons: { spring: "Spring", summer: "Summer", autumn: "Autumn", winter: "Winter" }, captions: { spring: ["Seasonal appetizer", "Sakura sea bream", "Spring seafood"], summer: ["Seasonal vegetables", "Prawns in tomato sauce", "Handmade dumplings"], autumn: ["Matsutake and wagyu", "Steamed golden-eye snapper", "Regional sake and snapper"], winter: ["Braised shark fin", "Morel restorative soup", "Seared wagyu"] } },
    menus: {
      rail: "Menus", notice: "All CHOTEI courses are offered by advance reservation", specialLabel: "Special courses", close: "Close",
      featured: [
        { title: "Shark fin course", detail: ["Seasonal appetizers", "Braised shark fin", "Seasonal seafood and vegetables", "Rice, dessert and tea"] },
        { title: "Abalone course", detail: ["Seasonal appetizers", "Steamed whole abalone", "Seasonal fish", "Rice, dessert and tea"] },
        { title: "Buddha Jumps Over the Wall", detail: ["Seasonal appetizers", "Traditional restorative soup", "Seasonal fish and vegetables", "Rice, fruit and tea"] },
        { title: "Rare delicacy course", detail: ["Seasonal appetizers", "Traditional braised delicacy", "Chef's selected dishes", "Rice, fruit and tea"] },
      ],
      basic: [
        { title: "¥3,980", detail: ["Seasonal appetizers", "Soup of the day", "CHOTEI sweet-and-sour pork", "Dim sum, rice, dessert and tea"] },
        { title: "¥8,800", detail: ["Seasonal appetizers", "Restorative soup", "Seasonal seafood and vegetables", "Dim sum, rice, dessert and tea"] },
        { title: "¥13,200", detail: ["Seasonal appetizers", "Shark fin", "Matsutake, wagyu and seasonal fish", "Seasonal rice, dessert and tea"] },
        { title: "¥19,800", detail: ["Seasonal appetizers", "Shark fin and abalone", "Wagyu, seasonal fish and vegetables", "Seasonal rice, fruit and tea"] },
      ],
    },
    space: { rail: "Store", labels: ["Entrance", "Counter", "Dining room", "Table seating", "Main room", "Private room"] },
    info: { hours: "Hours", hoursValue: "11:30–14:30 / 18:00–22:00", closed: "Closed", closedValue: "Sundays and irregular holidays", tel: "Telephone", address: "Address", addressValue: "1F, 7-13-9 Roppongi, Minato-ku, Tokyo 106-0032", seats: "Seating", seatsValue: "4 counter seats / 6 private rooms", map: "Map & directions" },
    reservation: {
      rail: "Reserve", button: "Reserve",
      customerNotice: "Notice to our guests", close: "Close",
      guidance: [
        { title: "Before your visit", paragraphs: ["If you have a fixed departure time on the day of your reservation, including a flight or other transport connection, please contact us in advance. We may be unable to accommodate requests made on the day.", "Guests arriving more than 30 minutes late will be served from the course then in progress. If you leave before the course is complete, some dishes may not be served."] },
        { title: "Dress code", paragraphs: ["Please refrain from visiting in excessively casual clothing.", "Guests wearing strong fragrance may be refused entry so that everyone can enjoy the aromas of the cuisine."] },
        { title: "Reservation methods", paragraphs: ["We do not accept reservations through Peccotter, Auto Reserve, Gourmet Reserve, or other booking agents not introduced by CHOTEI.", "Please use the Ikyu Restaurant link on this website or contact the restaurant directly. Reservations identified as having been made through an unauthorized agent may be cancelled."] },
      ],
    },
    footer: { copyright: "© 2026 CHOTEI. All rights reserved." },
  },
  zh: {
    htmlLang: "zh-CN",
    nav: ["長亭由来", "四季料理", "菜单套餐", "店铺", "预约"],
    hero: { line1: "以中国料理之技", line2: "奏响日本四季" },
    origin: { rail: "長亭由来", lead: "五里短亭\n十里长亭", body: ["在中国古代，长亭是旅途中停歇的地方，也是送别挚友、迎接归人的所在。", "它静静见证相遇与重逢，将人与人相连。我们把这份心意放进“長亭”之名。"] },
    philosophy: { rail: "料理哲学", headline: "不是融合\n而是对话", body: ["長亭以中华料理为根基，同时从日本料理珍视的四季、食材与审美中获得启发。", "中国讲“不时不食”，日本讲“旬”。表达不同，却共同相信：真正的美味来自顺应自然、尊重当季。", "以中餐技法映照日本四季，让两种饮食文化在一盘之中清晰回应——这就是長亭的料理。"] },
    cuisine: { rail: "四季料理", seasons: { spring: "春", summer: "夏", autumn: "秋", winter: "冬" }, captions: { spring: ["时令前菜", "樱鲷", "春季海鲜炒"], summer: ["旬野菜五彩炒", "番茄汁炒虾仁", "手工水饺"], autumn: ["松茸与和牛", "清蒸金目鲷", "地酒与金目鲷"], winter: ["红烧鱼翅", "羊肚菌滋养汤", "炙烤黑毛和牛"] } },
    menus: {
      rail: "菜单套餐", notice: "長亭所有套餐均采用预约制", specialLabel: "特别套餐", close: "关闭",
      featured: [
        { title: "鱼翅套餐", detail: ["时令前菜", "金汤红烧鱼翅", "时令海鲜与蔬菜", "主食、甜点与茶"] },
        { title: "鲍鱼套餐", detail: ["时令前菜", "清蒸整鲍", "时令鱼料理", "主食、甜点与茶"] },
        { title: "佛跳墙套餐", detail: ["时令前菜", "传统佛跳墙", "时令鱼与蔬菜", "主食、水果与茶"] },
        { title: "熊掌套餐", detail: ["时令前菜", "传统煨制熊掌", "主厨精选料理", "主食、水果与茶"] },
      ],
      basic: [
        { title: "¥3,980", detail: ["时令前菜", "每日例汤", "長亭咕咾肉", "点心、主食、甜点与茶"] },
        { title: "¥8,800", detail: ["时令前菜", "滋养汤", "时令海鲜与蔬菜", "点心、主食、甜点与茶"] },
        { title: "¥13,200", detail: ["时令前菜", "金汤鱼翅", "松茸、和牛与时令鱼", "时令主食、甜点与茶"] },
        { title: "¥19,800", detail: ["时令前菜", "鱼翅与鲍鱼", "和牛、时令鱼与蔬菜", "时令主食、水果与茶"] },
      ],
    },
    space: { rail: "店铺", labels: ["入口", "吧台", "用餐区", "餐桌席", "主厅", "包间"] },
    info: { hours: "营业时间", hoursValue: "11:30–14:30 / 18:00–22:00", closed: "休息日", closedValue: "周日及不定休", tel: "电话", address: "地址", addressValue: "〒106-0032 日本东京都港区六本木7-13-9 1F", seats: "座席", seatsValue: "吧台4席 / 包间6间", map: "地图与路线" },
    reservation: {
      rail: "预约", button: "预约",
      customerNotice: "致宾客的重要通知", close: "关闭",
      guidance: [
        { title: "到店须知", paragraphs: ["若预约当天已有确定的返程时间，例如需搭乘飞机或其他交通工具，请提前联系餐厅。当日或临近到店时提出的时间要求，我们可能无法满足。", "若迟到超过30分钟，将从当时的课程进度开始上菜；如需中途离席，部分菜品可能无法提供，敬请谅解。"] },
        { title: "着装要求", paragraphs: ["请勿穿着过度休闲的服装到店。", "为不影响料理香气及其他宾客的用餐体验，使用浓烈香水者可能会被谢绝入店。"] },
        { title: "预约方式说明", paragraphs: ["本店不接受通过 Peccotter、Auto Reserve、Gourmet Reserve 等未经長亭指定的第三方代订服务所提交的预约。", "请使用本网站提供的一休餐厅预约链接，或直接联系店铺。若确认预约来自未经授权的代订服务，本店可能取消该预约。"] },
      ],
    },
    footer: { copyright: "© 2026 CHOTEI. All rights reserved." },
  },
} as const;

type LogoVariant = "horizontal" | "vertical";

function BrandMark({ tone = "black", variant = "horizontal", className = "" }: { tone?: "black" | "white"; variant?: LogoVariant; className?: string }) {
  const logoFile = variant === "horizontal" ? `logo-new-${tone}.webp` : `logo-${variant}-${tone}.webp`;
  return <a className={`brand brand--${variant} ${className}`} href="#top" aria-label="CHOTEI top"><img src={`/images/brand/${logoFile}`} alt="長亭 CHOTEI" /></a>;
}

function RailTitle({ label, light = false }: { label: string; light?: boolean }) {
  return <div className={`rail-title ${light ? "rail-title--light" : ""}`}><i /><h2>{label}</h2></div>;
}

export default function ChoteiSite() {
  const [lang, setLang] = useState<Lang>("ja");
  const [season, setSeason] = useState<Season>("spring");
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [storeSlide, setStoreSlide] = useState(1);
  const [storeAnimating, setStoreAnimating] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<CourseSelection | null>(null);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const noticeTriggerRef = useRef<HTMLButtonElement>(null);
  const noticeCloseRef = useRef<HTMLButtonElement>(null);
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setStoreSlide(value => value >= storeImages.length + 1 ? value : value + 1), 2500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (storeSlide !== storeImages.length + 1) return;
    const fallback = window.setTimeout(() => {
      setStoreAnimating(false);
      setStoreSlide(1);
    }, 1100);
    return () => window.clearTimeout(fallback);
  }, [storeSlide]);

  useEffect(() => {
    if (storeAnimating) return;
    const frame = window.requestAnimationFrame(() => setStoreAnimating(true));
    return () => window.cancelAnimationFrame(frame);
  }, [storeAnimating]);

  useEffect(() => {
    if (!selectedCourse && !noticeOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Tab" && noticeOpen) {
        event.preventDefault();
        noticeCloseRef.current?.focus();
        return;
      }
      if (event.key === "Escape") {
        if (noticeOpen) {
          setNoticeOpen(false);
          window.requestAnimationFrame(() => noticeTriggerRef.current?.focus());
        } else setSelectedCourse(null);
      }
    };
    document.body.style.overflow = "hidden";
    if (noticeOpen) window.requestAnimationFrame(() => noticeCloseRef.current?.focus());
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [selectedCourse, noticeOpen]);

  const changeLanguage = (code: Lang) => { setLang(code); setSelectedCourse(null); setNoticeOpen(false); };
  const openCourse = (course: { title: string; detail: readonly string[] }, image: string) => setSelectedCourse({ ...course, image });
  const closeNotice = () => { setNoticeOpen(false); window.requestAnimationFrame(() => noticeTriggerRef.current?.focus()); };

  return (
    <main id="top">
      <header className={`site-header ${headerScrolled ? "is-scrolled" : ""}`}>
        <BrandMark tone="black" />
        <nav className="desktop-nav" aria-label="Primary navigation">{["origin", "cuisine", "menus", "store", "reservation"].map((id, index) => <a href={`#${id}`} key={id}>{t.nav[index]}</a>)}</nav>
        <div className="language" aria-label="Language">{(["ja", "en", "zh"] as Lang[]).map(code => <button key={code} onClick={() => changeLanguage(code)} className={lang === code ? "is-active" : ""} aria-pressed={lang === code}>{code === "ja" ? "JA" : code === "en" ? "EN" : "中文"}</button>)}</div>
        <details className="mobile-nav"><summary aria-label="Menu"><span /><span /></summary><nav>{["origin", "cuisine", "menus", "store", "reservation"].map((id, index) => <a href={`#${id}`} key={id}>{t.nav[index]}</a>)}</nav></details>
      </header>

      <section className="hero" aria-label="CHOTEI">
        <img src="/images/real/hero-counter.webp" alt="長亭のカウンター席" fetchPriority="high" />
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
        <div className="philosophy__body">{t.philosophy.body.map((p, index) => <p key={p} className={index === 2 ? "is-highlight" : ""}>{p}</p>)}</div>
      </section>

      <section className="cuisine light-section" id="cuisine">
        <RailTitle label={t.cuisine.rail} />
        <div className="cuisine__layout">
          <div className="season-tabs" role="tablist" aria-label="Seasons">{seasonKeys.map(key => <button role="tab" aria-selected={season === key} className={season === key ? "is-active" : ""} key={key} onClick={() => { setSeason(key); setSeasonIndex(0); }}>{t.cuisine.seasons[key]}</button>)}</div>
          <div className="cuisine__stage" aria-live="off">{activeSeasonImages.map((image, index) => <img key={`${season}-${image}`} className={seasonIndex === index ? "is-active" : ""} src={`/images/real/${image}`} alt={t.cuisine.captions[season][index]} loading="lazy" aria-hidden={seasonIndex !== index} />)}</div>
        </div>
      </section>

      <section className="menus light-section" id="menus">
        <div className="menus__heading"><RailTitle label={t.menus.rail} /><p>{t.menus.notice}</p></div>
        <div className="priced-courses">{t.menus.basic.map((course, index) => <button className="priced-course" key={course.title} onClick={() => openCourse(course, basicCourseImages[index])}><span className="priced-course__image"><img src={`/images/real/${basicCourseImages[index]}`} alt={course.title} loading="lazy" /></span><b>{course.title}</b></button>)}</div>
        <div className="special-courses"><h3>{t.menus.specialLabel}</h3><div>{t.menus.featured.map((course, index) => <button key={course.title} onClick={() => openCourse(course, premiumCourseImages[index])}>{course.title}</button>)}</div></div>
      </section>

      <section className="store light-section" id="store">
        <div className="store__gallery">
          <div className="store__rail"><RailTitle label={t.space.rail} /></div>
          <div className="store__viewport">
            <div className={`store__track ${storeAnimating ? "is-animating" : ""}`} style={{ "--store-index": storeSlide } as CSSProperties} onTransitionEnd={event => { if (event.target === event.currentTarget && storeSlide === storeImages.length + 1) { setStoreAnimating(false); setStoreSlide(1); } }}>
              {storeSlides.map((image, index) => <figure key={`${image}-${index}`}><img src={`/images/real/${image}`} alt={t.space.labels[(index - 1 + storeImages.length) % storeImages.length]} loading="eager" decoding="async" /></figure>)}
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
        <div className="reservation__identity"><RailTitle label={t.reservation.rail} /><BrandMark variant="vertical" /></div>
        <div className="reservation__main"><h2>{t.reservation.button}</h2><a className="reserve-button" href="https://restaurant.ikyu.com/149159" target="_blank" rel="noreferrer"><span>{t.reservation.button}</span><i>↗</i></a><button type="button" ref={noticeTriggerRef} className="customer-notice-button" onClick={() => setNoticeOpen(true)}><span>{t.reservation.customerNotice}</span><i>＋</i></button></div>
      </section>

      <footer id="footer"><BrandMark variant="vertical" /><div className="footer__languages">{(["ja", "en", "zh"] as Lang[]).map(code => <button key={code} onClick={() => changeLanguage(code)} aria-pressed={lang === code}>{code === "ja" ? "JA" : code === "en" ? "EN" : "中文"}</button>)}</div><small>{t.footer.copyright}</small></footer>

      {selectedCourse && <div className="course-modal" role="dialog" aria-modal="true" aria-labelledby="course-title" onMouseDown={event => { if (event.target === event.currentTarget) setSelectedCourse(null); }}><article><button className="course-modal__close" onClick={() => setSelectedCourse(null)} aria-label={t.menus.close}>×</button><div className="course-modal__image"><img src={`/images/real/${selectedCourse.image}`} alt={selectedCourse.title} /></div><div className="course-modal__copy"><h2 id="course-title">{selectedCourse.title}</h2><ul>{selectedCourse.detail.map(item => <li key={item}>{item}</li>)}</ul></div></article></div>}
      {noticeOpen && <div className="notice-modal" role="dialog" aria-modal="true" aria-labelledby="notice-title" onMouseDown={event => { if (event.target === event.currentTarget) closeNotice(); }}><article><button type="button" ref={noticeCloseRef} className="notice-modal__close" onClick={closeNotice} aria-label={t.reservation.close}>×</button><header><div className="brand brand--vertical"><img src="/images/brand/logo-vertical-black.webp" alt="" /></div><h2 id="notice-title">{t.reservation.customerNotice}</h2></header><div className="notice-modal__body">{t.reservation.guidance.map(section => <section key={section.title}><h3>【{section.title}】</h3>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}</div></article></div>}
    </main>
  );
}
