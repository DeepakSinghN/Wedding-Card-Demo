"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const base = "/Wedding-card-2/Save-the-date";

export default function SaveTheDate() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Create a GSAP timeline with ScrollTrigger toggleActions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%", // Starts playing when the section enters 90% of the viewport height
        end: "bottom bottom",
        toggleActions: "play none none reverse", // Play on scroll down, reverse on scroll up past start point
      }
    });

    // 1. Gold Frame scales up & fades in
    tl.fromTo(".save-date-frame",
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
    );

    // 2. Heading "Save The Date" fades in & slides down slightly
    tl.fromTo(".save-date-title",
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
      "-=0.9"
    );

    // 3. Ganesha Icon fades in & slides down
    tl.fromTo(".save-date-ganesha",
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
      "-=0.8"
    );

    // 3. Names slide up & fade in
    tl.fromTo(".save-date-names",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
      "-=0.8"
    );

    // 4. Date & Ornament slide down & fade in
    tl.fromTo(".save-date-date",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
      "-=0.8"
    );

    // 5. Bless Us text fades in & slides right slightly
    tl.fromTo(".save-date-bless",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 1.0, ease: "power2.out" },
      "-=0.8"
    );

    // 6. Couple Illustration slides up from bottom & fades in
    tl.fromTo(".save-date-couple",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" },
      "-=0.9"
    );

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="@container relative w-full min-h-[120vh] bg-[#fbf4e6] overflow-hidden"
    >


      {/* Top Heading: Save The Date */}
      <div className="absolute top-[12%] left-0 right-0 flex flex-col items-center justify-center text-center z-10 opacity-0 save-date-title">
        <h1
          className="font-alex-brush text-[11cqi] text-[#590A2E] tracking-wider"
          style={{
            fontFamily: "var(--font-alex-brush), cursive",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
          }}
        >
          Save The Date
        </h1>
      </div>

      {/* Layer 1: Central Gold Arch Frame */}
      <div className="absolute left-[0%] inset-[6cqi] z-0 opacity-0 w-[100%] h-[100%] save-date-frame">
        <Image
          src={`${base}/frame.svg`}
          alt=""
          fill
          className="object-contain pointer-events-none select-none"
          priority
        />
      </div>

      {/* Layer 2: Ganesha Icon Centered at the Top */}
      <div className="absolute top-[23%] left-[50%] translate-x-[-50%] w-[20%] h-[20%] z-10 opacity-0 save-date-ganesha">
        <Image
          src={`${base}/ganesh%20ji.svg`}
          alt="Lord Ganesha"
          fill
          className="object-contain pointer-events-none select-none"
        />
      </div>



      {/* Layer 3: Cursive Groom & Bride Names Stacked */}
      <div className="absolute top-[38%] left-0 right-0 flex flex-col items-center justify-center text-center z-10 opacity-0 save-date-names">
        <h2
          className="font-alex-brush text-[11.5cqi] leading-[1.0] text-[#590A2E] tracking-wide"
          style={{
            fontFamily: "var(--font-alex-brush), cursive",
            textShadow: "0.5px 1px 1px rgba(0,0,0,0.1)"
          }}
        >
          Deepak &
        </h2>
        <h2
          className="font-alex-brush text-[11.5cqi] leading-[1.0] text-[#590A2E] tracking-wide"
          style={{
            fontFamily: "var(--font-alex-brush), cursive",
            textShadow: "0.5px 1px 1px rgba(0,0,0,0.1)"
          }}
        >
          Amrita
        </h2>
      </div>

      {/* Layer 4: Wedding Date and Separator Ornament */}
      <div className="absolute top-[49%] left-0 right-0 flex flex-col items-center justify-center text-center z-10 opacity-0 save-date-date">
        <h3
          className="font-serif text-[6.2cqi] font-bold text-[#590A2E] tracking-[0.05em] uppercase"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          17 MAY 2026
        </h3>
        <div className="relative w-[55%] h-[10cqi]  z-10">
          <Image
            src={`${base}/ornament.svg`}
            alt=""
            fill
            className="object-cover pointer-events-none select-none"
          />
        </div>
      </div>

      {/* Layer 5: Bless Us Message (Spaced gold letters on the left) */}
      <div className="absolute left-[30%] bottom-[32%] w-[40cqi] flex flex-col items-start text-left z-10 opacity-0 save-date-bless">
        <span
          className="font-sans text-[5.4cqi] font-bold tracking-[0.22em] text-[#a8823b] leading-[1.35] uppercase"
          style={{
            fontFamily: "var(--font-arimo), sans-serif",
            textShadow: "0.5px 0.5px 1px rgba(255,255,255,0.8)"
          }}
        >
          Bless Us
          <br />
          On Our
          <br />
          Union!
        </span>
      </div>

      {/* Layer 6: Vector Couple Illustration (Aligned bottom-right, overlapping frame) */}
      <div className="absolute right-[2cqi] bottom-[40cqi] w-[53cqi] h-[65cqi] z-20 pointer-events-none select-none opacity-0 save-date-couple">
        <Image
          src={`${base}/couple.svg`}
          alt="Deepak and Amrita Illustration"
          fill
          className="object-contain object-bottom object-right"
        />
      </div>
    </section>
  );
}
