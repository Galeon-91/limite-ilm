import Link from "next/link";

const FEATURED = [
  {
    label: "Ciencia y Fe",
    href: "/ciencia-y-fe",
    blurb: "Milagros del Corán e historia de la ciencia.",
    isPremium: true,
  },
  {
    label: "Ciencias Físicas",
    href: "/ciencias-fisicas",
    blurb: "Física, astronomía y cosmología.",
  },
  {
    label: "Ciencias Naturales",
    href: "/ciencias-naturales",
    blurb: "Biología, zoología, embriología y fisiología.",
  },
  {
    label: "Tierra y Materia",
    href: "/tierra-y-materia",
    blurb: "Química, geología y meteorología.",
  },
  {
    label: "Matemáticas",
    href: "/matematicas",
    blurb: "El lenguaje detrás de todo lo demás.",
  },
  {
    label: "Secciones",
    href: "/secciones",
    blurb: "Respuestas, vídeos y patrañas desmontadas.",
  },
];

export default function HomePage() {
  return (
    <div className="py-10">
      <section className="rounded-tr-5xl rounded-bl-5xl bg-white/70 p-8 shadow-glow-lg sm:p-12">
        <h1 className="max-w-2xl font-sans text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">
          Ciencia rigurosa. Sin atajos, sin miedo a las grandes preguntas.
        </h1>
        <p className="mt-4 max-w-xl font-serif text-lg text-ink-800">
          Límite ILM explora el universo, la materia y la vida — y dónde se
          cruzan con las grandes preguntas de siempre.
        </p>
        <p className="mt-3 max-w-xl font-serif text-base text-ink-800/80">
          Con la membresía premium (4,99€/mes) desbloqueas Ciencia y Fe al
          completo y el acceso íntegro a la Academia de la Profe Amira.
        </p>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white/80 p-6 shadow-glow-sm transition-shadow hover:shadow-glow-md"
          >
            {item.isPremium && (
              <span className="absolute right-4 top-4 rounded-full bg-terracota px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Premium
              </span>
            )}
            <h2 className="font-sans text-lg font-bold text-ink-900 group-hover:text-electric-600">
              {item.label}
            </h2>
            <p className="mt-2 font-serif text-sm text-ink-800">
              {item.blurb}
            </p>
          </Link>
        ))}

        <div className="rounded-tr-5xl rounded-bl-5xl bg-stone-100 p-3 sm:col-span-2 lg:col-span-3">
          <Link
            href="/academia-amira"
            className="group flex flex-col justify-between gap-6 rounded-tr-4xl rounded-bl-4xl bg-gradient-to-br from-denim to-lavender p-8 shadow-glow-md transition-shadow hover:shadow-glow-lg sm:flex-row sm:items-center sm:p-10"
          >
            <div>
              <span className="inline-block rounded-full bg-terracota px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Premium
              </span>
              <h2 className="mt-3 font-sans text-2xl font-extrabold text-white sm:text-3xl">
                La Academia de la Profe Amira
              </h2>
              <p className="mt-2 max-w-md font-serif text-base text-white/90">
                Lecciones de árabe y educación islámica, paso a paso.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-terracota px-6 py-3 font-sans text-sm font-bold text-white shadow-glow-sm transition-transform group-hover:scale-105">
              Descubre la Academia
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
