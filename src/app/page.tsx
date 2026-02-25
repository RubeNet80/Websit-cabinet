'use client';

import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WaitingCounter from '@/components/WaitingCounter';
import Practitioners from '@/components/Practitioners';
import BlogPreview from '@/components/BlogPreview';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="bg-background-light text-slate-900 antialiased">
      <Header />

      <main className="pb-24">
        <Hero />
        <WaitingCounter />
        <Practitioners />
        <BlogPreview />
        <ContactForm />
      </main>

      <Footer />

      {/* Mobile Quick Nav - Keep simple here or extract to MobileNav if grows */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center px-4 py-3 z-50 border-t border-slate-200" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)' }}>
        <a className="flex flex-col items-center gap-1 text-primary" href="#">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span style={{ fontSize: 10 }} className="font-bold">Accueil</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-400" href="#praticiens">
          <span className="material-symbols-outlined">groups</span>
          <span style={{ fontSize: 10 }} className="font-medium">Praticiens</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-400" href="#attente">
          <span className="material-symbols-outlined">timer</span>
          <span style={{ fontSize: 10 }} className="font-medium">Attente</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-400" href="#blog">
          <span className="material-symbols-outlined">menu_book</span>
          <span style={{ fontSize: 10 }} className="font-medium">Blog</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-400" href="#contact">
          <span className="material-symbols-outlined">alternate_email</span>
          <span style={{ fontSize: 10 }} className="font-medium">Contact</span>
        </a>
      </div>
    </div>
  );
}
