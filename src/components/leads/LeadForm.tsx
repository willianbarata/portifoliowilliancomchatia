"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export function LeadForm() {
  const t = useTranslations("home");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    setStatus(res.ok ? "ok" : "error");
    if (res.ok) setEmail("");
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 md:flex-row">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("leadPlaceholder")}
        className="w-full rounded-md border border-zinc-200 bg-white/80 px-3 py-2 text-sm text-zinc-900 backdrop-blur placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-50 dark:placeholder:text-zinc-500"
        type="email"
        required
      />
      <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
        {t("leadButton")}
      </button>
      {status === "ok" ? (
        <span className="self-center text-sm text-green-400">OK</span>
      ) : status === "error" ? (
        <span className="self-center text-sm text-red-400">Erro</span>
      ) : null}
    </form>
  );
}
