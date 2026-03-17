import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { DbNotConfigured } from "@/components/system/DbNotConfigured";
import { renderEditorJs } from "@/components/editorjs/render";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();
  let project: Prisma.ProjectGetPayload<{ include: { images: true } }> | null =
    null;
  try {
    project = await prisma.project.findUnique({
      where: { id },
      include: { images: { orderBy: { sortOrder: "asc" } } }
    });
  } catch {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16">
        <DbNotConfigured locale={locale} />
      </main>
    );
  }
  if (!project) return notFound();

  const title = locale === "pt" ? project.titlePt : project.titleEn;
  const description = locale === "pt" ? project.descriptionPt : project.descriptionEn;

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <div className="text-zinc-300">
            {renderEditorJs(description)}
          </div>
          {project.link ? (
            <a
              className="inline-block rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-950"
              href={project.link}
              target="_blank"
              rel="noreferrer"
            >
              Acessar
            </a>
          ) : null}
        </div>

        {project.images.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {project.images.map((img) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={img.id}
                alt=""
                className="w-full rounded-xl border border-zinc-800 object-cover"
                src={`/api/files/${encodeURIComponent(img.key).replaceAll("%2F", "/")}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
