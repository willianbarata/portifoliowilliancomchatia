import { ProfilePhoto } from "@/components/profile/ProfilePhoto";
import { NewsletterCTA } from "@/components/newsletter/NewsletterCTA";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-[0.35fr_0.65fr] md:items-start">
        <div className="space-y-4">
          <ProfilePhoto size={140} />
          <div className="space-y-2">
            <a
              className="block text-sm font-medium text-blue-700 hover:underline dark:text-blue-400"
              href="https://www.linkedin.com/in/willianbarata/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <NewsletterCTA />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">Sobre</h1>
            <p className="max-w-3xl text-zinc-700 dark:text-zinc-300">
              TODO: importar e reproduzir seu resumo/experiência do site atual e
              do LinkedIn (PT/EN).
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white/70 p-5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60">
              <h2 className="text-sm font-semibold">Foco</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Produtos web/mobile, automações, integrações e performance.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white/70 p-5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60">
              <h2 className="text-sm font-semibold">Stack</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                React/Next, .NET, Node.js, Postgres, AWS/Azure, Docker.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
