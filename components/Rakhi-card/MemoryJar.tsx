"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export interface MemoryChit {
  id: string;
  text: string;          // the memory/inside joke
  tagline?: string;       // optional short handwritten accent line
  position: { x: number; y: number }; // relative % position inside jar (0-100)
  rotation?: number;      // default fold rotation angle
}

interface MemoryJarProps {
  chits?: MemoryChit[];
  jarLabel?: string;      // e.g. "Our Memory Jar"
}

const DEFAULT_CHITS: MemoryChit[] = [
  { id: "1", text: "When you hid my school bag in the closet and let me cry for two hours thinking I lost it 😂", tagline: "The great bag heist", position: { x: 30, y: 35 }, rotation: -12 },
  { id: "2", text: "Stealing the last piece of Kaju Katli from the box and successfully blaming the dog 🐕", tagline: "Partners in crime", position: { x: 65, y: 32 }, rotation: 18 },
  { id: "3", text: "The time we built a pillow fort castle in the living room and called it 'The Sibling Empire' 🏰", tagline: "Our cozy fort", position: { x: 48, y: 48 }, rotation: -5 },
  { id: "4", text: "Fighting over the TV remote until we accidentally threw it out of the window 📺", tagline: "Remote control wars", position: { x: 26, y: 64 }, rotation: 22 },
  { id: "5", text: "Covering for me when I sneaked out late, and charging a 'silence fee' of five chocolates 🍫", tagline: "The blackmailer sister", position: { x: 68, y: 60 }, rotation: -16 },
  { id: "6", text: "Our endless debates on who was adopted (spoiler: it's definitely you) 😜", tagline: "Adopted sibling lies", position: { x: 48, y: 78 }, rotation: 8 },
  { id: "7", text: "The legendary Rakhi when you tied five threads on my wrist just to demand five gifts 🎁", tagline: "Rakhi extortion", position: { x: 32, y: 50 }, rotation: -15 },
  { id: "8", text: "Sharing headphones on long train rides, listening to our favorite retro cassette songs on loop 🎧", tagline: "Shared melodies", position: { x: 65, y: 46 }, rotation: 10 }
];

