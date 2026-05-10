"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    applyTheme(initial);
    setTheme(initial);
    setMounted(true);
  }, []);

  function applyTheme(t) {
    if (t === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("theme", next);
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={`現在: ${isDark ? "ナイトモード" : "ライトモード"}（クリックで切替）`}
      title={isDark ? "ナイトモード（クリックでライトに）" : "ライトモード（クリックでナイトに）"}
      className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 border ${
        isDark
          ? "bg-indigo-900 border-indigo-700"
          : "bg-yellow-300 border-yellow-400"
      }`}
    >
      <span
        className={`absolute text-xs font-semibold transition-opacity ${
          isDark ? "right-2 text-indigo-200 opacity-100" : "right-2 opacity-0"
        }`}
      >
        🌙
      </span>
      <span
        className={`absolute text-xs font-semibold transition-opacity ${
          isDark ? "left-2 opacity-0" : "left-2 text-amber-700 opacity-100"
        }`}
      >
        ☀️
      </span>
      <span
        className={`absolute top-0.5 left-0.5 w-7 h-7 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center text-sm ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {mounted && (isDark ? "🌙" : "☀️")}
      </span>
    </button>
  );
}
