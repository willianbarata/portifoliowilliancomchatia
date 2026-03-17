"use client";

import { useMemo, useState, useRef } from "react";
import { Editor } from "@/components/editorjs/Editor";
import { AdminCanvas } from "@/components/admin/AdminCanvas";
import { ImagePlus, X, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  mode: "create" | "edit";
  defaultValues?: {
    id?: string;
    slug: string;
    titlePt: string;
    titleEn: string;
    status: "DRAFT" | "PUBLISHED";
    contentPt: unknown;
    contentEn: unknown;
    coverImageKey?: string | null;
  };
  action: (formData: FormData) => Promise<void>;
};

export function ArticleForm({ mode, defaultValues, action }: Props) {
  const initialPt = useMemo(() => defaultValues?.contentPt, [defaultValues]);
  const initialEn = useMemo(() => defaultValues?.contentEn, [defaultValues]);
  const [contentPt, setContentPt] = useState<unknown>(initialPt ?? { blocks: [] });
  const [contentEn, setContentEn] = useState<unknown>(initialEn ?? { blocks: [] });
  const [coverPreview, setCoverPreview] = useState<string | null>(
    defaultValues?.coverImageKey 
      ? `/api/files/${encodeURIComponent(defaultValues.coverImageKey).replaceAll("%2F", "/")}`
      : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  return (
    <AdminCanvas 
      title={mode === "create" ? "Novo Artigo" : "Editar Artigo"}
      subtitle="Crie conteúdo rico para o seu blog e compartilhe com o mundo."
    >
      <form action={action} className="space-y-10">
        {mode === "edit" && defaultValues?.id ? (
          <input type="hidden" name="id" value={defaultValues.id} />
        ) : null}

        {/* LinkedIn-style Cover Image */}
        <div className="group relative overflow-hidden rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 transition-colors hover:border-blue-400 dark:border-zinc-800 dark:bg-zinc-900/50">
          <input 
            type="file" 
            name="coverImage" 
            className="hidden" 
            ref={fileInputRef} 
            accept="image/*"
            onChange={handleImageChange}
          />
          
          {coverPreview ? (
            <div className="relative aspect-[21/9] w-full">
              <img 
                src={coverPreview} 
                alt="Capa" 
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setCoverPreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm font-medium text-white underline underline-offset-4"
                >
                  Alterar imagem de capa
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex aspect-[21/9] w-full flex-col items-center justify-center gap-4 text-zinc-500 transition-colors hover:text-blue-500"
            >
              <div className="rounded-full bg-white p-4 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700">
                <ImagePlus className="h-8 w-8 text-blue-500" />
              </div>
              <div className="text-center">
                <p className="font-semibold">Adicionar imagem de capa</p>
                <p className="text-xs">Recomendado: 1200x630px</p>
              </div>
            </button>
          )}
        </div>

        <div className="space-y-8">
          {/* Metadata Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Título do Artigo (PT)
              </label>
              <input
                name="titlePt"
                defaultValue={defaultValues?.titlePt ?? ""}
                placeholder="Ex: Como construir uma carreira em tech..."
                className="w-full bg-transparent text-2xl font-bold placeholder:text-zinc-300 focus:outline-none dark:placeholder:text-zinc-700"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Article Title (EN)
              </label>
              <input
                name="titleEn"
                defaultValue={defaultValues?.titleEn ?? ""}
                placeholder="Ex: How to build a tech career..."
                className="w-full bg-transparent text-2xl font-bold placeholder:text-zinc-300 focus:outline-none dark:placeholder:text-zinc-700"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">URL Amigável (Slug)</span>
              <input
                name="slug"
                defaultValue={defaultValues?.slug ?? ""}
                placeholder="nome-do-artigo"
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm dark:border-zinc-800 dark:bg-zinc-900"
                required
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Status de Publicação</span>
              <select
                name="status"
                defaultValue={defaultValues?.status ?? "DRAFT"}
                className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <option value="DRAFT">Rascunho</option>
                <option value="PUBLISHED">Publicado</option>
              </select>
            </label>
          </div>

          <input type="hidden" name="contentPt" value={JSON.stringify(contentPt)} />
          <input type="hidden" name="contentEn" value={JSON.stringify(contentEn)} />

          <div className="space-y-4 border-t border-zinc-100 pt-8 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <span className="text-xs font-bold uppercase tracking-wider">Conteúdo Principal (PT)</span>
              <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
            </div>
            <Editor initialData={initialPt} onChange={setContentPt} placeholder="Escreva a versão em Português..." />
          </div>

          <div className="space-y-4 border-t border-zinc-100 pt-8 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-zinc-500">
              <span className="text-xs font-bold uppercase tracking-wider">Main Content (EN)</span>
              <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
            </div>
            <Editor initialData={initialEn} onChange={setContentEn} placeholder="Write the English version..." />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-zinc-100 pt-10 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <Link 
            href="/admin/articles"
            className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancelar e voltar
          </Link>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 active:scale-[0.98]">
            <Save className="h-5 w-5" />
            {mode === "create" ? "Publicar Artigo" : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </AdminCanvas>
  );
}

