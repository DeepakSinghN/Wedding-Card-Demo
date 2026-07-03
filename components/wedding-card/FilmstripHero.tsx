"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Slide {
  image: string;
  colorA: string;
  colorB: string;
  title: string;
  subtitle: string;
  desc: string;
}

interface FilmstripHeroProps {
  slides?: Slide[];
}

const DEFAULT_SLIDES: Slide[] = [
  {
    image: "/Gallery/1.svg",
    colorA: "#A36662",
    colorB: "#C28C88",
    title: "Love",
    subtitle: "01",
    desc: "A lifetime of togetherness begins with one sacred step.",
  },
  {
    image: "/Gallery/2.svg",
    colorA: "#D4A373",
    colorB: "#E9C46A",
    title: "Elegance",
    subtitle: "02",
    desc: "Every look, every touch, a chapter in our infinite love story.",
  },
  {
    image: "/Gallery/3.svg",
    colorA: "#8F9E8B",
    colorB: "#A3B19B",
    title: "Joy",
    subtitle: "03",
    desc: "Hand in hand, heart to heart, celebrating the melody of two souls.",
  },
  {
    image: "/Gallery/4.svg",
    colorA: "#B07C9E",
    colorB: "#C89CB9",
    title: "Forever",
    subtitle: "04",
    desc: "An elegant promise, a beautiful design language built to last forever.",
  },
];

