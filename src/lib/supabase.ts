import { createClient, SupabaseClient } from '@supabase/supabase-js'

interface ImportMetaEnv {
    VITE_SUPABASE_URL: string;
    VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

export interface EnvConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export const envConfig: Readonly<EnvConfig> = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

declare global {
    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}

export const supabase: SupabaseClient = createClient(
    import.meta.env.VITE_SUPABASE_URL, 
    import.meta.env.VITE_SUPABASE_ANON_KEY
);