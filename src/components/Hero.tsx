import React from 'react';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="relative overflow-hidden" style={{ height: 420 }}>
            <Image
                alt="Cabinet de Kinésithérapie"
                className="object-cover"
                src="/images/hero.jpg"
                fill
                priority
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 pb-12" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.4) 50%, transparent 100%)' }}>
                <h2 className="text-white text-3xl font-extrabold leading-tight mb-3">
                    Cabinet de Kinésithérapie Saint-Sauveur-en-Rue
                </h2>
                <p className="text-slate-200 text-lg mb-6 leading-snug" style={{ maxWidth: 320 }}>
                    Soins de kinésithérapie générale.
                </p>
                <div className="flex gap-3">
                    <a
                        className="font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 text-white"
                        style={{ background: '#137fec' }}
                        href="#contact"
                    >
                        Prendre RDV
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>calendar_month</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
