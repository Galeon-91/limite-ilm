"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function parseFormData(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const contentRaw = String(formData.get("content") ?? "");
  const category_id = String(formData.get("category_id") ?? "") || null;
  const status = String(formData.get("status") ?? "draft") as
    | "draft"
    | "published";
  const cover_image_url =
    String(formData.get("cover_image_url") ?? "").trim() || null;

  let content: Record<string, unknown>;
  try {
    content = JSON.parse(contentRaw);
  } catch {
    content = { type: "doc", content: [{ type: "paragraph" }] };
  }

  return { title, slug, excerpt, content, category_id, status, cover_image_url };
}

export async function createArticle(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "No autenticado." };

  const fields = parseFormData(formData);
  if (!fields.title || !fields.slug) {
    return { error: "El título y el slug son obligatorios." };
  }

  const { error } = await supabase.from("articles").insert({
    ...fields,
    published_at: fields.status === "published" ? new Date().toISOString() : null,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "Ya existe un artículo con ese slug." };
    }
    return { error: error.message };
  }

  revalidatePath("/admin/articulos");
  revalidatePath("/");
}

export async function updateArticle(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Falta el identificador del artículo." };

  const fields = parseFormData(formData);
  if (!fields.title || !fields.slug) {
    return { error: "El título y el slug son obligatorios." };
  }

  const { data: existing } = await supabase
    .from("articles")
    .select("status, published_at")
    .eq("id", id)
    .single();

  const published_at =
    fields.status === "published"
      ? existing?.published_at ?? new Date().toISOString()
      : null;

  const { error } = await supabase
    .from("articles")
    .update({ ...fields, published_at, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { error: "Ya existe un artículo con ese slug." };
    }
    return { error: error.message };
  }

  revalidatePath("/admin/articulos");
  revalidatePath(`/articulo/${fields.slug}`);
  revalidatePath("/");
}

export async function deleteArticle(id: string) {
  const supabase = await createClient();
  await supabase.from("articles").delete().eq("id", id);
  revalidatePath("/admin/articulos");
}

export async function logoutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
