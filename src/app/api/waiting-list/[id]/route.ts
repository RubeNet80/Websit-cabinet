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
