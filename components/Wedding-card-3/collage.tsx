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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      // Guard: check prefers-reduced-motion (GSAP skill rule)
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!containerRef.current) return;

      const scroller = containerRef.current.closest("#card-scroll-container");
      if (!scroller) return;

      const wrappers = gsap.utils.toArray(".gallery-card-wrapper") as HTMLElement[];
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (wrappers.length === 0 || cards.length === 0) return;

      // ── Stacking Parallax Scroll Timeline ─────────────────────────────────
      // We use a single scroll-linked timeline to drive the stacking reveal.
      // Cards start shifted down and slide up sequentially to stack on Card 0.
      // No opacity or blur fades are used, ensuring buttery-smooth performance.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          scroller,
          start: "top 75%", // Animation starts when section top is 75% down viewport
          end: "bottom 25%", // Ends when section bottom is 25% down
          scrub: 1.2,        // Smooth scrub follow
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;

        // Card starts shifted down below Card 0, and slides up to overlap/stack
        // ease: "none" is critical for uniform scrub sync (GSAP skill rule)
        tl.fromTo(
          card,
          { y: 380 * i },
          {
            y: -300 * i,
            ease: "none",
          },
          (i - 1) * 0.45 // Stagger the start of each card's slide-in on the timeline
        );
      });

      // Refresh ScrollTrigger positions after layout settles
      const t = setTimeout(() => ScrollTrigger.refresh(), 600);
      return () => clearTimeout(t);
    },
    { scope: containerRef }
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
      <div className="w-full max-w-[340px] flex flex-col gap-6 py-6 overflow-visible">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="gallery-card-wrapper w-full overflow-visible"
            style={{ zIndex: i + 1 }}
          >
            <div
              ref={(el) => { cardRefs.current[i] = el; }}
              className="gallery-card bg-white shadow-[0_12px_36px_rgba(155,75,50,0.15)] border border-[#9B4B32]/5 flex flex-col overflow-hidden"
              style={{
                borderRadius: "28px",
                padding: "16px 16px 16px 16px", // Thin border frame
                transform: `rotate(${photo.rotate}deg)`,
                transformOrigin: "center",
                willChange: "transform",
              }}
            >
              {/* Portrait Photo Container */}
              <div className="w-full aspect-[3/4] relative rounded-[16px] overflow-hidden bg-[#FAF6F0]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 480px) 100vw, 340px"
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