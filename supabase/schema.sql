-- ============================================================================
-- Límite ILM — esquema de Supabase
-- ============================================================================
-- Cómo aplicarlo:
--   1. Crea un proyecto en https://supabase.com
--   2. Ve a "SQL Editor" → "New query"
--   3. Pega TODO este archivo y pulsa "Run"
--   4. Ve a "Storage" → crea un bucket público llamado "media" (ver el bloque
--      al final de este archivo, que también lo intenta crear por SQL)
--   5. Ve a "Authentication" → "Users" → "Add user" y crea tu usuario admin
--      (email + contraseña). Ese es el único login que existe: no hay tabla
--      de roles, cualquier usuario autenticado en Supabase Auth es admin.
--   6. Copia "Project URL" y "anon public key" (Settings → API) a tu
--      archivo .env.local (ver .env.example en la raíz del proyecto).
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- Tabla: categories
-- ----------------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  parent_id uuid references public.categories (id) on delete set null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.categories is
  'Taxonomía del sitio. Se siembra una vez desde lib/categories.ts y rara vez cambia.';

-- ----------------------------------------------------------------------------
-- Tabla: articles
-- ----------------------------------------------------------------------------
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content jsonb not null default '{"type":"doc","content":[]}'::jsonb, -- documento TipTap
  cover_image_url text,
  category_id uuid references public.categories (id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  views integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_category_id_idx on public.articles (category_id);
create index if not exists articles_status_published_at_idx on public.articles (status, published_at desc);
create index if not exists articles_title_idx on public.articles using gin (to_tsvector('spanish', title));

-- Mantiene updated_at al día en cada UPDATE
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row
  execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- Tabla: messages (bandeja de entrada del formulario de contacto)
-- ----------------------------------------------------------------------------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Tabla: page_views (analítica propia, sin cookies ni terceros)
-- ----------------------------------------------------------------------------
create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  path text not null,
  referrer text,
  visitor_id text, -- id anónimo generado en el navegador (localStorage), no PII
  created_at timestamptz not null default now()
);

create index if not exists page_views_created_at_idx on public.page_views (created_at desc);
create index if not exists page_views_path_idx on public.page_views (path);

