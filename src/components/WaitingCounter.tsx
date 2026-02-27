'use client';

import React, { useEffect, useState } from 'react';

const WaitingCounter = () => {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        fetch('/api/waiting-list').then(r => r.json()).then(d => setCount(d.count)).catch(() => { });
    }, []);

    return (
        <section className="px-4 relative z-10" id="attente" style={{ marginTop: -80 }}>
            <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] premium-shadow p-8 md:p-10 border border-white max-w-lg mx-auto md:max-w-3xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="font-bold uppercase tracking-widest text-[#0a66c2] text-xs">File d&apos;attente en Temps Réel</span>
                        </div>
                        <h3 className="text-slate-800 text-xl md:text-2xl font-extrabold mb-1">
                            Personnes en attente
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-sm mt-2">
                            Nous nous engageons sur la transparence de nos délais. Notre file d&apos;attente est dynamique pour optimiser votre prise en charge.
                        </p>
                    </div>

                    <div className="md:border-l md:border-slate-100 md:pl-10 flex flex-col items-start md:items-end justify-center shrink-0">
                        <div className="flex items-baseline gap-2">
                            <span className="font-black text-slate-900 tracking-tighter" style={{ fontSize: '4.5rem', lineHeight: 1 }}>{count === null ? '...' : count}</span>
                            <span className="material-symbols-outlined text-slate-300">groups</span>
                        </div>
                        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-2 bg-slate-100 py-1 px-3 rounded-full">Mis à jour à l&apos;instant</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WaitingCounter;
