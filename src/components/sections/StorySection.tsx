'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote, Award } from 'lucide-react';
import { STORY_TIMELINE, RESTAURANT_INFO } from '@/data/restaurantData';

export default function StorySection() {
  return (
    <section id="story" className="relative py-14 md:py-20 overflow-hidden bg-theme-primary text-theme-primary border-t border-[#C6A15B]/15 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative h-[380px] sm:h-[480px] md:h-[580px] w-full rounded-2xl overflow-hidden glass-card border border-[#C6A15B]/30 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85"
                alt="RestaurantX Dining Room"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Floating Badge Overlay */}
            <div className="absolute -bottom-6 right-4 sm:right-6 glass-card border border-[#C6A15B]/40 p-4 sm:p-5 rounded-2xl max-w-[280px] sm:max-w-xs shadow-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-[#C6A15B]">
                <Award className="w-4 h-4" />
                <span className="font-serif-luxury text-xs sm:text-sm font-semibold">11 Years of Perfection</span>
              </div>
              <p className="text-[11px] leading-relaxed font-sans-clean text-theme-muted">
                Curating rare vintages and hyper-seasonal organic ingredients sourced directly from artisanal European estates.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Editorial Text & Quote */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6 sm:space-y-8 pt-6 lg:pt-0"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold opacity-60" />
                <span className="font-serif-luxury text-xs tracking-[0.3em] uppercase text-gold font-bold">
                  Our Philosophy
                </span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-light leading-tight text-theme-primary">
                Where Culinary Art <br />
                Becomes <span className="italic font-normal text-gold-gradient">Immortality</span>
              </h2>
            </div>

            <p className="text-xs md:text-sm leading-relaxed font-sans-clean text-theme-muted">
              Founded in {RESTAURANT_INFO.city}, {RESTAURANT_INFO.name} was conceived not merely as a dining establishment, but as a sanctuary dedicated to pure sensory gastronomy. Every menu is structured like a musical composition—balancing texture, acidity, and umami with architectural precision.
            </p>

            {/* Chef Quote */}
            <div className="p-5 sm:p-6 rounded-2xl glass-card border-l-4 border-[#C6A15B] relative space-y-2.5">
              <Quote className="w-6 h-6 text-[#C6A15B]/30 absolute top-4 right-4" />
              <p className="font-serif-luxury text-sm sm:text-base italic leading-relaxed text-theme-primary">
                “True luxury in dining is not luxury ingredients alone; it is the total suspension of time, where each bite tells a centuries-old story rewritten for today.”
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-serif-luxury text-[#C6A15B] tracking-wider font-semibold">
                  — {RESTAURANT_INFO.chefName}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted font-semibold">
                  Executive Chef & Founder
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-mono font-semibold">
                Historical Milestones
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {STORY_TIMELINE.map((item) => (
                  <div key={item.year} className="p-3.5 rounded-xl border border-[#C6A15B]/20 glass-card hover:border-[#C6A15B]/50 transition-colors">
                    <span className="font-mono text-base sm:text-lg text-[#C6A15B] font-bold">{item.year}</span>
                    <h4 className="font-serif-luxury text-xs sm:text-sm font-semibold mt-0.5 text-theme-primary">{item.title}</h4>
                    <p className="text-[11px] text-theme-muted mt-1 line-clamp-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
