"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Import bottom-card from Events-section-resources
import BottomCard from "./Events-section-resources/bottom-card.svg";

gsap.registerPlugin(ScrollTrigger);

type WeddingEvent = {
  id: string;
  title: string;
  dateTime: string;
  location: string;
  dressCode: string;
  mapLink: string;
};

const events: WeddingEvent[] = [
  {
    id: "sangeet",
    title: "Sangeet Night",
    dateTime: "Friday, Nov 27 • 7:00 PM Onwards",
    location: "Grand Ballroom, The Oberoi Amarvilas",
    dressCode: "Indo-Western Ethnic / Bling",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Oberoi+Amarvilas+Agra",
  },
  {
    id: "haldi",
    title: "Haldi Ceremony",
    dateTime: "Saturday, Nov 28 • 10:00 AM Onwards",
    location: "Lawn Area, The Oberoi Amarvilas",
    dressCode: "Yellow Traditional Wear",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Oberoi+Amarvilas+Agra",
  },
  {
    id: "wedding",
    title: "Wedding Ceremony",
    dateTime: "Sunday, Nov 29 • 11:00 AM Onwards",
    location: "Main Hall, The Oberoi Amarvilas",
    dressCode: "Traditional Formal",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Oberoi+Amarvilas+Agra",
  },
];

