// Fuente única de verdad para la taxonomía del sitio.
// Se usa para: generar las páginas de categoría, sembrar la tabla
// `categories` en Supabase (ver supabase/schema.sql) y alimentar los
// desplegables del Navbar.

export type CategoryDef = {
  slug: string; // ruta completa, p.ej. "ciencias-fisicas/astronomia"
  name: string;
  parentSlug: string | null; // slug completo del padre, o null si es top-level
};

export const CATEGORIES: CategoryDef[] = [
  { slug: "ciencia-y-fe", name: "Ciencia y Fe", parentSlug: null },
  { slug: "ciencia-y-fe/milagros-del-coran", name: "Milagros del Corán", parentSlug: "ciencia-y-fe" },
  { slug: "ciencia-y-fe/historia", name: "Historia", parentSlug: "ciencia-y-fe" },

  { slug: "ciencias-fisicas", name: "Ciencias Físicas", parentSlug: null },
  { slug: "ciencias-fisicas/fisica", name: "Física", parentSlug: "ciencias-fisicas" },
  { slug: "ciencias-fisicas/astronomia", name: "Astronomía", parentSlug: "ciencias-fisicas" },
  { slug: "ciencias-fisicas/cosmologia", name: "Cosmología", parentSlug: "ciencias-fisicas" },

  { slug: "ciencias-naturales", name: "Ciencias Naturales", parentSlug: null },
  { slug: "ciencias-naturales/biologia", name: "Biología", parentSlug: "ciencias-naturales" },
  { slug: "ciencias-naturales/zoologia", name: "Zoología", parentSlug: "ciencias-naturales" },
  { slug: "ciencias-naturales/embriologia", name: "Embriología", parentSlug: "ciencias-naturales" },
  { slug: "ciencias-naturales/fisiologia", name: "Fisiología", parentSlug: "ciencias-naturales" },

  { slug: "tierra-y-materia", name: "Tierra y Materia", parentSlug: null },
  { slug: "tierra-y-materia/quimica", name: "Química", parentSlug: "tierra-y-materia" },
  { slug: "tierra-y-materia/geologia", name: "Geología", parentSlug: "tierra-y-materia" },
  { slug: "tierra-y-materia/meteorologia", name: "Meteorología", parentSlug: "tierra-y-materia" },

  { slug: "matematicas", name: "Matemáticas", parentSlug: null },

  { slug: "secciones", name: "Secciones", parentSlug: null },
  { slug: "secciones/respuestas", name: "Respuestas", parentSlug: "secciones" },
  { slug: "secciones/videos", name: "Vídeos", parentSlug: "secciones" },
  { slug: "secciones/patranas", name: "Patrañas", parentSlug: "secciones" },
];

export function categoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}
