import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-16 px-4 pb-12 border-t border-slate-200 pt-10">
            <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <div>
                        <p className="font-bold text-slate-900">Adresse</p>
                        <p className="text-slate-500 text-sm leading-snug">2 Montée du Village d&apos;Enfants,<br />42220 Saint-Sauveur-en-Rue</p>
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
    );
};

export default Footer;
