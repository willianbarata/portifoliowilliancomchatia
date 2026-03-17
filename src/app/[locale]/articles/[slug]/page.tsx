import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { renderEditorJs } from "@/components/editorjs/render";
import { DbNotConfigured } from "@/components/system/DbNotConfigured";

export const dynamic = "force-dynamic";

export default async function ArticleDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();

  let dbOk = true;
  let article: Awaited<ReturnType<typeof prisma.article.findUnique>> = null;
  try {
    article = await prisma.article.findUnique({
      where: { slug }
    });
  } catch {
    dbOk = false;
    article = null;
  }
  if (!dbOk) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <DbNotConfigured locale={locale} />
      </main>
    );
  }
  if (!article || article.status !== "PUBLISHED") return notFound();

  const title = locale === "pt" ? article.titlePt : article.titleEn;
  const content = locale === "pt" ? article.contentPt : article.contentEn;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <article className="space-y-8 rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60 md:p-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{article.slug}</p>
        </header>
        {renderEditorJs(content)}
      </article>
    </main>
  );
}
