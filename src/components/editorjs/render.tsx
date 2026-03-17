type Block =
  | { type: "header"; data: { text: string; level: number } }
  | { type: "paragraph"; data: { text: string } }
  | { type: "list"; data: { style: "ordered" | "unordered"; items: string[] } }
  | { type: "image"; data: { file?: { url?: string }; url?: string; caption?: string } }
  | { type: string; data: any };

export function renderEditorJs(data: any) {
  const blocks: Block[] = Array.isArray(data?.blocks) ? data.blocks : [];
  return (
    <div className="prose prose-zinc max-w-none prose-headings:scroll-mt-24 prose-a:underline dark:prose-invert">
      {blocks.map((b, idx) => {
        if (b.type === "header") {
          const level = Math.min(Math.max(b.data.level ?? 2, 1), 4);
          const Tag = `h${level}` as any;
          return <Tag key={idx} dangerouslySetInnerHTML={{ __html: b.data.text }} />;
        }
        if (b.type === "paragraph") {
          return (
            <p key={idx} dangerouslySetInnerHTML={{ __html: b.data.text }} />
          );
        }
        if (b.type === "list") {
          const ListTag = b.data.style === "ordered" ? "ol" : "ul";
          const items = Array.isArray(b.data.items) ? (b.data.items as string[]) : [];
          return (
            <ListTag key={idx}>
              {items.map((it: string, i: number) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: it }} />
              ))}
            </ListTag>
          );
        }
        if (b.type === "quote") {
          return (
            <blockquote key={idx} className="border-l-4 border-zinc-200 pl-4 italic dark:border-zinc-800">
              <p dangerouslySetInnerHTML={{ __html: b.data.text }} />
              {b.data.caption ? <cite className="mt-2 block text-sm not-italic text-zinc-500">— {b.data.caption}</cite> : null}
            </blockquote>
          );
        }
        if (b.type === "delimiter") {
          return <hr key={idx} className="my-8 border-zinc-100 dark:border-zinc-800" />;
        }
        if (b.type === "image") {
          const url = b.data.file?.url ?? b.data.url;
          if (!url) return null;
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <figure key={idx}>
              <img alt={b.data.caption ?? ""} src={url} />
              {b.data.caption ? <figcaption>{b.data.caption}</figcaption> : null}
            </figure>
          );
        }
        return null;
      })}
    </div>
  );
}

export function extractText(data: any) {
  const blocks: Block[] = Array.isArray(data?.blocks) ? data.blocks : [];
  return blocks
    .filter((b) => b.type === "paragraph")
    .map((b) => b.data.text.replace(/<[^>]*>?/gm, "")) // Remove HTML tags
    .join(" ");
}
