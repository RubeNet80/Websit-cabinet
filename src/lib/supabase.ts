import { createClient, SupabaseClient } from '@supabase/supabase-js';

function getClients(): { supabase: SupabaseClient; supabaseAdmin: SupabaseClient } {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY ?? supabaseAnonKey ?? '';

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
            '⚠️  Supabase env vars not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
        );
    }

    return {
        supabase: createClient(supabaseUrl, supabaseAnonKey),
        supabaseAdmin: createClient(supabaseUrl, supabaseServiceKey),
    };
}

// Lazy singletons — inicializados la primera vez que se usan (en runtime, no en build time)
let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
    if (!_supabase) ({ supabase: _supabase, supabaseAdmin: _supabaseAdmin } = getClients());
    return _supabase!;
}

export function getSupabaseAdmin(): SupabaseClient {
    if (!_supabaseAdmin) ({ supabase: _supabase, supabaseAdmin: _supabaseAdmin } = getClients());
    return _supabaseAdmin!;
}

// Aliases para compatibilidad con los imports existentes
export const supabase = new Proxy({} as SupabaseClient, {
    get(_target, prop) {
        return (getSupabase() as any)[prop];
    },
});

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
    get(_target, prop) {
        return (getSupabaseAdmin() as any)[prop];
    },
});

// Tipos de datos
export interface WaitingListEntry {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    motif: string;
    created_at: string;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string | null;
    excerpt: string | null;
    cover_url: string | null;
    status: 'draft' | 'published';
    created_at: string;
    updated_at: string;
}
