"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

type NavCategory = {
  label: string;
  href: string;
  items?: NavItem[];
};

// Taxonomía completa de Límite ILM — una entrada por cada ruta de la Fase 2
const CATEGORIES: NavCategory[] = [
  {
    label: "Ciencia y Fe",
    href: "/ciencia-y-fe",
    items: [
      { label: "Milagros del Corán", href: "/ciencia-y-fe/milagros-del-coran" },
      { label: "Historia", href: "/ciencia-y-fe/historia" },
    ],
  },
  {
    label: "Ciencias Físicas",
    href: "/ciencias-fisicas",
    items: [
      { label: "Física", href: "/ciencias-fisicas/fisica" },
      { label: "Astronomía", href: "/ciencias-fisicas/astronomia" },
      { label: "Cosmología", href: "/ciencias-fisicas/cosmologia" },
    ],
  },
  {
    label: "Ciencias Naturales",
    href: "/ciencias-naturales",
    items: [
      { label: "Biología", href: "/ciencias-naturales/biologia" },
      { label: "Zoología", href: "/ciencias-naturales/zoologia" },
      { label: "Embriología", href: "/ciencias-naturales/embriologia" },
      { label: "Fisiología", href: "/ciencias-naturales/fisiologia" },
    ],
  },
  {
    label: "Tierra y Materia",
    href: "/tierra-y-materia",
    items: [
      { label: "Química", href: "/tierra-y-materia/quimica" },
      { label: "Geología", href: "/tierra-y-materia/geologia" },
      { label: "Meteorología", href: "/tierra-y-materia/meteorologia" },
    ],
  },
  {
    label: "Matemáticas",
    href: "/matematicas",
    // Sin subcategorías: enlace directo, sin flecha de despliegue
  },
  {
    label: "Secciones",
    href: "/secciones",
    items: [
      { label: "Respuestas", href: "/secciones/respuestas" },
      { label: "Vídeos", href: "/secciones/videos" },
      { label: "Patrañas", href: "/secciones/patranas" },
    ],
  },
  {
    label: "Contacto",
    href: "/contacto",
    // Sin subcategorías: enlace directo, sin flecha de despliegue
  },
];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Cierra el desplegable activo al navegar
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSubOpen(null);
  }, [pathname]);

  // Cierra al hacer clic fuera del navbar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cierra con Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  function openWithDelay(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }

  function closeWithDelay() {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-electric-100/70 bg-paper-50/85 backdrop-blur-lg"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="Límite ILM — Inicio">
          <Image
            src="/logo.png"
            alt="Límite ILM"
            width={576}
            height={160}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        {/* Navegación de escritorio */}
        <ul className="hidden items-center gap-1 lg:flex">
          {CATEGORIES.map((category) => {
            const hasDropdown = !!category.items?.length;
            const isOpen = openMenu === category.label;

            return (
              <li
                key={category.label}
                className="relative"
                onMouseEnter={() => hasDropdown && openWithDelay(category.label)}
                onMouseLeave={() => hasDropdown && closeWithDelay()}
              >
                <button
                  type="button"
                  onClick={() =>
                    hasDropdown
                      ? setOpenMenu(isOpen ? null : category.label)
                      : undefined
                  }
                  aria-expanded={hasDropdown ? isOpen : undefined}
                  aria-haspopup={hasDropdown ? "true" : undefined}
                  className="group flex items-center gap-1 rounded-tr-2xl rounded-bl-2xl px-3 py-2 font-sans text-sm font-semibold text-ink-800 transition-colors hover:bg-electric-50 hover:text-electric-700"
                >
                  {hasDropdown ? (
                    category.label
                  ) : (
                    <Link href={category.href}>{category.label}</Link>
                  )}
                  {hasDropdown && (
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>

                {/* Panel desplegable */}
                {hasDropdown && (
                  <div
                    className={`absolute left-0 top-full pt-3 transition-all duration-200 ${
                      isOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="w-64 rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white/95 p-2 shadow-glow-md backdrop-blur-xl">
                      <Link
                        href={category.href}
                        className="block rounded-tr-xl rounded-bl-xl px-3 py-2 font-sans text-xs font-bold uppercase tracking-wide text-electric-600 hover:bg-electric-50"
                      >
                        Ver {category.label}
                      </Link>
                      <div className="my-1 h-px bg-electric-100" />
                      {category.items!.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-tr-xl rounded-bl-xl px-3 py-2 font-serif text-sm text-ink-800 transition-colors hover:bg-electric-50 hover:text-electric-700"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/buscar"
            aria-label="Buscar"
            className="hidden h-10 w-10 items-center justify-center rounded-tr-xl rounded-bl-xl text-ink-800 transition-colors hover:bg-electric-50 hover:text-electric-600 lg:flex"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
              <path d="M17 17l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </Link>

          {/* Botón menú móvil */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Abrir menú"
            className="flex h-10 w-10 items-center justify-center rounded-tr-xl rounded-bl-xl border border-electric-100 text-ink-900 shadow-glow-sm lg:hidden"
          >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            {mobileOpen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
          </button>
        </div>
      </nav>

      {/* Menú móvil (acordeón) */}
      {mobileOpen && (
        <div className="border-t border-electric-100 bg-paper-50 px-4 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col gap-1">
            {CATEGORIES.map((category) => {
              const hasDropdown = !!category.items?.length;
              const isSubOpen = mobileSubOpen === category.label;

              return (
                <li key={category.label}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={category.href}
                      className="flex-1 rounded-tr-xl rounded-bl-xl px-3 py-3 font-sans text-sm font-semibold text-ink-800"
                    >
                      {category.label}
                    </Link>
                    {hasDropdown && (
                      <button
                        type="button"
                        onClick={() =>
                          setMobileSubOpen(isSubOpen ? null : category.label)
                        }
                        aria-label={`Mostrar subcategorías de ${category.label}`}
                        className="p-3 text-electric-600"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isSubOpen ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            d="M5 7.5L10 12.5L15 7.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  {hasDropdown && isSubOpen && (
                    <div className="ml-3 flex flex-col gap-0.5 border-l-2 border-electric-100 pb-2 pl-3">
                      {category.items!.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="rounded-lg px-3 py-2 font-serif text-sm text-ink-800 hover:bg-electric-50 hover:text-electric-700"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
