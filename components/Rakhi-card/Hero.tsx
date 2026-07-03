"use client";

/**
 * Hero.tsx — Raksha Bandhan greeting card hero section.
 *
 * DESIGN: Gift-card layout divided by a decorative ribbon cross:
 *   ┌───────────────┬──╮───────────────────────┐
 *   │  HAPPY        │  │   [PHOTO 1]           │
 *   │  RAKSHA       │  │                       │
 *   │  BANDHAN      │  │                       │
 *   │  [NAME]       │  │                       │
 *   ├───────────────┼──╋─ribbon cross──────────┤
 *   │  [PHOTO 2]    │ bow │   [PHOTO 3]        │
 *   │               │  │   "tagline"           │
 *   └───────────────┴──╯───────────────────────┘
 *
 * BANGER ANIMATION SEQUENCE (GSAP + motion):
 *   0.00s  Background fades in
 *   0.10s  Vertical ribbon draws top→bottom
 *   0.20s  Horizontal ribbon draws left→right
 *   0.50s  Bow drops + spring-bounces into center
 *   0.70s  Photo 1 — clip-path iris-open reveal + scale
 *   0.85s  Photo 2 — clip-path wipe-up reveal
 *   1.00s  Photo 3 — clip-path wipe-up reveal
 *   1.10s  Headline lines explode in one-by-one (scale 3→1 + blur)
 *   1.55s  Recipient name punches in with a scale overshoot
 *   1.80s  Tagline fades up
 *   1.90s  CTA scales in + pulse loop starts
 *
 * Edit CARD_CONTENT below to customise all copy.
 */

