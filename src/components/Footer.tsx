import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="mt-16 px-4 bg-white border-t border-slate-100 pt-16 pb-24 md:pb-16 relative z-10">
            <div className="flex flex-col gap-10 max-w-4xl mx-auto md:flex-row md:justify-between">

                <div className="flex-1 space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-3 rounded-full text-primary shrink-0">
                            <span className="material-symbols-outlined text-[24px]">location_on</span>
                        </div>
                        <div>
                            <p className="font-extrabold text-slate-900 text-lg mb-1">Cabinet Saint-Sauveur</p>
                            <p className="text-slate-500 text-base leading-relaxed">2 Montée du Village d&apos;Enfants,<br />42220 Saint-Sauveur-en-Rue</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <div>
                            <p className="font-extrabold text-slate-800 text-sm mb-1">Leslie Forel</p>
                            <a href="tel:0618754915" className="text-primary hover:text-blue-800 transition-colors text-sm font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">call</span> 06 18 75 49 15
                            </a>
                        </div>
                        <div>
                            <p className="font-extrabold text-slate-800 text-sm mb-1">Ruben ASENSI</p>
                            <a href="tel:0752336681" className="text-primary hover:text-blue-800 transition-colors text-sm font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">call</span> 07 52 33 66 81
                            </a>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm md:w-[400px] shrink-0" style={{ height: 240 }}>
                    <iframe
                        title="Plan d'accès - Cabinet Kiné Saint-Sauveur-en-Rue"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=4.3889%2C45.3470%2C4.3989%2C45.3530&layer=mapnik&marker=45.3500%2C4.3939"
                        width="100%"
                        height="240"
                        style={{ border: 0, display: 'block' }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-slate-100 flex items-center justify-between flex-col md:flex-row space-y-4">
                <p className="text-center text-slate-400 text-xs font-semibold">
                    © 2026 Cabinet de Kinésithérapie Saint-Sauveur. Tous droits réservés.
                </p>
                <Link href="/login" className="text-xs font-bold text-slate-300 hover:text-slate-500 transition-colors uppercase tracking-widest">
                    Accès Praticien
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
