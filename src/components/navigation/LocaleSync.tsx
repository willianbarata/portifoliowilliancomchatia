"use client";

import { useEffect } from "react";

export function LocaleSync({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "pt-BR";
  }, [locale]);

  return null;
}
