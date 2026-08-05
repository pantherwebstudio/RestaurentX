'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import SpiceParticleCanvas from '@/components/ui/SpiceParticleCanvas';
import MasonryGallerySection from '@/components/sections/MasonryGallerySection';
import ReservationModal from '@/components/ui/ReservationModal';
import WhatsAppWidget from '@/components/ui/WhatsAppWidget';

export default function GalleryPage() {
  const [reservationOpen, setReservationOpen] = useState(false);

  return (
    <main className="bg-[#0D0D0D] text-[#F6F2ED] relative selection:bg-[#C6A15B]/30 selection:text-[#F6F2ED]">
      <CustomCursor />
      <SpiceParticleCanvas />
      <Navbar onOpenReservation={() => setReservationOpen(true)} />

      {/* Subpage Banner */}
      <div className="relative pt-36 pb-16 bg-gradient-to-b from-black via-[#0D0D0D] to-[#0D0D0D] border-b border-[#C6A15B]/20 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C6A15B]" />
            <span className="font-serif-luxury text-xs tracking-[0.3em] uppercase text-[#C6A15B]">
              Photography & Architecture
            </span>
            <span className="h-px w-8 bg-[#C6A15B]" />
          </div>
          <h1 className="font-serif-luxury text-5xl md:text-7xl font-light">
            Visual <span className="italic font-normal text-gold-gradient">Gallery</span>
          </h1>
          <p className="text-xs md:text-sm text-[#D1C9BE]/70 max-w-xl mx-auto font-sans-clean">
            Immerse in the dining room aesthetics, culinary plating, and sommelier vault.
          </p>
        </div>
      </div>

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
