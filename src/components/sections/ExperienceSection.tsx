'use client';

import { motion } from 'framer-motion';
import { Wine, Sparkles, Flame, Shield, Music, Layers } from 'lucide-react';

export default function ExperienceSection() {
  const experiences = [
    {
      title: 'Sommelier Wine Vault',
      description: 'Over 3,200 rare vintage bottles stored in subterranean vaults curated by Master Sommelier Luc Moreau.',
      icon: Wine,
    },
    {
      title: 'Organic Farm Direct',
      description: 'Daily harvests from our private biodynamic estate ensuring peak heirloom flavor and zero carbon footprint transport.',
      icon: Sparkles,
    },
    {
      title: 'Master Chef Table',
      description: 'Front-row glass counter seating offering an unobstructed intimate view of Chef Antoine Laurent creating sensory masterpieces.',
      icon: Flame,
    },
    {
      title: 'Private VIP Suites',
      description: 'Exclusive private dining pavilions featuring sound isolation, personal butler service, and custom acoustic soundscapes.',
      icon: Shield,
    },
    {
      title: 'Acoustic Live Jazz',
      description: 'Subtle nightly acoustic piano and saxophone performances tailored to complement the pacing of your tasting menu.',
      icon: Music,
    },
    {
      title: 'Binchotan Charcoal Grill',
      description: 'Authentic Japanese Binchotan white oak embers searing wagyu beef and ocean fish at 1,000°C for delicate smoky richness.',
      icon: Layers,
    },
  ];

  return (
    <section className="relative py-14 md:py-20 overflow-hidden bg-theme-primary text-theme-primary border-t border-[#C6A15B]/15 transition-colors duration-300">
      {/* Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 md:w-96 h-80 md:h-96 bg-[#C6A15B]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto mb-12 sm:mb-20">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C6A15B]" />
            <span className="font-serif-luxury text-xs tracking-[0.3em] uppercase text-[#C6A15B] font-semibold">
              The RestaurantX Experience
            </span>
            <span className="h-px w-8 bg-[#C6A15B]" />
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-light text-theme-primary">
            Sensory Pillars of <span className="italic font-normal text-gold-gradient">Perfection</span>
          </h2>
          <p className="text-xs md:text-sm font-sans-clean text-theme-muted max-w-lg mx-auto">
            Beyond cuisine—an immersion into sound, architecture, rarity, and hospitality.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {experiences.map((exp, idx) => {
            const IconComponent = exp.icon;
            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="group glass-card p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/20 hover:border-[#C6A15B]/60 transition-all duration-300 hover:-translate-y-1.5 space-y-4 interactive shadow-md"
              >
                <div className="h-12 w-12 rounded-xl bg-[#C6A15B]/10 border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-black transition-colors">
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="font-serif-luxury text-lg sm:text-xl font-light text-theme-primary group-hover:text-[#C6A15B] transition-colors">
                  {exp.title}
                </h3>

                <p className="text-xs leading-relaxed font-sans-clean text-theme-muted">
                  {exp.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
