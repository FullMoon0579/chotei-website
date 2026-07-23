const sakeList = [
  ["寫楽", "純米吟醸 福乃香 生酒"],
  ["東洋美人", "醇道一途 雄町"],
  ["宮寒梅", "純米吟醸"],
  ["楯野川", "本流辛口 純米大吟醸"],
  ["作", "雅乃智"],
  ["鳳凰美田", "山田錦 五割磨き 純米吟醸"],
];

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand-mark ${light ? "brand-mark--light" : ""}`} href="#top" aria-label="長亭 トップ">
      <span className="brand-kanji">長亭</span>
      <span className="brand-roman">ROPPONGI · CHOTEI</span>
    </a>
  );
}

function SectionTitle({ ja, en }: { ja: string; en: string }) {
  return (
    <div className="section-title">
      <span className="section-title__line" />
      <h2>{ja}</h2>
      <p>{en}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <BrandMark light />
        <nav className="desktop-nav" aria-label="主要导航">
          <a href="#origin">長亭由来</a>
          <a href="#cuisine">お料理</a>
          <a href="#sake">日本酒</a>
          <a href="#philosophy">私たちについて</a>
          <a href="#reservation">ご予約</a>
        </nav>
        <details className="mobile-nav">
          <summary aria-label="菜单"><span /><span /></summary>
          <nav>
            <a href="#origin">長亭由来</a>
            <a href="#cuisine">お料理</a>
            <a href="#sake">日本酒</a>
            <a href="#philosophy">私たちについて</a>
            <a href="#reservation">ご予約</a>
          </nav>
        </details>
      </header>

      <section className="hero" aria-label="長亭 品牌首页">
        <div className="hero__shade" />
        <div className="hero__copy">
          <p className="eyebrow">Chinese Cuisine Meets Japanese Sake</p>
          <h1>
            <span>中華料理と</span>
            <span>日本酒の邂逅</span>
          </h1>
          <p className="hero__sub">一席一会、酒と料理で結ぶ二つの故郷。</p>
        </div>
        <a className="hero__scroll" href="#origin"><span>SCROLL</span></a>
      </section>

      <section className="origin section-pad" id="origin">
        <SectionTitle ja="長亭由来" en="ORIGIN" />
        <div className="origin__grid">
          <div className="origin__lead">
            <p>十里に一亭。</p>
            <p>別れを惜しみ、</p>
            <p>帰りを迎える場所。</p>
          </div>
          <div className="prose prose--wide">
            <p>
              古来、中国では城外に亭を設け、五里ごとに「短亭」、十里ごとに「長亭」と呼びました。
              長亭は、親友を見送り、酒宴を設けて餞とする場であり、旅人が故郷へ帰る折には、
              親しい人々が迎え入れる場所でもありました。
            </p>
            <p>
              李白の詩に「何処か帰程は、長亭また短亭」と詠まれるその情景に、
              私たちの名は由来します。遠く離れた文化が出会い、またここで再会する。
              その一夜が、皆さまの心に残るひとときとなりますように。
            </p>
          </div>
        </div>
        <div className="origin__stamp" aria-hidden="true">
          <span>長</span><span>亭</span>
        </div>
      </section>

      <section className="philosophy" id="philosophy">
        <div className="philosophy__image" role="img" aria-label="温かい木のカウンターがある長亭の空間" />
        <div className="philosophy__content">
          <SectionTitle ja="ごあいさつ" en="OUR PHILOSOPHY" />
          <p className="philosophy__statement">
            伝統に敬意を払い、<br />
            境界を静かに越えてゆく。
          </p>
          <div className="prose">
            <p>
              中華料理の深い歴史に、フランス料理のエスプリと日本の懐石の美意識を重ね、
              素材の声がまっすぐ届く一皿へ。中国に生まれ、日本を我が家とする店主が、
              二つの文化を料理と酒で結びます。
            </p>
          </div>
        </div>
      </section>

      <section className="cuisine section-pad" id="cuisine">
        <SectionTitle ja="お料理" en="CUISINE" />
        <div className="feature-grid">
          <figure className="feature-image feature-image--food">
            <figcaption>季節の一皿 <span>SEASONAL COURSE</span></figcaption>
          </figure>
          <div className="feature-copy">
            <p className="feature-number">壱</p>
            <h3>余韻を設計する、<br />創作中華。</h3>
            <p>
              広東料理をはじめとする伝統の技を礎に、旬の香り、温度、食感を繊細に組み立てます。
              目指すのは驚きのための革新ではなく、心から「美味しい」と感じていただける一皿です。
            </p>
            <a className="text-link" href="#reservation">おまかせコースについて <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="sake section-pad" id="sake">
        <div className="sake__heading">
          <SectionTitle ja="地の酒" en="JAPANESE SAKE" />
          <p>
            日本各地を巡り、その土地の水と米、造り手の哲学が息づく酒を選びます。
            創作中華との一期一会の調和をお楽しみください。
          </p>
        </div>
        <div className="sake__grid">
          <div className="sake__photo" role="img" aria-label="檜のカウンターに置かれた日本酒と酒器" />
          <div className="sake__list">
            <p className="sake__kicker">SELECTION — 季節の一例</p>
            {sakeList.map(([name, detail]) => (
              <div className="sake__item" key={name + detail}>
                <strong>{name}</strong>
                <span>{detail}</span>
              </div>
            ))}
            <p className="sake__note">※ 入荷により内容は変わります。</p>
          </div>
        </div>
      </section>

      <section className="manifesto">
        <p className="manifesto__en">A table between two homelands.</p>
        <p className="manifesto__ja">異郷で出会い、<br />一つの食卓になる。</p>
        <p className="manifesto__body">
          地の酒と創作中華が織りなす、<br />
          ここでしか生まれない時間を。
        </p>
      </section>

      <section className="reservation" id="reservation">
        <div className="reservation__side">
          <SectionTitle ja="ご予約" en="RESERVATION" />
        </div>
        <div className="reservation__main">
          <p className="reservation__label">OMAKASE</p>
          <h2>今宵、長亭で<br />お会いしましょう。</h2>
          <p>
            お席・コース内容・アレルギー等については、<br />
            ご予約時にお知らせください。
          </p>
          <a className="button" href="mailto:reservation@chotei.jp?subject=長亭 ご予約お問い合わせ">
            <span>ご予約・お問い合わせ</span><span>↗</span>
          </a>
          <small>予約先の正式なメールアドレスに差し替えてご利用ください。</small>
        </div>
      </section>

      <footer>
        <BrandMark />
        <div className="footer__words">
          <span>中華料理</span><i>×</i><span>日本酒</span><i>×</i><span>一期一会</span>
        </div>
        <p>© CHOTEI. All rights reserved.</p>
      </footer>
    </main>
  );
}
