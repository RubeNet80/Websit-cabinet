import React from 'react';

const Hero = () => {
    return (
        <section className="relative overflow-hidden" style={{ height: 420 }}>
            <img
                alt="Cabinet de Kinésithérapie"
                className="absolute inset-0 h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJGrx3p7cFyVXQMP8fIp-6I3dBdbCtaVHUCyj7fi4K2KkjKzWbGX-BaCenoTW8_GYlEXm2x7W3f6yjckXzLzv6z1Q9GEmu1rBjv07R2K0zTz5Vw1uBRJijd18hz8h7IxQe7FwIVmfMMJDzZaBbkyq0HJLP-t3e7CfF7e4_q8MEd_Csrse5JdjGMVfUIHjqEwfYU-iz_3j_U1bKe8hggad4Gbf1UV0W3JaU90Y0oZRNYyx_DFguiziNbRjmhsALUdhPk9h_ARdt61o"
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
