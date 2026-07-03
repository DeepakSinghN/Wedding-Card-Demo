"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const stories = [
  "It started with a simple hello...",
  "Grew through late-night conversations...",
  "Laughed through countless adventures...",
  "And now, we begin our forever.",
  "This isn't just a wedding...",
  "it's the beginning of our forever. So...",
  "Come witness a promise that lasts forever."
];

export default function IntroStory() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (!isInView) {
      setIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % stories.length);
    }, 4500); // Change sentence every 4.5 seconds

    return () => clearInterval(interval);
  }, [isInView]);

  const words = stories[index].split(" ");

  return (
    <section
      ref={ref}
      className="w-full h-screen flex items-center justify-center bg-[#FAF4EF] px-6 relative overflow-hidden"
    >


      {/* Decorative Gold Corner Mandalas/Accents */}
      <div className="absolute top-12 left-12 text-[#A36662]/20 font-serif text-lg pointer-events-none">❖</div>
      <div className="absolute top-12 right-12 text-[#A36662]/20 font-serif text-lg pointer-events-none">❖</div>
      <div className="absolute bottom-12 left-12 text-[#A36662]/20 font-serif text-lg pointer-events-none">❖</div>
      <div className="absolute bottom-12 right-12 text-[#A36662]/20 font-serif text-lg pointer-events-none">❖</div>

      <div className="max-w-3xl w-full text-center z-10 flex flex-col items-center justify-between h-[65vh] md:h-[50vh] px-4">

        {/* Center: Main Animating Story */}
        <div className="flex-1 flex items-center justify-center py-6">
          <AnimatePresence mode="wait">
            <motion.h3
              key={index}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.18
                  }
                },
                exit: {
                  opacity: 0,
                  y: -12,
                  filter: "blur(6px)",
                  transition: { duration: 0.6, ease: "easeInOut" }
                }
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="font-cormorant italic text-[clamp(2rem,6vw,2.75rem)] text-[#A36662] leading-relaxed tracking-wide min-h-[5.5rem]"
            >
              {words.map((word, wIdx) => (
                <motion.span
                  key={wIdx}
                  variants={{
                    hidden: { opacity: 0, y: 15, filter: "blur(6px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="inline-block mr-[0.3em] font-medium"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h3>
          </AnimatePresence>
        </div>


      </div>
    </section>
  );
}
