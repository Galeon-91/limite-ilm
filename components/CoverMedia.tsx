import { isVideoUrl } from "@/lib/media";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  /** Reproducir en bucle silenciado (portadas grandes). Las miniaturas
   * pequenas se dejan en false para no gastar recursos innecesarios. */
  autoPlay?: boolean;
};

// Muestra la portada de un articulo, sea imagen o video, con la misma
// clase (mismo recorte/bordes) en cualquier sitio del portal donde se use.
export default function CoverMedia({
  src,
  alt = "",
  className,
  autoPlay = true,
}: Props) {
  if (isVideoUrl(src)) {
    return (
      <video
        src={src}
        className={className}
        autoPlay={autoPlay}
        muted
        loop
        playsInline
        controls={!autoPlay}
        aria-label={alt}
      />
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />;
}
