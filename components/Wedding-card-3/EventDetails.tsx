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

const SCROLL_MULTIPLIER = events.length - 1;

// ── Styles (Ancient Manuscript / Scroll Reveal) ───────────────────────────────
const COLORS = {
  bgTop:       "#F5C842",   // saffron
  bgBottom:    "#FDF6E3",   // cream
  scrollBar:   "#EDE0C4",   // parchment ivory for scroll ends
  titleText:   "#3B1E00",   // deep sepia
  labelText:   "#7A4A1A",   // warm ochre for small-cap labels
  valueText:   "#2E1A00",   // near-black sepia for values
  divider:     "#C9A84C",   // antique gold
  envelopeBand:"#8B0000",   // deep red band on flap
  dirBtn:      "#6B2A00",   // dark sienna for Get Directions
};

export default function EventDetails() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!outerRef.current || !stageRef.current) return;

      const scroller = outerRef.current.closest("#card-scroll-container");
      if (!scroller) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      const PARKED_Y = () => window.innerHeight * 0.58;
      const EXIT_Y   = () => -window.innerHeight * 0.82;

      gsap.set(cards[0], { y: 0, opacity: 1 });
      gsap.set(cards.slice(1), { y: PARKED_Y, opacity: 0 });

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

      const t = setTimeout(() => ScrollTrigger.refresh(), 800);
      return () => clearTimeout(t);
    },
    { scope: outerRef }
  );

  if (!mounted) return null;

  return (
    // Tall outer wrapper — provides scroll distance for GSAP scrub
    <div
      ref={outerRef}
      className="relative w-full flex-shrink-0"
      style={{ height: `${events.length * 100}vh` }}
    >
      {/* Sticky stage — CSS sticky keeps this in view while parent scrolls */}
      <div
        ref={stageRef}
        className="w-full"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "visible",
          // Saffron-to-cream background (the Ancient Manuscript gradient)
          background: `linear-gradient(to bottom, ${COLORS.bgTop} 0%, ${COLORS.bgBottom} 100%)`,
        }}
      >

        {/* ── "The Celebrations" label ───────────────────────────────────── */}
        <div
          className="absolute top-0 left-0 w-full flex flex-col items-center"
          style={{ paddingTop: "clamp(18px, 4.5vh, 36px)", zIndex: 10 }}
        >
          {/* Small ornamental top line */}
          <div style={{
            width: 48,
            height: 1.5,
            background: COLORS.divider,
            marginBottom: 8,
          }} />
          <p
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(8px, 2.4cqi, 11px)",
              fontVariant: "small-caps",
              letterSpacing: "0.35em",
              color: COLORS.labelText,
              textTransform: "uppercase",
            }}
          >
            The Celebrations
          </p>
          <div style={{
            width: 48,
            height: 1.5,
            background: COLORS.divider,
            marginTop: 8,
          }} />
        </div>

        {/* ── Card Stack ────────────────────────────────────────────────── */}
        <div
          className="absolute left-0 w-full"
          style={{
            top: "clamp(60px, 13vh, 90px)",
            height: "clamp(270px, 52vh, 410px)",
            zIndex: 10,
            overflow: "visible",
          }}
        >
          {events.map((event, i) => (
            <div
              key={event.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute"
              style={{
                inset: "0 16px",
                zIndex: events.length - i,
                opacity: i === 0 ? 1 : 0,
                transform: i === 0 ? "translateY(0px)" : "translateY(58vh)",
                willChange: "transform, opacity",
                // Scroll shape: no border-radius, shadow gives depth
                borderRadius: 0,
                boxShadow: "0 8px 32px rgba(90,40,0,0.18), 0 2px 6px rgba(90,40,0,0.10)",
                background: COLORS.bgBottom,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* ── TOP SCROLL BAR (rolled parchment end) ─────────────── */}
              <div style={{
                height: "clamp(14px, 2.2vh, 20px)",
                background: COLORS.scrollBar,
                borderBottom: `1.5px solid ${COLORS.divider}`,
                flexShrink: 0,
                position: "relative",
                // Subtle horizontal ribbing to suggest rolled paper
                backgroundImage: `repeating-linear-gradient(
                  to right,
                  transparent 0px,
                  transparent 18px,
                  rgba(180,140,80,0.12) 18px,
                  rgba(180,140,80,0.12) 19px
                )`,
              }}>
                {/* Event counter — Roman numeral style */}
                <span style={{
                  position: "absolute",
                  right: "clamp(10px, 4cqi, 18px)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "clamp(8px, 2.2cqi, 11px)",
                  fontVariant: "small-caps",
                  letterSpacing: "0.2em",
                  color: COLORS.labelText,
                }}>
                  {["I","II","III","IV","V"][i]} / V
                </span>
              </div>

              {/* ── CARD BODY ─────────────────────────────────────────── */}
              <div style={{
                flex: 1,
                padding: "clamp(14px, 3vh, 26px) clamp(16px, 5cqi, 28px)",
                display: "flex",
                flexDirection: "column",
              }}>

                {/* Gold divider above title */}
                <div style={{
                  width: "100%",
                  height: 1,
                  background: `linear-gradient(to right, transparent, ${COLORS.divider}, transparent)`,
                  marginBottom: "clamp(10px, 1.8vh, 16px)",
                }} />

                {/* Event title — bold condensed epigraphic serif */}
                <h3 style={{
                  fontFamily: "var(--font-display), Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(22px, 7cqi, 38px)",
                  fontWeight: 900,
                  fontStretch: "condensed",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                  color: COLORS.titleText,
                  textAlign: "center",
                  marginBottom: "clamp(10px, 1.8vh, 18px)",
                  textTransform: "uppercase",
                }}>
                  {event.title}
                </h3>

                {/* Gold divider below title */}
                <div style={{
                  width: "100%",
                  height: 1,
                  background: `linear-gradient(to right, transparent, ${COLORS.divider}, transparent)`,
                  marginBottom: "clamp(10px, 1.8vh, 16px)",
                }} />

                {/* ── Two-column manuscript grid ─────────────────────── */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  columnGap: "clamp(10px, 3cqi, 18px)",
                  rowGap: "clamp(6px, 1.1vh, 10px)",
                  lineHeight: 1.35,
                }}>
                  {/* Date */}
                  <span style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "clamp(8px, 2.4cqi, 11px)",
                    fontVariant: "small-caps",
                    letterSpacing: "0.12em",
                    color: COLORS.labelText,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    paddingTop: "0.1em",
                  }}>
                    When
                  </span>
                  <span style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "clamp(10px, 3cqi, 13px)",
                    fontWeight: 600,
                    color: COLORS.valueText,
                  }}>
                    {event.dateTime}
                  </span>

                  {/* Venue */}
                  <span style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "clamp(8px, 2.4cqi, 11px)",
                    fontVariant: "small-caps",
                    letterSpacing: "0.12em",
                    color: COLORS.labelText,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    paddingTop: "0.1em",
                  }}>
                    Where
                  </span>
                  <span style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "clamp(10px, 3cqi, 13px)",
                    fontWeight: 600,
                    color: COLORS.valueText,
                  }}>
                    {event.location}
                  </span>

                  {/* Dress code */}
                  <span style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "clamp(8px, 2.4cqi, 11px)",
                    fontVariant: "small-caps",
                    letterSpacing: "0.12em",
                    color: COLORS.labelText,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    paddingTop: "0.1em",
                  }}>
                    Attire
                  </span>
                  <span style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "clamp(10px, 3cqi, 13px)",
                    fontStyle: "italic",
                    color: COLORS.valueText,
                  }}>
                    {event.dressCode}
                  </span>
                </div>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* Gold divider */}
                <div style={{
                  width: "100%",
                  height: 1,
                  background: `linear-gradient(to right, transparent, ${COLORS.divider}, transparent)`,
                  marginTop: "clamp(10px, 1.5vh, 14px)",
                  marginBottom: "clamp(8px, 1.2vh, 12px)",
                }} />

                {/* Get Directions link */}
                <a
                  href={event.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "clamp(8px, 2.4cqi, 11px)",
                    fontVariant: "small-caps",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: COLORS.dirBtn,
                    textDecoration: "none",
                    borderBottom: `1px solid ${COLORS.divider}`,
                    paddingBottom: 2,
                    width: "fit-content",
                    margin: "0 auto",
                    position: "relative",
                    zIndex: 100,
                  }}
                >
                  Get Directions
                </a>
              </div>

              {/* ── BOTTOM SCROLL BAR (rolled parchment end) ──────────── */}
              <div style={{
                height: "clamp(14px, 2.2vh, 20px)",
                background: COLORS.scrollBar,
                borderTop: `1.5px solid ${COLORS.divider}`,
                flexShrink: 0,
                backgroundImage: `repeating-linear-gradient(
                  to right,
                  transparent 0px,
                  transparent 18px,
                  rgba(180,140,80,0.12) 18px,
                  rgba(180,140,80,0.12) 19px
                )`,
              }} />
            </div>
          ))}
        </div>

        {/* ── Static envelope illustration ──────────────────────────────── */}
        {/* Height raised to 55% as specified, with deep red decorative band overlay */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none select-none"
          style={{ height: "55%", zIndex: 40 }}
        >
          {/* Deep red decorative band across the envelope flap area */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "clamp(10px, 1.8vh, 16px)",
            background: COLORS.envelopeBand,
            zIndex: 2,
          }} />

          <Image
            src={BottomCard}
            alt="Red envelope illustration"
            fill
            priority
            className="object-contain"
            style={{ objectPosition: "bottom center" }}
          />
        </div>

        {/* ── Scroll progress indicator — 5 gold ticks ──────────────────── */}
        {/* These are purely decorative; GSAP drives the real animation */}
        <div
          className="absolute right-0 top-0 h-full flex flex-col items-center justify-center"
          style={{ paddingRight: "clamp(8px, 2cqi, 14px)", zIndex: 50, gap: 6 }}
        >
          {events.map((_, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: "clamp(14px, 2.5vh, 22px)",
                background: COLORS.divider,
                opacity: i === 0 ? 1 : 0.3,
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}