"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScratchCard from "./ScratchCard";
import Confetti from "./Confetti";
import ScrollReveal from "./ScrollReveal";

interface SaveTheDateProps {
  onAllRevealed?: () => void;
  data?: any;
}

export default function SaveTheDate({ onAllRevealed, data }: SaveTheDateProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState({
    month: false,
    day: false,
    year: false,
  });
  const [confettiActive, setConfettiActive] = useState(false);

  const dateStr = data?.date || "2026-07-18";
  const dateObj = new Date(dateStr);
  const isValid = !isNaN(dateObj.getTime());

  let monthVal = isValid ? dateObj.toLocaleDateString("en-US", { month: "long" }) : "July";
  const dayVal = isValid ? dateObj.toLocaleDateString("en-US", { day: "numeric" }) : "18";
  const yearVal = isValid ? dateObj.toLocaleDateString("en-US", { year: "numeric" }) : "2026";

  // Map of long month names to their 3-letter abbreviations to prevent layout overflow
  const longMonths: { [key: string]: string } = {
    "January": "Jan",
    "February": "Feb",
    "August": "Aug",
    "September": "Sep",
    "October": "Oct",
    "November": "Nov",
    "December": "Dec"
  };

  if (longMonths[monthVal]) {
    monthVal = longMonths[monthVal];
  }

  const isCompact = false;

  const allRevealed = revealed.month && revealed.day && revealed.year;

  useEffect(() => {
    if (!allRevealed) return;

    if (onAllRevealed) {
      onAllRevealed();
    }

    // Trigger party popper burst after 0.7 seconds delay
    const timer = setTimeout(() => {
      setConfettiActive(true);
    }, 700);

    return () => clearTimeout(timer);
  }, [allRevealed, onAllRevealed]);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen py-16 flex flex-col items-center justify-center bg-[#FAF4EF] px-6 relative border-t border-[#A36662]/5"
    >
      {/* Celebration Confetti Popper */}
      <Confetti trigger={confettiActive} />



      {/* Heading Block */}
      <ScrollReveal animation="fade-in-down" className="flex flex-col items-center text-center z-10 w-full max-w-xl gap-2 md:gap-3 mb-10">
        {/* Tiny spacing header */}
        <span className="font-thin text-xs tracking-[0.3em] text-[#D5B03A] uppercase">
          THE DATE
        </span>

        {/* Premium Save the Date cursive/script title */}
        <h2 className="font-distrela text-[#A0635F] text-[clamp(3rem,5vw,6rem)] mt-4 tracking-wider leading-none font-bold">
          Save the Date
        </h2>

        {/* Cursive subtitle matching theme */}
        <p className="font-cormorant text-[clamp(1.1rem,2.2vw,1.4rem)] text-[#A36662] italic">
          Scratch below to reveal our wedding date
        </p>
      </ScrollReveal>

      {/* Cards Flex Grid Container */}
      <div className="flex flex-row flex-wrap gap-2 md:gap-12 justify-center items-center w-full px-4 max-w-4xl z-10">
        {/* Card 1: MONTH */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -20 }}
          whileInView={{ opacity: 1, y: 0, rotate: [15, -8, 3, 0] }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <ScratchCard
            title="MONTH"
            revealValue={monthVal}
            subText="↑ SCRATCH"
            swingDelay={0}
            rotateDuration={1.2}
            yDuration={1.5}
            isCompact={isCompact}
            onReveal={() => setRevealed((prev) => ({ ...prev, month: true }))}
          />
        </motion.div>

        {/* Card 2: DAY */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 20 }}
          whileInView={{ opacity: 1, y: 0, rotate: [-15, 8, -3, 0] }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        >
          <ScratchCard
            title="DAY"
            revealValue={dayVal}
            subText="↑ SCRATCH"
            swingDelay={0.2}
            rotateDuration={0.85}
            yDuration={1.1}
            isCompact={isCompact}
            onReveal={() => setRevealed((prev) => ({ ...prev, day: true }))}
          />
        </motion.div>

        {/* Card 3: YEAR */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -20 }}
          whileInView={{ opacity: 1, y: 0, rotate: [15, -8, 3, 0] }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        >
          <ScratchCard
            title="YEAR"
            revealValue={yearVal}
            subText="↑ SCRATCH"
            swingDelay={0.4}
            rotateDuration={1.45}
            yDuration={1.8}
            isCompact={isCompact}
            onReveal={() => setRevealed((prev) => ({ ...prev, year: true }))}
          />
        </motion.div>
      </div>
    </section>
  );
}
