'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [count, setCount] = useState<number | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [formData, setFormData] = useState({ nom: '', prenom: '', phone: '', motif: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/waiting-list').then(r => r.json()).then(d => setCount(d.count)).catch(() => { });
    fetch('/api/blog').then(r => r.json()).then(d => Array.isArray(d) && setPosts(d.slice(0, 3))).catch(() => { });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const res = await fetch('/api/waiting-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: formData.prenom, lastName: formData.nom, phone: formData.phone, motif: formData.motif })
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ nom: '', prenom: '', phone: '', motif: '' });
        fetch('/api/waiting-list').then(r => r.json()).then(d => setCount(d.count)).catch(() => { });
      } else { setFormStatus('error'); }
    } catch { setFormStatus('error'); }
  };

  return (
    <div className="bg-background-light text-slate-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200" style={{ backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-primary">medical_services</span>
            </div>
            <h1 className="font-extrabold text-lg tracking-tight text-slate-900">Cabinet Kiné</h1>
          </div>
          <Link href="/dashboard" className="p-2 text-slate-600">
            <span className="material-symbols-outlined">manage_accounts</span>
          </Link>
        </div>
        {/* Horizontal Quick Nav */}
        <nav className="flex gap-6 overflow-x-auto px-4 pb-3 hide-scrollbar text-sm font-medium border-t border-slate-100 pt-2">
          <a className="text-primary whitespace-nowrap" href="#">Accueil</a>
          <a className="text-slate-500 whitespace-nowrap" href="#praticiens">Praticiens</a>
          <a className="text-slate-500 whitespace-nowrap" href="#attente">File d'attente</a>
          <a className="text-slate-500 whitespace-nowrap" href="#blog">Blog</a>
          <a className="text-slate-500 whitespace-nowrap" href="#contact">Contact</a>
        </nav>
      </header>

      <main className="pb-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden" style={{ height: 420 }}>
          <img
            alt="Cabinet de Kinésithérapie"
            className="absolute inset-0 h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJGrx3p7cFyVXQMP8fIp-6I3dBdbCtaVHUCyj7fi4K2KkjKzWbGX-BaCenoTW8_GYlEXm2x7W3f6yjckXzLzv6z1Q9GEmu1rBjv07R2K0zTz5Vw1uBRJijd18hz8h7IxQe7FwIVmfMMJDzZaBbkyq0HJLP-t3e7CfF7e4_q8MEd_Csrse5JdjGMVfUIHjqEwfYU-iz_3j_U1bKe8hggad4Gbf1UV0W3JaU90Y0oZRNYyx_DFguiziNbRjmhsALUdhPk9h_ARdt61o"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6 pb-12" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.4) 50%, transparent 100%)' }}>
            <h2 className="text-white text-3xl font-extrabold leading-tight mb-3">
              Cabinet de Kinésithérapie Saint-Sauveur-en-Rue
            </h2>
            <p className="text-slate-200 text-lg mb-6 leading-snug" style={{ maxWidth: 320 }}>
              Soins de kinésithérapie générale pour toute la famille.
            </p>
            <div className="flex gap-3">
              <a
                className="font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 text-white"
                style={{ background: '#137fec' }}
                href="#contact"
              >
                Prendre RDV
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>calendar_month</span>
              </a>
            </div>
          </div>
        </section>

        {/* Waiting List - floating card */}
        <section className="px-4 relative z-10" id="attente" style={{ marginTop: -32 }}>
          <div className="bg-white rounded-xl shadow-xl p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">group</span>
                <span className="font-bold uppercase tracking-wider text-xs">Temps réel</span>
              </div>
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">Nombre de personnes actuellement en attente :</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-black text-slate-900" style={{ fontSize: 48 }}>{count === null ? '...' : count}</span>
              <span className="text-slate-400 text-sm italic">Mise à jour à l'instant</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg flex items-start gap-3 border border-slate-100">
              <span className="material-symbols-outlined text-slate-400" style={{ fontSize: 20 }}>info</span>
              <p className="text-slate-600 text-xs leading-relaxed">
                Nous nous engageons sur la transparence de nos délais. Notre file d'attente est dynamique pour optimiser votre prise en charge.
              </p>
            </div>
          </div>
        </section>

        {/* Practitioners */}
        <section className="px-4 mt-12" id="praticiens">
          <h3 className="text-xl font-extrabold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">groups</span>
            Nos Praticiens
          </h3>
          <div className="grid gap-4">
            {[
              {
                name: 'Leslie Forel', phone: '06 18 75 49 15', tel: '0618754915',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnkNgX8ZK1tipIKdkrHFvANRki670UZcLDJGHZpYcnQChAND8QE0usEX-kl9Suy7kU5W7Ef8VUXt78f6BFm8WG9PsAZQjF_yAtC0dT0lf9fPQOiJkWLjnpgTVRJhiaHUv6li3A0BFZwb6rOdPkzOw9Pdfdz56ViQH0ctT0kQlhhGA191_dIkKEzgEAd2fzLAUDkPvir5eVAaOxnyfnU3kQM4RZGpI21sYcVyAtZQlNdKfPXuFKRhH3Ea8uMXtWIJcQmv1JuSUH5is'
              },
              {
                name: 'Ruben ASENSI CATALÀ', phone: '07 52 33 66 81', tel: '0752336681',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWGVDWK0FCt4F41ACz1PbEr28i5WcayMHNWuEEOKNCXwEW3GyTb82DOeJ7yUqmApbwZK7blUbYBlAwlUu3qlL7ssAPPhW-qNiF3I8o-xSL_26bAQlLaw49fNPYZAw6hEfHkHgTHtWJlMMsu9c0gfaIAZALbjINY42_KUwsgZavcaukMY_Rh0Xk1gmSww0TPrwLf83bSoB9m1VoJvq51VxpdLiM34WY0nHMWwrfw3ULuU2V9xodGH4S2ClMNsnUhXr5UleuBfBzLGY'
              }
            ].map((p, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border-2 shrink-0" style={{ borderColor: 'rgba(19,127,236,0.2)' }}>
                  <img alt={p.name} className="w-full h-full object-cover" src={p.img} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">{p.name}</h4>
                  <p className="text-primary text-xs font-semibold uppercase mb-2">Masseur-Kinésithérapeute</p>
                  <a className="inline-flex items-center gap-1 text-slate-600 text-sm" href={`tel:${p.tel}`}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>call</span>
                    {p.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section className="mt-12 py-10 px-4" id="blog" style={{ background: '#f1f5f9' }}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-extrabold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">article</span>
              Conseils &amp; Santé
            </h3>
            <a className="text-primary text-sm font-bold" href="#">Voir tout</a>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 block transition-transform hover:scale-[1.02]"
                  style={{ minWidth: 280 }}
                >
                  <img
                    alt={post.title}
                    className="w-full object-cover"
                    style={{ height: 160 }}
                    src={(post.cover_url || post.coverUrl) || 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80'}
                  />
                  <div className="p-4">
                    <h5 className="font-bold text-slate-900 mb-2 leading-tight">{post.title}</h5>
                    <p className="text-slate-500 text-sm" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.excerpt || (post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : '')}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-slate-400 text-sm py-8 text-center w-full italic">Plus d'articles arrivent bientôt...</p>
            )}
          </div>
        </section>

        {/* Contact Form */}
        <section className="px-4 mt-12" id="contact">
          <div className="rounded-2xl p-6 border" style={{ background: 'rgba(19,127,236,0.05)', borderColor: 'rgba(19,127,236,0.1)' }}>
            <h3 className="text-2xl font-black mb-2 text-slate-900">Contactez-nous</h3>
            <p className="text-slate-600 text-sm mb-6">Un motif particulier ? Remplissez ce formulaire et nous vous rappellerons.</p>

            {formStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center">
                <p className="font-bold text-green-800 text-lg mb-2">✅ Inscription confirmée !</p>
                <p className="text-green-700 text-sm mb-4">Nous vous contacterons dans les plus brefs délais.</p>
                <button onClick={() => setFormStatus('idle')} className="text-sm font-bold text-primary">Nouvelle inscription</button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase px-1">Nom</label>
                    <input className="w-full bg-white border border-slate-200 rounded-lg py-3 px-3 text-sm" placeholder="Dupont" type="text" required value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase px-1">Prénom</label>
                    <input className="w-full bg-white border border-slate-200 rounded-lg py-3 px-3 text-sm" placeholder="Jean" type="text" required value={formData.prenom} onChange={e => setFormData({ ...formData, prenom: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase px-1">Téléphone</label>
                  <input className="w-full bg-white border border-slate-200 rounded-lg py-3 px-3 text-sm" placeholder="06 00 00 00 00" type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase px-1">Motif de consultation</label>
                  <textarea className="w-full bg-white border border-slate-200 rounded-lg py-3 px-3 text-sm" placeholder="Description rapide..." rows={3} required value={formData.motif} onChange={e => setFormData({ ...formData, motif: e.target.value })}></textarea>
                </div>
                <button className="w-full text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 mt-4" style={{ background: '#137fec', boxShadow: '0 4px 14px rgba(19,127,236,0.3)' }} type="submit" disabled={formStatus === 'loading'}>
                  {formStatus === 'loading' ? 'Envoi...' : 'Envoyer ma demande'}
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>send</span>
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 px-4 pb-12 border-t border-slate-200 pt-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <div>
                <p className="font-bold text-slate-900">Adresse</p>
                <p className="text-slate-500 text-sm leading-snug">2 Montée du Village d'Enfants,<br />42220 Saint-Sauveur-en-Rue</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200" style={{ height: 192 }}>
              <iframe
                title="Plan d'accès - Cabinet Kiné Saint-Sauveur-en-Rue"
                src="https://www.openstreetmap.org/export/embed.html?bbox=4.3889%2C45.3470%2C4.3989%2C45.3530&layer=mapnik&marker=45.3500%2C4.3939"
                width="100%"
                height="192"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><p className="font-bold text-slate-900 text-sm mb-1">Leslie Forel</p><p className="text-primary text-sm font-medium">06 18 75 49 15</p></div>
              <div><p className="font-bold text-slate-900 text-sm mb-1">Ruben ASENSI</p><p className="text-primary text-sm font-medium">07 52 33 66 81</p></div>
            </div>

            <p className="text-center text-slate-400 mt-4 uppercase tracking-widest font-bold" style={{ fontSize: 10 }}>
              © 2026 Cabinet de Kinésithérapie Saint-Sauveur
            </p>
          </div>
        </footer>
      </main>

      {/* Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center px-4 py-3 z-50 border-t border-slate-200" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)' }}>
        <a className="flex flex-col items-center gap-1 text-primary" href="#">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span style={{ fontSize: 10 }} className="font-bold">Accueil</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-400" href="#praticiens">
          <span className="material-symbols-outlined">groups</span>
          <span style={{ fontSize: 10 }} className="font-medium">Praticiens</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-400" href="#attente">
          <span className="material-symbols-outlined">timer</span>
          <span style={{ fontSize: 10 }} className="font-medium">Attente</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-400" href="#blog">
          <span className="material-symbols-outlined">menu_book</span>
          <span style={{ fontSize: 10 }} className="font-medium">Blog</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-400" href="#contact">
          <span className="material-symbols-outlined">alternate_email</span>
          <span style={{ fontSize: 10 }} className="font-medium">Contact</span>
        </a>
      </div>
    </div>
  );
}
