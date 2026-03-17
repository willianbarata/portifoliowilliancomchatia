import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { LocaleSync } from "@/components/navigation/LocaleSync";

export function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const nav = await getTranslations("nav");

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleSync locale={locale} />
      <div className="min-h-screen">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-500/12 blur-3xl dark:bg-blue-500/25" />
          <div className="absolute -right-32 top-24 h-[420px] w-[420px] rounded-full bg-sky-400/10 blur-3xl dark:bg-indigo-500/20" />
          <div className="absolute bottom-0 left-1/3 h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-3xl dark:bg-cyan-400/15" />
        </div>

        <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/70 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/50">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
            <Link
              className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
              href={`/${locale}`}
            >
              Willian Barata
            </Link>
            <nav className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-200">
              <Link className="hover:text-blue-600 dark:hover:text-blue-400" href={`/${locale}`}>
                {nav("home")}
              </Link>
              <Link className="hover:text-blue-600 dark:hover:text-blue-400" href={`/${locale}/about`}>
                {nav("about")}
              </Link>
              <Link className="hover:text-blue-600 dark:hover:text-blue-400" href={`/${locale}/projects`}>
                {nav("projects")}
              </Link>
              <Link className="hover:text-blue-600 dark:hover:text-blue-400" href={`/${locale}/articles`}>
                {nav("articles")}
              </Link>
            {/* <Link className="hover:text-blue-600 dark:hover:text-blue-400" href="/admin">
                    Admin
                </Link>
          
                <LanguageSwitcher />

               */}
              <ThemeToggle />
            </nav>
          </div>
        </header>

        {children}
        <ChatWidget locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
