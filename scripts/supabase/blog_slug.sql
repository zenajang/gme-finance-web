-- Title-based slugs for blog_posts (WordPress/Ghost style)
-- - readable title slug (e.g. loan-for-foreigners-in-korea)
-- - duplicates get -2, -3, ...
-- - non-Latin titles (Thai/Nepali/Khmer/...) slugify to empty -> fall back to short id
-- Covers every insert path (blog / customer_feedback / country) via one trigger.

create extension if not exists unaccent;

-- generate + dedupe slug on write (only when slug is missing, so edits keep it)
create or replace function public.set_blog_slug()
returns trigger
language plpgsql
as $$
declare
  base      text;
  candidate text;
  n         int := 1;
begin
  if new.slug is not null and new.slug <> '' then
    return new;
  end if;

  base := trim(both '-' from regexp_replace(lower(unaccent(coalesce(new.title, ''))), '[^a-z0-9]+', '-', 'g'));
  base := trim(both '-' from left(base, 60));
  if base = '' then
    base := substr(replace(new.id::text, '-', ''), 1, 8); -- non-Latin fallback
  end if;

  candidate := base;
  while exists (select 1 from public.blog_posts where slug = candidate and id <> new.id) loop
    n := n + 1;
    candidate := base || '-' || n;
  end loop;

  new.slug := candidate;
  return new;
end;
$$;

drop trigger if exists blog_posts_set_slug on public.blog_posts;
create trigger blog_posts_set_slug
before insert or update on public.blog_posts
for each row execute procedure public.set_blog_slug();

-- backfill existing rows (first of a duplicate title stays clean, rest get -2, -3)
with base as (
  select id, created_at,
    coalesce(
      nullif(trim(both '-' from left(trim(both '-' from regexp_replace(lower(unaccent(title)), '[^a-z0-9]+', '-', 'g')), 60)), ''),
      substr(replace(id::text, '-', ''), 1, 8)
    ) as b
  from public.blog_posts
),
ranked as (
  select id, b, row_number() over (partition by b order by created_at, id) as rn
  from base
)
update public.blog_posts p
set slug = case when r.rn = 1 then r.b else r.b || '-' || r.rn end
from ranked r
where p.id = r.id;

create unique index if not exists blog_posts_slug_key on public.blog_posts (slug);
