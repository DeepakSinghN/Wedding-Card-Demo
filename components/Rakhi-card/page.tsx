"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "@/components/Rakhi-card/Hero";
import Story from "@/components/Rakhi-card/Story";
import Message from "@/components/Rakhi-card/Message";
import Scrapbook from "@/components/Rakhi-card/Scrapbook";
import ThenAndNow from "@/components/Rakhi-card/ThenAndNow";
import MemoryJar from "@/components/Rakhi-card/MemoryJar";
import DistanceMeter from "@/components/Rakhi-card/DistanceMeter";
import ReportCard from "@/components/Rakhi-card/ReportCard";
import LetterWriter from "@/components/Rakhi-card/LetterWriter";
import PromisesEnvelope from "@/components/Rakhi-card/PromisesEnvelope";
import ThankYou from "@/components/Rakhi-card/ThankYou";
import MemoryFilmstrip from "@/components/Rakhi-card/MemoryFilmstrip";
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
        window.addEventListener("resize", measure);

        return () => {
            clearTimeout(t);
            window.removeEventListener("resize", measure);
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
                targets.forEach((target) => {
                    // Save original state for clean unmount recovery
                    originalHTMLs.set(target, target.innerHTML);
                    originalStyles.set(target, {
                        position: target.style.position,
                        overflow: target.style.overflow,
                        display: target.style.display,
                    });

                    // Split the text into lines first
                    const split = new SplitText(target, { type: "lines" });
                    splits.push(split);

                    const revealColor = target.getAttribute("data-reveal-color") || "#7A1F3D";

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
                        block.className = "reveal-block absolute inset-0 pointer-events-none z-25 rounded-md";
                        block.style.backgroundColor = revealColor;
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
