"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });


export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // ── Check if it is a mobile or touch device ─────────────────────────────
    const isMobile = typeof window !== "undefined" && 
      (window.matchMedia("(max-width: 768px)").matches || 
       navigator.maxTouchPoints > 0 || 
       /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

    if (isMobile) {
      // Use native momentum scroll for mobile to eliminate touch lag
      return;
    }

    const lenis = new Lenis({
      duration: 1.8, // Increased from 1.2 for a slower, more graceful glide
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.55, // Scale down mouse wheel scroll speed by 45%
      infinite: false,
    });

    // ─ Single source of RAF truth ──────────────────────────────────────────
    // Named callback function to guarantee clean ticker unregistration
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Keep ScrollTrigger in sync with Lenis's interpolated scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Expose lenis globally for programmatic scrollTo calls
    if (typeof window !== "undefined") {
      (window as unknown as Record<string, unknown>).lenis = lenis;
    }

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      if (typeof window !== "undefined") {
        delete (window as unknown as Record<string, unknown>).lenis;
      }
    };
  }, []);

  return <>{children}</>;
}
