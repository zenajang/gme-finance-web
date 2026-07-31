-- 추심직원(방문판매등 및 추심 인력) 조회용 테이블
-- 저장 필드: 담당자(name) / 부서(department) / 사원번호(employee_number) / 법인번호(corporate_number)
-- 공개 페이지 노출: 담당자 · 부서 · 사원번호 · 법인번호 (4개 모두 공개)
-- 공개 조회, 관리자만 쓰기.

create table if not exists public.collection_staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,               -- 담당자
  department text,                  -- 부서
  employee_number text,             -- 사원번호
  corporate_number text,            -- 법인번호
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 이미 이전 스키마(phone)로 만든 경우를 대비한 안전 마이그레이션
alter table public.collection_staff add column if not exists employee_number text;
alter table public.collection_staff add column if not exists corporate_number text;
alter table public.collection_staff drop column if exists phone;

-- updated_at 자동 갱신
create or replace function public.set_collection_staff_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists collection_staff_set_updated_at on public.collection_staff;
create trigger collection_staff_set_updated_at
before update on public.collection_staff
for each row execute procedure public.set_collection_staff_updated_at();

alter table public.collection_staff enable row level security;

-- 조회는 누구나(공개 페이지), 쓰기는 로그인한 관리자만
drop policy if exists "collection_staff_select_all" on public.collection_staff;
create policy "collection_staff_select_all"
  on public.collection_staff for select using (true);

drop policy if exists "collection_staff_insert_auth" on public.collection_staff;
create policy "collection_staff_insert_auth"
  on public.collection_staff for insert to authenticated with check (true);

drop policy if exists "collection_staff_update_auth" on public.collection_staff;
create policy "collection_staff_update_auth"
  on public.collection_staff for update to authenticated using (true) with check (true);

drop policy if exists "collection_staff_delete_auth" on public.collection_staff;
create policy "collection_staff_delete_auth"
  on public.collection_staff for delete to authenticated using (true);