-- ----------------------------------------------------------------------------
-- Función RPC: incrementa las vistas de un artículo de forma atómica
-- ----------------------------------------------------------------------------
create or replace function public.increment_article_views(article_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.articles set views = views + 1 where id = article_id;
$$;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
alter table public.categories enable row level security;
alter table public.articles enable row level security;
alter table public.messages enable row level security;
alter table public.page_views enable row level security;

-- Concede privilegios a nivel de tabla a anon/authenticated.
-- RLS (arriba) sigue restringiendo el acceso fila a fila; sin este GRANT
-- las policies no bastan y PostgREST devuelve 'permission denied' (42501).
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to anon, authenticated;
grant usage, select on all sequences in schema public to anon, authenticated;
alter default privileges in schema public grant select, insert, update, delete on tables to anon, authenticated;
alter default privileges in schema public grant usage, select on sequences to anon, authenticated;

-- categories: lectura pública, escritura solo para usuarios autenticados (admin)
drop policy if exists "categories_public_read" on public.categories;
create policy "categories_public_read"
  on public.categories for select
  to anon, authenticated
  using (true);

drop policy if exists "categories_admin_write" on public.categories;
create policy "categories_admin_write"
  on public.categories for all
  to authenticated
  using (true)
  with check (true);

-- articles: lectura pública solo de publicados; el admin (autenticado) ve/edita todo
drop policy if exists "articles_public_read_published" on public.articles;
create policy "articles_public_read_published"
  on public.articles for select
  to anon
  using (status = 'published');

drop policy if exists "articles_admin_read_all" on public.articles;
create policy "articles_admin_read_all"
  on public.articles for select
  to authenticated
  using (true);

drop policy if exists "articles_admin_write" on public.articles;
create policy "articles_admin_write"
  on public.articles for insert
  to authenticated
  with check (true);

drop policy if exists "articles_admin_update" on public.articles;
create policy "articles_admin_update"
  on public.articles for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "articles_admin_delete" on public.articles;
create policy "articles_admin_delete"
  on public.articles for delete
  to authenticated
  using (true);

-- La RPC de vistas la puede llamar cualquiera (lectores anónimos incrementan vistas)
grant execute on function public.increment_article_views(uuid) to anon, authenticated;

-- messages: cualquiera puede insertar (formulario de contacto); solo el admin lee/edita
drop policy if exists "messages_public_insert" on public.messages;
create policy "messages_public_insert"
  on public.messages for insert
  to anon, authenticated
  with check (true);

drop policy if exists "messages_admin_read" on public.messages;
create policy "messages_admin_read"
  on public.messages for select
  to authenticated
  using (true);

drop policy if exists "messages_admin_update" on public.messages;
create policy "messages_admin_update"
  on public.messages for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "messages_admin_delete" on public.messages;
create policy "messages_admin_delete"
  on public.messages for delete
  to authenticated
  using (true);

-- page_views: cualquiera puede insertar (tracking); solo el admin lee
drop policy if exists "page_views_public_insert" on public.page_views;
create policy "page_views_public_insert"
  on public.page_views for insert
  to anon, authenticated
  with check (true);

drop policy if exists "page_views_admin_read" on public.page_views;
create policy "page_views_admin_read"
  on public.page_views for select
  to authenticated
  using (true);

-- ============================================================================
-- STORAGE — bucket "media" para portadas de artículos e imágenes del editor
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

drop policy if exists "media_admin_insert" on storage.objects;
create policy "media_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "media_admin_update" on storage.objects;
create policy "media_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

drop policy if exists "media_admin_delete" on storage.objects;
create policy "media_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');

-- ============================================================================
-- SEED — taxonomía completa (21 categorías, en el mismo orden que
-- lib/categories.ts). Usa upsert por slug, así se puede volver a ejecutar
-- sin duplicar filas.
-- ============================================================================
insert into public.categories (slug, name, parent_id, sort_order)
values
  ('ciencia-y-fe', 'Ciencia y Fe', null, 1),
  ('ciencias-fisicas', 'Ciencias Físicas', null, 2),
  ('ciencias-naturales', 'Ciencias Naturales', null, 3),
  ('tierra-y-materia', 'Tierra y Materia', null, 4),
  ('matematicas', 'Matemáticas', null, 5),
  ('secciones', 'Secciones', null, 6)
on conflict (slug) do update set name = excluded.name, sort_order = excluded.sort_order;

-- Subcategorías: resuelven el parent_id por el slug del padre ya insertado arriba
insert into public.categories (slug, name, parent_id, sort_order)
values
  ('ciencia-y-fe/milagros-del-coran', 'Milagros del Corán', (select id from public.categories where slug = 'ciencia-y-fe'), 1),
  ('ciencia-y-fe/historia', 'Historia', (select id from public.categories where slug = 'ciencia-y-fe'), 2),

  ('ciencias-fisicas/fisica', 'Física', (select id from public.categories where slug = 'ciencias-fisicas'), 1),
  ('ciencias-fisicas/astronomia', 'Astronomía', (select id from public.categories where slug = 'ciencias-fisicas'), 2),
  ('ciencias-fisicas/cosmologia', 'Cosmología', (select id from public.categories where slug = 'ciencias-fisicas'), 3),

  ('ciencias-naturales/biologia', 'Biología', (select id from public.categories where slug = 'ciencias-naturales'), 1),
  ('ciencias-naturales/zoologia', 'Zoología', (select id from public.categories where slug = 'ciencias-naturales'), 2),
  ('ciencias-naturales/embriologia', 'Embriología', (select id from public.categories where slug = 'ciencias-naturales'), 3),
  ('ciencias-naturales/fisiologia', 'Fisiología', (select id from public.categories where slug = 'ciencias-naturales'), 4),

  ('tierra-y-materia/quimica', 'Química', (select id from public.categories where slug = 'tierra-y-materia'), 1),
  ('tierra-y-materia/geologia', 'Geología', (select id from public.categories where slug = 'tierra-y-materia'), 2),
  ('tierra-y-materia/meteorologia', 'Meteorología', (select id from public.categories where slug = 'tierra-y-materia'), 3),

  ('secciones/respuestas', 'Respuestas', (select id from public.categories where slug = 'secciones'), 1),
  ('secciones/videos', 'Vídeos', (select id from public.categories where slug = 'secciones'), 2),
  ('secciones/patranas', 'Patrañas', (select id from public.categories where slug = 'secciones'), 3)
on conflict (slug) do update set name = excluded.name, parent_id = excluded.parent_id, sort_order = excluded.sort_order;

-- ============================================================================
-- Fin del esquema. Después de ejecutar esto, crea tu usuario admin en
-- Authentication → Users → Add user, y ya puedes entrar en /admin/login.
-- ============================================================================
