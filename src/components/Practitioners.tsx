import React from 'react';
import Image from 'next/image';

const Practitioners = () => {
    return (
        <section className="px-4 mt-20" id="praticiens">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">L&apos;Équipe</span>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800">
                        Vos praticiens certifiés
                    </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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
                        <div key={i} className="bg-white p-6 rounded-[2rem] premium-shadow flex flex-row items-center gap-6 border border-slate-50 transition-transform hover:-translate-y-1 hover:shadow-2xl">
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-slate-100 shrink-0 relative shadow-inner">
                                <Image
                                    alt={p.name}
                                    src={p.img}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-[#0a66c2] text-xs font-bold uppercase tracking-wider mb-1">Masseur-Kinésithérapeute</p>
                                <h4 className="text-xl font-extrabold text-slate-900 mb-2">{p.name}</h4>
                                <a className="inline-flex items-center gap-2 text-slate-600 font-medium hover:text-primary transition-colors bg-slate-50 py-1.5 px-3 rounded-xl text-sm w-max" href={`tel:${p.tel}`}>
                                    <span className="material-symbols-outlined text-[18px]">call</span>
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
