"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Heart } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface PromiseItem {
  id: number;
  text: string;
  checked: boolean;
}

const DEFAULT_PROMISES: PromiseItem[] = [
  { id: 1, text: "I promise to always pick up your calls, no matter what time it is.", checked: false },
  { id: 2, text: "I promise to always share my dessert (even the last piece of chocolate).", checked: false },
  { id: 3, text: "I promise to keep all your secrets safe from mom and dad.", checked: false },
  { id: 4, text: "I promise to have your back and stand by you, through thick and thin.", checked: false },
  { id: 5, text: "I promise to always protect you and never get tired of your silly dramas.", checked: false },
];

function getRandomValue(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function PromisesEnvelope() {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const topFlapRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const butterflyRef = useRef<HTMLDivElement>(null);
  const swarmContainerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [butterflyClicked, setButterflyClicked] = useState(false);
  const [promises, setPromises] = useState<PromiseItem[]>(DEFAULT_PROMISES);
  const [showSparkle, setShowSparkle] = useState<{ [key: number]: boolean }>({});

  // ── Entrance animation on scroll ──────────────────────────────────────────
  useGSAP(() => {
    if (!containerRef.current || !envelopeRef.current || !butterflyRef.current) return;

    // Envelope entrance
    gsap.fromTo(
      envelopeRef.current,
      {
        opacity: 0,
        scale: 0.8,
        y: 60,
        rotation: -4,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Butterfly one-time entrance animation on viewport reveal (replaces heavy scroll scrub)
    gsap.set(butterflyRef.current, {
      y: 120,
      rotation: 25,
      scale: 0.8,
      opacity: 0,
    });

    gsap.to(butterflyRef.current, {
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.2)",
      scrollTrigger: {
        id: "butterfly-entrance",
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      }
    });
  }, { scope: containerRef, dependencies: [] });

  // ── Butterfly flying off-screen animation & Swarm Trigger ──────────────────
  const handleButterflyClick = () => {
    if (butterflyClicked || isOpen) return;
    setButterflyClicked(true);

    // Kill entrance scrollTrigger and any current tweens to prevent scroll conflicts
    const entranceTrigger = ScrollTrigger.getById("butterfly-entrance");
    if (entranceTrigger) {
      entranceTrigger.disable(false, false);
      entranceTrigger.kill();
    }
    gsap.killTweensOf(butterflyRef.current);

    // 1. Animate the main butterfly flying upward off-screen (with no fade-out)
    gsap.to(butterflyRef.current, {
      y: -750, // flies completely off the screen
      x: -120, // drifts left slightly as it flies up
      rotation: -45, // tilts left
      scale: 1.2, // slightly larger as it lifts off
      duration: 1.8,
      ease: "power2.inOut",
      onComplete: () => {
        if (butterflyRef.current) {
          butterflyRef.current.style.display = "none";
        }
      }
    });

    // 2. Launch the swarm of butterflies from the bottom of the screen (fixed viewport)
    const swarmContainer = swarmContainerRef.current;
    if (swarmContainer) {
      const vHeight = window.innerHeight;
      const swarmSize = 25;

      for (let i = 0; i < swarmSize; i++) {
        const b = document.createElement("div");
        b.className = "absolute pointer-events-none";
        b.style.width = "48px";
        b.style.height = "48px";
        b.style.left = `${getRandomValue(4, 96)}%`;
        b.style.top = "0px"; // Set to 0 because we will translate from vHeight + 50
        b.style.willChange = "transform";
        b.style.zIndex = "9999";

        const img = document.createElement("img");
        img.src = "/Rakhi-card-media/Butterfly.gif";
        img.alt = "Swarm Butterfly";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "contain";
        b.appendChild(img);

        swarmContainer.appendChild(b);

        // Flight variables
        const scale = getRandomValue(0.25, 1.2);   // scale varies heavily from tiny (0.25) to large (1.2)
        const duration = getRandomValue(2.0, 3.6);  // flight duration 2.0s to 3.6s
        const initialRotate = getRandomValue(-20, 20);

        // Smooth flutter path floating up and off the top of screen
        gsap.fromTo(b,
          { y: vHeight + 50, scale: scale, rotate: initialRotate, opacity: 0.9 },
          {
            y: -150, // Fly completely off the top of the mobile viewport
            x: `+=${getRandomValue(-80, 80)}`,
            rotate: `+=${getRandomValue(-45, 45)}`,
            duration: duration,
            ease: "power1.out",
            delay: getRandomValue(0, 0.7), // Staggered launch
            onComplete: () => {
              b.remove();
            }
          }
        );
      }
    }

    // 3. Trigger envelope opening sequence as swarm rises
    setTimeout(() => {
      triggerEnvelopeOpen();
    }, 700);
  };

  // ── Envelope Opening Animation Sequence ──────────────────────────────────
  const handleOpenEnvelope = () => {
    if (isOpen) return;

    // If the user clicks the seal but the butterfly hasn't flown yet, launch it!
    if (!butterflyClicked) {
      handleButterflyClick();
      return;
    }

    triggerEnvelopeOpen();
  };

  const triggerEnvelopeOpen = () => {
    setIsOpen(true);
    const tl = gsap.timeline();

    // 1. Pop the wax seal away
    tl.to(sealRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "back.in(1.5)",
    });

    // 2. Rotate top flap open (3D flip upwards)
    tl.to(topFlapRef.current, {
      rotationX: 180,
      duration: 0.4,
      ease: "power2.inOut",
    });

    // 3. Update top flap z-index so it falls behind the letter
    tl.set(topFlapRef.current, { zIndex: 10 });

    // 4. Slide letter upward out of the envelope
    tl.to(letterRef.current, {
      y: -180,
      zIndex: 35,
      duration: 0.6,
      ease: "power2.out",
    });

    // 5. Expand letter downwards and forward to cover the front of the envelope
    tl.to(letterRef.current, {
      y: -80,
      height: "440px",
      width: "310px",
      left: "5px",
      duration: 0.5,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      ease: "back.out(1.2)",
    });
  };

  const handleTogglePromise = (id: number) => {
    setPromises((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextChecked = !p.checked;
          if (nextChecked) {
            // Trigger temporary sparkle animation on check
            setShowSparkle((prevSparkles) => ({ ...prevSparkles, [id]: true }));
            setTimeout(() => {
              setShowSparkle((prevSparkles) => ({ ...prevSparkles, [id]: false }));
            }, 600);

            // Wait for next render frame, then animate reveal text
            requestAnimationFrame(() => {
              gsap.fromTo(`.promise-text-${id}`,
                { opacity: 0, x: -12, filter: "blur(6px)" },
                { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.5, ease: "power2.out" }
              );
            });
          }
          return { ...p, checked: nextChecked };
        }
        return p;
      })
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full min-h-[100vh] py-24 px-6 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#FFF8F0" }}
    >
      {/* Butterfly Swarm Overlay Container */}
      <div ref={swarmContainerRef} className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" />

      <div className="w-full max-w-[430px] mx-auto flex flex-col items-center">

        {/* Calligraphy Header */}
        <p
          className="text-xs font-semibold tracking-[0.25em] uppercase mb-2 scroll-animate-text"
          style={{
            fontFamily: "var(--font-body, Poppins, sans-serif)",
            color: "#8C6A5C",
          }}
        >
          A LIFETIME VOW
        </p>
        <h2
          className="text-4xl text-center mb-2 select-none scroll-animate-text"
          style={{
            fontFamily: "var(--font-script, 'Great Vibes', cursive)",
            color: "var(--rakhi-maroon)",
          }}
        >
          My Promises to You
        </h2>
        <p
          className="text-xs italic mb-12 select-none text-stone-500 font-light scroll-animate-text"
          style={{
            fontFamily: "var(--font-body, Poppins, sans-serif)",
          }}
        >
          (Click the Butterfly to reveal the promises)
        </p>

        {/* Envelope Container Wrapper */}
        <div
          ref={envelopeRef}
          className="relative w-[320px] h-[220px] select-none"
          style={{ perspective: "1000px" }}
        >

          {/*The Origami Paper Planes */}
          <div
            ref={letterRef}
            className="absolute w-[290px] h-[190px] top-3 left-[15px] z-20 bg-[#FCFBF7] rounded-[4px] border border-stone-200 shadow-sm p-4 overflow-hidden flex flex-col"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform, height, width, left",
              boxShadow: "inset 0 0 20px rgba(140, 106, 92, 0.05)",
            }}
          >
            {/* Ruled letter lines background */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(#967d73 1px, transparent 1px)",
                backgroundSize: "100% 28px",
                marginTop: "40px",
              }}
            />

            {/* Letter Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between">
              <div>
                <h3
                  className="text-2xl text-center mb-4 pb-2 border-b border-amber-900/10"
                  style={{
                    fontFamily: "var(--font-script, 'Great Vibes', cursive)",
                    color: "var(--rakhi-maroon)",
                  }}
                >
                  Rakhi Vows
                </h3>

                {/* Interactive Checklist inside Letter */}
                <div className="flex flex-col gap-3 px-1">
                  {promises.map((promise) => (
                    <div
                      key={promise.id}
                      className="flex items-start gap-3 cursor-pointer group"
                      onClick={() => handleTogglePromise(promise.id)}
                    >
                      <div className="relative flex items-center justify-center w-5 h-5 rounded border border-amber-800/40 bg-white/50 text-emerald-600 flex-shrink-0 mt-0.5 transition-colors group-hover:border-amber-800">
                        {promise.checked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                        {/* Sparkle pop effect */}
                        {showSparkle[promise.id] && (
                          <span className="absolute w-8 h-8 rounded-full border border-amber-500/50 scale-150 opacity-0 animate-ping pointer-events-none" />
                        )}
                      </div>

                      {/* Promise Text / Placeholder Wrapper */}
                      <div className="flex-1 relative min-h-[20px] flex items-center">
                        {!promise.checked ? (
                          <p
                            className="text-sm leading-tight text-stone-400 italic font-normal"
                            style={{
                              fontFamily: "var(--font-body, Poppins, sans-serif)",
                            }}
                          >
                            Tap to reveal Promise #{promise.id}
                          </p>
                        ) : (
                          <p
                            className={`promise-text-${promise.id} text-sm leading-tight text-stone-800 font-medium`}
                            style={{
                              fontFamily: "var(--font-body, Poppins, sans-serif)",
                            }}
                          >
                            {promise.text}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signature block */}
              <div className="text-right mt-4 pr-2">
                <p
                  className="text-xl scroll-animate-text"
                  style={{
                    fontFamily: "var(--font-script, 'Great Vibes', cursive)",
                    color: "var(--rakhi-maroon)",
                  }}
                >
                  Yours always,
                </p>
                <div className="inline-block w-20 h-[1px] bg-amber-900/20" />
              </div>
            </div>
          </div>

          {/* 3D Floor Shadow */}
          <div
            className="absolute -bottom-6 left-6 right-6 h-4 rounded-full bg-stone-950/15 blur-[6px] z-0 pointer-events-none transition-all duration-500"
            style={{
              transform: isOpen ? "scale(0.92) translateY(3px)" : "scale(1)",
              opacity: isOpen ? 0.5 : 0.8,
            }}
          />

          {/* BACK PANEL OF ENVELOPE */}
          <div
            className="absolute inset-0 bg-[#EFE3C9] rounded-b-[8px] z-10 border-b border-stone-300/40"
            style={{
              boxShadow: "0 12px 30px rgba(120, 90, 70, 0.15), inset 0 -3px 6px rgba(0,0,0,0.03)",
            }}
          />

          {/* BOTTOM & SIDE FLAPS (Creates the pocket) */}
          <svg
            className="absolute inset-0 w-full h-full z-30 drop-shadow-[0_-2px_4px_rgba(0,0,0,0.03)]"
            viewBox="0 0 320 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ pointerEvents: "none" }}
          >
            {/* Left triangle flap */}
            <path d="M0 0 L150 110 L0 220 Z" fill="#ebdcc0" />
            {/* Right triangle flap */}
            <path d="M320 0 L170 110 L320 220 Z" fill="#ebdcc0" />
            {/* Bottom pocket flap */}
            <path d="M0 220 L160 100 L320 220 Z" fill="#e2d2b3" stroke="#ebdcc0" strokeWidth="0.5" />
          </svg>

          {/* TOP FLAP (Flipped open upward) */}
          <div
            ref={topFlapRef}
            className="absolute top-0 left-0 w-full h-[110px] z-30 origin-top"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <svg
              className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
              viewBox="0 0 320 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0 L160 110 L320 0 Z" fill="#ebdcc0" stroke="#dfd0b4" strokeWidth="0.5" />
            </svg>
          </div>

          {/* WAX SEAL (Tapped to unlock envelope) */}
          <div
            ref={sealRef}
            onClick={handleOpenEnvelope}
            className="absolute top-[90px] left-[138px] w-11 h-11 bg-[#7A1F3D] hover:bg-[#8B2E4D] active:scale-95 rounded-full z-40 cursor-pointer shadow-[0_4px_8px_rgba(0,0,0,0.2)] flex items-center justify-center border-2 border-amber-600/35 transition-transform duration-300 transform hover:scale-105"
            title="Click to open letter"
          >
            {/* Gold pattern inside wax seal */}
            <div className="w-8 h-8 rounded-full border border-dashed border-amber-400/50 flex items-center justify-center text-amber-100 select-none">
              <Heart className="w-4 h-4 fill-current text-amber-100/95" />
            </div>
            {/* Decorative ribbon below seal */}
            <div className="absolute -bottom-3 w-[6px] h-4 bg-amber-700/60 rotate-12 -z-10 rounded-sm" />
            <div className="absolute -bottom-3 w-[6px] h-4 bg-amber-700/60 -rotate-12 -z-10 rounded-sm" />
          </div>

          {/* Butterfly sitting on the seal */}
          <div
            ref={butterflyRef}
            onClick={handleButterflyClick}
            className="absolute w-[80px] h-[80px] z-50 cursor-pointer hover:scale-110 active:scale-95"
            style={{
              top: "68px",
              left: "120px",
              transformOrigin: "center center",
              willChange: "transform",
              display: isOpen && !butterflyClicked ? "none" : "block",
            }}
            title="Tap the butterfly to open"
          >
            <Image
              src="/Rakhi-card-media/Butterfly.gif"
              alt="Envelope Butterfly"
              width={100}
              height={100}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>

        </div>

      </div>
    </section>
  );
}
