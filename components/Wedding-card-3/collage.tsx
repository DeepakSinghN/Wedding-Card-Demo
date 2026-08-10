"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Import cropped photos
import PhotoTopLeft from "./Collage-section-resources/photo-top-left.jpg";
import PhotoTopRight from "./Collage-section-resources/photo-top-right.jpg";
import PhotoMidLeft from "./Collage-section-resources/photo-mid-left.jpg";
import PhotoMidCenter from "./Collage-section-resources/photo-mid-center.jpg";
import PhotoMidRight from "./Collage-section-resources/photo-mid-right.jpg";
import PhotoBottomLeft from "./Collage-section-resources/photo-bottom-left.jpg";
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

      // 1. Set starting states for cell animations (hidden + shifted down)
      const cells = gsap.utils.toArray(".collage-cell") as HTMLElement[];
      gsap.set(cells, { opacity: 0, y: 30 });
      gsap.set(".collage-heading", { opacity: 0, y: -20 });
      gsap.set([".cell-text-1", ".cell-text-2"], { letterSpacing: "0.01em" });

      // Create entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          scroller: scrollerElement,
          start: "top 80%", // Animates when section top is 80% down the screen
          toggleActions: "play none none none"
        }
      });

      // Stagger entrance row-by-row with custom timings & spacing for text beats
      tl.to(".collage-heading", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 0.0)
        .to(".cell-top-left", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.1)
        .to(".cell-top-right", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.18)
        .to(".cell-text-1", { opacity: 1, y: 0, letterSpacing: "0.05em", duration: 0.8, ease: "power2.out" }, 0.32)

        .to(".cell-mid-left", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.46)
        .to(".cell-mid-center", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.54)
        .to(".cell-mid-right", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.62)

        .to(".cell-bottom-left", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.76)
        .to(".cell-text-2", { opacity: 1, y: 0, letterSpacing: "0.05em", duration: 0.8, ease: "power2.out" }, 0.90)
        .to(".cell-bottom-right", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 1.04);

      // 2. Parallax depth scroll effect for the tall bottom-left photo
      gsap.fromTo(
        ".parallax-img",
        { y: "-6%" },
        {
          y: "6%",
          ease: "none",
          scrollTrigger: {
            trigger: ".cell-bottom-left",
            scroller: scrollerElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, isMobile] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex-shrink-0 bg-[#FBEAEA] select-none overflow-hidden flex items-center justify-center mt-20"
    >

      {/* Section Heading */}
      <h2
        className="collage-heading absolute top-[1.2%] left-0 w-full text-center text-[7.5cqi] text-[#9D2C2D] font-normal z-20"
        style={{ fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive" }}
      >
        Our moments
      </h2>
      <div
        ref={containerRef}
        className="relative w-full h-full max-h-screen max-w-full aspect-[726/1024] mx-auto"
      >
        {/* 1. Top-Left Photo (Landscape) */}
        <div
          className="collage-cell cell-top-left absolute overflow-hidden group cursor-pointer"
          style={{ left: "5.51%", top: "5.57%", width: "51.38%", height: "22.95%" }}
        >
          <div className="w-full h-full overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
            <Image
              src={PhotoTopLeft}
              alt="Couple candid 1"
              fill
              sizes="(max-width: 480px) 50vw, 240px"
              className="object-cover"
            />
          </div>
        </div>

        {/* 2. Top-Right Photo (Portrait) */}
        <div
          className="collage-cell cell-top-right absolute overflow-hidden group cursor-pointer"
          style={{ left: "58.26%", top: "5.57%", width: "36.09%", height: "33.01%" }}
        >
          <div className="w-full h-full overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
            <Image
              src={PhotoTopRight}
              alt="Couple candid 2"
              fill
              sizes="(max-width: 480px) 40vw, 180px"
              className="object-cover"
            />
          </div>
        </div>

        {/* 3. Text Block 1 ("A little glimpse into our journey") */}
        <div
          className="collage-cell cell-text-1 absolute flex items-center justify-center text-center px-2"
          style={{ left: "5.51%", top: "%", width: "51.38%", height: "8.79%" }}
        >
          <p
            className="font-serif italic text-[#9D2C2D] text-[3.8cqi] leading-[2] font-medium"
            style={{ fontFamily: "Georgia, serif" }}
          >
            A little glimpse into<br />our journey
          </p>
        </div>

        {/* 4. Middle Row - Left Photo (Square) */}
        <div
          className="collage-cell cell-mid-left absolute overflow-hidden group cursor-pointer"
          style={{ left: "5.51%", top: "39.55%", width: "28.65%", height: "20.61%" }}
        >
          <div className="w-full h-full overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
            <Image
              src={PhotoMidLeft}
              alt="Couple candid 3"
              fill
              sizes="(max-width: 480px) 30vw, 140px"
              className="object-cover"
            />
          </div>
        </div>

        {/* 5. Middle Row - Center Photo (Square) */}
        <div
          className="collage-cell cell-mid-center absolute overflow-hidden group cursor-pointer"
          style={{ left: "35.67%", top: "39.75%", width: "28.65%", height: "20.61%" }}
        >
          <div className="w-full h-full overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
            <Image
              src={PhotoMidCenter}
              alt="Couple candid 4"
              fill
              sizes="(max-width: 480px) 30vw, 140px"
              className="object-cover"
            />
          </div>
        </div>

        {/* 6. Middle Row - Right Photo (Square) */}
        <div
          className="collage-cell cell-mid-right absolute overflow-hidden group cursor-pointer"
          style={{ left: "65.84%", top: "39.75%", width: "28.65%", height: "20.61%" }}
        >
          <div className="w-full h-full overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
            <Image
              src={PhotoMidRight}
              alt="Couple candid 5"
              fill
              sizes="(max-width: 480px) 30vw, 140px"
              className="object-cover"
            />
          </div>
        </div>

        {/* 7. Bottom-Left Photo (Tall Portrait with Parallax) */}
        <div
          className="collage-cell cell-bottom-left absolute overflow-hidden group cursor-pointer"
          style={{ left: "5.51%", top: "61.72%", width: "36.09%", height: "32.62%" }}
        >
          <div className="w-full h-full overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
            <div className="relative w-full h-[112%] top-[-6%] parallax-img">
              <Image
                src={PhotoBottomLeft}
                alt="Couple candid 6"
                fill
                sizes="(max-width: 480px) 40vw, 180px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* 8. Text Block 2 ("from where it started to where we are now.") */}
        <div
          className="collage-cell cell-text-2 absolute flex items-center justify-center text-center px-2"
          style={{ left: "43.25%", top: "62%", width: "51.38%", height: "8.30%" }}
        >
          <p
            className="font-serif italic text-[#9D2C2D] text-[3.8cqi] leading-[1.4] font-medium"
            style={{ fontFamily: "Georgia, serif" }}
          >
            from where it started to<br />where we are now.
          </p>
        </div>

        {/* 9. Bottom-Right Photo (Landscape) */}
        <div
          className="collage-cell cell-bottom-right absolute overflow-hidden group cursor-pointer"
          style={{ left: "43.25%", top: "71.68%", width: "51.38%", height: "22.66%" }}
        >
          <div className="w-full h-full overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
            <Image
              src={PhotoBottomRight}
              alt="Couple candid 7"
              fill
              sizes="(max-width: 480px) 50vw, 240px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
