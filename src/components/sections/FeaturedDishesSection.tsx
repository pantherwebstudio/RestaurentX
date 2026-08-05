'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Wine, ArrowRight } from 'lucide-react';
import { FEATURED_DISHES, MenuItem } from '@/data/restaurantData';

interface FeaturedDishesSectionProps {
  onSelectDish: (dish: MenuItem) => void;
  onViewAllMenu: () => void;
}

export default function FeaturedDishesSection({ onSelectDish, onViewAllMenu }: FeaturedDishesSectionProps) {
  return (
    <section id="featured-dishes" className="relative py-14 md:py-20 overflow-hidden bg-theme-primary text-theme-primary border-t border-[#C6A15B]/15 transition-colors duration-300">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 md:w-96 h-80 md:h-96 bg-[#C6A15B]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold opacity-60" />
              <span className="font-serif-luxury text-xs tracking-[0.3em] uppercase text-gold font-bold">
                Culinary Highlights
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-light text-theme-primary">
              Signature <span className="italic font-normal text-gold-gradient">Creations</span>
            </h2>
          </div>

          <button
            onClick={onViewAllMenu}
            className="self-start md:self-end flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold hover:text-[#E5C383] transition-colors font-bold group interactive"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {FEATURED_DISHES.map((dish, idx) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => onSelectDish(dish)}
              className="group glass-card rounded-2xl overflow-hidden cursor-pointer border border-[#C6A15B]/20 hover:border-[#C6A15B]/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between interactive shadow-lg max-w-full"
            >
              {/* Image Container */}
              <div className="relative h-52 sm:h-56 md:h-60 w-full overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-transparent" />

                {/* Badge */}
                {dish.isChefChoice && (
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold text-black font-bold text-[9px] sm:text-[10px] uppercase tracking-wider shadow-md">
                    <Sparkles className="w-3 h-3" /> Chef Choice
                  </div>
                )}

                {/* Price tag */}
                <div className="absolute bottom-3 right-3 glass-card px-3 py-1 rounded-full border border-[#C6A15B]/50 font-mono text-xs sm:text-sm text-gold font-bold">
                  ₹{dish.price.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Dish Content */}
              <div className="p-4 sm:p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  {dish.frenchName && (
                    <p className="font-serif-luxury text-xs text-gold italic font-semibold truncate">
                      {dish.frenchName}
                    </p>
                  )}
                  <h3 className="font-serif-luxury text-base sm:text-lg font-light text-theme-primary group-hover:text-gold transition-colors line-clamp-2">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-theme-muted line-clamp-3 leading-relaxed font-sans-clean">
                    {dish.description}
                  </p>
                </div>

                {dish.winePairing && (
                  <div className="pt-2 border-t border-[#C6A15B]/15 flex items-center gap-1.5 text-[10px] text-gold font-semibold">
                    <Wine className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate italic">{dish.winePairing}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
