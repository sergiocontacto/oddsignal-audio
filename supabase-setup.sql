-- ============================================================
--  ODDSIGNAL AUDIO — Supabase setup
--  Ejecutar entero en:  Supabase > SQL Editor > New query > Run
--  Es idempotente: se puede volver a ejecutar sin romper nada.
-- ============================================================


-- ------------------------------------------------------------
--  1. PERFILES
--     Una fila por usuario registrado. Se crea sola al registrarse.
-- ------------------------------------------------------------
create table if not exists public.profiles (
    id              uuid primary key references auth.users on delete cascade,
    email           text,
    full_name       text,
    is_beta_tester  boolean     not null default false,
    daw             text,
    platform        text,
    created_at      timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles: leer el propio" on public.profiles;
create policy "profiles: leer el propio"
    on public.profiles for select
    to authenticated
    using (auth.uid() = id);

drop policy if exists "profiles: actualizar el propio" on public.profiles;
create policy "profiles: actualizar el propio"
    on public.profiles for update
    to authenticated
    using (auth.uid() = id)
    with check (auth.uid() = id);


-- ------------------------------------------------------------
--  2. LICENCIAS
--     Clave por usuario y producto. Solo lectura desde la web.
-- ------------------------------------------------------------
create table if not exists public.licenses (
    id           uuid        primary key default gen_random_uuid(),
    user_id      uuid        not null references auth.users on delete cascade,
    product      text        not null,
    license_key  text        not null unique,
    status       text        not null default 'active',
    created_at   timestamptz not null default now()
);

create index if not exists licenses_user_id_idx on public.licenses (user_id);

alter table public.licenses enable row level security;

drop policy if exists "licenses: leer las propias" on public.licenses;
create policy "licenses: leer las propias"
    on public.licenses for select
    to authenticated
    using (auth.uid() = user_id);
-- Nota: no hay policy de INSERT a proposito. Las licencias solo las crea
-- el trigger de abajo (security definer) o tu desde el panel de Supabase.


-- ------------------------------------------------------------
--  3. RELEASES
--     Catalogo de descargas. storage_path apunta al bucket 'builds'.
-- ------------------------------------------------------------
create table if not exists public.releases (
    id            uuid        primary key default gen_random_uuid(),
    product       text        not null,
    version       text        not null,
    platform      text        not null,          -- 'windows' | 'macos'
    format        text,                          -- 'VST3', 'AU', ...
    storage_path  text        not null,          -- p.ej. 'evoraverb/EvoraVerb-1.0.0-win.zip'
    is_beta       boolean     not null default true,
    is_published  boolean     not null default true,
    notes         text,
    published_at  timestamptz not null default now()
);

alter table public.releases enable row level security;

-- Las betas solo las ven los beta testers. Las releases publicas, todo
-- usuario registrado.
drop policy if exists "releases: visibles segun acceso" on public.releases;
create policy "releases: visibles segun acceso"
    on public.releases for select
    to authenticated
    using (
        is_published
        and (
            not is_beta
            or exists (
                select 1 from public.profiles p
                where p.id = auth.uid() and p.is_beta_tester
            )
        )
    );


-- ------------------------------------------------------------
--  4. GENERADOR DE CLAVES DE LICENCIA
--     Formato: EVRV-XXXX-XXXX-XXXX  (sin O/0/I/1 para evitar
--     confusiones al teclearlas a mano).
-- ------------------------------------------------------------
create or replace function public.generate_license_key(prefix text default 'EVRV')
returns text
language plpgsql
as $$
declare
    alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    result   text := prefix;
    i        int;
begin
    for i in 1..3 loop
        result := result || '-';
        for i in 1..4 loop
            result := result || substr(alphabet, floor(random() * length(alphabet) + 1)::int, 1);
        end loop;
    end loop;
    return result;
end;
$$;


-- ------------------------------------------------------------
--  5. ALTA AUTOMATICA AL REGISTRARSE
--     Crea el perfil y emite la licencia de EvoraVerb.
--     Lee los campos que manda el formulario de registro
--     (full_name, daw, platform, beta_tester).
-- ------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    new_key text;
begin
    insert into public.profiles (id, email, full_name, daw, platform, is_beta_tester)
    values (
        new.id,
        new.email,
        nullif(new.raw_user_meta_data ->> 'full_name', ''),
        nullif(new.raw_user_meta_data ->> 'daw', ''),
        nullif(new.raw_user_meta_data ->> 'platform', ''),
        coalesce((new.raw_user_meta_data ->> 'beta_tester')::boolean, false)
    )
    on conflict (id) do nothing;

    -- Clave unica: reintenta si colisiona (probabilidad minima).
    loop
        new_key := public.generate_license_key('EVRV');
        begin
            insert into public.licenses (user_id, product, license_key)
            values (new.id, 'EvoraVerb', new_key);
            exit;
        exception when unique_violation then
            -- vuelve a intentarlo con otra clave
        end;
    end loop;

    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();


-- ------------------------------------------------------------
--  6. ALMACENAMIENTO DE LAS BUILDS
--     Bucket PRIVADO. La web pide una URL firmada que caduca.
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('builds', 'builds', false)
on conflict (id) do update set public = false;

drop policy if exists "builds: descarga para beta testers" on storage.objects;
create policy "builds: descarga para beta testers"
    on storage.objects for select
    to authenticated
    using (
        bucket_id = 'builds'
        and exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.is_beta_tester
        )
    );


-- ============================================================
--  DESPUES DE EJECUTAR ESTO
--
--  1) Storage > builds > sube el instalador, p.ej. dentro de una
--     carpeta 'evoraverb/'.
--
--  2) Da de alta la descarga (ajusta version y nombre de archivo):
--
--     insert into public.releases (product, version, platform, format, storage_path)
--     values ('EvoraVerb', '1.0.0-beta', 'windows', 'VST3',
--             'evoraverb/EvoraVerb-1.0.0-beta-win.zip');
--
--  3) Para aprobar a un beta tester a mano:
--
--     update public.profiles set is_beta_tester = true
--     where email = 'persona@ejemplo.com';
--
--  4) Authentication > URL Configuration:
--     Site URL       https://oddsignalaudio.com
--     Redirect URLs  https://oddsignalaudio.com/account.html
-- ============================================================
