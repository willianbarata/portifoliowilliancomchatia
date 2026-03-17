import { useTranslations } from "next-intl";

const NEWSLETTER_URL =
  "https://www.linkedin.com/newsletters/di%C3%A1rio-do-c%C3%B3digo-7207174663641169920/";

export function NewsletterCTA() {
  const t = useTranslations("home");

  return (
    <a
      className="rounded-md border border-zinc-200 bg-white/70 px-4 py-2 text-sm font-medium text-zinc-900 backdrop-blur hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-50 dark:hover:bg-zinc-900"
      href={NEWSLETTER_URL}
      target="_blank"
      rel="noreferrer"
    >
      {t("ctaNewsletter")}
    </a>
  );
}
