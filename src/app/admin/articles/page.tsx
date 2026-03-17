import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteArticle } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Artigos</h1>
        <Link
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-950"
          href="/admin/articles/new"
        >
          Novo
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900/60 text-zinc-300">
            <tr>
              <th className="px-4 py-3">Título (PT)</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} className="border-t border-zinc-800">
                <td className="px-4 py-3">{a.titlePt}</td>
                <td className="px-4 py-3 text-zinc-400">{a.slug}</td>
                <td className="px-4 py-3 text-zinc-400">{a.status}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs"
                      href={`/admin/articles/${a.id}`}
                    >
                      Editar
                    </Link>
                    <form action={deleteArticle}>
                      <input type="hidden" name="id" value={a.id} />
                      <button className="rounded-md border border-red-900/60 px-3 py-1.5 text-xs text-red-300">
                        Excluir
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {articles.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-zinc-400" colSpan={4}>
                  Nenhum artigo ainda.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
