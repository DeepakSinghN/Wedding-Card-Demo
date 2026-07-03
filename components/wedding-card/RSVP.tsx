"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ParallaxHeader from "./ParallaxHeader";

type EnvelopeState = "sealed" | "unfolding" | "open" | "folding" | "sent";

// Blooming 3D Parallax Lotus Medallion Subcomponent
const LotusMedallion = ({ isBlooming, onClick }: { isBlooming: boolean; onClick: () => void }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isBlooming) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Map coordinates to max rotation of 16 degrees
    setRotateX(-y / (rect.height / 2) * 16);
    setRotateY(x / (rect.width / 2) * 16);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={isBlooming}
      className="relative w-full h-32 flex items-center justify-center cursor-pointer select-none group z-20 outline-none focus:outline-none"
    >
      {/* Horizontal Gold Vines/Bands wrapping around the envelope */}
      <motion.div
        animate={{ x: isBlooming ? -250 : 0, opacity: isBlooming ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeIn" }}
        className="absolute left-0 h-0.5 bg-gradient-to-r from-[#D4AF37] via-[#AA7C11] to-[#D4AF37] shadow-[0_1px_2px_rgba(0,0,0,0.15)] origin-right"
        style={{ right: "50%", marginRight: "28px" }}
      />
      <motion.div
        animate={{ x: isBlooming ? 250 : 0, opacity: isBlooming ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeIn" }}
        className="absolute right-0 h-0.5 bg-gradient-to-r from-[#D4AF37] via-[#AA7C11] to-[#D4AF37] shadow-[0_1px_2px_rgba(0,0,0,0.15)] origin-left"
        style={{ left: "50%", marginLeft: "28px" }}
      />

      {/* The Central Medallion Container with 3D Perspective */}
      <div
        className="relative w-36 h-36 flex items-center justify-center pointer-events-none"
        style={{ perspective: "1000px" }}
      >
        {/* Glowing aura background on hover */}
        <div className="absolute inset-0 bg-[#D4AF37]/15 rounded-full filter blur-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

        {/* Medallion Ring (preserve-3d wrapper) */}
        <motion.div
          animate={isBlooming ? { scale: 1.5, opacity: 0, rotate: 45 } : { scale: isHovered ? 1.08 : 1 }}
          style={{
            rotateX: isBlooming ? 0 : rotateX,
            rotateY: isBlooming ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          transition={isBlooming ? { duration: 0.6, ease: "easeOut" } : { type: "spring", stiffness: 150, damping: 15 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FDFAF7] to-[#FAF4EF] border-2 border-[#D4AF37] shadow-[0_12px_28px_rgba(170,124,17,0.3)] flex items-center justify-center relative"
        >
          {/* Rotating Dotted Outer Border Ring */}
          <motion.div
            animate={isBlooming ? { rotate: -360 } : { rotate: -360 }}
            transition={isBlooming ? { duration: 0.6 } : { repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute inset-[-7px] border border-dotted border-[#D4AF37]/50 rounded-full pointer-events-none"
            style={{ transform: "translateZ(-2px)" }}
          />

          {/* Layer 1: Medallion Base Plate & Inner Rotating Dashed Ring (translateZ: 4px) */}
          <motion.div
            animate={isBlooming ? { rotate: 360 } : { rotate: 360 }}
            transition={isBlooming ? { duration: 0.6 } : { repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute inset-1.5 border border-dashed border-[#D4AF37]/50 rounded-full pointer-events-none"
            style={{ transform: "translateZ(4px)" }}
          />

          {/* Layer 2: Gold Filigree Star (translateZ: 10px) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}>
            <svg className="w-20 h-20 opacity-40" viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="lotus-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F3E5AB" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
              <path d="M 50 15 L 53 47 L 85 50 L 53 53 L 50 85 L 47 53 L 15 50 L 47 47 Z" fill="url(#lotus-gold)" />
            </svg>
          </div>

          {/* Layer 3: Outer Lotus Petals (translateZ: 20px) */}
          <motion.div
            animate={isBlooming ? { scale: 1.8, z: 120, opacity: 0, rotate: 30 } : { scale: 1, z: 20, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            <svg className="w-20 h-20 drop-shadow-[0_4px_6px_rgba(122,28,44,0.18)]" viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="lotus-pink" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#BA7A76" />
                  <stop offset="50%" stopColor="#A36662" />
                  <stop offset="100%" stopColor="#7A1C2C" />
                </linearGradient>
              </defs>
              {/* Top Petal */}
              <path d="M 50 50 C 40 30, 45 18, 50 10 C 55 18, 60 30, 50 50 Z" fill="url(#lotus-pink)" stroke="#D4AF37" strokeWidth="0.8" />
              {/* Bottom Petal */}
              <path d="M 50 50 C 40 70, 45 82, 50 90 C 55 82, 60 70, 50 50 Z" fill="url(#lotus-pink)" stroke="#D4AF37" strokeWidth="0.8" />
              {/* Left Petal */}
              <path d="M 50 50 C 30 40, 18 45, 10 50 C 18 55, 30 60, 50 50 Z" fill="url(#lotus-pink)" stroke="#D4AF37" strokeWidth="0.8" />
              {/* Right Petal */}
              <path d="M 50 50 C 70 40, 82 45, 90 50 C 82 55, 70 60, 50 50 Z" fill="url(#lotus-pink)" stroke="#D4AF37" strokeWidth="0.8" />
            </svg>
          </motion.div>

          {/* Layer 4: Diagonal Petals (translateZ: 25px) */}
          <motion.div
            animate={isBlooming ? { scale: 1.6, z: 100, opacity: 0, rotate: -30 } : { scale: 1, z: 25, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            <svg className="w-20 h-20 drop-shadow-[0_4px_6px_rgba(122,28,44,0.18)]" viewBox="0 0 100 100" fill="none">
              {/* Top-Left */}
              <path d="M 50 50 C 35 35, 28 28, 22 22 C 28 28, 35 35, 50 50 Z" fill="url(#lotus-pink)" stroke="#D4AF37" strokeWidth="0.8" />
              {/* Bottom-Right */}
              <path d="M 50 50 C 65 65, 72 72, 78 78 C 72 72, 65 65, 50 50 Z" fill="url(#lotus-pink)" stroke="#D4AF37" strokeWidth="0.8" />
              {/* Top-Right */}
              <path d="M 50 50 C 65 35, 72 28, 78 22 C 72 28, 65 35, 50 50 Z" fill="url(#lotus-pink)" stroke="#D4AF37" strokeWidth="0.8" />
              {/* Bottom-Left */}
              <path d="M 50 50 C 35 65, 28 72, 22 78 C 28 72, 35 65, 50 50 Z" fill="url(#lotus-pink)" stroke="#D4AF37" strokeWidth="0.8" />
            </svg>
          </motion.div>

          {/* Layer 5: Inner Gold Bud Pod (translateZ: 32px) */}
          <motion.div
            animate={isBlooming ? { scale: 0, z: 140, opacity: 0 } : { scale: 1, z: 32, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute flex items-center justify-center pointer-events-none"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F3E5AB] to-[#D4AF37] border border-[#7A1C2C] shadow-[0_2px_4px_rgba(0,0,0,0.25)] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#7A1C2C]" />
            </div>
          </motion.div>

        </motion.div>
      </div>
    </button>
  );
};

export default function RSVP() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [envelopeState, setEnvelopeState] = useState<EnvelopeState>("sealed");
  const [isBlooming, setIsBlooming] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestsCount, setGuestsCount] = useState(1);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    "sangeet",
    "carnival",
    "sehra",
    "reception",
    "afterparty"
  ]);
  const [advice, setAdvice] = useState("");

  // Validation States
  const [errors, setErrors] = useState<{ name?: string; phone?: string; attending?: string }>({});

  const handleBloom = () => {
    setIsBlooming(true);
    setTimeout(() => {
      setEnvelopeState("open");
    }, 600); // Go straight to open form card!
  };

  const handleIncrement = () => {
    if (guestsCount < 10) setGuestsCount(guestsCount + 1);
  };

  const handleDecrement = () => {
    if (guestsCount > 1) setGuestsCount(guestsCount - 1);
  };

  const handleToggleEvent = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter((id) => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    const newErrors: { name?: string; phone?: string; attending?: string } = {};
    if (!name.trim()) newErrors.name = "Please enter your name";
    if (!phone.trim()) newErrors.phone = "Please enter your phone number";
    if (attending === null) newErrors.attending = "Please select your attendance";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setEnvelopeState("folding");

    // Scroll to center the RSVP section in the viewport to avoid jumping to the footer
    const section = sectionRef.current;
    if (section) {
      const lenis = (window as any).lenis;
      const rect = section.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top;
      if (lenis) {
        lenis.scrollTo(scrollTop, { duration: 0.8 });
      } else {
        window.scrollTo({ top: scrollTop, behavior: "smooth" });
      }
    }

    // Let the envelope seal close, wax seal stamp down, and fly away
    setTimeout(() => {
      setEnvelopeState("sent");
    }, 1300);
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#FAF4EF] relative py-20 px-6 border-t border-[#A36662]/5 overflow-hidden flex flex-col items-center justify-center min-h-screen">


      {/* Heading Block */}
      <ParallaxHeader
        category="Guest Registry"
        title="RSVP"
        backgroundText="INVITATION"
        titleClassName="font-distrela"
        className="pb-6 px-6 z-30"
      />

      <div className="w-full max-w-[340px] sm:max-w-[380px] md:max-w-[400px] flex justify-center z-10 min-h-[620px] relative">
        <AnimatePresence mode="wait">

          {/* State 1: SEALED ENVELOPE */}
          {envelopeState === "sealed" && (
            <motion.div
              key="sealed"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full bg-[#FDFAF7] border border-[#A36662]/15 rounded-[32px] p-6 flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(163,102,98,0.18)] hover:shadow-[0_35px_70px_rgba(163,102,98,0.26)] transition-shadow duration-300 relative aspect-[9/16]"
            >
              {/* Background Texture Image Layer */}
              <div className="absolute inset-0 w-full h-full rounded-[32px] overflow-hidden pointer-events-none z-0">
                <Image
                  src="/RSVP images/rsvp-3.png"
                  alt="Envelope Background Texture"
                  fill
                  className="object-cover opacity-[100%] mix-blend-multiply "
                  sizes="(max-w-md) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-[#FDFAF7]/20 rounded-[32px]" />
              </div>

              {/* Outer double borders */}
              <div className="absolute inset-3 border border-[#D4AF37]/20 rounded-[26px] pointer-events-none" />
              <div className="absolute inset-4 border border-dashed border-[#D4AF37]/15 rounded-[24px] pointer-events-none" />

              {/* Envelope flaps vector simulation */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#A36662]/5 to-transparent clip-path-flap pointer-events-none rounded-[32px]" />

              {/* Text & Medallion Latch Wrapper shifted higher */}
              <div className="flex flex-col items-center justify-center -translate-y-12 z-20 w-full relative">
                <span className="font-cormorant italic font-bold text-[#8F5E52] mb-6 tracking-wide select-none">
                  Click Medallion to Bloom & RSVP
                </span>

                {/* Lotus Medallion Latch */}
                <LotusMedallion isBlooming={isBlooming} onClick={handleBloom} />
              </div>


            </motion.div>
          )}

          {/* State 3: GUEST LEDGER CARD (Open Envelope) */}
          {envelopeState === "open" && (
            <motion.div
              key="open-ledger"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-[#FDFAF7] border border-[#A36662]/15 rounded-[32px] p-4 sm:p-5 shadow-[0_25px_60px_rgba(163,102,98,0.2)] relative"
            >
              {/* Background Texture Image Layer */}
              <div className="absolute inset-0 w-full h-full rounded-[32px] overflow-hidden pointer-events-none z-0">
                <Image
                  src="/RSVP images/rsvp-3.png"
                  alt="RSVP Background Texture"
                  fill
                  className="object-cover opacity-[100%] mix-blend-multiply"
                  sizes="(max-w-md) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-[#FDFAF7]/20" />
              </div>

              {/* Card frames */}
              <div className="absolute inset-3 border border-[#D4AF37]/20 rounded-[26px] pointer-events-none" />
              <div className="absolute inset-4 border border-dashed border-[#D4AF37]/15 rounded-[24px] pointer-events-none" />

              <form onSubmit={handleSubmit} className="w-full flex flex-col relative z-10 bg-white/80 backdrop-blur-[2px] p-5 sm:p-6 rounded-[24px] border border-[#A36662]/10 shadow-sm">

                {/* 1. Details */}
                <div className="w-full flex flex-col gap-4 border-b border-[#A36662]/10 pb-5 mb-5">
                  <h3 className="font-cormorant text-base sm:text-lg text-[#7A1C2C] tracking-wide uppercase select-none">
                    1. Your Details
                  </h3>

                  {/* Name field */}
                  <div className="flex flex-col">
                    <label className="font-sans text-[0.6rem] uppercase tracking-wider text-[#A36662] font-bold mb-0.5 select-none">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter guest name"
                      className="bg-transparent border-b border-[#A36662]/20 focus:border-[#7A1C2C] focus:outline-none py-1 font-cormorant text-base sm:text-lg text-[#2c2a29]"
                    />
                    {errors.name && (
                      <span className="text-[0.6rem] text-red-500 font-bold mt-1">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col">
                    <label className="font-sans text-[0.6rem] uppercase tracking-wider text-[#A36662] font-bold mb-0.5 select-none">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="bg-transparent border-b border-[#A36662]/20 focus:border-[#7A1C2C] focus:outline-none py-1 font-cormorant text-base sm:text-lg text-[#2c2a29]"
                    />
                    {errors.phone && (
                      <span className="text-[0.6rem] text-red-500 font-bold mt-1">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Attendance Selection */}
                <div className="w-full flex flex-col gap-3 border-b border-[#A36662]/10 pb-5 mb-5">
                  <h3 className="font-cormorant text-base sm:text-lg text-[#7A1C2C] tracking-wide uppercase select-none">
                    2. Will you join us?
                  </h3>

                  <div className="grid grid-cols-2 gap-3.5 mt-0.5">
                    <button
                      type="button"
                      onClick={() => setAttending(true)}
                      className={`py-3 rounded-xl border font-cormorant font-bold text-base transition-all duration-300 ${attending === true
                        ? "bg-[#7A1C2C] text-white border-[#7A1C2C] shadow-sm"
                        : "bg-[#FAF4EF]/45 text-[#8F5E52] border-[#A36662]/15 hover:border-[#7A1C2C]"
                        }`}
                    >
                      Yes, I will!
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttending(false)}
                      className={`py-3 rounded-xl border font-cormorant font-bold text-base transition-all duration-300 ${attending === false
                        ? "bg-[#7A1C2C] text-white border-[#7A1C2C] shadow-sm"
                        : "bg-[#FAF4EF]/45 text-[#8F5E52] border-[#A36662]/15 hover:border-[#7A1C2C]"
                        }`}
                    >
                      No, regretfully
                    </button>
                  </div>
                  {errors.attending && (
                    <span className="text-[0.6rem] text-red-500 font-bold mt-1 text-center">
                      {errors.attending}
                    </span>
                  )}
                </div>

                {/* 3. Stepper & Checklist (Accordion Roll-down) */}
                <motion.div
                  initial={false}
                  animate={{
                    height: attending === true ? "auto" : 0,
                    opacity: attending === true ? 1 : 0
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full overflow-hidden"
                >
                  <div className="w-full flex flex-col gap-5 border-b border-[#A36662]/10 pb-5 mb-5">

                    {/* Stepper Count */}
                    <div className="flex flex-col items-center">
                      <h3 className="font-cormorant text-base sm:text-lg text-[#7A1C2C] tracking-wide uppercase select-none mb-1 self-start">
                        3. Attending Guests
                      </h3>

                      {/* Stepper Control */}
                      <div className="flex items-center gap-5 bg-[#FAF4EF] border border-[#A36662]/20 px-4 py-2 rounded-xl mt-1.5">
                        <button
                          type="button"
                          onClick={handleDecrement}
                          className="w-7 h-7 rounded-full border border-[#A36662]/20 hover:border-[#7A1C2C] text-[#7A1C2C] font-sans font-bold flex items-center justify-center bg-white active:scale-90 transition-transform select-none"
                        >
                          -
                        </button>
                        <span className="font-cormorant font-bold text-lg text-[#7A1C2C] w-6 text-center select-none">
                          {guestsCount}
                        </span>
                        <button
                          type="button"
                          onClick={handleIncrement}
                          className="w-7 h-7 rounded-full border border-[#A36662]/20 hover:border-[#7A1C2C] text-[#7A1C2C] font-sans font-bold flex items-center justify-center bg-white active:scale-90 transition-transform select-none"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Checkbox Checklist */}
                    <div className="flex flex-col">
                      <h3 className="font-cormorant text-base sm:text-lg text-[#7A1C2C] tracking-wide uppercase select-none mb-2">
                        4. Events Attending
                      </h3>

                      <div className="flex flex-col gap-2.5 w-full">
                        {([
                          { id: "sangeet", name: "Sangeet Night" },
                          { id: "carnival", name: "Vibrant Carnival" },
                          { id: "sehra", name: "Sehra Bandi" },
                          { id: "reception", name: "Grand Reception" },
                          { id: "afterparty", name: "The After Party" }
                        ] as const).map((evt) => {
                          const isSelected = selectedEvents.includes(evt.id);
                          return (
                            <button
                              key={evt.id}
                              type="button"
                              onClick={() => handleToggleEvent(evt.id)}
                              className={`py-2.5 px-4 rounded-xl border font-cormorant font-bold text-sm text-left flex items-center justify-between transition-all duration-300 ${isSelected
                                ? "bg-[#7A1C2C]/5 text-[#7A1C2C] border-[#7A1C2C]"
                                : "bg-[#FAF4EF]/35 text-[#8F5E52] border-[#A36662]/15 hover:border-[#7A1C2C]"
                                }`}
                            >
                              <span>{evt.name}</span>
                              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? "bg-[#7A1C2C] border-[#7A1C2C]" : "border-[#A36662]/30 bg-white"
                                }`}>
                                {isSelected && (
                                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </motion.div>

                {/* 4. Advice */}
                <div className="w-full flex flex-col gap-2 mb-6">
                  <h3 className="font-cormorant text-base sm:text-lg text-[#7A1C2C] tracking-wide uppercase select-none">
                    {attending === true ? "5. Wishes & Advice" : "3. Wishes & Advice"}
                  </h3>
                  <textarea
                    value={advice}
                    onChange={(e) => setAdvice(e.target.value)}
                    rows={3}
                    placeholder="Write a piece of advice or wish for the couple..."
                    className="bg-transparent border border-[#A36662]/20 focus:border-[#7A1C2C] focus:outline-none p-3 rounded-xl font-cormorant text-base text-[#2c2a29] leading-relaxed resize-none mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7A1C2C] to-[#A36662] hover:from-[#601220] hover:to-[#ba7a76] text-white font-sans text-xs font-bold uppercase tracking-[0.25em] shadow-md transition-all duration-300 transform active:scale-98 select-none"
                >
                  Send RSVP
                </button>

              </form>
            </motion.div>
          )}

          {envelopeState === "folding" && (
            <motion.div
              key="folding"
              initial={{ scale: 1.02 }}
              animate={{ scale: 1 }}
              exit={{ y: -350, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full bg-[#FDFAF7] border border-[#A36662]/15 rounded-[32px] flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(163,102,98,0.18)] relative aspect-[9/16]"
            >
              {/* Background Texture Image Layer */}
              <div className="absolute inset-0 w-full h-full rounded-[32px] overflow-hidden pointer-events-none z-0">
                <Image
                  src="/RSVP images/rsvp-3.png"
                  alt="Envelope Background Texture"
                  fill
                  className="object-cover opacity-[100%] mix-blend-multiply"
                  sizes="(max-w-md) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-[#FDFAF7]/20" />
              </div>

              <div className="absolute inset-3 border border-[#D4AF37]/20 rounded-[26px] pointer-events-none" />
              <div className="absolute inset-4 border border-dashed border-[#D4AF37]/15 rounded-[24px] pointer-events-none" />

              {/* Envelope flap closing */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#A36662]/10 to-transparent clip-path-flap" />

              {/* Wax seal stamps back down with spring scale squash */}
              <motion.div
                initial={{ scale: 2.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] border-[3px] border-[#AA7C11] flex flex-col items-center justify-center shadow-md"
              >
                <span className="font-distrela text-2xl text-[#7A1C2C] font-black select-none">
                  M & A
                </span>
              </motion.div>
            </motion.div>
          )}

          {/* State 5: SENT THANK YOU NOTE */}
          {envelopeState === "sent" && (
            <motion.div
              key="sent-thankyou"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full bg-[#FDFAF7] border border-[#A36662]/15 rounded-[32px] p-4 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(163,102,98,0.18)] relative aspect-[9/16]"
            >
              {/* Background Texture Image Layer */}
              <div className="absolute inset-0 w-full h-full rounded-[32px] overflow-hidden pointer-events-none z-0">
                <Image
                  src="/RSVP images/rsvp-3.png"
                  alt="Thank You Background Texture"
                  fill
                  className="object-cover opacity-[100%] mix-blend-multiply"
                  sizes="(max-w-md) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-[#FDFAF7]/20" />
              </div>

              <div className="absolute inset-3 border border-[#D4AF37]/20 rounded-[26px] pointer-events-none" />
              <div className="absolute inset-4 border border-dashed border-[#D4AF37]/15 rounded-[24px] pointer-events-none" />

              {/* Vellum Thank You Overlay */}
              <div className="relative z-10 bg-white/80 backdrop-blur-[2px] p-6 rounded-[24px] border border-[#A36662]/10 shadow-sm flex flex-col items-center max-w-[280px]">
                {/* Gold Star Icon */}
                <div className="mb-4 flex justify-center select-none">
                  <svg className="w-8 h-8 text-[#D4AF37] fill-[#D4AF37]" viewBox="0 0 24 24">
                    <path d="M12 2l2.4 7.2L21.6 12 14.4 14.4 12 21.6 9.6 14.4 2.4 12 9.6 9.6z" />
                  </svg>
                </div>

                {/* Thank you message */}
                <h3 className="font-distrela text-2xl text-[#7A1C2C] font-bold tracking-wide">
                  Thank You!
                </h3>

                <p className="font-cormorant italic text-base text-[#8F5E52] leading-relaxed max-w-xs mt-3 select-none">
                  Thank you for your response! We can't wait to celebrate.
                </p>

                <div className="w-8 bg-[#A36662]/15 h-px my-4" />

                <span className="font-sans text-[0.55rem] uppercase tracking-[0.25em] text-[#A36662] font-bold select-none">
                  Warmest Regards,
                </span>
                <span className="font-cormorant font-bold text-sm text-[#7A1C2C] mt-0.5 select-none">
                  Meenal & Avinash
                </span>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
