"use client";

import { useState } from "react";
import Hero from "@/components/Rakhi-card/Hero";
import Story from "@/components/Rakhi-card/Story";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [coords, setCoords] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);

  // 1. Measure and calculate start & end coordinates for the butterfly path
  useGSAP(() => {
    const calculatePositions = () => {
      const startEl = document.getElementById("butterfly-start-anchor");
      const endEl = document.getElementById("butterfly-end-anchor");
      
      if (startEl && endEl) {
        const startRect = startEl.getBoundingClientRect();
        const endRect = endEl.getBoundingClientRect();
        const scrollY = window.scrollY;

        setCoords({
          startX: startRect.left + window.scrollX,
          startY: startRect.top + scrollY,
          endX: endRect.left + window.scrollX,
          endY: endRect.top + scrollY,
        });
      }
    };

    // Delay calculation slightly so Next.js paint and layout calculations are stable
    const timer = setTimeout(() => {
      calculatePositions();
    }, 150);

    // Dynamic responsiveness: recalculate on window resize or ScrollTrigger refresh
    window.addEventListener("resize", calculatePositions);
    ScrollTrigger.addEventListener("refresh", calculatePositions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculatePositions);
      ScrollTrigger.removeEventListener("refresh", calculatePositions);
    };
  }, []);

  // 2. Animate the butterfly entrance, flight path, and local roaming
  useGSAP(() => {
    if (!coords) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Direct placement at final spot with no motion
      gsap.set("#global-butterfly-path", {
        opacity: 1,
        scale: 1.33,
        x: coords.endX - coords.startX,
        y: coords.endY - coords.startY,
      });
      return;
    }

    // ── Butterfly Entrance ──
    // Wait for the recipient name card entrance (1.65s delay)
    gsap.fromTo(
      "#global-butterfly-path",
      {
        opacity: 0,
        scale: 0,
        rotate: -25,
      },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        delay: 1.65,
        duration: 0.75,
        ease: "back.out(1.6)",
      }
    );

    // ── Butterfly Flight Path ──
    // Animates along the scroll as the Story section overlaps the Hero section
    gsap.fromTo(
      "#global-butterfly-path",
      {
        x: 0,
        y: 0,
        scale: 1,
      },
      {
        scrollTrigger: {
          trigger: "#rakhi-next-section",
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
        x: coords.endX - coords.startX,
        y: coords.endY - coords.startY,
        scale: 1.33,
        ease: "power1.inOut",
      }
    );
  }, [coords]);

  return (
    <main className="w-full relative">
      {/* Hero section — sticky, pins at viewport top */}
      <Hero />

      {/* Story section — rolls up and covers the Hero section smoothly */}
      <Story />

      {/* Global animated butterfly that transitions between sections */}
      {coords && (
        <div
          id="global-butterfly-path"
          className="absolute pointer-events-none z-30"
          style={{
            left: coords.startX,
            top: coords.startY,
            width: "48px",
            height: "48px",
            transformOrigin: "center center",
          }}
        >
          <div id="global-butterfly-roam" className="w-full h-full">
            <DotLottieReact
              src="https://lottie.host/f10f2406-a975-4765-94ce-c02294ef7f45/sMIOyPrNwR.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      )}
    </main>
  );
}
