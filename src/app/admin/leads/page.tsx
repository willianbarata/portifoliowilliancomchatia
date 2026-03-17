import { prisma } from "@/lib/db";
import { createLead, deleteLead, toggleLeadSendEmail } from "./actions";
import { AdminCanvas } from "@/components/admin/AdminCanvas";
import { Mail, Plus, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { LeadStatusSelect } from "./LeadStatusSelect";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <AdminCanvas
      title="Leads & Newsletter"
      subtitle="Gerencie os contatos capturados e configure as permissões de envio."
    >
      <div className="space-y-8">
        {/* Quick Add Form */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-900/20 dark:bg-blue-900/10">
          <form action={createLead} className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                name="email"
                type="email"
                placeholder="novo-lead@dominio.com"
                className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950"
                required
              />
            </div>
            <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500">
              <Plus className="h-4 w-4" />
              Adicionar Lead
            </button>
          </form>
        </div>

        {/* Leads Table */}
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-100 bg-zinc-50/50 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50">
              <tr>
                <th className="px-6 py-4">E-mail</th>
                <th className="px-6 py-4 text-center">Inscrito em</th>
                <th className="px-6 py-4 text-center">Permissão de Envio</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {leads.map((l) => (
                <tr key={l.id} className="group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
                  <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100 italic">
                    {l.email}
                  </td>
                  <td className="px-6 py-4 text-center text-zinc-400">
                    {new Date(l.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <LeadStatusSelect leadId={l.id} sendEmail={l.sendEmail} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end opacity-0 transition-opacity group-hover:opacity-100">
                      <form action={deleteLead}>
                        <input type="hidden" name="id" value={l.id} />
                        <button className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {leads.length === 0 ? (
                <tr>
                  <td className="px-6 py-12 text-center text-zinc-400" colSpan={4}>
                    <div className="flex flex-col items-center gap-2">
                      <Mail className="h-8 w-8 text-zinc-200 dark:text-zinc-800" />
                      <p>Nenhum lead encontrado.</p>
                    </div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </AdminCanvas>
  );
}
