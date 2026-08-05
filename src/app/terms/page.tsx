'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import ReservationModal from '@/components/ui/ReservationModal';

export default function TermsPage() {
  const [reservationOpen, setReservationOpen] = useState(false);

  return (
    <main className="bg-[#0D0D0D] text-[#F6F2ED] min-h-screen relative">
      <CustomCursor />
      <Navbar onOpenReservation={() => setReservationOpen(true)} />

      <div className="pt-36 pb-24 max-w-4xl mx-auto px-6 space-y-8">
        <div className="space-y-3 border-b border-[#C6A15B]/20 pb-8 text-center">
          <span className="text-xs uppercase font-mono tracking-widest text-[#C6A15B]">
            Guest Policies
          </span>
          <h1 className="font-serif-luxury text-4xl md:text-5xl font-light">
            Terms of Experience
          </h1>
          <p className="text-xs text-[#D1C9BE]/60">
            Bandra West Mumbai Guidelines
          </p>
        </div>

        <div className="space-y-6 text-xs text-[#D1C9BE]/80 leading-relaxed font-sans-clean">
          <h3 className="font-serif-luxury text-lg text-[#F6F2ED]">1. Dress Code</h3>
          <p>
            To maintain an exquisite ambience for all guests, RestaurantX observes an Elegant / Formal dress code. Jackets are encouraged for gentlemen. Athletic wear, casual shorts, flip-flops, and sports caps are strictly prohibited.
          </p>

          <h3 className="font-serif-luxury text-lg text-[#F6F2ED]">2. Cancellation Policy</h3>
          <p>
            Reservations may be cancelled up to 48 hours prior to service without penalty. Cancellations within 48 hours or no-shows may incur a cancellation fee of ₹5,000 per guest.
          </p>

          <h3 className="font-serif-luxury text-lg text-[#F6F2ED]">3. Punctuality</h3>
          <p>
            Tables will be held for up to 20 minutes past the reserved seating time before release to our waiting list.
          </p>
        </div>
      </div>

      <Footer />
      <ReservationModal isOpen={reservationOpen} onClose={() => setReservationOpen(false)} />
    </main>
  );
}
