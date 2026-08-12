"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Import gallery photos
import PhotoTop from "./Gallery-section-resources/virat-anuskha-6.jpg";
import PhotoMidLeft from "./Gallery-section-resources/virat-anuskha.jpg";
import PhotoMidCenter from "./Gallery-section-resources/virat-anuskha-2.jpg";
import PhotoMidRight from "./Gallery-section-resources/virat-anuskha-4.jpg";
import PhotoBottom from "./Gallery-section-resources/virat-anuskha-5.jpg";

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mobileQuery.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mobileQuery.addEventListener("change", listener);
    return () => mobileQuery.removeEventListener("change", listener);
  }, []);

  useGSAP(
    () => {
      // Guard: check prefers-reduced-motion (GSAP skill rule)
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!containerRef.current) return;

      const scroller = containerRef.current.closest("#card-scroll-container");
      if (!scroller) return;

      // ── Initial State Setup ───────────────────────────────────────────────
      // We set starting states for cards: scaled up slightly, transparent, and blurred
      const cards = gsap.utils.toArray(".gallery-card") as HTMLElement[];
      gsap.set(cards, {
        opacity: 0,
        scale: 1.08,
        // Disable blur filter on mobile to prevent performance jank (performance rule)
        filter: isMobile ? "none" : "blur(6px)",
      });

      // Characters are hidden initially
      const chars = gsap.utils.toArray(".caption-char") as HTMLElement[];
      gsap.set(chars, { opacity: 0, y: 10 });

      // ── ScrollTrigger.batch() entrance reveal ─────────────────────────────
      // Batches cards as they scroll into view to avoid lag spikes
      ScrollTrigger.batch(cards, {
        scroller,
        start: "top 85%",
        once: true, // Only animate once
        onEnter: (batch) => {
          // 1. Animate card opacity, scaling, and sharpening
          gsap.to(batch, {
            opacity: 1,
            scale: 1,
            filter: "none",
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
            willChange: "transform, filter",
            onComplete: function () {
              // Remove will-change after animation to free up GPU memory
              gsap.set(this.targets(), { clearProps: "willChange" });
            },
          });

          // 2. Animate character stagger inside this batch
          batch.forEach((card) => {
            const cardChars = card.querySelectorAll(".caption-char");
            if (cardChars.length > 0) {
              gsap.to(cardChars, {
                opacity: 1,
                y: 0,
                stagger: 0.03, // tight stagger for quick flourish
                duration: 0.5,
                ease: "power2.out",
                delay: 0.35, // starts slightly after card finishes scaling
              });
            }
          });
        },
      });

      // Refresh ScrollTrigger positions after layout settles
      const t = setTimeout(() => ScrollTrigger.refresh(), 800);
      return () => clearTimeout(t);
    },
    { scope: containerRef, dependencies: [isMobile] }
  );

  if (!mounted) return null;

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#FCEAEA] py-16 px-6 flex flex-col items-center gap-12 select-none overflow-hidden mt-12"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center gap-2">
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

      {/* Cards List */}
      <div className="w-full max-w-[360px] flex flex-col gap-12 py-6 overflow-visible">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="gallery-card bg-white shadow-[0_12px_36px_rgba(155,75,50,0.12)] border border-[#9B4B32]/5 flex flex-col overflow-hidden"
            style={{
              borderRadius: "24px",
              padding: "16px 16px 16px 16px", // Thin cream/white border frame
              transform: `rotate(${photo.rotate}deg)`,
              transformOrigin: "center",
            }}
          >
            {/* Portrait Photo Container */}
            <div className="w-full aspect-[3/4] relative rounded-[16px] overflow-hidden bg-[#FAF6F0]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 480px) 100vw, 360px"
                className="object-cover pointer-events-none select-none"
                priority={i < 2}
              />

              {/* ── Overlay Cursive Caption ──────────────────────────────── */}
              {/* Positioned according to the configurable captionPos option */}
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
                  {/* Split string into letters for clean stagger animation */}
                  {photo.caption.split("").map((char, charIdx) => (
                    <span
                      key={charIdx}
                      className="caption-char inline-block"
                      style={{ willChange: "transform, opacity" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}