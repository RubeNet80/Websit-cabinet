'use client';


import Link from 'next/link';

const Header = () => {
    return (
        <header style={{ background: '#fff', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#137fec', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" />
                        </svg>
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 15, color: '#111827', letterSpacing: '-0.02em' }}>Cabinet Kiné</span>
                </div>

                {/* Nav */}
                <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
                    {['#praticiens', '#attente', '#blog', '#contact'].map((href, i) => (
                        <a key={i} href={href} style={{ color: '#6b7280', fontWeight: 500, fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#137fec')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>
                            {['Praticiens', "File d'attente", 'Blog', 'Contact'][i]}
                        </a>
                    ))}
                </nav>

                {/* CTA */}
                <Link href="/dashboard" style={{
                    background: '#137fec', color: '#fff', borderRadius: 999, padding: '9px 22px',
                    fontWeight: 700, fontSize: 13.5, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
                    boxShadow: '0 2px 12px rgba(19,127,236,0.28)'
                }}>
                    Tableau de bord
                </Link>
            </div>
        </header>
    );
};

export default Header;
