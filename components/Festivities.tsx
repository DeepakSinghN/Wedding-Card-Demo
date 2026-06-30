"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Motion Values
  const mouseX = useMotionValue(0.5); // Range: 0 to 1
  const mouseY = useMotionValue(0.5); // Range: 0 to 1

  // Map mouse positions to 3D rotation angles (-12deg to 12deg)
  const rotateX = useTransform(mouseY, [0, 1], [12, -12]);
  const rotateY = useTransform(mouseX, [0, 1], [-12, 12]);

  // Smooth springs for a luxury fluid tilt and zoom feel
  const springX = useSpring(rotateX, { damping: 25, stiffness: 200 });
  const springY = useSpring(rotateY, { damping: 25, stiffness: 200 });

  const scaleVal = useMotionValue(1);
  const springScale = useSpring(scaleVal, { damping: 20, stiffness: 220 });

  // Handle Mouse Over movement to calculate angles on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized relative position (0 to 1)
    const relativeX = (e.clientX - rect.left) / width;
    const relativeY = (e.clientY - rect.top) / height;

    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  // Reset to flat state and default scale on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    scaleVal.set(1);
  };

  // Zoom in slightly on desktop hover
  const handleMouseEnter = () => {
    scaleVal.set(1.02);
  };

  // Tactile squish and tilt on mobile touch start
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    scaleVal.set(0.97);
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const touch = e.touches[0];
    const relativeX = (touch.clientX - rect.left) / width;
    const relativeY = (touch.clientY - rect.top) / height;

    mouseX.set(Math.max(0, Math.min(1, relativeX)));
    mouseY.set(Math.max(0, Math.min(1, relativeY)));
  };

  // Handle touch dragging tilt on mobile screens
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const touch = e.touches[0];
    const relativeX = (touch.clientX - rect.left) / width;
    const relativeY = (touch.clientY - rect.top) / height;

    mouseX.set(Math.max(0, Math.min(1, relativeX)));
    mouseY.set(Math.max(0, Math.min(1, relativeY)));
  };

  // Reset card state on mobile touch end
  const handleTouchEnd = () => {
    scaleVal.set(1);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ perspective: "1200px" }}
      className="w-full flex justify-center"
    >
      {/* continuous float animation wrapper */}
      <div className="w-full animate-float" style={{ animationDuration: `${event.floatDuration}s` }}>
        
        <motion.div
          ref={cardRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          style={{
            rotateX: springX,
            rotateY: springY,
            rotateZ: event.defaultRotation,
            scale: springScale,
            transformStyle: "preserve-3d",
          }}
          className="w-full bg-[#FDFAF7] border border-[#A36662]/12 rounded-[32px] p-5 sm:p-6 pb-8 sm:pb-10 flex flex-col items-center shadow-[0_20px_50px_rgba(163,102,98,0.14)] hover:shadow-[0_35px_70px_rgba(163,102,98,0.22)] transition-shadow duration-300"
        >
          {/* 1. Rounded Event Mood Image */}
          <div 
            style={{ transform: "translateZ(25px)" }}
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[20px] overflow-hidden border border-neutral-100 shadow-sm"
          >
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover pointer-events-none"
              sizes="(max-w-md) 100vw, 420px"
            />
          </div>

          {/* 2. Centered Gold Star Icon */}
          <div 
            style={{ transform: "translateZ(30px)" }}
            className="my-5 flex justify-center select-none"
          >
            <svg className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37]" viewBox="0 0 24 24">
              <path d="M12 2l2.4 7.2L21.6 12 14.4 14.4 12 21.6 9.6 14.4 2.4 12 9.6 9.6z" />
            </svg>
          </div>

          {/* 3. Event Title */}
          <div 
            style={{ transform: "translateZ(35px)" }}
            className="w-full text-center"
          >
            <h3 className="font-distrela text-2xl sm:text-[1.8rem] text-[#7A1C2C] font-bold tracking-wide leading-tight">
              {event.title}
            </h3>
          </div>

          {/* 4. Timing & Location Details */}
          <div 
            style={{ transform: "translateZ(20px)" }}
            className="text-center px-4 mt-3 mb-6 select-none"
          >
            <p className="font-cormorant text-sm sm:text-base text-[#A36662] font-semibold leading-normal">
              {event.dateTime}
            </p>
            <p className="font-cormorant italic text-[clamp(1rem,1.8vw,1.15rem)] text-[#8F5E52] leading-relaxed font-semibold mt-1">
              {event.location}
            </p>

            {/* Dress Code Block */}
            <div className="w-full border-t border-[#A36662]/10 pt-3 mt-4 flex flex-col items-center justify-center">
              <span className="font-sans text-[0.6rem] uppercase tracking-wider text-[#A36662]/75 font-bold block select-none">
                Dress Code
              </span>
              <span className="font-cormorant font-bold text-sm text-[#7A1C2C] mt-0.5">
                {event.dressCode}
              </span>
            </div>
          </div>

          {/* 5. Pill-Shaped VIEW ON MAPS Button */}
          <div 
            style={{ transform: "translateZ(40px)" }}
            className="w-full flex justify-center z-20"
          >
            <a
              href={event.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#8F5E52] hover:bg-[#764b41] text-white font-sans font-bold uppercase tracking-[0.2em] text-[0.65rem] sm:text-[0.7rem] text-center shadow-md transition-all duration-300 transform active:scale-95"
            >
              {/* Location Pin Icon */}
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              View on Maps
            </a>
          </div>

        </motion.div>
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
        <h2 className="font-distrela text-[clamp(2.5rem,5.2vw,4.5rem)] text-[#7A1C2C] tracking-wide leading-none font-bold mt-2">
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
