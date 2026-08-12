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

// 4 transitions for 5 events
const SCROLL_MULTIPLIER = events.length - 1;

export default function EventDetails() {
  const outerRef = useRef<HTMLDivElement>(null);  // tall scroll-distance wrapper
  const stageRef = useRef<HTMLDivElement>(null);  // sticky viewport-height stage
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      // GSAP skill rule: always guard with prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!outerRef.current || !stageRef.current) return;

      // GSAP skill (Lenis): pass custom Lenis wrapper as scroller
      const scroller = outerRef.current.closest("#card-scroll-container");
      if (!scroller) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      // IMPORTANT: With a custom div scroller, GSAP pin:true does NOT use
      // position:fixed -- it uses transforms which breaks inside Lenis.
      // The CORRECT pattern for custom scrollers is:
      //   - CSS position:sticky on stageRef handles the visual pin
      //   - GSAP ScrollTrigger scrubs the animation progress (no pin:true)
      // This is the most reliable approach per GSAP docs for custom scrollers.

      // Parked position: cards start 58vh below their resting point.
      // The envelope is ~50% of the viewport height (set below).
      // 58vh puts parked cards behind/below the top edge of the envelope.
      const PARKED_Y = () => window.innerHeight * 0.58;
      const EXIT_Y   = () => -window.innerHeight * 0.82;

      // Initial states (GSAP skill: only animate transform + opacity)
      gsap.set(cards[0], { y: 0, opacity: 1 });
      gsap.set(cards.slice(1), { y: PARKED_Y, opacity: 0 });

      // Scrub timeline - NO pin:true, CSS sticky handles it
      // GSAP skill recipe (Pinned Timeline variant for custom scroller):
      //   trigger: outerRef (tall scroll-distance wrapper)
      //   start/end: "top top" / "bottom bottom" maps full section scroll
      //   scrub: 1 - smooth 1-second lag scrub
      //   ease: "none" REQUIRED - easing breaks scroll sync in scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          scroller,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Card swap sequence
      // Each swap = 1/(N-1) of total timeline progress
      cards.forEach((_, i) => {
        if (i === 0) return;

        const pos = i - 1; // 0, 1, 2, 3

        // OUTGOING: prev card slides up and fades out
        // ease: "none" per GSAP skill rule for scrub animations
        tl.to(
          cards[i - 1],
          { y: EXIT_Y, opacity: 0, duration: 0.45, ease: "none" },
          pos
        );

        // INCOMING: next card rises from behind envelope to resting position
        tl.fromTo(
          cards[i],
          { y: PARKED_Y, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: "none" },
          pos + 0.08
        );
      });

      // GSAP skill: refresh after layout settles
      const t = setTimeout(() => ScrollTrigger.refresh(), 800);
      return () => clearTimeout(t);
    },
    { scope: outerRef }
  );

  if (!mounted) return null;

  return (
    // outerRef: tall section that provides the scroll distance.
    // Height = (events.length) * 100vh so each card gets a full viewport of scroll.
    // CSS sticky on stageRef (the child) handles the visual pin - no GSAP pin needed.
    <div
      ref={outerRef}
      className="relative w-full flex-shrink-0"
      style={{ height: `${events.length * 100}vh` }}
    >
      {/*
        stageRef: sticky viewport-height stage.
        position:sticky + top:0 + height:100vh = stays fixed in the viewport
        while the parent div scrolls through its full height above/below.
        overflow:visible so cards can slide beyond the top/bottom bounds.
      */}
      <div
        ref={stageRef}
        className="w-full bg-[#FBEAEA]"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "visible",
        }}
      >
        {/* Section label */}
        <div
          className="absolute top-0 left-0 w-full flex justify-center"
          style={{ paddingTop: "clamp(20px, 5vh, 40px)", zIndex: 10 }}
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
          Card stack.
          All cards: absolute, same position, stacked on each other.
          z-index: card 0 is highest (starts on top).
          Cards i > 0 start at y = 58vh (behind envelope) via initial inline style.
          overflow:visible so animating cards go outside this box freely.
        */}
        <div
          className="absolute left-0 w-full"
          style={{
            top: "clamp(54px, 12vh, 86px)",
            height: "clamp(280px, 52vh, 420px)",
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
                padding: "clamp(18px, 3.5vh, 30px) 20px",
                // Match initial state to GSAP set() to prevent flash
                opacity: i === 0 ? 1 : 0,
                transform: i === 0 ? "translateY(0px)" : "translateY(58vh)",
                willChange: "transform, opacity",
              }}
            >
              <h3
                className="font-normal text-[#9B4B32] leading-tight"
                style={{
                  fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive",
                  fontSize: "clamp(24px, 7.5cqi, 44px)",
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
                style={{
                  width: 40,
                  height: 1,
                  background: "rgba(155,75,50,0.2)",
                  marginTop: "clamp(10px, 1.5vh, 16px)",
                }}
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
          Absolutely anchored to the BOTTOM of the sticky stage.
          zIndex: 40 - above all cards (max card z = events.length = 5).

          FIX for "envelope not showing fully":
          - Use object-contain (not object-cover) to display the whole image
          - Height 50% of viewport shows the full envelope proportionally
          - object-position: bottom ensures the base is always visible

          The envelope conceals cards at y=58vh:
          those cards sit behind this layer and are invisible.
          As each card animates to y:0 it rises INTO view above the envelope.
          pointer-events-none keeps card links clickable.
        */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none select-none"
          style={{ height: "50%", zIndex: 40 }}
        >
          <Image
            src={BottomCard}
            alt="Red envelope illustration"
            fill
            priority
            className="object-contain"
            style={{ objectPosition: "bottom center" }}
          />
        </div>
      </div>
    </div>
  );
}