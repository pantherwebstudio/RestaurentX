'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESTAURANT_INFO } from '@/data/restaurantData';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress gradually
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 12) + 4;
        return next > 100 ? 100 : next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-between bg-theme-primary px-6 py-12 text-theme-primary transition-colors duration-300"
        >
          {/* Top tagline */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C6A15B]/40" />
            <span className="font-serif-luxury text-xs tracking-[0.3em] uppercase text-[#C6A15B] font-semibold">
              Haute Gastronomy • {RESTAURANT_INFO.city}
            </span>
            <span className="h-px w-8 bg-[#C6A15B]/40" />
          </div>

          {/* Central Title */}
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif-luxury text-5xl md:text-7xl font-light tracking-widest text-theme-primary"
            >
              RESTAURANT<span className="text-[#C6A15B] italic font-normal">X</span>
            </motion.h1>
            <p className="mt-3 text-xs tracking-[0.4em] uppercase text-theme-muted font-semibold">
              Three Michelin Stars • Est. 2014
            </p>
          </div>

          {/* Bottom Progress Bar & Percentage */}
          <div className="w-full max-w-md">
            <div className="flex justify-between items-center mb-2 text-xs font-mono text-[#C6A15B] font-semibold">
              <span>CURATING SENSORY EXPERIENCE</span>
              <span>{progress}%</span>
            </div>
            <div className="h-[2px] w-full bg-[#C6A15B]/20 overflow-hidden relative rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-[#9A7734] via-[#C6A15B] to-[#E5C383]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
