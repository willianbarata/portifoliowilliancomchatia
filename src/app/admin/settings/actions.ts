"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function savePhone(formData: FormData) {
  const phone = String(formData.get("phone") ?? "").trim();
  await prisma.setting.upsert({
    where: { key: "phone" },
    create: { key: "phone", value: phone },
    update: { value: phone }
  });
  revalidatePath("/admin/settings");
}

