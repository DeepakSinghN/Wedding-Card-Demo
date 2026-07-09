"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelImage } from "@/components/ui/pixel-image";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
    const sectionRef = useRef<HTMLElement>(null);

    // ── Spawn Magical Falling Stars ──────────────────────────────────────────
    useGSAP(() => {
        if (!sectionRef.current) return;

        const spawnFallingStars = () => {
            if (!sectionRef.current) return;
            const container = sectionRef.current;
            const width = container.clientWidth;
            const height = container.clientHeight;

            const starChars = ["✦", "✵", "★", "•"];
            const starColors = ["#FBBF24", "#F5A623", "#FFFDF5", "#FFE4E4"];

            const fragment = document.createDocumentFragment();

            // Spawn 12 magical star particles (optimized from 28 to reduce DOM/CPU load)
            for (let i = 0; i < 12; i++) {
                const star = document.createElement("div");
                star.className = "absolute pointer-events-none select-none z-30 font-serif";
                star.style.willChange = "transform, opacity";

                // Random characters and color palettes
                star.innerHTML = starChars[Math.floor(Math.random() * starChars.length)];
                star.style.color = starColors[Math.floor(Math.random() * starColors.length)];

                // Random size range (10px to 24px)
                const size = Math.random() * 14 + 10;
                star.style.fontSize = `${size}px`;

                // Random horizontal positioning and starting offset above container
                const startX = Math.random() * width;
                const startY = -40 - Math.random() * 60;

                star.style.left = `${startX}px`;
                star.style.top = `${startY}px`;

                fragment.appendChild(star);

                // Staggered fall timings (1.5s to 3.0s duration with up to 1.5s delay range)
                const duration = Math.random() * 1.5 + 1.5;
                const delay = Math.random() * 1.2;

                // Combined GSAP timeline to minimize parallel animations overhead
                const starTl = gsap.timeline({
                    delay: delay,
                    onComplete: () => {
                        star.remove();
                    }
                });

                starTl.fromTo(star,
                    {
                        y: 0,
                        opacity: 0,
                        scale: Math.random() * 0.4 + 0.6,
                        rotation: 0,
                    },
                    {
                        y: height + 100,
                        rotation: Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1),
                        scale: Math.random() * 0.5 + 0.3,
                        duration: duration,
                        ease: "sine.in",
                    },
                    0
                );

                // Parallel fade in and out curves on same timeline
                starTl.to(star, { opacity: 0.95, duration: 0.4, ease: "power1.out" }, 0);
                starTl.to(star, { opacity: 0, duration: 0.4, ease: "power1.in" }, duration - 0.4);
            }

            container.appendChild(fragment);
        };

        // Trigger star shower when user lands in the section (with 1 second delay)
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 80%",
            onEnter: () => {
                setTimeout(() => {
                    spawnFallingStars();
                }, 1000);
            },
        });
    }, { scope: sectionRef, dependencies: [] });

    return (
        <section
            ref={sectionRef}
            id="rakhi-next-section"
            className="relative z-20 w-full min-h-[100vh] flex flex-col items-center justify-center py-16 px-6 pb-[15vh] shadow-[0_-20px_50px_rgba(0,0,0,0.15)]"
            style={{
                background: "#FFF8F0",
                borderTopLeftRadius: "300px",
                borderTopRightRadius: "300px",
                overflow: "hidden",
                transform: "translateZ(0)", // Force GPU layer promotion to prevent rounded-overflow clipping lag
                willChange: "transform",
            }}
        >
            <div className="w-full max-w-[430px] mx-auto flex flex-col items-center relative z-10">
                {/* Top small header */}
                <p
                    className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 scroll-animate-text"
                    style={{
                        fontFamily: "var(--font-body, Poppins, sans-serif)",
                        color: "#6B7280",
                    }}
                >
                    WISHING YOU A
                </p>

                {/* Divider thread line: left and right, space in middle for butterfly */}
                <div className="flex items-center justify-between w-full px-4 gap-2 ">
                    <div className="flex-1 h-[12px] relative">
                        <Image
                            src="/Rakhi-card-media/red-line.png"
                            alt="Decorative thread"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Butterfly start target anchor */}
                    <div
                        id="butterfly-story-anchor"
                        className="w-16 h-16 relative flex items-center justify-center flex-shrink-0"
                    >
                        {/* The global butterfly will sit here in Story section */}
                    </div>

                    <div className="flex-1 h-[12px] relative scale-x-[-1]">
                        <Image
                            src="/Rakhi-card-media/red-line.png"
                            alt="Decorative thread flipped"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Photo Container with Hand-Drawn Frame */}
                <div className="relative w-[300px] h-[400px] flex items-center justify-center mt-6">
                    {/* Sibling photo placed inside/behind the frame */}
                    <div className="absolute w-[75%] h-[83%] overflow-hidden rounded-[16px] top-[6%] left-[12%] z-2">
                        <PixelImage
                            src="/Rakhi-card-media/photo-3.jpg"
                            grid="8x8"
                            grayscaleAnimation={true}
                            className="w-full h-full"
                            imageClassName="rounded-[16px]"
                        />
                    </div>

                    {/* Polaroid Frame Overlay */}
                    <div className="absolute inset-0 pointer-events-none z-10">
                        <Image
                            src="/Rakhi-card-media/Story-frame.png"
                            alt="Story Frame"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Cursive Handwriting Coda */}
                <h2
                    className="Rakhi-wish text-4xl mt-6 select-none overflow-hidden scroll-animate-text"
                    style={{
                        fontFamily: "var(--font-script, 'Great Vibes', cursive)",
                        color: "var(--rakhi-maroon)",
                    }}
                >
                    Happy Rakshabandhan
                </h2>
            </div>
        </section>
    );
}
