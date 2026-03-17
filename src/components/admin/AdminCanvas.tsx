"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AdminCanvasProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export function AdminCanvas({ children, title, subtitle, className }: AdminCanvasProps) {
  return (
    <div className={cn("mx-auto max-w-4xl space-y-8", className)}>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h1>
        {subtitle && (
          <p className="text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm ring-1 ring-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-white/5">
        <div className="p-8 md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
