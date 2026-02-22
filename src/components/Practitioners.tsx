import React from 'react';

const practitioners = [
    { name: 'Leslie Forel', phone: '06 18 75 49 15', initials: 'LF', color: '#137fec' },
    { name: 'Ruben ASENSI CATALÀ', phone: '07 52 33 66 81', initials: 'RA', color: '#0ea5e9' },
];

const Practitioners = () => {
    return (
        <section id="praticiens" style={{ padding: '80px 24px', background: '#fff' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                {/* Section header */}
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#e8f4fd', color: '#137fec', borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
                        Équipe soignante
                    </div>
                    <h2 style={{ fontSize: 34, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 12 }}>Nos Praticiens</h2>
                    <p style={{ color: '#64748b', fontSize: 16, maxWidth: 420, margin: '0 auto' }}>Une équipe dédiée à votre rétablissement et votre bien-être.</p>
                </div>

                {/* Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 700, margin: '0 auto' }}>
                    {practitioners.map((p, i) => (
                        <div key={i} style={{
                            background: '#fff', borderRadius: 20, border: '1.5px solid #f0f4f8',
                            padding: '36px 28px', textAlign: 'center',
                            boxShadow: '0 2px 16px rgba(0,0,0,0.06)', transition: 'transform 0.2s, box-shadow 0.2s'
                        }}>
                            {/* Avatar */}
                            <div style={{
                                width: 72, height: 72, borderRadius: '50%', background: p.color,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 20px', fontWeight: 800, fontSize: 22, color: '#fff',
                                boxShadow: `0 4px 16px ${p.color}44`
                            }}>
                                {p.initials}
                            </div>
                            <h3 style={{ fontWeight: 800, fontSize: 17, color: '#0f172a', marginBottom: 4 }}>{p.name}</h3>
                            <p style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500, marginBottom: 20 }}>Masseur-Kinésithérapeute</p>
                            <a href={`tel:${p.phone.replace(/ /g, '')}`} style={{
                                display: 'inline-block', background: '#f6f9fe', color: '#137fec',
                                borderRadius: 999, padding: '9px 22px', fontWeight: 700, fontSize: 14,
                                textDecoration: 'none', border: '1px solid #dbeafe', transition: 'background 0.2s'
                            }}>
                                📞 {p.phone}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Practitioners;
