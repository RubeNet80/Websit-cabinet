import React from 'react';

const Footer = () => {
    return (
        <footer style={{ background: '#0f172a', color: '#fff', padding: '64px 24px 32px' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, marginBottom: 48 }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#137fec', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" /></svg>
                            </div>
                            <span style={{ fontWeight: 800, fontSize: 15 }}>Cabinet Kiné</span>
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
                            Cabinet de kinésithérapie générale à Saint-Sauveur-en-Rue. Soins personnalisés et proximité.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 style={{ fontWeight: 700, fontSize: 14, color: '#e2e8f0', marginBottom: 18, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Contact</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <li style={{ color: '#94a3b8', fontSize: 14 }}>📍 2 Montée du Village d'Enfants</li>
                            <li style={{ color: '#94a3b8', fontSize: 14 }}>42220 Saint-Sauveur-en-Rue</li>
                            <li><a href="tel:0618754915" style={{ color: '#94a3b8', fontSize: 14, textDecoration: 'none' }}>📞 Leslie: 06 18 75 49 15</a></li>
                            <li><a href="tel:0752336681" style={{ color: '#94a3b8', fontSize: 14, textDecoration: 'none' }}>📞 Ruben: 07 52 33 66 81</a></li>
                        </ul>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 style={{ fontWeight: 700, fontSize: 14, color: '#e2e8f0', marginBottom: 18, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Navigation</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {['Accueil', 'Praticiens', "File d'attente", 'Blog Santé'].map((text, i) => (
                                <li key={i}><a href="#" style={{ color: '#94a3b8', fontSize: 14, textDecoration: 'none' }}>{text}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{ borderTop: '1px solid #1e293b', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <p style={{ color: '#475569', fontSize: 13 }}>© 2026 Cabinet de Kinésithérapie Saint-Sauveur-en-Rue</p>
                    <div style={{ display: 'flex', gap: 20 }}>
                        {['Mentions Légales', 'Confidentialité RGPD'].map(t => (
                            <a key={t} href="#" style={{ color: '#475569', fontSize: 13, textDecoration: 'none' }}>{t}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
