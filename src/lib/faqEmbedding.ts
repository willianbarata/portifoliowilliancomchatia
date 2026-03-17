import { prisma } from "@/lib/db";
import { getOpenAIClient } from "@/lib/openai";

export async function embedFaqItem(input: {
  id: string;
  questionPt: string;
  answerPt: string;
  questionEn: string;
  answerEn: string;
}) {
  if (!process.env.OPENAI_API_KEY) return;

  const client = getOpenAIClient();
  const text = `PT: ${input.questionPt}\n${input.answerPt}\nEN: ${input.questionEn}\n${input.answerEn}`;

  const res = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: text
  });

  const embedding = res.data[0]?.embedding;
  if (!embedding?.length) return;

  await prisma.faqItem.update({
    where: { id: input.id },
    data: { embedding }
  });
}
