"use client";

import { useEffect, useMemo, useRef } from "react";
import type EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
// @ts-ignore
import Underline from "@editorjs/underline";
// @ts-ignore
import Quote from "@editorjs/quote";
// @ts-ignore
import Delimiter from "@editorjs/delimiter";
// @ts-ignore
import LinkTool from "@editorjs/link";
// @ts-ignore
import InlineCode from "@editorjs/inline-code";
// @ts-ignore
import Marker from "@editorjs/marker";

type Props = {
  initialData?: unknown;
  onChange: (data: unknown) => void;
  placeholder?: string;
};

export function Editor({ initialData, onChange, placeholder }: Props) {
  const holderId = useMemo(() => `editorjs-${crypto.randomUUID()}`, []);
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      const EditorJSImport = (await import("@editorjs/editorjs")).default;

      if (!mounted) return;

      const editor = new EditorJSImport({
        holder: holderId,
        data: (initialData as any) ?? undefined,
        placeholder: placeholder ?? "Comece a escrever...",
        autofocus: false,
        tools: {
          header: {
            class: Header as any,
            inlineToolbar: true,
            config: {
              levels: [1, 2, 3, 4],
              defaultLevel: 2
            }
          },
          list: {
            class: List as any,
            inlineToolbar: true
          },
          underline: Underline,
          quote: {
            class: Quote,
            inlineToolbar: true
          },
          delimiter: Delimiter,
          linkTool: LinkTool,
          inlineCode: InlineCode,
          marker: Marker,
          image: {
            class: ImageTool as any,
            config: {
              endpoints: {
                byFile: "/api/uploads/editor-image"
              },
              field: "image"
            }
          }
        },
        async onChange(api) {
          const data = await api.saver.save();
          onChange(data);
        }
      });

      editorRef.current = editor;
    }

    init();

    return () => {
      mounted = false;
      editorRef.current?.destroy?.();
      editorRef.current = null;
    };
  }, [holderId, initialData, onChange, placeholder]);

  return (
    <div className="modern-editor-wrapper">
      <div 
        id={holderId} 
        className="min-h-[300px] w-full bg-white text-zinc-900 selection:bg-blue-100 dark:bg-zinc-900 dark:text-zinc-50" 
      />
      <style jsx global>{`
        .modern-editor-wrapper .ce-block__content,
        .modern-editor-wrapper .ce-toolbar__content {
          max-width: 100%;
          margin: 0 auto;
        }
        .modern-editor-wrapper .ce-editorjs {
          padding-bottom: 20px;
        }
        .modern-editor-wrapper .codex-editor__redactor {
          padding-bottom: 100px !important;
        }
        .modern-editor-wrapper .ce-header {
          font-weight: 700;
          color: inherit;
        }
        .modern-editor-wrapper .ce-paragraph {
          font-size: 1.05rem;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}

