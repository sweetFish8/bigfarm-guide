"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", category: "general", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "お名前を入力してください";
    if (!form.email.trim()) e.email = "メールアドレスを入力してください";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "メールアドレスの形式が正しくありません";
    if (!form.message.trim()) e.message = "お問い合わせ内容を入力してください";
    else if (form.message.trim().length < 10) e.message = "10文字以上で入力してください";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 animate-fade-in-up">
        <div className="bg-card border border-card-border rounded-2xl p-10 text-center shadow-md">
          <div className="text-6xl mb-4 animate-float">✅</div>
          <h1 className="text-2xl font-bold text-accent mb-3">送信ありがとうございました</h1>
          <p className="text-muted mb-6">
            お問い合わせを受け付けました。内容を確認のうえ、担当者よりご連絡いたします。
          </p>
          <div className="bg-amber-50 dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-lg p-4 text-sm text-left mb-6">
            <p><span className="font-semibold">お名前：</span>{form.name}</p>
            <p><span className="font-semibold">メール：</span>{form.email}</p>
            <p><span className="font-semibold">種別：</span>{form.category}</p>
          </div>
          <Link
            href="/"
            className="inline-block bg-green-700 text-white font-bold px-6 py-3 rounded-full hover:bg-green-600 transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in-up">
      <nav className="text-sm text-muted mb-6">
        <Link href="/" className="hover:text-accent">ホーム</Link>
        <span className="mx-2">/</span>
        <span>お問い合わせ</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-accent mb-3">お問い合わせ</h1>
      <p className="text-muted mb-8">
        攻略情報の誤りのご指摘、追加して欲しいトピック、その他ご感想など、お気軽にどうぞ。
      </p>

      <form onSubmit={handleSubmit} className="bg-card border border-card-border rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
        <Field label="お名前" required error={errors.name}>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-lg border border-card-border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="山田 太郎"
          />
        </Field>

        <Field label="メールアドレス" required error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-lg border border-card-border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="example@mail.com"
          />
        </Field>

        <Field label="お問い合わせ種別" required>
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="w-full rounded-lg border border-card-border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="general">ご感想・ご意見</option>
            <option value="correction">攻略情報の誤りの指摘</option>
            <option value="request">追加して欲しいトピック</option>
            <option value="other">その他</option>
          </select>
        </Field>

        <Field label="お問い合わせ内容" required error={errors.message}>
          <textarea
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={6}
            className="w-full rounded-lg border border-card-border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-y"
            placeholder="ご質問・ご意見など（10文字以上）"
          />
          <p className="text-xs text-muted mt-1 text-right">
            {form.message.length} 文字
          </p>
        </Field>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-green-700 hover:bg-green-600 text-white font-bold py-3 rounded-full transition-all hover:shadow-lg active:scale-95"
          >
            送信する
          </button>
          <button
            type="button"
            onClick={() => setForm({ name: "", email: "", category: "general", message: "" })}
            className="px-6 py-3 rounded-full border border-card-border hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            クリア
          </button>
        </div>
      </form>

      <p className="text-xs text-muted mt-6 text-center">
        ※ このフォームはデモです。実際の送信は行われません。
      </p>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </label>
  );
}
