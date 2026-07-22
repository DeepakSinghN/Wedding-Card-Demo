"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import SplitText from "gsap/src/SplitText";
import { Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, SplitText);

const CARD_CONTENT = {
  headlineLines: ["HAPPY", "RAKSHA", "BANDHAN"],
  recipientName: "Komal",
  tagline: "Wishing you a wonderful Rakhi filled with happiness, love, laughter, and unforgettable beautiful memories. ❤️",
  ctaLabel: "Open Your Rakhi ✨",
  photo1: "/Rakhi-card-media/photo-1.webp",
  photo2: "/Rakhi-card-media/photo-2.jpg",
  photo3: "/Rakhi-card-media/photo-3.jpg",
};

export interface HeroPhoto {
  id: string;
  src: string;
  caption: string;
  size: "focal" | "large" | "medium" | "small";
  position: { top: string; left?: string; right?: string };
  rotation: number;
  zIndex: number;
}

export interface HeroCollageProps {
  name?: string;
  subtitle?: string;
  photos?: HeroPhoto[];
}

const DEFAULT_PHOTOS: HeroPhoto[] = [
  {
    id: "focal",
    src: CARD_CONTENT.photo3,
    caption: "Always together 🌸",
    size: "focal",
    position: { top: "2%", left: "calc(50% - 95px)" },
    rotation: -2,
    zIndex: 2,
  },
  {
    id: "left",
    src: CARD_CONTENT.photo1,
    caption: "Double trouble 🪢",
    size: "medium",
    position: { top: "32%", left: "5%" },
    rotation: 6,
    zIndex: 3,
  },
  {
    id: "right",
    src: CARD_CONTENT.photo2,
    caption: "Mischief makers 🍂",
    size: "large",
    position: { top: "35%", right: "5%" },
    rotation: -5,
    zIndex: 3,
  },
  {
    id: "accent",
    src: CARD_CONTENT.photo1,
    caption: "Childhood steps 🌸",
    size: "small",
    position: { top: "64%", left: "30%" },
    rotation: -4,
    zIndex: 1,
  }
];

