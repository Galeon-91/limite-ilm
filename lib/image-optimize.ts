import imageCompression from "browser-image-compression";

/**
 * Comprime y redimensiona una imagen en el navegador antes de subirla.
 * Los vídeos y otros tipos de archivo se devuelven sin tocar (comprimir
 * vídeo en el navegador no es viable). Si el usuario marca la casilla
 * "ya está optimizada", tambien se devuelve el archivo tal cual.
 */
export async function optimizeImageFile(
  file: File,
  skip: boolean
): Promise<File> {
  if (skip) return file;
  if (!file.type.startsWith("image/")) return file;
  // GIF y SVG: comprimirlos con este metodo puede romper la animacion
  // o el propio formato vectorial, asi que se dejan tal cual.
  if (file.type === "image/gif" || file.type === "image/svg+xml") return file;

  try {
    const compressedBlob = await imageCompression(file, {
      maxWidthOrHeight: 1920,
      maxSizeMB: 1,
      initialQuality: 0.8,
      useWebWorker: true,
    });
    return new File([compressedBlob], file.name, {
      type: compressedBlob.type || file.type,
    });
  } catch (err) {
    console.error("No se pudo optimizar la imagen, se sube el original.", err);
    return file;
  }
}
