"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/app/admin/articulos/actions";
import {
  IconResumen,
  IconArticulos,
  IconMensajes,
  IconAnalitica,
} from "@/components/admin/icons";

const LINKS = [
  { href: "/admin", label: "Resumen", Icon: IconResumen },
  { href: "/admin/articulos", label: "Artículos", Icon: IconArticulos },
  { href: "/admin/mensajes", label: "Mensajes", Icon: IconMensajes },
  { href: "/admin/analitica", label: "Analítica", Icon: IconAnalitica },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-electric-100 bg-white">
      <div className="border-b border-electric-100 px-5 py-5">
        <p className="font-sans text-lg font-extrabold text-ink-900">
          Límite <span className="text-electric-600">ILM</span>
        </p>
        <p className="mt-0.5 truncate font-serif text-xs text-ink-800/60">{email}</p>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {LINKS.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 rounded-tr-xl rounded-bl-xl px-3 py-2.5 font-sans text-sm font-semibold transition-colors ${
                active
                  ? "bg-electric-600 text-white"
                  : "text-ink-800 hover:bg-electric-50"
              }`}
            >
              <link.Icon className="h-[18px] w-[18px] shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-electric-100 p-3">
        <Link
          href="/"
          className="block rounded-tr-xl rounded-bl-xl px-3 py-2.5 font-sans text-sm font-semibold text-ink-800 hover:bg-electric-50"
        >
          ← Ver el sitio
        </Link>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="w-full rounded-tr-xl rounded-bl-xl px-3 py-2.5 text-left font-sans text-sm font-semibold text-ink-800 hover:bg-electric-50"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  );
}
