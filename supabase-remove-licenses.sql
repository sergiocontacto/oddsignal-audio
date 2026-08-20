-- ============================================================
--  Quita el sistema de licencias.
--  Ejecutar en: Supabase > SQL Editor > New query > Run
--
--  El plugin todavia no valida licencias, asi que emitir claves
--  no aportaba nada. El registro pasa a servir solo para dar
--  acceso anticipado a builds.
-- ============================================================

-- 1. El alta de usuario deja de emitir licencia: solo crea el perfil.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
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

    return new;
end;
$$;

-- 2. Fuera la tabla y el generador de claves.
drop table if exists public.licenses;
drop function if exists public.generate_license_key(text);

-- Las cuentas ya registradas se conservan intactas.
