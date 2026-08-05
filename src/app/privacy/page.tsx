'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import ReservationModal from '@/components/ui/ReservationModal';

export default function PrivacyPage() {
  const [reservationOpen, setReservationOpen] = useState(false);

  return (
    <main className="bg-[#0D0D0D] text-[#F6F2ED] min-h-screen relative">
      <CustomCursor />
      <Navbar onOpenReservation={() => setReservationOpen(true)} />

      <div className="pt-36 pb-24 max-w-4xl mx-auto px-6 space-y-8">
        <div className="space-y-3 border-b border-[#C6A15B]/20 pb-8 text-center">
          <span className="text-xs uppercase font-mono tracking-widest text-[#C6A15B]">
            Legal & Compliance
          </span>
          <h1 className="font-serif-luxury text-4xl md:text-5xl font-light">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#D1C9BE]/60">
            Last Updated: January 2025
          </p>
        </div>

        <div className="space-y-6 text-xs text-[#D1C9BE]/80 leading-relaxed font-sans-clean">
          <p>
            RestaurantX (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) values your privacy and is committed to protecting your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
          </p>

          <h3 className="font-serif-luxury text-lg text-[#F6F2ED]">1. Information We Collect</h3>
          <p>
            When reserving a table, subscribing to our private dining newsletter, or contacting our concierge, we collect your name, email address, telephone number, dietary preferences, and payment verification details.
          </p>

          <h3 className="font-serif-luxury text-lg text-[#F6F2ED]">2. How We Use Your Data</h3>
          <p>
            Your information is strictly utilized to process table bookings, communicate dietary requirements to our culinary team, and send invited updates regarding seasonal tasting releases.
          </p>

          <h3 className="font-serif-luxury text-lg text-[#F6F2ED]">3. Data Sharing & Third Parties</h3>
          <p>
            We never sell or rent guest data to third parties. Data is shared exclusively with trusted reservation handling partners (e.g. SevenRooms / WhatsApp API) for booking confirmation purposes.
          </p>
        </div>
      </div>

      <Footer />
      <ReservationModal isOpen={reservationOpen} onClose={() => setReservationOpen(false)} />
    </main>
  );
}
