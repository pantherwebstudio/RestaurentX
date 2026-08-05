'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Award, ArrowUp, Send, MapPin, Phone, Mail } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/restaurantData';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-theme-primary border-t border-[#C6A15B]/20 pt-20 pb-12 overflow-hidden text-theme-primary transition-colors duration-300">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C6A15B]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-[#C6A15B]/15">
          {/* Col 1: Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C6A15B]/50 bg-theme-secondary">
                <Award className="h-5 w-5 text-[#C6A15B]" />
              </div>
              <span className="font-serif-luxury text-2xl font-light tracking-widest">
                RESTAURANT<span className="text-[#C6A15B] italic font-normal">X</span>
              </span>
            </Link>
            <p className="text-xs text-theme-muted leading-relaxed font-sans-clean">
              An unprecedented fusion of classical French gastronomy and contemporary minimalist elegance in {RESTAURANT_INFO.city}.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C6A15B]/30 bg-[#C6A15B]/10 text-[10px] uppercase tracking-widest text-[#C6A15B]">
              <span>Three Michelin Stars 2020–2025</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-sm tracking-[0.2em] text-[#C6A15B] uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-theme-muted">
              <li>
                <Link href="/" className="hover:text-[#C6A15B] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C6A15B] transition-colors">Our Story & Chef</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#C6A15B] transition-colors">Haute Cuisine Menu</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#C6A15B] transition-colors">Ambience & Gallery</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C6A15B] transition-colors">Reservations & Contact</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#C6A15B] transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#C6A15B] transition-colors">Terms of Experience</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Location */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-sm tracking-[0.2em] text-[#C6A15B] uppercase">
              Dining Hours & Address
            </h4>
            <div className="space-y-3 text-xs text-theme-muted">
              <div>
                <p className="font-medium text-theme-primary">Lunch Service</p>
                <p>{RESTAURANT_INFO.hours.lunch}</p>
              </div>
              <div>
                <p className="font-medium text-theme-primary">Dinner Service</p>
                <p>{RESTAURANT_INFO.hours.dinner}</p>
              </div>
              <div className="pt-2 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-sm tracking-[0.2em] text-[#C6A15B] uppercase">
              Private Dining Club
            </h4>
            <p className="text-xs text-theme-muted leading-relaxed">
              Subscribe to receive exclusive seasonal tasting menu invitations and private sommelier releases.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-lg border border-[#C6A15B]/40 bg-[#C6A15B]/10 text-xs text-[#C6A15B]">
                Thank you. You have been added to our private guest list.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-theme-secondary border border-[#C6A15B]/30 rounded-l-full px-4 py-2.5 text-xs text-theme-primary placeholder:text-gray-400 focus:outline-none focus:border-[#C6A15B]"
                  />
                  <button
                    type="submit"
                    className="bg-[#C6A15B] text-black font-semibold px-4 rounded-r-full hover:bg-[#E5C383] transition-colors flex items-center justify-center interactive"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESTAURANT_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full border border-[#C6A15B]/30 bg-theme-secondary text-theme-muted hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors interactive"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={RESTAURANT_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full border border-[#C6A15B]/30 bg-theme-secondary text-theme-muted hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors interactive"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-theme-muted">
          <p>© {new Date().getFullYear()} RestaurantX. All Rights Reserved. {RESTAURANT_INFO.city}.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C6A15B] hover:text-[#E5C383] transition-colors interactive"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
