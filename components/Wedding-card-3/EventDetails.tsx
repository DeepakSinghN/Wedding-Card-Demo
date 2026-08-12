"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BottomCard from "./Events-section-resources/bottom-card.svg";
import GaneshJi from "./Events-section-resources/Ganesh jii.svg";

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

const SCROLL_MULTIPLIER = events.length - 1;

export default function EventDetails() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useGSAP(
    () => {
      // GSAP skill: always guard with prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!outerRef.current || !stageRef.current) return;

      // GSAP skill (Lenis): pass the Lenis wrapper div as scroller
      const scroller = outerRef.current.closest("#card-scroll-container");
      if (!scroller) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      // Parked position: 58vh below resting — behind the 55% envelope
      const PARKED_Y = () => window.innerHeight * 0.58;
      const EXIT_Y   = () => -window.innerHeight * 0.82;

      // GSAP skill: only animate transform + opacity (GPU-composited)
      gsap.set(cards[0], { y: 0, opacity: 1 });
      gsap.set(cards.slice(1), { y: PARKED_Y, opacity: 0 });

      // GSAP skill (Pinned Timeline for custom scroller):
      // CSS sticky handles the pin, GSAP scrubs the animation progress
      // ease: "none" is REQUIRED for scrub animations
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

      cards.forEach((_, i) => {
        if (i === 0) return;
        const pos = i - 1;

        tl.to(
          cards[i - 1],
          { y: EXIT_Y, opacity: 0, duration: 0.45, ease: "none" },
          pos
        );
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
    // outerRef: tall section providing scroll distance (5 * 100vh)
    <div
      ref={outerRef}
      className="relative w-full flex-shrink-0"
      style={{ height: `${events.length * 100}vh` }}
    >
      {/* stageRef: CSS sticky stage — stays at top:0 while parent scrolls */}
      <div
        ref={stageRef}
        className="w-full bg-[#FCEAEA]"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "visible",
        }}
      >
        {/* ── "The Celebrations" header ─────────────────────────────────── */}
        <div
          className="absolute top-0 left-0 w-full flex flex-col items-center"
          style={{ paddingTop: "clamp(18px, 4.5vh, 36px)", zIndex: 10 }}
        >
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "clamp(8px, 2.5cqi, 11px)",
              letterSpacing: "0.32em",
              color: "#9B4B32",
              textTransform: "uppercase",
              opacity: 0.65,
            }}
          >
            The Celebrations
          </p>
        </div>

        {/* ── Card stack ───────────────────────────────────────────────── */}
        {/* overflow: visible so cards animate freely above and below */}
        <div
          className="absolute left-0 w-full"
          style={{
            top: "clamp(50px, 11vh, 80px)",
            height: "clamp(300px, 53vh, 430px)",
            zIndex: 10,
            overflow: "visible",
          }}
        >
          {events.map((event, i) => (
            <div
              key={event.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute bg-white"
              style={{
                inset: "0 18px",
                zIndex: events.length - i,
                borderRadius: "clamp(18px, 4cqi, 28px)",
                boxShadow: "0 4px 24px rgba(120,50,30,0.13), 0 1px 4px rgba(120,50,30,0.08)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                // Pre-match GSAP initial state to prevent flash
                opacity: i === 0 ? 1 : 0,
                transform: i === 0 ? "translateY(0px)" : "translateY(58vh)",
                willChange: "transform, opacity",
              }}
            >
              {/* ── TOP: Ganesh Ji illustration ───────────────────────── */}
              <div
                style={{
                  width: "100%",
                  height: "clamp(90px, 18vh, 150px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "clamp(12px, 2.5vh, 22px)",
                  paddingBottom: "clamp(8px, 1.5vh, 14px)",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={GaneshJi}
                  alt="Lord Ganesha"
                  width={0}
                  height={0}
                  style={{
                    width: "auto",
                    height: "100%",
                    maxWidth: "60%",
                    objectFit: "contain",
                  }}
                  priority
                />
              </div>

              {/* Thin divider between image and content */}
              <div style={{
                width: "60%",
                height: 1,
                background: "linear-gradient(to right, transparent, rgba(155,75,50,0.25), transparent)",
                margin: "0 auto",
                flexShrink: 0,
              }} />

              {/* ── BOTTOM: Event text content ─────────────────────────── */}
              {/* Font pairing: script display for title + clean serif body */}
              <div
                style={{
                  flex: 1,
                  padding: "clamp(12px, 2.5vh, 22px) clamp(18px, 5cqi, 30px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {/* Event title — script / cursive display font */}
                <h3
                  style={{
                    fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive",
                    fontSize: "clamp(22px, 7cqi, 40px)",
                    fontWeight: 400,
                    color: "#7A2E1F",
                    lineHeight: 1.15,
                    marginBottom: "clamp(8px, 1.5vh, 14px)",
                  }}
                >
                  {event.title}
                </h3>

                {/* Ornamental gold divider */}
                <div style={{
                  width: 40,
                  height: 1.5,
                  background: "#C9A84C",
                  marginBottom: "clamp(8px, 1.5vh, 14px)",
                }} />

                {/* Date/time */}
                <p style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "clamp(10px, 3.1cqi, 13px)",
                  fontWeight: 600,
                  color: "#5C2A14",
                  marginBottom: "clamp(5px, 1vh, 9px)",
                  lineHeight: 1.4,
                }}>
                  {event.dateTime}
                </p>

                {/* Venue */}
                <p style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "clamp(10px, 3cqi, 13px)",
                  color: "#7A4A30",
                  lineHeight: 1.4,
                  maxWidth: "90%",
                  marginBottom: "clamp(5px, 1vh, 9px)",
                }}>
                  {event.location}
                </p>

                {/* Dress code */}
                <p style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "clamp(9px, 2.8cqi, 12px)",
                  fontStyle: "italic",
                  color: "#9B6045",
                  marginBottom: "clamp(8px, 1.5vh, 14px)",
                  lineHeight: 1.4,
                }}>
                  Dress Code: {event.dressCode}
                </p>

                {/* Get Directions */}
                <a
                  href={event.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "clamp(8px, 2.5cqi, 11px)",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#7A2E1F",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(122,46,31,0.4)",
                    paddingBottom: 2,
                    position: "relative",
                    zIndex: 100,
                  }}
                >
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Static red envelope — never moves ────────────────────────── */}
        {/* z-index 40: above all cards; conceals parked cards (y=58vh)    */}
        {/* Cards rise above it as they animate to y=0                      */}
        {/* pointer-events-none keeps "Get Directions" links clickable      */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none select-none"
          style={{ height: "55%", zIndex: 40 }}
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