import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      {session && (
        <header className="border-b border-zinc-200 bg-white/70 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/50">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link className="font-semibold" href="/admin">
              Admin
            </Link>
            <div className="flex items-center gap-6">
              <nav className="flex gap-4 text-sm text-zinc-700 dark:text-zinc-300">
                <Link className="hover:text-blue-700 dark:hover:text-blue-400" href="/admin/articles">
                  Artigos
                </Link>
                <Link className="hover:text-blue-700 dark:hover:text-blue-400" href="/admin/faq">
                  FAQ
                </Link>
                <Link className="hover:text-blue-700 dark:hover:text-blue-400" href="/admin/projects">
                  Projetos
                </Link>
                <Link className="hover:text-blue-700 dark:hover:text-blue-400" href="/admin/leads">
                  Leads
                </Link>
                <Link className="hover:text-blue-700 dark:hover:text-blue-400" href="/admin/settings">
                  Config
                </Link>
              </nav>
              <LogoutButton />
            </div>
          </div>
        </header>
      )}
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
