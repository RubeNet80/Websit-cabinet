import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// PUT — actualizar artículo (solo admin)
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();

    const { data, error } = await supabaseAdmin
        .from('blog_posts')
        .update({ ...body, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });

    return NextResponse.json({ success: true, data });
}

// DELETE — eliminar artículo (solo admin)
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    const { id } = await params;

    const { error } = await supabaseAdmin
        .from('blog_posts')
        .delete()
        .eq('id', id);

    if (error) return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 });

    return NextResponse.json({ success: true });
}
