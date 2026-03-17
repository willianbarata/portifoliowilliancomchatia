import Link from "next/link";
import { prisma } from "@/lib/db";
import { getLocale } from "next-intl/server";
import { DbNotConfigured } from "@/components/system/DbNotConfigured";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const locale = await getLocale();
  let dbOk = true;
  let articles: Awaited<ReturnType<typeof prisma.article.findMany>> = [];
  try {
    articles = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" }
    });
  } catch {
    dbOk = false;
    articles = [];
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Artigos</h1>
          <p className="text-zinc-700 dark:text-zinc-300">Publicações do blog.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {!dbOk ? <DbNotConfigured locale={locale} /> : null}
          {articles.map((a) => {
            const title = locale === "pt" ? a.titlePt : a.titleEn;
            return (
              <Link
                key={a.id}
                className="rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:bg-zinc-900/40"
                href={`./articles/${a.slug}`}
              >
                <h2 className="text-lg font-semibold text-zinc-900 hover:text-blue-700 dark:text-zinc-50 dark:hover:text-blue-400">
                  {title}
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {a.slug}
                </p>
              </Link>
            );
          })}
          {dbOk && articles.length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-white/70 p-6 text-zinc-600 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
              Nenhum artigo publicado ainda.
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
