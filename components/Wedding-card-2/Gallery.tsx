"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type GridPhoto = {
  id: string;
  src: string;
  alt: string;
};

const galleryPhotos: GridPhoto[] = [
  { id: "g1", src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600", alt: "The Rings" },
  { id: "g2", src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600", alt: "Love & Laughter" },
  { id: "g3", src: "https://images.unsplash.com/photo-1590075865003-e48277faa558?q=80&w=600", alt: "Henna Art" },
  { id: "g4", src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600", alt: "Festive Decor" },
  { id: "g5", src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600", alt: "Celebration" },
  { id: "g6", src: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=600", alt: "The Mandap" },
  { id: "g7", src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=600", alt: "Bridal Smile" },
  { id: "g8", src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600", alt: "Dance Night" },
  { id: "g9", src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600", alt: "Bridal Wear" },
];

const layoutTransition = { type: "spring" as const, stiffness: 220, damping: 26 };

const getSeededDelay = (index: number) => {
  const seed = Math.sin(index + 1) * 10000;
  const rand = seed - Math.floor(seed);
  return rand * 0.45; // yields values between 0.0s and 0.45s
};

export default function Gallery() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const selectedIndex = galleryPhotos.findIndex((p) => p.id === selectedId);

  const nextIndex = selectedIndex !== -1 ? (selectedIndex + 1) % galleryPhotos.length : 0;
  const prevIndex = selectedIndex !== -1 ? (selectedIndex - 1 + galleryPhotos.length) % galleryPhotos.length : 0;

  const goToNext = () => {
    if (selectedIndex === -1) return;
    setSelectedId(galleryPhotos[nextIndex].id);
  };

  const goToPrev = () => {
    if (selectedIndex === -1) return;
    setSelectedId(galleryPhotos[prevIndex].id);
  };

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedId]);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedId) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Right") goToNext();
      else if (e.key === "ArrowLeft" || e.key === "Left") goToPrev();
      else if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedId, selectedIndex]);

  return (
    <section className="relative w-full py-16 px-4 bg-[#fbf4e6] z-30">
      {/* Title */}
      <div className="text-center pb-8 select-none relative z-20">
        <h2 className="font-alex-brush text-[3.2rem] text-[#7A1C2C] tracking-wider" style={{ fontFamily: "var(--font-alex-brush), cursive" }}>
          Captured Moments
        </h2>
        <p className="text-xs font-sans text-[#8F5E52] tracking-[0.2em] uppercase mt-2" style={{ fontFamily: "var(--font-arimo), sans-serif" }}>
          Our Gallery
        </p>
      </div>

      {/* Grid wrapper */}
      <div className="w-full max-w-[400px] mx-auto grid grid-cols-3 gap-2 relative z-10">
        {galleryPhotos.map((photo, i) => {
          const delay = getSeededDelay(i);
          return (
            <motion.button
              key={photo.id}
              layoutId={`photo-${photo.id}`}
              onClick={() => setSelectedId(photo.id)}
              className="relative aspect-square overflow-hidden rounded-[16px] border border-[#A36662]/12 shadow-sm bg-neutral-100 cursor-pointer"
              whileTap={{ scale: 0.96 }}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.3 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                    opacity: { duration: 0.8, ease: "easeOut", delay },
                    scale: { type: "spring", stiffness: 260, damping: 15, delay },
                    layout: layoutTransition,
                  }
              }
            >
              <motion.img
                layoutId={`photo-img-${photo.id}`}
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover pointer-events-none"
                loading="lazy"
                transition={shouldReduceMotion ? { duration: 0 } : layoutTransition}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Lightbox rendering via AnimatePresence */}
      <AnimatePresence>
        {selectedId && selectedIndex !== -1 && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            {/* Modal Image container */}
            <div className="relative w-full max-w-[450px] aspect-[4/5] flex items-center justify-center overflow-hidden">
              <motion.img
                key={selectedId}
                layoutId={`photo-img-${selectedId}`}
                src={galleryPhotos[selectedIndex].src}
                alt={galleryPhotos[selectedIndex].alt}
                className="max-w-full max-h-full object-contain cursor-grab active:cursor-grabbing select-none"
                onClick={(e) => e.stopPropagation()}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) goToNext();
                  else if (info.offset.x > 80) goToPrev();
                  else if (info.offset.y > 100 || info.offset.y < -100) setSelectedId(null);
                }}
                transition={shouldReduceMotion ? { duration: 0 } : layoutTransition}
              />
            </div>

            {/* Overlay indicators / Captions */}
            <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none select-none">
              <p className="text-white/90 font-serif text-lg tracking-wide px-6 drop-shadow-md">
                {galleryPhotos[selectedIndex].alt}
              </p>
              <p className="text-white/40 text-xs mt-2 tracking-widest uppercase">
                {selectedIndex + 1} of {galleryPhotos.length}
              </p>
            </div>

            {/* Action buttons */}
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light cursor-pointer select-none bg-black/20 hover:bg-black/40 rounded-full w-12 h-12 flex items-center justify-center z-10 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-5xl font-light cursor-pointer select-none bg-black/10 hover:bg-black/30 rounded-full w-14 h-14 flex items-center justify-center z-10 transition-colors"
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-5xl font-light cursor-pointer select-none bg-black/10 hover:bg-black/30 rounded-full w-14 h-14 flex items-center justify-center z-10 transition-colors"
              aria-label="Next photo"
            >
              ›
            </button>

            {/* Off-screen preloading for next/prev images */}
            <div className="hidden">
              <img src={galleryPhotos[nextIndex].src} alt="" />
              <img src={galleryPhotos[prevIndex].src} alt="" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
