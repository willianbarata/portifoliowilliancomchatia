import Link from "next/link";
import { useTranslations } from "next-intl";
import { ProfilePhoto } from "@/components/profile/ProfilePhoto";
import { MessageCircle, Linkedin, GraduationCap, ArrowLeft } from "lucide-react";

export default function GruposPage() {
  const t = useTranslations("links");

  const links = [
    {
      href: "https://chat.whatsapp.com/F9GdOjplWPH4ENXB5ogTGp?mode=gi_t",
      label: t("whatsapp"),
      icon: MessageCircle,
      color: "bg-green-600 hover:bg-green-500 shadow-green-600/20",
    },
    {
      href: "https://www.linkedin.com/in/willianbarata/",
      label: t("linkedin"),
      icon: Linkedin,
      color: "bg-blue-700 hover:bg-blue-600 shadow-blue-700/20",
    },
    {
      href: "https://plugandoia.cloud",
      label: t("course"),
      icon: GraduationCap,
      color: "bg-blue-600 hover:bg-blue-500 shadow-blue-600/20",
    },
  ];

  return (
    <main className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/15 blur-2xl" />
            <ProfilePhoto size={120} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Willian Barata
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              {t("title")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between rounded-xl p-4 text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${link.color}`}
            >
              <div className="flex items-center gap-3">
                <link.icon className="h-5 w-5" />
                <span className="font-medium">{link.label}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="pt-4">
          <Link
            href="../"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>
        </div>
      </div>
    </main>
  );
}
