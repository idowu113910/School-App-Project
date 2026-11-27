create table if not exists public.student_records (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users (id) on delete cascade,
  school_name text not null,
  matric_number text not null,
  date_of_birth date not null,
  full_name text not null,
  department text,
  faculty text,
  level text,
  created_at timestamptz not null default now(),
  constraint student_records_school_matric_unique
    unique (school_name, matric_number)
);

alter table public.student_records enable row level security;

revoke all on table public.student_records from public, anon, authenticated;
grant select on table public.student_records to authenticated;

create policy "Students can read their own record"
  on public.student_records
  for select
  to authenticated
  using ((select auth.uid()) = auth_user_id);