export default function MemoryJar({
  chits = DEFAULT_CHITS,
  jarLabel = "Memory Jar",
}: MemoryJarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const jarRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [openedChits, setOpenedChits] = useState<Set<string>>(new Set());
  const [selectedChit, setSelectedChit] = useState<MemoryChit | null>(null);
  const [firstInteract, setFirstInteract] = useState(false);

  // ── Particle Sparks Burst ────────────────────────────────────────────────
  const burstCelebrationSparks = () => {
    if (!containerRef.current || !jarRef.current) return;
    const rect = jarRef.current.getBoundingClientRect();
    const cRect = containerRef.current.getBoundingClientRect();
    const count = 45;

    // Spawn sparks relative to the container from the center of the jar
    const startX = rect.left - cRect.left + rect.width / 2;
    const startY = rect.top - cRect.top + rect.height / 2;

    for (let i = 0; i < count; i++) {
      const spark = document.createElement("div");
      spark.className = "absolute w-2.5 h-2.5 rounded-full pointer-events-none z-50 bg-[#FBBF24]";
      spark.style.boxShadow = "0 0 10px #F5A623, 0 0 20px #FFF";
      spark.style.left = `${startX}px`;
      spark.style.top = `${startY}px`;

      containerRef.current.appendChild(spark);

      const angle = (i * (360 / count) * Math.PI) / 180;
      const distance = Math.random() * 200 + 80;
      const destX = startX + Math.cos(angle) * distance;
      const destY = startY + Math.sin(angle) * distance;

      gsap.to(spark, {
        left: destX,
        top: destY,
        opacity: 0,
        scale: 0.1,
        duration: Math.random() * 1.4 + 1.0,
        ease: "power2.out",
        onComplete: () => spark.remove(),
      });
    }
  };

  // ── Calculate Glow Metrics ────────────────────────────────────────────────
  const openedCount = openedChits.size;
  const intensity = chits.length > 0 ? openedCount / chits.length : 0;

  // ── Animate Jar Glow & Celebration on Count Changes ────────────────────────
  useGSAP(() => {
    if (!glowRef.current) return;

    const targetOpacity = 0.1 + intensity * 0.85; // starts at 10%, goes to 95%
    const targetScale = 1.0 + intensity * 0.35;   // grows scale up to 1.35x

    gsap.to(glowRef.current, {
      opacity: targetOpacity,
      scale: targetScale,
      duration: 0.8,
      ease: "power2.out",
    });

    // Final chit celebration burst
    if (openedCount === chits.length && chits.length > 0) {
      setTimeout(() => {
        burstCelebrationSparks();
        // Overshoot scale pulse on the glow
        gsap.fromTo(
          glowRef.current,
          { scale: targetScale * 1.25, opacity: 1 },
          { scale: targetScale, opacity: targetOpacity, duration: 1.2, ease: "power1.out" }
        );
      }, 500);
    }
  }, [openedCount, intensity]);

  // ── Floating Idle Animations ──────────────────────────────────────────────
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const tweens: gsap.core.Tween[] = [];

    chits.forEach((chit) => {
      // Float only unopened chits
      if (openedChits.has(chit.id)) {
        const el = document.getElementById(`chit-inner-${chit.id}`);
        if (el) gsap.killTweensOf(el);
        return;
      }

      const el = document.getElementById(`chit-inner-${chit.id}`);
      if (el) {
        gsap.killTweensOf(el);

        const dy = Math.random() * 8 - 4;       // vertical drift
        const dr = Math.random() * 6 - 3;        // rotation drift
        const dur = Math.random() * 1.5 + 2.5;   // 2.5s to 4s
        const del = Math.random() * 1.2;

        const tween = gsap.fromTo(
          el,
          { y: 0, rotation: chit.rotation || 0 },
          {
            y: `+=${dy}`,
            rotation: `+=${dr}`,
            duration: dur,
            delay: del,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          }
        );
        tweens.push(tween);
      }
    });

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => tweens.forEach((t) => t.play()),
      onLeave: () => tweens.forEach((t) => t.pause()),
      onEnterBack: () => tweens.forEach((t) => t.play()),
      onLeaveBack: () => tweens.forEach((t) => t.pause()),
    });

    return () => {
      tweens.forEach((t) => t.kill());
      trigger.kill();
    };
  }, [openedChits, chits]);

  // ── Handle Chit Tap / Unfold ──────────────────────────────────────────────
  const handleChitTap = (chit: MemoryChit) => {
    if (selectedChit) return; // ignore clicks when modal is open
    setFirstInteract(true);

    const el = document.getElementById(`chit-${chit.id}`);
    const innerEl = document.getElementById(`chit-inner-${chit.id}`);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setOpenedChits((prev) => {
        const next = new Set(prev);
        next.add(chit.id);
        return next;
      });
      setSelectedChit(chit);
      return;
    }

    if (innerEl) gsap.killTweensOf(innerEl);

    if (el) {
      gsap.killTweensOf(el);

      const tl = gsap.timeline();
      // Paper crumple squash
      tl.to(el, { scaleY: 1.2, scaleX: 0.8, duration: 0.15, ease: "power1.in" })
        // Pop unfold burst
        .to(el, { scaleX: 1.35, scaleY: 1.35, duration: 0.35, ease: "back.out(1.8)" })
        // Rising float lift
        .to(el, { y: "-=22", duration: 0.3, ease: "power2.out" }, "<")
        // Fade out as modal triggers
        .to(el, {
          opacity: 0,
          scale: 0.1,
          duration: 0.2,
          onComplete: () => {
            setOpenedChits((prev) => {
              const next = new Set(prev);
              next.add(chit.id);
              return next;
            });
            setSelectedChit(chit);
          },
        });
    } else {
      setSelectedChit(chit);
    }
  };

  // ── Handle Modal Card Close ───────────────────────────────────────────────
  const handleModalClose = () => {
    if (!selectedChit) return;
    const id = selectedChit.id;
    setSelectedChit(null);

    const el = document.getElementById(`chit-${id}`);
    const innerEl = document.getElementById(`chit-inner-${id}`);
    if (el) {
      gsap.killTweensOf(el);
      // Fade back in and pop into floating layout position
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.1, y: -20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          ease: "back.out(1.5)",
          onComplete: () => {
            if (!innerEl) return;
            gsap.killTweensOf(innerEl);

            const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (prefersReduced) return;

            const dy = Math.random() * 8 - 4;
            const dr = Math.random() * 6 - 3;
            const dur = Math.random() * 1.5 + 2.5;
            const chitObj = chits.find((c) => c.id === id);

            gsap.fromTo(
              innerEl,
              { y: 0, rotation: chitObj?.rotation || 0 },
              {
                y: `+=${dy}`,
                rotation: `+=${dr}`,
                duration: dur,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
              }
            );
          },
        }
      );
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full h-[120vh] py-24 px-6 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#FFF8F0" }}
    >
      <div className="w-full max-w-[430px] flex flex-col items-center select-none text-center">

        {/* Top small header */}
        <p
          className="text-xs font-semibold tracking-[0.25em] uppercase mb-2 text-stone-500 font-sans scroll-animate-text"
        >
          {jarLabel}
        </p>

        {/* Counter Tracker */}
        <p
          className="text-xs font-semibold text-stone-600 mb-8 font-sans"
        >
          {openedCount} of {chits.length} Memories Unlocked
        </p>

        {/* Jar Container */}
        <div ref={jarRef} className="relative w-[300px] h-[400px] flex items-center justify-center z-10">

          {/* Radial Gold Warm Glow (Behind Jar) */}
          <div
            ref={glowRef}
            className="absolute w-[360px] h-[360px] rounded-full pointer-events-none -z-10"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(245, 166, 35, 0.45) 0%, rgba(245, 166, 35, 0) 70%)",
              opacity: 0.1,
              filter: "blur(20px)",
              willChange: "transform, opacity",
            }}
          />

          {/* SVG Illustrated Glass Mason Jar */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <svg viewBox="0 0 320 440" className="w-full h-full drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Lid */}
              <rect x="110" y="20" width="100" height="24" rx="4" fill="url(#goldGrad)" stroke="#7A1F3D" strokeWidth="1.5" />
              <rect x="120" y="44" width="80" height="12" fill="#7A1F3D" opacity="0.85" />

              {/* Rim */}
              <path d="M100 56 H220 C220 56 220 72 205 76 H115 C100 72 100 56 100 56Z" fill="url(#glassGrad)" stroke="#7A1F3D" strokeWidth="1.5" opacity="0.9" />

              {/* Jar Glass Body */}
              <path d="M100 76 H220 C250 82 260 110 260 140 V380 C260 410 240 420 210 420 H110 C80 420 60 410 60 380 V140 C60 110 70 82 100 76Z" fill="url(#glassBodyGrad)" stroke="#7A1F3D" strokeWidth="1.5" strokeLinejoin="round" />

              {/* Glass Reflection Highlights */}
              <path d="M82 150 C82 130 92 92 110 84" stroke="#FFF" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
              <path d="M82 170 V360" stroke="#FFF" strokeWidth="2" strokeLinecap="round" opacity="0.2" />

              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#BF953F" />
                  <stop offset="25%" stopColor="#FCF6BA" />
                  <stop offset="50%" stopColor="#B38728" />
                  <stop offset="75%" stopColor="#FBF5B7" />
                  <stop offset="100%" stopColor="#AA771C" />
                </linearGradient>
                <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
                </linearGradient>
                <linearGradient id="glassBodyGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
                  <stop offset="40%" stopColor="rgba(253, 250, 247, 0.25)" />
                  <stop offset="100%" stopColor="rgba(255, 248, 240, 0.55)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Floating Memory Chits (Overlaid on top of SVG) */}
          <div className="absolute inset-0 z-20 overflow-hidden">
            {chits.map((chit) => {
              const isOpened = openedChits.has(chit.id);
              return (
                <div
                  key={chit.id}
                  style={{
                    position: "absolute",
                    left: `${chit.position.x}%`,
                    top: `${chit.position.y}%`,
                    transform: "translate(-50%, -50%)",
                    width: "36px",
                    height: "36px",
                  }}
                >
                  <motion.div
                    id={`chit-${chit.id}`}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      handleChitTap(chit);
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="w-full h-full cursor-pointer flex flex-col items-center justify-center"
                  >
                    {/* Folded Paper Chit Visual */}
                    <div 
                      id={`chit-inner-${chit.id}`}
                      className={`w-full h-full rounded-sm border shadow-sm relative overflow-hidden flex items-center justify-center transition-colors duration-300 ${
                        isOpened ? "bg-amber-100/50 border-amber-900/10 opacity-70" : "bg-amber-50 border-amber-900/15"
                      }`}
                      style={{
                        transform: `rotate(${chit.rotation || 0}deg)`,
                      }}
                    >
                      {/* Visual fold crease line */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-800/10 to-transparent pointer-events-none" />
                      
                      {/* Tiny visual writing lines on paper fold */}
                      <div className="w-4 h-[1.5px] bg-amber-900/15 mb-0.5 rounded-full" />
                      <div className="w-3 h-[1.5px] bg-amber-900/15 rounded-full" />

                      {/* Small sparkles badge for opened chits */}
                      {isOpened && (
                        <Sparkles className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 text-amber-600" />
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* First-load Action Hint text */}
        {!firstInteract && (
          <p className="mt-8 text-xs text-stone-500 font-sans tracking-wide animate-pulse">
            Tap a note to relive a memory
          </p>
        )}

        {/* Section Divider Accent */}
        <div className="mt-16 text-amber-700/20 text-[10px] tracking-[0.8em] select-none" aria-hidden="true">
          ✦ ── ✦ ── ✦
        </div>

        {/* Detailed Card Modal Overlay (Dimmed reading viewport) */}
        <AnimatePresence>
          {selectedChit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.55 }}
                exit={{ opacity: 0 }}
                onClick={handleModalClose}
                className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"
              />

              {/* Memory Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 25 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative bg-[#FFFBF7] p-8 pb-10 rounded-sm border border-stone-200/50 shadow-2xl max-w-[360px] w-full text-center flex flex-col items-center"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(122,31,61,0.35)",
                }}
              >
                {/* Close Button */}
                <button
                  onClick={handleModalClose}
                  className="absolute top-3 right-3 text-stone-400 hover:text-stone-700 transition-colors w-8 h-8 rounded-full flex items-center justify-center hover:bg-stone-100"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Memory Seal Logo */}
                <div className="w-10 h-10 rounded-full bg-[#7A1F3D]/5 flex items-center justify-center text-[#7A1F3D] mb-6">
                  <Sparkles className="w-4 h-4 fill-current text-[#7A1F3D]" />
                </div>

                {/* Inside Joke Memory Body Text */}
                <p
                  className="text-stone-800 text-[15px] font-medium leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-crimson-pro), Georgia, serif" }}
                >
                  &ldquo;{selectedChit.text}&rdquo;
                </p>

                {/* Tagline Accent Line */}
                {selectedChit.tagline && (
                  <>
                    <div className="w-10 h-[1px] bg-amber-800/10 mb-4" />
                    <p
                      className="text-amber-800 text-[1.6rem]"
                      style={{ fontFamily: "var(--font-dancing, cursive)" }}
                    >
                      — {selectedChit.tagline}
                    </p>
                  </>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
