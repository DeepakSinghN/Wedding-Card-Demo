"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Closing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionListener);
    return () => motionQuery.removeEventListener("change", motionListener);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const triggerElement = sectionRef.current;
      if (!triggerElement) return;

      const scrollerElement = triggerElement.closest("#card-scroll-container");
      if (!scrollerElement) return;

      // Set starting states
      gsap.set(".closing-heading", { opacity: 0, y: 30 });
      gsap.set(".closing-line", { scaleX: 0 });
      gsap.set(".closing-text", { opacity: 0, y: 20 });

      // Create entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          scroller: scrollerElement,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      tl.to(".closing-heading", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .to(".closing-line", { scaleX: 1, duration: 1.0, ease: "power3.out" }, "-=0.4")
        .to(".closing-text", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.2 }, "-=0.6");
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex-shrink-0 bg-[#FCEDEC] select-none overflow-hidden flex flex-col items-center justify-center p-6 text-center"
    >
      {/* Decorative Muted Gold Borders */}
      <div className="absolute inset-[6%] border border-[#C5A880]/30 pointer-events-none rounded-3xl" />
      <div className="absolute inset-[6.8%] border border-[#C5A880]/15 pointer-events-none rounded-[22px]" />

      <div className="relative z-10 max-w-[84%] flex flex-col items-center">
        {/* Cursive heading */}
        <h2
          className="closing-heading text-[10cqi] text-[#C5A880] font-normal mb-2"
          style={{ fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive" }}
        >
          We look forward to
        </h2>
        <h2
          className="closing-heading text-[10cqi] text-[#C5A880] font-normal mb-16"
          style={{ fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive" }}
        >
          celebrating with you
        </h2>

        {/* Separator line */}
        <div className="closing-line w-24 h-[1px] bg-[#C5A880]/40 mb-8 origin-center" />

        {/* Signatures */}
        <p
          className="closing-text text-[11cqi] text-[#A02C2D] font-normal tracking-[2px] leading-[5rem]"
          style={{ fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive" }}
        >
          Daniel <br /> & <br /> Maria
        </p>
      </div>
    </section>
  );
}
