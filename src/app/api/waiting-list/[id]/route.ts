import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { auth } from '@/lib/auth';

// DELETE — elimina un paciente por id (requiere sesión admin)
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id } = await params;

    const { error, count } = await supabaseAdmin
        .from('waiting_list')
        .delete({ count: 'exact' })
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: 'Error al eliminar la entrada' }, { status: 500 });
    }

    if (!count || count === 0) {
        return NextResponse.json({ error: 'Entrada no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
}

// PATCH — actualiza campos de un paciente (ej: claimed_by)
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { claimedBy } = body;

    const { data, error } = await supabaseAdmin
        .from('waiting_list')
        .update({ claimed_by: claimedBy })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Supabase update error:', error);
        return NextResponse.json({ error: `Error base de datos: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
}
