"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const explicitActionRef = useRef(false);

  // Initialize audio securely on the client
  useEffect(() => {
    // Initialize with local Kesariya wedding song (URL encoded space characters)
    const audio = new Audio("/Song/kesariya%20for%20wedding%20card.m4a");
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0.45; // comfortable background volume level
    audioRef.current = audio;

    const playAudio = () => {
      if (explicitActionRef.current) return;
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Autoplay blocked, waiting for user interaction:", err);
        });
    };

    const handleInteraction = (e: Event) => {
      // Don't auto-play if the user is explicitly clicking the mute toggle button
      const target = e.target as HTMLElement;
      if (target && target.closest("button")?.getAttribute("id") === "audio-toggle-btn") {
        return;
      }
      playAudio();
    };

    // Attempt direct autoplay immediately on mount
    playAudio();

    // Fallback: trigger play on first touch, click, or scroll
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = null;
    };
  }, []);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent bubbling to window interaction listeners
    if (!audioRef.current) return;

    explicitActionRef.current = true; // User has explicitly interacted with the mute button

    if (!audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio playback blocked or failed:", err);
        });
    }
  };

  return (
    <>
      {/* Bottom-Right: Audio/Mute Toggle */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          id="audio-toggle-btn"
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
