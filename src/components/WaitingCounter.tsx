'use client';

import React, { useEffect, useState } from 'react';

const WaitingCounter = () => {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        fetch('/api/waiting-list').then(r => r.json()).then(d => setCount(d.count)).catch(() => { });
    }, []);

    return (
        <section className="px-4 relative z-10" id="attente" style={{ marginTop: -32 }}>
            <div className="bg-white rounded-xl shadow-xl p-6 border border-slate-100 max-w-lg mx-auto md:max-w-xl lg:max-w-2xl">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-primary">
                        <span className="material-symbols-outlined">group</span>
                        <span className="font-bold uppercase tracking-wider text-xs">Temps réel</span>
                    </div>
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                </div>
                <h3 className="text-slate-500 text-sm font-medium mb-1">Nombre de personnes actuellement en attente :</h3>
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-black text-slate-900" style={{ fontSize: 48 }}>{count === null ? '...' : count}</span>
                    <span className="text-slate-400 text-sm italic">Mise à jour à l'instant</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg flex items-start gap-3 border border-slate-100">
                    <span className="material-symbols-outlined text-slate-400" style={{ fontSize: 20 }}>info</span>
                    <p className="text-slate-600 text-xs leading-relaxed">
                        Nous nous engageons sur la transparence de nos délais. Notre file d'attente est dynamique pour optimiser votre prise en charge.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WaitingCounter;
