"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "lilm_cookie_consent";
const CONSENT_EVENT = "lilm:cookie-consent-changed";
const OPEN_EVENT = "lilm:open-cookie-settings";

function readConsent(): "accepted" | "rejected" | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

function saveConsent(value: "accepted" | "rejected") {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // localStorage no disponible (modo privado, etc.): no persistimos,
    // pero dejamos seguir navegando con normalidad.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}

// Banner de consentimiento de cookies. Se muestra la primera vez que
// alguien visita el sitio, y tambien cuando se pulsa Configurar cookies
// en el pie de pagina (ver CookieSettingsButton.tsx). La analitica propia
// (components/Analytics.tsx) solo se activa si aqui se elige Aceptar.
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === null);

    const openSettings = () => setVisible(true);
    window.addEventListener(OPEN_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_EVENT, openSettings);
  }, []);

  if (!visible) return null;

  const choose = (value: "accepted" | "rejected") => {
    saveConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Preferencias de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-electric-100 bg-paper-50/98 px-4 py-5 shadow-glow-md backdrop-blur sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl font-serif text-sm text-ink-800">
          Usamos un identificador propio y anónimo, guardado en tu
          navegador, para contar visitas y saber qué artículos funcionan
          mejor. No usamos cookies de publicidad ni las compartimos con
          terceros. Puedes aceptarlo o rechazarlo, y cambiar de opinión
          cuando quieras desde Configurar cookies, al pie de la página.{" "}
          <Link
            href="/cookies"
            className="font-semibold text-electric-600 underline underline-offset-2 hover:text-electric-700"
          >
            Más información
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="rounded-tr-xl rounded-bl-xl border border-electric-200 px-4 py-2 font-sans text-sm font-semibold text-ink-900 transition hover:bg-electric-50"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-tr-xl rounded-bl-xl bg-electric-600 px-4 py-2 font-sans text-sm font-semibold text-white transition hover:bg-electric-700"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
