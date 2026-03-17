"use client";

import { useMemo, useState } from "react";
import { Editor } from "@/components/editorjs/Editor";
import { AdminCanvas } from "@/components/admin/AdminCanvas";
import { ImagePlus, X, Save, ArrowLeft, Link as LinkIcon, Trash2 } from "lucide-react";
import Link from "next/link";

type Props = {
  mode: "create" | "edit";
  defaultValues?: {
    id?: string;
    titlePt: string;
    titleEn: string;
    descriptionPt: any;
    descriptionEn: any;
    link: string | null;
  };
  action: (formData: FormData) => Promise<void>;
  existingImages?: { id: string; key: string }[];
  onDeleteImage?: (formData: FormData) => Promise<void>;
};

export function ProjectForm({
  mode,
  defaultValues,
  action,
  existingImages,
  onDeleteImage
}: Props) {
  const initialPt = useMemo(() => defaultValues?.descriptionPt, [defaultValues]);
  const initialEn = useMemo(() => defaultValues?.descriptionEn, [defaultValues]);
  const [descriptionPt, setDescriptionPt] = useState<unknown>(initialPt ?? { blocks: [] });
  const [descriptionEn, setDescriptionEn] = useState<unknown>(initialEn ?? { blocks: [] });

  return (
    <AdminCanvas
      title={mode === "create" ? "Novo Projeto" : "Editar Projeto"}
      subtitle="Exiba seus melhores trabalhos com descrições ricas e galeria de imagens."
    >
      <div className="space-y-12">
        <form action={action} className="space-y-10">
          {mode === "edit" && defaultValues?.id ? (
            <input type="hidden" name="id" value={defaultValues.id} />
          ) : null}

          <div className="space-y-8">
            {/* Titles Section */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 italic flex items-center gap-2">
                  Título do Projeto (PT)
                </label>
                <input
                  name="titlePt"
                  defaultValue={defaultValues?.titlePt ?? ""}
                  placeholder="Ex: Nome do meu projeto..."
                  className="w-full bg-transparent text-2xl font-bold placeholder:text-zinc-300 focus:outline-none dark:placeholder:text-zinc-700"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 italic flex items-center gap-2">
                  Project Title (EN)
                </label>
                <input
                  name="titleEn"
                  defaultValue={defaultValues?.titleEn ?? ""}
                  placeholder="Ex: My Project Name..."
                  className="w-full bg-transparent text-2xl font-bold placeholder:text-zinc-300 focus:outline-none dark:placeholder:text-zinc-700"
                  required
                />
              </div>
            </div>

            {/* Link Section */}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
              <label className="flex items-center gap-3">
                <div className="rounded-lg bg-white p-2 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700">
                  <LinkIcon className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">URL de Acesso (Opcional)</span>
                  <input
                    name="link"
                    type="url"
                    defaultValue={defaultValues?.link ?? ""}
                    placeholder="https://seu-projeto.com"
                    className="w-full bg-transparent text-sm placeholder:text-zinc-400 focus:outline-none dark:placeholder:text-zinc-600"
                  />
                </div>
              </label>
            </div>

            <input type="hidden" name="descriptionPt" value={JSON.stringify(descriptionPt)} />
            <input type="hidden" name="descriptionEn" value={JSON.stringify(descriptionEn)} />

            {/* Rich Text Descriptions */}
            <div className="space-y-6">
              <div className="space-y-4 border-t border-zinc-100 pt-8 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Descrição Detalhada (PT)</span>
                  <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
                </div>
                <Editor initialData={initialPt} onChange={setDescriptionPt} placeholder="Fale sobre as tecnologias e desafios..." />
              </div>

              <div className="space-y-4 border-t border-zinc-100 pt-8 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-zinc-500">
                  <span className="text-xs font-bold uppercase tracking-wider">Detailed Description (EN)</span>
                  <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
                </div>
                <Editor initialData={initialEn} onChange={setDescriptionEn} placeholder="Talk about technologies and challenges..." />
              </div>
            </div>

            {/* Multiple Image Upload */}
            <div className="space-y-4 border-t border-zinc-100 pt-8 dark:border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Adicionar Novas Imagens</span>
              <div className="flex flex-col gap-4 rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-8 transition-colors hover:border-blue-400 dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="flex flex-col items-center justify-center gap-3 text-zinc-500">
                  <ImagePlus className="h-8 w-8 text-blue-500" />
                  <div className="text-center">
                    <p className="text-sm font-semibold">Selecione uma ou mais fotos</p>
                    <p className="text-xs">Formatos aceitos: JPG, PNG, WEBP</p>
                  </div>
                </div>
                <input
                  name="images"
                  type="file"
                  multiple
                  accept="image/*"
                  className="mx-auto block text-sm text-zinc-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-300"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-zinc-100 pt-10 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/admin/projects"
              className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Cancelar e voltar
            </Link>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 active:scale-[0.98]">
              <Save className="h-5 w-5" />
              {mode === "create" ? "Criar Projeto" : "Salvar Alterações"}
            </button>
          </div>
        </form>

        {existingImages?.length ? (
          <div className="space-y-6 pt-10 border-t border-zinc-100 dark:border-zinc-800">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Galeria Atual</h3>
              <p className="text-sm text-zinc-500">Imagens que já estão em exibição.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {existingImages.map((img) => (
                <div
                  key={img.id}
                  className="group relative aspect-video overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <img
                    alt="Prévia do projeto"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={`/api/files/${encodeURIComponent(img.key).replaceAll("%2F", "/")}`}
                  />
                  {onDeleteImage ? (
                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <form action={onDeleteImage} className="absolute inset-x-0 bottom-4 px-4">
                        <input type="hidden" name="id" value={img.id} />
                        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-sm transition-transform active:scale-95">
                          <Trash2 className="h-3.5 w-3.5" />
                          Remover
                        </button>
                      </form>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </AdminCanvas>
  );
}

