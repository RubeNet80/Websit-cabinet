'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { BlogPost } from '@/lib/supabase';

const BlogPreview = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        fetch('/api/blog').then(r => r.json()).then(d => Array.isArray(d) && setPosts(d.slice(0, 3))).catch(() => { });
    }, []);

    return (
        <section className="mt-12 py-10 px-4" id="blog" style={{ background: '#f1f5f9' }}>
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-extrabold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">article</span>
                        Conseils &amp; Santé
                    </h3>
                    <a className="text-primary text-sm font-bold" href="#">Voir tout</a>
                </div>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 block transition-transform hover:scale-[1.02]"
                                style={{ minWidth: 280, maxWidth: 320 }}
                            >
                                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                                    <Image
                                        alt={post.title}
                                        className="object-cover transition-transform duration-500 hover:scale-110"
                                        src={post.cover_url || 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80'}
                                        fill
                                    />
                                </div>
                                <div className="p-4">
                                    <h5 className="font-bold text-slate-900 mb-2 leading-tight">{post.title}</h5>
                                    <p className="text-slate-500 text-sm" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {post.excerpt || (post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : '')}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-slate-400 text-sm py-8 text-center w-full italic">Plus d&apos;articles arrivent bientôt...</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
