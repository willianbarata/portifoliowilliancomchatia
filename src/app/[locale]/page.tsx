import Link from "next/link";
import { useTranslations } from "next-intl";
import { NewsletterCTA } from "@/components/newsletter/NewsletterCTA";
import { LeadForm } from "@/components/leads/LeadForm";
import { ProfilePhoto } from "@/components/profile/ProfilePhoto";
import { Code2, Cloud, Database, Server } from "lucide-react";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="space-y-10">
        <section className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Disponível para projetos & consultoria
            </div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-zinc-700 dark:text-zinc-300">
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-600/20 hover:bg-blue-500"
                href="./projects"
              >
                {t("ctaProjects")}
              </Link>
              <NewsletterCTA />
            </div>

            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 bg-white/70 p-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60">
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  4+ anos
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Frontend (React/Next/React Native)
                </div>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white/70 p-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60">
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  5+ anos
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  .NET e Automação
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="flex flex-col items-center relative">
              <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/15 blur-2xl" />
              <ProfilePhoto size={168} />
              <p className="mt-4 max-w-[240px] text-center text-sm text-zinc-600 dark:text-zinc-400">
                Coloque sua foto em <code>/public/william.jpg</code>
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            {
              icon: Code2,
              title: "Frontend",
              desc: "React, Next.js, React Native"
            },
            { icon: Server, title: "Backend", desc: ".NET e Node.js" },
            {
              icon: Database,
              title: "Dados",
              desc: "SQL Server, PL/SQL, Postgres, MySQL"
            },
            { icon: Cloud, title: "Cloud", desc: "AWS, Azure, Docker, CI/CD" }
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-zinc-200 bg-white/70 p-5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60"
            >
              <c.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {c.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {c.desc}
              </p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {t("leadTitle")}
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Sem spam. Só conteúdo prático sobre dev, IA e negócios.
          </p>
          <div className="mt-4">
            <LeadForm />
          </div>
        </section>
      </div>
    </main>
  );
}
