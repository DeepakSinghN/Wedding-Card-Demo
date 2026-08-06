"use client";

import { motion } from "framer-motion";
import WineGlassSVG from "./WineGlassSVG";

export default function SaveTheDate() {
    return (
        <section className="@container relative flex h-screen w-full flex-shrink-0 flex-col items-center justify-between p-8 bg-[#FCEDEC] text-[#9D2C2D] overflow-hidden select-none z-10">
            {/* Background Frame Lines for Printed Card Aesthetic */}
            <div className="absolute inset-x-[6%] inset-y-[5%] border border-[#9D2C2D]/20 z-10 pointer-events-none" />
            <div className="absolute inset-x-[7.5%] inset-y-[6%] border border-[#9D2C2D]/15 z-10 pointer-events-none" />

            {/* Top 55-60%: Illustration Container */}
            <div className="relative w-full h-[55%] flex items-center justify-center z-20 mt-[3%]">
                <WineGlassSVG className="w-auto h-full max-h-[90%] aspect-[297/419]" />
            </div>

            {/* Bottom 40-45%: Typography Block */}
            <div className="relative w-full h-[45%] flex flex-col items-center justify-start z-20 px-4 mt-2">
                {/* 1. SAVE THE DATE (Serif display, wide letter-spacing, uppercase) */}
                <motion.h2
                    className="text-[6.5cqi] font-normal tracking-[0.25em] uppercase mb-1 leading-none font-serif select-none"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
                >
                    SAVE THE DATE
                </motion.h2>

                {/* 2. Names: Lars & Rosa (Elegant cursive/script) */}
                <motion.h3
                    className="text-[11cqi] font-normal leading-tight select-none my-1"
                    style={{ fontFamily: "var(--font-anastasia), var(--font-script), cursive" }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.8 }}
                >
                    Lars & Rosa
                </motion.h3>

                {/* 3. Decorative Underline Flourish */}
                <div className="relative h-4 w-[35cqi] flex items-center justify-center mb-4">
                    <svg viewBox="0 0 100 10" className="w-full h-full text-[#9D2C2D] opacity-80" preserveAspectRatio="none">
                        <motion.path
                            d="M 5,5 Q 50,1 95,5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.6, ease: "easeInOut", delay: 2.2 }}
                        />
                    </svg>
                </div>

                {/* 4. Date details (Compact serif with pipes) */}
                <motion.div
                    className="flex items-center justify-center gap-3 text-[4.8cqi] font-serif font-normal tracking-wider mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 2.4 }}
                >
                    <span>05</span>
                    <span className="text-[#9D2C2D]/40 font-light">|</span>
                    <span>13</span>
                    <span className="text-[#9D2C2D]/40 font-light">|</span>
                    <span>24</span>
                </motion.div>

                {/* 5. Disclaimer Footnote (Smallest uppercase serif, wide spacing) */}
                <motion.p
                    className="text-[2.6cqi] tracking-[0.25em] uppercase opacity-80 font-serif leading-none mt-auto mb-[6%]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 2.7 }}
                >
                    FORMAL INVITATION TO FOLLOW
                </motion.p>
            </div>
        </section>
    );
}
