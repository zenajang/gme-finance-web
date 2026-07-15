-- Title-based slugs for blog_posts (WordPress/SEO style)
-- - readable title slug, apostrophes removed, English stopwords dropped, max 6 words
--   e.g. "GME's Biggest Event of the Year is Coming to Ansan!" -> gmes-biggest-event-year-coming-ansan
-- - duplicates get -2, -3, ...
-- - non-Latin titles (Thai/Nepali/Khmer/...) slugify to empty -> fall back to short id
-- Covers every insert path (blog / customer_feedback / country) via one trigger.

create extension if not exists unaccent;

-- title -> clean slug base (no id suffix, no dedupe)
create or replace function public.gme_slug_base(p_title text)
returns text
language sql
stable
as $$
  select array_to_string(
    (array(
      select w
      from unnest(
        string_to_array(
          trim(both '-' from regexp_replace(
            lower(unaccent(replace(replace(coalesce(p_title, ''), chr(39), ''), chr(8217), ''))),
            '[^a-z0-9]+', '-', 'g'
          )),
          '-'
        )
      ) with ordinality as t(w, ord)
      where w <> ''
        and w not in ('a','an','and','the','of','is','are','be','to','for',
                      'in','on','at','with','your','you','it','its','by','or')
      order by ord
    ))[1:6],  -- keep first 6 meaningful words
    '-'
  );
$$;

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

  -- title-based slug only for English blog/feedback; country posts keep short id
  if new.category in ('blog', 'customer_feedback') then
    base := public.gme_slug_base(new.title);
  end if;
  if base is null or base = '' then
    base := substr(replace(new.id::text, '-', ''), 1, 8);
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

-- backfill existing rows (first of a duplicate stays clean, rest get -2, -3)
with base as (
  select id, created_at,
    coalesce(
      nullif(case when category in ('blog', 'customer_feedback')
                  then public.gme_slug_base(title) else '' end, ''),
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
