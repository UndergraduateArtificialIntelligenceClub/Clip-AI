"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Moon, Sparkles, Sun } from "lucide-react";

const navItems = [
  { label: "Upload", href: "/" },
  { label: "Pipeline", href: "/videos" },
  { label: "Studio", href: "/videos" },
  { label: "History", href: "/videos" },
];

function getThemeSnapshot() {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("clip-ai-theme")
    ? localStorage.getItem("clip-ai-theme") === "dark"
    : true;
}

function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener("clip-ai-theme-change", onStoreChange);
  return () => window.removeEventListener("clip-ai-theme-change", onStoreChange);
}

export default function Navbar() {
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => true,
  );

  function toggleTheme() {
    const nextDark = !isDark;
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("clip-ai-theme", nextDark ? "dark" : "light");
    window.dispatchEvent(new Event("clip-ai-theme-change"));
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-white/8 dark:bg-[#09090d]/85">
      <nav className="relative flex h-[72px] w-full items-center justify-between px-5 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-[0_8px_24px_rgba(139,92,246,.28)]">
            <Sparkles className="h-[19px] w-[19px]" strokeWidth={2.2} />
          </span>
          <span>
            <span className="block text-[17px] font-bold leading-[18px] tracking-tight text-slate-950 dark:text-white">
              Clip-AI
            </span>
            <span className="mt-1 block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Long-Form → Viral Shorts
            </span>
          </span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-slate-200 bg-slate-100/70 p-1 md:flex dark:border-white/8 dark:bg-white/[0.035]">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={
                index === 0
                  ? "rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm dark:bg-white/10 dark:text-white"
                  : "rounded-full px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light Mode" : "Dark Mode"}
            className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-white/8 dark:bg-white/[0.055] dark:text-slate-200 dark:hover:bg-white/10"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
          </button>
          <button
            type="button"
            className="h-11 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-600 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-400"
          >
            Sign In
          </button>
        </div>
      </nav>
    </header>
  );
}
