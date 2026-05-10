import Link from "next/link";
import { notFound } from "next/navigation";
import { limitedEvents, getLimitedEvent } from "../../../data/db";

export function generateStaticParams() {
  return limitedEvents.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const e = getLimitedEvent(slug);
  if (!e) return {};
  return { title: `${e.name} | Bigfarm 期間限定イベント` };
}

export default async function LimitedDetail({ params }) {
  const { slug } = await params;
  const e = getLimitedEvent(slug);
  if (!e) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-stone-500 mb-6">
        <Link href="/" className="hover:text-green-700">ホーム</Link>
        <span className="mx-2">/</span>
        <Link href="/database" className="hover:text-green-700">データベース</Link>
        <span className="mx-2">/</span>
        <Link href="/events/limited" className="hover:text-green-700">期間限定イベント</Link>
        <span className="mx-2">/</span>
        <span>{e.name}</span>
      </nav>

      <header className="rounded-2xl p-8 text-white bg-gradient-to-br from-yellow-500 to-amber-600 shadow-md mb-8">
        <div className="flex items-center gap-5">
          <span className="text-6xl">{e.icon}</span>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{e.name}</h1>
            <p className="text-sm opacity-90 italic">{e.enName}</p>
          </div>
        </div>
        <p className="mt-4 text-sm bg-white/20 rounded px-3 py-1 inline-block">
          📅 {e.period}
        </p>
      </header>

      <section className="bg-white rounded-2xl p-6 border border-stone-200 mb-6">
        <h2 className="text-xl font-bold text-green-800 mb-3">概要</h2>
        <p className="text-stone-700 leading-relaxed">{e.desc}</p>
      </section>

      <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-bold text-green-800 mb-3">🎁 報酬</h2>
        <ul className="space-y-2 text-stone-700">
          {e.rewards.map((r, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-amber-700 shrink-0">▸</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </section>

      {e.tip && (
        <section className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-green-800 mb-3">💡 攻略のコツ</h2>
          <p className="text-stone-700 leading-relaxed">{e.tip}</p>
        </section>
      )}

      <div className="mt-6">
        <Link href="/events/limited" className="text-green-700 font-semibold hover:underline">
          ← 期間限定イベント一覧
        </Link>
      </div>
    </div>
  );
}
