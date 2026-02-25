import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Singletons initialization
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase environment variables are missing.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);


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