export default function FilmstripHero({ slides = DEFAULT_SLIDES }: FilmstripHeroProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressRef = useRef(0);
  const dragXObj = useRef({ val: 0 });
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startProgress = useRef(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  // Responsive breakpoint tracking
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP 3D mouse tilt interaction for Desktop
  useEffect(() => {
    if (isMobile) return;
    const stack = stackRef.current;
    if (!stack) return;

    gsap.set(stack, { transformPerspective: 1200 });

    const xTo = gsap.quickTo(stack, "rotateY", { duration: 0.5, ease: "power2.out" });
    const yTo = gsap.quickTo(stack, "rotateX", { duration: 0.5, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      // Respect prefers-reduced-motion
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) return;

      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Normalize coordinates to -1 -> 1
      const xNorm = (clientX / width) * 2 - 1;
      const yNorm = (clientY / height) * 2 - 1;

      // Tilts stack by up to +-4deg
      xTo(xNorm * 4);
      yTo(-yNorm * 4);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  // Pointer drag events
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startProgress.current = progressRef.current;
    dragXObj.current.val = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const currentX = e.clientX;
    const diffX = currentX - startX.current;
    dragXObj.current.val = diffX;

    // A drag of 350px slides 1 slide progress
    const dragSensitivity = isMobile ? 250 : 350;
    const deltaProgress = -diffX / dragSensitivity;
    const newProgress = startProgress.current + deltaProgress;

    progressRef.current = newProgress;
    setScrollProgress(newProgress);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);

    // Snap to the nearest integer index
    const snappedProgress = Math.round(progressRef.current);

    // Animate both progress and temporary drag offset back to zero
    gsap.to(progressRef, {
      current: snappedProgress,
      duration: 0.5,
      ease: "back.out(1.2)",
      onUpdate: () => {
        setScrollProgress(progressRef.current);
      },
    });

    gsap.to(dragXObj.current, {
      val: 0,
      duration: 0.5,
      ease: "back.out(1.2)",
    });
  };

  const slideToIndex = (index: number) => {
    // Determine closest integer target index corresponding to index % slides.length
    const currentProgress = progressRef.current;
    const length = slides.length;
    
    // Find absolute index offset closest to current progress
    const currentWrapped = currentProgress % length;
    const baseProgress = currentProgress - currentWrapped;
    
    let target = baseProgress + index;
    // Minimize distance to avoid long reverse spins
    while (target - currentProgress > length / 2) target -= length;
    while (target - currentProgress < -length / 2) target += length;

    gsap.to(progressRef, {
      current: target,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        setScrollProgress(progressRef.current);
      },
    });

    gsap.to(dragXObj.current, {
      val: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const nextSlide = () => {
    const nextTarget = Math.round(progressRef.current) + 1;
    gsap.to(progressRef, {
      current: nextTarget,
      duration: 0.6,
      ease: "back.out(1.1)",
      onUpdate: () => {
        setScrollProgress(progressRef.current);
      },
    });
  };

  const prevSlide = () => {
    const prevTarget = Math.round(progressRef.current) - 1;
    gsap.to(progressRef, {
      current: prevTarget,
      duration: 0.6,
      ease: "back.out(1.1)",
      onUpdate: () => {
        setScrollProgress(progressRef.current);
      },
    });
  };

  const getWrappedIndex = (val: number, length: number) => {
    const wrapped = Math.round(val) % length;
    return wrapped < 0 ? wrapped + length : wrapped;
  };

  const activeIndex = getWrappedIndex(scrollProgress, slides.length);

  // Compute card rendering layout offsets
  const getCardStyle = (index: number, progress: number, isMobileLayout: boolean) => {
    let diff = index - progress;
    const length = slides.length;

    // Wrap difference to range [-length/2, length/2)
    const half = length / 2;
    while (diff < -half) diff += length;
    while (diff >= half) diff -= length;

    const absDiff = Math.abs(diff);

    // Speed depth modifiers
    let depthMultiplier = 1.2;
    if (absDiff <= 1) {
      depthMultiplier = 1.2 - 0.5 * absDiff;
    } else {
      depthMultiplier = 0.7 - 0.3 * (absDiff - 1);
    }
    depthMultiplier = Math.max(0.4, Math.min(1.2, depthMultiplier));

    // Dynamic horizontal drag displacement
    const extraParallax = dragXObj.current.val * (depthMultiplier - 1) * 0.25;

    if (isMobileLayout) {
      // Mobile Layout: compact cluster (1 center card, 1 overlapping right, 1 peeking left, rest hidden)
      let translateX = 0;
      let translateY = 0;
      let scale = 1;
      let rotate = 0;
      let opacity = 1;
      let zIndex = 30;
      let blur = 0;

      if (diff === 0) {
        translateX = 0;
        translateY = 0;
        scale = 1.0;
        rotate = 0;
        opacity = 1;
        zIndex = 30;
        blur = 0;
      } else if (diff > 0 && diff <= 1) {
        const t = diff;
        translateX = 40 * t;
        translateY = 12 * t;
        scale = 1.0 - 0.08 * t;
        rotate = 4 * t;
        opacity = 1.0 - 0.1 * t;
        zIndex = 20;
        blur = 0;
      } else if (diff < 0 && diff >= -1) {
        const t = -diff;
        translateX = -75 * t;
        translateY = 15 * t;
        scale = 1.0 - 0.12 * t;
        rotate = -5 * t;
        opacity = 1.0 - 0.3 * t;
        zIndex = 25;
        blur = 1.5 * t;
      } else {
        const t = (absDiff - 1);
        translateX = diff > 0 ? 120 * t : -150 * t;
        translateY = 30 * t;
        scale = 0.8;
        opacity = 0;
        zIndex = 10;
        blur = 4;
      }

      return {
        transform: `translate3d(${translateX + extraParallax}px, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
        zIndex,
        opacity: Math.max(0, Math.min(1, opacity)),
        filter: blur > 0.1 ? `blur(${blur}px)` : "none",
      };
    } else {
      // Desktop Layout: Staggered, diagonally overlapping cards
      const keyframes: { [key: number]: { tx: number; ty: number; s: number; r: number; o: number; b: number; z: number } } = {
        [-2]: { tx: -600, ty: 40, s: 0.65, r: -12, o: 0.25, b: 4, z: 10 },
        [-1]: { tx: -300, ty: 20, s: 0.82, r: -6, o: 0.8, b: 1.5, z: 20 },
        [0]: { tx: 0, ty: 0, s: 1.0, r: 0, o: 1.0, b: 0, z: 30 },
        [1]: { tx: 300, ty: 20, s: 0.82, r: 6, o: 0.8, b: 1.5, z: 20 },
        [2]: { tx: 600, ty: 40, s: 0.65, r: 12, o: 0.25, b: 4, z: 10 },
      };

      const lowerKey = Math.floor(diff);
      const upperKey = Math.ceil(diff);

      let start = keyframes[lowerKey];
      let end = keyframes[upperKey];

      if (!start) start = keyframes[-2];
      if (!end) end = keyframes[2];

      const t = diff - lowerKey;

      const translateX = start.tx + (end.tx - start.tx) * t;
      const translateY = start.ty + (end.ty - start.ty) * t;
      const scale = start.s + (end.s - start.s) * t;
      const rotate = start.r + (end.r - start.r) * t;
      const opacity = start.o + (end.o - start.o) * t;
      const blur = start.b + (end.b - start.b) * t;
      const zIndex = t < 0.5 ? start.z : end.z;

      return {
        transform: `translate3d(${translateX + extraParallax}px, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
        zIndex,
        opacity: Math.max(0, Math.min(1, opacity)),
        filter: blur > 0.1 ? `blur(${blur}px)` : "none",
      };
    }
  };

  return (
    <section
      ref={containerRef}
      className="w-full h-screen relative flex flex-col justify-between items-center text-[#A36662] overflow-hidden select-none touch-none border-t border-[#A36662]/10"
      style={{
        background: "radial-gradient(circle at center, #FAF4EF 0%, #EADFD7 100%)",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Decorative out-of-focus background glow blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full filter blur-[120px] opacity-20 bg-gradient-to-r from-[#A36662]/30 to-transparent w-[450px] h-[450px] -top-32 -left-32 animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute rounded-full filter blur-[140px] opacity-25 bg-gradient-to-r from-[#D4A373]/30 to-transparent w-[550px] h-[550px] -bottom-40 -right-32 animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute rounded-full filter blur-[100px] opacity-15 bg-gradient-to-r from-[#C28C88]/30 to-transparent w-[380px] h-[380px] top-[40%] -left-40 animate-pulse" style={{ animationDuration: "10s" }} />
      </div>

      {/* Giant white heavily blurred headline words behind cards */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <div
          className="font-sans font-black tracking-tighter text-[#A36662] opacity-[0.07] text-[clamp(7rem,18vw,15rem)] select-none pointer-events-none filter blur-[10px] uppercase leading-none whitespace-nowrap absolute"
          style={{
            transform: `translate3d(${-scrollProgress * 80}px, -60px, 0)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          Forever
        </div>
        <div
          className="font-sans font-black tracking-tighter text-[#A36662] opacity-[0.07] text-[clamp(7rem,18vw,15rem)] select-none pointer-events-none filter blur-[10px] uppercase leading-none whitespace-nowrap absolute"
          style={{
            transform: `translate3d(${scrollProgress * 80}px, 120px, 0)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          Us
        </div>
      </div>

      {/* ----------------- DESKTOP LAYOUT (>=768px) ----------------- */}
      {!isMobile && (
        <div className="absolute inset-0 flex flex-col justify-between p-12 z-10 pointer-events-none">
          {/* Top Row: Corner Pinned Labels */}
          <div className="flex justify-between items-center w-full uppercase tracking-[0.25em] text-[clamp(0.7rem,1vw,0.85rem)] text-[#A36662]/60 font-semibold">
            <span>MEMORIES</span>
            <span>OUR JOURNEY GALLERY</span>
          </div>

          {/* Center Card Stack Container */}
          <div className="flex-1 flex items-center justify-center relative w-full pointer-events-auto">
            <div ref={stackRef} className="relative flex items-center justify-center w-[360px] h-[360px]">
              {slides.map((slide, idx) => {
                const calculatedStyle = getCardStyle(idx, scrollProgress, false);
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={idx}
                    className="absolute w-[360px] h-[360px] cursor-grab active:cursor-grabbing transition-shadow duration-300 rounded-[20px] overflow-hidden"
                    style={{
                      ...calculatedStyle,
                      boxShadow: isActive
                        ? "0 30px 60px -15px rgba(163, 102, 98, 0.4), 0 0 40px rgba(163, 102, 98, 0.1)"
                        : "0 15px 30px -10px rgba(163, 102, 98, 0.2)",
                    }}
                  >
                    {/* Ambient sway wrapper inside */}
                    <div className="w-full h-full relative ambient-float-card group">
                      {/* Two-tone split background */}
                      <div
                        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${slide.colorA} 50%, ${slide.colorB} 50%)`,
                        }}
                      />
                      
                      {/* Sub-card decorative glass overlay for film aesthetics */}
                      <div className="absolute inset-0 bg-black/5 pointer-events-none border border-white/20 rounded-[20px]" />

                      {/* Model cutout image */}
                      <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="h-[95%] w-auto object-contain object-bottom transition-transform duration-500 group-hover:scale-105 group-hover:translate-y-[-5px]"
                          draggable="false"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex justify-between items-end w-full pointer-events-auto">
            {/* Bottom-left: Description Block */}
            <div className="max-w-xs md:max-w-sm flex flex-col gap-2">
              <div className="text-[#A36662] font-mono text-xs uppercase tracking-widest font-bold">
                {slides[activeIndex].title}
              </div>
              <p className="text-[#A36662]/90 text-sm leading-relaxed min-h-[50px] transition-all duration-300">
                {slides[activeIndex].desc}
              </p>
            </div>

            {/* Bottom-right: Controls + CTA */}
            <div className="flex items-center gap-8">
              {/* Navigation Indicators */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-[#A36662]/20 flex items-center justify-center bg-[#A36662]/5 hover:bg-[#A36662]/10 active:scale-95 transition-all text-[#A36662]"
                  aria-label="Previous Slide"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="font-mono text-sm tracking-widest min-w-[65px] text-center text-[#A36662]">
                  <span className="font-bold">{slides[activeIndex].subtitle}</span>
                  <span className="opacity-40"> / </span>
                  <span className="opacity-40">0{slides.length}</span>
                </div>

                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-[#A36662]/20 flex items-center justify-center bg-[#A36662]/5 hover:bg-[#A36662]/10 active:scale-95 transition-all text-[#A36662]"
                  aria-label="Next Slide"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Pill Button OUR ALBUM */}
              <button
                className="px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase bg-[#A36662] text-white hover:bg-[#8E524E] transition-all duration-300 shadow-md hover:shadow-[#A36662]/20 hover:-translate-y-[2px]"
                onClick={() => alert("Photo album coming soon!")}
              >
                OUR ALBUM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- MOBILE LAYOUT (<768px) ----------------- */}
      {isMobile && (
        <div className="absolute inset-0 flex flex-col justify-between px-6 py-8 z-10">
          {/* Top Row: Labels */}
          <div className="flex justify-between items-center w-full uppercase tracking-wider text-[10px] text-[#A36662]/60 font-semibold pt-4">
            <span>MEMORIES</span>
            <span>OUR GALLERY</span>
          </div>

          {/* Card Cluster Area */}
          <div className="flex-1 flex items-center justify-center w-full relative min-h-[300px]">
            <div className="relative flex items-center justify-center w-[260px] h-[260px]">
              {slides.map((slide, idx) => {
                const calculatedStyle = getCardStyle(idx, scrollProgress, true);
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={idx}
                    className="absolute w-[260px] h-[260px] cursor-grab active:cursor-grabbing transition-shadow duration-300 rounded-[18px] overflow-hidden"
                    style={{
                      ...calculatedStyle,
                      boxShadow: isActive
                        ? "0 20px 40px -10px rgba(163, 102, 98, 0.4), 0 0 25px rgba(163, 102, 98, 0.08)"
                        : "0 10px 20px -8px rgba(163, 102, 98, 0.2)",
                    }}
                  >
                    <div className="w-full h-full relative ambient-float-card group">
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${slide.colorA} 50%, ${slide.colorB} 50%)`,
                        }}
                      />
                      <div className="absolute inset-0 bg-black/5 pointer-events-none border border-white/20 rounded-[18px]" />

                      <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="h-[95%] w-auto object-contain object-bottom"
                          draggable="false"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Area Content Stack */}
          <div className="flex flex-col items-center text-center gap-6 w-full pb-4">
            {/* Description */}
            <div className="flex flex-col items-center gap-1.5 px-4">
              <span className="text-[#A36662] font-mono text-[11px] uppercase tracking-widest font-bold">
                {slides[activeIndex].title}
              </span>
              <p className="text-[#A36662]/90 text-xs leading-relaxed max-w-[280px] min-h-[36px]">
                {slides[activeIndex].desc}
              </p>
            </div>

            {/* Nav Row */}
            <div className="flex items-center gap-6">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full border border-[#A36662]/20 flex items-center justify-center bg-[#A36662]/5 active:scale-95 transition-all text-[#A36662]"
                aria-label="Previous Slide"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="font-mono text-xs tracking-wider min-w-[55px] text-[#A36662]">
                <span className="font-bold">{slides[activeIndex].subtitle}</span>
                <span className="opacity-40"> / </span>
                <span className="opacity-40">0{slides.length}</span>
              </div>

              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full border border-[#A36662]/20 flex items-center justify-center bg-[#A36662]/5 active:scale-95 transition-all text-[#A36662]"
                aria-label="Next Slide"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Full-width Pill CTA */}
            <button
              className="w-full max-w-[280px] py-3.5 rounded-full font-bold text-xs tracking-wider uppercase bg-[#A36662] text-white active:scale-98 transition-all duration-300 shadow-md"
              onClick={() => alert("Photo album coming soon!")}
            >
              OUR ALBUM
            </button>
          </div>
        </div>
      )}

      {/* Global CSS for ambient float animation */}
      <style jsx global>{`
        @keyframes float-hero-card {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(1deg);
          }
        }
        .ambient-float-card {
          animation: float-hero-card 6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ambient-float-card {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
