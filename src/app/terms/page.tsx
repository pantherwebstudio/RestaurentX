'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import ReservationModal from '@/components/ui/ReservationModal';

export default function TermsPage() {
  const [reservationOpen, setReservationOpen] = useState(false);

  return (
    <main className="min-h-screen bg-theme-primary text-theme-primary transition-colors duration-300">
      <CustomCursor />
      <Navbar onOpenReservation={() => setReservationOpen(true)} />

      <div className="relative pt-36 pb-20 border-b border-[#C6A15B]/20 bg-theme-secondary text-center px-6">
        <span className="font-serif-luxury text-xs tracking-[0.3em] uppercase text-[#C6A15B] font-semibold">
          Guest Guidelines
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-light mt-3 text-theme-primary">
          Terms of <span className="italic font-normal text-gold-gradient">Experience</span>
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-8 text-xs sm:text-sm text-theme-muted font-sans-clean leading-relaxed">
        <section className="glass-card p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/20 space-y-4">
          <h2 className="font-serif-luxury text-xl text-theme-primary font-semibold">1. Reservation Policy</h2>
          <p>
            To maintain our intimate culinary atmosphere, reservations are required. Table holds are honored up to 15 minutes past the reserved seating time. Cancellations should be notified via WhatsApp at least 24 hours prior.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/20 space-y-4">
          <h2 className="font-serif-luxury text-xl text-theme-primary font-semibold">2. Dress Code & Atmosphere</h2>
          <p>
            We require Elegant Smart Casual attire in the Main Dining Room and Sommelier Vault. Flash photography and loud device usage are discouraged to maintain an acoustic soundscape for all guests.
          </p>
        </section>
      </div>

      <Footer />
      <ReservationModal isOpen={reservationOpen} onClose={() => setReservationOpen(false)} />
    </main>
  );
}
