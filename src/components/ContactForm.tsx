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
        <section className="px-4 mt-12 mb-12" id="contact">
            <div className="rounded-2xl p-6 border max-w-2xl mx-auto" style={{ background: 'rgba(19,127,236,0.05)', borderColor: 'rgba(19,127,236,0.1)' }}>
                <h3 className="text-2xl font-black mb-2 text-slate-900">Contactez-nous</h3>
                <p className="text-slate-600 text-sm mb-6">Un motif particulier ? Remplissez ce formulaire et nous vous rappellerons.</p>

                {status === 'success' ? (
                    <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center">
                        <p className="font-bold text-green-800 text-lg mb-2">✅ Inscription confirmée !</p>
                        <p className="text-green-700 text-sm mb-4">Nous vous contacterons dans les plus brefs délais.</p>
                        <button onClick={() => setStatus('idle')} className="text-sm font-bold text-primary">Nouvelle inscription</button>
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
                        <button className="w-full text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 mt-4" style={{ background: '#137fec', boxShadow: '0 4px 14px rgba(19,127,236,0.3)' }} type="submit" disabled={status === 'loading'}>
                            {status === 'loading' ? 'Envoi...' : 'Envoyer ma demande'}
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>send</span>
                        </button>
                        {status === 'error' && <p className="text-red-500 text-center mt-2 text-sm italic">Oups, une erreur est survenue.</p>}
                    </form>
                )}
            </div>
        </section>
    );
};

export default ContactForm;
