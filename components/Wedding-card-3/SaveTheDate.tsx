"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import WineGlassSVG from "./WineGlassSVG";

export default function SaveTheDate() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // 1. Setup Underline flourish starting state
        const flourishPath = containerRef.current.querySelector(".underline-flourish");
        if (flourishPath instanceof SVGPathElement) {
            const length = flourishPath.getTotalLength();
            gsap.set(flourishPath, {
                strokeDasharray: length,
                strokeDashoffset: length
            });
        }

        // 2. Set starting states for illustration & text elements (fade + scale/y-slide)
        gsap.set(".std-illustration", {
            opacity: 0,
            scale: 0.9,
            y: 15
        });
        gsap.set([".std-title", ".std-names", ".std-date", ".std-footnote"], {
            opacity: 0,
            y: 12
        });

        // 3. Create unified timeline
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" }
        });

        // Illustration entrance (fade and scale up)
        tl.to(".std-illustration", {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.4,
            ease: "power4.out"
        }, 0.2);

        // Typography Sequence
        tl.to(".std-title", { opacity: 1, y: 0, duration: 0.8 }, 0.8);
        tl.to(".std-names", { opacity: 1, y: 0, duration: 0.8 }, 1.1);
        tl.to(".underline-flourish", { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" }, 1.4);
        tl.to(".std-date", { opacity: 1, y: 0, duration: 0.6 }, 1.6);
        tl.to(".std-footnote", { opacity: 1, y: 0, duration: 0.8 }, 1.9);

    }, { scope: containerRef });

    return (
        <section 
            ref={containerRef}
            className="@container relative flex h-screen w-full flex-shrink-0 flex-col items-center justify-between p-8 bg-[#FCEDEC] text-[#9D2C2D] overflow-hidden select-none z-10"
        >
            {/* Background Frame Lines for Printed Card Aesthetic */}
            <div className="absolute inset-x-[4%] inset-y-[3%] border border-[#9D2C2D]/20 z-10 pointer-events-none" />
            <div className="absolute inset-x-[5.2%] inset-y-[4%] border border-[#9D2C2D]/15 z-10 pointer-events-none" />

            {/* Top 55-60%: Illustration Container */}
            <div className="std-illustration relative w-full h-[55%] flex items-center justify-center z-20 mt-[3%]">
                <WineGlassSVG className="w-auto h-full max-h-[90%] aspect-[297/419]" />
            </div>

            {/* Bottom 40-45%: Typography Block */}
            <div className="relative w-full h-[45%] flex flex-col items-center justify-start z-20 px-4 mt-2">
                {/* 1. SAVE THE DATE (Serif display, wide letter-spacing, uppercase) */}
                <h2 className="std-title text-[6.5cqi] font-normal tracking-[0.25em] uppercase mb-1 leading-none font-serif select-none">
                    SAVE THE DATE
                </h2>

                {/* 2. Names: Lars & Rosa (Elegant cursive/script) */}
                <h3 
                    className="std-names text-[11cqi] font-normal leading-tight select-none my-1"
                    style={{ fontFamily: "var(--font-anastasia), var(--font-script), cursive" }}
                >
                    Lars & Rosa
                </h3>

                {/* 3. Decorative Underline Flourish */}
                <div className="relative h-4 w-[35cqi] flex items-center justify-center mb-4">
                    <svg viewBox="0 0 100 10" className="w-full h-full text-[#9D2C2D] opacity-80" preserveAspectRatio="none">
                        <path
                            className="underline-flourish"
                            d="M 5,5 Q 50,1 95,5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* 4. Date details (Compact serif with pipes) */}
                <div className="std-date flex items-center justify-center gap-3 text-[4.8cqi] font-serif font-normal tracking-wider mb-8">
                    <span>05</span>
                    <span className="text-[#9D2C2D]/40 font-light">|</span>
                    <span>13</span>
                    <span className="text-[#9D2C2D]/40 font-light">|</span>
                    <span>24</span>
                </div>

                {/* 5. Disclaimer Footnote (Smallest uppercase serif, wide spacing) */}
                <p className="std-footnote text-[2.6cqi] tracking-[0.25em] uppercase opacity-80 font-serif leading-none mt-auto mb-[6%]">
                    FORMAL INVITATION TO FOLLOW
                </p>
            </div>
        </section>
    );
}
