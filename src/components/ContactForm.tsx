'use client';

import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({ nom: '', prenom: '', phone: '', motif: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch('/api/waiting-list', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName: formData.prenom, lastName: formData.nom, phone: formData.phone, motif: formData.motif })
            });
            if (res.ok) {
                setStatus('success');
                setFormData({ nom: '', prenom: '', phone: '', motif: '' });
            } else { setStatus('error'); }
        } catch { setStatus('error'); }
    };

    return (
        <section className="px-4 mt-16 mb-24" id="contact">
            <div className="bg-white rounded-[2rem] p-8 md:p-12 premium-shadow max-w-3xl mx-auto border border-slate-50 relative overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-50 blur-3xl opacity-60 pointer-events-none" />

                <div className="relative z-10 text-center mb-10">
                    <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Disponibilité</span>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">Contactez-nous</h3>
                    <p className="text-slate-500 text-base max-w-md mx-auto">Un motif particulier ? Remplissez ce formulaire et nous vous rappellerons pour vous proposer un créneau adapté.</p>
                </div>

                {status === 'success' ? (
                    <div className="bg-green-50/50 backdrop-blur-sm border border-green-100 p-8 rounded-[1.5rem] text-center animate-fade-in-up">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-3xl">check_circle</span>
                        </div>
                        <p className="font-extrabold text-green-900 text-xl mb-2">Inscription confirmée !</p>
                        <p className="text-green-700 text-base mb-6">Nous vous contacterons dans les plus brefs délais.</p>
                        <button onClick={() => setStatus('idle')} className="text-sm font-bold bg-white text-primary py-2 px-6 rounded-full shadow-sm hover:shadow-md transition-shadow border border-green-50">Nouvelle inscription</button>
                    </div>
                ) : (
                    <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide px-1">Nom</label>
                                <input className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 rounded-xl py-3.5 px-4 text-slate-800 text-sm transition-all focus:outline-none" placeholder="Dupont" type="text" required value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide px-1">Prénom</label>
                                <input className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 rounded-xl py-3.5 px-4 text-slate-800 text-sm transition-all focus:outline-none" placeholder="Jean" type="text" required value={formData.prenom} onChange={e => setFormData({ ...formData, prenom: e.target.value })} />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide px-1">Téléphone</label>
                            <input className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 rounded-xl py-3.5 px-4 text-slate-800 text-sm transition-all focus:outline-none" placeholder="06 00 00 00 00" type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide px-1">Motif de consultation</label>
                            <textarea className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 rounded-xl py-3.5 px-4 text-slate-800 text-sm transition-all focus:outline-none resize-none" placeholder="Description de vos symptômes ou ordonnance..." rows={4} required value={formData.motif} onChange={e => setFormData({ ...formData, motif: e.target.value })}></textarea>
                        </div>
                        <button className="w-full bg-gradient-to-r from-blue-600 to-[#0a66c2] hover:from-blue-700 hover:to-blue-800 text-white font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-2 mt-6 transition-all hover:shadow-lg disabled:opacity-70 disabled:pointer-events-none" type="submit" disabled={status === 'loading'}>
                            {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>send</span>
                        </button>
                        {status === 'error' && <p className="text-red-500 text-center mt-3 text-sm font-medium bg-red-50 py-2 rounded-lg">Oups, une erreur est survenue. Veuillez réessayer.</p>}
                    </form>
                )}
            </div>
        </section>
    );
};

export default ContactForm;
