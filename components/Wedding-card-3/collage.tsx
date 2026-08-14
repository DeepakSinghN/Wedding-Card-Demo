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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!mounted) return;
      // Guard: always check prefers-reduced-motion (GSAP skill rule)
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!sectionRef.current) return;

      const scroller = sectionRef.current.closest("#card-scroll-container");
      if (!scroller) return;

      // 1. Header Animation (Fade in & Slide Up)
      gsap.fromTo(
        ".collage-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".collage-header",
            scroller,
            start: "top bottom", // Trigger exactly when header enters bottom of screen
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Polaroid Cards Reveal Animations
      const wrappers = gsap.utils.toArray(".gallery-card-wrapper") as HTMLElement[];
      wrappers.forEach((wrapper) => {
        const card = wrapper.querySelector(".gallery-card") as HTMLElement;
        if (!card) return;

        const targetRotate = parseFloat(card.getAttribute("data-rotate") || "0");

        // Initial state: hidden, scaled down, and unrotated
        gsap.set(card, { opacity: 0, scale: 0.85, rotate: 0, force3D: true });

        // Trigger reveal when card wrapper enters lower viewport
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          rotate: targetRotate,
          duration: 0.8,
          ease: "back.out(1.2)", // Elegant snap-into-rotation bounce
          force3D: true,
          scrollTrigger: {
            trigger: wrapper,
            scroller,
            start: "top bottom", // Reveal exactly as card wrapper enters bottom of screen
            toggleActions: "play none none none",
          },
        });
      });

      // Refresh ScrollTrigger calculations
      ScrollTrigger.refresh();
      const t = setTimeout(() => ScrollTrigger.refresh(), 800);
      return () => clearTimeout(t);
    },
    { scope: sectionRef, dependencies: [mounted] }
  );

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FCEAEA] py-16 px-6 flex flex-col items-center select-none overflow-visible mt-12"
    >
      {/* Section Header */}
      <div className="collage-header flex flex-col items-center gap-2 mb-12">
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
      <div className="w-full max-w-[400px] flex flex-col gap-0 overflow-visible">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="gallery-card-wrapper w-full flex items-center justify-center overflow-visible"
            style={{
              position: "sticky",
              top: `${70 + i * 20}px`,
              height: "85vh",
              zIndex: i + 1,
            }}
          >
            {/* Polaroid card */}
            <div
              className="gallery-card bg-white shadow-[0_12px_36px_rgba(155,75,50,0.18)] border border-[#9B4B32]/5 flex flex-col overflow-hidden"
              data-rotate={photo.rotate}
              style={{
                borderRadius: "28px",
                padding: "16px 16px 16px 16px",
                width: "350px",
                transformOrigin: "center",
                willChange: "transform, opacity",
              }}
            >
              {/* Portrait Photo Container */}
              <div className="w-full aspect-[3/4] relative rounded-[16px] overflow-hidden bg-[#FAF6F0]">
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