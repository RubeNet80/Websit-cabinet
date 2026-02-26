import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const waitingListSchema = z.object({
    firstName: z.string().min(2, "Le prénom est trop court").max(50),
    lastName: z.string().min(2, "Le nom est trop court").max(50),
    phone: z.string().regex(/^[0-9+\s().-]{8,20}$/, "Format de téléphone invalide"),
    motif: z.string().min(5, "Le motif est trop court").max(500),
});

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

        // Validation with Zod
        const validation = waitingListSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({
                error: 'Données invalides',
                details: validation.error.format()
            }, { status: 400 });
        }

        const { firstName, lastName, phone, motif } = validation.data;

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
