"use client";

import React from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import ShinyText from "./ShinyText";

export default function Hero() {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-[#FAF4EF] px-6">
      {/* 3D Center Card */}
      <ScrollReveal
        animation="zoom-in"
        duration={1.2}
        className="w-[100%] h-[80vh] md:w-[45%] md:h-[90vh] bg-[#FDFAF7] rounded-[32px] relative flex flex-col justify-between items-center gap-0 md:gap-4 py-[clamp(1.5rem,3vh,1rem)] px-[clamp(1.5rem,2vw,2.5rem)] border border-[#A36662]/10"
        style={{
          boxShadow: "0 25px 50px -12px rgba(163, 102, 98, 0.4), 0 8px 16px -8px rgba(163, 102, 98, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)"
        }}
      >
        {/* Double-Line Luxurious Inner Frame */}
        <div className="absolute inset-3 border border-[#A36662]/5 rounded-[24px] pointer-events-none" />
        <div className="absolute inset-4 border border-dashed border-[#A36662]/8 rounded-[22px] pointer-events-none" />

        {/* Top Section: Ganesh Ji & Blessings */}
        <div className="flex flex-col items-center text-center z-10 w-full gap-2 md:gap-3">
          {/* Ganesh Ji Image */}
          <div className="relative w-[clamp(5rem,11vw,6rem)] h-[clamp(5rem,11vw,6rem)] animate-float transition-transform duration-500 hover:scale-105">
            <Image
              src="/Hero/sacred-lord-ganesha-idol-art-png.webp"
              alt="Lord Ganesha Icon"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Hindi Shloka (Scripture Serif style) */}
          <p className="font-cormorant italic text-[clamp(0.85rem,3vw,1.05rem)] tracking-wide leading-relaxed text-[#A0635F] max-w-[80%] font-medium">
            || श्री गणेशाय नमः ||
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
          </p>

          {/* English Blessings */}
          <p className="font-cormorant italic text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.6rem] tracking-wide text-[#A36662]/80 max-w-[100%] md:max-w-[90%] mt-4 md:mt-2">
            ॥ Shri Ganeshaya Namah ॥
            We seek the blessings of Lord Ganesha for a happy & peaceful beginning.
          </p>
        </div>

        {/* Middle Section: Couple Names with Separators */}
        <div className="flex flex-col items-center text-center z-10 w-full ">
          {/* Top Diamond Separator */}
          <div className="flex items-center gap-3 w-[clamp(8rem,18vw,8.5rem)] opacity-35">
            <div className="h-[1px] bg-[#A36662] flex-1" />
            <span className="text-[8px] text-[#A36662]">❖</span>
            <div className="h-[1px] bg-[#A36662] flex-1" />
          </div>

          <div className="flex flex-col items-center mt-2">
            <ShinyText
              text="Meenal"
              className="font-cormorant text-[clamp(3rem,6vw,4.25rem)] tracking-[0.1rem] md:tracking-[0.2rem] leading-none font-bold"
              speed={4}
              delay={1}
              color="#A0635F"
              shineColor="#E1B2AF"
              spread={120}
              direction="right"
            />
            <ShinyText
              text="&"
              className="font-cormorant italic text-[clamp(3rem,4vw,2.25rem)] my-1.5 font-light"
              speed={4}
              delay={1}
              color="#D5B03A"
              shineColor="#E1B2AF"
              spread={120}
              direction="right"
            />
            <ShinyText
              text="Avinash"
              className="font-cormorant text-[clamp(3rem,6vw,4.25rem)] tracking-[0.1rem] md:tracking-[0.2rem] leading-none font-bold "
              speed={4}
              delay={1}
              color="#A0635F"
              shineColor="#E1B2AF"
              spread={120}
              direction="right"
            />
          </div>

          {/* Bottom Diamond Separator */}
          <div className="flex items-center gap-3 w-[clamp(8rem,18vw,8.5rem)] opacity-35 mt-4">
            <div className="h-[1px] bg-[#A36662] flex-1" />
            <span className="text-[8px] text-[#A36662]">❖</span>
            <div className="h-[1px] bg-[#A36662] flex-1" />
          </div>
        </div>

        {/* Bottom Section: Footer Regards */}
        <div className="text-center z-10 w-full pb-3 mt-2">
          <p className="font-cormorant italic text-[clamp(0.8rem,1vw,1.05rem)] tracking-wider text-black leading-relaxed normal-case font-medium">
            Daughter of Mr. &amp; Mrs. Sharma &
            Son of Mr. &amp; Mrs. Patel
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
