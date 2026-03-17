"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white/70 px-3 py-2 text-xs font-medium text-zinc-800 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-100"
        aria-label="Carregando tema"
      >
        <div className="h-3.5 w-3.5 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
        Tema
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white/70 px-3 py-2 text-xs font-medium text-zinc-800 backdrop-blur hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-100 dark:hover:bg-zinc-900 transition-colors"
      aria-label="Alternar tema"
    >
      {isDark ? (
        <>
          <Sun className="h-3.5 w-3.5" />
          <span>Dia</span>
        </>
      ) : (
        <>
          <Moon className="h-3.5 w-3.5" />
          <span>Noite</span>
        </>
      )}
    </button>
  );
}
