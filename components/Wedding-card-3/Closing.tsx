"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Import closing section resources
import CoupleImages from "./Closing-section-resources/Couple-images.png";
import BottomCenterFlower from "./Closing-section-resources/Bottom-center-flower.png";
import BottomCornerFlower from "./Closing-section-resources/Bottom-corner-flower.png";
import SideFlowerBranches from "./Closing-section-resources/Side-flower-branches.png";

gsap.registerPlugin(ScrollTrigger);

export default function Closing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!mounted) return;
      // Guard: always check prefers-reduced-motion (GSAP skill rule)
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!sectionRef.current) return;

      const scroller = sectionRef.current.closest("#card-scroll-container");
      if (!scroller) return;

      // ── Initial State Setup ───────────────────────────────────────────────
      // 1. Top heading: normal reveal (hidden initially)
      gsap.set(".top-heading-wrap", { opacity: 0, y: -20, force3D: true });
      // 2 & 3. Cherry blossom branches (hidden and shifted out to left/right sides)
      gsap.set(".branch-left", { opacity: 0, x: -200, rotate: -15, force3D: true });
      gsap.set(".branch-right", { opacity: 0, x: 200, rotate: 15, force3D: true });
      // 4. Text Blocks: hidden (reveals after branches)
      gsap.set([".text-block-1", ".text-block-2"], { opacity: 0, y: 30, force3D: true });
      // 5. Couple Illustration: hidden and slightly scaled down
      gsap.set(".couple-img", { opacity: 0, scale: 0.95, force3D: true });
      // 6, 7 & 8. Bottom flowers: hidden and shifted out from bottom-left, bottom-right, and bottom
      gsap.set(".flower-left", { opacity: 0, x: -120, y: 120, force3D: true });
      gsap.set(".flower-right", { opacity: 0, x: 120, y: 120, force3D: true });
      gsap.set(".flower-center", { opacity: 0, y: 200, force3D: true });

      // Create entrance timeline with top bottom scrolltrigger
      const tl = gsap.timeline({
        delay: 1, // 1s delay before playing the timeline sequence
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          start: "top bottom", // Trigger as soon as the top of the section enters the bottom of the screen
          toggleActions: "play none none none",
        },
      });

      // ── Staggered Reveal Sequence ─────────────────────────────────────────
      tl.to(".top-heading-wrap", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", force3D: true }, 0.0)
        // Branches slide in from the left and right sides
        .to(".branch-left", { opacity: 1, x: 0, rotate: 0.01, duration: 1.2, ease: "power2.out", force3D: true }, 0.1)
        .to(".branch-right", { opacity: 1, x: 0, rotate: 0.01, duration: 1.2, ease: "power2.out", force3D: true }, 0.2)
        // Couple illustration fades in from center
        .to(".couple-img", { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out", force3D: true }, 0.3)
        // Flowers slide up from left-bottom, right-bottom, and center-bottom
        .to(".flower-left", { opacity: 1, x: 0, y: 0, duration: 1.2, ease: "power2.out", force3D: true }, 0.4)
        .to(".flower-right", { opacity: 1, x: 0, y: 0, duration: 1.2, ease: "power2.out", force3D: true }, 0.4)
        .to(".flower-center", { opacity: 1, y: 0, duration: 1.4, ease: "power2.out", force3D: true }, 0.5)
        // Text blocks reveal sequentially after branches complete their animation (around 1.3s mark)
        .to([".text-block-1", ".text-block-2"], { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out", force3D: true }, 1.35);

      // Force multiple refreshes as layout/images load
      ScrollTrigger.refresh();
      const t1 = setTimeout(() => ScrollTrigger.refresh(), 500);
      const t2 = setTimeout(() => ScrollTrigger.refresh(), 1500);
      const t3 = setTimeout(() => ScrollTrigger.refresh(), 3000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    },
    { scope: sectionRef, dependencies: [mounted] }
  );

  if (!mounted) return null;

  const handleImageLoad = () => {
    ScrollTrigger.refresh();
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex-shrink-0 bg-[#FCEAEA] select-none overflow-hidden flex flex-col justify-between mt-20"
    >
      {/* Top heading */}
      <div
        className="top-heading-wrap flex justify-center items-center absolute top-0 left-0 w-full text-center z-20"
        style={{ paddingTop: "clamp(24px, 6vh, 48px)", willChange: "transform, opacity" }}
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
          style={{ transformOrigin: "left top", willChange: "transform, opacity" }}
        >
          <Image
            src={SideFlowerBranches}
            alt=""
            fill
            sizes="(max-width: 480px) 400px, 400px"
            className="object-contain object-left-top"
            onLoad={handleImageLoad}
          />
        </div>

        {/* Right Cherry Blossom Branch (Mid Right - Flipped) */}
        <div
          className="branch-right absolute top-[65%] right-[-53%] w-[400px] h-[300px] pointer-events-none"
          style={{ transformOrigin: "right center", willChange: "transform, opacity" }}
        >
          <Image
            src={SideFlowerBranches}
            alt=""
            fill
            sizes="(max-width: 480px) 400px, 400px"
            className="object-contain object-right-top"
            style={{ transform: "scale(-1, 1)" }}
            onLoad={handleImageLoad}
          />
        </div>

        {/* Text Block 1 (Upper Right) */}
        <div
          className="text-block-1 absolute top-[52%] right-[6%] w-[52%] text-[#9B4B32] text-center"
          style={{ willChange: "transform, opacity" }}
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
          style={{ willChange: "transform, opacity" }}
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
          style={{ willChange: "transform, opacity" }}
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
          style={{ willChange: "transform, opacity" }}
        >
          <Image
            src={CoupleImages}
            alt="Bride and Groom Illustration"
            fill
            sizes="(max-width: 480px) 280px, 280px"
            className="object-contain object-bottom"
            priority
            onLoad={handleImageLoad}
          />
        </div>

        {/* ── Dense Bottom Floral Border ───────────────────────────────── */}
        {/* z-10 overlays the bottom portion of the couple for nesting effect */}
        <div
          className="bottom-flowers-wrap absolute bottom-0 left-0 w-full h-[100%] z-10 flex items-end justify-center pointer-events-none"
        >
          {/* Left Corner Flowers */}
          <div
            className="flower-left absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%]"
            style={{ willChange: "transform, opacity" }}
          >
            <Image
              src={BottomCornerFlower}
              alt=""
              fill
              sizes="(max-width: 480px) 336px, 336px"
              className="object-contain object-left-bottom"
              onLoad={handleImageLoad}
            />
          </div>

          {/* Right Corner Flowers (Flipped horizontally) */}
          <div
            className="flower-right absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] scale-x-[-1]"
            style={{ willChange: "transform, opacity" }}
          >
            <Image
              src={BottomCornerFlower}
              alt=""
              fill
              sizes="(max-width: 480px) 336px, 336px"
              className="object-contain object-left-bottom"
              onLoad={handleImageLoad}
            />
          </div>

          {/* Center Flowers (On top of corner flowers) */}
          <div
            className="flower-center absolute bottom-[-50%] left-1/2 -translate-x-1/2 w-[200%] h-[150%]"
            style={{ willChange: "transform, opacity" }}
          >
            <Image
              src={BottomCenterFlower}
              alt=""
              fill
              sizes="(max-width: 480px) 960px, 960px"
              className="object-contain object-bottom"
              onLoad={handleImageLoad}
            />
          </div>
        </div>
      </div>
    </section>
  );
}