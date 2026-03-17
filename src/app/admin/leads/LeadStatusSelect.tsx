"use client";

import { toggleLeadSendEmail } from "./actions"; // ajuste o caminho se necessário

interface LeadStatusSelectProps {
  leadId: string;
  sendEmail: boolean;
}

export function LeadStatusSelect({ leadId, sendEmail }: LeadStatusSelectProps) {
  return (
    <form action={toggleLeadSendEmail}>
      <input type="hidden" name="id" value={leadId} />
      <select
        name="sendEmail"
        defaultValue={String(sendEmail)}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-tight transition-colors focus:outline-none ${
          sendEmail
            ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400"
            : "border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
        }`}
      >
        <option value="true">Ativo</option>
        <option value="false">Inativo</option>
      </select>
    </form>
  );
}