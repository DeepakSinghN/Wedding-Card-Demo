"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="w-full bg-[#590A2E] relative py-16 px-6 overflow-hidden flex flex-col items-center justify-center border-t border-[#A36662]/10 z-30 select-none min-h-screen">
      {/* Subtle gold dotted border on the top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      {/* Decorative floral elements floating in background (optional, simple glow instead) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#7A1C2C]/50 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[400px] mx-auto flex flex-col items-center text-center gap-6 relative z-10"
      >
        {/* Romantic Quotes */}
        <div className="flex flex-col gap-2 max-w-[320px] mx-auto pb-2 select-none">
          <p className="font-serif italic text-xs sm:text-sm text-[#fff8e7]/85 tracking-wide leading-relaxed" style={{ fontFamily: "var(--font-display), serif" }}>
            "Two lives, two hearts, joined together in friendship, united forever in love."
          </p>
          <p className="font-serif italic text-[0.65rem] sm:text-xs text-[#fff8e7]/60 tracking-wide leading-relaxed mt-0.5" style={{ fontFamily: "var(--font-display), serif" }}>
            We look forward to celebrating this beautiful beginning of our forever with you.
          </p>
        </div>

        {/* Detailed Parent Names */}
        <div className="grid grid-cols-2 gap-4 w-full border-t border-b border-white/10 py-5 my-2">
          <div className="flex flex-col text-center">
            <span className="font-sans text-[0.55rem] sm:text-[0.6rem] uppercase tracking-wider text-[#D4AF37] font-bold" style={{ fontFamily: "var(--font-arimo), sans-serif" }}>
              Groom's Parents
            </span>
            <span className="font-serif italic text-[0.75rem] sm:text-sm text-white/90 mt-1.5 leading-relaxed" style={{ fontFamily: "var(--font-display), serif" }}>
              Shri Ramesh Sen
              <br />
              & Smt Savita Sen
            </span>
          </div>

          <div className="flex flex-col text-center">
            <span className="font-sans text-[0.55rem] sm:text-[0.6rem] uppercase tracking-wider text-[#D4AF37] font-bold" style={{ fontFamily: "var(--font-arimo), sans-serif" }}>
              Bride's Parents
            </span>
            <span className="font-serif italic text-[0.75rem] sm:text-sm text-white/90 mt-1.5 leading-relaxed" style={{ fontFamily: "var(--font-display), serif" }}>
              Shri Harish Joshi
              <br />
              & Smt Kamla Joshi
            </span>
          </div>
        </div>

        {/* Regards block */}
        <div className="flex flex-col items-center mt-1">
          <span className="font-sans text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.25em] text-[#D4AF37] font-bold" style={{ fontFamily: "var(--font-arimo), sans-serif" }}>
            With Warm Regards,
          </span>
          <p className="font-serif italic text-sm sm:text-base text-white/90 mt-2.5 leading-relaxed" style={{ fontFamily: "var(--font-display), serif" }}>
            The Families of Deepak & Amrita
          </p>
        </div>

        {/* Couple Giant Signature Header */}
        <h2 className="font-alex-brush text-[3.2rem] sm:text-[3.8rem] text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#fff8e7] to-[#AA7C11] font-bold tracking-wider leading-none mt-2 py-1" style={{ fontFamily: "var(--font-alex-brush), cursive" }}>
          Deepak & Amrita
        </h2>

        {/* Interactive CTA Link */}
        <div className="flex flex-col items-center mt-2">
          <span className="font-sans text-[0.55rem] uppercase tracking-[0.2em] text-[#fff8e7]/55 font-bold mb-3" style={{ fontFamily: "var(--font-arimo), sans-serif" }}>
            Share the Love
          </span>
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] hover:from-[#fff8e7] hover:to-[#D4AF37] text-[#590A2E] font-sans text-[0.65rem] font-bold uppercase tracking-[0.15em] shadow-[0_6px_20px_rgba(212,175,55,0.15)] transition-all duration-300 flex items-center gap-2"
            style={{ fontFamily: "var(--font-arimo), sans-serif" }}
          >
            {/* Instagram Icon */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor" />
            </svg>
            Follow Our Journey
          </motion.a>
        </div>

        {/* Stamped Bottom Logo Copyright */}
        <span className="font-sans text-[0.55rem] uppercase tracking-[0.25em] text-white/40 mt-6 border-t border-[#A36662]/15 pt-6 w-full text-center" style={{ fontFamily: "var(--font-arimo), sans-serif" }}>
          Crafted with 💖 by HeyYouAreInvited
        </span>
      </motion.div>
    </footer>
  );
}
