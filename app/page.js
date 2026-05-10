import Image from "next/image";
import Link from "next/link";
import { farms } from "./data/db";

export default function Home() {
  const guides = [
    {
      icon: "🌱",
      title: "序盤ロードマップ（Lv1〜30）",
      linkTo: "/database/main",
      linkLabel: "メインファームを見る",
      points: [
        "Lv1〜10：畑＋鶏舎を最大数設置。トウモロコシ→鶏のエサ→卵のサイクルを最優先で回す。住宅でWorkerを増やす。",
        "Lv5でサイロ、Lv7でコンポスター解禁。即建設して畑効率を底上げ。",
        "Lv12でベーカリー、Lv14で牛舎、Lv16で乳製品工房。ここからベーカリー・乳製品ラインがメイン収入源に。",
        "Lv25でグルメファーム購入が視野に（$50,000、または5,900ゴールドで先行）。Lv30で馬厩舎、ホースランチへの導線も開く。",
        "ミッションに沿って進めるとXPボーナスが大きい。自由建築は最低限。",
      ],
    },
    {
      icon: "🚜",
      title: "メインファームの基礎",
      linkTo: "/database/main",
      linkLabel: "メインファームDB",
      points: [
        "短時間作物（トウモロコシ5分）はログイン中、長時間作物（小麦30分／ヒマワリ8h30m）はログオフ前にセット。",
        "風車小屋を複数建て、鶏／豚／牛それぞれの飼料を切らさない構成にする。",
        "フンはサイロで堆肥化、落ち葉はコンポスターで腐植土に。畑の追肥に回すと収穫量が増える。",
        "加工品は契約（マーケット）に出すと直販より＋3〜6%、上級者は最大＋20%。",
        "倉庫拡張は最優先。容量不足で収穫を売り逃すと機会損失になる。",
      ],
    },
    {
      icon: "🍴",
      title: "グルメファーム攻略",
      linkTo: "/database/gourmet-farm",
      linkLabel: "グルメファームDB",
      points: [
        "解放：メインLv25で $50,000、Lv19で 5,900ゴールド先行購入。早めに買うほど中盤の収益が伸びる。",
        "ヤギ・アヒル・ロバはこの農場専用。タンポポ／ラムズレタス／大麦をWater Millで飼料化して与える。",
        "メインの卵・牛乳・小麦をグルメに輸送してRestaurantで料理化、Best Seller Shopで売却するチェーンが基本。",
        "Bakery Lv7アップグレードに$18,000,000必要。長期目標として徐々に投資する。",
        "ヤギチーズ（$3,200）はプレミアム契約で重宝するので最優先で生産ライン構築。",
      ],
    },
    {
      icon: "🏇",
      title: "ホースランチ攻略",
      linkTo: "/database/horse-ranch",
      linkLabel: "ホースランチDB",
      points: [
        "解放：メインLv30＋馬厩舎で馬をLv40まで育成するとHorse Shopが解放される。",
        "標準トレーニングは10 horseshoes／4時間、Lv×40を超えると20 horseshoesの集中トレーニングに移行。",
        "繁殖馬は両親の形質を継承するので、Speed系×Endurance系など狙った組み合わせを計画的に。",
        "競技はLester Crowley（馬場）／Old George（障害）／Tessa Townsend（レース）の3種。Golden Horseshoe獲得が目的。",
        "シーズンレースは Bronze→Silver→Gold→Platinum→Diamond。1出走 12 fuel（10/h回復）なのでfuel管理が鍵。",
      ],
    },
    {
      icon: "💐",
      title: "フラワーバレー攻略",
      linkTo: "/database/flower-valley",
      linkLabel: "フラワーバレーDB",
      points: [
        "解放：Meadow Lv39／Flower Shop Lv40。最終Lv7アップグレードはLv70で解禁される長期コンテンツ。",
        "Jasmine（2h／60〜80）／Lavender（5h／30〜40）／Vanilla（6h／110〜120）の3種を時間帯で使い分ける。",
        "Wildflower Bouquet（45分／$4,025〜$9,775）は短サイクル、Summer Bouquet（6h／$25,300〜$64,400）は長サイクル。",
        "Beehiveを併設すると蜂蜜が取れ、ハニーケーキ等の上位レシピに活かせる。",
        "HarborからNPC Olegに会うとフィッシュファーム解放クエストへの導線が開く。",
      ],
    },
    {
      icon: "🎣",
      title: "フィッシュファーム攻略",
      linkTo: "/database/fish-farm",
      linkLabel: "フィッシュファームDB",
      points: [
        "解放：フラワーバレーの港でOlegに会い「Patience is silver, but hooks are golden!」クエストを完了する。",
        "Boat ShopはFishing Lv15で解放。それまではボート1隻＋装備で出航する。",
        "高利益帯：Salmon／Cod／Swordfish。中堅：Lobster／Tuna／Herring。低利益：Shrimp／Oyster／Clam。",
        "Lobsterはケージ専用、Oysterはレーキ専用。装備を魚種に合わせて切り替える必要あり。",
        "ロブスター4匹→Special Lobster Chum 1個に加工可能。撒き餌で上位魚種狙いの効率を上げる。",
      ],
    },
    {
      icon: "💰",
      title: "資金繰り（全ファーム共通）",
      linkTo: "/database/main/products",
      linkLabel: "加工品DB",
      points: [
        "ドル稼ぎ：契約売却が最効率（直販＋3〜6%、上級者最大＋20%）。ミッション一括報酬と建物起動を同期。",
        "ゴールド：Lvアップごとに約50支給。ダイアログでは必ず「ドル支払い」を選択して温存する。",
        "ゴールドは恒久ボーナス購入だけに絞る。グルメファーム先行購入（5,900）は鉄板の使い道。",
        "サブ農場ごとに独立した経済（馬→Horseshoes、フラワー→Bouquet、フィッシュ→漁獲物）があるので並走で総収入が増える。",
        "幸福度を緑キープ。デコレーションをケチると起動コストが膨らみ赤字化する。",
      ],
    },
    {
      icon: "🤝",
      title: "協同組合・共通システム",
      points: [
        "設立は375ゴールド、既存組合参加は無料。Lv20までに必ず加入する。",
        "組合Lv2で5,000ドル＋150ゴールド。共同村では資材寄付で共同施設をアップグレードしメンバー全員に恒久ボーナス。",
        "共同研究で収集量削減や作業員枠拡大などソロ不可の強化が可能。",
        "テーマイベントは1〜2週ごとに循環、月数回。同時最大8イベントが走るので並走で red coupons を稼ぐ。",
        "季節限定マップ（イースター／クリスマス／ハロウィン等）は終了で全消去なので、最終週前に未交換通貨を全部使う。",
      ],
    },
  ];

  const tips = [
    "アイドル状態の生産建物はスペースと作業員のムダ。常にフル稼働させる。",
    "土地拡張を急ぎすぎない。今ある土地を完全活用してから広げる。",
    "幸福度メーターを緑にキープ。デコレーションをケチると起動コストが膨らみ赤字化する。",
    "鶏卵などは仕入と販売価格が逆転するアイテムもある。価格を確認してから契約に出す。",
    "ベーカリーや船積みミッション用に、原材料（小麦・牛乳など）は必ず在庫を残す。",
    "ゴールドを時間短縮に使うのは厳禁。恒久施設の購入だけに絞る。",
    "ミッション無視で自由建築すると経験値効率が著しく落ちる。",
    "倉庫拡張は最優先。容量不足で収穫を売り逃すと機会損失になる。",
  ];

  return (
    <>
      {/* Hero */}
      <section
        id="hero"
        className="relative bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 text-white overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <p className="text-sm md:text-base uppercase tracking-widest text-yellow-200 mb-4">
              Goodgame Big Farm 攻略サイト
            </p>
            <h1 className="text-4xl md:text-6xl font-black mb-6 drop-shadow-lg leading-tight">
              <span className="font-display text-yellow-200 mr-2">Bigfarm</span>を、もっと楽しく。
            </h1>
            <p className="text-base md:text-lg max-w-xl mb-8 text-green-50">
              初心者向けの基本ガイドから、上級者の効率プレイのコツまで。
              既存の攻略wikiの情報をもとに、農場経営をサポートする実用情報をまとめました。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a
                href="#guide"
                className="inline-block bg-yellow-400 text-stone-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition-colors shadow-lg"
              >
                攻略ガイドを見る
              </a>
              <Link
                href="/database"
                className="inline-block bg-white dark:bg-stone-900 text-green-800 dark:text-green-300 font-bold px-8 py-3 rounded-full hover:bg-yellow-100 transition-colors shadow-lg"
              >
                データベース
              </Link>
              <a
                href="https://bigfarm.goodgamestudios.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white/10 border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/20 transition-colors"
              >
                公式サイトへ
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <a
              href="https://bigfarm.goodgamestudios.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/20 hover:ring-yellow-300/60 transition"
            >
              <Image
                src="/bigfarm-logo.jpg"
                alt="Goodgame Big Farm 公式キービジュアル"
                width={400}
                height={300}
                priority
                className="w-full h-auto"
              />
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-800 dark:text-green-300">
          このサイトについて
        </h2>
        <p className="text-center text-stone-600 dark:text-stone-300 max-w-2xl mx-auto mb-8">
          Bigfarm を遊び込んだファンが運営する、非公式の攻略情報サイトです。
          序盤のチュートリアル後に「次に何をすべきか」迷った時に役立つ情報を集めました。
        </p>
        <ul className="flex flex-wrap justify-center gap-3 text-sm font-medium">
          <li className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded-full px-4 py-2 shadow-sm">
            📘 わかりやすい解説
          </li>
          <li className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded-full px-4 py-2 shadow-sm">
            ⚡ 効率重視
          </li>
          <li className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded-full px-4 py-2 shadow-sm">
            🆕 随時更新
          </li>
        </ul>
      </section>

      {/* Database CTA */}
      <section id="database" className="bg-gradient-to-br from-emerald-50 to-amber-50 dark:from-stone-900 dark:to-stone-950 border-y border-stone-200 dark:border-stone-700 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-800 dark:text-green-300">
            🗂 ファーム別データベース
          </h2>
          <p className="text-center text-stone-600 dark:text-stone-300 mb-10 max-w-2xl mx-auto">
            メインファームと各サブ農場ごとに、作物・家畜・建物・加工品の個別データを整理。
            アンロックレベル、生産時間、販売価格などを項目ごとに確認できます。
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {farms.map((f) => (
              <Link
                key={f.slug}
                href={`/database/${f.slug}`}
                className={`group rounded-2xl p-6 text-white bg-gradient-to-br ${f.color} shadow-md card-hover`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-5xl">{f.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold">{f.name}</h3>
                    <p className="text-xs opacity-90">{f.enName}</p>
                  </div>
                </div>
                <p className="text-xs opacity-95 mb-3">{f.desc}</p>
                <p className="text-xs bg-white/20 rounded px-2 py-1 inline-block">
                  {f.categories.reduce((n, c) => n + c.items.length, 0)} 項目
                </p>
                <p className="mt-3 text-sm font-semibold group-hover:underline">
                  開く →
                </p>
              </Link>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2 mt-8">
            <Link
              href="/events/seasonal"
              className="block rounded-2xl p-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md card-hover"
            >
              <div className="text-4xl mb-2">🌌</div>
              <h3 className="text-xl font-bold mb-1">季節限定ファームマップ</h3>
              <p className="text-sm opacity-95">ノーザンライツ・イースター・クリスマス・ハロウィン</p>
              <p className="mt-3 text-sm font-semibold underline">一覧を見る →</p>
            </Link>
            <Link
              href="/events/limited"
              className="block rounded-2xl p-6 bg-gradient-to-br from-yellow-500 to-amber-600 text-white shadow-md card-hover"
            >
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="text-xl font-bold mb-1">期間限定イベント</h3>
              <p className="text-sm opacity-95">マッシュルームシチュー・カウンティフェア他</p>
              <p className="mt-3 text-sm font-semibold underline">一覧を見る →</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Guide */}
      <section id="guide" className="bg-white dark:bg-stone-900 border-y border-stone-200 dark:border-stone-700 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-800 dark:text-green-300">
            ファーム横断 攻略ガイド
          </h2>
          <p className="text-center text-stone-600 dark:text-stone-300 mb-10">
            メインファームだけでなく、グルメ／ホースランチ／フラワーバレー／フィッシュなどサブ農場の攻略も合わせてまとめました。
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <article
                key={g.title}
                className="rounded-2xl p-6 bg-amber-50 dark:bg-stone-900 border border-amber-200 dark:border-amber-900 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{g.icon}</div>
                  <h3 className="font-bold text-xl text-green-800 dark:text-green-300">{g.title}</h3>
                </div>
                <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-200 leading-relaxed">
                  {g.points.map((p, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-green-700 dark:text-green-400 shrink-0">▸</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                {g.linkTo && (
                  <Link
                    href={g.linkTo}
                    className="inline-block mt-4 text-sm font-semibold text-green-700 dark:text-green-400 hover:underline"
                  >
                    {g.linkLabel} →
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section id="tips" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-800 dark:text-green-300">
          知っておきたい Tips
        </h2>
        <p className="text-center text-stone-600 dark:text-stone-300 mb-10">
          初心者がハマりがちな落とし穴と、知っておくと得するテクニック。
        </p>
        <ul className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
          {tips.map((t, i) => (
            <li
              key={i}
              className="flex gap-3 bg-white dark:bg-stone-900 rounded-xl p-4 shadow-sm border border-stone-200 dark:border-stone-700"
            >
              <span className="text-2xl shrink-0">💡</span>
              <span className="text-stone-700 dark:text-stone-200 text-sm leading-relaxed">{t}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
