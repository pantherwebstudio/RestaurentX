'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/data/restaurantData';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="relative py-14 md:py-20 overflow-hidden bg-theme-primary text-theme-primary border-t border-[#C6A15B]/15 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C6A15B]" />
            <span className="font-serif-luxury text-xs tracking-[0.3em] uppercase text-[#C6A15B] font-semibold">
              Critical Acclaim
            </span>
            <span className="h-px w-8 bg-[#C6A15B]" />
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-light text-theme-primary">
            Voices of <span className="italic font-normal text-gold-gradient">Connoisseurs</span>
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="relative glass-card rounded-3xl p-6 sm:p-10 md:p-12 border border-[#C6A15B]/30 shadow-2xl space-y-6 sm:space-y-8 text-center">
          <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-[#C6A15B]/30 mx-auto" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 sm:space-y-6 max-w-3xl mx-auto"
            >
              {/* Star rating */}
              <div className="flex justify-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C6A15B] text-[#C6A15B]" />
                ))}
              </div>

              <p className="font-serif-luxury text-lg sm:text-2xl md:text-3xl font-light italic leading-relaxed text-theme-primary">
                “{current.content}”
              </p>

              <div className="flex items-center justify-center gap-3 sm:gap-4 pt-4 border-t border-[#C6A15B]/15">
                <div className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-full overflow-hidden border border-[#C6A15B]/40">
                  <Image
                    src={current.avatar}
                    alt={current.author}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="text-left space-y-0.5">
                  <h4 className="font-serif-luxury text-sm sm:text-base font-semibold text-theme-primary">
                    {current.author}
                  </h4>
                  <p className="text-xs text-[#C6A15B] font-medium">
                    {current.role} • <span className="opacity-75">{current.source}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={prevTestimonial}
              className="p-2.5 sm:p-3 rounded-full border border-[#C6A15B]/30 glass-card text-[#C6A15B] hover:border-[#C6A15B] transition-colors interactive"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-6 bg-[#C6A15B]' : 'w-2 bg-[#C6A15B]/30'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2.5 sm:p-3 rounded-full border border-[#C6A15B]/30 glass-card text-[#C6A15B] hover:border-[#C6A15B] transition-colors interactive"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
