'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Star, Flame, Wine } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/restaurantData';

export default function ChefSection() {
  const stats = [
    { label: 'Michelin Stars', value: '3', icon: Star },
    { label: 'Years of Excellence', value: '18+', icon: Flame },
    { label: 'Global Culinary Awards', value: '42', icon: Award },
    { label: 'Cellar Vintage Labels', value: '3,200', icon: Wine },
  ];

  return (
    <section id="chef" className="relative py-14 md:py-20 overflow-hidden bg-theme-primary text-theme-primary border-t border-[#C6A15B]/15 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Bio & Counter Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#C6A15B]" />
                <span className="font-serif-luxury text-xs tracking-[0.3em] uppercase text-[#C6A15B] font-semibold">
                  Master Culinary Artisan
                </span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-light leading-tight text-theme-primary">
                {RESTAURANT_INFO.chefName}
              </h2>
            </div>

            <p className="text-xs md:text-sm leading-relaxed font-sans-clean text-theme-muted">
              Trained under Paris’s legendary three-star masters at L’Ambroisie and Arpège, {RESTAURANT_INFO.chefName} combines classical French technique with modern flavor science. His philosophy centers around hyper-seasonal purity, micro-textures, and emotional storytelling through gastronomy.
            </p>

            {/* Stat Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-[#C6A15B]/15">
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.3 }}
                    className="p-3.5 sm:p-4 rounded-xl glass-card border border-[#C6A15B]/25 text-center space-y-1"
                  >
                    <IconComponent className="w-5 h-5 text-[#C6A15B] mx-auto mb-1" />
                    <div className="font-mono text-2xl sm:text-3xl text-[#C6A15B] font-bold">
                      {stat.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-theme-muted font-mono font-semibold">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Chef Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[420px] sm:h-[500px] w-full rounded-2xl overflow-hidden glass-card border border-[#C6A15B]/30 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=85"
                alt={RESTAURANT_INFO.chefName}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl glass-card border border-[#C6A15B]/30 space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] font-mono font-semibold">
                  Chef & Culinary Director
                </span>
                <h4 className="font-serif-luxury text-base sm:text-lg text-theme-primary">
                  {RESTAURANT_INFO.chefName}
                </h4>
                <p className="text-[11px] text-theme-muted italic">
                  “Gastronomy is the only art form that engages all five senses simultaneously.”
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
