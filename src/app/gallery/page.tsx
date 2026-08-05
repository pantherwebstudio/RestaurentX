'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import ReservationModal from '@/components/ui/ReservationModal';
import WhatsAppWidget from '@/components/ui/WhatsAppWidget';
import MasonryGallerySection from '@/components/sections/MasonryGallerySection';

export default function GalleryPage() {
  const [reservationOpen, setReservationOpen] = useState(false);

  return (
    <main className="min-h-screen bg-theme-primary text-theme-primary transition-colors duration-300 pt-20">
      <CustomCursor />
      <Navbar onOpenReservation={() => setReservationOpen(true)} />

      <MasonryGallerySection />

      <Footer />

      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />

      <WhatsAppWidget />
    </main>
  );
}
