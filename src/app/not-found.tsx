'use client';

import Link from 'next/link';
import CustomCursor from '@/components/ui/CustomCursor';
import { Utensils } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-theme-primary text-theme-primary flex flex-col items-center justify-center p-6 text-center transition-colors duration-300">
      <CustomCursor />

      <div className="glass-card p-10 sm:p-14 rounded-3xl border border-[#C6A15B]/30 max-w-lg space-y-6 shadow-2xl">
        <div className="h-16 w-16 rounded-full bg-[#C6A15B]/10 border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] mx-auto">
          <Utensils className="w-8 h-8" />
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">
          Error 404 • Page Not Found
        </span>

        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light text-theme-primary">
          A Moment Lost In <span className="italic font-normal text-gold-gradient">Time</span>
        </h1>

        <p className="text-xs sm:text-sm text-theme-muted font-sans-clean leading-relaxed">
          The sanctuary page or dish you are searching for does not exist in our tasting carte.
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-3.5 rounded-full bg-[#C6A15B] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#E5C383] transition-colors interactive shadow-lg"
        >
          Return to Main Dining Room
        </Link>
      </div>
    </main>
  );
}
