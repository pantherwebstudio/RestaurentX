'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Calendar, Smartphone } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/restaurantData';

interface LocationContactSectionProps {
  onOpenReservation: () => void;
}

export default function LocationContactSection({ onOpenReservation }: LocationContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleWhatsAppContact = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello ${RESTAURANT_INFO.name},\nInquiry Topic: ${formData.subject}\n\nName: ${formData.name || 'Guest'}\nPhone: ${formData.phone || 'Not provided'}\nDetails: ${formData.message}\n\nThank you.`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encoded}`, '_blank');
    setFormData({ name: '', phone: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <section id="contact" className="relative py-14 md:py-20 bg-theme-primary text-theme-primary overflow-hidden border-t border-[#C6A15B]/15 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto mb-12 sm:mb-20">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold opacity-60" />
            <span className="font-serif-luxury text-xs tracking-[0.3em] uppercase text-gold font-bold">
              Location & Concierge
            </span>
            <span className="h-px w-8 bg-gold opacity-60" />
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-light">
            Visit Our <span className="italic font-normal text-gold-gradient">Hyderabad Sanctuary</span>
          </h2>
          <p className="text-xs md:text-sm font-sans-clean opacity-80 max-w-lg mx-auto">
            Situated in Jubilee Hills, Hyderabad. Valet parking provided. All bookings and inquiries managed live via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Col: Contact Details & Hours */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/25 space-y-6">
              <h3 className="font-serif-luxury text-2xl font-light">
                Concierge & Hours
              </h3>

              <div className="space-y-4 text-xs font-sans-clean">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-semibold">Address</strong>
                    <span className="opacity-80">{RESTAURANT_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-semibold">Direct Phone & WhatsApp</strong>
                    <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#C6A15B] opacity-80">
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-semibold">Reservations Email</strong>
                    <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-[#C6A15B] opacity-80">
                      {RESTAURANT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours Table */}
              <div className="pt-6 border-t border-[#C6A15B]/15 space-y-3">
                <h4 className="font-serif-luxury text-sm text-[#C6A15B] uppercase tracking-wider flex items-center gap-2 font-semibold">
                  <Clock className="w-4 h-4" /> Dining Service Hours
                </h4>
                <div className="space-y-2 text-xs font-sans-clean">
                  <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-1">
                    <span className="opacity-75">Lunch (Wed - Sun)</span>
                    <span className="font-mono font-medium">12:30 PM – 3:30 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-1">
                    <span className="opacity-75">Dinner (Mon - Sun)</span>
                    <span className="font-mono font-medium">7:00 PM – 11:45 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Cocktail Bar</span>
                    <span className="font-mono font-medium">5:00 PM – 1:30 AM</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 rounded-full border border-[#C6A15B]/40 bg-theme-secondary text-[#C6A15B] font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#C6A15B] hover:text-black transition-colors interactive"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Google Maps Directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Col: Map Frame & WhatsApp Inquiry Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Map Frame Simulation */}
            <div className="relative h-60 sm:h-64 w-full rounded-2xl overflow-hidden glass-card border border-[#C6A15B]/25">
              <iframe
                title="RestaurantX Hyderabad Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15227.1856715694!2d78.4026!3d17.4332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c8f1e58e37%3A0x7d9f7831f2518e95!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
              <div className="absolute top-4 left-4 glass-card px-4 py-2 rounded-full border border-[#C6A15B]/40 text-xs text-[#C6A15B] flex items-center gap-2 font-semibold">
                <MapPin className="w-4 h-4 text-[#C6A15B]" />
                <span>Road No. 36, Jubilee Hills, Hyderabad</span>
              </div>
            </div>

            {/* WhatsApp Direct Inquiry Form */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/25 space-y-6">
              <div className="flex items-center justify-between border-b border-[#C6A15B]/15 pb-4">
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-light">
                  WhatsApp Inquiries & Concierge
                </h3>
                <button
                  onClick={onOpenReservation}
                  className="hidden sm:flex items-center gap-1.5 text-xs text-[#C6A15B] hover:underline uppercase tracking-wider font-semibold"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book Table?
                </button>
              </div>

              <form onSubmit={handleWhatsAppContact} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider opacity-80 mb-1 font-semibold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Karan Reddy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#C6A15B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider opacity-80 mb-1 font-semibold">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#C6A15B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider opacity-80 mb-1 font-semibold">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#C6A15B]"
                  >
                    <option value="Table Reservation">Table Reservation Request</option>
                    <option value="Private Dining Event">Private VIP Dining Suite Event</option>
                    <option value="Press & Media">Press & Media Inquiries</option>
                    <option value="Sommelier Vintage Cellar">Sommelier Vintage Cellar Purchasing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider opacity-80 mb-1 font-semibold">
                    Message Details *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Enter your inquiry details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2 interactive shadow-lg"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Send Inquiry Live via WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