export default function Hero({
  name = CARD_CONTENT.recipientName,
  subtitle = CARD_CONTENT.tagline,
  photos = DEFAULT_PHOTOS
}: HeroCollageProps) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  const titleAreaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const collageContainerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLButtonElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const shardRefs = useRef<HTMLDivElement[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  const [muted, setMuted] = useState(true);
  const [isOpening, setIsOpening] = useState(false);

  // ── Scroll Lock on Mount ──────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    let lenisTimer: NodeJS.Timeout;

    const lockLenis = () => {
      const lenis = (window as unknown as Record<string, unknown>).lenis as { stop: () => void } | undefined;
      if (lenis?.stop) {
        lenis.stop();
      } else {
        lenisTimer = setTimeout(lockLenis, 50);
      }
    };

    lockLenis();

    return () => {
      clearTimeout(lenisTimer);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      const lenis = (window as unknown as Record<string, unknown>).lenis as { start: () => void } | undefined;
      if (lenis?.start) {
        lenis.start();
      }
    };
  }, []);

  // ── Scroll to next section ────────────────────────────────────────────────
  const handleCta = useCallback(() => {
    const next = document.getElementById("rakhi-next-section");
    if (!next) return;
    const lenis = (window as unknown as Record<string, unknown>).lenis as {
      scrollTo: (t: Element, o: object) => void;
    } | undefined;
    if (lenis?.scrollTo) {
      // Slowed down to 2.8s for a graceful reveal!
      lenis.scrollTo(next, { duration: 2.8 });
    } else {
      // Fallback smooth scroll using GSAP to control speed
      gsap.to([document.documentElement, document.body], {
        scrollTop: next.offsetTop,
        duration: 2.8,
        ease: "power2.inOut"
      });
    }
  }, []);



  // ── Envelope Wax Seal Opening Trigger ─────────────────────────────────────
  const handleOpenSeal = useCallback(() => {
    if (isOpening) return;
    setIsOpening(true);

    try {
      const nextSection = document.getElementById("rakhi-next-section");
      if (!nextSection) {
        setIsOpening(false);
        return;
      }

      if (!envelopeRef.current || !flapRef.current || !sealRef.current || !glowRef.current) {
        setIsOpening(false);
        return;
      }

      // 1. Check prefers-reduced-motion fallback
      if (prefersReduced) {
        gsap.to(envelopeRef.current, {
          opacity: 0,
          y: 60,
          duration: 0.35,
          onComplete: () => {
            // Unlock scroll and navigate immediately
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            const lenis = (window as unknown as Record<string, unknown>).lenis as { start: () => void } | undefined;
            if (lenis?.start) {
              lenis.start();
            }
            handleCta();

            // Reset button state for robustness after scroll-away
            setTimeout(() => {
              setIsOpening(false);
              if (envelopeRef.current) gsap.set(envelopeRef.current, { opacity: 1, y: 0, scale: 1 });
              if (flapRef.current) gsap.set(flapRef.current, { rotationX: 0 });
              if (sealRef.current) gsap.set(sealRef.current, { opacity: 1, scale: 1 });
              if (glowRef.current) gsap.set(glowRef.current, { opacity: 0 });
            }, 1500);
          }
        });
        return;
      }

      // 2. Build Wax Seal break and flap peel-open timeline
      const tl = gsap.timeline();

      // Step A: Quick "impact" squash & stretch on click
      tl.to(sealRef.current, {
        scaleY: 0.82,
        scaleX: 1.15,
        duration: 0.08,
        ease: "power2.in",
      });
      tl.to(sealRef.current, {
        scaleY: 1,
        scaleX: 1,
        duration: 0.1,
        ease: "power1.out",
      });

      // Step B: Seal crack / shatter
      tl.addLabel("crack");

      // Fade out intact seal circle
      tl.to(sealRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.15,
        ease: "power1.in",
      }, "crack");

      // Animate the irregular wax shards exploding and falling down
      const validShards = shardRefs.current.filter(Boolean);
      tl.call(() => {
        if (validShards.length > 0) {
          // Reveal shards
          gsap.set(validShards, { opacity: 0.95, x: 0, y: 0, rotation: 0, scale: 1 });

          gsap.to(validShards, {
            x: () => gsap.utils.random(-60, 60),
            y: () => gsap.utils.random(40, 100), // falls downward
            rotation: () => gsap.utils.random(-180, 180),
            scale: () => gsap.utils.random(0.4, 0.8),
            opacity: 0,
            duration: () => gsap.utils.random(0.6, 0.8),
            ease: "power2.in",
            stagger: 0.02,
          });
        }
      }, [], "crack");

      // Step C: Flap Peel-Open
      tl.addLabel("peel", "+=0.15");

      // Peels backward along bottom hinge, with elastic overshoot
      tl.to(flapRef.current, {
        rotationX: -150,
        duration: 0.65,
        ease: "power2.in",
      }, "peel");

      tl.to(flapRef.current, {
        rotationX: -135,
        duration: 0.2,
        ease: "power1.out",
      });

      tl.to(flapRef.current, {
        rotationX: -140,
        duration: 0.15,
        ease: "power1.inOut",
      });

      // Spilling warm radial light gradient
      tl.to(glowRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }, "peel");

      // Step D: Scroll-Driven Reveal (starts 0.45s before flap finishes opening)
      tl.add(() => {
        // Unlock scroll
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";

        const lenis = (window as unknown as Record<string, unknown>).lenis as {
          scrollTo: (t: Element, o: object) => void;
        } | undefined;

        if (lenis?.scrollTo) {
          lenis.scrollTo(nextSection, {
            duration: 1.6,
            easing: (t: number) => 1 - Math.pow(1 - t, 3), // cubic ease out
          });
        } else {
          // Fallback smooth scroll using GSAP to control speed
          gsap.to([document.documentElement, document.body], {
            scrollTop: nextSection.offsetTop,
            duration: 1.6,
            ease: "power2.inOut",
          });
        }

        // Reset button back to its idle state 2s later for robustness if user scrolls back
        setTimeout(() => {
          setIsOpening(false);
          if (flapRef.current) gsap.set(flapRef.current, { rotationX: 0 });
          if (sealRef.current) gsap.set(sealRef.current, { opacity: 1, scale: 1 });
          if (glowRef.current) gsap.set(glowRef.current, { opacity: 0 });
          if (validShards.length > 0) gsap.set(validShards, { opacity: 0 });
        }, 2000);
      }, "peel+=0.35"); // Visual overlap: scroll starts 0.35s after peel starts (total peel duration is ~1s)

    } catch (err) {
      console.error("Error opening seal:", err);
      setIsOpening(false);
    }

  }, [isOpening, prefersReduced, handleCta]);

  // ── Mount Entrance & Parallax Animations ───────────────────────────────────
  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (prefersReduced) {
        gsap.set([titleRef.current, subtitleRef.current, envelopeRef.current], { opacity: 1, y: 0, scale: 1, filter: "none" });
        photos.forEach((photo, i) => {
          const ref = photoRefs.current[i];
          if (ref) {
            gsap.set(ref, { opacity: 1, scale: 1, rotation: photo.rotation, y: 0 });
          }
        });
        return;
      }

      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      // Split the title into characters with alternating vertical displacements
      let split: SplitText | null = null;
      if (titleRef.current) {
        split = new SplitText(titleRef.current, { type: "chars" });
        split.chars.forEach((char, index) => {
          gsap.set(char, {
            opacity: 0,
            y: index % 2 === 0 ? -45 : 45,
          });
        });
        // Make parent visible, characters will control their own opacity: 0
        gsap.set(titleRef.current, { opacity: 1 });
      }

      // Prep DOM for subtitle solid box reveal
      let originalSubtitleHTML = "";
      let subtitleBlock: HTMLDivElement | null = null;
      let subtitleContent: HTMLElement | null = null;
      if (subtitleRef.current) {
        subtitleRef.current.style.position = "relative";
        subtitleRef.current.style.overflow = "hidden";
        subtitleRef.current.style.display = "block";

        originalSubtitleHTML = subtitleRef.current.innerHTML;
        subtitleRef.current.innerHTML = `<span class="subtitle-reveal-content inline-block opacity-0" style="width: 100%; height: 100%;">${originalSubtitleHTML}</span>`;
        subtitleContent = subtitleRef.current.querySelector(".subtitle-reveal-content") as HTMLElement;

        subtitleBlock = document.createElement("div");
        subtitleBlock.className = "reveal-block absolute inset-0 pointer-events-none rounded-md";
        subtitleBlock.style.backgroundColor = "#7A1F3D";
        subtitleBlock.style.zIndex = "10";
        subtitleBlock.style.transformOrigin = "left center";
        gsap.set(subtitleBlock, { scaleX: 0, transformOrigin: "left center" });
        subtitleRef.current.appendChild(subtitleBlock);
      }

      // ── 1. Set initial positions on mount ──
      gsap.set(envelopeRef.current, { opacity: 0, y: 100, scale: 0.9 });

      photos.forEach((photo, i) => {
        const ref = photoRefs.current[i];
        if (ref) {
          gsap.set(ref, { opacity: 0, scale: 1.15, rotation: photo.rotation + gsap.utils.random(-10, 10), y: -20 });
        }
      });

      // ── 2. Entrance Timeline ──
      const tl = gsap.timeline({ paused: true });

      // Recipient name SplitText character reveal
      if (split && split.chars.length > 0) {
        tl.to(split.chars, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
        }, 0.25);
      }

      // Subtitle solid-box reveal sequence
      if (subtitleRef.current && subtitleBlock && subtitleContent) {
        tl.set(subtitleRef.current, { opacity: 1 }, 0.5);
        tl.to(subtitleBlock, {
          scaleX: 1,
          duration: 0.5,
          ease: "power2.inOut",
        }, 0.5);
        tl.set(subtitleContent, { opacity: 1 }, 0.85);
        tl.set(subtitleBlock, { transformOrigin: "right center" }, 0.85);
        tl.to(subtitleBlock, {
          scaleX: 0,
          duration: 0.35,
          ease: "power2.inOut",
        }, 0.85);
      }

      // Envelope CTA reveal
      tl.to(envelopeRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: "back.out(1.3)",
      }, 0.8);

      // Polaroid cards staggered fly-in
      photos.forEach((photo, i) => {
        const ref = photoRefs.current[i];
        if (!ref) return;

        tl.to(ref, {
          opacity: 1,
          scale: 1,
          rotation: photo.rotation,
          y: 0,
          duration: 0.75,
          ease: "back.out(1.4)",
        }, 0.45 + i * 0.15);
      });

      const triggerTimeline = () => {
        gsap.delayedCall(0.35, () => tl.play());
      };

      if (typeof window !== "undefined") {
        if (document.readyState === "complete") {
          triggerTimeline();
        } else {
          window.addEventListener("load", triggerTimeline);
        }
      }

      // ── 3. Curved Morphing Transition on Scroll ──
      requestAnimationFrame(() => {
        const nextSection = document.getElementById("rakhi-next-section");
        if (nextSection) {
          gsap.fromTo(
            nextSection,
            {
              borderTopLeftRadius: "280px",
              borderTopRightRadius: "280px",
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

      // ── 4. Continuous Idle Wobble Loops ──
      const wobbleTimeline = gsap.timeline();
      photos.forEach((photo, i) => {
        const ref = photoRefs.current[i];
        if (!ref) return;

        wobbleTimeline.to(ref, {
          rotation: photo.rotation + gsap.utils.random(1, 2) * (Math.random() > 0.5 ? 1 : -1),
          duration: gsap.utils.random(4, 6),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5 + gsap.utils.random(0, 1.5),
        }, 0);
      });

      const wobbleTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        onEnter: () => wobbleTimeline.play(),
        onLeave: () => wobbleTimeline.pause(),
        onEnterBack: () => wobbleTimeline.play(),
        onLeaveBack: () => wobbleTimeline.pause(),
      });

      return () => {
        if (split) {
          split.revert();
        }
        if (subtitleRef.current && originalSubtitleHTML) {
          subtitleRef.current.innerHTML = originalSubtitleHTML;
        }
        wobbleTrigger.kill();
        wobbleTimeline.kill();
        tl.kill();
        if (typeof window !== "undefined") {
          window.removeEventListener("load", triggerTimeline);
        }
      };
    },
    { scope: containerRef, dependencies: [prefersReduced, photos] }
  );

  // ── 6. Idle Wax Seal Pulsing ──
  useGSAP(
    () => {
      if (isOpening || !sealRef.current) return;

      const pulse = gsap.fromTo(
        sealRef.current,
        { opacity: 0.9, scale: 0.97 },
        {
          opacity: 1,
          scale: 1.03,
          duration: 1.25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );

      const pulseTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        onEnter: () => pulse.play(),
        onLeave: () => pulse.pause(),
        onEnterBack: () => pulse.play(),
        onLeaveBack: () => pulse.pause(),
      });

      return () => {
        pulse.kill();
        pulseTrigger.kill();
      };
    },
    { scope: containerRef, dependencies: [isOpening] }
  );

  // ── Declarative Pointer Parallax using Framer Motion ───────────────────────
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const getMultiplier = (zIndex: number) => {
    if (zIndex === 3) return 8;  // Front supporting cards (move most)
    if (zIndex === 2) return 4;  // Middle focal card
    return 2;                    // Back accent card (move least)
  };

  const px0 = useSpring(useTransform(x, (val) => val * getMultiplier(photos[0]?.zIndex ?? 2)), { stiffness: 150, damping: 20 });
  const py0 = useSpring(useTransform(y, (val) => val * getMultiplier(photos[0]?.zIndex ?? 2)), { stiffness: 150, damping: 20 });

  const px1 = useSpring(useTransform(x, (val) => val * getMultiplier(photos[1]?.zIndex ?? 3)), { stiffness: 150, damping: 20 });
  const py1 = useSpring(useTransform(y, (val) => val * getMultiplier(photos[1]?.zIndex ?? 3)), { stiffness: 150, damping: 20 });

  const px2 = useSpring(useTransform(x, (val) => val * getMultiplier(photos[2]?.zIndex ?? 3)), { stiffness: 150, damping: 20 });
  const py2 = useSpring(useTransform(y, (val) => val * getMultiplier(photos[2]?.zIndex ?? 3)), { stiffness: 150, damping: 20 });

  const px3 = useSpring(useTransform(x, (val) => val * getMultiplier(photos[3]?.zIndex ?? 1)), { stiffness: 150, damping: 20 });
  const py3 = useSpring(useTransform(y, (val) => val * getMultiplier(photos[3]?.zIndex ?? 1)), { stiffness: 150, damping: 20 });

  const getParallaxOffset = (index: number) => {
    if (index === 0) return { x: px0, y: py0 };
    if (index === 1) return { x: px1, y: py1 };
    if (index === 2) return { x: px2, y: py2 };
    return { x: px3, y: py3 };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    x.set(normX);
    y.set(normY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getSizeStyle = (size: "focal" | "large" | "medium" | "small") => {
    switch (size) {
      case "focal":
        return { width: "190px", height: "230px" };
      case "large":
        return { width: "140px", height: "160px" };
      case "medium":
        return { width: "130px", height: "150px" };
      default:
        return { width: "120px", height: "140px" };
    }
  };

  return (
    <section
      ref={containerRef}
      aria-label="Raksha Bandhan Greeting Card Hero"
      className="fixed top-0 left-0 z-10 w-full h-[100vh] flex flex-col items-center justify-between overflow-hidden hero-bg"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        perspective: "1000px", // Enables 3D rotations
      }}
    >
      {/* Mandala watermark background decoration */}
      <div className="absolute inset-0 hero-mandala pointer-events-none opacity-[0.12]" aria-hidden="true" />

      {/* Top-Left Notebook Grid Overlay */}
      <div
        className="absolute top-0 left-0 w-[68%] h-[48%] pointer-events-none opacity-35"
        style={{
          backgroundSize: "16px 16px",
          backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
          maskImage: "linear-gradient(to bottom right, black 65%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom right, black 65%, transparent 100%)"
        }}
      />

      {/* Mute button overlay */}
      <motion.button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute music" : "Mute music"}
        className="absolute top-4 right-4 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 text-[var(--rakhi-maroon)] shadow-sm"
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

      {/* ── Collage Content Container (Full Width & Height to fill the screen) ── */}
      <div className="w-full h-full relative overflow-visible flex flex-col items-center pt-[4vh] px-4">

        {/* Title Area */}
        <div ref={titleAreaRef} className="text-center w-full select-none mb-4 z-30 relative ">
          <h1
            ref={titleRef}
            className="opacity-0 text-[4.0rem] text-[var(--rakhi-maroon)] leading-[1.1] font-normal tracking-wide pointer-events-auto overflow-hidden inline-block py-2"
            style={{
              fontFamily: "var(--font-cherry-bomb-one, 'Cherry Bomb One', cursive)",
              transform: "translateZ(0)",
              WebkitMaskImage: "-webkit-radial-gradient(white, black)",
            }}
          >
            {name}
          </h1>
          <p
            ref={subtitleRef}
            className="opacity-0 text-[0.78rem] italic text-stone-600/90 max-w-[280px] mx-auto mt-2 font-serif leading-relaxed px-2 pointer-events-auto"
          >
            {subtitle}
          </p>
        </div>

        {/* Collage Stack Container */}
        <div
          ref={collageContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-[380px] md:max-w-[440px] h-[390px] mt-2 select-none overflow-visible z-25 pointer-events-auto"
        >
          {photos.map((photo, i) => {
            const sizeStyle = getSizeStyle(photo.size);
            const parallax = getParallaxOffset(i);

            return (
              <motion.div
                key={photo.id}
                className="absolute"
                style={{
                  top: photo.position.top,
                  left: photo.position.left,
                  right: photo.position.right,
                  width: sizeStyle.width,
                  height: sizeStyle.height,
                  zIndex: photo.zIndex,
                  x: parallax.x,
                  y: parallax.y,
                }}
              >
                {/* GSAP entrance & wobble anim wrapper */}
                <div
                  ref={(el) => {
                    photoRefs.current[i] = el;
                  }}
                  className="w-full h-full will-change-transform opacity-0"
                >
                  {/* Polaroid Frame Container */}
                  <div className="w-full h-full bg-white p-2 pb-5 rounded-sm shadow-[0_12px_28px_rgba(122,31,61,0.12),0_4px_10px_rgba(0,0,0,0.06)] border border-stone-200/40 flex flex-col items-center relative">

                    {/* Washi-tape accent on the focal photo only */}
                    {photo.id === "focal" && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-7 opacity-85 rotate-[-3deg] pointer-events-none z-30">
                        <Image
                          src="/Rakhi-card-media/Tape-2.png"
                          alt="Tape decoration"
                          fill
                          className="object-contain"
                          sizes="60px"
                        />
                      </div>
                    )}

                    {/* Polaroid Image Slot */}
                    <div className="relative w-full flex-1 bg-stone-100 overflow-hidden rounded-sm">
                      <Image
                        src={photo.src}
                        alt={photo.caption}
                        fill
                        className="object-cover"
                        sizes="220px"
                        priority
                      />
                    </div>
                  <span
                    className="text-[0.52rem] font-light text-[var(--rakhi-text-primary)] mt-2 leading-none font-dancing tracking-wide font-serif italic"
                  >
                    {photo.caption}
                  </span>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* ✉ Envelope Seal Break CTA Container */}
        <div
          ref={envelopeRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-auto [perspective:1000px] select-none opacity-0"
          style={{
            transformStyle: "preserve-3d",
            width: "360px",
            height: "125px", // Peeks up from bottom
            willChange: "transform, opacity",
          }}
        >
          {/* Muted instruction text above the flap */}
          <AnimatePresence>
            {!isOpening && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0.75, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[0.68rem] tracking-[0.2em] uppercase font-bold mb-2 cursor-default pointer-events-none select-none text-[#7A1F3D]/80"
                style={{
                  fontFamily: "var(--font-body, Poppins, sans-serif)",
                }}
              >
                Tap the seal to open
              </motion.p>
            )}
          </AnimatePresence>

          {/* Envelope Flap Crease & Body wrapper */}
          <div
            className="relative w-[320px] h-[90px] [transform-style:preserve-3d]"
          >
            {/* Inside Glow (Radial Gradient behind flap) */}
            <div
              ref={glowRef}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,166,35,0.45)_0%,transparent_70%)] opacity-0 pointer-events-none transition-opacity duration-300"
              style={{ top: "0px", zIndex: 0 }}
            />

            {/* Envelope Body Edge (peeking up just slightly) */}
            <div
              className="absolute bottom-0 left-0 w-full h-[15px] bg-[#FFF8F0] border-t border-amber-800/10 shadow-[0_-8px_20px_rgba(0,0,0,0.04)]"
              style={{ zIndex: 5, borderRadius: "2px 2px 0 0" }}
            />

            {/* Triangular Flap */}
            <div
              ref={flapRef}
              className="absolute bottom-0 left-0 w-full h-[70px] origin-bottom [transform-style:preserve-3d]"
              style={{
                zIndex: 10,
                transformOrigin: "bottom center",
                willChange: "transform",
              }}
            >
              <svg viewBox="0 0 320 70" className="w-full h-full drop-shadow-[0_-4px_6px_rgba(0,0,0,0.06)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Triangular Flap Shape */}
                <polygon
                  points="0,70 160,0 320,70"
                  fill="#FFF8F0"
                  stroke="#E8C39E"
                  strokeWidth="0.75"
                />
                {/* Thin gold border line tracing edge */}
                <polyline
                  points="2,69 160,2 318,69"
                  stroke="rgba(245, 166, 35, 0.4)"
                  strokeWidth="1.25"
                  fill="none"
                />
              </svg>
            </div>

            {/* Wax Seal Container (layered over the flap tip when closed) */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: "42px", // aligns center of 56px seal exactly on 70px flap tip
                width: "56px",
                height: "56px",
                zIndex: 20,
              }}
            >
              {/* Wax Seal interactive button */}
              <motion.button
                ref={sealRef}
                type="button"
                onClick={handleOpenSeal}
                disabled={isOpening}
                whileTap={{ scale: 0.9 }}
                className="relative w-full h-full rounded-full cursor-pointer flex items-center justify-center select-none active:outline-none focus:outline-none"
                style={{
                  background: "radial-gradient(circle at 35% 35%, #9E2B4B 0%, #7A1F3D 70%, #540D23 100%)",
                  boxShadow: "0 6px 14px rgba(78, 10, 30, 0.35), inset 0 2px 3px rgba(255, 255, 255, 0.25), inset 0 -2px 4px rgba(0, 0, 0, 0.45)",
                  border: "1.5px solid #63132B",
                  opacity: 1,
                  willChange: "transform, opacity",
                }}
                aria-label="Tap to open the envelope seal"
              >
                {/* Inner decorative emboss ring */}
                <div className="absolute inset-1.5 rounded-full border border-dashed border-[#F5A623]/25 pointer-events-none" />

                {/* Gold Embossed Heart Symbol in center */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#F5A623] drop-shadow-[0_1.5px_1px_rgba(0,0,0,0.55)]">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.button>

              {/* Wax Fragment Shards (hidden until clicked) */}
              <div className="absolute inset-0 pointer-events-none overflow-visible">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      if (el) shardRefs.current[i] = el;
                    }}
                    className="absolute w-6 h-6 opacity-0 select-none pointer-events-none"
                    style={{
                      top: "16px",
                      left: "16px",
                      willChange: "transform, opacity",
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="w-full h-full" fill="#7A1F3D">
                      {/* Unique organic shards */}
                      {i === 0 && <polygon points="3,13 11,3 15,13" />}
                      {i === 1 && <polygon points="13,3 21,11 11,17" />}
                      {i === 2 && <polygon points="21,13 13,21 9,9" />}
                      {i === 3 && <polygon points="13,21 3,13 14,7" />}
                      {i === 4 && <polygon points="5,5 17,9 11,19" />}
                      {i === 5 && <polygon points="19,19 7,15 13,5" />}
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
