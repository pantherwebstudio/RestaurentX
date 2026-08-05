'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Calendar, Users, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/restaurantData';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('19:30');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello ${RESTAURANT_INFO.name},\nI would like to reserve a table.\n\nName: ${name || 'Guest'}\nGuests: ${guests}\nDate: ${date}\nTime: ${time}\n\nThank you.`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[9000]">
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-2xl hover:scale-110 transition-transform duration-300 interactive"
        aria-label="WhatsApp Concierge"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
        </span>
      </button>

      {/* Quick Booking Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="fixed bottom-20 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-24 w-auto sm:w-96 max-w-[calc(100vw-2rem)] max-h-[85vh] overflow-y-auto glass-card rounded-2xl p-5 sm:p-6 border border-emerald-500/40 shadow-2xl z-50 text-theme-primary my-auto"
          >
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3.5 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-sm font-semibold text-theme-primary">
                    WhatsApp Concierge
                  </h4>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online • Instant Booking
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-theme-muted hover:text-emerald-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSend} className="space-y-3.5">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 font-semibold">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samiya Farooqui"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1 font-semibold">
                    <Users className="w-3 h-3" /> Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full rounded-lg px-2 py-2 text-xs focus:outline-none focus:border-emerald-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1 font-semibold">
                    <Clock className="w-3 h-3" /> Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-lg px-2 py-2 text-xs focus:outline-none focus:border-emerald-500"
                  >
                    {['12:30', '13:30', '18:30', '19:30', '20:30', '21:30'].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1 font-semibold">
                  <Calendar className="w-3 h-3" /> Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity interactive shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Book Instantly on WhatsApp</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
