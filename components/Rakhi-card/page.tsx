"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Rakhi-card/Hero";
import Story from "@/components/Rakhi-card/Story";
import Message from "@/components/Rakhi-card/Message";

// Lazy-load sections below the fold to optimize initial load, hydration speed, and critical path performance
const Scrapbook = dynamic(() => import("@/components/Rakhi-card/Scrapbook"), { ssr: false });
const ThenAndNow = dynamic(() => import("@/components/Rakhi-card/ThenAndNow"), { ssr: false });
const MemoryJar = dynamic(() => import("@/components/Rakhi-card/MemoryJar"), { ssr: false });
const DistanceMeter = dynamic(() => import("@/components/Rakhi-card/DistanceMeter"), { ssr: false });
const ReportCard = dynamic(() => import("@/components/Rakhi-card/ReportCard"), { ssr: false });
const LetterWriter = dynamic(() => import("@/components/Rakhi-card/LetterWriter"), { ssr: false });
const PromisesEnvelope = dynamic(() => import("@/components/Rakhi-card/PromisesEnvelope"), { ssr: false });
const ThankYou = dynamic(() => import("@/components/Rakhi-card/ThankYou"), { ssr: false });
const MemoryFilmstrip = dynamic(() => import("@/components/Rakhi-card/MemoryFilmstrip"), { ssr: false });

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/src/SplitText";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface ViewCoords {
    startCX: number;
    startCY: number;
    dx: number;
    dy: number;
}

