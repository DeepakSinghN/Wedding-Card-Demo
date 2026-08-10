"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Import cropped photos
import PhotoTopLeft from "./Collage-section-resources/photo-top-left.jpg";
import PhotoMidLeft from "./Collage-section-resources/photo-mid-left.jpg";
import PhotoMidCenter from "./Collage-section-resources/photo-mid-center.jpg";
import PhotoMidRight from "./Collage-section-resources/photo-mid-right.jpg";
import PhotoBottomRight from "./Collage-section-resources/photo-bottom-right.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Collage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionListener);

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mobileQuery.matches);
    const mobileListener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mobileQuery.addEventListener("change", mobileListener);

    return () => {
      motionQuery.removeEventListener("change", motionListener);
      mobileQuery.removeEventListener("change", mobileListener);
    };
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const triggerElement = sectionRef.current;
      if (!triggerElement) return;

      const scrollerElement = triggerElement.closest("#card-scroll-container");
      if (!scrollerElement) return;

      // 1. Set starting states for cell animations (hidden + shifted down + scaled up)
      const cells = gsap.utils.toArray(".collage-cell") as HTMLElement[];
      gsap.set(cells, { opacity: 0, y: 30 });
      gsap.set(".collage-heading", { opacity: 0, y: -20 });

      // Set initial clip-path wipe states
      gsap.set(".cell-top img", { clipPath: "inset(0% 100% 0% 0%)", scale: 1.15 });
      gsap.set(".cell-mid-left img", { clipPath: "inset(0% 0% 100% 0%)", scale: 1.15 });
      gsap.set(".cell-mid-center img", { clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 });
      gsap.set(".cell-mid-right img", { clipPath: "inset(0% 0% 100% 0%)", scale: 1.15 });
      gsap.set(".cell-bottom img", { clipPath: "inset(0% 0% 0% 100%)", scale: 1.15 });

      gsap.set([".cell-text-1", ".cell-text-2"], { letterSpacing: "0.01em" });

      // Create entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          scroller: scrollerElement,
          start: "top 90%", // Animates when section top is 70% down the screen
          toggleActions: "play none none none"
        }
      });

      // Stagger entrance row-by-row with custom timings & spacing for text beats
      tl.to(".collage-heading", { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, 0.0)

        // Row 1: Top Landscape photo (left-to-right wipe)
        .to(".cell-top", { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, 0.15)
        .to(".cell-top img", { clipPath: "inset(0% 0% 0% 0%)", scale: 1.0, duration: 1.4, ease: "power2.out" }, 0.15)

        // Row 2: Text 1
        .to(".cell-text-1", { opacity: 1, y: 0, letterSpacing: "0.03em", duration: 1.2, ease: "power2.out" }, 0.35)

        // Row 3: Middle 3 Square photos
        // Left (top-to-bottom wipe)
        .to(".cell-mid-left", { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, 0.55)
        .to(".cell-mid-left img", { clipPath: "inset(0% 0% 0% 0%)", scale: 1.0, duration: 1.4, ease: "power2.out" }, 0.55)

        // Center (bottom-to-top wipe)
        .to(".cell-mid-center", { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, 0.67)
        .to(".cell-mid-center img", { clipPath: "inset(0% 0% 0% 0%)", scale: 1.0, duration: 1.4, ease: "power2.out" }, 0.67)

        // Right (top-to-bottom wipe)
        .to(".cell-mid-right", { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, 0.79)
        .to(".cell-mid-right img", { clipPath: "inset(0% 0% 0% 0%)", scale: 1.0, duration: 1.4, ease: "power2.out" }, 0.79)

        // Row 4: Text 2
        .to(".cell-text-2", { opacity: 1, y: 0, letterSpacing: "0.03em", duration: 1.2, ease: "power2.out" }, 0.99)

        // Row 5: Bottom Landscape photo (right-to-left wipe)
        .to(".cell-bottom", { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, 1.19)
        .to(".cell-bottom img", { clipPath: "inset(0% 0% 0% 0%)", scale: 1.0, duration: 1.4, ease: "power2.out" }, 1.19);

      // Refresh ScrollTrigger after layouts render
      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1200);

      return () => clearTimeout(refreshTimeout);
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, isMobile] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex-shrink-0 bg-[#FBEAEA] select-none overflow-hidden flex flex-col items-center justify-start mt-30 pt-6 pb-6"
    >
      {/* Section Heading */}
      <h2
        className="collage-heading text-[12cqi] text-[#9D2C2D] font-normal z-20 mb-16"
        style={{ fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive" }}
      >
        Our moments
      </h2>

      <div
        ref={containerRef}
        className="w-full flex-1 max-h-[83vh] flex flex-col justify-between "
      >
        {/* 1. Top Landscape Photo */}
        <div className="collage-cell cell-top w-[89%] aspect-[1.1/1] relative overflow-hidden rounded-2xl mx-auto shadow-sm">
          <div className="w-full h-full overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]">
            <Image
              src={PhotoTopLeft}
              alt="Couple moments top"
              fill
              sizes="(max-width: 480px) 90vw, 420px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* 2. Text Block 1 */}
        <div className="collage-cell cell-text-1 text-center px-4">
          <p
            className="font-serif italic text-[#9D2C2D] text-[3.5cqi] leading-[1.8] font-medium py-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            A little glimpse into our journey
          </p>
        </div>

        {/* 3. Middle Squares Row */}
        <div className="w-[89%] grid grid-cols-3 gap-[3%] mx-auto">
          {/* Left Square */}
          <div className="collage-cell cell-mid-left aspect-square relative overflow-hidden rounded-xl shadow-sm">
            <div className="w-full h-full overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]">
              <Image
                src={PhotoMidLeft}
                alt="Couple moments left"
                fill
                sizes="(max-width: 480px) 30vw, 140px"
                className="object-cover"
              />
            </div>
          </div>
          {/* Center Square */}
          <div className="collage-cell cell-mid-center aspect-square relative overflow-hidden rounded-xl shadow-sm">
            <div className="w-full h-full overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]">
              <Image
                src={PhotoMidCenter}
                alt="Couple moments center"
                fill
                sizes="(max-width: 480px) 30vw, 140px"
                className="object-cover"
              />
            </div>
          </div>
          {/* Right Square */}
          <div className="collage-cell cell-mid-right aspect-square relative overflow-hidden rounded-xl shadow-sm">
            <div className="w-full h-full overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]">
              <Image
                src={PhotoMidRight}
                alt="Couple moments right"
                fill
                sizes="(max-width: 480px) 30vw, 140px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* 4. Text Block 2 */}
        <div className="collage-cell cell-text-2 text-center px-4">
          <p
            className="font-serif italic text-[#9D2C2D] text-[3.5cqi] leading-[1.8] font-medium py-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            from where it started to where we are now.
          </p>
        </div>

        {/* 5. Bottom Landscape Photo */}
        <div className="collage-cell cell-bottom w-[89%] aspect-[1.1/1] relative overflow-hidden rounded-2xl mx-auto shadow-sm">
          <div className="w-full h-full overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]">
            <Image
              src={PhotoBottomRight}
              alt="Couple moments bottom"
              fill
              sizes="(max-width: 480px) 90vw, 420px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
