import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET — devuelve todos los pacientes de la lista de espera (solo admin)
export async function GET() {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
        .from('waiting_list')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ error: 'Error al leer la base de datos' }, { status: 500 });
    }

    return NextResponse.json(data);
}
