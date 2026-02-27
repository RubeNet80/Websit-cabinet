'use client';

import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 pointer-events-none">
            <header className="max-w-5xl mx-auto rounded-2xl ios-blur premium-shadow border border-white/40 pointer-events-auto">
                <div className="flex items-center justify-between px-5 py-3.5">
                    {/* Logo Area */}
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-blue-500 to-primary p-2 rounded-xl shadow-sm">
                            <span className="material-symbols-outlined text-white text-[20px]">medical_services</span>
                        </div>
                        <span className="font-extrabold text-[1.1rem] tracking-tight text-slate-800">
                            Cabinet Kiné
                        </span>
                    </div>

                    {/* Desktop Navigation (hidden on small screens) */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
                        <a className="text-primary transition-colors hover:text-blue-700" href="#">Accueil</a>
                        <a className="text-slate-500 hover:text-slate-800 transition-colors" href="#praticiens">Praticiens</a>
                        <a className="text-slate-500 hover:text-slate-800 transition-colors" href="#attente">Attente</a>
                        <a className="text-slate-500 hover:text-slate-800 transition-colors" href="#blog">Blog</a>
                        <a className="text-slate-500 hover:text-slate-800 transition-colors" href="#contact">Contact</a>
                    </nav>

                    {/* Action & Admin */}
                    <div className="flex items-center gap-2">
                        <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700">
                            <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
                        </Link>
                        <a href="#contact" className="hidden sm:flex bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold py-2.5 px-5 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-md">
                            Prendre RDV
                        </a>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
