import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProjectForm } from "../ProjectForm";
import { deleteProjectImage, updateProject } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { images: { orderBy: { sortOrder: "asc" } } }
  });
  if (!project) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Editar projeto</h1>
        <Link className="text-sm text-zinc-300 hover:text-white" href="/admin/projects">
          Voltar
        </Link>
      </div>
      <ProjectForm
        mode="edit"
        action={updateProject}
        onDeleteImage={deleteProjectImage}
        existingImages={project.images.map((i) => ({ id: i.id, key: i.key }))}
        defaultValues={{
          id: project.id,
          titlePt: project.titlePt,
          titleEn: project.titleEn,
          descriptionPt: project.descriptionPt,
          descriptionEn: project.descriptionEn,
          link: project.link
        }}
      />
    </div>
  );
}
