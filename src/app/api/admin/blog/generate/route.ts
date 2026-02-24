import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
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
        const openaiKey = process.env.OPENAI_API_KEY;

        if (!genAIKey) {
            return NextResponse.json({ error: 'Clé API Gemini non configurée (GOOGLE_GENAI_API_KEY)' }, { status: 500 });
        }

        // Prompt preparation
        const prompt = `
            Tu es un physiothérapeute expert (masseur-kinésithérapeute). 
            Rédige un article de blog vulgarisé et intéressant sur le sujet suivant : "${topic}".
            L'article doit être en français, professionnel mais accessible.
            Inclus :
            - Un titre accrocheur.
            - Un court résumé (excerpt).
            - Un contenu détaillé structuré con tags HTML (p, h2, h3, ul, li).
            - Ne mets pas de balises markdown comme \`\`\`html au début ou à la fin.
            Format de sortie souhaité (JSON uniquement) :
            {
                "title": "Titre de l'article",
                "excerpt": "Court résumé...",
                "content": "Contenu HTML completo...",
                "imagePrompt": "Detailed description in english to generate a realistic physiotherapy photo related to this topic"
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
            } catch (err: any) {
                console.error(`Gemini ${modelName} failed:`, err.message);
                lastError = err;
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

        // 2. Generate Image with DALL-E if key exists
        let coverUrl = 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80'; // Fallback

        if (openaiKey) {
            try {
                const openai = new OpenAI({ apiKey: openaiKey });
                const imageResponse = await openai.images.generate({
                    model: "dall-e-3",
                    prompt: generatedData.imagePrompt || `Professional physiotherapy session for ${topic}, high quality, realistic medical photography`,
                    n: 1,
                    size: "1024x1024",
                });

                const imageUrl = imageResponse.data?.[0]?.url;

                if (imageUrl) {
                    // 3. Upload to Supabase Storage if possible
                    try {
                        const imgFetch = await fetch(imageUrl);
                        const buffer = await imgFetch.arrayBuffer();
                        const fileName = `blog/${uuidv4()}.png`;

                        const { data: uploadData, error: uploadError } = await supabaseAdmin
                            .storage
                            .from('blog-images')
                            .upload(fileName, buffer, {
                                contentType: 'image/png',
                                upsert: true
                            });

                        if (!uploadError) {
                            const { data: { publicUrl } } = supabaseAdmin
                                .storage
                                .from('blog-images')
                                .getPublicUrl(fileName);
                            coverUrl = publicUrl;
                        } else {
                            console.error('Storage upload error:', uploadError);
                            coverUrl = imageUrl; // Fallback to OpenAI temporary link
                        }
                    } catch (storageErr) {
                        console.error('Storage integration error:', storageErr);
                        coverUrl = imageUrl;
                    }
                }
            } catch (imageErr) {
                console.error('Image generation error:', imageErr);
            }
        }

        // 4. Return results
        return NextResponse.json({
            title: generatedData.title,
            excerpt: generatedData.excerpt,
            content: generatedData.content,
            cover_url: coverUrl,
            slug: generatedData.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        });

    } catch (err: any) {
        console.error('Generation Error:', err);
        return NextResponse.json({ error: `Erreur de génération : ${err.message}` }, { status: 500 });
    }
}
