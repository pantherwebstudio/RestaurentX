'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Wine, Flame, Sparkles, AlertTriangle, ShieldCheck, MapPin } from 'lucide-react';
import { MenuItem } from '@/data/restaurantData';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onOpenReservation: () => void;
}

export default function ItemDetailModal({ item, onClose, onOpenReservation }: ItemDetailModalProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl glass-card rounded-2xl overflow-hidden z-10 border border-[#C6A15B]/30 shadow-2xl text-[#F6F2ED]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 border border-[#C6A15B]/30 text-white hover:text-[#C6A15B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image Showcase */}
            <div className="relative h-64 md:h-full min-h-[320px]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {item.isChefChoice && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#C6A15B] text-black font-semibold text-[10px] uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" /> Chef Recommendation
                  </span>
                )}
                {item.isVegetarian && (
                  <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[10px] uppercase tracking-wider">
                    Vegetarian
                  </span>
                )}
                {item.isGlutenFree && (
                  <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 text-[10px] uppercase tracking-wider">
                    Gluten Free
                  </span>
                )}
              </div>
            </div>

            {/* Right Details */}
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  {item.frenchName && (
                    <p className="font-serif-luxury text-sm text-[#C6A15B] italic mb-1">
                      {item.frenchName}
                    </p>
                  )}
                  <h3 className="font-serif-luxury text-2xl md:text-3xl font-light text-theme-primary">
                    {item.name}
                  </h3>
                  <div className="mt-2 font-mono text-2xl text-[#C6A15B] font-bold">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <p className="text-xs text-theme-muted leading-relaxed font-sans-clean">
                  {item.description}
                </p>

                {/* Sourcing Origin */}
                {item.origin && (
                  <div className="flex items-center gap-2 text-xs text-[#C6A15B]/90 pt-2 border-t border-[#C6A15B]/15">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Source Origin: {item.origin}</span>
                  </div>
                )}

                {/* Wine Pairing */}
                {item.winePairing && (
                  <div className="p-3 rounded-xl bg-[#C6A15B]/10 border border-[#C6A15B]/25 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-[#C6A15B] font-semibold">
                      <Wine className="w-3.5 h-3.5" />
                      <span>Sommelier Vintage Pairing</span>
                    </div>
                    <p className="text-[#D1C9BE] text-[11px] italic">{item.winePairing}</p>
                  </div>
                )}

                {/* Allergens */}
                {item.allergens && item.allergens.length > 0 && (
                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    <span>Contains: {item.allergens.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#C6A15B]/20 flex gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenReservation();
                  }}
                  className="w-full py-3.5 rounded-full bg-[#C6A15B] text-black font-medium text-xs uppercase tracking-widest hover:bg-[#E5C383] transition-colors interactive"
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
