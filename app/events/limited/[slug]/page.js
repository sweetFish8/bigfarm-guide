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
      <nav className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        <Link href="/" className="hover:text-green-700 dark:text-green-400">ホーム</Link>
        <span className="mx-2">/</span>
        <Link href="/database" className="hover:text-green-700 dark:text-green-400">データベース</Link>
        <span className="mx-2">/</span>
        <Link href="/events/limited" className="hover:text-green-700 dark:text-green-400">期間限定イベント</Link>
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

      <section className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-700 mb-6">
        <h2 className="text-xl font-bold text-green-800 dark:text-green-300 mb-3">概要</h2>
        <p className="text-stone-700 dark:text-stone-200 leading-relaxed">{e.desc}</p>
      </section>

      <section className="bg-amber-50 dark:bg-stone-900 border border-amber-200 dark:border-amber-900 rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-bold text-green-800 dark:text-green-300 mb-3">🎁 報酬</h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">▸ をクリックすると詳細を表示します</p>
        <ul className="space-y-2 text-stone-700 dark:text-stone-200">
          {e.rewards.map((r, i) => {
            const label = typeof r === "string" ? r : r.label;
            const detail = typeof r === "string" ? null : r.detail;
            if (!detail) {
              return (
                <li key={i} className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-300 shrink-0">▸</span>
                  <span>{label}</span>
                </li>
              );
            }
            return (
              <li key={i}>
                <details className="group bg-white dark:bg-stone-900 rounded-lg border border-amber-200 dark:border-amber-900 open:shadow-md transition-shadow">
                  <summary className="cursor-pointer flex gap-2 px-3 py-2 list-none items-start hover:bg-amber-50 dark:bg-stone-900 rounded-lg">
                    <span className="text-amber-700 dark:text-amber-300 shrink-0 transition-transform group-open:rotate-90">▸</span>
                    <span className="flex-1">{label}</span>
                  </summary>
                  <p className="px-3 pb-3 pt-1 text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-amber-100 dark:border-amber-900 ml-6 mr-2">
                    {detail}
                  </p>
                </details>
              </li>
            );
          })}
        </ul>
      </section>

      {e.tip && (
        <section className="bg-green-50 dark:bg-stone-900 border border-green-200 dark:border-green-900 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-green-800 dark:text-green-300 mb-3">💡 攻略のコツ</h2>
          <p className="text-stone-700 dark:text-stone-200 leading-relaxed">{e.tip}</p>
        </section>
      )}

      <div className="mt-6">
        <Link href="/events/limited" className="text-green-700 dark:text-green-400 font-semibold hover:underline">
          ← 期間限定イベント一覧
        </Link>
      </div>
    </div>
  );
}
