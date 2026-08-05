'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import ReservationModal from '@/components/ui/ReservationModal';
import WhatsAppWidget from '@/components/ui/WhatsAppWidget';
import InteractiveMenuSection from '@/components/sections/InteractiveMenuSection';
import ItemDetailModal from '@/components/ui/ItemDetailModal';
import { MenuItem } from '@/data/restaurantData';

export default function MenuPage() {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  return (
    <main className="min-h-screen bg-theme-primary text-theme-primary transition-colors duration-300 pt-20">
      <CustomCursor />
      <Navbar onOpenReservation={() => setReservationOpen(true)} />

      <InteractiveMenuSection
        onSelectDish={(dish) => setSelectedDish(dish)}
        onOpenReservation={() => setReservationOpen(true)}
      />

      <Footer />

      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />

      <ItemDetailModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onOpenReservation={() => setReservationOpen(true)}
      />

      <WhatsAppWidget />
    </main>
  );
}
