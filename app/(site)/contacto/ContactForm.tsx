"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactFormState } from "./actions";

const initialState: ContactFormState = null;

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialState
  );

  if (state?.ok) {
    return (
      <div className="rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white/80 p-8 text-center shadow-glow-sm">
        <p className="font-sans text-lg font-bold text-ink-900">
          ¡Gracias! Tu mensaje ha llegado.
        </p>
        <p className="mt-2 font-serif text-sm text-ink-800/70">
          Lo leeremos y te responderemos lo antes posible.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block font-sans text-xs font-bold uppercase tracking-wide text-ink-800/70"
          >
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-tr-xl rounded-bl-xl border border-electric-100 bg-white px-4 py-2.5 font-serif text-sm text-ink-900 outline-none transition-shadow focus:shadow-glow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1 block font-sans text-xs font-bold uppercase tracking-wide text-ink-800/70"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-tr-xl rounded-bl-xl border border-electric-100 bg-white px-4 py-2.5 font-serif text-sm text-ink-900 outline-none transition-shadow focus:shadow-glow-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-1 block font-sans text-xs font-bold uppercase tracking-wide text-ink-800/70"
        >
          Asunto (opcional)
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="w-full rounded-tr-xl rounded-bl-xl border border-electric-100 bg-white px-4 py-2.5 font-serif text-sm text-ink-900 outline-none transition-shadow focus:shadow-glow-sm"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1 block font-sans text-xs font-bold uppercase tracking-wide text-ink-800/70"
        >
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full rounded-tr-xl rounded-bl-xl border border-electric-100 bg-white px-4 py-2.5 font-serif text-sm text-ink-900 outline-none transition-shadow focus:shadow-glow-sm"
        />
      </div>

      {state?.error && (
        <p className="font-serif text-sm text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-tr-xl rounded-bl-xl bg-electric-600 px-6 py-2.5 font-sans text-sm font-bold text-white shadow-glow-sm transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
