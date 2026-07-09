"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrapbookCard {
  id: number;
  photoUrl: string;
  frontCaption: string;
  backCaption: string;
  backText: string;
  rotation: number; // default rotation angle
  xOffset: string;  // horizontal positioning offset
  yOffset: string;  // vertical positioning offset
}

const MEMORIES: ScrapbookCard[] = [
  {
    id: 1,
    photoUrl: "/Rakhi-card-media/photo-1.webp",
    frontCaption: "Partner in Crime",
    backCaption: "The Remote Fight Vow",
    backText: "Remember how we used to fight over the TV remote? Even though I complained, I'd do it all over again just to see you laugh. Thanks for always being my co-conspirator.",
    rotation: -6,
    xOffset: "-30px",
    yOffset: "0px",
  },
  {
    id: 2,
    photoUrl: "/Rakhi-card-media/photo-2.jpg",
    frontCaption: "Endless Adventures",
    backCaption: "Always by Your Side",
    backText: "From secret late-night ice cream runs to handling life's biggest challenges, you have been my anchor. Distance will never change how close we are.",
    rotation: 5,
    xOffset: "30px",
    yOffset: "20px",
  },
  {
    id: 3,
    photoUrl: "/Rakhi-card-media/photo-3.jpg",
    frontCaption: "Shared Laughter",
    backCaption: "My Greatest Strength",
    backText: "You know me better than anyone else. Thank you for listening to my endless dramas without judgment and celebrating every small victory with me.",
    rotation: -4,
    xOffset: "-15px",
    yOffset: "40px",
  },
];

export default function Scrapbook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);

  // ── Entrance Individual Card Scroll-Linked Zoom-Out Animation ─────────────
  useGSAP(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".scrapbook-card-container");

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0,
          rotation: 0,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: MEMORIES[index].rotation,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",  // starts when top of the card enters bottom of screen
            end: "top 65%",    // fully zooms in when card reaches 65% of viewport height
            scrub: 1,        // slightly more responsive scroll linking
          },
        }
      );
    });
  }, { scope: containerRef, dependencies: [] });

  const toggleFlip = (id: number) => {
    setFlippedCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full min-h-[100vh] py-24 px-6 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#FFF8F0" }}
    >
      <div className="w-full max-w-[430px] mx-auto flex flex-col items-center">

        {/* Calligraphy Header */}
        <p
          className="text-xs font-semibold tracking-[0.25em] uppercase mb-2 scroll-animate-text"
          style={{
            fontFamily: "var(--font-body, Poppins, sans-serif)",
            color: "#8C6A5C",
          }}
        >
          SCROLLING THROUGH TIME
        </p>
        <h2
          className="text-4xl text-center mb-16 select-none scroll-animate-text"
          style={{
            fontFamily: "var(--font-script, 'Great Vibes', cursive)",
            color: "var(--rakhi-maroon)",
          }}
        >
          Our Scrapbook of Memories
        </h2>

        {/* Polaroid Cards Layout */}
        <div className="w-full flex flex-col items-center gap-20 relative px-4 mt-8">
          {MEMORIES.map((memory) => {
            const isFlipped = flippedCardId === memory.id;

            return (
              <div
                key={memory.id}
                className="scrapbook-card-container relative w-[280px] h-[350px] cursor-pointer"
                style={{
                  transform: `translateX(${memory.xOffset}) translateY(${memory.yOffset})`,
                  perspective: "1000px",
                  zIndex: isFlipped ? 40 : 10,
                  willChange: "transform, opacity",
                }}
                onClick={() => toggleFlip(memory.id)}
              >
                {/* Visual Decorative Tape Overlay */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[90px] h-[30px] rotate-[-2deg] z-50 pointer-events-none">
                  <Image
                    src="/Rakhi-card-media/Tape-2.png"
                    alt="Decorative tape"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Inner Card Wrapper with 3D Flip capability */}
                <div
                  className="w-full h-full relative transition-transform duration-700 ease-out select-none"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "none",
                  }}
                >

                  {/* FRONT SIDE (Polaroid Photo) */}
                  <div
                    className="absolute inset-0 bg-white p-4 pb-6 shadow-[0_8px_20px_rgba(140,106,92,0.12)] border border-stone-100 flex flex-col justify-between hover:shadow-[0_15px_30px_rgba(140,106,92,0.22)] transition-shadow duration-300 rounded-[2px]"
                    style={{
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="relative w-full h-[230px] bg-stone-50 overflow-hidden rounded-[2px]">
                      <Image
                        src={memory.photoUrl}
                        alt={memory.frontCaption}
                        fill
                        className="object-cover"
                        sizes="250px"
                      />
                    </div>

                    {/* Handwritten Polaroid Caption */}
                    <div className="text-center pt-3 flex flex-col items-center justify-center">
                      <p
                        className="text-2xl"
                        style={{
                          fontFamily: "var(--font-script, 'Great Vibes', cursive)",
                          color: "var(--rakhi-maroon)",
                        }}
                      >
                        {memory.frontCaption}
                      </p>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 mt-1">
                        (Tap to open note)
                      </span>
                    </div>
                  </div>

                  {/* BACK SIDE (Handwritten Note) */}
                  <div
                    className="absolute inset-0 bg-stone-50 p-6 shadow-[0_8px_20px_rgba(140,106,92,0.12)] border border-stone-200/60 flex flex-col justify-between rounded-[2px]"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      backgroundImage: "radial-gradient(#d3c2b8 0.5px, transparent 0.5px)",
                      backgroundSize: "12px 12px",
                    }}
                  >
                    {/* Top Accent Ribbon */}
                    <div className="flex flex-col items-center">
                      <h4
                        className="text-xl font-bold mb-3 border-b border-amber-800/20 pb-1 w-full text-center"
                        style={{
                          fontFamily: "var(--font-display, 'Playfair Display', serif)",
                          color: "var(--rakhi-maroon)",
                        }}
                      >
                        {memory.backCaption}
                      </h4>
                      <p
                        className="text-[1.15rem] leading-relaxed text-stone-700 text-center"
                        style={{
                          fontFamily: "var(--font-script, 'Great Vibes', cursive)",
                        }}
                      >
                        {memory.backText}
                      </p>
                    </div>

                    <div className="text-center text-stone-400 text-xs">
                      (Tap to flip back)
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Small subtle footer ornament */}
        <div className="mt-28 text-amber-700/40 text-sm select-none" aria-hidden="true">
          ❦ ──── ❦
        </div>
      </div>
    </section>
  );
}
