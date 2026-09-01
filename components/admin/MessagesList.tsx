"use client";

import { useTransition } from "react";
import { markMessageRead, deleteMessage } from "@/app/admin/mensajes/actions";
import type { ContactMessage } from "@/lib/types";

export default function MessagesList({
  messages,
}: {
  messages: ContactMessage[];
}) {
  const [, startTransition] = useTransition();

  if (messages.length === 0) {
    return (
      <p className="rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white p-8 text-center font-serif text-ink-800/60 shadow-glow-sm">
        Todavía no ha llegado ningún mensaje.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`rounded-tr-2xl rounded-bl-2xl border p-5 shadow-glow-sm ${
            m.read ? "border-electric-100 bg-white" : "border-electric-300 bg-electric-50/40"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-sans text-sm font-bold text-ink-900">
                {m.name}{" "}
                <span className="font-normal text-ink-800/60">
                  &lt;{m.email}&gt;
                </span>
              </p>
              {m.subject && (
                <p className="mt-0.5 font-sans text-sm font-semibold text-electric-700">
                  {m.subject}
                </p>
              )}
              <p className="mt-2 whitespace-pre-wrap font-serif text-sm text-ink-800">
                {m.message}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <span className="font-serif text-xs text-ink-800/50">
                {new Date(m.created_at).toLocaleString("es-ES")}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    startTransition(() => markMessageRead(m.id, !m.read))
                  }
                  className="font-sans text-xs font-semibold text-electric-600 hover:text-electric-700"
                >
                  {m.read ? "Marcar sin leer" : "Marcar leído"}
                </button>
                <button
                  onClick={() => {
                    if (confirm("¿Borrar este mensaje?")) {
                      startTransition(() => deleteMessage(m.id));
                    }
                  }}
                  className="font-sans text-xs font-semibold text-red-600 hover:text-red-700"
                >
                  Borrar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
