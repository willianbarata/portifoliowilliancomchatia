"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export function LoginForm({ nextUrl }: { nextUrl: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email: email.toLowerCase().trim(),
        password,
        redirect: false, // Alterado para false para capturar o erro antes do redirect
        callbackUrl: nextUrl
      });

      if (res?.error) {
        setError("E-mail ou senha incorretos.");
      } else {
        window.location.href = nextUrl;
      }
    } catch (err) {
      console.error("Erro no processo de login:", err);
      setError("Ocorreu um erro ao tentar entrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <form
        onSubmit={onSubmit}
        className="w-full space-y-6 rounded-2xl border border-zinc-200 bg-white/80 p-8 shadow-xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/70"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Admin</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Entre para gerenciar seu conteúdo</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              E-mail
            </label>
            <input
              className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-zinc-900 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Senha
            </label>
            <div className="relative">
              <input
                className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 pr-11 text-zinc-900 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
                title={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-lg bg-red-500/10 p-3">
            <p className="text-center text-sm font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full overflow-hidden rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Entrando...
            </span>
          ) : (
            "Acessar Painel"
          )}
        </button>
      </form>
    </main>
  );
}
