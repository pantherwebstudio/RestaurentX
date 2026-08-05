'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem, RESTAURANT_INFO } from '@/data/restaurantData';

export default function MasonryGallerySection() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Artifacts' },
    { id: 'ambience', label: 'Dining Ambience' },
    { id: 'culinary', label: 'Haute Plating' },
    { id: 'wine', label: 'Sommelier Vault' },
    { id: 'kitchen', label: 'Culinary Artistry' },
  ];

  const filteredItems = useMemo(() => {
    if (activeTab === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeTab);
  }, [activeTab]);

  return (
    <section id="gallery" className="relative py-14 md:py-20 overflow-hidden bg-theme-primary text-theme-primary border-t border-[#C6A15B]/15 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold opacity-60" />
            <span className="font-serif-luxury text-xs tracking-[0.3em] uppercase text-gold font-bold">
              Visual Anthology
            </span>
            <span className="h-px w-8 bg-gold opacity-60" />
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-light text-theme-primary break-words">
            Ambience & <span className="italic font-normal text-gold-gradient">Gastronomy</span>
          </h2>
          <p className="text-xs md:text-sm font-sans-clean text-theme-muted max-w-lg mx-auto">
            A glimpse inside our sanctuary of light, texture, and rare luxury in {RESTAURANT_INFO.city}.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center items-center gap-2 flex-wrap mb-8 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs tracking-wider uppercase transition-all whitespace-nowrap interactive ${
                activeTab === cat.id
                  ? 'bg-gold text-black font-bold shadow-md'
                  : 'glass-card text-theme-muted border border-[#C6A15B]/20 hover:border-[#C6A15B]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
              onClick={() => setSelectedImage(item)}
              className={`group relative rounded-2xl overflow-hidden glass-card border border-[#C6A15B]/20 hover:border-[#C6A15B]/60 cursor-pointer ${
                item.aspect === 'tall' ? 'h-80 sm:h-96' : item.aspect === 'wide' ? 'h-56 sm:h-64 sm:col-span-2 lg:col-span-1' : 'h-60 sm:h-72'
              } interactive shadow-md max-w-full`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/95 via-[var(--bg-primary)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-5 text-theme-primary">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">
                  {item.category}
                </span>
                <h3 className="font-serif-luxury text-lg sm:text-xl text-theme-primary font-medium truncate">
                  {item.title}
                </h3>
                <Maximize2 className="w-5 h-5 text-gold absolute top-4 right-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Viewer */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-[var(--bg-primary)]/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full max-h-[85vh] glass-card rounded-2xl overflow-hidden z-10 border border-[#C6A15B]/40 flex flex-col justify-between"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-theme-secondary text-theme-primary hover:text-gold transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-[55vh] sm:h-[65vh] w-full">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              <div className="p-4 sm:p-6 glass-card border-t border-[#C6A15B]/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gold font-bold">
                    {selectedImage.category}
                  </span>
                  <h3 className="font-serif-luxury text-lg sm:text-xl font-medium text-theme-primary truncate">
                    {selectedImage.title}
                  </h3>
                </div>
                <span className="text-xs text-theme-muted hidden sm:inline">
                  {RESTAURANT_INFO.name} Collection
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
