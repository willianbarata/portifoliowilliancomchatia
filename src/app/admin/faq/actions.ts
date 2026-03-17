"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { embedFaqItem } from "@/lib/faqEmbedding";

const faqSchema = z.object({
  id: z.string().optional(),
  questionPt: z.string().min(1).max(200),
  answerPt: z.string().min(1).max(400),
  questionEn: z.string().min(1).max(200),
  answerEn: z.string().min(1).max(400)
});

export async function createFaq(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = faqSchema.safeParse(raw);
  if (!parsed.success) throw new Error("Dados inválidos.");

  const item = await prisma.faqItem.create({ data: parsed.data });
  await embedFaqItem({ id: item.id, ...parsed.data });

  revalidatePath("/admin/faq");
  redirect("/admin/faq");
}

export async function updateFaq(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = faqSchema.extend({ id: z.string().min(1) }).safeParse(raw);
  if (!parsed.success) throw new Error("Dados inválidos.");

  const item = await prisma.faqItem.update({
    where: { id: parsed.data.id },
    data: {
      questionPt: parsed.data.questionPt,
      answerPt: parsed.data.answerPt,
      questionEn: parsed.data.questionEn,
      answerEn: parsed.data.answerEn
    }
  });

  await embedFaqItem({
    id: item.id,
    questionPt: item.questionPt,
    answerPt: item.answerPt,
    questionEn: item.questionEn,
    answerEn: item.answerEn
  });

  revalidatePath("/admin/faq");
  redirect("/admin/faq");
}

export async function deleteFaq(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("ID inválido.");
  await prisma.faqItem.delete({ where: { id } });
  revalidatePath("/admin/faq");
}

export async function reindexFaq() {
  const items = await prisma.faqItem.findMany({ orderBy: { updatedAt: "desc" } });
  for (const item of items) {
    await embedFaqItem({
      id: item.id,
      questionPt: item.questionPt,
      answerPt: item.answerPt,
      questionEn: item.questionEn,
      answerEn: item.answerEn
    });
  }
  revalidatePath("/admin/faq");
}

