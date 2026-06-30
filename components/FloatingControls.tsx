"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio securely on the client
  useEffect(() => {
    // Royalty-free soft instrumental ambient loop (SoundHelix theme)
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.45; // comfortable background volume level

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio playback blocked or failed:", err);
          // Try to interact directly to allow browser policy bypass
        });
    }
  };

  return (
    <>
      {/* 1. Bottom-Left Pill: CHAT TO GET YOURS */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.a
          href="https://wa.me/910000000000" // Placeholder WhatsApp link
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-sans text-xs font-bold uppercase tracking-wider shadow-[0_8px_20px_rgba(16,185,129,0.35)] transition-all duration-300 pointer-events-auto border border-emerald-400/20"
        >
          {/* Chat / WhatsApp SVG Icon */}
          <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.07 1.953 11.986 1.953c-5.437 0-9.865 4.371-9.87 9.8-.002 1.764.464 3.488 1.349 5.023l-.99 3.616 3.73-.974 1.452.882z" />
          </svg>
          CHAT TO GET YOURS
        </motion.a>
      </div>

      {/* 2. Right-Edge Tab: BUY NOW FOR YOURSELF */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 select-none">
        <motion.a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: -4 }}
          className="flex items-center gap-2.5 px-3 py-5 rounded-l-2xl bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-[-4px_6px_16px_rgba(16,185,129,0.3)] transition-all duration-300"
        >
          {/* Vertical Text wrapper */}
          <span 
            className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.2em] whitespace-nowrap"
            style={{ 
              writingMode: "vertical-rl", 
              transform: "rotate(180deg)" 
            }}
          >
            BUY NOW FOR YOURSELF
          </span>
        </motion.a>
      </div>

      {/* 3. Bottom-Right: Audio/Mute Toggle */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          type="button"
          onClick={toggleAudio}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="w-12 h-12 rounded-full bg-white text-[#733532] shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.22)] transition-all duration-300 flex items-center justify-center border border-neutral-100/50 cursor-pointer pointer-events-auto relative group"
        >
          {/* Simple tool-tip on hover */}
          <span className="absolute -top-10 right-0 px-2 py-1 rounded bg-[#733532] text-white text-[10px] font-sans uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-sm whitespace-nowrap">
            {isPlaying ? "Mute Music" : "Play Music"}
          </span>

          <AnimatePresence mode="wait">
            {isPlaying ? (
              // Playing Icon (Speaker with sound waves)
              <motion.svg
                key="playing"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-5.5 h-5.5 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M6 9H2v6h4l5 5V4L6 9zm10.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </motion.svg>
            ) : (
              // Muted Icon (Speaker with an X)
              <motion.svg
                key="muted"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-5.5 h-5.5 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
