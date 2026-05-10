"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "ホーム" },
    { href: "/#guide", label: "攻略ガイド" },
    { href: "/database", label: "データベース" },
    { href: "/#tips", label: "Tips" },
    { href: "/contact", label: "お問い合わせ" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-green-700 text-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Image
            src="/bigfarm-logo.jpg"
            alt="Big Farm"
            width={36}
            height={36}
            className="rounded-md object-cover"
          />
          <span><span className="font-display text-yellow-200">Bigfarm</span> 攻略</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative hover:text-yellow-300 transition-colors after:absolute after:left-0 after:bottom-[-4px] after:h-0.5 after:w-0 after:bg-yellow-300 after:transition-all hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-2xl"
            onClick={() => setOpen(!open)}
            aria-label="メニュー"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="md:hidden bg-green-800 px-4 py-3 space-y-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block hover:text-yellow-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
