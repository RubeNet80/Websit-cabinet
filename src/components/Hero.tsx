import React from 'react';

const Hero = () => {
    return (
        <section style={{ background: '#f6f8fb', padding: '80px 24px 72px', textAlign: 'center' }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
                {/* Pill badge */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: '#e8f4fd', color: '#137fec', borderRadius: 999,
                    padding: '5px 16px', fontSize: 12.5, fontWeight: 700,
                    letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 28
                }}>
                    <span style={{ width: 7, height: 7, background: '#137fec', borderRadius: '50%', display: 'inline-block' }}></span>
                    Saint-Sauveur-en-Rue · Liste d'attente en temps réel
                </div>

                {/* Title */}
                <h1 style={{
                    fontSize: 52, fontWeight: 900, color: '#0f172a',
                    letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 20
                }}>
                    Cabinet de<br />
                    <span style={{ color: '#137fec' }}>Kinésithérapie</span>
                </h1>

                {/* Subtitle */}
                <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 40px', fontWeight: 400 }}>
                    Soins de kinésithérapie générale pour toute la famille. Suivez notre liste d'attente en temps réel et inscrivez-vous en un clic.
                </p>

                {/* CTAs */}
                <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="#contact" style={{
                        background: '#137fec', color: '#fff', borderRadius: 999, padding: '15px 36px',
                        fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                        boxShadow: '0 4px 20px rgba(19,127,236,0.32)', transition: 'transform 0.15s'
                    }}>
                        📋 Rejoindre la liste
                    </a>
                    <a href="#attente" style={{
                        background: '#fff', color: '#0f172a', borderRadius: 999, padding: '15px 36px',
                        fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                        border: '1.5px solid #e2e8f0', transition: 'border-color 0.2s'
                    }}>
                        👁️ Voir l'attente
                    </a>
                </div>

                {/* Address pill */}
                <div style={{ marginTop: 48, display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 999, padding: '10px 22px', border: '1px solid #e9eef4', fontSize: 13.5, color: '#6b7280', fontWeight: 500, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    📍 2 Montée du Village d'Enfants, 42220 Saint-Sauveur-en-Rue
                </div>
            </div>
        </section>
    );
};

export default Hero;
