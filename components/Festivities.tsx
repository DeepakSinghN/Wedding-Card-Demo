"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface EventDetails {
  id: string;
  title: string;
  image: string;
  dateTime: string;
  location: string;
  dressCode: string;
  mapLink: string;
  defaultRotation: number;
  floatDuration: number;
}

const EVENTS_LIST: EventDetails[] = [
  {
    id: "sangeet",
    title: "Sangeet Night",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
    dateTime: "Friday, Nov 27 • 7:00 PM Onwards",
    location: "Grand Ballroom, The Oberoi Amarvilas",
    dressCode: "Indo-Western Ethnic / Bling",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Oberoi+Amarvilas+Agra",
    defaultRotation: -2.2,
    floatDuration: 3.2,
  },
  {
    id: "carnival",
    title: "Vibrant Carnival",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800",
    dateTime: "Saturday, Nov 28 • 11:00 AM",
    location: "The Royal Gardens, The Oberoi Amarvilas",
    dressCode: "Bright, Vibrant & Colorful Casuals",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Oberoi+Amarvilas+Agra",
    defaultRotation: 2.0,
    floatDuration: 4.2,
  },
  {
    id: "sehra",
    title: "Sehra Bandi",
    image: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=800",
    dateTime: "Saturday, Nov 28 • 2:30 PM",
    location: "Groom's Suite, The Oberoi Amarvilas",
    dressCode: "Traditional Sherwani / Kurta",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Oberoi+Amarvilas+Agra",
    defaultRotation: -1.8,
    floatDuration: 3.6,
  },
  {
    id: "reception",
    title: "Grand Reception",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800",
    dateTime: "Sunday, Nov 29 • 7:00 PM Onwards",
    location: "The Royal Pavilion, The Oberoi Amarvilas",
    dressCode: "Royal Indian Formals / Tuxedos",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Oberoi+Amarvilas+Agra",
    defaultRotation: 2.4,
    floatDuration: 4.5,
  },
  {
    id: "afterparty",
    title: "The After Party",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800",
    dateTime: "Saturday, Nov 28 • 10:30 PM Onwards",
    location: "Club Zenith, The Oberoi Amarvilas",
    dressCode: "Smart Casuals / Party Chic",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Oberoi+Amarvilas+Agra",
    defaultRotation: -2.0,
    floatDuration: 3.8,
  },
];

