"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { JSONContent } from "@tiptap/react";
import TiptapEditor from "@/components/admin/TiptapEditor";
import { createClient } from "@/lib/supabase/client";
import { optimizeImageFile } from "@/lib/image-optimize";
import { emptyDoc } from "@/lib/tiptap-extensions";
import type { ArticleWithCategory, Category } from "@/lib/types";
import CoverMedia from "@/components/CoverMedia";

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type Props = {
  article?: ArticleWithCategory;
  categories: Category[];
  action: (formData: FormData) => Promise<{ error?: string } | void>;
};

export default function ArticleForm({ article, categories, action }: Props) {
  const topLevelCategories = categories.filter((c) => !c.parent_id);
  const childrenByParent = categories.reduce<Record<string, Category[]>>((acc, c) => {
    if (c.parent_id) {
      (acc[c.parent_id] ??= []).push(c);
    }
    return acc;
  }, {});

  const router = useRouter();
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!article);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [coverUrl, setCoverUrl] = useState(article?.cover_image_url ?? "");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [skipCoverOptimization, setSkipCoverOptimization] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(article?.pdf_url ?? "");
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const contentRef = useRef<HTMLInputElement>(null);
  const currentContent = useRef<JSONContent>(
    (article?.content as JSONContent) ?? emptyDoc
  );

  async function handleCoverUpload(file: File) {
    setUploadingCover(true);
    try {
      const supabase = createClient();
      const optimized = await optimizeImageFile(file, skipCoverOptimization);
      const ext = optimized.name.split(".").pop();
      const path = `portadas/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, optimized);
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setCoverUrl(data.publicUrl);
    } catch (err) {
      console.error(err);
      alert("No se pudo subir la portada.");
    } finally {
      setUploadingCover(false);
    }
  }

  async function handlePdfUpload(file: File) {
    setUploadingPdf(true);
    try {
      const supabase = createClient();
      const path = `documentos/${crypto.randomUUID()}.pdf`;
      const { error } = await supabase.storage.from("media").upload(path, file);
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setPdfUrl(data.publicUrl);
    } catch (err) {
      console.error(err);
      alert("No se pudo subir el PDF.");
    } finally {
      setUploadingPdf(false);
    }
  }

  function handleSubmit(formData: FormData) {
    setError(null);
    if (contentRef.current) {
      contentRef.current.value = JSON.stringify(currentContent.current);
    }
    formData.set("content", JSON.stringify(currentContent.current));
    formData.set("cover_image_url", coverUrl);
    formData.set("pdf_url", pdfUrl);

    startTransition(async () => {
      const result = await action(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/admin/articulos");
        router.refresh();
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {article?.id && <input type="hidden" name="id" value={article.id} />}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <label className="mb-1 block font-sans text-sm font-semibold text-ink-900">
              Título
            </label>
            <input
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
              required
              className="w-full rounded-tr-xl rounded-bl-xl border border-electric-100 px-4 py-2.5 font-serif text-lg focus:border-electric-400 focus:outline-none"
              placeholder="¿Por qué el cielo es azul?"
            />
          </div>

          <div>
            <label className="mb-1 block font-sans text-sm font-semibold text-ink-900">
              Slug (URL)
            </label>
            <input
              name="slug"
              value={slug}
              onChange={(e) => {
                setSlug(slugify(e.target.value));
                setSlugTouched(true);
              }}
              required
              className="w-full rounded-tr-xl rounded-bl-xl border border-electric-100 px-4 py-2.5 font-mono text-sm focus:border-electric-400 focus:outline-none"
            />
            <p className="mt-1 font-serif text-xs text-ink-800/60">
              /articulo/{slug || "…"}
            </p>
          </div>

          <div>
            <label className="mb-1 block font-sans text-sm font-semibold text-ink-900">
              Extracto
            </label>
            <textarea
              name="excerpt"
              defaultValue={article?.excerpt ?? ""}
              rows={2}
              className="w-full rounded-tr-xl rounded-bl-xl border border-electric-100 px-4 py-2.5 font-serif focus:border-electric-400 focus:outline-none"
              placeholder="Resumen corto para las listas de artículos y las redes sociales."
            />
          </div>

          <div>
            <label className="mb-1 block font-sans text-sm font-semibold text-ink-900">
              Contenido
            </label>
            <TiptapEditor
              initialContent={currentContent.current}
              onChange={(json) => {
                currentContent.current = json;
              }}
            />
            <input ref={contentRef} type="hidden" name="content" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white p-5 shadow-glow-sm">
            <label className="mb-1 block font-sans text-sm font-semibold text-ink-900">
              Categoría
            </label>
            <select
              name="category_id"
              defaultValue={article?.category_id ?? ""}
              required
              className="mb-4 w-full rounded-tr-xl rounded-bl-xl border border-electric-100 px-3 py-2 font-serif focus:border-electric-400 focus:outline-none"
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>
              {topLevelCategories.map((parent) => {
                const children = childrenByParent[parent.id] ?? [];
                if (children.length === 0) {
                  return (
                    <option key={parent.id} value={parent.id}>
                      {parent.name}
                    </option>
                  );
                }
                return (
                  <optgroup key={parent.id} label={parent.name}>
                    <option value={parent.id}>{parent.name} (sección general)</option>
                    {children.map((child) => (
                      <option key={child.id} value={child.id}>
                        {child.name}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>

            <label className="mb-1 block font-sans text-sm font-semibold text-ink-900">
              Estado
            </label>
            <select
              name="status"
              defaultValue={article?.status ?? "draft"}
              className="w-full rounded-tr-xl rounded-bl-xl border border-electric-100 px-3 py-2 font-serif focus:border-electric-400 focus:outline-none"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </div>

          <div className="rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white p-5 shadow-glow-sm">
            <label className="mb-2 block font-sans text-sm font-semibold text-ink-900">
              Portada (imagen o vídeo)
            </label>
            {coverUrl && (
              <CoverMedia
                src={coverUrl}
                className="mb-3 aspect-video w-full rounded-tr-xl rounded-bl-xl object-cover"
                autoPlay={false}
              />
            )}
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleCoverUpload(file);
              }}
              className="w-full text-sm"
            />
        <label className="mt-2 flex items-center gap-1.5 font-serif text-xs text-ink-800/70">
          <input
            type="checkbox"
            checked={skipCoverOptimization}
            onChange={(e) => setSkipCoverOptimization(e.target.checked)}
          />
          Ya esta optimizada/o (no comprimir)
        </label>
            {uploadingCover && (
              <p className="mt-1 font-serif text-xs text-ink-800/60">Subiendo…</p>
            )}
          </div>

          <div className="rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white p-5 shadow-glow-sm">
            <label className="mb-2 block font-sans text-sm font-semibold text-ink-900">
              Documento PDF adjunto
            </label>
            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 block truncate rounded-tr-xl rounded-bl-xl border border-electric-100 px-3 py-2 font-serif text-sm text-electric-700 underline"
              >
                {pdfUrl.split("/").pop()}
              </a>
            )}
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handlePdfUpload(file);
              }}
              className="w-full text-sm"
            />
            {uploadingPdf && (
              <p className="mt-1 font-serif text-xs text-ink-800/60">Subiendo…</p>
            )}
            {pdfUrl && (
              <button
                type="button"
                onClick={() => setPdfUrl("")}
                className="mt-2 font-serif text-xs text-red-600 underline"
              >
                Quitar PDF
              </button>
            )}
          </div>

          {error && (
            <p className="rounded-tr-xl rounded-bl-xl bg-red-50 px-4 py-2 font-serif text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-tr-2xl rounded-bl-2xl bg-electric-600 px-4 py-3 font-sans text-sm font-bold text-white shadow-glow-sm transition-colors hover:bg-electric-700 disabled:opacity-60"
          >
            {pending ? "Guardando…" : "Guardar artículo"}
          </button>
        </div>
      </div>
    </form>
  );
}
