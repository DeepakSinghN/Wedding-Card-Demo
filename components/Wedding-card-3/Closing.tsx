"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Import closing section resources
import CoupleImages from "./Closing-section-resources/Couple-images.svg";
import BottomCenterFlower from "./Closing-section-resources/Bottom-center-flower.svg";
import BottomCornerFlower from "./Closing-section-resources/Bottom-corner-flower.svg";
import SideFlowerBranches from "./Closing-section-resources/Side-flower-branches.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Closing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      // Guard: always check prefers-reduced-motion (GSAP skill rule)
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!sectionRef.current) return;

      const scroller = sectionRef.current.closest("#card-scroll-container");
      if (!scroller) return;

      // ── Initial State Setup ───────────────────────────────────────────────
      // 1. Top heading: normal reveal (hidden initially)
      gsap.set(".top-heading-wrap", { opacity: 0, y: -20 });
      // 2 & 3. Cherry blossom branches (hidden and shifted out to left/right sides)
      gsap.set(".branch-left", { opacity: 0, x: -200, rotate: -15 });
      gsap.set(".branch-right", { opacity: 0, x: 200, rotate: 15 });
      // 4. Text Blocks: hidden (reveals after branches)
      gsap.set([".text-block-1", ".text-block-2"], { opacity: 0, y: 30 });
      // 5. Couple Illustration: hidden and slightly scaled down
      gsap.set(".couple-img", { opacity: 0, scale: 0.95 });
      // 6, 7 & 8. Bottom flowers: hidden and shifted out from bottom-left, bottom-right, and bottom
      gsap.set(".flower-left", { opacity: 0, x: -120, y: 120 });
      gsap.set(".flower-right", { opacity: 0, x: 120, y: 120 });
      gsap.set(".flower-center", { opacity: 0, y: 200 });

      // Create entrance timeline with 95% screen scrolltrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          start: "top 95%", // Trigger when section top is 95% down viewport (just entering the screen)
          toggleActions: "play none none none",
        },
      });

      // ── Staggered Reveal Sequence ─────────────────────────────────────────
      tl.to(".top-heading-wrap", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 0.0)
        // Branches slide in from the left and right sides
        .to(".branch-left", { opacity: 1, x: 0, rotate: 0, duration: 1.2, ease: "power2.out" }, 0.1)
        .to(".branch-right", { opacity: 1, x: 0, rotate: 0, duration: 1.2, ease: "power2.out" }, 0.1)
        // Couple illustration fades in from center
        .to(".couple-img", { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, 0.2)
        // Flowers slide up from left-bottom, right-bottom, and center-bottom
        .to(".flower-left", { opacity: 1, x: 0, y: 0, duration: 1.2, ease: "power2.out" }, 0.3)
        .to(".flower-right", { opacity: 1, x: 0, y: 0, duration: 1.2, ease: "power2.out" }, 0.3)
        .to(".flower-center", { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" }, 0.4)
        // Text blocks reveal sequentially after branches complete their animation (around 1.3s mark)
        .to([".text-block-1", ".text-block-2"], { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }, 1.35);

      // Force an immediate refresh and another one after images/layout settle
      ScrollTrigger.refresh();
      const t = setTimeout(() => ScrollTrigger.refresh(), 800);
      return () => clearTimeout(t);
    },
    { scope: sectionRef }
  );

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex-shrink-0 bg-[#FCEAEA] select-none overflow-hidden flex flex-col justify-between mt-20"
    >
      {/* Top heading */}
      <div
        className="top-heading-wrap flex justify-center items-center absolute top-0 left-0 w-full text-center z-20"
        style={{ paddingTop: "clamp(24px, 6vh, 48px)" }}
      >
        <h1
          style={{
            fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive",
            fontSize: "clamp(1.7rem, 9cqi, 2.4rem)",
            color: "#9B4B32",
            lineHeight: 1.6,
            padding: "0 16px",
          }}
          className="max-w-[90%]"
        >
          We looking forwards to celebrate with you
        </h1>
      </div>

      {/* ── UPPER ZONE: Message + Floral Accents (58%) ─────────────────── */}
      <div className="relative w-full h-[58%] overflow-visible">
        {/* Left Cherry Blossom Branch (Upper Left) */}
        <div
          className="branch-left absolute top-[30%] left-[-16px] w-[400px] h-[300px] pointer-events-none"
          style={{ transformOrigin: "left top" }}
        >
          <Image
            src={SideFlowerBranches}
            alt=""
            fill
            className="object-contain object-left-top"
          />
        </div>

        {/* Right Cherry Blossom Branch (Mid Right - Flipped) */}
        <div
          className="branch-right absolute top-[65%] right-[50%] w-[400px] h-[300px] pointer-events-none scale-x-[-1]"
          style={{ transformOrigin: "right center" }}
        >
          <Image
            src={SideFlowerBranches}
            alt=""
            fill
            className="object-contain object-right-top"
          />
        </div>

        {/* Text Block 1 (Upper Right) */}
        <div
          className="text-block-1 absolute top-[52%] right-[6%] w-[52%] text-[#9B4B32] text-center"
        >
          <h2
            style={{
              fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive",
              fontSize: "clamp(1.9rem, 12cqi, 2.7rem)",
              lineHeight: 1.25,
            }}
          >
            Vivek
          </h2>
        </div>

        {/* Text Block 2 (Mid Left) */}
        <div
          className="text-block-2 absolute top-[73%] left-1/2 -translate-x-1/2 w-[52%] text-[#9B4B32] text-center"
        >
          <h2
            style={{
              fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive",
              fontSize: "clamp(1.9rem, 7cqi, 2.7rem)",
              lineHeight: 1.25,
            }}
          >
            &
          </h2>
        </div>

        <div
          className="text-block-2 absolute top-[93%] left-[1%] w-[52%] text-[#9B4B32] text-center"
        >
          <h2
            style={{
              fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive",
              fontSize: "clamp(1.9rem, 12cqi, 2.7rem)",
              lineHeight: 1.25,
            }}
          >
            Khushi
          </h2>
        </div>
      </div>

      {/* ── LOWER ZONE: Couple + Floral Border (42%) ───────────────────── */}
      <div className="relative w-full h-[42%] overflow-visible flex justify-center items-end">
        {/* Couple Illustration */}
        {/* Positioned slightly raised so they nestle inside the bottom flowers */}
        <div
          className="couple-img absolute bottom-[7%] w-[90%] h-[100%] max-w-[280px] z-0 pointer-events-none"
        >
          <Image
            src={CoupleImages}
            alt="Bride and Groom Illustration"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>

        {/* ── Dense Bottom Floral Border ───────────────────────────────── */}
        {/* z-10 overlays the bottom portion of the couple for nesting effect */}
        <div
          className="bottom-flowers-wrap absolute bottom-0 left-0 w-full h-[100%] z-10 flex items-end justify-center pointer-events-none"
        >
          {/* Left Corner Flowers */}
          <div className="flower-left absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%]">
            <Image
              src={BottomCornerFlower}
              alt=""
              fill
              className="object-contain object-left-bottom"
            />
          </div>

          {/* Right Corner Flowers (Flipped horizontally) */}
          <div className="flower-right absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] scale-x-[-1]">
            <Image
              src={BottomCornerFlower}
              alt=""
              fill
              className="object-contain object-left-bottom"
            />
          </div>

          {/* Center Flowers (On top of corner flowers) */}
          <div className="flower-center absolute bottom-[-50%] left-1/2 -translate-x-1/2 w-[200%] h-[150%]">
            <Image
              src={BottomCenterFlower}
              alt=""
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}