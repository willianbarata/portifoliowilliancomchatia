import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { FaqForm } from "../FaqForm";
import { updateFaq } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditFaqPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.faqItem.findUnique({ where: { id } });
  if (!item) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Editar FAQ</h1>
        <Link className="text-sm text-zinc-300 hover:text-white" href="/admin/faq">
          Voltar
        </Link>
      </div>
      <FaqForm
        mode="edit"
        action={updateFaq}
        defaultValues={{
          id: item.id,
          questionPt: item.questionPt,
          answerPt: item.answerPt,
          questionEn: item.questionEn,
          answerEn: item.answerEn
        }}
      />
    </div>
  );
}
