"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

type Message = { role: "user" | "assistant"; text: string };

export function ChatWidget({ locale }: { locale: string }) {
  const t = useTranslations("chat");
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function send() {
    const question = input.trim();
    if (!question) return;
    if (question.length > 100) return;

    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, locale })
      });
      const json = await res.json().catch(() => null);
      const answer = String(json?.answer ?? "");
      setMessages((m) => [...m, { role: "assistant", text: answer }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text:
            locale === "en"
              ? "Error. Try again."
              : "Erro. Tente novamente."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="flex h-[420px] w-[340px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <div className="text-sm font-medium">{t("title")}</div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md border border-zinc-200 px-2 py-1 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              X
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-auto px-4 py-3 text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={
                  m.role === "user"
                    ? "ml-10 rounded-xl bg-blue-600 px-3 py-2 text-white"
                    : "mr-10 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                }
              >
                {m.text}
              </div>
            ))}
            {loading ? (
              <div className="mr-10 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                ...
              </div>
            ) : null}
          </div>
          <div className="border-t border-zinc-200 p-3 dark:border-zinc-800">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 100))}
                placeholder={t("placeholder")}
                className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500"
              />
              <button
                onClick={send}
                disabled={loading}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60"
              >
                {t("send")}
              </button>
            </div>
            <div className="mt-1 text-xs text-zinc-500">
              {input.length}/100
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500"
        >
          Chat
        </button>
      )}
    </div>
  );
}
