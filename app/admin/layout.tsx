import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // El middleware ya redirige a /admin/login si no hay usuario, pero
  // /admin/login en sí no pasa por este layout (vive fuera del shell).
  if (!user) {
    return <div className="min-h-screen bg-paper-50">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-paper-50">
      <AdminSidebar email={user.email ?? ""} />
      <main className="flex-1 overflow-y-auto px-8 py-8">{children}</main>
    </div>
  );
}
