"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxHeaderProps {
  category: string;
  title: string;
  backgroundText?: string;
  titleClassName?: string;
  className?: string;
}

export default function ParallaxHeader({
  category,
  title,
  backgroundText,
  titleClassName = "",
  className = "",
}: ParallaxHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background watermark text still shifts upwards dynamically to keep 3D depth
  const bgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const titleWords = title.split(" ");
  const categoryWords = category.split(" ");

  return (
    <div
      ref={containerRef}
      className={`flex flex-col items-center justify-center text-center w-full max-w-2xl mx-auto py-12 relative overflow-hidden select-none ${className}`}
    >
      {/* 1. Giant faded background text (lowest Z index) */}
      {backgroundText && (
        <motion.span
          style={{ y: bgY }}
          className="absolute font-sans font-black text-[#A36662] opacity-[0.035] text-[clamp(4.5rem,11vw,9.5rem)] tracking-[0.15em] uppercase leading-none whitespace-nowrap z-0 pointer-events-none select-none"
        >
          {backgroundText}
        </motion.span>
      )}

      {/* 2. Category Label (Cinematic Masked Slide-Up) */}
      <span className="font-cormorant tracking-[0.25em] text-[0.8rem] md:text-[0.9rem] text-[#A36662] uppercase font-semibold z-10 flex flex-wrap justify-center gap-x-[0.25em]">
        {categoryWords.map((word, idx) => (
          <span key={idx} className="overflow-hidden inline-block py-0.5">
            <motion.span
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>

      {/* 3. Main Heading (Cinematic Masked Word-by-Word Slide-Up) */}
      <h2
        className={`font-cormorant italic text-[clamp(2.5rem,5.2vw,4.5rem)] text-[#7A1C2C] tracking-wide leading-none font-bold mt-2 z-10 flex flex-wrap justify-center gap-x-[0.25em] ${titleClassName}`}
      >
        {titleWords.map((word, idx) => (
          <span key={idx} className="overflow-hidden inline-block py-1">
            <motion.span
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.8,
                delay: 0.1 + idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>
    </div>
  );
}
