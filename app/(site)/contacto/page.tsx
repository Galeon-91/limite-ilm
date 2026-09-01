import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contacto | Límite ILM",
  description: "Escríbenos: dudas, sugerencias o propuestas de colaboración.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-2xl py-6">
      <header className="mb-8">
        <p className="font-sans text-sm font-bold uppercase tracking-wide text-electric-600">
          Contacto
        </p>
        <h1 className="mt-1 font-sans text-3xl font-extrabold text-ink-900 sm:text-4xl">
          Hablemos
        </h1>
        <p className="mt-3 font-serif text-ink-800/80">
          ¿Tienes una pregunta, una corrección o una idea para un artículo?
          Escríbenos y te leeremos.
        </p>
      </header>

      <div className="rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white/80 p-6 shadow-glow-sm sm:p-8">
        <ContactForm />
      </div>
    </div>
  );
}
