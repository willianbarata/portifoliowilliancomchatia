"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  if (!pathname) return null;

  const targetLocale = locale === "pt" ? "en" : "pt";
  const segments = pathname.split("/");
  
  // locales supported
  const locales = ["pt", "en"];
  
  let targetPathname;
  
  if (locales.includes(segments[1])) {
    // Current URL has a locale prefix (e.g., /en/about or /pt/about)
    if (targetLocale === "pt") {
      // Switch en -> pt (default): remove prefix /en
      segments.splice(1, 1);
      targetPathname = segments.join("/") || "/";
    } else {
      // Switch pt -> en (if /pt was explicit): replace prefix
      segments[1] = targetLocale;
      targetPathname = segments.join("/");
    }
  } else {
    // Current URL has no locale prefix (likely /about or /)
    if (targetLocale === "pt") {
      // Switching to default from nothing? Should not happen if detected correctly, but safety:
      targetPathname = pathname;
    } else {
      // Switch pt (default) -> en: prepend /en
      targetPathname = `/${targetLocale}${pathname === "/" ? "" : pathname}`;
    }
  }

  return (
    <Link
      className="rounded-md border border-zinc-200 bg-white/70 px-2 py-1 text-xs font-medium text-zinc-800 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-100 dark:hover:bg-zinc-900 transition-colors"
      href={targetPathname}
    >
      {locale === "pt" ? "EN" : "PT"}
    </Link>
  );
}
