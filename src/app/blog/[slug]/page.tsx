import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlogPost } from '@/lib/supabase';

async function getPost(slug: string): Promise<BlogPost | null> {
    try {
        const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/blog/${slug}`, { next: { revalidate: 60 } });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return { title: 'Article non trouvé' };
    return {
        title: `${post.title} | Blog Cabinet Kiné`,
        description: post.excerpt || post.title,
    };
}


export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) notFound();

    return (
        <div className="bg-white min-h-screen antialiased">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-slate-200 px-4 py-3" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)' }}>
                <div className="flex items-center gap-3 max-w-2xl mx-auto">
                    <Link href="/" className="p-2 -ml-2 text-slate-500 rounded-lg hover:bg-slate-100 transition">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Conseils & Santé</p>
                        <h1 className="text-sm font-bold text-slate-900 truncate" style={{ maxWidth: 220 }}>{post.title}</h1>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 pb-20 pt-6">
                {post.cover_url && (
                    <div className="rounded-2xl overflow-hidden mb-6 relative" style={{ height: 240 }}>
                        <Image
                            src={post.cover_url}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: '#137fec' }}>
                        Santé
                    </span>
                    <span className="text-slate-400 text-xs">
                        {new Date(post.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                </div>

                <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight">{post.title}</h2>

                {post.excerpt && (
                    <p className="text-slate-600 text-base leading-relaxed mb-6 border-l-4 pl-4 italic" style={{ borderColor: '#137fec' }}>
                        {post.excerpt}
                    </p>
                )}

                {post.content && (
                    <div
                        className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                )}

                <div className="mt-12 pt-6 border-t border-slate-200 text-center">
                    <p className="text-slate-500 text-sm mb-4">Besoin d&apos;un rendez-vous ?</p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 text-white font-bold py-3 px-6 rounded-xl"
                        style={{ background: '#137fec', boxShadow: '0 4px 14px rgba(19,127,236,0.3)' }}
                    >
                        Nous contacter
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>
            </main>
        </div>
    );
}
