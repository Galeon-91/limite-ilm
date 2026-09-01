import Link from "next/link";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export default function Footer() {
  return (
    <footer className="border-t border-electric-100 bg-white/60">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-ink-800 sm:px-6 lg:px-8">
        <p className="font-sans font-semibold text-ink-900">
          Límite <span className="text-electric-600">ILM</span>
        </p>
        <p className="mt-2 max-w-prose font-serif">
          Revista digital de divulgación científica: ciencia y fe, ciencias
          físicas, ciencias naturales, tierra y materia, matemáticas.
        </p>
        <nav className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/secciones/respuestas" className="hover:text-electric-600">
            Respuestas
          </Link>
          <Link href="/secciones/videos" className="hover:text-electric-600">
            Vídeos
          </Link>
          <Link href="/secciones/patranas" className="hover:text-electric-600">
            Patrañas
          </Link>
          <Link href="/contacto" className="hover:text-electric-600">
            Contacto
          </Link>

          <Link href="/privacidad" className="hover:text-electric-600">

            Privacidad

          </Link>

          <Link href="/cookies" className="hover:text-electric-600">

            Cookies

          </Link>

          <CookieSettingsButton />
        </nav>
        <p className="mt-6 text-xs text-ink-800/60">
          © {new Date().getFullYear()} Límite ILM
        </p>
      </div>
    </footer>
  );
}
