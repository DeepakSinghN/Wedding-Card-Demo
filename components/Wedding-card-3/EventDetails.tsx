"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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

export default function EventDetails() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!mounted) return;
      // Guard: always check prefers-reduced-motion (GSAP skill rule)
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!sectionRef.current) return;

      const scroller = sectionRef.current.closest("#card-scroll-container");
      if (!scroller) return;

      // ── Timeline Setup ────────────────────────────────────────────────────
      const tl = gsap.timeline({
        delay: 1.0, // 1 second delay when user enters the section
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          start: "top 90%", // Trigger when section top enters 90% down viewport
          toggleActions: "play none none none",
        },
      });

      // 1. Header Reveal
      tl.fromTo(
        ".events-header",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", force3D: true }
      );

      // 2. Event Cards Staggered Slide-up from below
      const cards = gsap.utils.toArray(".event-card") as HTMLElement[];
      cards.forEach((card, i) => {
        const targetRotate = parseFloat(card.getAttribute("data-rotate") || "0");

        // Set initial state: card is hidden below (y: 50px) and straight (rotate: 0)
        gsap.set(card, { opacity: 0, y: 50, rotate: 0, force3D: true });

        // Add to timeline sequence with a staggered start overlap
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            rotate: targetRotate,
            duration: 0.8,
            ease: "power2.out",
            force3D: true,
          },
          i === 0 ? "-=0.2" : "-=0.55" // Start each subsequent card slightly before previous finishes
        );
      });

      // Force positions refresh
      ScrollTrigger.refresh();
      const t = setTimeout(() => ScrollTrigger.refresh(), 800);
      return () => clearTimeout(t);
    },
    { scope: sectionRef, dependencies: [mounted] }
  );

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#FCEAEA] py-12 px-6 flex flex-col items-center gap-10 mt-20"
    >
      {/* Header section */}
      <div className="events-header flex flex-col items-center gap-2" style={{ willChange: "transform, opacity" }}>
        <p
          className="tracking-[2px] text-[#9B4B32]/70"
          style={{
            fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive",
            fontSize: "3rem",
          }}
        >
          Celebrations
        </p>
        {/* Gold horizontal line */}
        <div
          className="w-24 h-0.5 mt-2"
          style={{
            background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
          }}
        />
      </div>

      {/* Cards List */}
      <div className="w-full max-w-[360px] flex flex-col gap-12 py-6">
        {events.map((event, i) => (
          <div
            key={event.id}
            className="event-card bg-white shadow-[0_10px_30px_rgba(155,75,50,0.1)] hover:shadow-[0_15px_40px_rgba(155,75,50,0.15)] transition-all duration-300 flex flex-col items-center justify-between text-center relative border border-[#9B4B32]/5"
            data-rotate={i % 2 === 0 ? 3 : -3}
            style={{
              borderRadius: "28px",
              padding: "10px 24px 44px 24px",
              minHeight: "540px",
              transformOrigin: "center",
              willChange: "transform, opacity",
            }}
          >
            {/* Event Number Badge */}
            <div
              className="absolute top-5 right-6 text-[#9B4B32]/40 font-medium"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "clamp(10px, 3cqi, 12px)",
              }}
            >
              Event 0{i + 1}
            </div>

            {/* Top Header Group */}
            <div className="flex flex-col items-center w-full">
              {/* Ganesh Ji Icon */}
              <div
                className="flex items-center justify-center"
                style={{
                  height: "90px",
                  width: "100%",
                }}
              >
                <Image
                  src={GaneshJi}
                  alt="Lord Ganesha"
                  width={70}
                  height={90}
                  style={{
                    height: "100%",
                    width: "auto",
                    objectFit: "contain",
                  }}
                  priority
                />
              </div>

              {/* Divider */}
              <div className="w-2/3 h-[1px] bg-gradient-to-r from-transparent via-[#9B4B32]/20 to-transparent mb-5" />
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive",
                fontSize: "clamp(26px, 9cqi, 48px)",
                fontWeight: 400,
                color: "#7A2E1F",
                lineHeight: 1.2,
                marginBottom: "8px",
              }}
            >
              {event.title}
            </h3>

            {/* Tiny ornament */}
            <div className="w-16 h-0.5 bg-[#C9A84C] mb-1" />

            {/* Content stack */}
            <div className="flex flex-col gap-3 w-full">
              {/* Date */}
              <div className="flex flex-col gap-0.5 mb-3">
                <span
                  className="uppercase tracking-widest text-[#9B4B32]/50 font-bold"
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "9px",
                  }}
                >
                  When
                </span>
                <p
                  className="font-semibold text-[#5C2A14]"
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "clamp(11px, 6cqi, 14px)",
                  }}
                >
                  {event.dateTime}
                </p>
              </div>

              {/* Location */}
              <div className="flex flex-col gap-0.5 mb-3">
                <span
                  className="uppercase tracking-widest text-[#9B4B32]/50 font-bold"
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "9px",
                  }}
                >
                  Where
                </span>
                <p
                  className="text-[#7A4A30] font-medium"
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "clamp(10px, 6cqi, 13px)",
                    maxWidth: "85%",
                    margin: "0 auto",
                  }}
                >
                  {event.location}
                </p>
              </div>

              {/* Dress Code */}
              <div className="flex flex-col gap-0.5">
                <span
                  className="uppercase tracking-widest text-[#9B4B32]/50 font-bold"
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "9px",
                  }}
                >
                  Attire
                </span>
                <p
                  className="italic text-[#9B6045] font-medium"
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "clamp(10px, 3cqi, 12px)",
                  }}
                >
                  {event.dressCode}
                </p>
              </div>
            </div>

            {/* Directions link */}
            <a
              href={event.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 font-bold uppercase tracking-widest border-b border-[#7A2E1F]/50 text-[#7A2E1F] hover:text-[#9B4B32] transition-colors duration-200"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "clamp(9px, 2.6cqi, 11px)",
                paddingBottom: "2px",
              }}
            >
              Get Directions
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}