export default function EventDetails() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
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

      const items = contentRefs.current.filter(Boolean) as HTMLDivElement[];
      if (items.length === 0) return;

      const triggerElement = sectionRef.current;
      if (!triggerElement) return;

      const scrollerElement = triggerElement.closest("#card-scroll-container");
      if (!scrollerElement) return;

      // Set initial states: first card visible, rest hidden and offset below
      gsap.set(items.slice(1), { opacity: 0, y: "100%" });
      gsap.set(items[0], { opacity: 1, y: "0%" });

      // 1. Entrance parallax slide-up for the envelope base card as the section scrolls into the viewport
      gsap.fromTo(
        ".envelope-base-frame",
        { y: "100%" },
        {
          y: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: triggerElement,
            scroller: scrollerElement,
            start: "top bottom",
            end: "top top",
            scrub: isMobile ? true : 1, // Instantly match scroll on mobile, smooth delay on desktop
            invalidateOnRefresh: true,
          }
        }
      );

      // 2. Sticky Pin Timeline for event cards
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          scroller: scrollerElement,
          start: "top top",
          end: "bottom bottom",
          scrub: isMobile ? true : 1, // Instantly match scroll on mobile, smooth delay on desktop
          snap: undefined, // Disable snapping on both desktop and mobile for standard scrolling
          invalidateOnRefresh: true,
        },
      });

      items.forEach((item, i) => {
        if (i === 0) return;
        const segmentStart = (i - 1) / (items.length - 1);

        // Unified, symmetric card slide and crossfade
        tl.to(items[i - 1], { opacity: 0, y: "-100%", duration: 0.35, ease: "power2.inOut" }, segmentStart);
        tl.to(item, { opacity: 1, y: "0%", duration: 0.35, ease: "power2.inOut" }, segmentStart);
      });

      // Refresh ScrollTrigger after layout animation finishes (e.g. 1.2s delay)
      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1200);

      return () => clearTimeout(refreshTimeout);
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, isMobile] }
  );

  // Fallback for accessibility or reduced-motion
  if (prefersReducedMotion) {
    return (
      <div className="relative w-full py-[6vh] px-6 bg-[#FCEAEA] flex flex-col gap-[4vh] text-center flex-shrink-0 ">
        <div className="absolute inset-0 z-0">
          <Image
            src={BottomCard}
            alt=""
            fill
            className="object-cover opacity-20 pointer-events-none"
          />
        </div>

        <h2
          className="relative z-10 text-[10cqi] text-[#9B4B32] font-normal mb-2"
          style={{ fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive" }}
        >
          Event Schedule
        </h2>

        {events.map((event) => (
          <div
            key={event.id}
            className="relative z-10 py-6 border-b border-[#9B4B32]/20 last:border-0 flex flex-col items-center"
          >
            <h3
              className="text-[8cqi] font-normal text-[#9B4B32] mb-3"
              style={{ fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive" }}
            >
              {event.title}
            </h3>
            <p
              className="text-[3.6cqi] font-medium text-[#9B4B32]"
              style={{ fontFamily: "var(--font-body), sans-serif" }}
            >
              {event.dateTime}
            </p>
            <p
              className="text-[3.4cqi] text-[#9B4B32]/80 mt-2 max-w-[80%]"
              style={{ fontFamily: "var(--font-body), sans-serif" }}
            >
              {event.location}
            </p>
            <p
              className="text-[3.2cqi] italic text-[#9B4B32]/70 mt-2"
              style={{ fontFamily: "var(--font-display), Georgia, serif" }}
            >
              Dress Code: {event.dressCode}
            </p>
            <a
              href={event.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-[3cqi] uppercase tracking-widest border-b border-[#9B4B32] text-[#9B4B32] pb-1 font-semibold"
              style={{ fontFamily: "var(--font-body), sans-serif" }}
            >
              Get Directions
            </a>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="relative w-full flex-shrink-0 bg-[#FCEAEA] mb-20">
      {/* Pinned inner wrapper */}
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden bg-[#FCEAEA]">
        {/* Base Illustrated Card Frame (includes red envelope flap and bow) */}
        <div className="envelope-base-frame absolute inset-0 z-0 bg-[#FCEAEA]">
          <Image
            src={BottomCard}
            alt="Event Base Card"
            fill
            priority
            className="object-cover pointer-events-none select-none"
          />
        </div>

        {/* Content area — sits in the cream space above the envelope flap */}
        <div className="absolute top-[12%] left-0 w-full h-[45%] flex items-center justify-center overflow-hidden z-20">
          {events.map((event, i) => (
            <div
              key={event.id}
              ref={(el) => {
                contentRefs.current[i] = el;
              }}
              className="absolute w-[86%] h-[88%] flex items-center justify-center"
              style={{ willChange: "transform, opacity", transform: "translate3d(0,0,0)" }}
            >
              {/* Card Background - static inside the wrapper (moves with it) */}
              <div className="absolute inset-0 bg-[#FFFDFE]/95 border border-[#9B4B32]/15 rounded-2xl shadow-[0_8px_24px_rgba(155,75,50,0.06)]" />

              {/* Text Content - static inside the wrapper (moves with it) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-[5cqi] text-center z-20">
                <h3
                  className="text-[9cqi] font-normal text-[#9B4B32] mb-3"
                  style={{ fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive" }}
                >
                  {event.title}
                </h3>

                <p
                  className="text-[3.6cqi] font-semibold text-[#9B4B32] tracking-wide"
                  style={{ fontFamily: "var(--font-body), sans-serif" }}
                >
                  {event.dateTime}
                </p>

                <p
                  className="text-[3.4cqi] text-[#9B4B32]/85 mt-2 max-w-[80%] font-medium"
                  style={{ fontFamily: "var(--font-body), sans-serif" }}
                >
                  {event.location}
                </p>

                <p
                  className="text-[3.2cqi] italic text-[#9B4B32]/70 mt-3"
                  style={{ fontFamily: "var(--font-display), Georgia, serif" }}
                >
                  Dress Code: {event.dressCode}
                </p>

                <a
                  href={event.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 text-[3cqi] uppercase tracking-widest border-b border-[#9B4B32] text-[#9B4B32] pb-1 font-semibold"
                  style={{ fontFamily: "var(--font-body), sans-serif" }}
                >
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer — gives scroll distance for all events to play through */}
      <div style={{ height: `${events.length * (isMobile ? 70 : 100)}vh` }} className="pointer-events-none" />
    </section>
  );
}