import { useRef, useState, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ─── EDIT THESE ───────────────────────────────────────────────────────────────
const CARD_CONTENT = {
  headlineLines: ["HAPPY", "RAKSHA", "BANDHAN"],
  recipientName: "NEHA",
  tagline: "with love, always.",
  ctaLabel: "Open Your Rakhi ✨",

  // Replace these paths with your own photos in /public
  photo1: "/Rakhi-card-media/photo-1.webp",
  photo2: "/Rakhi-card-media/photo-2.jpg",
  photo3: "/Rakhi-card-media/photo-3.jpg",
};
// ──────────────────────────────────────────────────────────────────────────────

// ─── Ribbon BOW SVG ──────────────────────────────────────────────────────────
function RibbonBow() {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Left loop */}
      <path
        d="M60 40 C40 15, 5 12, 10 32 C14 48, 45 50, 60 40Z"
        fill="var(--rakhi-thread-red)"
        stroke="var(--rakhi-maroon)"
        strokeWidth="0.8"
      />
      <path
        d="M60 40 C42 22, 18 20, 20 33 C22 43, 46 46, 60 40Z"
        fill="var(--rakhi-maroon)"
        opacity="0.35"
      />
      {/* Right loop */}
      <path
        d="M60 40 C80 15, 115 12, 110 32 C106 48, 75 50, 60 40Z"
        fill="var(--rakhi-thread-red)"
        stroke="var(--rakhi-maroon)"
        strokeWidth="0.8"
      />
      <path
        d="M60 40 C78 22, 102 20, 100 33 C98 43, 74 46, 60 40Z"
        fill="var(--rakhi-maroon)"
        opacity="0.35"
      />
      {/* Left tail */}
      <path
        d="M60 40 C50 52, 25 68, 15 78"
        stroke="var(--rakhi-thread-red)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Right tail */}
      <path
        d="M60 40 C70 52, 95 68, 105 78"
        stroke="var(--rakhi-thread-red)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Centre knot */}
      <ellipse cx="60" cy="40" rx="9" ry="7" fill="var(--rakhi-maroon)" />
      <ellipse cx="60" cy="40" rx="6" ry="4.5" fill="var(--rakhi-thread-red)" />
      <circle cx="60" cy="40" r="2.5" fill="var(--rakhi-gold)" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Hero() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  // Ribbon path refs for GSAP stroke-draw
  const vRibbonRef = useRef<HTMLDivElement>(null);
  const hRibbonRef = useRef<HTMLDivElement>(null);
  const bowRef = useRef<HTMLDivElement>(null);

  // Photo + text panel refs
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const photo3Ref = useRef<HTMLDivElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const [muted, setMuted] = useState(true);
  const [ctaPulsing, setCtaPulsing] = useState(false);
  const confettiFired = useRef(false);

  // ── Confetti ───────────────────────────────────────────────────────────────
  const fireConfetti = useCallback(() => {
    if (confettiFired.current || prefersReduced) return;
    confettiFired.current = true;
    confetti({
      particleCount: 55,
      spread: 75,
      origin: { x: 0.5, y: 0.4 },
      colors: ["#F5A623", "#FFD36E", "#7A1F3D", "#FFF8F0", "#C0392B"],
      startVelocity: 28,
      gravity: 1.1,
      scalar: 0.9,
      ticks: 200,
    });
  }, [prefersReduced]);

  // ── CTA scroll ────────────────────────────────────────────────────────────
  const handleCta = useCallback(() => {
    const next = document.getElementById("rakhi-next-section");
    if (!next) return;
    const lenis = (window as unknown as Record<string, unknown>).lenis as {
      scrollTo: (t: Element, o: object) => void;
    } | undefined;
    if (lenis?.scrollTo) {
      lenis.scrollTo(next, { duration: 1.2 });
    } else {
      next.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // ── GSAP master timeline ──────────────────────────────────────────────────
  useGSAP(
    () => {
      if (prefersReduced) {
        // instant reveal for reduced-motion users
        gsap.set(
          [vRibbonRef.current, hRibbonRef.current, bowRef.current,
          photo1Ref.current, photo2Ref.current, photo3Ref.current,
          textPanelRef.current, taglineRef.current, ctaRef.current,
          ".hero-line", ".hero-name"],
          { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1, y: 0, x: 0, filter: "none" }
        );
        setCtaPulsing(true);
        return;
      }

      // ── Initial hidden states ───────────────────────────────────────────
      gsap.set(vRibbonRef.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(hRibbonRef.current, { scaleX: 0, transformOrigin: "center left" });
      gsap.set(bowRef.current, { opacity: 0, scale: 0, y: -40 });
      gsap.set(photo1Ref.current, { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 });
      gsap.set(photo2Ref.current, { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 });
      gsap.set(photo3Ref.current, { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 });
      gsap.set(".hero-line", { opacity: 0, scale: 3, filter: "blur(16px)", y: -20 });
      gsap.set(".hero-name", { opacity: 0, scale: 4, filter: "blur(20px)" });
      gsap.set(taglineRef.current, { opacity: 0, y: 14 });
      gsap.set(ctaRef.current, { opacity: 0, scale: 0.8 });

      const tl = gsap.timeline({
        onComplete: () => {
          fireConfetti();
          setCtaPulsing(true);
        },
      });

      // Step 1 (0.10s): Vertical ribbon draws top→bottom
      tl.to(vRibbonRef.current, {
        scaleY: 1, duration: 0.55, ease: "power3.out",
      }, 0.1);

      // Step 2 (0.20s): Horizontal ribbon draws left→right
      tl.to(hRibbonRef.current, {
        scaleX: 1, duration: 0.55, ease: "power3.out",
      }, 0.2);

      // Step 3 (0.50s): Bow drops + spring bounce
      tl.to(bowRef.current, {
        opacity: 1, scale: 1, y: 0,
        duration: 0.6, ease: "back.out(2.2)",
      }, 0.5);

      // Step 4 (0.70s): Photo 1 — iris-open wipe reveal
      tl.to(photo1Ref.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: 0.65,
        ease: "expo.out",
      }, 0.7);

      // Step 5 (0.85s): Photo 2 — wipe up
      tl.to(photo2Ref.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: 0.65,
        ease: "expo.out",
      }, 0.85);

      // Step 6 (1.00s): Photo 3 — wipe up
      tl.to(photo3Ref.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: 0.65,
        ease: "expo.out",
      }, 1.0);

      // Step 7 (1.10s): Headline lines explode in — scale + blur
      tl.to(".hero-line", {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "back.out(1.5)",
      }, 1.1);

      // Step 8 (1.55s): Recipient name punches in
      tl.to(".hero-name", {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.45,
        ease: "back.out(2.0)",
      }, 1.55);

      // Step 9 (1.80s): Tagline fades up
      tl.to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      }, 1.8);

      // Step 10 (1.90s): CTA scales in
      tl.to(ctaRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.8)",
      }, 1.9);

      // ── Scroll-Linked Parallax Effect ─────────────────────────────────────
      // As the user scrolls down, the sticky Hero section will scale down slightly
      // and fade out as the incoming section slides up over it.
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: false,
        },
        opacity: 0.25,
        scale: 0.94,
        ease: "none",
      });

      // ── Curved Overlap Animation ──────────────────────────────────────────
      // Morph the top corners of the incoming section from a deep curve (100px)
      // to a flat edge (0px) as it rolls up to cover the screen.
      // We wrap this in a requestAnimationFrame to ensure the sibling element
      // '#rakhi-next-section' is fully mounted in the DOM.
      requestAnimationFrame(() => {
        const nextSection = document.getElementById("rakhi-next-section");
        if (nextSection) {
          gsap.fromTo(nextSection,
            {
              borderTopLeftRadius: "100px",
              borderTopRightRadius: "100px",
            },
            {
              scrollTrigger: {
                trigger: nextSection,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px",
              ease: "none",
            }
          );
        }
      });
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      aria-label="Raksha Bandhan Greeting Card Hero"
      className="sticky top-0 z-10 w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden hero-bg"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* ── Subtle mandala background ─────────────────────────────────────── */}
      <div className="absolute inset-0 hero-mandala pointer-events-none" aria-hidden="true" />

      {/* ── Mute toggle ───────────────────────────────────────────────────── */}
      <motion.button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute music" : "Mute music"}
        className={cn(
          "absolute top-4 right-4 z-50",
          "flex items-center justify-center w-11 h-11 rounded-full",
          "bg-white/30 backdrop-blur-sm border border-white/40",
          "text-[var(--rakhi-maroon)]"
        )}
        style={{ top: "calc(1rem + env(safe-area-inset-top))" }}
        whileTap={{ scale: 0.88 }}
        whileHover={{ scale: 1.1 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={muted ? "m" : "u"}
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6, rotate: 20 }}
            transition={{ duration: 0.18 }}
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* ════════════════════════════════════════════════════════════════════
          CARD LAYOUT — 2-col × 2-row grid divided by a ribbon cross
          ════════════════════════════════════════════════════════════════ */}
      <div
        className="relative w-full max-w-[430px] mx-auto"
        style={{
          minHeight: "min(100dvh, 760px)",
          display: "grid",
          /* Col split ~42% / 58% */
          gridTemplateColumns: "42% 58%",
          /* Row split: top half / ribbon band / bottom half */
          gridTemplateRows: "1fr 64px 1fr",
          padding: "0 0 0 0",
        }}
      >
        {/* ── TOP-LEFT: Headline text panel ─────────────────────────────── */}
        <div
          ref={textPanelRef}
          className="flex flex-col justify-center pl-6 pr-3 py-8"
          style={{ gridColumn: "1", gridRow: "1" }}
        >
          <h1 className="sr-only">
            {CARD_CONTENT.headlineLines.join(" ")} {CARD_CONTENT.recipientName}
          </h1>
          <div aria-hidden="true" className="flex flex-col gap-[2px] relative">
            {CARD_CONTENT.headlineLines.map((line, i) => (
              <span
                key={i}
                className="hero-line block"
                style={{
                  fontFamily: "var(--font-display, 'Playfair Display', serif)",
                  fontWeight: 700,
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  letterSpacing: "0.18em",
                  color: "var(--rakhi-maroon)",
                  lineHeight: 1.15,
                }}
              >
                {line}
              </span>
            ))}
            <span
              className="hero-name block mt-2 relative w-fit"
              style={{
                fontFamily: "var(--font-display, 'Playfair Display', serif)",
                fontWeight: 700,
                fontSize: "clamp(1.4rem, 7vw, 2rem)",
                letterSpacing: "0.18em",
                color: "var(--rakhi-thread-red)",
                lineHeight: 1.15,
              }}
            >
              {CARD_CONTENT.recipientName}

              {/* Butterfly start target anchor */}
              <span id="butterfly-start-anchor" className="absolute -bottom-8 left-4 w-12 h-12 pointer-events-none opacity-0" />
            </span>
          </div>
        </div>

        {/* ── TOP-RIGHT: Photo 1 ────────────────────────────────────────── */}
        <div
          ref={photo1Ref}
          className="relative overflow-hidden"
          style={{
            gridColumn: "2",
            gridRow: "1",
            margin: "32px 12px 10px 20px",
            borderRadius: "4px",
          }}
        >
          <Image
            src={CARD_CONTENT.photo1}
            alt="Sibling moment 1"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 430px) 58vw, 250px"
          />
        </div>

        {/* ── RIBBON ROW: horizontal band + vertical line + BOW ─────────── */}
        {/* Horizontal ribbon */}
        <div
          ref={hRibbonRef}
          aria-hidden="true"
          style={{
            gridColumn: "1 / -1",
            gridRow: "2",
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Full-width horizontal stripe */}
          <div
            className="w-full"
            style={{
              height: "7px",
              background: "var(--rakhi-thread-red)",
              opacity: 0.9,
            }}
          />
        </div>

        {/* Vertical ribbon — absolutely positioned, full height of card */}
        <div
          ref={vRibbonRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "42%",
            top: 0,
            bottom: 0,
            width: "7px",
            background: "var(--rakhi-thread-red)",
            opacity: 0.9,
            zIndex: 10,
          }}
        />

        {/* BOW — centred at the ribbon cross-point */}
        <div
          ref={bowRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "calc(42% - 46px)",
            top: "calc(50% - 40px)",
            width: "92px",
            height: "80px",
            zIndex: 20,
          }}
        >
          <RibbonBow />
        </div>

        {/* ── BOTTOM-LEFT: Photo 2 ──────────────────────────────────────── */}
        <div
          ref={photo2Ref}
          className="relative overflow-hidden"
          style={{
            gridColumn: "1",
            gridRow: "3",
            margin: "10px 8px 50px 8px",
            borderRadius: "4px",
          }}
        >
          <Image
            src={CARD_CONTENT.photo2}
            alt="Sibling moment 2"
            fill
            className="object-cover"
            sizes="(max-width: 430px) 42vw, 180px"
          />
        </div>

        {/* ── BOTTOM-RIGHT: Photo 3 + tagline ──────────────────────────── */}
        <div
          style={{
            gridColumn: "2",
            gridRow: "3",
            display: "flex",
            flexDirection: "column",
            margin: "0 12px 12px 20px",
            gap: "6px",
          }}
        >
          <div
            ref={photo3Ref}
            className="relative overflow-hidden flex-1"
            style={{ borderRadius: "4px", minHeight: 0 }}
          >
            <Image
              src={CARD_CONTENT.photo3}
              alt="Sibling moment 3"
              fill
              className="object-cover"
              sizes="(max-width: 430px) 58vw, 250px"
            />
          </div>

          {/* Tagline + CTA below photo 3 */}
          <p
            ref={taglineRef}
            style={{
              fontFamily: "var(--font-display, 'Playfair Display', serif)",
              fontStyle: "italic",
              fontSize: "0.78rem",
              color: "var(--rakhi-text-secondary)",
              paddingLeft: "2px",
            }}
          >
            {CARD_CONTENT.tagline}
          </p>
        </div>
      </div>

      {/* ── CTA below the card grid ───────────────────────────────────────── */}
      <div className="relative z-30 mt-6 pb-4 flex flex-col items-center gap-3"
        style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}>

        {/* Scroll chevron */}
        <motion.div
          aria-hidden="true"
          animate={prefersReduced ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} style={{ color: "var(--rakhi-maroon)", opacity: 0.45 }} />
        </motion.div>
      </div>
    </section>
  );
}
