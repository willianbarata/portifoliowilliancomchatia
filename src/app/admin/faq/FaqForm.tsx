"use client";

import { AdminCanvas } from "@/components/admin/AdminCanvas";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  mode: "create" | "edit";
  defaultValues?: {
    id?: string;
    questionPt: string;
    answerPt: string;
    questionEn: string;
    answerEn: string;
  };
  action: (formData: FormData) => Promise<void>;
};

export function FaqForm({ mode, defaultValues, action }: Props) {
  return (
    <AdminCanvas
      title={mode === "create" ? "Nova FAQ" : "Editar FAQ"}
      subtitle="Perguntas frequentes ajudam a converter leads e tirar dúvidas rápidas."
    >
      <form action={action} className="space-y-8">
        {mode === "edit" && defaultValues?.id ? (
          <input type="hidden" name="id" value={defaultValues.id} />
        ) : null}

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <span className="text-xs font-bold uppercase tracking-wider">Versão em Português</span>
                <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Pergunta</label>
                <input
                  name="questionPt"
                  defaultValue={defaultValues?.questionPt ?? ""}
                  placeholder="Ex: Como funciona o suporte?"
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Resposta</label>
                <textarea
                  name="answerPt"
                  defaultValue={defaultValues?.answerPt ?? ""}
                  placeholder="Escreva a resposta detalhada..."
                  className="min-h-32 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-500">
                <span className="text-xs font-bold uppercase tracking-wider">English Version</span>
                <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Question</label>
                <input
                  name="questionEn"
                  defaultValue={defaultValues?.questionEn ?? ""}
                  placeholder="Ex: How does support work?"
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Answer</label>
                <textarea
                  name="answerEn"
                  defaultValue={defaultValues?.answerEn ?? ""}
                  placeholder="Write the detailed answer..."
                  className="min-h-32 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-zinc-100 pt-10 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/admin/faq"
            className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancelar e voltar
          </Link>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 active:scale-[0.98]">
            <Save className="h-5 w-5" />
            {mode === "create" ? "Criar FAQ" : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </AdminCanvas>
  );
}

