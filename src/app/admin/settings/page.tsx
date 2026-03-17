import { prisma } from "@/lib/db";
import { savePhone } from "./actions";
import { AdminCanvas } from "@/components/admin/AdminCanvas";
import { Phone, Save, Settings2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const phoneSetting = await prisma.setting.findUnique({ where: { key: "phone" } });
  const phone = phoneSetting?.value ?? "";

  return (
    <AdminCanvas
      title="Configurações Gerais"
      subtitle="Gerencie as informações básicas que aparecem em todo o seu portfólio."
    >
      <div className="space-y-8">
        <div className="flex items-center gap-2 text-zinc-500">
          <Settings2 className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Informações de Contato</span>
          <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
        </div>

        <form action={savePhone} className="max-w-md space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 italic flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-500" />
              Telefone de Contato (WhatsApp)
            </label>
            <input
              name="phone"
              defaultValue={phone}
              placeholder="+55 11 99999-9999"
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900"
            />
            <p className="text-xs text-zinc-500">
              * Este número será usado nos botões de contato do site.
            </p>
          </div>

          <div className="flex justify-end border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-2.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 active:scale-[0.98]">
              <Save className="h-4 w-4" />
              Salvar Configurações
            </button>
          </div>
        </form>
      </div>
    </AdminCanvas>
  );
}
