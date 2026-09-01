"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function markMessageRead(id: string, read: boolean) {
  const supabase = await createClient();
  await supabase.from("messages").update({ read }).eq("id", id);
  revalidatePath("/admin/mensajes");
  revalidatePath("/admin");
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  await supabase.from("messages").delete().eq("id", id);
  revalidatePath("/admin/mensajes");
}
