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
        <section className="mt-24 py-16 px-4" id="blog" style={{ background: '#fbfbfc' }}>
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Actualités</span>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800">
                            Conseils &amp; Santé
                        </h3>
                    </div>
                    <a className="text-[#0a66c2] text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all p-2 rounded-lg hover:bg-blue-50" href="#">
                        Tout Voir <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group bg-white rounded-3xl overflow-hidden premium-shadow border border-slate-50 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col"
                            >
                                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                                    <Image
                                        alt={post.title}
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        src={post.cover_url || 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80'}
                                        fill
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h5 className="text-lg font-extrabold text-slate-900 mb-3 leading-snug group-hover:text-primary transition-colors">{post.title}</h5>
                                    <p className="text-slate-500 text-sm leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {post.excerpt || (post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : '')}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-12 bg-white rounded-3xl border border-slate-100 border-dashed">
                            <p className="text-slate-400 text-sm italic">Plus d&apos;articles au format premium arrivent bientôt...</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
