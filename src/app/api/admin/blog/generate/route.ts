import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { GoogleGenerativeAI } from '@google/generative-ai';
// import OpenAI from 'openai'; // Removed in favor of Google AI
import { supabaseAdmin } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { topic } = body;

        if (!topic) {
            return NextResponse.json({ error: 'Le sujet est obligatoire' }, { status: 400 });
        }

        const genAIKey = process.env.GOOGLE_GENAI_API_KEY;
        // const openaiKey = process.env.OPENAI_API_KEY; // Deprecated image generation provider

        if (!genAIKey) {
            return NextResponse.json({ error: 'Clé API Gemini non configurée (GOOGLE_GENAI_API_KEY)' }, { status: 500 });
        }

        // Prompt preparation with strict JSON constraints
        const prompt = `
            Tu es un physiothérapeute expert (masseur-kinésithérapeute). 
            Rédige un article de blog vulgarisé, informatif et intéressant sur le sujet suivant : "${topic}".
            L'article doit être en français, avec un ton professionnel, bienveillant et pédagogique.
            
            STRUCTURE :
            1. Un titre (TITLE) accrocheur mais médicalement précis.
            2. Un résumé (EXCERPT) captivant de 2-3 phrases.
            3. Un contenu (CONTENT) structuré en sections (utilisant h2, h3, p, ul, li). Concentre-toi sur des conseils pratiques et la compréhension de la pathologie.
            4. Une description d'image (IMAGEPROMPT) en anglais pour DALL-E/Midjourney décrivant une photo de haute qualité d'un cabinet de kiné moderne liée au sujet.

            IMPORTANT : Réponds UNIQUEMENT avec un objet JSON valide. Ne conclus pas le JSON dans des balises markdown.
            
            Schema JSON :
            {
                "title": "string",
                "excerpt": "string",
                "content": "string (valid HTML bits)",
                "imagePrompt": "string"
            }
        `;

        // 1. Generate Text with Gemini
        const genAI = new GoogleGenerativeAI(genAIKey);

        let result;
        const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro"];
        let lastError = null;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Attempting Gemini with ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                result = await model.generateContent(prompt);
                if (result) break;
            } catch (err) {
                const error = err as Error;
                console.error(`Gemini ${modelName} failed:`, error.message);
                lastError = error;
            }
        }

        if (!result) {
            throw new Error(`Gemini API Error: Aucun modèle n'a fonctionné. Dernière erreur: ${lastError?.message}`);
        }

        const responseText = result.response.text();
        console.log('Gemini response received');

        // Clean potential markdown artifacts and extract JSON
        let generatedData;
        try {
            const jsonText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            generatedData = JSON.parse(jsonText);
        } catch (parseErr) {
            console.error('JSON Parse Error, trying regex match:', parseErr);
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('Erreur lors de la génération du contenu JSON : Format invalide');
            }
            generatedData = JSON.parse(jsonMatch[0]);
        }

        // 2. Unsplash "Smart Picker" Logic (Verified Physiotherapy Photos)
        const UNSPLASH_IDS = [
            '1597452485669-2c7bb5fef90d',
            '1544367567-0f2fcb009e0b',
            '1581091226825-a6a2a5aee158'
        ];

        let coverUrl = 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&q=80'; // Working Fallback

        try {
            console.log('Selecting Unsplash photo for the blog...');

            // Randomly pick a high-quality photo from our verified set
            const randomId = UNSPLASH_IDS[Math.floor(Math.random() * UNSPLASH_IDS.length)];
            const imageUrl = `https://images.unsplash.com/photo-${randomId}?auto=format&fit=crop&q=80&w=1200`;

            // 3. Upload to Supabase Storage to make it permanent
            console.log(`Downloading Unsplash image: ${randomId}`);
            const imgFetch = await fetch(imageUrl);

            if (imgFetch.ok) {
                const arrayBuffer = await imgFetch.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const fileName = `blog/${uuidv4()}.png`;

                console.log(`Uploading Unsplash image to Storage: ${fileName} (${buffer.byteLength} bytes)`);
                const { error: uploadError } = await supabaseAdmin
                    .storage
                    .from('blog-images')
                    .upload(fileName, buffer, {
                        contentType: 'image/png',
                        upsert: true
                    });

                if (!uploadError) {
                    const { data } = supabaseAdmin
                        .storage
                        .from('blog-images')
                        .getPublicUrl(fileName);
                    coverUrl = data.publicUrl;
                    console.log('Unsplash image hosted successfully in Supabase:', coverUrl);
                } else {
                    console.error('Supabase Storage upload error:', uploadError);
                    coverUrl = imageUrl; // Fallback to direct Unsplash link
                }
            } else {
                console.warn('Failed to fetch image from Unsplash. Using fallback.');
            }
        } catch (imageErr) {
            const error = imageErr as Error;
            console.error('Image handling error:', error.message);
            // Fallback is already set
        }

        // 4. Return results
        return NextResponse.json({
            title: generatedData.title,
            excerpt: generatedData.excerpt,
            content: generatedData.content,
            cover_url: coverUrl,
            slug: generatedData.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        });

    } catch (err) {
        const error = err as Error;
        console.error('Generation Error:', error);
        return NextResponse.json({ error: `Erreur de génération : ${error.message}` }, { status: 500 });
    }
}
