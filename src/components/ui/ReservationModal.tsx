'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users, MessageSquare, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RESTAURANT_INFO } from '@/data/restaurantData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('19:30');
  const [seating, setSeating] = useState('Main Dining Room');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const timeSlots = [
    '12:30', '13:30', '14:30', '18:30', '19:30', '20:30', '21:30'
  ];

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C6A15B', '#E5C383', '#FFFFFF']
    });

    const msg = `Hello ${RESTAURANT_INFO.name},\nI would like to reserve a table.\n\nName: ${name || 'Guest'}\nPhone: ${phone || 'Not provided'}\nGuests: ${guests}\nDate: ${date}\nTime: ${time}\nSeating: ${seating}\nDietary / Notes: ${specialRequests || 'None'}\n\nThank you.`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[var(--bg-primary)]/85 backdrop-blur-md"
          />

          {/* Modal Card with scrollable container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl p-5 sm:p-8 z-10 border border-[#C6A15B]/30 shadow-2xl text-theme-primary my-auto scrollbar-thin"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full border border-[#C6A15B]/20 bg-theme-secondary text-theme-muted hover:text-gold hover:border-gold transition-colors interactive z-20"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-5 sm:space-y-6">
              <div className="text-center space-y-1.5 sm:space-y-2 border-b border-[#C6A15B]/20 pb-4 sm:pb-6 pr-8 sm:pr-0">
                <span className="text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold flex items-center justify-center gap-1.5 font-mono font-bold">
                  <Smartphone className="w-3.5 h-3.5" /> Direct WhatsApp Reservation
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-theme-primary">
                  Reserve A Table
                </h3>
                <p className="text-[11px] sm:text-xs text-theme-muted">
                  Select your preferences and send directly to our WhatsApp Concierge
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {/* Guests */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold mb-2 flex items-center gap-2 font-bold">
                    <Users className="w-3.5 h-3.5" /> Guests
                  </label>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setGuests(num)}
                        className={`flex-1 py-1.5 sm:py-2 rounded-lg text-xs font-mono border transition-all ${
                          guests === num
                            ? 'bg-gold text-black border-gold font-bold'
                            : 'bg-theme-secondary text-theme-primary border-[#C6A15B]/20 hover:border-gold'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold mb-2 flex items-center gap-2 font-bold">
                    <Calendar className="w-3.5 h-3.5" /> Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-theme-secondary border border-[#C6A15B]/30 rounded-lg px-3 py-2 text-xs text-theme-primary focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Time slots */}
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-gold mb-2 flex items-center gap-2 font-bold">
                    <Clock className="w-3.5 h-3.5" /> Preferred Time Slot
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setTime(slot)}
                        className={`py-1.5 sm:py-2 rounded-lg text-xs font-mono border transition-all ${
                          time === slot
                            ? 'bg-gold text-black border-gold font-bold'
                            : 'bg-theme-secondary text-theme-primary border-[#C6A15B]/20 hover:border-gold'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seating preference */}
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-gold mb-2 font-bold">
                    Ambience / Seating Area
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                    {['Main Dining Room', "Chef's Counter", 'Sommelier Vault', 'Rooftop Garden'].map((area) => (
                      <button
                        type="button"
                        key={area}
                        onClick={() => setSeating(area)}
                        className={`py-1.5 sm:py-2 px-2 text-center rounded-lg text-xs border transition-all truncate ${
                          seating === area
                            ? 'bg-[#C6A15B]/20 border-gold text-gold font-bold'
                            : 'bg-theme-secondary border-[#C6A15B]/15 text-theme-muted hover:border-gold'
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal details */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-theme-muted mb-1 font-semibold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aaryan Kapoor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-theme-muted mb-1 font-semibold">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-theme-muted mb-1 flex items-center gap-2 font-semibold">
                    <MessageSquare className="w-3.5 h-3.5 text-gold" /> Special Dietary Requests / Occasion
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Birthday anniversary, vegetarian, shellfish allergy..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-[#C6A15B]/20">
                <button
                  type="submit"
                  className="w-full py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 text-white font-bold text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-900/30 interactive"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Send Reservation Request on WhatsApp</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
