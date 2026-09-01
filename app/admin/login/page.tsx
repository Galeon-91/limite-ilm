"use client";

import { useActionState } from "react";
import { loginAdmin } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAdmin, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper-50 px-4">
      <div className="w-full max-w-sm rounded-tr-4xl rounded-bl-4xl border border-electric-100 bg-white p-8 shadow-glow-lg">
        <h1 className="font-sans text-2xl font-extrabold text-ink-900">
          Límite <span className="text-electric-600">ILM</span>
        </h1>
        <p className="mt-1 font-serif text-sm text-ink-800">
          Acceso al panel de administración.
        </p>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block font-sans text-sm font-semibold text-ink-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="w-full rounded-tr-xl rounded-bl-xl border border-electric-100 px-4 py-2.5 font-serif focus:border-electric-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block font-sans text-sm font-semibold text-ink-900">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full rounded-tr-xl rounded-bl-xl border border-electric-100 px-4 py-2.5 font-serif focus:border-electric-400 focus:outline-none"
            />
          </div>

          {state?.error && (
            <p className="rounded-tr-xl rounded-bl-xl bg-red-50 px-4 py-2 font-serif text-sm text-red-700">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-tr-2xl rounded-bl-2xl bg-electric-600 px-4 py-3 font-sans text-sm font-bold text-white shadow-glow-sm transition-colors hover:bg-electric-700 disabled:opacity-60"
          >
            {pending ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
