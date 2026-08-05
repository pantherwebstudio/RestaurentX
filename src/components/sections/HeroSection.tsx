'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Utensils, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { RESTAURANT_INFO } from '@/data/restaurantData';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export default function HeroSection({ onOpenReservation, onExploreMenu }: HeroSectionProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedState = sessionStorage.getItem('rx_music_state');
    const shouldPlay = savedState !== 'off';
    setIsPlaying(shouldPlay);

    const audio = new Audio('/denis-pavlov-music-podcast-jazz-atmosphere-music-332653.mp3');
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    const startAudio = () => {
      if (sessionStorage.getItem('rx_music_state') !== 'off' && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    };

    if (shouldPlay) {
      startAudio();

      // Listen to ANY early browser interaction (scroll, touch, move, click) to immediately trigger audio
      const events = ['pointerdown', 'touchstart', 'scroll', 'mousemove', 'keydown', 'click'];
      const triggerImmediate = () => {
        startAudio();
        events.forEach((evt) => window.removeEventListener(evt, triggerImmediate));
      };

      events.forEach((evt) => window.addEventListener(evt, triggerImmediate, { passive: true, once: true }));
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      sessionStorage.setItem('rx_music_state', 'off');
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        sessionStorage.setItem('rx_music_state', 'on');
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-theme-primary text-theme-primary transition-colors duration-300">
      {/* Background Cinematic Looping Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=85"
          className="h-full w-full object-cover scale-105 filter brightness-[0.45] contrast-125 transition-transform duration-10000 hover:scale-100"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-chef-plating-a-gourmet-dish-in-a-restaurant-41484-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradient Overlay & Film Grain */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-grain pointer-events-none" />
      </div>

      {/* Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="absolute top-28 right-4 sm:right-8 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-[#C6A15B]/50 bg-black/75 text-xs text-[#D1C9BE] backdrop-blur-md hover:border-[#C6A15B] transition-colors interactive shadow-xl"
        aria-label="Toggle jazz atmosphere music"
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-[#C6A15B] animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-gray-400" />
        )}
        <span className="text-[10px] tracking-wider uppercase font-mono font-medium text-[#C6A15B]">
          {isPlaying ? 'Jazz Atmosphere: Playing' : 'Jazz Atmosphere: Off'}
        </span>
      </button>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-[#F6F2ED] space-y-6 sm:space-y-8 pt-16">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C6A15B]/40 bg-[#141414]/80 backdrop-blur-md shadow-lg"
        >
          <span className="h-2 w-2 rounded-full bg-[#C6A15B] animate-ping" />
          <span className="font-serif-luxury text-[10px] sm:text-xs tracking-[0.2em] text-[#C6A15B] uppercase">
            3 Michelin Stars • {RESTAURANT_INFO.city}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-3 sm:space-y-4"
        >
          <h1 className="font-serif-luxury text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.95]">
            SENSORY <br />
            <span className="italic font-normal text-gold-gradient">GASTRONOMY</span>
          </h1>
          <p className="max-w-xl sm:max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-[#D1C9BE]/90 font-sans-clean font-light tracking-wide leading-relaxed px-2">
            Where classical French culinary heritage meets avant-garde minimalist art. Crafted by {RESTAURANT_INFO.chefName}.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
        >
          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#C6A15B] text-[#0D0D0D] font-medium text-xs tracking-[0.18em] uppercase hover:bg-[#E5C383] transition-all duration-200 shadow-xl gold-glow flex items-center justify-center gap-2.5 interactive"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve Table via WhatsApp</span>
          </button>

          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-full border border-[#C6A15B]/50 bg-black/40 backdrop-blur-md text-[#F6F2ED] font-medium text-xs tracking-[0.18em] uppercase hover:border-[#C6A15B] hover:bg-[#C6A15B]/15 transition-all duration-200 flex items-center justify-center gap-2.5 interactive"
          >
            <Utensils className="w-4 h-4 text-[#C6A15B]" />
            <span>Explore Menu</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 cursor-pointer"
        onClick={onExploreMenu}
      >
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#C6A15B]/90 font-mono">
          Scroll To Discover
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#C6A15B]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
