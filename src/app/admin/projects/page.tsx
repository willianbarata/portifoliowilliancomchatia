import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteProject } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
    include: { images: true }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Projetos</h1>
        <Link
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-950"
          href="/admin/projects/new"
        >
          Novo
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900/60 text-zinc-300">
            <tr>
              <th className="px-4 py-3">Título (PT)</th>
              <th className="px-4 py-3">Imagens</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-t border-zinc-800">
                <td className="px-4 py-3">{p.titlePt}</td>
                <td className="px-4 py-3 text-zinc-400">{p.images.length}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs"
                      href={`/admin/projects/${p.id}`}
                    >
                      Editar
                    </Link>
                    <form action={deleteProject}>
                      <input type="hidden" name="id" value={p.id} />
                      <button className="rounded-md border border-red-900/60 px-3 py-1.5 text-xs text-red-300">
                        Excluir
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-zinc-400" colSpan={3}>
                  Nenhum projeto ainda.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
