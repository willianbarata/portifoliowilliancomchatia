"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Download, QrCode } from "lucide-react";

export default function QRCodeGeneratorPage() {
  const t = useTranslations("qrcode");
  const [url, setUrl] = useState("");
  const qrRef = useRef<SVGSVGElement>(null);

  const downloadQRCode = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "qrcode.png";
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <main className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl space-y-8 text-center">
        <div className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <QrCode className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
            {t("title")}
          </h1>
          <p className="mx-auto max-w-sm text-zinc-600 dark:text-zinc-400">
            {t("subtitle")}
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white/70 p-8 shadow-xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60">
          <div className="space-y-6">
            <div className="space-y-2">
              <input
                type="url"
                placeholder={t("placeholder")}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </div>

            {url && (
              <div className="flex flex-col items-center space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="rounded-2xl border-4 border-white bg-white p-4 shadow-md">
                  <QRCodeSVG
                    value={url}
                    size={200}
                    level="H"
                    includeMargin={false}
                    ref={qrRef}
                  />
                </div>
                
                <button
                  onClick={downloadQRCode}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]"
                >
                  <Download className="h-4 w-4" />
                  {t("download")}
                </button>
              </div>
            )}
          </div>
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
