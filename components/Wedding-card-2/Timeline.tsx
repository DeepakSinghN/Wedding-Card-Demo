"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface EventDetails {
  id: string;
  title: string;
  image: string;
  dateTime: string;
  coverMonthDay: string;
  coverYear: string;
  location: string;
  dressCode: string;
  mapLink: string;
  defaultRotation: number;
  floatDuration: number;
  theme: string;
  timeRaw: string; // for calendar integration
}

// ---- Event data matching the Festivities.tsx visual style ----
const events: EventDetails[] = [
  {
    id: "haldi",
    title: "Haldi Ceremony",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800",
    dateTime: "Monday, June 26 • 10:00 AM",
    coverMonthDay: "JUNE 26",
    coverYear: "2028",
    location: "KK Banquet Hall, Lawn Area",
    dressCode: "Shades of Yellow / Ethnic Wear",
    mapLink: "https://maps.google.com/?q=KK+Banquet+Hall+Pilikothi+Haldwani",
    defaultRotation: -2.2,
    floatDuration: 3.2,
    theme: "#D4AF37",
    timeRaw: "20280626T100000Z/20280626T130000Z",
  },
  {
    id: "mehendi",
    title: "Mehendi Ceremony",
    image: "https://images.unsplash.com/photo-1590075865003-e48277faa558?q=80&w=800",
    dateTime: "Monday, June 26 • 4:00 PM",
    coverMonthDay: "JUNE 26",
    coverYear: "2028",
    location: "KK Banquet Hall, Main Lawn",
    dressCode: "Green Traditional / Indo-Western",
    mapLink: "https://maps.google.com/?q=KK+Banquet+Hall+Pilikothi+Haldwani",
    defaultRotation: 2.0,
    floatDuration: 4.2,
    theme: "#6E8B75",
    timeRaw: "20280626T160000Z/20280626T190000Z",
  },
  {
    id: "sangeet",
    title: "Sangeet Night",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
    dateTime: "Tuesday, June 27 • 7:00 PM Onwards",
    coverMonthDay: "JUNE 27",
    coverYear: "2028",
    location: "KK Banquet Hall, Grand Ballroom",
    dressCode: "Glitz & Glamour Indo-Western / Ethnic",
    mapLink: "https://maps.google.com/?q=KK+Banquet+Hall+Pilikothi+Haldwani",
    defaultRotation: -1.8,
    floatDuration: 3.6,
    theme: "#8A3358",
    timeRaw: "20280627T190000Z/20280627T220000Z",
  },
  {
    id: "wedding",
    title: "Wedding Ceremony",
    image: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=800",
    dateTime: "Wednesday, June 28 • 11:00 AM",
    coverMonthDay: "JUNE 28",
    coverYear: "2028",
    location: "KK Banquet Hall, Mandap Area",
    dressCode: "Royal Traditional Indian Wear",
    mapLink: "https://maps.google.com/?q=KK+Banquet+Hall+Pilikothi+Haldwani",
    defaultRotation: 2.4,
    floatDuration: 4.5,
    theme: "#C5A029",
    timeRaw: "20280628T110000Z/20280628T150000Z",
  },
  {
    id: "reception",
    title: "Reception Dinner",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800",
    dateTime: "Wednesday, June 28 • 7:30 PM Onwards",
    coverMonthDay: "JUNE 28",
    coverYear: "2028",
    location: "KK Banquet Hall, Main Ballroom",
    dressCode: "Formal Western / Elegant Indo-Western",
    mapLink: "https://maps.google.com/?q=KK+Banquet+Hall+Pilikothi+Haldwani",
    defaultRotation: -2.0,
    floatDuration: 3.8,
    theme: "#590A2E",
    timeRaw: "20280628T193000Z/20280628T233000Z",
  },
];

