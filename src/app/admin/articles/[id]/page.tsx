import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ArticleForm } from "../ArticleForm";
import { updateArticle } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Editar artigo</h1>
        <Link className="text-sm text-zinc-300 hover:text-white" href="/admin/articles">
          Voltar
        </Link>
      </div>
      <ArticleForm
        mode="edit"
        action={updateArticle}
        defaultValues={{
          id: article.id,
          slug: article.slug,
          titlePt: article.titlePt,
          titleEn: article.titleEn,
          status: article.status,
          contentPt: article.contentPt,
          contentEn: article.contentEn
        }}
      />
    </div>
  );
}
