"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

const emailSchema = z.string().email().max(254);

export async function createLead(formData: FormData) {
  const email = emailSchema.parse(String(formData.get("email") ?? "").trim());
  await prisma.lead.upsert({
    where: { email },
    create: { email },
    update: {}
  });
  revalidatePath("/admin/leads");
}

export async function deleteLead(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("ID inválido");
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/admin/leads");
}

export async function toggleLeadSendEmail(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const sendEmail = String(formData.get("sendEmail") ?? "") === "true";
  if (!id) throw new Error("ID inválido");
  await prisma.lead.update({ where: { id }, data: { sendEmail } });
  revalidatePath("/admin/leads");
}

