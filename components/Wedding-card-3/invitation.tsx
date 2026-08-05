"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Import SVGs statically for Next.js image optimization
import PinkCloud from "./Welcome-section-resources/pink-cloud.svg";
import Flower from "./Welcome-section-resources/flower.svg";

export default function Invitation() {
  return (
    <div className="@container relative flex h-screen w-full flex-shrink-0 flex-col items-center justify-between p-6 overflow-hidden select-none">
      {/* ────────────────── BACKGROUND LAYER ────────────────── */}
      <div className="w-full h-full absolute top-[30%] left-[-50%] inset-0 z-0">
        <Image
          src={PinkCloud}
          alt="Pink Cloud Background"
          fill
          priority
          className="object-contain pointer-events-none select-none"
        />
      </div>

      <div className="w-full h-full absolute top-[-28%] -left-[-60%] inset-0 z-0">
        <Image
          src={PinkCloud}
          alt="Pink Cloud Background"
          fill
          priority
          className="object-contain pointer-events-none select-none"
        />
      </div>



      {/* ────────────────── BORDER FRAME LAYER (CSS) ────────────────── */}
      <div className="absolute inset-x-[6%] inset-y-[14%] border border-[#5e7b60]/50 z-10 pointer-events-none" />
      <div className="absolute inset-x-[7.8%] inset-y-[14.8%] border border-[#5e7b60]/50 z-10 pointer-events-none" />

      {/* ────────────────── CORNER FLOWERS (BACKGROUND LAYERS) ────────────────── */}

      {/* Top Right Flower Bouquet */}
      <motion.div
        className="absolute -top-[2%] -right-[20%] w-[100cqi] h-[100cqi] z-20 pointer-events-none"
        initial={{ x: 50, y: -50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={Flower}
          alt="Top Right Flower Bouquet"
          fill
          priority
          className="object-contain pointer-events-none select-none"
        />
      </motion.div>

      {/* Bottom Left Flower Bouquet (Flipped) */}
      <motion.div
        className="absolute -bottom-[2%] -left-[20%] w-[100cqi] h-[100cqi] z-20 pointer-events-none"
        initial={{ x: -50, y: 50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-full h-full scale-x-[-1] scale-y-[-1]">
          <Image
            src={Flower}
            alt="Bottom Left Flower Bouquet"
            fill
            priority
            className="object-contain pointer-events-none select-none"
          />
        </div>
      </motion.div>

      {/* ────────────────── CONTENT OVERLAY ────────────────── */}
      <div className="absolute inset-[10%] flex flex-col items-center justify-between">
        {/* Header Title: Welcome Note */}
        <div className="absolute top-[20%] left-[10%] flex flex-col items-center justify-center gap-14 my-auto z-10">
          <motion.h1
            className="text-[18cqi] leading-none select-none font-thin text-[#ac4052] drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
            style={{ fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive" }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
            Welcome
          </motion.h1>

          <motion.h1
            className="text-[18cqi] leading-none select-none font-thin text-[#ac4052] mt-[-2cqi] ml-[16cqi] drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
            style={{ fontFamily: "var(--font-amsterdam-four), var(--font-script), cursive" }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          >
            Note
          </motion.h1>
        </div>

        {/* Quote / Subtitle & Author */}
        <motion.div
          className="absolute top-[56%] left-[0%] flex flex-col items-center justify-center w-full"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          <p
            className="text-[4cqi] leading-relaxed max-w-[85%] font-light text-center text-[#2c2a29] opacity-95 z-20"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            We're so excited to start this new chapter together. We'd be honored to have you celebrate our special day with us.
          </p>

          <div className="w-[80%] flex justify-end mt-12 z-20">
            <span
              className="text-[3.5cqi] italic font-semibold text-[#ac4052] opacity-90"
              style={{ fontFamily: "var(--font-display), Georgia, serif" }}
            >
              - With love, Daniel & Maria
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
