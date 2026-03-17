import Link from "next/link";

export function DbNotConfigured({ locale }: { locale: string }) {
  const isEn = locale.startsWith("en");
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white/70 p-6 text-zinc-700 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-300">
      <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
        {isEn ? "Database not configured" : "Banco não configurado"}
      </h2>
      <p className="mt-2 text-sm">
        {isEn
          ? "Set DATABASE_URL (and schema=willianbarata) in your environment."
          : "Defina a variável DATABASE_URL (com schema=willianbarata) no ambiente."}
      </p>
      <p className="mt-4 text-sm">
        <Link className="text-blue-700 underline dark:text-blue-400" href="/admin">
          {isEn ? "Go to admin" : "Ir para o admin"}
        </Link>
        <span className="text-zinc-500 dark:text-zinc-500"> · </span>
        <Link
          className="text-blue-700 underline dark:text-blue-400"
          href="https://nextjs.org/docs/app/building-your-application/configuring/environment-variables"
          target="_blank"
          rel="noreferrer"
        >
          {isEn ? "Env vars" : "Variáveis de ambiente"}
        </Link>
      </p>
    </div>
  );
}

