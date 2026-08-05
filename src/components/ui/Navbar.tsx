'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Award, Sun, Moon, Smartphone } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/restaurantData';

interface NavbarProps {
  onOpenReservation: () => void;
}

export default function Navbar({ onOpenReservation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem('rx_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
      if (savedTheme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('rx_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Menu', href: '/menu' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-nav py-4 shadow-2xl'
            : 'bg-gradient-to-b from-[var(--bg-primary)]/95 via-[var(--bg-primary)]/50 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C6A15B]/40 bg-theme-secondary group-hover:border-[#C6A15B] transition-colors">
              <Award className="h-5 w-5 text-[#C6A15B]" />
            </div>
            <div>
              <span className="font-serif-luxury text-2xl font-light tracking-widest text-theme-primary group-hover:text-[#C6A15B] transition-colors">
                RESTAURANT<span className="text-[#C6A15B] italic font-normal">X</span>
              </span>
              <div className="flex items-center gap-1.5 text-[10px] tracking-widest text-[#C6A15B] font-mono font-semibold">
                <span>★★★ MICHELIN</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs uppercase tracking-[0.25em] transition-colors hover:text-[#C6A15B] font-bold ${
                    isActive ? 'text-[#C6A15B]' : 'text-theme-primary'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#C6A15B]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA, Theme Toggle & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-[#C6A15B]/40 bg-theme-secondary text-[#C6A15B] hover:border-[#C6A15B] hover:scale-105 transition-all interactive shadow-md"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-[#C6A15B]" />}
            </button>

            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-800 dark:bg-emerald-950/80 text-white dark:text-emerald-300 border border-emerald-600/80 font-bold text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all duration-300 shadow-lg interactive"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>WhatsApp Booking</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full border border-[#C6A15B]/30 bg-theme-secondary text-theme-primary hover:text-[#C6A15B] transition-colors interactive"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#C6A15B]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 bg-theme-primary text-theme-primary flex flex-col justify-between p-8 md:p-12 lg:hidden pt-28 border-b border-[#C6A15B]/20"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] font-semibold">
                Navigation Menu
              </span>
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif-luxury text-3xl font-light tracking-wider text-theme-primary hover:text-[#C6A15B] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6 pt-6 border-t border-[#C6A15B]/15">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
              >
                <Smartphone className="w-4 h-4" />
                <span>Reserve Table via WhatsApp</span>
              </button>

              <div className="flex items-center justify-between text-xs text-theme-muted">
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="flex items-center gap-2 hover:text-[#C6A15B]">
                  <Smartphone className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>{RESTAURANT_INFO.phone}</span>
                </a>
                <span>{RESTAURANT_INFO.city}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
