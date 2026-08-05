'use client';

import Link from 'next/link';
import CustomCursor from '@/components/ui/CustomCursor';

export default function NotFound() {
  return (
    <main className="h-screen w-full bg-[#0D0D0D] text-[#F6F2ED] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <CustomCursor />
      <div className="absolute inset-0 bg-grain pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C6A15B]/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 space-y-6 max-w-lg">
        <span className="font-mono text-6xl text-[#C6A15B] font-light">404</span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-light">
          A Culinary <span className="italic font-normal text-gold-gradient">Detour</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#D1C9BE]/70 leading-relaxed font-sans-clean">
          The requested page seems to have wandered off the tasting menu. Allow us to guide you back to our dining experience.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C6A15B] text-black font-medium text-xs tracking-widest uppercase hover:bg-[#E5C383] transition-colors shadow-xl shadow-[#C6A15B]/20 interactive"
          >
            Return To Dining Experience
          </Link>
        </div>
      </div>
    </main>
  );
}
