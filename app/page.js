import Image from "next/image";
import Link from "next/link";
import { farms } from "./data/db";

export default function Home() {
  const guides = [
    {
      icon: "🌱",
      title: "序盤の進め方",
      linkTo: "/database/main/crops",
      linkLabel: "メインの作物データを見る",
      points: [
        "Lv1で開放される畑と鶏舎を最大数まで設置し、トウモロコシ→鶏のエサ（風車小屋6分）→卵生産のサイクルを最優先で回す。",
        "Lv2で住宅を建てて作業員を確保。作業員不足は序盤最大のボトルネック。",
        "Lv5でサイロ、Lv7でコンポスターを解禁したらすぐ建設。フンを肥料に変え畑効率が跳ね上がる。",
        "ミッションに沿って進めると経験値ボーナスが大きく、自由建築よりレベルアップが早い。",
        "短時間作物（トウモロコシ5分）はログイン中、長時間作物（小麦）はログオフ前に植える時間帯別作付けを徹底。",
      ],
    },
    {
      icon: "🐄",
      title: "牧場・家畜のコツ",
      linkTo: "/database/main/animals",
      linkLabel: "家畜データを見る",
      points: [
        "鶏：Lv1から飼育可能。エサはトウモロコシ30本→6分加工と高回転で序盤の主力。",
        "豚：エサはキャベツ60個→25分加工。中期向けで肉製品に必須。",
        "牛：Lv14解禁。エサは小麦82本→2時間15分とサイクルが長いのでログオフ前にセット推奨。",
        "馬：ホースランチ専用ライン。本農場とは別管理。",
        "フンは捨てずサイロで肥料化し、畑の追肥に回すと収穫量が増える。",
      ],
    },
    {
      icon: "🏭",
      title: "加工施設の優先順位",
      linkTo: "/database/main/buildings",
      linkLabel: "建物データを見る",
      points: [
        "風車小屋：全家畜のエサ生産元。最優先で複数建てる。",
        "サイロ（Lv5）：肥料生産。畑効率の根幹で、Lv4はLv56で解禁。",
        "コンポスター（Lv7）：落ち葉を堆肥に変換。",
        "ベーカリー・搾乳所などの加工品は契約（マーケット）に出すと直販より3〜6%（最大+20%）多く売れる。",
        "原材料の在庫は常にバッファを残す。0にすると連鎖的に詰む。",
      ],
    },
    {
      icon: "💰",
      title: "コインと現金の稼ぎ方",
      linkTo: "/database/main/products",
      linkLabel: "加工品データを見る",
      points: [
        "ドル稼ぎは契約売却が最効率。直販より3〜6%増、上級者は最大+20%。",
        "ミッションクリアの一括報酬がドル収入の柱。建物起動はミッションタイミングと合わせて二重取り。",
        "ゴールドはレベルアップごとに約50支給。ダイアログでは必ず「ドル支払い」を選択。",
        "ゴールドは時間短縮ではなく、グルメファーム購入（Lv35で8,400ゴールド）など恒久的なボーナスに温存。",
      ],
    },
    {
      icon: "🤝",
      title: "協同組合（Co-op）",
      points: [
        "設立には375ゴールド必要。既存組合への参加は無料なので未加入なら即参加。",
        "組合Lv2到達で5,000ドル＋150ゴールドの報酬。",
        "共同村では資材を寄付し合い、共同施設の建設・アップグレードでメンバー全員に恒久ボーナス。",
        "共同研究で収集量削減や作業員枠拡大などソロでは得られない強化が可能。",
        "Lv20を超えても未加入だと共同ミッション報酬を取り逃して大幅に損する。",
      ],
    },
    {
      icon: "🎉",
      title: "イベント・サブ農場",
      points: [
        "グルメファーム：Lv26で20,000ドル、またはLv35で8,400ゴールドにて購入可。料理素材で利益を底上げ。",
        "ホースランチ：馬の繁殖と育成専用。トーナメント報酬で限定アイテムやデコ獲得。",
        "フィッシュファーム／フラワーバレー：季節イベントの舞台。装飾報酬と幸福度ブースト目的。",
        "季節イベント（マッシュルームシチュー、カウンティフェア等）開催中は本農場の生産物を温存して投入。",
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
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
              Bigfarm を、もっと楽しく。
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
                className="inline-block bg-white text-green-800 font-bold px-8 py-3 rounded-full hover:bg-yellow-100 transition-colors shadow-lg"
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-800">
          このサイトについて
        </h2>
        <p className="text-center text-stone-600 max-w-2xl mx-auto mb-8">
          Bigfarm を遊び込んだファンが運営する、非公式の攻略情報サイトです。
          序盤のチュートリアル後に「次に何をすべきか」迷った時に役立つ情報を集めました。
        </p>
        <ul className="flex flex-wrap justify-center gap-3 text-sm font-medium">
          <li className="bg-white text-stone-800 border border-stone-300 rounded-full px-4 py-2 shadow-sm">
            📘 わかりやすい解説
          </li>
          <li className="bg-white text-stone-800 border border-stone-300 rounded-full px-4 py-2 shadow-sm">
            ⚡ 効率重視
          </li>
          <li className="bg-white text-stone-800 border border-stone-300 rounded-full px-4 py-2 shadow-sm">
            🆕 随時更新
          </li>
        </ul>
      </section>

      {/* Database CTA */}
      <section id="database" className="bg-gradient-to-br from-emerald-50 to-amber-50 border-y border-stone-200 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-800">
            🗂 ファーム別データベース
          </h2>
          <p className="text-center text-stone-600 mb-10 max-w-2xl mx-auto">
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
      <section id="guide" className="bg-white border-y border-stone-200 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-800">
            攻略ガイド
          </h2>
          <p className="text-center text-stone-600 mb-10">
            ジャンル別に攻略情報をまとめました。気になる項目から読んでみてください。
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {guides.map((g) => (
              <article
                key={g.title}
                className="rounded-2xl p-6 bg-amber-50 border border-amber-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{g.icon}</div>
                  <h3 className="font-bold text-xl text-green-800">{g.title}</h3>
                </div>
                <ul className="space-y-2 text-sm text-stone-700 leading-relaxed">
                  {g.points.map((p, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-green-700 shrink-0">▸</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                {g.linkTo && (
                  <Link
                    href={g.linkTo}
                    className="inline-block mt-4 text-sm font-semibold text-green-700 hover:underline"
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-800">
          知っておきたい Tips
        </h2>
        <p className="text-center text-stone-600 mb-10">
          初心者がハマりがちな落とし穴と、知っておくと得するテクニック。
        </p>
        <ul className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
          {tips.map((t, i) => (
            <li
              key={i}
              className="flex gap-3 bg-white rounded-xl p-4 shadow-sm border border-stone-200"
            >
              <span className="text-2xl shrink-0">💡</span>
              <span className="text-stone-700 text-sm leading-relaxed">{t}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
