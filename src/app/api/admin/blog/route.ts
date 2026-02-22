import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET — posts publicados (público) o todos (admin)
export async function GET(request: Request) {
    const session = await auth();
    const isAdmin = !!session;

    const query = isAdmin
        ? supabaseAdmin.from('blog_posts').select('*').order('created_at', { ascending: false })
        : supabase.from('blog_posts').select('*').eq('status', 'published').order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: 'Error al leer los artículos' }, { status: 500 });
    }

    return NextResponse.json(data);
}

// POST — crear nuevo artículo (solo admin)
export async function POST(request: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, slug, content, excerpt, cover_url, status } = body;

        if (!title || !slug) {
            return NextResponse.json({ error: 'Título y slug son obligatorios' }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin
            .from('blog_posts')
            .insert({ title, slug, content, excerpt, cover_url, status: status ?? 'draft' })
            .select()
            .single();

        if (error) {
            console.error('Blog insert error:', error);
            return NextResponse.json({ error: 'Error al crear el artículo' }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}