function EventCard({ event }: { event: EventDetails }) {
  return (
    <div
      className="w-full flex justify-center select-none"
    >
      {/* Continuous float animation wrapper with auto-height */}
      <div
        className="w-[290px] sm:w-[350px] animate-float relative h-auto"
        style={{ animationDuration: `${event.floatDuration}s` }}
      >
        <div
          style={{
            transform: `rotate(${event.defaultRotation}deg)`,
          }}
          className="w-full h-auto relative rounded-[32px] bg-[#590A2E] border border-[#A36662]/12 p-5 pb-8 sm:p-6 pb-6 flex flex-col items-center gap-4 sm:gap-5 shadow-[0_20px_50px_rgba(163,102,98,0.14)] hover:shadow-[0_35px_70px_rgba(163,102,98,0.22)] transition-shadow duration-500 overflow-hidden"
        >
          {/* 1. Rounded Event Mood Image with fixed height */}
          <div className="relative w-full h-[150px] sm:h-[180px] rounded-[20px] overflow-hidden border border-neutral-100 shadow-sm flex-shrink-0">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover pointer-events-none"
              sizes="(max-w-md) 100vw, 420px"
            />
          </div>

          {/* 2. Centered Gold Star Icon */}
          <div className="flex justify-center select-none py-0.5">
            <svg className="w-5 h-5 text-[#D5B03A] fill-[#D5B03A]" viewBox="0 0 24 24">
              <path d="M12 2l2.4 7.2L21.6 12 14.4 14.4 12 21.6 9.6 14.4 2.4 12 9.6 9.6z" />
            </svg>
          </div>

          {/* 3. Event Title */}
          <div className="w-full text-center py-0.5">
            <h3 className="text-4xl sm:text-[1.9rem] text-[#fbf4e6] font-bold tracking-wide leading-tight"
              style={{ fontFamily: "var(--font-alex-brush), cursive" }}
            >
              {event.title}
            </h3>
          </div>

          {/* 4. Timing & Location Details */}
          <div className="text-center w-full px-2 select-none flex flex-col gap-2.5 sm:gap-3.5">
            <p className="font-cormorant text-sm sm:text-base text-[#fbf4e6] font-semibold leading-normal">
              {event.dateTime}
            </p>
            <p className="font-cormorant italic text-[1.1rem] sm:text-[1.25rem] text-gold leading-relaxed font-bold">
              {event.location}
            </p>

            {/* Dress Code Block */}
            <div className="w-full border-t border-gold pt-2.5 flex flex-col items-center justify-center gap-2">
              <span className="font-sans text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider text-[#fbf4e6] font-bold block select-none">
                Dress Code
              </span>
              <span className="font-cormorant font-bold text-sm sm:text-[1.05rem] text-white mt-0.5">
                {event.dressCode}
              </span>
            </div>
          </div>

          {/* 5. View on Maps & Add to Calendar Buttons wrapper */}
          <div className="w-full flex flex-col items-center gap-2 pt-1 flex-shrink-0 ">
            <a
              href={event.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#fbf4e6] hover:bg-[#764b41] textblack font-sans font-bold uppercase tracking-[0.2em] text-[0.75rem] sm:text-[0.7rem] text-center shadow-md transition-all duration-300 transform active:scale-95"
            >
              <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Smooth background color change to cream #fbf4e6 when 30% of the timeline section is scrolled
    gsap.to(timelineRef.current, {
      backgroundColor: "#fbf4e6",
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top center",
        end: "20% center",
        scrub: true,
      }
    });

    // Smooth text color transitions to maintain readability against cream background
    gsap.to(".timeline-heading-anim h2", {
      color: "#7A1C2C",
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top center",
        end: "20% center",
        scrub: true,
      }
    });

    gsap.to(".timeline-heading-anim p", {
      color: "#8F5E52",
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top center",
        end: "20% center",
        scrub: true,
      }
    });
  }, { scope: timelineRef });

  return (
    <section ref={timelineRef} className="w-full bg-[#590A2E] relative flex flex-col items-center justify-center overflow-hidden py-50 px-6 z-30">
      {/* Center Heading Block */}
      <div className="text-center pb-12 select-none relative z-20 timeline-heading-anim">
        <h2 className="font-alex-brush text-[3rem] sm:text-[4rem] text-[#fff8e7] tracking-wider" style={{ fontFamily: "var(--font-alex-brush), cursive" }}>
          Schedule of Events
        </h2>
        <p className="text-xs sm:text-sm font-sans text-white/60 tracking-[0.2em] uppercase mt-2.5" style={{ fontFamily: "var(--font-arimo), sans-serif" }}>
          Celebrate with us
        </p>
      </div>

      {/* Vertical Cards List Column Wrapper */}
      <div className="w-full max-w-[340px] sm:max-w-[410px] md:max-w-[460px] flex flex-col gap-20 md:gap-14 items-center z-10 relative">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
