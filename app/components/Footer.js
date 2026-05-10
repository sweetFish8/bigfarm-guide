export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="font-bold text-lg mb-2">🌾 Bigfarm 攻略</h3>
          <p className="text-sm text-stone-400">
            農業ゲーム Bigfarm の非公式攻略サイト。初心者から上級者まで役立つ情報をお届けします。
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">コンテンツ</h4>
          <ul className="text-sm space-y-1 text-stone-400">
            <li><a href="/#guide" className="hover:text-yellow-300">攻略ガイド</a></li>
            <li><a href="/database" className="hover:text-yellow-300">データベース</a></li>
            <li><a href="/#tips" className="hover:text-yellow-300">Tips</a></li>
            <li><a href="/#about" className="hover:text-yellow-300">サイトについて</a></li>
            <li><a href="/contact" className="hover:text-yellow-300">お問い合わせ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">注意</h4>
          <p className="text-sm text-stone-400">
            当サイトはファンによる非公式攻略サイトです。Bigfarm および関連する全ての商標は権利者に帰属します。
          </p>
        </div>
      </div>
      <div className="border-t border-stone-700 text-center py-4 text-xs text-stone-500 dark:text-stone-400">
        © {new Date().getFullYear()} Bigfarm 攻略サイト
      </div>
    </footer>
  );
}
