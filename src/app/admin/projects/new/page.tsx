import Link from "next/link";
import { ProjectForm } from "../ProjectForm";
import { createProject } from "../actions";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Novo projeto</h1>
        <Link className="text-sm text-zinc-300 hover:text-white" href="/admin/projects">
          Voltar
        </Link>
      </div>
      <ProjectForm mode="create" action={createProject} />
    </div>
  );
}
