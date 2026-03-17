import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getOpenAIClient } from "@/lib/openai";

export const runtime = "nodejs";

const schema = z.object({
  question: z.string().min(1).max(100),
  locale: z.string().optional()
});

function clampAnswer(value: string) {
  const trimmed = value.trim();
  if (trimmed.length <= 150) return trimmed;
  return trimmed.slice(0, 150);
}

function defaultNoAccess(locale: "pt" | "en") {
  return locale === "en"
    ? "I don’t have access to that answer. I can help with FAQ questions."
    : "Não tenho acesso a essa resposta. Posso ajudar com perguntas do FAQ.";
}

function cosineSimilarity(a: number[], b: number[]) {
  if (a.length !== b.length || a.length === 0) return -1;
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom ? dot / denom : -1;
}

async function findBestFaqByEmbedding(question: string) {
  if (!process.env.OPENAI_API_KEY) return null;

  const client = getOpenAIClient();
  const emb = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: question
  });
  const qEmbedding = emb.data[0]?.embedding;
  if (!qEmbedding?.length) return null;

  const items = await prisma.faqItem.findMany({
    orderBy: { updatedAt: "desc" }
  });

  let best: (typeof items)[number] | null = null;
  let bestScore = -1;
  for (const item of items) {
    if (!item.embedding?.length) continue;
    const score = cosineSimilarity(qEmbedding, item.embedding as number[]);
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  if (!best || bestScore < 0.75) return null;
  return best;
}

async function fallbackFaq(question: string) {
  const q = question.trim();
  if (!q) return null;
  const items = await prisma.faqItem.findMany({
    where: {
      OR: [
        { questionPt: { contains: q, mode: "insensitive" } },
        { questionEn: { contains: q, mode: "insensitive" } }
      ]
    },
    take: 1,
    orderBy: { updatedAt: "desc" }
  });
  return items[0] ?? null;
}

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const locale: "pt" | "en" =
    (parsed.data.locale ?? "pt").startsWith("en") ? "en" : "pt";
  const question = parsed.data.question.trim();

  let best = await findBestFaqByEmbedding(question).catch(() => null);
  if (!best) best = await fallbackFaq(question);

  if (!best) {
    return NextResponse.json({ answer: clampAnswer(defaultNoAccess(locale)) });
  }

  const rawAnswer = locale === "en" ? best.answerEn : best.answerPt;
  const fallback = clampAnswer(rawAnswer || defaultNoAccess(locale));

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ answer: fallback });
  }

  try {
    const client = getOpenAIClient();
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const res = await client.responses.create({
      model,
      input: [
        {
          role: "system",
          content:
            "You are a FAQ-only assistant. Answer ONLY using the provided FAQ answer. If the FAQ does not contain the answer, respond with the fallback message exactly. Max 150 characters. Plain text only."
        },
        {
          role: "user",
          content: `Question: ${question}\n\nFAQ answer: ${rawAnswer}\n\nFallback: ${defaultNoAccess(
            locale
          )}`
        }
      ]
    });

    const text = res.output_text?.trim();
    return NextResponse.json({ answer: clampAnswer(text || fallback) });
  } catch {
    return NextResponse.json({ answer: fallback });
  }
}
