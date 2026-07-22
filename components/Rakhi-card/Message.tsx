"use client";

import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const MESSAGE_TEXT = "Growing up with you has been one of life's greatest blessings. You've been my guide, my partner in every adventure, and my greatest strength. Happy Raksha Bandhan to the sister who makes every moment brighter.";

export default function Message() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section
            id="rakhi-message-section"
            ref={containerRef}
            className="relative z-20 w-full h-[100vh] py-20 px-6 flex items-center justify-center"
            style={{ background: "#FFF8F0" }}
        >
            <div className="w-full max-w-[430px] mx-auto text-center px-4">
                {/* Premium Calligraphy Headline Divider */}
                <div className="flex justify-center items-center gap-2 mb-8 opacity-45 select-none" aria-hidden="true">
                    <div className="w-10 h-[1px] bg-amber-800" />
                    <span className="text-amber-800 text-md font-semibold tracking-widest uppercase relative scroll-animate-text">
                        A <span id="butterfly-message-anchor" className="relative inline-block">Message</span> For You
                    </span>
                    <div className="w-10 h-[1px] bg-amber-800" />
                </div>

                {/* Scroll-revealed Message Text */}
                <ScrollReveal
                    containerClassName="justify-center text-center leading-[3rem] tracking-wide"
                    textClassName="select-none font-normal"
                    style={{
                        fontFamily: "var(--font-script, 'Great Vibes', cursive)",
                        color: "#7A1F3D",
                        fontSize: "1.6rem",
                    }}
                    scrollStart="top bottom-=20%"
                    scrollEnd="bottom center+=25%"
                    enableBlur={false}
                    baseOpacity={0.05}
                    stagger={0.06}
                >
                    {MESSAGE_TEXT}
                </ScrollReveal>

                {/* Sibling icon at the end */}
                <div className="mt-8 text-amber-700/60 text-lg select-none" aria-hidden="true">
                    🌸 🍂 🌸
                </div>
            </div>
        </section>
    );
}
