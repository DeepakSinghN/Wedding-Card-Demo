"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Import gallery photos
import PhotoTop from "./Gallery-section-resources/virat-anuskha-6.jpg";
import PhotoMidLeft from "./Gallery-section-resources/virat-anuskha.jpg";
import PhotoMidCenter from "./Gallery-section-resources/virat-anuskha-2.jpg";
import PhotoMidRight from "./Gallery-section-resources/virat-anuskha-4.jpg";
import PhotoBottom from "./Gallery-section-resources/virat-anuskha-5.jpg";

type GalleryPhoto = {
  src: any;
  alt: string;
  caption: string;
  captionPos: "bottom-left" | "bottom-right" | "bottom-center";
  rotate: number;
};

const photos: GalleryPhoto[] = [
  {
    src: PhotoTop,
    alt: "The proposal photo",
    caption: "The proposal",
    captionPos: "bottom-left",
    rotate: 3,
  },
  {
    src: PhotoMidLeft,
    alt: "Just us photo",
    caption: "Just us",
    captionPos: "bottom-right",
    rotate: -3,
  },
  {
    src: PhotoMidCenter,
    alt: "I said yes photo",
    caption: "I said yes!",
    captionPos: "bottom-left",
    rotate: 2,
  },
  {
    src: PhotoMidRight,
    alt: "Laughter & love photo",
    caption: "Laughter & love",
    captionPos: "bottom-right",
    rotate: -2,
  },
  {
    src: PhotoBottom,
    alt: "Forever starts here photo",
    caption: "Forever starts here",
    captionPos: "bottom-center",
    rotate: 3,
  },
];

const positionClasses = {
  "bottom-left": "left-6 bottom-8 text-left",
  "bottom-right": "right-6 bottom-8 text-right",
  "bottom-center": "left-1/2 -translate-x-1/2 bottom-8 text-center w-[90%]",
};

export default function Collage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      className="relative w-full bg-[#FCEAEA] py-16 px-6 flex flex-col items-center select-none overflow-visible mt-12"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center gap-2 mb-12">
        <p
          className="tracking-[2px] text-[#9B4B32]/70"
          style={{
            fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive",
            fontSize: "3rem",
          }}
        >
          Our Moments
        </p>
        <div
          className="w-24 h-0.5 mt-2"
          style={{
            background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
          }}
        />
      </div>

      {/* Cards List - CSS Sticky Stacking Container */}
      {/* By using normal document flow with position: sticky on children,
          cards naturally scroll up and stack on top of each other at top-offset heights. */}
      <div className="w-full max-w-[370px] flex flex-col gap-0 overflow-visible">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="w-full flex items-center justify-center overflow-visible"
            style={{
              position: "sticky",
              // Incremental top offset so the top headers/edges of all stacked cards remain visible
              top: `${70 + i * 20}px`,
              height: "85vh", // Height of the sticky viewport window per card
              zIndex: i + 1,
            }}
          >
            {/* Polaroid card */}
            <div
              className="gallery-card bg-white shadow-[0_12px_36px_rgba(155,75,50,0.18)] border border-[#9B4B32]/5 flex flex-col overflow-hidden transition-all duration-300"
              style={{
                borderRadius: "28px",
                padding: "16px 16px 16px 16px", // White border frame
                width: "330px",
                transform: `rotate(${photo.rotate}deg)`,
                transformOrigin: "center",
              }}
            >
              {/* Portrait Photo Container */}
              <div className="w-full aspect-[2/4] relative rounded-[16px] overflow-hidden bg-[#FAF6F0]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 480px) 100vw, 330px"
                  className="object-cover pointer-events-none select-none"
                  priority={i < 2}
                />

                {/* ── Overlay Cursive Caption ──────────────────────────────── */}
                <div
                  className={`absolute z-10 pointer-events-none ${positionClasses[photo.captionPos]}`}
                >
                  <p
                    className="text-white font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]"
                    style={{
                      fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive",
                      fontSize: "clamp(1.8rem, 7cqi, 2.5rem)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}