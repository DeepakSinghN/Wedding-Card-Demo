"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import ParallaxHeader from "./ParallaxHeader";

export default function Venue() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax Scroll Tracking for card entrance
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 0.45], [100, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

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
    <section
      ref={sectionRef}
      className="w-full bg-[#FAF4EF] relative py-20 px-6 border-t border-[#A36662]/5 overflow-hidden flex flex-col items-center justify-center min-h-screen"
    >
      {/* Decorative luxurious inner border frame */}
      <div className="absolute inset-4 md:inset-8 border border-[#A36662]/5 rounded-[28px] pointer-events-none z-30" />
      <div className="absolute inset-5 md:inset-9 border border-dashed border-[#A36662]/8 rounded-[26px] pointer-events-none z-30" />

      {/* Center Heading Block */}
      <ParallaxHeader
        category="The Celebration"
        title="The Venue"
        backgroundText="VENUE"
        titleClassName="font-distrela"
        className="pt-8 pb-4 px-6 z-30"
      />

      {/* 3-Tiered Animation Card Container */}
      {/* Tier 1: Parallax Scroll Entry */}
      <motion.div
        style={{
          y: cardY,
          opacity: cardOpacity,
          perspective: "1200px", // Enables 3D space projection
        }}
        className="w-full max-w-[340px] sm:max-w-[410px] md:max-w-[460px] flex justify-center z-10"
      >
        {/* Tier 2: Continuous Idle Floating */}
        <div className="w-full animate-float mt-6 mb-12">
          
          {/* Tier 3: 3D Mouse Tilt & Mobile Touch Tap */}
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
              scale: springScale,
              transformStyle: "preserve-3d",
            }}
            className="w-full bg-[#FDFAF7] border border-[#A36662]/12 rounded-[32px] p-5 sm:p-6 pb-8 sm:pb-10 flex flex-col items-center shadow-[0_20px_50px_rgba(163,102,98,0.14)] hover:shadow-[0_35px_70px_rgba(163,102,98,0.22)] transition-shadow duration-300"
          >
            {/* 1. Rounded Watercolor Venue Image */}
            <div 
              style={{ transform: "translateZ(25px)" }}
              className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden border border-neutral-100 shadow-sm"
            >
              <Image
                src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=1000"
                alt="Rajalakshmi Kalyana Mandapam"
                fill
                priority
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

            {/* 3. Venue Title */}
            <div 
              style={{ transform: "translateZ(35px)" }}
              className="w-full text-center"
            >
              <h3 className="font-distrela text-2xl sm:text-[1.8rem] text-[#7A1C2C] font-bold tracking-wide leading-tight">
                Rajalakshmi Kalyana
              </h3>
              <h3 className="font-distrela text-2xl sm:text-[1.8rem] text-[#7A1C2C] font-bold tracking-wide leading-tight mt-0.5">
                Mandapam
              </h3>
            </div>

            {/* 4. Italic Address Details */}
            <div 
              style={{ transform: "translateZ(20px)" }}
              className="text-center px-4 mt-4 mb-6 select-none"
            >
              <p className="font-cormorant italic text-[clamp(1rem,1.8vw,1.15rem)] text-[#8F5E52] leading-relaxed font-semibold">
                No. 205/1, Velachery Main Road,<br />
                Dhandeeswaram<br />
                Velachery, Chennai, Tamil Nadu — 600042
              </p>
            </div>

            {/* 5. Pill-Shaped VIEW ON MAPS Button */}
            <div 
              style={{ transform: "translateZ(40px)" }}
              className="w-full flex justify-center z-20"
            >
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rajalakshmi+Kalyana+Mandapam+Velachery+Chennai"
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
    </section>
  );
}
