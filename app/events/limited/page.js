import Link from "next/link";
import { limitedEvents } from "../../data/db";

export const metadata = {
  title: "期間限定イベント | Bigfarm 攻略",
  description: "メインファーム上で進行する Bigfarm の期間限定イベント一覧。",
};

export default function LimitedIndex() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <nav className="text-sm text-stone-500 mb-6">
        <Link href="/" className="hover:text-green-700">ホーム</Link>
        <span className="mx-2">/</span>
        <Link href="/database" className="hover:text-green-700">データベース</Link>
        <span className="mx-2">/</span>
        <span>期間限定イベント</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-3">
        🎯 期間限定イベント
      </h1>
      <p className="text-stone-600 mb-10 max-w-3xl">
        メインファーム上で進行するタスク系イベント。マップが新規開放されるタイプではなく、
        通常プレイの上で進行する点で「季節限定マップ」と区別されます。
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {limitedEvents.map((e) => (
          <Link
            key={e.slug}
            href={`/events/limited/${e.slug}`}
            className="block rounded-2xl p-6 bg-gradient-to-br from-yellow-500 to-amber-600 text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-5xl">{e.icon}</span>
              <div>
                <h2 className="text-xl font-bold">{e.name}</h2>
                <p className="text-xs opacity-90">{e.enName}</p>
              </div>
            </div>
            <p className="text-xs bg-white/20 rounded px-2 py-1 inline-block mb-3">
              📅 {e.period}
            </p>
            <p className="text-sm opacity-95">{e.desc}</p>
            <p className="mt-4 text-sm font-semibold underline">詳細を見る →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
