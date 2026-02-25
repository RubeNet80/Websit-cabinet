import React from 'react';

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
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnkNgX8ZK1tipIKdkrHFvANRki670UZcLDJGHZpYcnQChAND8QE0usEX-kl9Suy7kU5W7Ef8VUXt78f6BFm8WG9PsAZQjF_yAtC0dT0lf9fPQOiJkWLjnpgTVRJhiaHUv6li3A0BFZwb6rOdPkzOw9Pdfdz56ViQH0ctT0kQlhhGA191_dIkKEzgEAd2fzLAUDkPvir5eVAaOxnyfnU3kQM4RZGpI21sYcVyAtZQlNdKfPXuFKRhH3Ea8uMXtWIJcQmv1JuSUH5is'
                        },
                        {
                            name: 'Ruben ASENSI CATALÀ', phone: '07 52 33 66 81', tel: '0752336681',
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWGVDWK0FCt4F41ACz1PbEr28i5WcayMHNWuEEOKNCXwEW3GyTb82DOeJ7yUqmApbwZK7blUbYBlAwlUu3qlL7ssAPPhW-qNiF3I8o-xSL_26bAQlLaw49fNPYZAw6hEfHkHgTHtWJlMMsu9c0gfaIAZALbjINY42_KUwsgZavcaukMY_Rh0Xk1gmSww0TPrwLf83bSoB9m1VoJvq51VxpdLiM34WY0nHMWwrfw3ULuU2V9xodGH4S2ClMNsnUhXr5UleuBfBzLGY'
                        }
                    ].map((p, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border-2 shrink-0" style={{ borderColor: 'rgba(19,127,236,0.2)' }}>
                                <img alt={p.name} className="w-full h-full object-cover" src={p.img} />
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
