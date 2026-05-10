import Link from "next/link";
import { farms } from "../data/db";

export const metadata = {
  title: "データベース | Bigfarm 攻略サイト",
  description: "Bigfarm のメインファーム・サブ農場ごとのデータベース。各ファームの作物・家畜・建物・加工品を確認できます。",
};

export default function DatabaseIndex() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <nav className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        <Link href="/" className="hover:text-green-700 dark:text-green-400">ホーム</Link>
        <span className="mx-2">/</span>
        <span>データベース</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-300 mb-3">
        ファーム別データベース
      </h1>
      <p className="text-stone-600 dark:text-stone-300 mb-10 max-w-3xl">
        ファーム（メイン／ホースランチ／グルメ／フラワーバレー／フィッシュ）ごとに、
        作物・家畜・建物・加工品の個別データを確認できます。
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {farms.map((f) => (
          <Link
            key={f.slug}
            href={`/database/${f.slug}`}
            className={`group rounded-2xl p-6 text-white bg-gradient-to-br ${f.color} shadow-md hover:shadow-xl hover:-translate-y-1 transition-all`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-5xl">{f.icon}</span>
              <div>
                <h2 className="text-xl font-bold">{f.name}</h2>
                <p className="text-xs opacity-90">{f.enName}</p>
              </div>
            </div>
            <p className="text-sm opacity-95 mb-3">{f.desc}</p>
            <p className="text-xs bg-white/20 rounded px-2 py-1 inline-block mb-3">
              🔓 {f.unlock}
            </p>
            <p className="text-xs opacity-90">
              {f.categories.length} カテゴリ ／ {f.categories.reduce((n, c) => n + c.items.length, 0)} 項目
            </p>
            <p className="mt-3 text-sm font-semibold group-hover:underline">
              開く →
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Link
          href="/events/seasonal"
          className="block rounded-2xl p-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          <div className="text-4xl mb-2">🌌</div>
          <h2 className="text-xl font-bold mb-2">季節限定ファームマップ</h2>
          <p className="text-sm opacity-95">
            ノーザンライツ・イースター・クリスマス・ハロウィンなど、期間限定で開放される別マップ。
          </p>
          <p className="mt-3 text-sm font-semibold underline">一覧を見る →</p>
        </Link>
        <Link
          href="/events/limited"
          className="block rounded-2xl p-6 bg-gradient-to-br from-yellow-500 to-amber-600 text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          <div className="text-4xl mb-2">🎯</div>
          <h2 className="text-xl font-bold mb-2">期間限定イベント</h2>
          <p className="text-sm opacity-95">
            メインファーム上で進行するタスク系イベント（カウンティフェア／マッシュルームシチュー等）。
          </p>
          <p className="mt-3 text-sm font-semibold underline">一覧を見る →</p>
        </Link>
      </div>
    </div>
  );
}
