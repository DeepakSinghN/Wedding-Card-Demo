"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Closing() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 120, damping: 14 },
    },
  } as const;

  return (
    <section className="relative w-full h-[100vh] py-16 px-4 bg-[#fbf4e6] z-30 flex flex-col items-center mt-10">
      <motion.div
        variants={containerVariants}
        initial={shouldReduceMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full max-w-[400px] border border-[#A36662]/20 rounded-[32px] p-8 text-center bg-[#FAF6EE]/50 shadow-[0_15px_40px_rgba(163,102,98,0.06)] relative overflow-hidden"
      >
        {/* Subtle decorative double borders inside the card */}
        <div className="absolute inset-2 border border-dashed border-[#A36662]/10 rounded-[24px] pointer-events-none" />

        {/* Decorative Lotus or Star */}
        <motion.div variants={itemVariants} className="flex justify-center mb-4 select-none">
          <svg className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37] filter drop-shadow-[0_1px_3px_rgba(212,175,55,0.2)]" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2L21.6 12 14.4 14.4 12 21.6 9.6 14.4 2.4 12 9.6 9.6z" />
          </svg>
        </motion.div>

        {/* Thank You Script */}
        <motion.h2
          variants={itemVariants}
          className="font-alex-brush text-[3.6rem] text-[#7A1C2C] leading-none mb-4 select-none"
          style={{ fontFamily: "var(--font-alex-brush), cursive" }}
        >
          Thank You
        </motion.h2>

        {/* Closing Message */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-xs font-bold text-[#8F5E52] tracking-[0.25em] uppercase mb-6 select-none"
          style={{ fontFamily: "var(--font-arimo), sans-serif" }}
        >
          For Your Love & Blessings
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="w-full flex flex-col gap-4 font-serif text-[#2c2a29] leading-relaxed text-sm"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          <p>
            Your presence, blessings, and warm wishes mean the world to us as we begin our new journey together.
          </p>
          <p>
            Thank you for being a part of our story and for sharing in our celebration. We are truly grateful.
          </p>
        </motion.div>

        {/* Closing Separator Ornament */}
        <motion.div variants={itemVariants} className="flex justify-center mt-8 select-none opacity-40">
          <div className="w-1.5 h-1.5 rounded-full bg-[#A36662] mx-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#A36662] mx-1 scale-125" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#A36662] mx-1" />
        </motion.div>
      </motion.div>
    </section>
  );
}
