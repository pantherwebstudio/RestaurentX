'use client';

import { motion } from 'framer-motion';
import { Award, Globe, Star, Wine } from 'lucide-react';
import { AWARDS } from '@/data/restaurantData';

export default function AwardsSection() {
  const iconMap: Record<string, React.ElementType> = {
    Award,
    Globe,
    Star,
    Wine,
  };

  return (
    <section id="awards" className="relative py-20 md:py-32 overflow-hidden bg-theme-primary text-theme-primary border-t border-[#C6A15B]/15 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto mb-12 sm:mb-20">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C6A15B]" />
            <span className="font-serif-luxury text-xs tracking-[0.3em] uppercase text-[#C6A15B] font-semibold">
              Accolades & Recognition
            </span>
            <span className="h-px w-8 bg-[#C6A15B]" />
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-light text-theme-primary">
            International Culinary <span className="italic font-normal text-gold-gradient">Distinctions</span>
          </h2>
          <p className="text-xs md:text-sm font-sans-clean text-theme-muted max-w-lg mx-auto">
            Honored by the world’s most prestigious guides, critics, and culinary institutions.
          </p>
        </div>

        {/* 4 Awards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {AWARDS.map((award, idx) => {
            const IconComponent = iconMap[award.icon] || Award;
            return (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/25 hover:border-[#C6A15B]/70 text-center space-y-3 sm:space-y-4 transition-all duration-300 hover:-translate-y-1.5 group interactive shadow-md"
              >
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[#C6A15B]/10 border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] mx-auto group-hover:scale-105 group-hover:bg-[#C6A15B] group-hover:text-black transition-all">
                  <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs text-[#C6A15B] tracking-widest uppercase font-semibold">
                    {award.year}
                  </span>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-light text-theme-primary">
                    {award.title}
                  </h3>
                  <p className="text-xs text-[#C6A15B] font-semibold">
                    {award.organization}
                  </p>
                </div>

                <p className="text-xs leading-relaxed font-sans-clean text-theme-muted">
                  {award.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
