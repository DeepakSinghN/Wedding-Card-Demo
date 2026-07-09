"use client";

import React, { useRef } from "react";
import ScrollFloat from "./ScrollFloat";
import ScrollReveal from "./ScrollReveal";

export default function ThankYou() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full min-h-[120vh] pt-20 px-6 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#FFF8F0" }}
    >
      {/* Decorative subtle background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(217, 119, 6, 0.03) 0%, transparent 70%)" }} />
      </div>

      <div className="w-full max-w-full flex flex-col items-center text-center px-4 mt-20">
        {/* "Thank you" Calligraphy Heading with ScrollFloat */}
        <div
          className="flex flex-col items-center pr-15 select-none mb-12"
          style={{ transform: "rotate(-17deg)" }}
        >
          <ScrollFloat
            containerClassName="text-[8rem] leading-[0.8] justify-center"
            textClassName="font-normal"
            style={{
              fontFamily: "var(--font-high-spirited), cursive",
              color: "var(--rakhi-text-primary, #2E2A27)",
            }}
            scrollStart="top 50%"
            scrollEnd="bottom 20%"
            stagger={0.08}
          >
            Thank
          </ScrollFloat>
          <ScrollFloat
            containerClassName="text-[8rem] leading-[0.8] justify-center translate-x-20"
            textClassName="font-normal"
            style={{
              fontFamily: "var(--font-high-spirited), cursive",
              color: "var(--rakhi-text-primary, #2E2A27)",
            }}
            scrollStart="top 50%"
            scrollEnd="bottom 20%"
            stagger={0.08}
          >
            you
          </ScrollFloat>
        </div>

        {/* Heartfelt Quote with ScrollReveal */}
        <ScrollReveal
          containerClassName="text-[2rem] leading-relaxed text-stone-800 mt-6 max-w-[500px] justify-center"
          textClassName="font-normal"
          style={{
            fontFamily: "var(--font-crimson-pro), serif",
            fontStyle: "italic",
          }}
          scrollStart="top bottom-=30%"
          scrollEnd="bottom center+=34%"
          enableBlur={true}
          blurStrength={4}
          stagger={0.06}
        >
          Among billions of people, destiny gave me you as my sister. I don&apos;t want a better destiny—I just want the same one, every lifetime.
        </ScrollReveal>

        {/* Closing Decoration */}
        <div className="mt-16 text-amber-700/25 text-sm select-none" aria-hidden="true">
          ❦ ──── ❦
        </div>
      </div>
    </section>
  );
}
