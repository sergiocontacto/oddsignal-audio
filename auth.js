// ============================================================
//  Capa de autenticación sobre Supabase.
//  Se carga como módulo:  <script type="module" src="auth.js">
// ============================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const config = window.SUPABASE_CONFIG || {};
const configured =
    config.url &&
    config.anonKey &&
    !config.url.startsWith('PEGA_AQUI') &&
    !config.anonKey.startsWith('PEGA_AQUI');

export const isConfigured = configured;
export const supabase = configured ? createClient(config.url, config.anonKey) : null;

// Mensaje único y claro cuando faltan las claves, en vez de un fallo
// críptico de red al primer click.
export function requireConfig() {
    if (configured) return true;
    document.querySelectorAll('[data-auth-view]').forEach((el) => {
        el.innerHTML =
            '<p class="auth-notice">Account system not configured yet. ' +
            'Add your Supabase project URL and anon key to supabase-config.js.</p>';
    });
    return false;
}


// ---------- Sesión ----------

export async function getSession() {
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    return data.session;
}

export async function getProfile() {
    if (!supabase) return null;
    const session = await getSession();
    if (!session) return null;

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

    if (error) throw error;
    return data;
}

// Manda al login a quien no haya iniciado sesión.
export async function requireAuth(redirectTo = 'login.html') {
    const session = await getSession();
    if (!session) {
        window.location.replace(redirectTo);
        return null;
    }
    return session;
}

export async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.href = 'index.html';
}


// ---------- Registro y acceso ----------

export async function signUp({ email, password, fullName, daw, platform, betaTester }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName || '',
                daw: daw || '',
                platform: platform || '',
                beta_tester: !!betaTester
            },
            emailRedirectTo: new URL('account.html', window.location.href).href
        }
    });
    if (error) throw error;

    // Si la confirmación por email está activada, no hay sesión todavía.
    return { needsConfirmation: !data.session, user: data.user };
}

export async function signIn({ email, password }) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
}

export async function resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: new URL('account.html', window.location.href).href
    });
    if (error) throw error;
}


// ---------- Licencias y descargas ----------

export async function getLicenses() {
    const { data, error } = await supabase
        .from('licenses')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
}

export async function getReleases() {
    const { data, error } = await supabase
        .from('releases')
        .select('*')
        .order('published_at', { ascending: false });
    if (error) throw error;
    return data || [];
}

// Pide una URL firmada de un solo uso, válida 60 segundos. El bucket es
// privado: sin esta firma el archivo no es accesible aunque se conozca
// la ruta.
export async function getDownloadUrl(storagePath) {
    const { data, error } = await supabase
        .storage
        .from('builds')
        .createSignedUrl(storagePath, 60);
    if (error) throw error;
    return data.signedUrl;
}


// ---------- Utilidades de interfaz ----------

// Cambia el enlace del menú entre "Login" y "Account" según la sesión.
export async function updateNavAuthLink() {
    const link = document.querySelector('[data-auth-link]');
    if (!link) return;
    if (!configured) return;

    const session = await getSession();
    if (session) {
        link.textContent = 'Account';
        link.setAttribute('href', 'account.html');
    } else {
        link.textContent = 'Login';
        link.setAttribute('href', 'login.html');
    }
}
