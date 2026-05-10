import Link from "next/link";
import { seasonalFarms } from "../../data/db";

export const metadata = {
  title: "季節限定ファームマップ | Bigfarm 攻略",
  description: "ノーザンライツ・イースター・クリスマス・ハロウィンなど、Bigfarmの期間限定で開放される別マップ一覧。",
};

export default function SeasonalIndex() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <nav className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        <Link href="/" className="hover:text-green-700 dark:text-green-400">ホーム</Link>
        <span className="mx-2">/</span>
        <Link href="/database" className="hover:text-green-700 dark:text-green-400">データベース</Link>
        <span className="mx-2">/</span>
        <span>季節限定ファームマップ</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-300 mb-3">
        🌌 季節限定ファームマップ
      </h1>
      <p className="text-stone-600 dark:text-stone-300 mb-10 max-w-3xl">
        期間中だけ開放される別マップ。期間終了で全アイテムが消去され、補償アイテムが配布されます。
        通常のサブ農場とは別枠です。
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {seasonalFarms.map((s) => (
          <Link
            key={s.slug}
            href={`/events/seasonal/${s.slug}`}
            className={`block rounded-2xl p-6 bg-gradient-to-br ${s.color || "from-purple-500 to-indigo-600"} text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-5xl">{s.icon}</span>
              <div>
                <h2 className="text-xl font-bold">{s.name}</h2>
                <p className="text-xs opacity-90">{s.enName}</p>
              </div>
            </div>
            <p className="text-xs bg-white/20 rounded px-2 py-1 inline-block mb-3">
              📅 {s.season}
            </p>
            <p className="text-sm opacity-95 mb-3">{s.desc}</p>
            {s.items && (
              <p className="text-xs opacity-90">{s.items.length} アイテム収録</p>
            )}
            <p className="mt-3 text-sm font-semibold underline">詳細を見る →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
