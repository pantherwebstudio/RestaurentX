'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import SpiceParticleCanvas from '@/components/ui/SpiceParticleCanvas';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedDishesSection from '@/components/sections/FeaturedDishesSection';
import StorySection from '@/components/sections/StorySection';
import ChefSection from '@/components/sections/ChefSection';
import InteractiveMenuSection from '@/components/sections/InteractiveMenuSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import AwardsSection from '@/components/sections/AwardsSection';
import MasonryGallerySection from '@/components/sections/MasonryGallerySection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import LocationContactSection from '@/components/sections/LocationContactSection';
import ReservationModal from '@/components/ui/ReservationModal';
import ItemDetailModal from '@/components/ui/ItemDetailModal';
import WhatsAppWidget from '@/components/ui/WhatsAppWidget';
import { MenuItem } from '@/data/restaurantData';

export default function Home() {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const scrollToMenu = () => {
    const el = document.getElementById('featured-dishes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-[#0D0D0D] text-[#F6F2ED] relative selection:bg-[#C6A15B]/30 selection:text-[#F6F2ED] overflow-x-hidden">
      <CustomCursor />
      <SpiceParticleCanvas />

      <Navbar onOpenReservation={() => setReservationOpen(true)} />

      {/* Main Page Flow */}
      <HeroSection
        onOpenReservation={() => setReservationOpen(true)}
        onExploreMenu={scrollToMenu}
      />

      <FeaturedDishesSection
        onSelectDish={(dish) => setSelectedDish(dish)}
        onViewAllMenu={() => {
          const el = document.getElementById('menu');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <StorySection />

      <ChefSection />

      <InteractiveMenuSection
        onSelectDish={(dish) => setSelectedDish(dish)}
        onOpenReservation={() => setReservationOpen(true)}
      />

      <ExperienceSection />

      <AwardsSection />

      <MasonryGallerySection />

      <TestimonialsSection />

      <LocationContactSection
        onOpenReservation={() => setReservationOpen(true)}
      />

      <Footer />

      {/* Modals & Floating Widgets */}
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
