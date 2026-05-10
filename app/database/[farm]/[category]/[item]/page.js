import Link from "next/link";
import { notFound } from "next/navigation";
import { farms, getFarm, getFarmCategory, getFarmItem } from "../../../../data/db";

export function generateStaticParams() {
  return farms.flatMap((f) =>
    f.categories.flatMap((c) =>
      c.items.map((i) => ({ farm: f.slug, category: c.slug, item: i.slug }))
    )
  );
}

export async function generateMetadata({ params }) {
  const { farm, category, item } = await params;
  const data = getFarmItem(farm, category, item);
  if (!data) return {};
  return {
    title: `${data.name}（${data.enName}）| Bigfarm 攻略`,
    description: data.desc || `${data.name} の詳細データ。`,
  };
}

const FIELD_LABELS = {
  unlockLv: "アンロック",
  seedCost: "種代",
  growTime: "成長時間",
  yield: "1収穫の収量",
  sellPrice: "販売価格",
  xp: "経験値",
  use: "用途",
  building: "建物",
  buildCost: "建設費",
  feed: "エサ",
  product: "生産物",
  cycleTime: "サイクル時間",
  byproduct: "副産物",
  process: "加工先",
  maxLv: "最大レベル",
  role: "役割",
  tip: "Tips",
  materials: "必要な原材料",
  time: "加工時間",
  facility: "加工施設",
};

const SHOWN_KEYS = Object.keys(FIELD_LABELS);

export default async function ItemPage({ params }) {
  const { farm, category, item } = await params;
  const f = getFarm(farm);
  const c = getFarmCategory(farm, category);
  const data = getFarmItem(farm, category, item);
  if (!f || !c || !data) notFound();

  const others = c.items.filter((i) => i.slug !== data.slug).slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        <Link href="/" className="hover:text-green-700 dark:text-green-400">ホーム</Link>
        <span className="mx-2">/</span>
        <Link href="/database" className="hover:text-green-700 dark:text-green-400">データベース</Link>
        <span className="mx-2">/</span>
        <Link href={`/database/${f.slug}`} className="hover:text-green-700 dark:text-green-400">{f.name}</Link>
        <span className="mx-2">/</span>
        <Link href={`/database/${f.slug}/${c.slug}`} className="hover:text-green-700 dark:text-green-400">{c.name}</Link>
        <span className="mx-2">/</span>
        <span>{data.name}</span>
      </nav>

      <header className="bg-white dark:bg-stone-900 rounded-2xl p-8 border border-stone-200 dark:border-stone-700 shadow-sm mb-8">
        <div className="flex items-center gap-5">
          <span className="text-7xl">{data.icon}</span>
          <div>
            <p className="text-sm text-stone-500 dark:text-stone-400 uppercase tracking-wide">
              {f.name} ／ {c.name}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-300">{data.name}</h1>
            <p className="text-stone-500 dark:text-stone-400 italic">{data.enName}</p>
          </div>
        </div>
        {data.desc && <p className="mt-6 text-stone-700 dark:text-stone-200 leading-relaxed">{data.desc}</p>}
      </header>

      <section className="bg-amber-50 dark:bg-stone-900 border border-amber-200 dark:border-amber-900 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4">📊 詳細データ</h2>
        <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {SHOWN_KEYS.map((key) =>
            data[key] !== undefined && data[key] !== "" ? (
              <div key={key} className="flex flex-col border-b border-amber-200 dark:border-amber-900 pb-2">
                <dt className="text-xs uppercase tracking-wide text-stone-500 dark:text-stone-400">
                  {FIELD_LABELS[key]}
                </dt>
                <dd className="text-stone-800 dark:text-stone-100 font-semibold">{String(data[key])}</dd>
              </div>
            ) : null
          )}
        </dl>
      </section>

      {others.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4">他の{c.name}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/database/${f.slug}/${c.slug}/${o.slug}`}
                className="flex items-center gap-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-3 hover:border-green-500 transition-colors"
              >
                <span className="text-2xl">{o.icon}</span>
                <span className="text-sm font-medium text-stone-700 dark:text-stone-200">{o.name}</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex gap-4">
            <Link href={`/database/${f.slug}/${c.slug}`} className="text-green-700 dark:text-green-400 font-semibold hover:underline">
              ← {c.name}一覧
            </Link>
            <Link href={`/database/${f.slug}`} className="text-green-700 dark:text-green-400 font-semibold hover:underline">
              ← {f.name} TOP
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
