import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteFaq, reindexFaq } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  const items = await prisma.faqItem.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">FAQ</h1>
          <p className="text-sm text-zinc-400">
            O chatbot só responde usando estes itens.
          </p>
        </div>
        <div className="flex gap-2">
          <form action={reindexFaq}>
            <button className="rounded-md border border-zinc-700 px-4 py-2 text-sm">
              Reindexar embeddings
            </button>
          </form>
          <Link
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-950"
            href="/admin/faq/new"
          >
            Novo
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900/60 text-zinc-300">
            <tr>
              <th className="px-4 py-3">Pergunta (PT)</th>
              <th className="px-4 py-3">Question (EN)</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id} className="border-t border-zinc-800">
                <td className="px-4 py-3">{i.questionPt}</td>
                <td className="px-4 py-3 text-zinc-400">{i.questionEn}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs"
                      href={`/admin/faq/${i.id}`}
                    >
                      Editar
                    </Link>
                    <form action={deleteFaq}>
                      <input type="hidden" name="id" value={i.id} />
                      <button className="rounded-md border border-red-900/60 px-3 py-1.5 text-xs text-red-300">
                        Excluir
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-zinc-400" colSpan={3}>
                  Nenhum item de FAQ ainda.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
