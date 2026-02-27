import React from 'react';
import Image from 'next/image';

const Practitioners = () => {
    return (
        <section className="px-4 mt-12" id="praticiens">
            <div className="max-w-2xl mx-auto">
                <h3 className="text-xl font-extrabold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">groups</span>
                    Nos Praticiens
                </h3>
                <div className="grid gap-4">
                    {[
                        {
                            name: 'Leslie Forel', phone: '06 18 75 49 15', tel: '0618754915',
                            img: '/images/leslie.jpg'
                        },
                        {
                            name: 'Ruben ASENSI CATALÀ', phone: '07 52 33 66 81', tel: '0752336681',
                            img: '/images/ruben.jpg'
                        }
                    ].map((p, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border-2 shrink-0 relative" style={{ borderColor: 'rgba(19,127,236,0.2)' }}>
                                <Image
                                    alt={p.name}
                                    src={p.img}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-900">{p.name}</h4>
                                <p className="text-primary text-xs font-semibold uppercase mb-2">Masseur-Kinésithérapeute</p>
                                <a className="inline-flex items-center gap-1 text-slate-600 text-sm" href={`tel:${p.tel}`}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>call</span>
                                    {p.phone}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Practitioners;
