'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import ReservationModal from '@/components/ui/ReservationModal';
import WhatsAppWidget from '@/components/ui/WhatsAppWidget';
import LocationContactSection from '@/components/sections/LocationContactSection';

export default function ContactPage() {
  const [reservationOpen, setReservationOpen] = useState(false);

  return (
    <main className="min-h-screen bg-theme-primary text-theme-primary transition-colors duration-300">
      <CustomCursor />
      <Navbar onOpenReservation={() => setReservationOpen(true)} />

      {/* Hero Banner */}
      <div className="relative pt-36 pb-20 border-b border-[#C6A15B]/20 bg-theme-secondary text-center px-6">
        <span className="font-serif-luxury text-xs tracking-[0.3em] uppercase text-[#C6A15B] font-semibold">
          Location & Concierge
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-light mt-3 text-theme-primary">
          Contact & <span className="italic font-normal text-gold-gradient">Reservations</span>
        </h1>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-theme-muted font-sans-clean mt-3">
          Road No. 36, Jubilee Hills, Hyderabad. Direct reservations and inquiries via WhatsApp.
        </p>
      </div>

      <LocationContactSection onOpenReservation={() => setReservationOpen(true)} />

      <Footer />

      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />

      <WhatsAppWidget />
    </main>
  );
}
