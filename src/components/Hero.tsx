import React from 'react';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="relative w-full overflow-hidden bg-slate-900" style={{ height: 'min(90vh, 800px)' }}>
            <Image
                alt="Cabinet de Kinésithérapie"
                className="object-cover opacity-80"
                src="/images/hero.jpg"
                fill
                priority
            />
            {/* Elegant vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/90" />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="max-w-3xl flex flex-col items-center animate-fade-in-up">
                    <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                        Votre santé en <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-primary-light">mouvement</span>.
                    </h1>
                    <p className="text-slate-200 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl font-medium">
                        Un accompagnement personnalisé par des masseurs-kinésithérapeutes diplômés pour retrouver votre pleine mobilité à Saint-Sauveur-en-Rue.
                    </p>

                    <div className="flex gap-4 flex-col sm:flex-row">
                        <a
                            className="bg-primary hover:bg-blue-600 text-white text-lg font-bold py-4 px-8 rounded-full transition-all hover:scale-105 active:scale-95 premium-shadow flex items-center justify-center gap-2"
                            href="#contact"
                        >
                            Prendre Rendez-vous
                            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                        </a>
                        <a
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-lg font-bold py-4 px-8 rounded-full transition-all flex items-center justify-center gap-2"
                            href="#praticiens"
                        >
                            Notre Équipe
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
