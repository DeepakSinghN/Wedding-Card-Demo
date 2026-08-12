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

const photos = [
  { src: PhotoTop, alt: "Moment 1" },
  { src: PhotoMidLeft, alt: "Moment 2" },
  { src: PhotoMidCenter, alt: "Moment 3" },
  { src: PhotoMidRight, alt: "Moment 4" },
  { src: PhotoBottom, alt: "Moment 5" },
];

export default function Collage() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const strokeRefs = useRef<(SVGSVGElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      // Guard: always check prefers-reduced-motion (GSAP skill rule)
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!outerRef.current || !stageRef.current || !trackRef.current) return;

      // Pass custom Lenis scroller explicitly (GSAP skill: Lenis section)
      const scroller = outerRef.current.closest("#card-scroll-container");
      if (!scroller) return;

      const items = photoRefs.current.filter(Boolean) as HTMLDivElement[];
      const strokes = strokeRefs.current.filter(Boolean) as SVGSVGElement[];
      if (items.length === 0) return;

      const imageWidth = 260; // width of each image container in px
      const gap = 32;        // gap between images in px
      const step = imageWidth + gap;

      // Calculate total translation needed to scroll from first image center to last image center
      const totalDist = (items.length - 1) * step;

      // ── Initial States ───────────────────────────────────────────────────
      // First image is active (scale 1.08, opacity 1, gold brushstroke visible)
      // Other images are inactive (scale 0.9, opacity 0.45, gold brushstroke scaleX 0)
      gsap.set(items[0], { scale: 1.08, opacity: 1 });
      gsap.set(strokes[0], { scaleX: 1 });
      
      if (items.length > 1) {
        gsap.set(items.slice(1), { scale: 0.9, opacity: 0.45 });
        gsap.set(strokes.slice(1), { scaleX: 0 });
      }

      // ── Pinned Horizontal Timeline ───────────────────────────────────────
      // Trigger: outerRef (tall scroll space, e.g., 400vh)
      // Pin: stageRef via CSS position:sticky (robust for Lenis custom scroller)
      // ease: "none" is REQUIRED for smooth scrub scroll-sync (GSAP skill rule)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          scroller,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Animate horizontal slide of the track
      tl.to(
        trackRef.current,
        {
          x: -totalDist,
          ease: "none",
        },
        0
      );

      // 2. Animate scale, opacity, and brushstrokes for each active index
      const segmentDuration = 1 / (items.length - 1);

      items.forEach((_, i) => {
        if (i === 0) return;

        const startProgress = (i - 1) * segmentDuration;
        const endProgress = i * segmentDuration;

        // OUTGOING image (scale down, fade out, hide brushstroke)
        tl.to(
          items[i - 1],
          { scale: 0.9, opacity: 0.45, ease: "none", duration: segmentDuration },
          startProgress
        );
        tl.to(
          strokes[i - 1],
          { scaleX: 0, ease: "none", duration: segmentDuration },
          startProgress
        );

        // INCOMING image (scale up, fade in, reveal brushstroke)
        tl.to(
          items[i],
          { scale: 1.08, opacity: 1, ease: "none", duration: segmentDuration },
          startProgress
        );
        tl.to(
          strokes[i],
          { scaleX: 1, ease: "none", duration: segmentDuration },
          startProgress
        );
      });

      // Refresh ScrollTrigger positions after layout renders
      const t = setTimeout(() => ScrollTrigger.refresh(), 800);
      return () => clearTimeout(t);
    },
    { scope: outerRef }
  );

  if (!mounted) return null;

  return (
    // outerRef: tall scroll-distance wrapper (400vh)
    <div
      ref={outerRef}
      className="relative w-full flex-shrink-0"
      style={{ height: `${photos.length * 80}vh` }}
    >
      {/* stageRef: viewport-height sticky stage */}
      <div
        ref={stageRef}
        className="w-full bg-[#FCEAEA] flex flex-col items-center justify-between"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          paddingTop: "clamp(20px, 6vh, 44px)",
          paddingBottom: "clamp(24px, 7vh, 52px)",
        }}
      >
        {/* Section header */}
        <div className="flex flex-col items-center gap-1 z-10">
          <p
            className="tracking-[2px] text-[#9B4B32]/70"
            style={{
              fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive",
              fontSize: "clamp(2rem, 8cqi, 3rem)",
            }}
          >
            Our Moments
          </p>
          <div
            className="w-24 h-0.5"
            style={{
              background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
            }}
          />
        </div>

        {/* ── Fixed Center Overlay Text ─────────────────────────────────── */}
        {/* z-20 sits on top of film strip cards. pointer-events-none keeps scrolling active */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-20"
          style={{ transform: "translateY(clamp(-10px, -2vh, -30px))" }}
        >
          <h2
            className="text-white drop-shadow-[0_4px_16px_rgba(122,46,31,0.5)] font-normal text-center"
            style={{
              fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive",
              fontSize: "clamp(3.8rem, 15cqi, 5.2rem)",
              lineHeight: 1.1,
            }}
          >
            I said yes!
          </h2>
        </div>

        {/* ── Horizontal Film Strip Container ────────────────────────────── */}
        {/* Centered vertically, width is dynamically scaled */}
        <div
          className="w-full relative flex items-center"
          style={{ height: "400px", overflow: "visible" }}
        >
          <div
            ref={trackRef}
            className="absolute flex items-center"
            style={{
              // Start position: the center of the first card (at index 0) aligned with the viewport center
              left: "50%",
              transform: "translateX(-130px)", // Translate by half of W (260/2)
              gap: "32px",
              overflow: "visible",
            }}
          >
            {photos.map((photo, i) => (
              <div
                key={i}
                ref={(el) => { photoRefs.current[i] = el; }}
                className="flex flex-col items-center flex-shrink-0"
                style={{
                  width: "260px",
                  willChange: "transform, opacity",
                }}
              >
                {/* Image card wrapper */}
                <div
                  className="w-full aspect-[3/4] bg-white shadow-[0_12px_36px_rgba(155,75,50,0.12)] relative overflow-hidden"
                  style={{
                    borderRadius: "24px",
                    border: "6px solid white",
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="260px"
                    className="object-cover pointer-events-none select-none"
                    priority={i === 0}
                  />
                </div>

                {/* ── Under-Image Gold Brushstroke ────────────────────────── */}
                {/* scaleX is animated by GSAP. transformOrigin center makes it draw from inside out */}
                <svg
                  ref={(el) => { strokeRefs.current[i] = el; }}
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  className="w-32 h-3 mt-4 text-[#C9A84C]"
                  style={{
                    transformOrigin: "center",
                    willChange: "transform",
                  }}
                >
                  <path
                    d="M5,5 Q30,2 50,8 T95,5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Small footer pagination indicator dots */}
        <div className="flex justify-center gap-2.5 z-10">
          {photos.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#9B4B32]/25"
              style={{
                background: i === 0 ? "#C9A84C" : undefined,
                opacity: i === 0 ? 1 : 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}