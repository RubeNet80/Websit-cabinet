'use client';

import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', motif: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch('/api/waiting-list', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            setStatus(res.ok ? 'success' : 'error');
            if (res.ok) setFormData({ firstName: '', lastName: '', phone: '', motif: '' });
        } catch { setStatus('error'); }
    };

    const inp = (style?: React.CSSProperties): React.CSSProperties => ({
        width: '100%', padding: '13px 16px', borderRadius: 12, border: '1.5px solid #e2e8f0',
        fontSize: 15, color: '#0f172a', background: '#f8fafc', outline: 'none',
        transition: 'border-color 0.2s', fontFamily: 'inherit', ...style
    });

    const label: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 };

    return (
        <section id="contact" style={{ padding: '80px 24px', background: '#fff' }}>
            <div style={{ maxWidth: 640, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#e8f4fd', color: '#137fec', borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
                        Inscription
                    </div>
                    <h2 style={{ fontSize: 30, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 10 }}>
                        Rejoindre la liste d'attente
                    </h2>
                    <p style={{ color: '#64748b', fontSize: 15 }}>Nous vous contacterons dès qu'un créneau se libère.</p>
                </div>

                {status === 'success' ? (
                    <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: 20, padding: '40px 32px', textAlign: 'center' }}>
                        <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                        <h3 style={{ fontWeight: 800, color: '#166534', fontSize: 18, marginBottom: 8 }}>Inscription confirmée !</h3>
                        <p style={{ color: '#15803d', marginBottom: 20 }}>Nous vous contacterons dans les plus brefs délais.</p>
                        <button onClick={() => setStatus('idle')} style={{ background: '#137fec', color: '#fff', borderRadius: 999, padding: '10px 24px', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: 14 }}>
                            Inscrire une autre personne
                        </button>
                    </div>
                ) : (
                    <div style={{ background: '#fff', borderRadius: 24, border: '1.5px solid #e9f0fb', padding: '40px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                                <div>
                                    <label style={label}>Prénom</label>
                                    <input required style={inp()} value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} placeholder="Jean" />
                                </div>
                                <div>
                                    <label style={label}>Nom</label>
                                    <input required style={inp()} value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} placeholder="Dupont" />
                                </div>
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <label style={label}>Téléphone</label>
                                <input required type="tel" style={inp()} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="06 00 00 00 00" />
                            </div>
                            <div style={{ marginBottom: 28 }}>
                                <label style={label}>Motif de consultation</label>
                                <textarea required rows={3} style={inp({ resize: 'none', height: 'auto' })} value={formData.motif} onChange={e => setFormData({ ...formData, motif: e.target.value })} placeholder="Douleur lombaire, rééducation..." />
                            </div>
                            <button type="submit" disabled={status === 'loading'} style={{
                                width: '100%', background: '#137fec', color: '#fff', borderRadius: 999,
                                padding: '15px', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer',
                                boxShadow: '0 4px 16px rgba(19,127,236,0.3)', opacity: status === 'loading' ? 0.7 : 1,
                                transition: 'opacity 0.2s', fontFamily: 'inherit'
                            }}>
                                {status === 'loading' ? 'Envoi en cours...' : '→ Valider l\'inscription'}
                            </button>
                            {status === 'error' && <p style={{ color: '#dc2626', textAlign: 'center', marginTop: 12, fontSize: 13 }}>Une erreur est survenue. Veuillez réessayer.</p>}
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ContactForm;
