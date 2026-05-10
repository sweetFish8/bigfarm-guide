import Link from "next/link";
import { notFound } from "next/navigation";
import { seasonalFarms, getSeasonal } from "../../../data/db";

export function generateStaticParams() {
  return seasonalFarms.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = getSeasonal(slug);
  if (!s) return {};
  return { title: `${s.name} | Bigfarm 季節限定マップ` };
}

export default async function SeasonalDetail({ params }) {
  const { slug } = await params;
  const s = getSeasonal(slug);
  if (!s) notFound();

  const grouped = (s.items || []).reduce((acc, it) => {
    (acc[it.type] ||= []).push(it);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-stone-500 mb-6">
        <Link href="/" className="hover:text-green-700">ホーム</Link>
        <span className="mx-2">/</span>
        <Link href="/database" className="hover:text-green-700">データベース</Link>
        <span className="mx-2">/</span>
        <Link href="/events/seasonal" className="hover:text-green-700">季節限定マップ</Link>
        <span className="mx-2">/</span>
        <span>{s.name}</span>
      </nav>

      <header className={`rounded-2xl p-8 text-white bg-gradient-to-br ${s.color || "from-purple-500 to-indigo-600"} shadow-md mb-8`}>
        <div className="flex items-center gap-5">
          <span className="text-6xl">{s.icon}</span>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{s.name}</h1>
            <p className="text-sm opacity-90 italic">{s.enName}</p>
          </div>
        </div>
        <p className="mt-4 leading-relaxed">{s.desc}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <span className="bg-white/20 rounded px-3 py-1">📅 {s.season}</span>
          {s.requirement && s.requirement !== "—" && (
            <span className="bg-white/20 rounded px-3 py-1">⚠️ {s.requirement}</span>
          )}
        </div>
      </header>

      {s.overview && s.overview.length > 0 && (
        <section className="bg-white rounded-2xl p-6 border border-stone-200 mb-6">
          <h2 className="text-xl font-bold text-green-800 mb-3">📋 イベント概要</h2>
          <ul className="space-y-2 text-stone-700 text-sm leading-relaxed">
            {s.overview.map((o, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-green-700 shrink-0">▸</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {Object.keys(grouped).length > 0 && (
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-green-800 mb-4">🗂 固有アイテム</h2>
          <div className="space-y-5">
            {Object.entries(grouped).map(([type, items]) => (
              <div key={type}>
                <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wide mb-2">
                  {type}
                </h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {items.map((it, i) => (
                    <li key={i} className="bg-white rounded-lg p-3 border border-amber-200">
                      <p className="font-semibold text-stone-800">{it.name}</p>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">{it.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-bold text-green-800 mb-3">🎁 報酬</h2>
        <p className="text-stone-700">{s.rewards}</p>
      </section>

      {s.tip && (
        <section className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-green-800 mb-3">💡 攻略のコツ</h2>
          <p className="text-stone-700 leading-relaxed">{s.tip}</p>
        </section>
      )}

      <div className="mt-6">
        <Link href="/events/seasonal" className="text-green-700 font-semibold hover:underline">
          ← 季節限定マップ一覧
        </Link>
      </div>
    </div>
  );
}