function EventCard({ event }: { event: EventDetails }) {
  const [isOpen, setIsOpen] = useState(false);
  const titleParts = event.title.split(" ");
  const firstWord = titleParts[0];
  const secondWord = titleParts.slice(1).join(" ") || "Event";

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ perspective: "1500px" }}
      className="w-full flex justify-center"
    >
      {/* Continuous float animation wrapper */}
      <div
        className="w-[290px] h-[450px] sm:w-[350px] sm:h-[490px] animate-float relative"
        style={{ animationDuration: `${event.floatDuration}s` }}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          style={{
            transformStyle: "preserve-3d",
            transform: `rotate(${event.defaultRotation}deg)`,
          }}
          className="w-full h-full relative rounded-[32px] cursor-pointer shadow-[0_20px_50px_rgba(163,102,98,0.14)] hover:shadow-[0_35px_70px_rgba(163,102,98,0.22)] transition-shadow duration-500"
        >
          {/* ================= BACK FACE (Inside Content) ================= */}
          <div className="absolute inset-0 bg-[#FDFAF7] border border-[#A36662]/12 rounded-[32px] p-5 sm:p-6 pb-6 flex flex-col items-center justify-between z-10 overflow-hidden">
            {/* 1. Rounded Event Mood Image */}
            <div className="relative w-full h-[38%] rounded-[20px] overflow-hidden border border-neutral-100 shadow-sm flex-shrink-0">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover pointer-events-none"
                sizes="(max-w-md) 100vw, 420px"
              />
            </div>

            {/* 2. Centered Gold Star Icon */}
            <div className="flex justify-center select-none py-1 sm:py-2">
              <svg className="w-5 h-5 text-[#D5B03A] fill-[#D5B03A]" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.2L21.6 12 14.4 14.4 12 21.6 9.6 14.4 2.4 12 9.6 9.6z" />
              </svg>
            </div>

            {/* 3. Event Title */}
            <div className="w-full text-center py-0.5">
              <h3 className="font-distrela text-3xl sm:text-[1.9rem] text-[#7A1C2C] font-bold tracking-wide leading-tight">
                {event.title}
              </h3>
            </div>

            {/* 4. Timing & Location Details */}
            <div className="text-center w-full px-2 select-none flex-grow flex flex-col justify-center gap-1.5 sm:gap-2.5">
              <p className="font-cormorant text-sm sm:text-base text-[#A36662] font-semibold leading-normal">
                {event.dateTime}
              </p>
              <p className="font-cormorant italic text-[1.1rem] sm:text-[1.25rem] text-[#8F5E52] leading-relaxed font-bold">
                {event.location}
              </p>

              {/* Dress Code Block */}
              <div className="w-full border-t border-[#A36662]/10 pt-2.5 flex flex-col items-center justify-center">
                <span className="font-sans text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider text-[#A36662]/75 font-bold block select-none">
                  Dress Code
                </span>
                <span className="font-cormorant font-bold text-sm sm:text-[1.05rem] text-[#7A1C2C] mt-0.5">
                  {event.dressCode}
                </span>
              </div>
            </div>

            {/* 5. Pill-Shaped VIEW ON MAPS Button */}
            <div className="w-full flex justify-center z-20 pt-2 flex-shrink-0">
              <a
                href={event.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#8F5E52] hover:bg-[#764b41] text-white font-sans font-bold uppercase tracking-[0.2em] text-[0.65rem] sm:text-[0.7rem] text-center shadow-md transition-all duration-300 transform active:scale-95"
              >
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                View on Maps
              </a>
            </div>
          </div>

          {/* ================= LEFT FLAP ================= */}
          <motion.div
            style={{
              transformOrigin: "left center",
              backfaceVisibility: "hidden",
            }}
            animate={{
              rotateY: isOpen ? -145 : 0,
            }}
            transition={{
              duration: 3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute left-0 top-0 w-1/2 h-full bg-[#FDFAF7] border border-[#A36662]/15 border-r-0 rounded-l-[32px] overflow-hidden z-20 p-4"
          >
            {/* Left side gold borders */}
            <div className="absolute inset-2.5 border border-[#A36662]/15 border-r-0 rounded-l-[24px] pointer-events-none" />
            <div className="absolute inset-3 border border-dashed border-[#A36662]/8 border-r-0 rounded-l-[22px] pointer-events-none" />

            {/* Top/Bottom Left floral corner ornaments */}
            <div className="text-[10px] text-[#A36662]/20 font-serif absolute top-4 left-4 pointer-events-none">❖</div>
            <div className="text-[10px] text-[#A36662]/20 font-serif absolute bottom-4 left-4 pointer-events-none">❖</div>

            {/* Repositioned Cover Text (Above the Ribbon) */}
            <div className="absolute right-5 top-[20%] select-none z-10 text-right flex flex-col items-end">
              <span className="font-cormorant text-[0.75rem] sm:text-[0.8rem] tracking-[0.25em] text-[#A36662]/80 uppercase mb-1.5 font-bold">
                INVITATION
              </span>
              <h3 className="font-cormorant text-3xl sm:text-4xl text-[#7A1C2C] font-bold leading-none">
                {firstWord}
              </h3>
            </div>

            {/* Left Cream Ribbon Band and Bow Half */}
            <div
              style={{
                backgroundImage: "linear-gradient(to bottom, #E8DFD8 0%, #FAF4EF 25%, #FCF9F6 50%, #FAF4EF 75%, #E8DFD8 100%)",
                boxShadow: "0 3px 8px rgba(163, 102, 98, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)"
              }}
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-8 z-30 flex items-center justify-end"
            >
              {/* Gold ribbon stitching */}
              <div className="absolute top-[3px] left-0 right-0 h-[1px] bg-[#D5B03A]/60" />
              <div className="absolute bottom-[3px] left-0 right-0 h-[1px] bg-[#D5B03A]/60" />

              {/* Left Bow Loop */}
              <div
                style={{
                  backgroundImage: "linear-gradient(to bottom, #EAE1DA 0%, #FCF9F6 50%, #E3D8CE 100%)",
                  boxShadow: "inset 0 2px 3px rgba(255, 255, 255, 0.9), inset 0 -3px 6px rgba(163, 102, 98, 0.15), 0 3px 6px rgba(163, 102, 98, 0.12)"
                }}
                className="absolute right-[-8px] top-[0px] w-6 h-8 rounded-full border-[1.5px] border-[#D5B03A]/85 rotate-[-15deg] z-40"
              />

              {/* Left Ribbon V-tail */}
              <div
                className="absolute right-[-4px] top-[18px] w-3.5 h-6 rotate-[35deg] origin-top-left z-35"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)",
                  backgroundImage: "linear-gradient(to bottom, #EAE1DA, #D8CCC2)"
                }}
              />

              {/* Left Bow Center Knot half */}
              <div
                style={{
                  backgroundImage: "linear-gradient(to bottom, #D5B03A, #BFA030, #D5B03A)"
                }}
                className="absolute right-[-3px] top-[8px] w-1.5 h-4 rounded-l-sm border-[1px] border-r-0 border-[#D5B03A] z-50 shadow-[1px_0_2px_rgba(0,0,0,0.15)]"
              />
            </div>

            {/* Repositioned Cover Date (Below the Ribbon) */}
            <div className="absolute right-5 bottom-[20%] select-none z-10 text-right">
              <span className="font-cormorant text-[1rem] sm:text-[0.95rem] tracking-[0.2em] text-[#A36662] uppercase font-bold">
                {event.dateTime.includes("Nov 27") ? "NOV 27" : event.dateTime.includes("Nov 28") ? "NOV 28" : "NOV 29"}
              </span>
            </div>
          </motion.div>

          {/* ================= RIGHT FLAP ================= */}
          <motion.div
            style={{
              transformOrigin: "right center",
              backfaceVisibility: "hidden",
            }}
            animate={{
              rotateY: isOpen ? 145 : 0,
            }}
            transition={{
              duration: 3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute right-0 top-0 w-1/2 h-full bg-[#FDFAF7] border border-[#A36662]/15 border-l-0 rounded-r-[32px] overflow-hidden z-20 p-4"
          >
            {/* Right side gold borders */}
            <div className="absolute inset-2.5 border border-[#A36662]/15 border-l-0 rounded-r-[24px] pointer-events-none" />
            <div className="absolute inset-3 border border-dashed border-[#A36662]/8 border-l-0 rounded-r-[22px] pointer-events-none" />

            {/* Top/Bottom Right floral corner ornaments */}
            <div className="text-[10px] text-[#A36662]/20 font-serif absolute top-4 right-4 pointer-events-none">❖</div>
            <div className="text-[10px] text-[#A36662]/20 font-serif absolute bottom-4 right-4 pointer-events-none">❖</div>

            {/* Repositioned Cover Text (Above the Ribbon) */}
            <div className="absolute left-5 top-[20%] select-none z-10 text-left flex flex-col items-start">
              <span className="font-cormorant text-[0.75rem] sm:text-[0.8rem] tracking-[0.25em] text-[#A36662]/80 uppercase mb-1.5 font-bold">
                TO ATTEND
              </span>
              <h3 className="font-cormorant text-3xl sm:text-4xl text-[#7A1C2C] font-bold leading-none">
                {secondWord}
              </h3>
            </div>

            {/* Right Cream Ribbon Band and Bow Half */}
            <div
              style={{
                backgroundImage: "linear-gradient(to bottom, #E8DFD8 0%, #FAF4EF 25%, #FCF9F6 50%, #FAF4EF 75%, #E8DFD8 100%)",
                boxShadow: "0 3px 8px rgba(163, 102, 98, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)"
              }}
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-8 z-30 flex items-center justify-start"
            >
              {/* Gold ribbon stitching */}
              <div className="absolute top-[3px] left-0 right-0 h-[1px] bg-[#D5B03A]/60" />
              <div className="absolute bottom-[3px] left-0 right-0 h-[1px] bg-[#D5B03A]/60" />

              {/* Right Bow Loop */}
              <div
                style={{
                  backgroundImage: "linear-gradient(to bottom, #EAE1DA 0%, #FCF9F6 50%, #E3D8CE 100%)",
                  boxShadow: "inset 0 2px 3px rgba(255, 255, 255, 0.9), inset 0 -3px 6px rgba(163, 102, 98, 0.15), 0 3px 6px rgba(163, 102, 98, 0.12)"
                }}
                className="absolute left-[-8px] top-[0px] w-6 h-8 rounded-full border-[1.5px] border-[#D5B03A]/85 rotate-[15deg] z-40"
              />

              {/* Right Ribbon V-tail */}
              <div
                className="absolute left-[-4px] top-[18px] w-3.5 h-6 rotate-[-35deg] origin-top-right z-35"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)",
                  backgroundImage: "linear-gradient(to bottom, #EAE1DA, #D8CCC2)"
                }}
              />

              {/* Right Bow Center Knot half */}
              <div
                style={{
                  backgroundImage: "linear-gradient(to bottom, #D5B03A, #BFA030, #D5B03A)"
                }}
                className="absolute left-[-3px] top-[8px] w-1.5 h-4 rounded-r-sm border-[1px] border-l-0 border-[#D5B03A] z-50 shadow-[-1px_0_2px_rgba(0,0,0,0.15)]"
              />
            </div>

            {/* Repositioned Cover Date (Below the Ribbon) */}
            <div className="absolute left-5 bottom-[20%] select-none z-10 text-left">
              <span className="font-cormorant text-[1rem] sm:text-[0.95rem] tracking-[0.2em] text-[#A36662] uppercase font-bold">
                2026
              </span>
            </div>
          </motion.div>

          {/* ================= TAP TO OPEN HELPER (Closed State Only) ================= */}
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0.4, 0.9, 0.4], y: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-6 left-0 w-full text-center z-30 pointer-events-none"
            >
              <span className="font-sans text-[0.55rem] tracking-[0.2em] text-[#A36662] uppercase font-bold">
                Tap to Open
              </span>
            </motion.div>
          )}

        </div>
      </div>
    </motion.div>
  );
}

