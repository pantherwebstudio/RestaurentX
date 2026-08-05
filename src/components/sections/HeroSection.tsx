'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Utensils, Volume2, VolumeX, Music } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { RESTAURANT_INFO } from '@/data/restaurantData';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export default function HeroSection({ onOpenReservation, onExploreMenu }: HeroSectionProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMutedAutoplay, setIsMutedAutoplay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedState = sessionStorage.getItem('rx_music_state');
    const shouldPlay = savedState !== 'off';
    setIsPlaying(shouldPlay);

    const audio = new Audio('/denis-pavlov-music-podcast-jazz-atmosphere-music-332653.mp3');
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    const enableUnmutedSound = () => {
      if (sessionStorage.getItem('rx_music_state') !== 'off' && audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.55;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setIsMutedAutoplay(false);
        }).catch(() => {});
      }
      removeListeners();
    };

    const events = ['click', 'pointerdown', 'touchstart', 'scroll', 'keydown', 'mousemove', 'pointermove'];

    const removeListeners = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, enableUnmutedSound);
        document.removeEventListener(evt, enableUnmutedSound);
      });
    };

    if (shouldPlay) {
      // 1. Try unmuted play immediately
      audio.muted = false;
      audio.volume = 0.55;
      audio.play().then(() => {
        setIsPlaying(true);
        setIsMutedAutoplay(false);
      }).catch(() => {
        // 2. If browser blocks unmuted sound, play muted automatically (browser ALWAYS permits muted autoplay)
        audio.muted = true;
        audio.play().then(() => {
          setIsPlaying(true);
          setIsMutedAutoplay(true);
        }).catch(() => {});

        // 3. Attach gesture listeners to instantly unmute on first movement
        events.forEach((evt) => {
          window.addEventListener(evt, enableUnmutedSound, { passive: true, once: true });
          document.addEventListener(evt, enableUnmutedSound, { passive: true, once: true });
        });
      });

      return () => {
        removeListeners();
        audio.pause();
        audio.src = '';
      };
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying && !isMutedAutoplay) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsMutedAutoplay(false);
      sessionStorage.setItem('rx_music_state', 'off');
    } else {
      audioRef.current.muted = false;
      audioRef.current.volume = 0.55;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsMutedAutoplay(false);
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
          className="h-full w-full object-cover scale-105 filter brightness-[0.6] dark:brightness-[0.45] contrast-125 transition-transform duration-10000 hover:scale-100"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-chef-plating-a-gourmet-dish-in-a-restaurant-41484-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dynamic Obsidian / Biscuit Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/75 to-[var(--bg-primary)]/90 transition-colors duration-300" />
        <div className="absolute inset-0 bg-grain pointer-events-none" />
      </div>

      {/* Audio Autoplay Unmute Prompt Banner */}
      {isMutedAutoplay && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-black font-bold text-xs shadow-2xl gold-glow cursor-pointer interactive"
          onClick={toggleMusic}
        >
          <Music className="w-4 h-4 animate-bounce" />
          <span>Tap anywhere to enable Jazz Atmosphere sound 🎵</span>
        </motion.div>
      )}

      {/* Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="absolute top-24 sm:top-28 right-4 sm:right-8 z-20 flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-[#C6A15B]/50 glass-card text-xs backdrop-blur-md hover:border-[#C6A15B] transition-all interactive shadow-xl"
        aria-label="Toggle jazz atmosphere music"
      >
        {isPlaying && !isMutedAutoplay ? (
          <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C6A15B] animate-pulse" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-60" />
        )}
        <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-mono font-bold text-gold">
          {isPlaying && !isMutedAutoplay ? 'Jazz Music: On' : 'Jazz Music: Tap for Sound'}
        </span>
      </button>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5 sm:space-y-8 pt-12 sm:pt-16">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full glass-card border border-[#C6A15B]/40 shadow-lg"
        >
          <span className="h-2 w-2 rounded-full bg-[#C6A15B] animate-ping" />
          <span className="font-serif-luxury text-[9px] sm:text-xs tracking-[0.18em] text-gold font-bold uppercase">
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
          <h1 className="font-serif-luxury text-3xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.95] text-theme-primary break-words">
            SENSORY <br />
            <span className="italic font-normal text-gold-gradient">GASTRONOMY</span>
          </h1>
          <p className="max-w-xl sm:max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-theme-muted font-sans-clean font-light tracking-wide leading-relaxed px-2">
            Where classical French culinary heritage meets avant-garde minimalist art. Crafted by {RESTAURANT_INFO.chefName}.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
        >
          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gold text-black font-bold text-xs tracking-[0.15em] sm:tracking-[0.18em] uppercase hover:opacity-90 transition-all duration-200 shadow-xl gold-glow flex items-center justify-center gap-2 interactive"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve Table via WhatsApp</span>
          </button>

          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-[#C6A15B]/50 glass-card text-theme-primary font-bold text-xs tracking-[0.15em] sm:tracking-[0.18em] uppercase hover:border-[#C6A15B] transition-all duration-200 flex items-center justify-center gap-2 interactive"
          >
            <Utensils className="w-4 h-4 text-gold" />
            <span>Explore Menu</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer"
        onClick={onExploreMenu}
      >
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-gold font-mono font-bold">
          Scroll To Discover
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
