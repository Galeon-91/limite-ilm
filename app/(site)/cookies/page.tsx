import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Qué cookies y tecnologías similares usa Límite ILM.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl py-6">
      <header className="mb-8">
        <p className="font-sans text-sm font-bold uppercase tracking-wide text-electric-600">
          Legal
        </p>
        <h1 className="mt-1 font-sans text-3xl font-extrabold text-ink-900 sm:text-4xl">
          Política de Cookies
        </h1>
        <p className="mt-3 font-serif text-sm text-ink-800/60">
          Última actualización: septiembre de 2026
        </p>
      </header>

      <div className="prose prose-sm sm:prose-base max-w-none rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white/80 p-6 shadow-glow-sm sm:p-8">
        <h2>Qué son las cookies</h2>
        <p>
          Las cookies y tecnologías similares (como el almacenamiento
          local o localStorage del navegador) son pequeños archivos que
          un sitio web guarda en tu dispositivo para recordar información
          entre visitas.
        </p>

        <h2>Qué usa Límite ILM</h2>
        <p>
          Este sitio no usa cookies de publicidad, ni de redes sociales,
          ni herramientas de analítica de terceros como Google Analytics.
          Solo usamos almacenamiento local del navegador, con estas dos
          finalidades:
        </p>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Finalidad</th>
              <th>Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>lilm_cookie_consent</td>
              <td>Técnica (necesaria)</td>
              <td>
                Recordar si has aceptado o rechazado la cookie analítica.
              </td>
              <td>Hasta que borres los datos de navegación</td>
            </tr>
            <tr>
              <td>lilm_vid</td>
              <td>Analítica propia</td>
              <td>
                Identificador anónimo para contar visitas y saber qué
                artículos funcionan mejor. Solo se crea si aceptas la
                cookie analítica.
              </td>
              <td>Hasta que borres los datos de navegación</td>
            </tr>
          </tbody>
        </table>

        <h2>Cómo gestionar tu elección</h2>
        <p>
          La primera vez que visitas el sitio te mostramos un aviso donde
          puedes aceptar o rechazar la cookie analítica. Puedes cambiar
          tu decisión cuando quieras pulsando en Configurar cookies, al
          pie de cualquier página. También puedes borrar el
          almacenamiento local desde la configuración de tu navegador en
          cualquier momento.
        </p>

        <h2>Base legal</h2>
        <p>
          La cookie técnica (lilm_cookie_consent) está exenta de
          consentimiento porque es necesaria para recordar tu elección.
          La cookie analítica (lilm_vid) solo se activa con tu
          consentimiento expreso, que puedes retirar en cualquier momento
          sin que eso afecte a la navegación por el sitio.
        </p>

        <h2>Más información sobre tus datos</h2>
        <p>
          Para saber cómo tratamos el resto de tus datos personales,
          consulta la <a href="/privacidad">Política de Privacidad</a>.
        </p>
      </div>
    </div>
  );
}
