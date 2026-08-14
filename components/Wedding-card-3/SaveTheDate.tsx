"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WineGlassSVG from "./WineGlassSVG";

// Register Plugins
gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

export default function SaveTheDate() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const scroller = containerRef.current.closest("#card-scroll-container");
        if (!scroller) return;

        // 1. Setup starting states for mask paths (hiding them)
        const maskPaths = [
            ".mask-glass-rim-left",
            ".mask-glass-rim-right",
            ".mask-glass-liquid-surface",
            ".mask-glass-stem",
            ".mask-glass-base-left",
            ".mask-glass-base-right",
            ".mask-pick-line",
            ".mask-olive-1",
            ".mask-olive-2",
            ".mask-olive-3",
            ".mask-bow-knot",
            ".mask-bow-left-loop",
            ".mask-bow-right-loop",
            ".mask-bow-left-tail",
            ".mask-bow-right-tail"
        ];
        gsap.set(maskPaths, { drawSVG: "0%" });

        // 2. Setup Underline flourish starting state
        gsap.set(".underline-flourish", { drawSVG: "0%" });

        // 3. Set starting states for text elements (fade + y-slide)
        gsap.set([".std-title", ".std-names", ".std-date", ".std-footnote"], {
            opacity: 0,
            y: 12,
            force3D: true
        });

        // 4. Create unified timeline bound to ScrollTrigger
        const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
                trigger: containerRef.current,
                scroller,
                start: "top 90%", // Trigger when section top enters 90% down the screen
                toggleActions: "play none none none"
            }
        });

        // Glass Outline Sequence
        tl.to([".mask-glass-rim-left", ".mask-glass-rim-right", ".mask-glass-liquid-surface"], { drawSVG: "100%", duration: 1.3 }, 0.2);
        tl.to(".mask-glass-stem", { drawSVG: "100%", duration: 0.6 }, 1.1);
        tl.to([".mask-glass-base-left", ".mask-glass-base-right"], { drawSVG: "100%", duration: 0.6 }, 1.4);

        // Pick & Olives Sequence
        tl.to(".mask-pick-line", { drawSVG: "100%", duration: 0.6 }, 1.4);
        tl.to(".mask-olive-1", { drawSVG: "100%", duration: 0.4 }, 1.8);
        tl.to(".mask-olive-2", { drawSVG: "100%", duration: 0.4 }, 1.9);
        tl.to(".mask-olive-3", { drawSVG: "100%", duration: 0.4 }, 2.0);

        // Ribbon Bow Sequence
        tl.to(".mask-bow-knot", { drawSVG: "100%", duration: 0.4 }, 2.0);
        tl.to(".mask-bow-left-loop", { drawSVG: "100%", duration: 0.6 }, 2.2);
        tl.to(".mask-bow-right-loop", { drawSVG: "100%", duration: 0.6 }, 2.4);
        tl.to(".mask-bow-left-tail", { drawSVG: "100%", duration: 0.5 }, 2.6);
        tl.to(".mask-bow-right-tail", { drawSVG: "100%", duration: 0.5 }, 2.8);

        // Typography Sequence (starts shortly after bow begins drawing)
        tl.to(".std-title", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", force3D: true }, 2.6);
        tl.to(".std-names", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", force3D: true }, 2.9);
        tl.to(".underline-flourish", { drawSVG: "100%", duration: 0.6, force3D: true }, 3.3);
        tl.to(".std-date", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", force3D: true }, 3.5);
        tl.to(".std-footnote", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", force3D: true }, 3.8);

        // Force a layout calculation refresh for ScrollTrigger
        ScrollTrigger.refresh();
        const t = setTimeout(() => ScrollTrigger.refresh(), 800);
        return () => clearTimeout(t);
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
                    className="std-names text-[8cqi] font-normal leading-tight select-none my-2 mt-10"
                    style={{ fontFamily: "var(--font-anastasia), var(--font-script), cursive" }}
                >
                    Vivek <span className="text-[#B77B69] text-[5cqi] px-2">weds</span>  Khushi
                </h3>

                {/* 3. Decorative Underline Flourish */}
                <div className="relative h-2 w-[70cqi] flex items-center justify-center mb-4">
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
                <div className="std-date flex items-center justify-center gap-3 text-[9cqi] font-serif font-normal tracking-wider mb-8 mt-8">
                    <span>13</span>
                    <span className="text-[#9D2C2D]/40 font-light">|</span>
                    <span>DEC</span>
                    <span className="text-[#9D2C2D]/40 font-light">|</span>
                    <span>2026</span>
                </div>

                {/* 5. Disclaimer Footnote (Smallest uppercase serif, wide spacing) */}
                <p className="std-footnote text-[2.6cqi] tracking-[0.25em] uppercase opacity-80 font-serif leading-none mt-auto mb-[6%]">
                    FORMAL INVITATION TO FOLLOW
                </p>
            </div>
        </section>
    );
}
