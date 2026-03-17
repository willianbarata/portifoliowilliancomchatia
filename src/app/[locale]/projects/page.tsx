import { prisma } from "@/lib/db";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { DbNotConfigured } from "@/components/system/DbNotConfigured";
import { extractText } from "@/components/editorjs/render";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const locale = await getLocale();
  let dbOk = true;
  let projects: Prisma.ProjectGetPayload<{
    include: { images: true };
  }>[] = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      include: { images: { orderBy: { sortOrder: "asc" } } }
    });
  } catch {
    dbOk = false;
    projects = [];
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Projetos</h1>
          <p className="text-zinc-700 dark:text-zinc-300">
            Projetos cadastrados no painel admin.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {!dbOk ? <DbNotConfigured locale={locale} /> : null}
          {projects.map((p) => {
            const title = locale === "pt" ? p.titlePt : p.titleEn;
            const descriptionJson = locale === "pt" ? p.descriptionPt : p.descriptionEn;
            const description = extractText(descriptionJson);
            const cover = p.images[0]?.key;
            return (
              <Link
                key={p.id}
                href={`./projects/${p.id}`}
                className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:bg-zinc-900/40"
              >
                {cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt=""
                    className="h-44 w-full object-cover"
                    src={`/api/files/${encodeURIComponent(cover).replaceAll("%2F", "/")}`}
                  />
                ) : (
                  <div className="h-44 w-full bg-zinc-100 dark:bg-zinc-900" />
                )}
                <div className="space-y-2 p-5">
                  <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-blue-700 dark:text-zinc-50 dark:group-hover:text-blue-400">
                    {title}
                  </h2>
                  <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {description}
                  </p>
                </div>
              </Link>
            );
          })}
          {dbOk && projects.length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-white/70 p-6 text-zinc-600 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
              Nenhum projeto ainda.
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
