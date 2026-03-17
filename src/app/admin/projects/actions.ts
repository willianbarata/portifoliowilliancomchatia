"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImageFile } from "@/lib/uploadImage";

const projectSchema = z.object({
  id: z.string().optional(),
  titlePt: z.string().min(1).max(120),
  titleEn: z.string().min(1).max(120),
  descriptionPt: z.any(),
  descriptionEn: z.any(),
  link: z.string().url().optional().or(z.literal(""))
});

export async function createProject(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  
  // Parse JSON fields
  try {
    raw.descriptionPt = JSON.parse(String(formData.get("descriptionPt")));
    raw.descriptionEn = JSON.parse(String(formData.get("descriptionEn")));
  } catch {
    throw new Error("Formato de conteúdo inválido.");
  }

  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) throw new Error("Dados inválidos.");

  const files = formData.getAll("images").filter((f) => f instanceof File) as File[];

  const project = await prisma.project.create({
    data: {
      titlePt: parsed.data.titlePt,
      titleEn: parsed.data.titleEn,
      descriptionPt: parsed.data.descriptionPt,
      descriptionEn: parsed.data.descriptionEn,
      link: parsed.data.link ? String(parsed.data.link) : null
    }
  });

  if (files.length) {
    const keys = await Promise.all(
      files.map((f) => uploadImageFile(f, `projects/${project.id}`))
    );
    await prisma.projectImage.createMany({
      data: keys.map((key, idx) => ({
        projectId: project.id,
        key,
        sortOrder: idx
      }))
    });
  }

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  
  // Parse JSON fields
  try {
    raw.descriptionPt = JSON.parse(String(formData.get("descriptionPt")));
    raw.descriptionEn = JSON.parse(String(formData.get("descriptionEn")));
  } catch {
    throw new Error("Formato de conteúdo inválido.");
  }

  const parsed = projectSchema.extend({ id: z.string().min(1) }).safeParse(raw);
  if (!parsed.success) throw new Error("Dados inválidos.");

  const files = formData.getAll("images").filter((f) => f instanceof File) as File[];

  await prisma.project.update({
    where: { id: parsed.data.id },
    data: {
      titlePt: parsed.data.titlePt,
      titleEn: parsed.data.titleEn,
      descriptionPt: parsed.data.descriptionPt,
      descriptionEn: parsed.data.descriptionEn,
      link: parsed.data.link ? String(parsed.data.link) : null
    }
  });

  if (files.length) {
    const existing = await prisma.projectImage.count({
      where: { projectId: parsed.data.id }
    });
    const keys = await Promise.all(
      files.map((f) => uploadImageFile(f, `projects/${parsed.data.id}`))
    );
    await prisma.projectImage.createMany({
      data: keys.map((key, idx) => ({
        projectId: parsed.data.id,
        key,
        sortOrder: existing + idx
      }))
    });
  }

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("ID inválido.");
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
}

export async function deleteProjectImage(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("ID inválido.");
  await prisma.projectImage.delete({ where: { id } });
  revalidatePath("/admin/projects");
}

