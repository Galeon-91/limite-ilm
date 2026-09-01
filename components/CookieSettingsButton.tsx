"use client";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new CustomEvent("lilm:open-cookie-settings"))
      }
      className="hover:text-electric-600"
    >
      Configurar cookies
    </button>
  );
}
