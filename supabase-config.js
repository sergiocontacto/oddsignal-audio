// ============================================================
//  Configuración de Supabase
//
//  Rellena estos dos valores con los de tu proyecto:
//    Supabase > Project Settings > Data API
//
//  La "anon key" es PÚBLICA por diseño: está pensada para ir en el
//  navegador. Lo que protege los datos son las políticas RLS del
//  archivo supabase-setup.sql, no el secreto de esta clave.
//
//  NUNCA pongas aquí la "service_role key". Esa salta todas las
//  políticas de seguridad y solo debe vivir en un servidor.
// ============================================================

window.SUPABASE_CONFIG = {
    url: 'PEGA_AQUI_LA_URL_DEL_PROYECTO',      // https://xxxxxxxx.supabase.co
    anonKey: 'PEGA_AQUI_LA_ANON_KEY'
};
