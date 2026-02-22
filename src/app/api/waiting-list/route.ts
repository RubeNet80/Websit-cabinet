import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET — devuelve solo el conteo público de la lista de espera
export async function GET() {
    const { count, error } = await supabase
        .from('waiting_list')
        .select('*', { count: 'exact', head: true });

    if (error) {
        return NextResponse.json({ error: 'Error al leer la base de datos' }, { status: 500 });
    }

    return NextResponse.json({ count: count ?? 0 });
}

// POST — añade un nuevo paciente a la lista de espera
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, phone, motif } = body;

        if (!firstName || !lastName || !phone || !motif) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin
            .from('waiting_list')
            .insert({
                first_name: firstName,
                last_name: lastName,
                phone,
                motif,
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase insert error:', error);
            return NextResponse.json({ error: 'Error al guardar la entrada' }, { status: 500 });
        }

        return NextResponse.json({ success: true, id: data.id });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}
