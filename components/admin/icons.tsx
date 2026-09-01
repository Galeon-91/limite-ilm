import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Resumen: barras asimetricas con acento de molecula */
export function IconResumen(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 17V10" />
      <path d="M9.5 17V6" />
      <path d="M16 17V13" />
      <circle cx="9.5" cy="3.2" r="1.3" fill="currentColor" stroke="none" />
    </Base>
  );
}

/** Articulos: documento con esquina dorada, eco del rounded-tr de marca */
export function IconArticulos(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 2.5h6l4 4V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z" />
      <path d="M11 2.5V6a1 1 0 0 0 1 1h3" />
      <path d="M6.5 10.5h7" />
      <path d="M6.5 13.5h4.5" />
    </Base>
  );
}

/** Mensajes: sobre de correo, nunca una burbuja de chat */
export function IconMensajes(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
      <path d="M3 5.5l7 6 7-6" />
    </Base>
  );
}

/** Analitica: linea de tendencia con puntos, mismo motivo que el logo */
export function IconAnalitica(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M2.5 14.5 7 9.5l3 2.5 6.5-7.5" />
      <circle cx="2.5" cy="14.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="7" cy="9.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="4.5" r="1.1" fill="currentColor" stroke="none" />
    </Base>
  );
}
