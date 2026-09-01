import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { path, referrer, visitor_id } = await request.json();
    if (typeof path !== "string" || path.length > 500) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const supabase = await createClient();
    await supabase.from("page_views").insert({
      path,
      referrer: typeof referrer === "string" ? referrer.slice(0, 500) : null,
      visitor_id: typeof visitor_id === "string" ? visitor_id.slice(0, 64) : null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
