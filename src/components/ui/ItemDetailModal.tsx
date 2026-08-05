'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Sparkles, Wine, MapPin, AlertTriangle } from 'lucide-react';
import { MenuItem } from '@/data/restaurantData';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onOpenReservation: () => void;
}

export default function ItemDetailModal({
  item,
  onClose,
  onOpenReservation,
}: ItemDetailModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[var(--bg-primary)]/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl z-10 border border-[#C6A15B]/30 shadow-2xl text-theme-primary my-auto scrollbar-thin"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full glass-card text-theme-primary hover:text-gold transition-colors interactive shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image Showcase */}
            <div className="relative h-56 sm:h-64 md:h-full min-h-[260px]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {item.isChefChoice && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gold text-black font-bold text-[10px] uppercase tracking-wider shadow-md">
                    <Sparkles className="w-3 h-3" /> Chef Choice
                  </span>
                )}
                {item.isVegetarian && (
                  <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                    Vegetarian
                  </span>
                )}
                {item.isGlutenFree && (
                  <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    Gluten Free
                  </span>
                )}
              </div>
            </div>

            {/* Right Details */}
            <div className="p-5 sm:p-8 flex flex-col justify-between space-y-5 overflow-hidden">
              <div className="space-y-4">
                <div>
                  {item.frenchName && (
                    <p className="font-serif-luxury text-sm text-gold italic font-semibold mb-1">
                      {item.frenchName}
                    </p>
                  )}
                  <h3 className="font-serif-luxury text-2xl md:text-3xl font-light text-theme-primary break-words">
                    {item.name}
                  </h3>
                  <div className="mt-2 font-mono text-2xl text-gold font-bold">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <p className="text-xs text-theme-muted leading-relaxed font-sans-clean">
                  {item.description}
                </p>

                {/* Sourcing Origin */}
                {item.origin && (
                  <div className="flex items-center gap-2 text-xs text-gold font-semibold pt-2 border-t border-[#C6A15B]/15">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Source Origin: {item.origin}</span>
                  </div>
                )}

                {/* Wine Pairing */}
                {item.winePairing && (
                  <div className="p-3 rounded-xl glass-card border border-[#C6A15B]/25 text-xs space-y-1 overflow-hidden">
                    <div className="flex items-center gap-1.5 text-gold font-bold">
                      <Wine className="w-3.5 h-3.5 shrink-0" />
                      <span>Sommelier Pair:</span>
                    </div>
                    <p className="text-theme-muted text-[11px] italic truncate">{item.winePairing}</p>
                  </div>
                )}

                {/* Allergens */}
                {item.allergens && item.allergens.length > 0 && (
                  <div className="flex items-center gap-2 text-[10px] text-amber-500 font-semibold">
                    <AlertTriangle className="w-3 h-3 shrink-0" />
                    <span className="truncate">Contains: {item.allergens.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-3 sm:pt-4 border-t border-[#C6A15B]/20">
                <button
                  onClick={() => {
                    onClose();
                    onOpenReservation();
                  }}
                  className="w-full py-3.5 rounded-full bg-gold text-black font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity interactive shadow-lg"
                >
                  Reserve Table via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
