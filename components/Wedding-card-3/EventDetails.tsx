"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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
    id: "cocktail",
    title: "Cocktail Party",
    dateTime: "Saturday, Nov 28 • 7:00 PM Onwards",
    location: "Poolside Club, The Oberoi Amarvilas",
    dressCode: "Cocktail Chic / Evening Gown",
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
  {
    id: "reception",
    title: "Grand Reception",
    dateTime: "Monday, Nov 30 • 7:00 PM Onwards",
    location: "Grand Lawn, The Oberoi Amarvilas",
    dressCode: "Western Formal / Tuxedo",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Oberoi+Amarvilas+Agra",
  },
];

export default function EventDetails() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      if (!sectionRef.current) return;

      const scrollerEl = sectionRef.current.closest("#card-scroll-container");
      if (!scrollerEl) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      // Parked distance: cards start below the envelope — about 60% of the viewport height
      // so they are hidden behind the envelope illustration at the bottom.
      const parkedY = () => window.innerHeight * 0.62;

      // Set initial state: Card 0 visible, all others parked below/behind envelope.
      gsap.set(cards[0], { y: 0, opacity: 1 });
      gsap.set(cards.slice(1), { y: parkedY, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: scrollerEl,
          start: "top top",
          end: "bottom bottom",
          scrub: isMobile ? 0.3 : 1,
          invalidateOnRefresh: true,
          snap: isMobile
            ? {
                snapTo: 1 / (cards.length - 1),
                duration: { min: 0.2, max: 0.4 },
                ease: "power2.inOut",
                inertia: false,
              }
            : undefined,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;

        // Each card swap occupies an equal fraction of total scroll distance.
        const segmentStart = (i - 1) / (cards.length - 1);

        // OUTGOING: previous card slides UP and exits upward.
        tl.to(
          cards[i - 1],
          {
            y: isMobile ? -window.innerHeight * 0.75 : -window.innerHeight * 0.85,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          },
          segmentStart
        );

        // INCOMING: this card rises UP from behind the envelope to y:0.
        tl.fromTo(
          cards[i],
          { y: parkedY, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          segmentStart + 0.05
        );
      });

      // Refresh ScrollTrigger after layout settles.
      const t = setTimeout(() => ScrollTrigger.refresh(), 1200);
      return () => clearTimeout(t);
    },
    {
      scope: sectionRef,
      dependencies: [prefersReducedMotion, isMobile],
    }
  );

  if (!mounted) return null;

  // ── REDUCED MOTION FALLBACK ──────────────────────────────────────────────
  if (prefersReducedMotion) {
    return (
      <div className="w-full flex flex-col gap-6 py-10 px-6 bg-[#FBEAEA]">
        <div className="w-full h-[30vh] relative pointer-events-none mb-4">
          <Image src={BottomCard} alt="" fill className="object-cover" priority />
        </div>
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-3xl shadow-xl px-6 py-10 flex flex-col items-center text-center"
          >
            <h3
              className="text-[9cqi] font-normal text-[#9B4B32] mb-3"
              style={{ fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive" }}
            >
              {event.title}
            </h3>
            <p
              className="text-[3.6cqi] font-semibold text-[#7A2E1F]"
              style={{ fontFamily: "var(--font-body), sans-serif" }}
            >
              {event.dateTime}
            </p>
            <p
              className="text-[3.4cqi] font-medium text-[#7A2E1F] mt-3"
              style={{ fontFamily: "var(--font-body), sans-serif" }}
            >
              {event.location}
            </p>
            <p
              className="text-[3.2cqi] italic text-[#9B4B32]/70 mt-4"
              style={{ fontFamily: "var(--font-display), Georgia, serif" }}
            >
              Dress Code: {event.dressCode}
            </p>
            <a
              href={event.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-[3cqi] font-bold uppercase tracking-widest border-b border-[#7A2E1F] text-[#7A2E1F] pb-1"
              style={{ fontFamily: "var(--font-body), sans-serif" }}
            >
              Get Directions
            </a>
          </div>
        ))}
      </div>
    );
  }

  // ── ANIMATED LAYOUT ──────────────────────────────────────────────────────
  return (
    /**
     * sectionRef: tall scroll-distance wrapper.
     * Height = events.length × scroll-distance-per-card so each event gets
     * its own full scroll window. On mobile we shorten to 70vh per event.
     */
    <section
      ref={sectionRef}
      className="relative w-full flex-shrink-0"
      style={{ height: `${events.length * (isMobile ? 70 : 100)}vh` }}
    >
      {/**
       * stickyRef: viewport-height sticky layer — the "stage".
       * Everything visible lives here; it stays pinned to the top
       * while the user scrolls through the tall parent section.
       */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[#FBEAEA]"
        style={{ paddingTop: "clamp(28px, 7vh, 56px)" }}
      >
        {/* Section label */}
        <p
          className="text-[3cqi] uppercase tracking-[0.25em] text-[#9B4B32]/60 mb-4"
          style={{ fontFamily: "var(--font-body), sans-serif" }}
        >
          Event Schedule
        </p>

        {/**
         * Card stack: all cards absolutely overlap at the same position.
         * z-index: first card (i=0) has the highest z so it starts on top.
         * Cards below are hidden by the envelope z-40 layer at the bottom.
         */}
        <div className="relative w-full px-6" style={{ height: "clamp(260px, 52vh, 420px)" }}>
          {events.map((event, i) => (
            <div
              key={event.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute inset-x-6 top-0 bg-white rounded-3xl shadow-xl px-6 py-8 flex flex-col items-center text-center"
              style={{ zIndex: events.length - i }}
            >
              {/* Script title */}
              <h3
                className="text-[9cqi] font-normal text-[#9B4B32] mb-3 leading-tight"
                style={{ fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive" }}
              >
                {event.title}
              </h3>

              {/* Date / time */}
              <p
                className="text-[3.6cqi] font-bold text-[#7A2E1F]"
                style={{ fontFamily: "var(--font-body), sans-serif" }}
              >
                {event.dateTime}
              </p>

              {/* Venue */}
              <p
                className="text-[3.4cqi] font-medium text-[#7A2E1F] mt-3 max-w-[85%]"
                style={{ fontFamily: "var(--font-body), sans-serif" }}
              >
                {event.location}
              </p>

              {/* Dress code */}
              <p
                className="text-[3.2cqi] italic text-[#9B4B32]/70 mt-4"
                style={{ fontFamily: "var(--font-display), Georgia, serif" }}
              >
                Dress Code: {event.dressCode}
              </p>

              {/* Thin divider */}
              <div className="mt-5 w-10 h-px bg-[#9B4B32]/25" />

              {/* Get Directions link */}
              <a
                href={event.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-[3cqi] font-bold uppercase tracking-widest border-b border-[#7A2E1F] text-[#7A2E1F] pb-1"
                style={{ fontFamily: "var(--font-body), sans-serif" }}
              >
                Get Directions
              </a>
            </div>
          ))}
        </div>

        {/**
         * STATIC ENVELOPE ILLUSTRATION — never moves.
         * z-40: sits ABOVE the lower portion of every card.
         * Cards parked at y≈62vh are completely hidden behind this.
         * As each card animates to y:0 it rises INTO VIEW above the envelope,
         * creating the "letter being pulled from the envelope" illusion.
         * pointer-events-none so links inside cards remain clickable.
         */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none select-none"
          style={{ height: "46%", zIndex: 40 }}
        >
          <Image
            src={BottomCard}
            alt="Red envelope illustration"
            fill
            priority
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
