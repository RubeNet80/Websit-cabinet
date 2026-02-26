// Este fichero se mantiene solo por compatibilidad con imports existentes.
// La lógica de base de datos usa ahora Supabase (ver src/lib/supabase.ts).

export interface WaitingListEntry {
  id: string;
  firstName: string;  // alias de first_name para compatibilidad con el frontend
  lastName: string;
  phone: string;
  motif: string;
  createdAt: string;
  claimedBy?: string | null;
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
