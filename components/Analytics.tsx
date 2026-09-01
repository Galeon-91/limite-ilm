"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function hasConsent() {
  try {
    return localStorage.getItem("lilm_cookie_consent") === "accepted";
  } catch {
    return false;
  }
}

function getVisitorId() {
  try {
    const key = "lilm_vid";
    let id = localStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(key, id);
    }
    return id;
  } catch {
    return null;
  }
}

// Analitica propia: registra una visita por navegacion en la tabla
// `page_views` de Supabase. Sin cookies de terceros, sin anuncios. El
// identificador (localStorage) solo se crea y se envia si la persona ha
// aceptado las cookies analiticas en el banner (ver CookieConsent.tsx y
// la pagina /cookies).
export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const track = useCallback(() => {
    if (pathname.startsWith("/admin")) return;
    if (!hasConsent()) return;

    const path = searchParams?.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path,
        referrer: document.referrer || null,
        visitor_id: getVisitorId(),
      }),
      keepalive: true,
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  useEffect(() => {
    track();
  }, [track]);

  useEffect(() => {
    window.addEventListener("lilm:cookie-consent-changed", track);
    return () =>
      window.removeEventListener("lilm:cookie-consent-changed", track);
  }, [track]);

  return null;
}
