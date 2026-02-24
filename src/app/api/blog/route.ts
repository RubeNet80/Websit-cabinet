import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('status', 'published')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching blogs:', error);
            return NextResponse.json({ error: 'Error al leer los artículos' }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error('Blog API error:', err);
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}
