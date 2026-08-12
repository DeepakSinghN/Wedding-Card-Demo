"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import GaneshJi from "./Events-section-resources/Ganesh jii.svg";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="w-full bg-[#FCEAEA] py-12 px-6 flex flex-col items-center gap-10 mt-20">
      {/* Header section */}
      <div className="flex flex-col items-center gap-2">
        <p
          className="uppercase tracking-[0.3em] text-[#9B4B32]/70 font-semibold"
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "clamp(10px, 3cqi, 13px)",
          }}
        >
          The Celebrations
        </p>
        <div className="w-16 h-0.5 bg-[#C9A84C]" />
      </div>

      {/* Cards List */}
      <div className="w-full max-w-[360px] flex flex-col gap-12 py-6">
        {events.map((event, i) => (
          <div
            key={event.id}
            className="bg-white shadow-[0_10px_30px_rgba(155,75,50,0.1)] hover:shadow-[0_15px_40px_rgba(155,75,50,0.15)] transition-all duration-300 flex flex-col items-center justify-between text-center relative border border-[#9B4B32]/5"
            style={{
              borderRadius: "28px",
              padding: "10px 24px 44px 24px",
              minHeight: "540px",
              transform: i % 2 === 0 ? "rotate(9deg)" : "rotate(-9deg)",
              transformOrigin: "center",
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