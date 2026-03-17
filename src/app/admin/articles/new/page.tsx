import Link from "next/link";
import { ArticleForm } from "../ArticleForm";
import { createArticle } from "../actions";

export const dynamic = "force-dynamic";

export default function NewArticlePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Novo artigo</h1>
        <Link className="text-sm text-zinc-300 hover:text-white" href="/admin/articles">
          Voltar
        </Link>
      </div>
      <ArticleForm mode="create" action={createArticle} />
    </div>
  );
}
