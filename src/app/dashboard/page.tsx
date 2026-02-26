'use client';

import React, { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/supabase';

type Tab = 'dashboard' | 'blog';

interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    motif: string;
    createdAt: string;
    claimedBy?: string | null;
}

export default function Dashboard() {
    const [tab, setTab] = useState<Tab>('dashboard');
    const [patients, setPatients] = useState<Patient[]>([]);
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    // Blog form state
    const [showBlogForm, setShowBlogForm] = useState(false);
    const [blogForm, setBlogForm] = useState({ title: '', slug: '', excerpt: '', content: '', cover_url: '', status: 'draft' as 'draft' | 'published' });
    const [blogSaving, setBlogSaving] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Patient form state
    const [showPatientForm, setShowPatientForm] = useState(false);
    const [patientForm, setPatientForm] = useState({ firstName: '', lastName: '', phone: '', motif: '' });
    const [patientSaving, setPatientSaving] = useState(false);

    // AI Generation state
    const [aiTopic, setAiTopic] = useState('');
    const [generatingAI, setGeneratingAI] = useState(false);

    const fetchPatients = async () => {
        try {
            const res = await fetch('/api/admin/waiting-list');
            if (res.ok) {
                const data = await res.json();
                // Normalize Supabase snake_case → camelCase
                setPatients(data.map((p: {
                    id: string;
                    first_name: string;
                    last_name: string;
                    phone: string;
                    motif: string;
                    created_at: string;
                    claimed_by?: string | null;
                }) => ({
                    id: p.id,
                    firstName: p.first_name,
                    lastName: p.last_name,
                    phone: p.phone,
                    motif: p.motif,
                    createdAt: p.created_at,
                    claimedBy: p.claimed_by,
                })));
            }
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/admin/blog');
            if (res.ok) setPosts(await res.json());
        } catch (e) { console.error(e); }
    };

    useEffect(() => {
        fetchPatients();
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Marquer ce patient comme traité et le retirer de la liste ?')) return;
        const res = await fetch(`/api/waiting-list/${id}`, { method: 'DELETE' });
        if (res.ok) setPatients(p => p.filter(x => x.id !== id));
    };

    const handleClaim = async (id: string, name: string | null) => {
        try {
            const res = await fetch(`/api/waiting-list/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ claimedBy: name }),
            });
            if (res.ok) {
                setPatients(prev => prev.map(p => p.id === id ? { ...p, claimedBy: name } : p));
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handlePatientSave = async () => {
        if (!patientForm.firstName || !patientForm.lastName || !patientForm.phone || !patientForm.motif) {
            return alert('Tous les champs sont obligatoires');
        }
        setPatientSaving(true);
        try {
            const res = await fetch('/api/waiting-list', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(patientForm),
            });
            if (res.ok) {
                await fetchPatients();
                setShowPatientForm(false);
                setPatientForm({ firstName: '', lastName: '', phone: '', motif: '' });
            } else {
                alert('Erreur lors de l\'enregistrement');
            }
        } catch (e) {
            console.error(e);
        } finally {
            setPatientSaving(false);
        }
    };

    const handleAIGenerate = async () => {
        console.log('handleAIGenerate called', { aiTopic });
        if (!aiTopic) {
            alert('Veuillez entrer un sujet pour l\'IA (ex: Mal de dos)');
            return;
        }
        setGeneratingAI(true);
        try {
            const res = await fetch('/api/admin/blog/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: aiTopic }),
            });
            const data = await res.json();
            console.log('AI Generation response:', { ok: res.ok, data });
            if (res.ok) {
                setBlogForm({
                    title: data.title,
                    slug: data.slug,
                    excerpt: data.excerpt,
                    content: data.content,
                    cover_url: data.cover_url,
                    status: 'draft'
                });
                setAiTopic('');
                alert('Article généré avec succès ! Révisez les champs ci-dessous.');
            } else {
                alert(data.error || 'Erreur lors de la génération');
            }
        } catch (e) {
            console.error('AI Generation error:', e);
            alert('Erreur réseau');
        } finally {
            setGeneratingAI(false);
        }
    };

    const handleBlogSave = async () => {
        if (!blogForm.title || !blogForm.slug) return alert('Titre et slug obligatoires');
        setBlogSaving(true);
        try {
            const url = editingId ? `/api/admin/blog/${editingId}` : '/api/admin/blog';
            const method = editingId ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogForm),
            });
            if (res.ok) {
                await fetchPosts();
                setShowBlogForm(false);
                setEditingId(null);
                setBlogForm({ title: '', slug: '', excerpt: '', content: '', cover_url: '', status: 'draft' });
            }
        } catch (e) { console.error(e); }
        finally { setBlogSaving(false); }
    };

    const handleBlogEdit = (post: BlogPost) => {
        setEditingId(post.id);
        setBlogForm({ title: post.title, slug: post.slug, excerpt: post.excerpt ?? '', content: post.content ?? '', cover_url: post.cover_url ?? '', status: post.status });
        setShowBlogForm(true);
        setTab('blog');
    };

    const handleBlogDelete = async (id: string) => {
        if (!confirm('Supprimer cet article ?')) return;
        const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
        if (res.ok) setPosts(p => p.filter(x => x.id !== id));
    };

    const generateSlug = (title: string) =>
        title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    return (
        <div className="bg-slate-50 text-slate-900 min-h-screen pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-slate-200 px-4 py-3" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)' }}>
                <div className="flex items-center justify-between max-w-lg mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center" style={{ background: 'rgba(19,127,236,0.1)' }}>
                            <span className="material-symbols-outlined text-xl" style={{ color: '#137fec' }}>manage_accounts</span>
                        </div>
                        <div>
                            <h1 className="text-sm font-bold leading-tight">Tableau de bord</h1>
                            <p className="text-slate-500 font-medium uppercase tracking-wider" style={{ fontSize: 10 }}>Cabinet Saint-Sauveur</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link className="p-2 rounded-lg text-slate-500 hover:bg-slate-100" href="/">
                            <span className="material-symbols-outlined text-xl">public</span>
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                        >
                            <span className="material-symbols-outlined text-xl">logout</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-lg mx-auto px-4 pt-6 space-y-6">
                {/* Tabs */}
                <div className="flex p-1 rounded-xl" style={{ background: 'rgba(148,163,184,0.15)' }}>
                    {(['dashboard', 'blog'] as Tab[]).map(t => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg capitalize transition ${tab === t ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                            style={{ color: tab === t ? '#137fec' : undefined }}
                        >
                            {t === 'dashboard' ? 'Liste d\'attente' : 'Blog'}
                        </button>
                    ))}
                </div>

                {/* ---- TAB: WAITING LIST ---- */}
                {tab === 'dashboard' && (
                    <>
                        {/* KPI */}
                        <div className="relative overflow-hidden rounded-2xl p-6 shadow-lg" style={{ background: '#137fec', boxShadow: '0 8px 24px rgba(19,127,236,0.3)' }}>
                            <div className="relative z-10">
                                <p className="text-sm font-medium mb-1" style={{ color: 'rgba(255,255,255,0.8)' }}>Total Patients en Attente</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="font-extrabold text-white tracking-tight" style={{ fontSize: 48 }}>
                                        {loading ? '...' : patients.length}
                                    </span>
                                    <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>personnes</span>
                                </div>
                            </div>
                            <div className="absolute rounded-full blur-2xl" style={{ right: -32, bottom: -32, width: 128, height: 128, background: 'rgba(255,255,255,0.1)' }} />
                            <div className="absolute right-4 top-4">
                                <span className="material-symbols-outlined" style={{ fontSize: 64, color: 'rgba(255,255,255,0.2)' }}>group</span>
                            </div>
                        </div>

                        {/* List */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-600">list_alt</span>
                                    Liste d&apos;Attente
                                </h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowPatientForm(!showPatientForm)}
                                        className="text-xs font-semibold px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-1"
                                    >
                                        <span className="material-symbols-outlined text-sm">person_add</span>
                                        {showPatientForm ? 'Annuler' : 'Ajouter'}
                                    </button>
                                    <button onClick={fetchPatients} className="text-xs font-semibold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-500 hover:bg-slate-200 transition">
                                        Actualiser
                                    </button>
                                </div>
                            </div>

                            {showPatientForm && (
                                <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <h3 className="font-bold text-sm text-slate-700">Enregistrer un patient (Appel/Direct)</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-400 uppercase">Prénom</label>
                                            <input
                                                className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm"
                                                placeholder="Jean"
                                                value={patientForm.firstName}
                                                onChange={e => setPatientForm({ ...patientForm, firstName: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-400 uppercase">Nom</label>
                                            <input
                                                className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm"
                                                placeholder="DUPONT"
                                                value={patientForm.lastName}
                                                onChange={e => setPatientForm({ ...patientForm, lastName: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Téléphone</label>
                                        <input
                                            className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm"
                                            placeholder="06 12 34 56 78"
                                            type="tel"
                                            value={patientForm.phone}
                                            onChange={e => setPatientForm({ ...patientForm, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Motif</label>
                                        <input
                                            className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm"
                                            placeholder="Ex: Douleur cervicale"
                                            value={patientForm.motif}
                                            onChange={e => setPatientForm({ ...patientForm, motif: e.target.value })}
                                        />
                                    </div>
                                    <button
                                        onClick={handlePatientSave}
                                        disabled={patientSaving}
                                        className="w-full py-3 text-sm font-bold text-white rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition shadow-md"
                                    >
                                        {patientSaving ? 'Enregistrement...' : 'Ajouter à la liste'}
                                    </button>
                                </div>
                            )}
                            <div className="space-y-3">
                                {loading ? (
                                    <p className="text-center text-slate-400 py-12">Chargement...</p>
                                ) : patients.length === 0 ? (
                                    <div className="text-center py-12">
                                        <span className="material-symbols-outlined text-4xl text-slate-300">sentiment_satisfied</span>
                                        <p className="text-slate-400 mt-2">Aucun patient en attente 🎉</p>
                                    </div>
                                ) : (
                                    patients.map((p) => (
                                        <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-sm">{p.lastName.toUpperCase()} {p.firstName}</h3>
                                                    <span className="text-slate-400 font-medium" style={{ fontSize: 10 }}>
                                                        {new Date(p.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })} {new Date(p.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                                <p className="text-xs font-medium mt-0.5" style={{ color: '#137fec' }}>{p.motif}</p>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <span className="material-symbols-outlined text-slate-400" style={{ fontSize: 13 }}>call</span>
                                                    <a href={`tel:${p.phone}`} className="text-slate-500 hover:text-slate-700 transition" style={{ fontSize: 12 }}>{p.phone}</a>
                                                </div>

                                                {/* Claim status / Actions */}
                                                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                                                    {p.claimedBy ? (
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold flex items-center gap-1 border border-blue-100">
                                                                <span className="material-symbols-outlined text-[12px]">person</span>
                                                                PRIS PAR {p.claimedBy.toUpperCase()}
                                                            </span>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handleClaim(p.id, null); }}
                                                                className="text-[10px] font-bold text-slate-400 hover:text-rose-500 transition px-1"
                                                            >
                                                                Libérer
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-[10px] font-bold text-slate-400 mr-0.5">PRENDRE :</span>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handleClaim(p.id, 'Leslie'); }}
                                                                className="px-2 py-0.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 rounded-md text-[10px] font-bold transition border border-transparent hover:border-emerald-100"
                                                            >
                                                                Leslie
                                                            </button>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handleClaim(p.id, 'Ruben'); }}
                                                                className="px-2 py-0.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 rounded-md text-[10px] font-bold transition border border-transparent hover:border-emerald-100"
                                                            >
                                                                Ruben
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="flex items-center justify-center border rounded-full flex-shrink-0 transition-colors hover:bg-green-100"
                                                style={{ width: 40, height: 40, background: '#f0fdf4', borderColor: '#dcfce7', color: '#16a34a' }}
                                                title="Marquer comme traité"
                                            >
                                                <span className="material-symbols-outlined font-bold" style={{ fontSize: 20 }}>check</span>
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </>
                )}

                {/* ---- TAB: BLOG ---- */}
                {tab === 'blog' && (
                    <section className="pb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-600">article</span>
                                Gestion du Blog
                            </h2>
                            <button
                                onClick={() => { setShowBlogForm(true); setEditingId(null); setBlogForm({ title: '', slug: '', excerpt: '', content: '', cover_url: '', status: 'draft' }); }}
                                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white transition"
                                style={{ background: '#137fec' }}
                            >
                                <span className="material-symbols-outlined text-sm">add</span>
                                Nouvel article
                            </button>
                        </div>

                        {/* Blog Form */}
                        {showBlogForm && (
                            <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-4 shadow-sm space-y-3">
                                <h3 className="font-bold text-sm text-slate-700">{editingId ? 'Modifier l\'article' : 'Nouvel article'}</h3>

                                {!editingId && (
                                    <div className="p-4 rounded-xl space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-blue-600 animate-pulse">magic_button</span>
                                            <label className="text-xs font-bold text-blue-900 uppercase">Assistant IA</label>
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                className="flex-1 border border-slate-200 shadow-sm rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
                                                placeholder="Sujet (ex: Mal de dos au bureau)"
                                                value={aiTopic}
                                                onChange={e => setAiTopic(e.target.value)}
                                                disabled={generatingAI}
                                            />
                                            <button
                                                onClick={handleAIGenerate}
                                                disabled={generatingAI}
                                                className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1 shrink-0 ${generatingAI || !aiTopic
                                                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                                                    }`}
                                            >
                                                {generatingAI ? (
                                                    <>
                                                        <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                                                        Rédaction...
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="material-symbols-outlined text-sm">auto_awesome</span>
                                                        Générer
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-blue-400 font-medium">L&apos;IA rédigera le texte et créera une image pro.</p>
                                    </div>
                                )}

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase">Titre</label>
                                    <input
                                        className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm" placeholder="Titre de l&apos;article"
                                        value={blogForm.title}
                                        onChange={e => setBlogForm(f => ({ ...f, title: e.target.value, slug: editingId ? f.slug : generateSlug(e.target.value) }))}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase">Slug (URL)</label>
                                    <input
                                        className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-mono text-slate-500" placeholder="mon-article"
                                        value={blogForm.slug}
                                        onChange={e => setBlogForm(f => ({ ...f, slug: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase">Résumé</label>
                                    <textarea
                                        className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm" rows={2} placeholder="Courte description..."
                                        value={blogForm.excerpt}
                                        onChange={e => setBlogForm(f => ({ ...f, excerpt: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase">Contenu (HTML)</label>
                                    <textarea
                                        className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-mono" rows={6} placeholder="<p>Contenu de l'article...</p>"
                                        value={blogForm.content}
                                        onChange={e => setBlogForm(f => ({ ...f, content: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase">URL Image de couverture</label>
                                    <input
                                        className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm" placeholder="https://..."
                                        value={blogForm.cover_url}
                                        onChange={e => setBlogForm(f => ({ ...f, cover_url: e.target.value }))}
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <label className="text-xs font-bold text-slate-400 uppercase">Statut</label>
                                    <select
                                        className="border border-slate-200 rounded-lg py-2 px-3 text-sm"
                                        value={blogForm.status}
                                        onChange={e => setBlogForm(f => ({ ...f, status: e.target.value as 'draft' | 'published' }))}
                                    >
                                        <option value="draft">Brouillon</option>
                                        <option value="published">Publié</option>
                                    </select>
                                </div>

                                <div className="flex gap-2 pt-1">
                                    <button
                                        onClick={handleBlogSave}
                                        disabled={blogSaving}
                                        className="flex-1 py-2.5 text-sm font-bold text-white rounded-xl disabled:opacity-60 transition"
                                        style={{ background: '#137fec' }}
                                    >
                                        {blogSaving ? 'Enregistrement...' : (editingId ? 'Mettre à jour' : 'Publier')}
                                    </button>
                                    <button
                                        onClick={() => setShowBlogForm(false)}
                                        className="px-4 py-2.5 text-sm font-bold text-slate-500 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Posts List */}
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                            {posts.length === 0 ? (
                                <div className="text-center py-12 text-slate-400">
                                    <span className="material-symbols-outlined text-4xl text-slate-300">article</span>
                                    <p className="mt-2 text-sm">Aucun article pour le moment</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {posts.map(post => (
                                        <div key={post.id} className="p-4 flex items-center gap-4">
                                            {post.cover_url && (
                                                <div className="rounded-lg overflow-hidden shrink-0 relative" style={{ width: 48, height: 48 }}>
                                                    <Image
                                                        alt={post.title}
                                                        className="object-cover"
                                                        src={post.cover_url}
                                                        fill
                                                    />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold truncate">{post.title}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span
                                                        className="px-1.5 py-0.5 rounded font-bold uppercase"
                                                        style={{ fontSize: 9, color: post.status === 'published' ? '#16a34a' : '#d97706', background: post.status === 'published' ? '#dcfce7' : '#fef3c7' }}
                                                    >
                                                        {post.status === 'published' ? 'Publié' : 'Brouillon'}
                                                    </span>
                                                    <span className="text-slate-400" style={{ fontSize: 10 }}>
                                                        {new Date(post.created_at).toLocaleDateString('fr-FR')}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button onClick={() => handleBlogEdit(post)} className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition">
                                                    <span className="material-symbols-outlined text-lg">edit</span>
                                                </button>
                                                <button onClick={() => handleBlogDelete(post.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition">
                                                    <span className="material-symbols-outlined text-lg">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 px-6 pb-6 pt-2" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)' }}>
                <div className="max-w-lg mx-auto flex items-center justify-around">
                    <button onClick={() => setTab('dashboard')} className="flex flex-col items-center gap-1 transition" style={{ color: tab === 'dashboard' ? '#137fec' : '#94a3b8' }}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: tab === 'dashboard' ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
                        <span className="font-bold" style={{ fontSize: 10 }}>Tableau</span>
                    </button>
                    <button onClick={() => setTab('blog')} className="flex flex-col items-center gap-1 transition" style={{ color: tab === 'blog' ? '#137fec' : '#94a3b8' }}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: tab === 'blog' ? "'FILL' 1" : "'FILL' 0" }}>rss_feed</span>
                        <span className="font-bold" style={{ fontSize: 10 }}>Blog</span>
                    </button>
                    <Link href="/" className="flex flex-col items-center gap-1" style={{ color: '#94a3b8' }}>
                        <span className="material-symbols-outlined">public</span>
                        <span className="font-bold" style={{ fontSize: 10 }}>Site</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
