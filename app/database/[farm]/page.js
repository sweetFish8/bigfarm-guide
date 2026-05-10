import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { farms, getFarm } from "../../data/db";

export function generateStaticParams() {
  return farms.map((f) => ({ farm: f.slug }));
}

export async function generateMetadata({ params }) {
  const { farm } = await params;
  const f = getFarm(farm);
  if (!f) return {};
  return {
    title: `${f.name} | Bigfarm 攻略サイト`,
    description: f.desc,
  };
}

export default async function FarmPage({ params }) {
  const { farm } = await params;
  const f = getFarm(farm);
  if (!f) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <nav className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        <Link href="/" className="hover:text-green-700 dark:text-green-400">ホーム</Link>
        <span className="mx-2">/</span>
        <Link href="/database" className="hover:text-green-700 dark:text-green-400">データベース</Link>
        <span className="mx-2">/</span>
        <span>{f.name}</span>
      </nav>

      <header className={`relative overflow-hidden rounded-2xl text-white bg-gradient-to-br ${f.color} shadow-md mb-8`}>
        {f.image && (
          <Image
            src={f.image}
            alt={f.name}
            width={1200}
            height={400}
            priority
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        )}
        <div className={`relative p-8 bg-gradient-to-br ${f.color} ${f.image ? "bg-opacity-60 mix-blend-multiply" : ""}`}>
          <div className="flex items-center gap-5">
            <span className="text-6xl drop-shadow-lg">{f.icon}</span>
            <div className="drop-shadow-md">
              <h1 className="text-3xl md:text-4xl font-bold">{f.name}</h1>
              <p className="text-sm opacity-90 italic">{f.enName}</p>
            </div>
          </div>
          <p className="mt-4 leading-relaxed drop-shadow">{f.desc}</p>
          <p className="mt-3 text-sm bg-black/30 rounded px-3 py-1 inline-block">
            🔓 解放条件：{f.unlock}
          </p>
        </div>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {f.categories.map((c) => (
          <Link
            key={c.slug}
            href={`/database/${f.slug}/${c.slug}`}
            className="block bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-700 hover:border-green-500 hover:shadow-md transition-all"
          >
            <div className="text-5xl mb-3">{c.icon}</div>
            <h2 className="text-xl font-bold text-green-800 dark:text-green-300 mb-1">{c.name}</h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">{c.items.length} 項目</p>
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">一覧を見る →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
