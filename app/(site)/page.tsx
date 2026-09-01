import Link from "next/link";

const FEATURED = [
  {
    label: "Ciencia y Fe",
    href: "/ciencia-y-fe",
    blurb: "Milagros del Corán e historia de la ciencia.",
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
          Divulgación científica sin atajos.
        </h1>
        <p className="mt-4 max-w-xl font-serif text-lg text-ink-800">
          Límite ILM explora el universo, la materia y la vida — y dónde se
          cruzan con las grandes preguntas de siempre.
        </p>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white/80 p-6 shadow-glow-sm transition-shadow hover:shadow-glow-md"
          >
            <h2 className="font-sans text-lg font-bold text-ink-900 group-hover:text-electric-600">
              {item.label}
            </h2>
            <p className="mt-2 font-serif text-sm text-ink-800">
              {item.blurb}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
