"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const articleInputSchema = z.object({
  id: z.string().optional(),
  slug: z
    .string()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  titlePt: z.string().min(1).max(120),
  titleEn: z.string().min(1).max(120),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  contentPt: z.string().min(2),
  contentEn: z.string().min(2)
});

function parseJson(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export async function createArticle(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = articleInputSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error("Dados inválidos para criar artigo.");
  }

  const contentPt = parseJson(parsed.data.contentPt);
  const contentEn = parseJson(parsed.data.contentEn);
  if (!contentPt || !contentEn) throw new Error("Conteúdo inválido.");

  await prisma.article.create({
    data: {
      slug: parsed.data.slug,
      titlePt: parsed.data.titlePt,
      titleEn: parsed.data.titleEn,
      contentPt,
      contentEn,
      status: parsed.data.status,
      publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null
    }
  });

  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function updateArticle(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = articleInputSchema.extend({ id: z.string().min(1) }).safeParse(
    raw
  );
  if (!parsed.success) throw new Error("Dados inválidos para editar artigo.");

  const contentPt = parseJson(parsed.data.contentPt);
  const contentEn = parseJson(parsed.data.contentEn);
  if (!contentPt || !contentEn) throw new Error("Conteúdo inválido.");

  await prisma.article.update({
    where: { id: parsed.data.id },
    data: {
      slug: parsed.data.slug,
      titlePt: parsed.data.titlePt,
      titleEn: parsed.data.titleEn,
      contentPt,
      contentEn,
      status: parsed.data.status,
      publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null
    }
  });

  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function deleteArticle(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("ID inválido.");
  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/articles");
}

