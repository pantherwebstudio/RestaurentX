'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Search, Sparkles, Wine } from 'lucide-react';
import { FULL_MENU, MenuItem } from '@/data/restaurantData';

interface InteractiveMenuSectionProps {
  onSelectDish: (dish: MenuItem) => void;
  onOpenReservation: () => void;
}

export default function InteractiveMenuSection({ onSelectDish, onOpenReservation }: InteractiveMenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterChefChoice, setFilterChefChoice] = useState(false);
  const [filterVeg, setFilterVeg] = useState(false);
  const [filterGlutenFree, setFilterGlutenFree] = useState(false);

  const categories = [
    { id: 'all', label: 'Complete Menu' },
    { id: 'starters', label: 'Starters' },
    { id: 'mains', label: 'Main Courses' },
    { id: 'chef-specialties', label: "Chef's Table" },
    { id: 'desserts', label: 'Desserts' },
    { id: 'wines', label: 'Wine Vault' },
  ];

  const filteredMenu = useMemo(() => {
    return FULL_MENU.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !(item.frenchName && item.frenchName.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false;
      }
      if (filterChefChoice && !item.isChefChoice) return false;
      if (filterVeg && !item.isVegetarian) return false;
      if (filterGlutenFree && !item.isGlutenFree) return false;

      return true;
    });
  }, [activeCategory, searchQuery, filterChefChoice, filterVeg, filterGlutenFree]);

  return (
    <section id="menu" className="relative py-14 md:py-20 overflow-hidden bg-theme-primary text-theme-primary border-t border-[#C6A15B]/15 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C6A15B]" />
            <span className="font-serif-luxury text-xs tracking-[0.3em] uppercase text-[#C6A15B] font-semibold">
              Seasonal Tasting Experience
            </span>
            <span className="h-px w-8 bg-[#C6A15B]" />
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-light text-theme-primary">
            Haute Cuisine <span className="italic font-normal text-gold-gradient">Carte</span>
          </h2>
          <p className="text-xs md:text-sm font-sans-clean text-theme-muted max-w-lg mx-auto">
            Each dish represents a harmonized symphony of organic heritage and contemporary French mastery.
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="glass-card rounded-2xl p-4 sm:p-6 mb-8 md:mb-12 border border-[#C6A15B]/25 space-y-4 sm:space-y-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs tracking-wider uppercase transition-all whitespace-nowrap interactive ${
                  activeCategory === cat.id
                    ? 'bg-[#C6A15B] text-black font-bold shadow-md'
                    : 'glass-card text-theme-muted border border-[#C6A15B]/20 hover:border-[#C6A15B]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Dietary Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-3 border-t border-[#C6A15B]/15">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#C6A15B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dishes or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-[#C6A15B] border"
              />
            </div>

            {/* Toggle Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
              <button
                onClick={() => setFilterChefChoice(!filterChefChoice)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] border transition-all ${
                  filterChefChoice
                    ? 'bg-[#C6A15B] text-black font-bold border-[#C6A15B]'
                    : 'glass-card border-[#C6A15B]/20 hover:border-[#C6A15B]'
                }`}
              >
                <Sparkles className="w-3 h-3" /> Chef Choice
              </button>

              <button
                onClick={() => setFilterVeg(!filterVeg)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] border transition-all ${
                  filterVeg
                    ? 'bg-emerald-600 text-white font-bold border-emerald-600'
                    : 'glass-card border-[#C6A15B]/20 hover:border-[#C6A15B]'
                }`}
              >
                Vegetarian
              </button>

              <button
                onClick={() => setFilterGlutenFree(!filterGlutenFree)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] border transition-all ${
                  filterGlutenFree
                    ? 'bg-amber-600 text-white font-bold border-amber-600'
                    : 'glass-card border-[#C6A15B]/20 hover:border-[#C6A15B]'
                }`}
              >
                Gluten Free
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredMenu.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {filteredMenu.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                onClick={() => onSelectDish(item)}
                className="group p-4 sm:p-5 glass-card rounded-2xl border border-[#C6A15B]/20 hover:border-[#C6A15B]/60 transition-all duration-200 cursor-pointer flex gap-4 sm:gap-5 items-center interactive shadow-md"
              >
                {/* Image */}
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-xl overflow-hidden border border-[#C6A15B]/20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="112px"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {item.frenchName && (
                        <p className="font-serif-luxury text-[10px] sm:text-[11px] text-[#C6A15B] italic font-semibold">
                          {item.frenchName}
                        </p>
                      )}
                      <h3 className="font-serif-luxury text-base sm:text-lg text-theme-primary group-hover:text-[#C6A15B] transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <span className="font-mono text-sm sm:text-base text-[#C6A15B] font-bold shrink-0">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <p className="text-xs text-theme-muted line-clamp-2 leading-relaxed font-sans-clean">
                    {item.description}
                  </p>

                  {item.winePairing && (
                    <div className="flex items-center gap-1.5 text-[10px] text-[#C6A15B] font-semibold pt-1">
                      <Wine className="w-3 h-3 shrink-0" />
                      <span className="truncate italic">{item.winePairing}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card rounded-2xl border border-[#C6A15B]/20 space-y-3">
            <p className="text-sm font-medium text-theme-primary">No dishes match your selected filter criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setFilterChefChoice(false);
                setFilterVeg(false);
                setFilterGlutenFree(false);
              }}
              className="text-xs text-[#C6A15B] underline tracking-widest uppercase font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
