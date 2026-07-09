"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export interface ReportCardGrade {
  id: string;
  category: string;
  grade: string;
  remark?: string;
}

interface ReportCardProps {
  siblingName?: string;
  grades?: ReportCardGrade[];
  signatureName?: string;
}

const DEFAULT_GRADES: ReportCardGrade[] = [
  { id: "1", category: "Secret Keeping", grade: "A++", remark: "Kept my secret from Mom, but charged 3 chocolates." },
  { id: "2", category: "Kaju Katli Theft", grade: "F", remark: "Zero stealth. Caught red-handed every single time." },
  { id: "3", category: "TV Remote Defense", grade: "A+", remark: "Blocks and counter-attacks are world-class." },
  { id: "4", category: "Drama Queen Quotient", grade: "A++", remark: "Deserves an Oscar for 'The day I forgot her birthday'." },
  { id: "5", category: "Late Entry Covering", grade: "A+", remark: "Excellent alibis, but extortion fees are too high." },
  { id: "6", category: "Teasing & Bullying", grade: "A+++", remark: "Supreme championship title holder since 2008." }
];

export default function ReportCard({
  siblingName = "Dearest Sibling",
  grades = DEFAULT_GRADES,
  signatureName = "Your Bhai",
}: ReportCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);

  // ── GSAP Stamp Entrance & Card Shakes ─────────────────────────────────────
  useGSAP(() => {
    if (!containerRef.current || !cardRef.current) return;

    const stamps = containerRef.current.querySelectorAll(".rubber-stamp-container");
    const rows = containerRef.current.querySelectorAll(".grade-row-el");
    const ribbon = ribbonRef.current;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Ribbon gentle idle rotation loop
    if (!prefersReduced && ribbon) {
      gsap.to(ribbon, {
        rotation: 6,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (prefersReduced) {
      // Reduced motion fallback
      gsap.fromTo(
        rows,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        stamps,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 0.85,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
      return;
    }

    // Set initial properties
    gsap.set(stamps, { opacity: 0, scale: 2.4 });
    gsap.set(rows, { opacity: 0, x: -12 });

    grades.forEach((grade) => {
      const stampEl = containerRef.current?.querySelector(`#stamp-${grade.id}`);
      const rowEl = containerRef.current?.querySelector(`#row-${grade.id}`);

      if (!stampEl || !rowEl) return;

      const randomRotation = (Math.random() * 10 - 5); // resting angle (-5 to +5)
      const startRotation = randomRotation + (Math.random() > 0.5 ? 15 : -15);

      const rowTl = gsap.timeline({ paused: true });

      // Slide in row details slightly before impact
      rowTl.to(
        rowEl,
        {
          opacity: 1,
          x: 0,
          duration: 0.35,
          ease: "power2.out",
        }
      );

      // Oversized slam thump
      rowTl.fromTo(
        stampEl,
        {
          opacity: 0,
          scale: 2.5,
          rotation: startRotation,
        },
        {
          opacity: 0.92,
          scale: 1,
          rotation: randomRotation,
          duration: 0.22,
          ease: "power4.in",
        },
        "-=0.08"
      );

      // Compress on impact
      rowTl.to(
        stampEl,
        {
          scale: 0.92,
          duration: 0.07,
          ease: "power1.out",
        },
        "-=0.02"
      );

      // Settle spring bounce
      rowTl.to(
        stampEl,
        {
          scale: 1.0,
          duration: 0.2,
          ease: "elastic.out(1, 0.45)",
        },
        "-=0.04"
      );

      // Bind to ScrollTrigger for this specific row with scrub!
      ScrollTrigger.create({
        trigger: rowEl,
        start: "top 92%",
        end: "top 68%",
        scrub: 0.8,
        animation: rowTl,
        onLeave: () => {
          // Play a soft synthetic thud sound optionally
          try {
            const audioCtx = new (window.AudioContext || (window as unknown as Record<string, typeof AudioContext>).webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(75, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.12);
            gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.14);
          } catch {
            // block audio errors
          }

          // Camera shake thud on the card container
          gsap.fromTo(
            cardRef.current,
            { x: -1.5, y: 1 },
            {
              x: 1.5,
              y: -1,
              duration: 0.04,
              repeat: 2,
              yoyo: true,
              ease: "none",
              clearProps: "x,y",
            }
          );
        },
      });
    });
  }, { scope: containerRef, dependencies: [grades] });

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full py-20 px-6 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#FFF8F0" }}
    >
      {/* Certificate Frame wrapper */}
      <div
        ref={cardRef}
        className="relative bg-[#FFFBF7] p-8 md:p-12 rounded-2xl max-w-[500px] w-full flex flex-col items-center shadow-[0_12px_40px_rgba(122,31,61,0.06),_inset_0_0_40px_rgba(245,166,35,0.03)] border border-stone-200"
      >
        {/* Double Vintage borders */}
        <div className="absolute inset-2 border border-[#F5A623]/60 pointer-events-none rounded-xl" />
        <div className="absolute inset-3 border-2 border-[#7A1F3D] pointer-events-none rounded-xl" />

        {/* Vintage Corner Flourishes */}
        <div className="absolute top-5 left-5 pointer-events-none opacity-45">
          <svg className="w-5 h-5 text-[#7A1F3D]" viewBox="0 0 24 24" fill="none">
            <path d="M2,2 L10,2 M2,2 L2,10 M4,4 L8,4 M4,4 L4,8" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="absolute top-5 right-5 pointer-events-none opacity-45">
          <svg className="w-5 h-5 text-[#7A1F3D] rotate-90" viewBox="0 0 24 24" fill="none">
            <path d="M2,2 L10,2 M2,2 L2,10 M4,4 L8,4 M4,4 L4,8" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="absolute bottom-5 left-5 pointer-events-none opacity-45">
          <svg className="w-5 h-5 text-[#7A1F3D] -rotate-90" viewBox="0 0 24 24" fill="none">
            <path d="M2,2 L10,2 M2,2 L2,10 M4,4 L8,4 M4,4 L4,8" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="absolute bottom-5 right-5 pointer-events-none opacity-45">
          <svg className="w-5 h-5 text-[#7A1F3D] rotate-180" viewBox="0 0 24 24" fill="none">
            <path d="M2,2 L10,2 M2,2 L2,10 M4,4 L8,4 M4,4 L4,8" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Gold Ribbon Seal - Shifted and styled to prevent overlap */}
        <div
          ref={ribbonRef}
          className="absolute top-6 right-6 w-12 h-12 z-20 pointer-events-none select-none flex items-center justify-center opacity-90"
        >
          {/* Ribbons */}
          <div className="absolute bottom-[-12px] left-2.5 w-2.5 h-8 bg-[#BF953F] rotate-[15deg] origin-top clip-ribbon" />
          <div className="absolute bottom-[-12px] right-2.5 w-2.5 h-8 bg-[#AA771C] rotate-[-15deg] origin-top clip-ribbon" />

          {/* Circular Badge */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] to-[#AA771C] border border-[#7A1F3D]/20 flex items-center justify-center shadow">
            <Award className="w-3.5 h-3.5 text-[#7A1F3D]" />
          </div>
        </div>

        {/* Header container with added top padding to ensure breathing room */}
        <div className="w-full flex flex-col items-center pt-6 text-center select-none">
          <p
            className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-stone-500/80 mb-2 font-sans scroll-animate-text"
          >
            OFFICIAL SIBLING REPORT CARD
          </p>
          <h2
            className="text-3xl font-black text-[#7A1F3D] tracking-tight pr-6 scroll-animate-text"
            style={{ fontFamily: "var(--font-display), Playfair Display, serif" }}
          >
            {siblingName}&apos;s Grades
          </h2>

          {/* Subtitle */}
          <p
            className="text-amber-800 text-[1.4rem] mt-1.5 mb-6 scroll-animate-text"
            style={{ fontFamily: "var(--font-script), Great Vibes, cursive" }}
          >
            Academic Year: Forever
          </p>

          <span
            className="text-[11px] text-stone-500/90 font-sans tracking-wide italic pb-5 border-b border-amber-800/10 mb-8 w-full block scroll-animate-text"
            style={{ fontFamily: "var(--font-crimson-pro), serif" }}
          >
            Issued by: Sibling Board of Studies
          </span>
        </div>

        {/* 2. Grade list rows */}
        <div className="w-full flex flex-col gap-6 mb-8 z-10">
          {grades.map((grade) => {
            return (
              <div
                key={grade.id}
                id={`row-${grade.id}`}
                className="grade-row-el flex flex-col justify-center"
              >
                {/* Ledger Item Row */}
                <div className="flex items-center justify-between gap-3 w-full">
                  <span className="text-sm font-semibold text-stone-800 font-sans whitespace-nowrap">
                    {grade.category}
                  </span>

                  {/* Ledger Dotted Leader Line */}
                  <div className="flex-1 border-b border-dotted border-stone-300 min-w-[20px] translate-y-[2px]" />

                  {/* Stamp Container with spring tilts */}
                  <motion.div
                    id={`stamp-${grade.id}`}
                    className="rubber-stamp-container cursor-pointer pointer-events-auto flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Realistic Round/Irregular Rubber Ink Stamp */}
                    <svg viewBox="0 0 80 80" className="w-14 h-14 drop-shadow-sm opacity-85 select-none pointer-events-none" fill="none">
                      {/* Outer Stamp Ring with distress marks */}
                      <circle cx="40" cy="40" r="32" stroke="#DC2626" strokeWidth="2.0" strokeDasharray="140 12" strokeDashoffset="4" />
                      <circle cx="40" cy="40" r="27" stroke="#DC2626" strokeWidth="0.8" strokeDasharray="90 8" strokeDashoffset="12" />
                      {/* Distorted Ink Grade Text */}
                      <text
                        x="50%"
                        y="53%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#DC2626"
                        fontSize="15"
                        fontWeight="900"
                        fontFamily="sans-serif"
                      >
                        {grade.grade}
                      </text>
                    </svg>
                  </motion.div>
                </div>

                {/* Remark/Comment text */}
                {grade.remark && (
                  <p
                    className="text-stone-500 text-[11px] leading-relaxed mt-1 pr-14 font-normal"
                    style={{ fontFamily: "var(--font-crimson-pro), serif", fontStyle: "italic" }}
                  >
                    &ldquo;{grade.remark}&rdquo;
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* 3. Certificate Footer with signature and stamp */}
        <div className="w-full flex justify-between items-end mt-4 pt-6 border-t border-amber-800/10">

          {/* Footnote */}
          <div className="text-left max-w-[220px] select-none">
            <p className="text-[8px] font-bold text-stone-400 font-sans tracking-widest uppercase mb-0.5">
              Grade Key:
            </p>
            <p className="text-[9px] text-stone-400 font-sans leading-snug">
              A++ = Immeasurable, F = Needs immediate hugs
            </p>
          </div>

          {/* Cursive Signature */}
          <div className="flex flex-col items-center">
            <p
              className="text-[1.4rem] text-[#7A1F3D] leading-none mb-1 select-none"
              style={{ fontFamily: "var(--font-script), Great Vibes, cursive" }}
            >
              {signatureName}
            </p>
            <div className="w-24 h-[1px] bg-stone-300" />
            <p className="text-[8px] font-bold text-stone-400 uppercase tracking-widest mt-1.5 font-sans">
              Chief Examiner
            </p>
          </div>

        </div>

      </div>

      <style jsx>{`
        .clip-ribbon {
          clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
        }
      `}</style>
    </section>
  );
}
