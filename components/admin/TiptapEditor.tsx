"use client";

import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import { useCallback, useRef, useState } from "react";
import { tiptapExtensions } from "@/lib/tiptap-extensions";
import { createClient } from "@/lib/supabase/client";

type Props = {
  initialContent: JSONContent;
  onChange: (json: JSONContent) => void;
};

function ToolbarButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`rounded-lg px-2.5 py-1.5 font-sans text-sm font-semibold transition-colors ${
        active
          ? "bg-electric-600 text-white"
          : "text-ink-800 hover:bg-electric-50"
      }`}
    >
      {children}
    </button>
  );
}

export default function TiptapEditor({ initialContent, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: tiptapExtensions,
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[400px] focus:outline-none font-serif",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
  });

  const uploadImage = useCallback(
    async (file: File) => {
      if (!editor) return;
      setUploading(true);
      try {
        const supabase = createClient();
        const ext = file.name.split(".").pop();
        const path = `articulos/${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage
          .from("media")
          .upload(path, file);
        if (error) throw error;
        const { data } = supabase.storage.from("media").getPublicUrl(path);
        editor.chain().focus().setImage({ src: data.publicUrl }).run();
      } catch (err) {
        console.error(err);
        alert("No se pudo subir la imagen. Revisa el bucket 'media' en Supabase Storage.");
      } finally {
        setUploading(false);
      }
    },
    [editor]
  );

  if (!editor) return null;

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL del enlace", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addYoutube = () => {
    const url = window.prompt("URL de YouTube");
    if (!url) return;
    editor.commands.setYoutubeVideo({ src: url });
  };

  return (
    <div className="rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white shadow-glow-sm">
      <div className="flex flex-wrap items-center gap-1 border-b border-electric-100 p-2">
        <ToolbarButton
          label="Negrita"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </ToolbarButton>
        <ToolbarButton
          label="Cursiva"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <span className="italic">I</span>
        </ToolbarButton>
        <ToolbarButton
          label="Subrayado"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <span className="underline">U</span>
        </ToolbarButton>
        <ToolbarButton
          label="Tachado"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <span className="line-through">S</span>
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-electric-100" />

        <ToolbarButton
          label="Título 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          label="Título 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          label="Título 4"
          active={editor.isActive("heading", { level: 4 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        >
          H4
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-electric-100" />

        <ToolbarButton
          label="Lista de viñetas"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • Lista
        </ToolbarButton>
        <ToolbarButton
          label="Lista numerada"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. Lista
        </ToolbarButton>
        <ToolbarButton
          label="Cita"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          " Cita
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-electric-100" />

        <ToolbarButton label="Enlace" active={editor.isActive("link")} onClick={addLink}>
          🔗 Enlace
        </ToolbarButton>
        <ToolbarButton
          label="Imagen"
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? "Subiendo…" : "🖼 Imagen"}
        </ToolbarButton>
        <ToolbarButton label="Vídeo de YouTube" onClick={addYoutube}>
          ▶ Vídeo
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-electric-100" />

        <ToolbarButton
          label="Deshacer"
          onClick={() => editor.chain().focus().undo().run()}
        >
          ↶
        </ToolbarButton>
        <ToolbarButton
          label="Rehacer"
          onClick={() => editor.chain().focus().redo().run()}
        >
          ↷
        </ToolbarButton>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadImage(file);
          e.target.value = "";
        }}
      />

      <div className="px-6 py-5">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
