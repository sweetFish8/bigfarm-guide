import Link from "next/link";
import { notFound } from "next/navigation";
import { farms, getFarm, getFarmCategory } from "../../../data/db";

export function generateStaticParams() {
  return farms.flatMap((f) =>
    f.categories.map((c) => ({ farm: f.slug, category: c.slug }))
  );
}

export async function generateMetadata({ params }) {
  const { farm, category } = await params;
  const f = getFarm(farm);
  const c = getFarmCategory(farm, category);
  if (!f || !c) return {};
  return {
    title: `${f.name} - ${c.name}一覧 | Bigfarm 攻略`,
    description: `${f.name}の${c.name}データベース。`,
  };
}

export default async function CategoryPage({ params }) {
  const { farm, category } = await params;
  const f = getFarm(farm);
  const c = getFarmCategory(farm, category);
  if (!f || !c) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <nav className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        <Link href="/" className="hover:text-green-700 dark:text-green-400">ホーム</Link>
        <span className="mx-2">/</span>
        <Link href="/database" className="hover:text-green-700 dark:text-green-400">データベース</Link>
        <span className="mx-2">/</span>
        <Link href={`/database/${f.slug}`} className="hover:text-green-700 dark:text-green-400">{f.name}</Link>
        <span className="mx-2">/</span>
        <span>{c.name}</span>
      </nav>

      <div className="flex items-center gap-4 mb-3">
        <span className="text-5xl">{c.icon}</span>
        <div>
          <p className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wide">{f.name}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-300">
            {c.name}一覧
          </h1>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        {c.items.map((item) => (
          <Link
            key={item.slug}
            href={`/database/${f.slug}/${c.slug}/${item.slug}`}
            className="block bg-white dark:bg-stone-900 rounded-xl p-5 border border-stone-200 dark:border-stone-700 hover:border-green-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{item.icon}</span>
              <div>
                <h2 className="font-bold text-lg text-green-800 dark:text-green-300">{item.name}</h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">{item.enName}</p>
              </div>
            </div>
            <dl className="text-xs text-stone-600 dark:text-stone-300 space-y-1 mt-3">
              {item.unlockLv !== undefined && (
                <div className="flex justify-between">
                  <dt>解禁</dt>
                  <dd className="font-semibold">{typeof item.unlockLv === "number" ? `Lv ${item.unlockLv}` : item.unlockLv}</dd>
                </div>
              )}
              {item.growTime && (
                <div className="flex justify-between">
                  <dt>成長</dt>
                  <dd>{item.growTime}</dd>
                </div>
              )}
              {item.cycleTime && (
                <div className="flex justify-between">
                  <dt>サイクル</dt>
                  <dd>{item.cycleTime}</dd>
                </div>
              )}
              {item.time && (
                <div className="flex justify-between">
                  <dt>加工</dt>
                  <dd>{item.time}</dd>
                </div>
              )}
              {item.sellPrice && (
                <div className="flex justify-between">
                  <dt>販売</dt>
                  <dd className="font-semibold text-amber-700 dark:text-amber-300 text-right">{item.sellPrice}</dd>
                </div>
              )}
            </dl>
            <p className="mt-3 text-xs text-green-700 dark:text-green-400 font-semibold">詳細を見る →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
