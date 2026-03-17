import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import ThemeProvider from "../components/theme/ThemeProvider";

export const metadata: Metadata = {
  title: "Willian Barata",
  description: "Portfolio"
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen bg-white text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-50">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
