create table if not exists public.student_registry (
  id uuid primary key default gen_random_uuid(),
  school_name text not null,
  matric_number text not null,
  date_of_birth date not null,
  full_name text not null,
  department text,
  faculty text,
  level text,
  source_reference text,
  created_at timestamptz not null default now(),
  constraint student_registry_school_matric_unique
    unique (school_name, matric_number)
);

alter table public.student_registry enable row level security;

revoke all on table public.student_registry from public, anon, authenticated;

comment on table public.student_registry is
  'Private authoritative student records. Access only through a trusted server-side verification function; do not seed fabricated records.';