export default function Festivities() {
  return (
    <section
      className="w-full bg-[#FAF4EF] relative flex flex-col items-center justify-center overflow-hidden py-24 px-6 border-t border-[#A36662]/5 min-h-screen"
    >
      {/* Decorative luxurious inner border frame */}
      <div className="absolute inset-4 md:inset-8 border border-[#A36662]/5 rounded-[28px] pointer-events-none z-30" />
      <div className="absolute inset-5 md:inset-9 border border-dashed border-[#A36662]/8 rounded-[26px] pointer-events-none z-30" />

      {/* Center Heading Block */}
      <div className="flex flex-col items-center text-center w-full max-w-xl mx-auto gap-1 md:gap-2 pb-8 px-6 z-30 select-none">
        <span className="font-cormorant tracking-[0.25em] text-[0.8rem] md:text-[0.9rem] text-[#A36662] uppercase font-semibold">
          The Celebration
        </span>
        <h2 className="font-cormorant italic text-[clamp(2.5rem,5.2vw,4.5rem)] text-[#7A1C2C] tracking-wide leading-none font-bold mt-2">
          Festivities
        </h2>
      </div>

      {/* Vertical Cards List Column Wrapper */}
      <div className="w-full max-w-[340px] sm:max-w-[410px] md:max-w-[460px] flex flex-col gap-10 md:gap-14 items-center z-10 relative">
        {EVENTS_LIST.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
