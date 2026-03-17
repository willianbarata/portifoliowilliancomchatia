"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-zinc-800 transition-colors hover:bg-white hover:text-red-600 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-100 dark:hover:bg-zinc-900 dark:hover:text-red-400"
    >
      <LogOut className="h-3.5 w-3.5" />
      Sair
    </button>
  );
}
