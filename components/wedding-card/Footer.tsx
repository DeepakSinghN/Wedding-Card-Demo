"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full bg-[#733532] relative py-16 px-6 md:py-24 md:px-12 overflow-hidden flex flex-col items-center justify-center border-t border-[#A36662]/10 z-20 min-h-screen">
      {/* Subtle gold dotted border on the top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />



      <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-6 z-10 select-none">

        {/* Bollywood Romance Quotes */}
        <div className="flex flex-col gap-3">
          <p className="font-cormorant italic text-base md:text-[1.25rem] text-[#F3E5AB]/90 tracking-wide leading-relaxed">
            "Lights. Camera. Forever. Join us for the biggest premiere of our lives."
          </p>
          <p className="font-cormorant italic text-base md:text-[1.25rem] text-[#F3E5AB]/90 tracking-wide leading-relaxed">
            The best scenes of our story are yet to come, and we'd love you in the audience.
          </p>
        </div>

        {/* Regards block */}
        <div className="flex flex-col items-center mt-6">
          <span className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
            Warm Regards,
          </span>
          <p className="font-cormorant italic text-lg md:text-[1.35rem] text-white/95 mt-2.5 leading-none">
            Mrs Anjana and Mr Santosh Sahu and family
          </p>
        </div>

        {/* Couple Giant Signature Header */}
        <h2 className="font-distrela text-[clamp(2.5rem,5.5vw,5rem)] text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] font-bold tracking-wider leading-none mt-6 py-2">
          Meenal & Avinash
        </h2>

        {/* CTA Section */}
        <div className="flex flex-col items-center mt-8">
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[#F3E5AB]/70 font-semibold">
            Love This Design?
          </span>

          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="mt-4.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-[#733532] font-sans text-[0.7rem] font-bold uppercase tracking-[0.15em] shadow-[0_6px_20px_rgba(212,175,55,0.22)] transition-all duration-300 flex items-center gap-2.5"
          >
            {/* Instagram Icon */}
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor" />
            </svg>
            TO BUY, SIMPLY SEND US A DM
          </motion.a>
        </div>

        {/* Stamped Bottom Logo Copyright */}
        <span className="font-sans text-[0.55rem] uppercase tracking-[0.25em] text-[#F3E5AB]/45 mt-16 border-t border-[#D4AF37]/15 pt-6 w-full max-w-md">
          Crafted with 💖 by HeyYouAreInvited
        </span>

      </div>
    </footer>
  );
}
