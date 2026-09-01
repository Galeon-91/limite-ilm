const VIDEO_EXTENSIONS = ["mp4", "webm", "mov", "ogg", "ogv", "m4v"];

// Distingue si una URL de portada apunta a un video o a una imagen, mirando
// la extension del archivo (asi subimos ambos tipos al mismo bucket de
// Supabase Storage y los guardamos en la misma columna cover_image_url).
export function isVideoUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  const clean = url.split("?")[0].toLowerCase();
  const ext = clean.split(".").pop();
  return !!ext && VIDEO_EXTENSIONS.includes(ext);
}
