import Link from "next/link";
import { FaqForm } from "../FaqForm";
import { createFaq } from "../actions";

export const dynamic = "force-dynamic";

export default function NewFaqPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Novo FAQ</h1>
        <Link className="text-sm text-zinc-300 hover:text-white" href="/admin/faq">
          Voltar
        </Link>
      </div>
      <FaqForm mode="create" action={createFaq} />
    </div>
  );
}
