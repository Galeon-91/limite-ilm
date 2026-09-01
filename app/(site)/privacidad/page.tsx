import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Cómo tratamos tus datos personales en Límite ILM.",
};

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl py-6">
      <header className="mb-8">
        <p className="font-sans text-sm font-bold uppercase tracking-wide text-electric-600">
          Legal
        </p>
        <h1 className="mt-1 font-sans text-3xl font-extrabold text-ink-900 sm:text-4xl">
          Política de Privacidad
        </h1>
        <p className="mt-3 font-serif text-sm text-ink-800/60">
          Última actualización: septiembre de 2026
        </p>
      </header>

      <div className="prose prose-sm sm:prose-base max-w-none rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white/80 p-6 shadow-glow-sm sm:p-8">
        <h2>Quién es el responsable de tus datos</h2>
        <p>
          El responsable del tratamiento de los datos personales recogidos
          en este sitio web es Ismaín, titular de Límite ILM (en adelante,
          el sitio). Puedes contactar por correo electrónico en
          ismainperera91@gmail.com o a través del formulario de contacto.
        </p>
        <p className="text-xs text-ink-800/60">
          Nota para el titular del sitio: antes de publicar esta página,
          completa este apartado con tu nombre o razón social completos y,
          si corresponde, tu NIF/CIF y una dirección de contacto.
        </p>

        <h2>Qué datos tratamos y para qué</h2>
        <h3>Formulario de contacto</h3>
        <p>
          Cuando escribes a través de /contacto tratamos el nombre, el
          correo electrónico, el asunto y el mensaje que nos envías, con
          la única finalidad de responder a tu consulta. No usamos estos
          datos para ningún otro fin ni los cedemos a terceros.
        </p>
        <h3>Analítica propia</h3>
        <p>
          Si aceptas las cookies analíticas en el aviso correspondiente,
          registramos la página que visitas, la página desde la que
          llegaste (referente) y un identificador anónimo generado en tu
          propio navegador, con el fin de entender qué contenidos
          interesan más y mejorar el sitio. No usamos herramientas de
          analítica de terceros, ni cookies de publicidad, ni elaboramos
          perfiles con estos datos. Más detalles en la{" "}
          <a href="/cookies">Política de Cookies</a>.
        </p>

        <h2>Base legal</h2>
        <p>
          Tratamos los datos del formulario de contacto en base a tu
          consentimiento, que nos das al enviarlo. La analítica propia se
          basa también en tu consentimiento, otorgado a través del banner
          de cookies, y puedes retirarlo cuando quieras.
        </p>

        <h2>Cuánto tiempo conservamos los datos</h2>
        <p>
          Los mensajes del formulario de contacto se conservan mientras
          sean necesarios para atender tu consulta y, después, el tiempo
          razonable para dejar constancia de que se respondió. Los datos
          de analítica se conservan de forma agregada; el identificador
          anónimo permanece en tu navegador hasta que borres los datos de
          navegación o retires tu consentimiento.
        </p>

        <h2>Con quién compartimos los datos</h2>
        <p>
          Los datos se almacenan en Supabase, nuestro proveedor de base de
          datos y alojamiento, que actúa como encargado del tratamiento y
          cumple con la normativa de protección de datos aplicable. No
          vendemos ni cedemos tus datos a terceros con fines publicitarios.
        </p>

        <h2>Tus derechos</h2>
        <p>
          Puedes ejercer en cualquier momento tus derechos de acceso,
          rectificación, supresión, oposición, limitación del tratamiento
          y portabilidad, escribiendo a ismainperera91@gmail.com o a
          través del formulario de contacto. También tienes derecho a
          presentar una reclamación ante la Agencia Española de Protección
          de Datos (www.aepd.es) si consideras que no hemos tratado tus
          datos correctamente.
        </p>

        <h2>Menores de edad</h2>
        <p>
          Límite ILM es un sitio de divulgación científica dirigido al
          público general y no está pensado para recoger datos de menores
          de 14 años sin el consentimiento de sus padres o tutores. Si
          detectamos que se han facilitado datos de un menor sin ese
          consentimiento, los eliminaremos.
        </p>

        <h2>Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política para adaptarla a cambios
          normativos o del propio sitio. Publicaremos aquí cualquier
          cambio relevante junto con la fecha de la última actualización.
        </p>
      </div>
    </div>
  );
}
