"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface PolaroidItem {
  id: number;
  imageSrc: string;
  frontTitle: string;
  backCaption: string;
  rotation: number;
}

const MEMORIES: PolaroidItem[] = [
  {
    id: 1,
    imageSrc: "/Rakhi-card-media/photo-1.webp",
    frontTitle: "The Partner in Crime 🍦",
    backCaption: "Remember when we sneaked out for ice cream at midnight, got locked out, and had to bribe the guard? Best adventure ever.",
    rotation: -3,
  },
  {
    id: 2,
    imageSrc: "/Rakhi-card-media/photo-2.jpg",
    frontTitle: "Double Trouble 👯",
    backCaption: "Accidentally wearing matching shirts because we both thought it was cool. We denied it all day, but deep down, we loved it.",
    rotation: 4,
  },
  {
    id: 3,
    imageSrc: "/Rakhi-card-media/photo-3.jpg",
    frontTitle: "Graduation Support 🎓",
    backCaption: "You cheered the loudest in the entire room. Knowing you had my back made the stage feel a little less scary.",
    rotation: -2,
  },
];

export default function MemoryFilmstrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const [flippedId, setFlippedId] = useState<number | null>(null);

  // Scroll entrance animation
  useGSAP(() => {
    if (!containerRef.current || !filmstripRef.current) return;

    // Fade and slide in filmstrip
    gsap.fromTo(
      filmstripRef.current.children,
      { opacity: 0, x: 50, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: filmstripRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: containerRef, dependencies: [] });

  const handleFlip = (id: number) => {
    setFlippedId(flippedId === id ? null : id);
  };

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full h-[100vh] py-24 px-6 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FDF3E7 0%, #FFF8F0 100%)",
      }}
    >
      <div className="w-full max-w-[430px] mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <p className="scroll-animate-text text-[10px] font-semibold tracking-[0.3em] uppercase mb-2 text-[#8C6A5C]"
            style={{ fontFamily: "var(--font-body, Poppins, sans-serif)" }}>
            RETRO MOMENTS
          </p>
          <h2 className="scroll-animate-text text-4xl mb-4 text-[#7A1F3D] "
            style={{ fontFamily: "var(--font-script, 'Great Vibes', cursive)" }}>
            The Memory Reel
          </h2>
          <p className="scroll-animate-text text-xs text-[#A08070] max-w-[280px] leading-relaxed"
            style={{ fontFamily: "var(--font-body, Poppins, sans-serif)" }}>
            Swipe through our favorite frames. Tap any Polaroid to flip it and read the story behind it.
          </p>
        </div>

        {/* Filmstrip Container (Horizontal Scroll) */}
        <div
          ref={filmstripRef}
          className="w-full flex gap-6 px-4 py-8 overflow-x-auto scrollbar-none snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>

          {MEMORIES.map((item) => {
            const isFlipped = flippedId === item.id;
            return (
              <div
                key={item.id}
                className="snap-center shrink-0 w-[240px] h-[310px] cursor-pointer"
                style={{
                  perspective: "1000px",
                  transform: `rotate(${item.rotation}deg)`,
                }}
                onClick={() => handleFlip(item.id)}
              >
                <div
                  className="w-full h-full relative transition-transform duration-700 ease-out"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "none",
                  }}
                >
                  {/* FRONT */}
                  <div
                    className="absolute inset-0 bg-white p-3 pb-8 rounded-[4px] border border-stone-200 shadow-[0_8px_20px_rgba(100,80,60,0.12)] flex flex-col justify-between"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {/* Polaroid Tape */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-12 h-6 z-10 pointer-events-none opacity-85 rotate-[-5deg]">
                      <Image
                        src="/Rakhi-card-media/Tape-2.png"
                        alt="Tape decoration"
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Image frame */}
                    <div className="relative w-full h-[200px] bg-stone-100 overflow-hidden rounded-sm border border-stone-100">
                      <Image
                        src={item.imageSrc}
                        alt={item.frontTitle}
                        fill
                        className="object-cover"
                        sizes="220px"
                      />
                    </div>

                    {/* Cursive Title */}
                    <p
                      className="text-center mt-3 text-[1.25rem] text-stone-700"
                      style={{
                        fontFamily: "var(--font-dancing, cursive)",
                      }}
                    >
                      {item.frontTitle}
                    </p>
                  </div>

                  {/* BACK */}
                  <div
                    className="absolute inset-0 bg-[#FFFDF5] p-5 rounded-[4px] border border-stone-200 shadow-[0_8px_20px_rgba(100,80,60,0.18)] flex flex-col justify-center items-center text-center"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <span className="text-xl mb-4">✍️</span>
                    <p
                      className="text-[1.15rem] leading-relaxed text-stone-700"
                      style={{
                        fontFamily: "var(--font-dancing, cursive)",
                      }}
                    >
                      {item.backCaption}
                    </p>
                    <span className="text-[9px] uppercase tracking-wider text-stone-400 mt-6 select-none">
                      Tap to flip back
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Section divider */}
        <div className="mt-16 text-amber-700/25 text-sm select-none" aria-hidden="true">
          ❦ ──── ❦
        </div>

      </div>
    </section>
  );
}
