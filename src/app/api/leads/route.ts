import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email().max(254)
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  await prisma.lead.upsert({
    where: { email: parsed.data.email },
    create: { email: parsed.data.email },
    update: {}
  });

  return NextResponse.json({ ok: true });
}

