"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, AnimatePresence } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronsLeftRight } from "lucide-react";

interface ThenAndNowProps {
  beforeImage: string;   // childhood photo URL
  afterImage: string;    // recent photo URL
  beforeLabel?: string;  // e.g. "Age 6"
  afterLabel?: string;   // e.g. "Age 26"
  captions: { threshold: number; text: string }[];
}

export default function ThenAndNow({
  beforeImage,
  afterImage,
  beforeLabel = "Then",
  afterLabel = "Now",
  captions,
}: ThenAndNowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dividerGlowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const [sliderPct, setSliderPct] = useState(50);
  const [isShimmering, setIsShimmering] = useState(true);
  const [hideHelper, setHideHelper] = useState(false);

  // Framer Motion value for drag handle x translation
  const handleX = useMotionValue(0);

  // ── Sync Motion Value on Resize or Mount ──────────────────────────────────
  const syncHandlePosition = useCallback(() => {
    if (!trackRef.current) return;
    const trackWidth = trackRef.current.clientWidth;
    handleX.set(trackWidth * (sliderPct / 100));
  }, [sliderPct, handleX]);

  useEffect(() => {
    syncHandlePosition();
    window.addEventListener("resize", syncHandlePosition);
    return () => window.removeEventListener("resize", syncHandlePosition);
  }, [syncHandlePosition]);

  // Fade out helper text after 4 seconds automatically
  useEffect(() => {
    const t = setTimeout(() => {
      setHideHelper(true);
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  // ── Find active caption (Step Function) ───────────────────────────────────
  const activeCaption = useMemo(() => {
    if (!captions || captions.length === 0) return "";
    const sorted = [...captions].sort((a, b) => a.threshold - b.threshold);
    let matched = sorted[0];
    for (let i = 0; i < sorted.length; i++) {
      if (sliderPct >= sorted[i].threshold) {
        matched = sorted[i];
      }
    }
    return matched ? matched.text : "";
  }, [sliderPct, captions]);

  const [renderedText, setRenderedText] = useState(activeCaption);
  const prevCaptionRef = useRef(activeCaption);

  // ── Caption Text Transition (GSAP) ────────────────────────────────────────
  useGSAP(() => {
    if (activeCaption !== prevCaptionRef.current) {
      const el = textRef.current;
      if (el) {
        gsap.killTweensOf(el);
        // Animate old caption out
        gsap.to(el, {
          opacity: 0,
          filter: "blur(6px)",
          y: -6,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setRenderedText(activeCaption);
            // Animate new caption in
            gsap.fromTo(
              el,
              { opacity: 0, filter: "blur(6px)", y: 6 },
              { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.4, ease: "power2.out" }
            );
          },
        });
      }
      prevCaptionRef.current = activeCaption;
    }
  }, [activeCaption]);

  // ── Idle Shimmer Animation ────────────────────────────────────────────────
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    if (isShimmering && dividerGlowRef.current) {
      gsap.killTweensOf(dividerGlowRef.current);
      gsap.fromTo(
        dividerGlowRef.current,
        { opacity: 0.4 },
        {
          opacity: 1,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );
    } else if (dividerGlowRef.current) {
      gsap.killTweensOf(dividerGlowRef.current);
      gsap.set(dividerGlowRef.current, { opacity: 0 });
    }
  }, [isShimmering]);

  // ── Slider Drag Event ─────────────────────────────────────────────────────
  const handleDrag = () => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const currentX = handleX.get();
    const pct = Math.max(0, Math.min(100, (currentX / rect.width) * 100));
    setSliderPct(pct);
    setIsShimmering(false);
    setHideHelper(true);
  };

  // ── Jump to click/tap coordinates ──────────────────────────────────────────
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;

    // Ignore click events if targeting the handle directly
    const target = e.target as HTMLElement;
    if (target.closest(".slider-handle")) return;

    const rect = trackRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;

    setIsShimmering(false);
    setHideHelper(true);

    // Smooth GSAP transition for jumping
    gsap.killTweensOf(handleX);
    gsap.to(handleX, {
      value: relativeX,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        const currentX = handleX.get();
        setSliderPct(Math.max(0, Math.min(100, (currentX / rect.width) * 100)));
      },
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full h-[120vh] pt-30  pb-20 px-6 flex flex-col items-center justify-center"
      style={{ background: "#FFF8F0" }}
    >
      <div className="w-full max-w-[430px] flex flex-col items-center select-none">

        {/* Animated Helper Text */}
        <AnimatePresence>
          {!hideHelper && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="text-[10px] tracking-[0.2em] uppercase font-bold text-stone-500/80 mb-4 font-sans text-center"
            >
              ← Drag to travel through time →
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shared Polaroid frame container */}
        <div
          className="relative bg-white p-4 pb-14 rounded-sm flex flex-col items-center w-full"
          style={{
            boxShadow: "0 10px 30px rgba(122,31,61,0.12), 0 4px 10px rgba(122,31,61,0.06)",
          }}
        >
          {/* Sibling Age Washi Tags */}
          <div
            className="absolute top-2 left-2 bg-[#FDF6E2] border border-amber-800/10 px-3 py-0.5 shadow-sm -rotate-6 text-[10px] font-bold text-amber-900 z-40 rounded-sm font-sans"
            style={{ fontFamily: "var(--font-body, Poppins, sans-serif)" }}
          >
            {beforeLabel}
          </div>
          <div
            className="absolute top-2 right-2 bg-[#FDF6E2] border border-amber-800/10 px-3 py-0.5 shadow-sm rotate-6 text-[10px] font-bold text-amber-900 z-40 rounded-sm font-sans"
            style={{ fontFamily: "var(--font-body, Poppins, sans-serif)" }}
          >
            {afterLabel}
          </div>

          {/* Slider Comparison Frame */}
          <div
            ref={trackRef}
            onClick={handleTrackClick}
            className="relative w-full aspect-[4/5] rounded-[8px] overflow-hidden cursor-ew-resize select-none"
          >
            {/* 1. Base Layer (After Image - Recent Photo) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={afterImage}
                alt="Sibling Now"
                fill
                priority
                className="object-cover pointer-events-none"
                sizes="(max-width: 430px) 100vw, 400px"
              />
            </div>

            {/* 2. Top Layer (Before Image - Childhood Photo) clipped */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                clipPath: `polygon(0 0, ${sliderPct}% 0, ${sliderPct}% 100%, 0 100%)`,
              }}
            >
              <Image
                src={beforeImage}
                alt="Sibling Then"
                fill
                priority
                className="object-cover pointer-events-none"
                sizes="(max-width: 430px) 100vw, 400px"
              />
            </div>

            {/* 3. Divider Gold Line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-[#F5A623] pointer-events-none z-20"
              style={{ left: `${sliderPct}%` }}
            >
              {/* Soft gold shimmer glow */}
              <div
                ref={dividerGlowRef}
                className="absolute inset-0 bg-[#FBBF24]/60 blur-[3px] pointer-events-none"
              />
            </div>

            {/* 4. Draggable Cream Handle */}
            <motion.div
              drag="x"
              dragConstraints={trackRef}
              dragElastic={0}
              dragMomentum={false}
              style={{ x: handleX }}
              onDrag={handleDrag}
              className="slider-handle absolute top-0 bottom-0 w-[44px] -ml-[22px] flex items-center justify-center z-30 cursor-grab active:cursor-grabbing"
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-[#FFFBF7] border-2 border-[#7A1F3D] shadow-[0_4px_10px_rgba(122,31,61,0.25)] flex items-center justify-center text-[#7A1F3D] active:scale-95 transition-transform duration-150"
              >
                <ChevronsLeftRight className="w-4 h-4 stroke-[2.5]" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Cursive Caption Text */}
        <div className="mt-8 min-h-[60px] text-center w-full px-4">
          <p
            ref={textRef}
            className="text-[1.8rem] text-[#7A1F3D] leading-relaxed select-none"
            style={{
              fontFamily: "var(--font-dancing, cursive)",
            }}
          >
            {renderedText}
          </p>
        </div>

        {/* Section Divider Accent */}
        <div className="mt-8 text-amber-700/20 text-[10px] tracking-[0.8em] select-none" aria-hidden="true">
          ✦ ── ✦ ── ✦
        </div>
      </div>
    </section>
  );
}
