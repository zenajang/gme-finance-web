-- Notice templates table for admin auto-fill UI
create table if not exists public.notice_templates (
  category text primary key,
  content text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep updated_at current on updates
create or replace function public.set_notice_templates_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger notice_templates_set_updated_at
before update on public.notice_templates
for each row execute procedure public.set_notice_templates_updated_at();

alter table public.notice_templates enable row level security;

-- Allow authenticated admins to manage templates
create policy "notice_templates_select_authenticated"
  on public.notice_templates
  for select
  to authenticated
  using (true);

create policy "notice_templates_insert_authenticated"
  on public.notice_templates
  for insert
  to authenticated
  with check (true);

create policy "notice_templates_update_authenticated"
  on public.notice_templates
  for update
  to authenticated
  using (true)
  with check (true);

create policy "notice_templates_delete_authenticated"
  on public.notice_templates
  for delete
  to authenticated
  using (true);

-- Optional seed rows for the three notice categories
insert into public.notice_templates (category, content)
values
  ('loss_of_benefit', ''),
  ('auction', ''),
  ('transfer', '')
on conflict (category) do nothing;
