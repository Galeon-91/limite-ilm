"use server";

import { createClient } from "@/lib/supabase/server";

export type ContactFormState = {
  ok: boolean;
  error?: string;
} | null;

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Rellena tu nombre, email y mensaje." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Ese email no parece válido." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("messages").insert({
    name,
    email,
    subject: subject || null,
    message,
  });

  if (error) {
    console.error("sendContactMessage", error);
    return { ok: false, error: "No se pudo enviar el mensaje. Inténtalo de nuevo." };
  }

  return { ok: true };
}
