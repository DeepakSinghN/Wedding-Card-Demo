"use client";

import React, { useState, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import { Highlighter } from "./ui/highlighter";
import { Backlight } from "./ui/backlight";
import "animate.css";

interface CountdownProps {
  active: boolean;
}

export default function Countdown({ active }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const targetDate = new Date("2026-07-18T00:00:00").getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [isClient]);

  if (!active || !isClient) return null;

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section
      className="w-full min-h-screen py-16 flex flex-col items-center justify-center bg-[#FAF4EF] px-6 relative border-t border-[#A36662]/5 animate__animated animate__fadeInUp animate__delay-1s"
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) {
          setIsAnimationDone(true);
        }
      }}
    >
      {/* Decorative luxurious inner border frame */}
      <div className="absolute inset-4 md:inset-8 border border-[#A36662]/5 rounded-[28px] pointer-events-none" />
      <div className="absolute inset-5 md:inset-9 border border-dashed border-[#A36662]/8 rounded-[26px] pointer-events-none" />

      {/* Premium Card Container with Backlight Glow Aura */}
      <div className="relative w-full max-w-xl z-10 flex justify-center items-center">
        {/* Animated Backlight Aura */}
        <Backlight
          blur={28}
          className={`absolute inset-2 md:inset-4 rounded-[24px] pointer-events-none transition-opacity duration-1000 ${isAnimationDone ? "opacity-60" : "opacity-0"
            }`}
          animate={true}
        >
          <div className="w-full h-full bg-gradient-to-tr from-[#BA7A76] via-[#A36662] to-[#EADFD7] rounded-[24px]" />
        </Backlight>

        <ScrollReveal
          animation="zoom-in"
          duration={1.0}
          className="relative w-full p-8 md:p-12 rounded-[24px] bg-[#FDFAF7] border border-[#A36662]/12 border-b-[4px] md:border-b-[6px] border-b-[#A36662]/20 overflow-hidden flex flex-col items-center text-center z-10"
          style={{
            boxShadow:
              "0 20px 40px -15px rgba(163, 102, 98, 0.25), 0 8px 20px -8px rgba(163, 102, 98, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.7)",
          }}
        >
          {/* Tiny decorative separator */}
          <div className="flex items-center gap-3 w-32 opacity-35 mb-6">
            <div className="h-[1px] bg-[#A36662] flex-1" />
            <span className="text-[10px] text-[#A36662]">❖</span>
            <div className="h-[1px] bg-[#A36662] flex-1" />
          </div>

          {/* 1. First Sentence */}
          <p className="font-cormorant text-[clamp(1.1rem,2vw,1.4rem)] text-black font-semibold italic mb-4 leading-relaxed">
            A lifetime of togetherness begins with one sacred step
          </p>

          {/* 2. Heading */}
          <h2 className="font-distrela text-[clamp(2.5rem,4vw,3.5rem)] text-[#BA7A76] font-bold tracking-wider leading-none mb-3">
            The Wedding
          </h2>

          {/* 3. Date */}
          <p className="font-distrela text-[clamp(1.3rem,2.5vw,1.7rem)] text-[#7A1C2C] tracking-widest font-bold uppercase mb-8">
            <Highlighter action="underline" color="#D5B03A" isView={true} delay={1000}>
              July 18, 2026
            </Highlighter>
          </p>

          {/* 4. Floating Timer Block */}
          <div className="flex flex-row justify-center gap-3 md:gap-5 w-full animate-float">
            {timeBlocks.map((block, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                {/* Digit Box */}
                <div
                  className="flex flex-col items-center justify-center w-[60px] h-[55px] md:w-[80px] md:h-[70px] rounded-2xl bg-[#FDFAF7] border border-[#A36662]/12 border-b-[3px] md:border-b-[4px] border-b-[#A36662]/25 relative"
                  style={{
                    boxShadow:
                      "0 6px 15px -3px rgba(163, 102, 98, 0.15), 0 4px 6px -2px rgba(163, 102, 98, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.7)",
                  }}
                >
                  {/* Number value */}
                  <span className="font-cormorant text-3xl md:text-4xl font-thin text-black tracking-wider leading-none">
                    {String(block.value).padStart(2, "0")}
                  </span>

                  {/* Inner tiny corner highlights */}
                  <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-[#A36662]/20" />
                  <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#A36662]/20" />
                </div>

                {/* Unit Label (Outside at bottom of box) */}
                <span className="text-[11px] md:text-[12px] text-[#A36662]/75 font-semibold tracking-widest uppercase">
                  {block.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
