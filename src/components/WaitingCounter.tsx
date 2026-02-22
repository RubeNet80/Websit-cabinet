'use client';

import React, { useEffect, useState } from 'react';

const WaitingCounter = () => {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        fetch('/api/waiting-list').then(r => r.json()).then(d => setCount(d.count)).catch(() => { });
    }, []);

    return (
        <section id="attente" style={{ padding: '80px 24px', background: '#f6f8fb' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
                <div style={{ background: '#fff', borderRadius: 24, padding: '52px 40px', textAlign: 'center', border: '1.5px solid #e9f0fb', boxShadow: '0 4px 32px rgba(19,127,236,0.08)' }}>
                    {/* Badge */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#e8f4fd', color: '#137fec', borderRadius: 999, padding: '5px 16px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 28 }}>
                        <span style={{ width: 7, height: 7, background: '#22c55e', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 0 2px #dcfce7' }}></span>
                        Mise à jour en temps réel
                    </div>

                    <h2 style={{ fontSize: 30, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 32 }}>
                        File d'attente actuelle
                    </h2>

                    {/* Counter card */}
                    <div style={{
                        display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
                        background: '#137fec', borderRadius: 20, padding: '28px 56px', marginBottom: 28,
                        boxShadow: '0 8px 32px rgba(19,127,236,0.32)'
                    }}>
                        <span style={{ fontSize: 72, fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>
                            {count === null ? '–' : count}
                        </span>
                        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginTop: 8, letterSpacing: '0.02em' }}>
                            personnes en attente
                        </span>
                    </div>

                    <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
                        "Consultez en temps réel l'état de notre liste d'attente. Transparence totale pour une meilleure organisation de vos soins."
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WaitingCounter;
