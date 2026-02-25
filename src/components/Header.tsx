'use client';

import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200" style={{ backdropFilter: 'blur(12px)' }}>
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <span className="material-symbols-outlined text-primary">medical_services</span>
                    </div>
                    <span className="font-extrabold text-lg tracking-tight text-slate-900">Cabinet Kiné</span>
                </div>
                <Link href="/dashboard" className="p-2 text-slate-600">
                    <span className="material-symbols-outlined">manage_accounts</span>
                </Link>
            </div>
            {/* Horizontal Quick Nav */}
            <nav className="flex gap-6 overflow-x-auto px-4 pb-3 hide-scrollbar text-sm font-medium border-t border-slate-100 pt-2">
                <a className="text-primary whitespace-nowrap font-bold" href="#">Accueil</a>
                <a className="text-slate-500 whitespace-nowrap" href="#praticiens">Praticiens</a>
                <a className="text-slate-500 whitespace-nowrap" href="#attente">File d'attente</a>
                <a className="text-slate-500 whitespace-nowrap" href="#blog">Blog</a>
                <a className="text-slate-500 whitespace-nowrap" href="#contact">Contact</a>
            </nav>
        </header>
    );
};

export default Header;