export default function Page() {
    const [vc, setVc] = useState<ViewCoords | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // ── Measure coordinates relative to the parent <main> container ───────────
    useEffect(() => {
        const measure = () => {
            const startEl = document.getElementById("butterfly-story-anchor");
            const endEl = document.getElementById("butterfly-message-anchor");
            const mainEl = containerRef.current;
            if (!startEl || !endEl || !mainEl) return;

            const sR = startEl.getBoundingClientRect();
            const eR = endEl.getBoundingClientRect();
            const mR = mainEl.getBoundingClientRect();

            // Absolute offsets relative to the top-left of the <main> container:
            // (This makes it scroll-independent during coordinate measurement!)
            const startCX = sR.left - mR.left + sR.width / 2;
            const startCY = sR.top - mR.top + sR.height / 2;

            const endCX = eR.left - mR.left + eR.width / 2;
            const endCY = eR.top - mR.top + eR.height / 2;

            setVc({
                startCX,
                startCY,
                dx: endCX - startCX,
                dy: endCY - startCY,
            });
        };

        const t = setTimeout(measure, 300);
        document.fonts.ready.then(measure);
        
        let lastWidth = typeof window !== "undefined" ? window.innerWidth : 0;
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            if (typeof window !== "undefined" && window.innerWidth !== lastWidth) {
                lastWidth = window.innerWidth;
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(measure, 250);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(t);
            clearTimeout(resizeTimeout);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // ── Butterfly Scroll-Linked Animations ─────────────────────────────────────
    useGSAP(() => {
        if (!vc) return;

        const el = "#global-story-butterfly";

        // Set initial position and scale centered on the Story thread anchor
        gsap.set(el, {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            scale: 0.1,
            opacity: 0,
        });

        // ── 1. Reveal Animation (scales up as Story scrolls into view) ──
        gsap.fromTo(
            el,
            { scale: 0.1, opacity: 0 },
            {
                scale: 1.0,
                opacity: 1,
                scrollTrigger: {
                    trigger: "#butterfly-story-anchor",
                    start: "top 85%",
                    end: "top 55%",
                    scrub: true,
                },
                ease: "power1.out",
            }
        );

        // ── 2. Flight Animation (flies to and sits on "Message" inside Message.tsx) ──
        gsap.fromTo(
            el,
            { x: 0, y: 0, rotate: 0 },
            {
                x: vc.dx,
                y: vc.dy,
                scale: 1,
                rotate: -55,
                scrollTrigger: {
                    trigger: "#rakhi-next-section",
                    start: "0% top",
                    endTrigger: "#rakhi-message-section",
                    end: "bottom 90%",
                    scrub: 1.5,
                },
                ease: "power1.inOut",
                immediateRender: false,
            }
        );

        // ── 3. Toggle Butterfly visibility to avoid rendering GIF out of viewport ──
        ScrollTrigger.create({
            trigger: "#butterfly-story-anchor",
            start: "top bottom-=100",
            endTrigger: "#rakhi-message-section",
            end: "bottom top+=100",
            onToggle: (self) => {
                const b = document.getElementById("global-story-butterfly");
                if (b) {
                    b.style.display = self.isActive ? "block" : "none";
                }
            }
        });

    }, [vc]);

    useGSAP(() => {
        const targets = gsap.utils.toArray<HTMLElement>(".scroll-animate-text");
        const originalHTMLs = new Map<HTMLElement, string>();
        const originalStyles = new Map<HTMLElement, { position: string; overflow: string; display: string }>();
        const splits: SplitText[] = [];
        let ctx: gsap.Context | null = null;

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) {
            targets.forEach((target) => {
                gsap.set(target, { opacity: 1 });
            });
            return;
        }

        const initAnimation = () => {
            ctx = gsap.context(() => {
                const isMobile = window.matchMedia("(max-width: 768px)").matches;

                targets.forEach((target) => {
                    // Save original state for clean unmount recovery
                    originalHTMLs.set(target, target.innerHTML);
                    originalStyles.set(target, {
                        position: target.style.position,
                        overflow: target.style.overflow,
                        display: target.style.display,
                    });

                    const revealColor = target.getAttribute("data-reveal-color") || "#7A1F3D";

                    if (isMobile) {
                        // Mobile optimization: Single block shutter reveal over the entire element (no SplitText)
                        target.style.position = "relative";
                        target.style.overflow = "hidden";
                        target.style.display = "block";

                        const originalHTML = target.innerHTML;
                        target.innerHTML = `<span class="reveal-content inline-block opacity-0" style="width: 100%; height: 100%;">${originalHTML}</span>`;
                        const content = target.querySelector(".reveal-content") as HTMLElement;

                        const block = document.createElement("div");
                        block.className = "reveal-block absolute inset-0 pointer-events-none rounded-md";
                        block.style.backgroundColor = revealColor;
                        block.style.zIndex = "10";
                        block.style.transformOrigin = "left center";
                        gsap.set(block, { scaleX: 0, transformOrigin: "left center" });
                        target.appendChild(block);

                        const tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: target,
                                start: "top 85%",
                                toggleActions: "play none none none",
                            }
                        });

                        // A: Shutter grows from left
                        tl.to(block, {
                            scaleX: 1,
                            duration: 0.5,
                            ease: "power2.inOut",
                        });

                        // B: Content is revealed, shutter origin flips to right
                        tl.set(content, { opacity: 1 }, 0.35);
                        tl.set(block, { transformOrigin: "right center" }, 0.35);

                        // C: Shutter collapses to right
                        tl.to(block, {
                            scaleX: 0,
                            duration: 0.35,
                            ease: "power2.inOut",
                        }, 0.35);
                        return;
                    }

                    // Split the text into lines first (Desktop only)
                    const split = new SplitText(target, { type: "lines" });
                    splits.push(split);

                    // Create a GSAP timeline triggered when the parent target enters viewport
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: target,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        }
                    });

                    // For each line, style it, wrap content, append shutter, and animate!
                    split.lines.forEach((lineElement, index) => {
                        const line = lineElement as HTMLElement;
                        line.style.position = "relative";
                        line.style.overflow = "hidden";
                        line.style.display = "block";

                        const originalLineHTML = line.innerHTML;
                        line.innerHTML = `<span class="reveal-content inline-block opacity-0" style="width: 100%;">${originalLineHTML}</span>`;
                        const content = line.querySelector(".reveal-content") as HTMLElement;

                        const block = document.createElement("div");
                        block.className = "reveal-block absolute inset-0 pointer-events-none rounded-md";
                        block.style.backgroundColor = revealColor;
                        block.style.zIndex = "10";
                        block.style.transformOrigin = "left center";
                        gsap.set(block, { scaleX: 0, transformOrigin: "left center" });
                        line.appendChild(block);

                        const startTime = index * 0.15;

                        // A: Shutter grows from left
                        tl.to(block, {
                            scaleX: 1,
                            duration: 0.6,
                            ease: "power2.inOut",
                        }, startTime);

                        // B: Content is revealed, shutter origin flips to right
                        tl.set(content, { opacity: 1 }, startTime + 0.4);
                        tl.set(block, { transformOrigin: "right center" }, startTime + 0.4);

                        // C: Shutter collapses to right
                        tl.to(block, {
                            scaleX: 0,
                            duration: 0.4,
                            ease: "power2.inOut",
                        }, startTime + 0.4);
                    });
                });
            });
        };

        // Delay initialization until fonts are ready so that line breaks are calculated correctly
        if (typeof document !== "undefined" && "fonts" in document) {
            document.fonts.ready.then(initAnimation);
        } else {
            initAnimation();
        }

        return () => {
            if (ctx) {
                ctx.revert();
            }
            // Revert SplitText first
            splits.forEach((split) => {
                if (split && typeof split.revert === "function") {
                    split.revert();
                }
            });

            // Revert DOM to original state
            targets.forEach((target) => {
                const original = originalHTMLs.get(target);
                const style = originalStyles.get(target);
                if (original !== undefined && style !== undefined) {
                    target.innerHTML = original;
                    target.style.position = style.position;
                    target.style.overflow = style.overflow;
                    target.style.display = style.display;
                }
            });
        };
    }, { dependencies: [] });

    return (
        <main ref={containerRef} className="w-full relative">
            <Hero />
            {/* Spacer to reserve scroll space for fixed Hero in layout flow */}
            <div style={{ height: "100vh" }} className="pointer-events-none" />
            <Story />
            <Message />
            <Scrapbook />
            <ThenAndNow
                beforeImage="/Rakhi-card-media/photo-1.webp"
                afterImage="/Rakhi-card-media/photo-2.jpg"
                beforeLabel="Age 8"
                afterLabel="Age 28"
                captions={[
                    { threshold: 0, text: "Then — stealing your chocolates and playing tag 🧸" },
                    { threshold: 45, text: "Middle — through awkward haircuts and constant teasing 🤪" },
                    { threshold: 75, text: "Now — still best friends, sharing bonds that never break 🪢" }
                ]}
            />
            <MemoryJar jarLabel="Our Sibling Memory Jar" />
            <DistanceMeter
                fromCity={{ name: "Mumbai", photo: "/Rakhi-card-media/photo-1.webp" }}
                toCity={{ name: "Toronto", photo: "/Rakhi-card-media/photo-2.jpg" }}
                distanceKm={12480}
            />
            <ReportCard siblingName="Komal" signatureName="Your Bhai" />
            <LetterWriter />
            <MemoryFilmstrip />
            <PromisesEnvelope />
            <ThankYou />
            {vc && (
                <div
                    id="global-story-butterfly"
                    style={{
                        position: "absolute",
                        left: vc.startCX,
                        top: vc.startCY,
                        width: "64px",
                        height: "64px",
                        transformOrigin: "center center",
                        willChange: "transform, opacity",
                        zIndex: 30,
                        pointerEvents: "none",
                        display: "none",
                    }}
                >
                    <Image
                        src="/Rakhi-card-media/Butterfly.gif"
                        alt="Butterfly GIF"
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                        unoptimized // keeps GIF animating
                    />
                </div>
            )}
        </main>
    );
}
