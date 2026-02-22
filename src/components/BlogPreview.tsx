import React from 'react';

const posts = [
    { title: 'Prévenir le mal de dos au bureau', excerpt: 'Conseils simples pour améliorer votre posture quotidienne et éviter les douleurs lombaires.', tag: 'Posture', emoji: '🦴' },
    { title: 'Rééducation après une entorse', excerpt: 'Les étapes clés pour reprendre le sport en toute sécurité après une blessure à la cheville.', tag: 'Sport', emoji: '🦶' },
    { title: 'La kinésithérapie respiratoire', excerpt: 'Comment la kiné peut aider les enfants et adultes à mieux respirer tout au long de l\'année.', tag: 'Respiratoire', emoji: '🫁' },
];

const BlogPreview = () => {
    return (
        <section id="blog" style={{ padding: '80px 24px', background: '#f6f8fb' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
                    <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#e8f4fd', color: '#137fec', borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>
                            Blog IA
                        </div>
                        <h2 style={{ fontSize: 30, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 6 }}>Conseils & Santé</h2>
                        <p style={{ color: '#64748b', fontSize: 15 }}>Articles rédigés pour votre bien-être au quotidien.</p>
                    </div>
                    <a href="#" style={{ color: '#137fec', fontWeight: 700, fontSize: 14, textDecoration: 'none', borderBottom: '2px solid #137fec', paddingBottom: 2 }}>Voir tous →</a>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                    {posts.map((p, i) => (
                        <div key={i} style={{
                            background: '#fff', borderRadius: 20, border: '1.5px solid #f0f4f8',
                            padding: '28px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                            transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#e8f4fd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                                    {p.emoji}
                                </div>
                                <span style={{ background: '#f1f5f9', color: '#475569', borderRadius: 999, padding: '3px 11px', fontSize: 11.5, fontWeight: 700 }}>{p.tag}</span>
                            </div>
                            <h3 style={{ fontWeight: 800, fontSize: 16, color: '#0f172a', marginBottom: 10, lineHeight: 1.4 }}>{p.title}</h3>
                            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>{p.excerpt}</p>
                            <a href="#" style={{ color: '#137fec', fontWeight: 700, fontSize: 13.5, textDecoration: 'none' }}>Lire l'article →</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
