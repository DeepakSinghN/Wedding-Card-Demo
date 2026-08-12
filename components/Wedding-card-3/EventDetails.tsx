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
    dateTime: "Friday, Nov 27 - 7:00 PM Onwards",
    location: "Grand Ballroom, The Oberoi Amarvilas",
    dressCode: "Indo-Western Ethnic / Bling",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Oberoi+Amarvilas+Agra",
  },
  {
    id: "haldi",
    title: "Haldi Ceremony",
    dateTime: "Saturday, Nov 28 - 10:00 AM Onwards",
    location: "Lawn Area, The Oberoi Amarvilas",
    dressCode: "Yellow Traditional Wear",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Oberoi+Amarvilas+Agra",
  },
  {
    id: "cocktail",
    title: "Cocktail Party",
    dateTime: "Saturday, Nov 28 - 7:00 PM Onwards",
    location: "Poolside Club, The Oberoi Amarvilas",
    dressCode: "Cocktail Chic / Evening Gown",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Oberoi+Amarvilas+Agra",
  },
  {
    id: "wedding",
    title: "Wedding Ceremony",
    dateTime: "Sunday, Nov 29 - 11:00 AM Onwards",
    location: "Main Hall, The Oberoi Amarvilas",
    dressCode: "Traditional Formal",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Oberoi+Amarvilas+Agra",
  },
  {
    id: "reception",
    title: "Grand Reception",
    dateTime: "Monday, Nov 30 - 7:00 PM Onwards",
    location: "Grand Lawn, The Oberoi Amarvilas",
    dressCode: "Western Formal / Tuxedo",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Oberoi+Amarvilas+Agra",
  },
];

// 4 transitions for 5 events = 400% extra scroll distance
const SCROLL_MULTIPLIER = events.length - 1;

export default function EventDetails() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      // Guard: always check prefers-reduced-motion (GSAP skill rule)
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!sectionRef.current) return;

      // Pass custom Lenis scroller explicitly (GSAP skill: Lenis section)
      const scroller = sectionRef.current.closest("#card-scroll-container");
      if (!scroller) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      // Parked offset: 62vh hides cards fully behind the 46%-tall envelope overlay
      const parkedY = () => window.innerHeight * 0.62;
      const exitY = () => -window.innerHeight * 0.8;

      // Initial states - only animate transform + opacity (GPU-composited, GSAP skill rule)
      gsap.set(cards[0], { y: 0, opacity: 1 });
      gsap.set(cards.slice(1), { y: parkedY, opacity: 0 });

      // Pinned scrub timeline (GSAP skill recipe: Pinned Timeline)
      // - pin: true   pins the trigger element at top:0
      // - scrub: 1    smooth 1-second lag scrubbing
      // - ease: none  REQUIRED for scrub - easing breaks scroll sync
      // - anticipatePin: 1  prevents pin jump
      // - invalidateOnRefresh: true  recalculates on resize
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          start: "top top",
          end: `+=${SCROLL_MULTIPLIER * 100}%`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Card swap sequence - each swap gets 1 unit of timeline duration
      cards.forEach((_, i) => {
        if (i === 0) return;

        const pos = i - 1; // timeline position: 0, 1, 2, 3

        // OUTGOING: current card exits upward
        tl.to(
          cards[i - 1],
          { y: exitY, opacity: 0, duration: 0.45, ease: "none" },
          pos
        );

        // INCOMING: next card rises from behind envelope (slight overlap)
        tl.fromTo(
          cards[i],
          { y: parkedY, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: "none" },
          pos + 0.05
        );
      });

      // Refresh after layout settles (GSAP skill rule)
      const t = setTimeout(() => ScrollTrigger.refresh(), 1000);
      return () => clearTimeout(t);
    },
    { scope: sectionRef }
  );

  if (!mounted) return null;

  return (
    // sectionRef = GSAP pin trigger
    // height: 100vh - normal viewport-height section
    // GSAP pinSpacing adds spacer below so next section follows correctly
    // overflow: visible - cards must animate above/below clip boundary
    <section
      ref={sectionRef}
      className="relative w-full flex-shrink-0 bg-[#FBEAEA]"
      style={{ height: "100vh", overflow: "visible" }}
    >
      {/* Section label */}
      <div
        className="absolute top-0 left-0 w-full flex justify-center z-10"
        style={{ paddingTop: "clamp(18px, 4.5vh, 36px)" }}
      >
        <p
          className="uppercase tracking-[0.3em] text-[#9B4B32]/55"
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "clamp(9px, 2.8cqi, 12px)",
          }}
        >
          Event Schedule
        </p>
      </div>

      {/*
        Card stack - all cards absolute, stacked at the same position.
        z-index: card 0 highest - starts on top visually.
        Cards i > 0 are hidden behind the envelope (y 62vh) until animated.
        overflow: visible so exiting/entering cards are not clipped.
      */}
      <div
        className="absolute left-0 w-full"
        style={{
          top: "clamp(52px, 12vh, 84px)",
          height: "clamp(290px, 56vh, 450px)",
          zIndex: 10,
          overflow: "visible",
        }}
      >
        {events.map((event, i) => (
          <div
            key={event.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="absolute bg-white rounded-3xl shadow-xl flex flex-col items-center text-center"
            style={{
              inset: "0 20px",
              zIndex: events.length - i,
              padding: "clamp(18px, 3.5vh, 32px) 20px",
              opacity: i === 0 ? 1 : 0,
              transform: i === 0 ? "translateY(0px)" : "translateY(62vh)",
              willChange: "transform, opacity",
            }}
          >
            <h3
              className="font-normal text-[#9B4B32] leading-tight"
              style={{
                fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive",
                fontSize: "clamp(24px, 8cqi, 46px)",
                marginBottom: "clamp(6px, 1.2vh, 12px)",
              }}
            >
              {event.title}
            </h3>

            <p
              className="font-bold text-[#7A2E1F]"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "clamp(11px, 3.4cqi, 15px)",
                marginTop: "clamp(4px, 0.8vh, 8px)",
              }}
            >
              {event.dateTime}
            </p>

            <p
              className="font-medium text-[#7A2E1F]"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "clamp(10px, 3.2cqi, 14px)",
                marginTop: "clamp(6px, 1vh, 10px)",
                maxWidth: "85%",
              }}
            >
              {event.location}
            </p>

            <p
              className="italic text-[#9B4B32]/70"
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(10px, 3cqi, 13px)",
                marginTop: "clamp(8px, 1.2vh, 14px)",
              }}
            >
              Dress Code: {event.dressCode}
            </p>

            <div
              className="bg-[#9B4B32]/20"
              style={{ width: 40, height: 1, marginTop: "clamp(10px, 1.5vh, 16px)" }}
            />

            <a
              href={event.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold uppercase tracking-widest border-b border-[#7A2E1F] text-[#7A2E1F]"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "clamp(8px, 2.6cqi, 12px)",
                marginTop: "clamp(8px, 1.3vh, 14px)",
                paddingBottom: 3,
                position: "relative",
                zIndex: 100,
              }}
            >
              Get Directions
            </a>
          </div>
        ))}
      </div>

      {/*
        Static envelope illustration - never moves.
        Anchored to the bottom of the pinned section (absolute bottom-0).
        zIndex: 40 - sits ABOVE all cards (cards max z = events.length).
        Cards parked at y=62vh are hidden behind this layer.
        As each card animates to y:0 it rises above this overlay into view -
        the "letter being pulled from the envelope" moment.
        pointer-events-none keeps card links clickable.
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
    </section>
  );
}