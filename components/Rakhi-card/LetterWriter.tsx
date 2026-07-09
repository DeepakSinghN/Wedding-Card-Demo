"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const FULL_LETTER = [
  { type: "salutation", text: "To my dearest one," },
  { type: "gap" },
  { type: "body", text: "There are a thousand things I want to say to you — words I have carried in my heart through long drives, quiet evenings, and moments when I missed you more than I could explain." },
  { type: "gap" },
  { type: "body", text: "Watching you grow has been one of the greatest privileges of my life. Every struggle you have overcome, every smile you have worn — I have held them all close, like treasures that only I get to keep." },
  { type: "gap" },
  { type: "body", text: "You have no idea how proud I am. Not just of your achievements — but of the person you are becoming every single day. Your kindness, your courage, your laugh that fills every room. These are the things that make me certain this world is a little better because you are in it." },
  { type: "gap" },
  { type: "body", text: "There were times I did not say the right things. Times I was too quiet when I should have spoken. But know this — even in my silence, I was always, always in your corner." },
  { type: "gap" },
  { type: "body", text: "This Rakhi, I do not just tie a thread around your wrist. I tie a promise — that no matter how far life takes us, no matter how loud the world gets, I will always find my way back to you." },
  { type: "gap" },
  { type: "body", text: "You are my heart. My home. My favourite person in this entire world." },
  { type: "gap" },
  { type: "closing", text: "With every beat of my heart," },
  { type: "signature", text: "Your favourite sibling ❤️" },
];

export default function LetterWriter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  // ── Entrance Animation ───────────────────────────────────────────────────────
  useGSAP(() => {
    if (!sectionRef.current || !paperRef.current) return;

    gsap.fromTo(
      paperRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full py-24 px-6 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(175deg, #FFF8F0 0%, #FDF3E7 100%)",
      }}
    >
      <div className="w-full max-w-[420px] mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="w-full max-w-[400px] mx-auto mb-8 flex flex-col items-center">
          <p className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-2 text-[#8C6A5C] scroll-animate-text"
            style={{ fontFamily: "var(--font-body, Poppins, sans-serif)" }}>
            FROM THE HEART
          </p>
          <h2 className="text-[2.6rem] text-center select-none leading-tight scroll-animate-text"
            style={{ fontFamily: "var(--font-script, 'Great Vibes', cursive)", color: "var(--rakhi-maroon, #7A1F3D)" }}>
            Words From My Heart
          </h2>
        </div>

        {/* Letter paper */}
        <div
          ref={paperRef}
          className="relative w-full overflow-hidden"
          style={{
            background: "#FFFBF2",
            // Simulates organic handmade deckled edges
            borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
            border: "1.5px solid rgba(210, 185, 150, 0.4)",
            boxShadow: "0 12px 38px rgba(90,50,20,0.1), 0 2px 8px rgba(90,50,20,0.05), inset 0 0 40px rgba(215, 195, 170, 0.2)",
          }}
        >
          {/* Decorative Pressed Marigold Flower in Top-Right Corner */}
          <div className="absolute top-1 right-5 w-12 h-20 z-10 pointer-events-none opacity-85 rotate-[12deg]">
            {/* Flower image */}
            <div className="relative w-full h-full">
              <Image
                src="/Rakhi-card-media/flower.png"
                alt="Dried pressed flower"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Securing transparent tape */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-10 h-3.5 rotate-[-15deg] opacity-75">
              <Image
                src="/Rakhi-card-media/Tape-2.png"
                alt="Tape decoration"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Red margin line */}
          <div className="absolute top-0 bottom-0 pointer-events-none"
            style={{ left: 40, width: "1px", background: "rgba(220,100,100,0.12)", zIndex: 1 }} />

          {/* Ruled lines */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="absolute left-0 right-0 pointer-events-none"
              style={{ top: `${45 + i * 24}px`, height: "1px", background: "rgba(100,140,200,0.05)" }} />
          ))}

          {/* Content container (fully rendered static Dancing Script content) */}
          <div className="relative pl-14 pr-4 pt-8 pb-8 z-10">
            {FULL_LETTER.map((block, i) => {
              if (block.type === "gap") {
                return <div key={i} className="h-2" />;
              }

              if (block.type === "salutation") {
                return (
                  <p key={i} style={{
                    fontFamily: "var(--font-dancing, cursive)",
                    fontSize: "1.55rem",
                    color: "#1E293B", // fountain pen ink
                    lineHeight: 1.45,
                    marginBottom: 4,
                  }}>
                    {block.text}
                  </p>
                );
              }

              if (block.type === "closing") {
                return (
                  <p key={i} style={{
                    fontFamily: "var(--font-dancing, cursive)",
                    fontSize: "1.25rem",
                    color: "#1E293B",
                    lineHeight: 1.45,
                  }}>
                    {block.text}
                  </p>
                );
              }

              if (block.type === "signature") {
                return (
                  <p key={i} style={{
                    fontFamily: "var(--font-dancing, cursive)",
                    fontSize: "1.5rem",
                    color: "var(--rakhi-maroon, #7A1F3D)",
                    marginTop: 20,
                    lineHeight: 1.45,
                    textAlign: "right",
                  }}>
                    {block.text}
                  </p>
                );
              }

              // body paragraph
              return (
                <p key={i} style={{
                  fontFamily: "var(--font-dancing, cursive)",
                  fontSize: "1.25rem",
                  color: "#1E293B",
                  lineHeight: 1.45,
                  textIndent: "1.5rem",
                }}>
                  {block.text}
                </p>
              );
            })}

          </div>
        </div>

        {/* Section divider */}
        <div className="mt-10 text-amber-700/35 text-sm select-none" aria-hidden="true">
          ❦ ──── ❦
        </div>
      </div>
    </section>
  );
}
