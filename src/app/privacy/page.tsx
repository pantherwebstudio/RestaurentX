'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import ReservationModal from '@/components/ui/ReservationModal';

export default function PrivacyPage() {
  const [reservationOpen, setReservationOpen] = useState(false);

  return (
    <main className="min-h-screen bg-theme-primary text-theme-primary transition-colors duration-300">
      <CustomCursor />
      <Navbar onOpenReservation={() => setReservationOpen(true)} />

      <div className="relative pt-36 pb-20 border-b border-[#C6A15B]/20 bg-theme-secondary text-center px-6">
        <span className="font-serif-luxury text-xs tracking-[0.3em] uppercase text-[#C6A15B] font-semibold">
          Legal & Privacy
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-light mt-3 text-theme-primary">
          Privacy <span className="italic font-normal text-gold-gradient">Policy</span>
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-8 text-xs sm:text-sm text-theme-muted font-sans-clean leading-relaxed">
        <section className="glass-card p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/20 space-y-4">
          <h2 className="font-serif-luxury text-xl text-theme-primary font-semibold">1. Guest Information Confidentiality</h2>
          <p>
            At RestaurantX Hyderabad, we respect the privacy of our dining guests. All reservation details, dietary preferences, personal contact numbers, and payment details submitted online or via our WhatsApp Concierge are handled with absolute confidentiality and encrypted.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/20 space-y-4">
          <h2 className="font-serif-luxury text-xl text-theme-primary font-semibold">2. Communication & Updates</h2>
          <p>
            We use your provided phone number and email exclusively for table reservation confirmations, dining concierge notifications, and private wine club releases if opted in. We never share or sell guest data to third-party advertisers.
          </p>
        </section>
      </div>

      <Footer />
      <ReservationModal isOpen={reservationOpen} onClose={() => setReservationOpen(false)} />
    </main>
  );
}
