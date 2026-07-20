"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const inviteBase = "/Wedding-card-2/Invitation-section";

export default function Invitation() {
  const invitationRef = useRef<HTMLDivElement>(null);
  const venueRef = useRef<HTMLDivElement>(null);

  // 1. GSAP animations for Invitation section
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: invitationRef.current,
        start: "top 90%",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".plum-bg-anim",
      { yPercent: 100 },
      { yPercent: 0, duration: 1.5, ease: "power3.out" }
    );

    tl.fromTo(".ganesh-ji-anim",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
      "-=1.1"
    );

    tl.fromTo(".header-text-anim",
      { opacity: 0, y: 15 },
      { opacity: 0.9, y: 0, duration: 1.0, ease: "power2.out" },
      "-=0.8"
    );

    tl.fromTo(".oval-frame-anim",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
      "-=0.8"
    );

    tl.fromTo(".side-branch-left-anim",
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
      "-=1.0"
    );

    tl.fromTo(".side-branch-right-anim",
      { opacity: 0, scaleX: -0.92, scaleY: 0.92 },
      { opacity: 1, scaleX: -1, scaleY: 1, duration: 1.2, ease: "power2.out" },
      "-=1.2"
    );

    tl.fromTo(".center-bouquet-anim",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
      "-=1.0"
    );

    tl.fromTo(".save-date-anim",
      { opacity: 0, scale: 0.82, rotation: -22 },
      { opacity: 1, scale: 1, rotation: -12, duration: 1.0, ease: "back.out(1.7)" },
      "-=0.8"
    );

    tl.fromTo(".couple-names-anim",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
      "-=0.8"
    );

    tl.fromTo(".invite-body-anim",
      { opacity: 0, y: 20 },
      { opacity: 0.9, y: 0, duration: 1.0, ease: "power2.out" },
      "-=0.8"
    );

    tl.fromTo(".location-text-anim",
      { opacity: 0, y: 15 },
      { opacity: 0.75, y: 0, duration: 1.0, ease: "power2.out" },
      "-=0.8"
    );

  }, { scope: invitationRef });

  // 2. GSAP animations for Venue section
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: venueRef.current,
        start: "top 90%",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".venue-flowers-tl-anim",
      { opacity: 0, x: -35, y: -35 },
      { opacity: 1, x: 0, y: 0, duration: 1.4, ease: "power2.out" }
    );

    tl.fromTo(".venue-title-anim",
      { opacity: 0, x: 25 },
      { opacity: 1, x: 0, duration: 1.0, ease: "power2.out" },
      "-=1.0"
    );

    tl.fromTo(".venue-text-anim",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
      "-=0.9"
    );

    tl.fromTo(".venue-link-anim",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
      "-=0.8"
    );

  }, { scope: venueRef });

  return (
    <div className="w-full flex flex-col">
      {/* ==================== INVITATION SECTION ==================== */}
      <section
        ref={invitationRef}
        className="@container relative w-full min-h-screen bg-[#fbf4e6] "
      >
        {/* ==================== TOP HALF: CREAM BACKGROUND ==================== */}
        <div className="absolute top-0 left-0 w-full h-[50%] bg-[#fbf4e6] flex flex-col items-center pt-[5cqi] z-0">
          {/* Top Lord Ganesha Icon Drawing */}
          <div className="relative w-[20cqi] h-[20cqi] opacity-0 ganesh-ji-anim">
            <Image
              src={`${inviteBase}/ganesh%20ji.svg`}
              alt="Lord Ganesha"
              fill
              className="object-contain pointer-events-none select-none"
            />
          </div>

          {/* Invitation Header Text */}
          <div className="flex flex-col items-center text-center mt-[2.5cqi] md:mt-[0] px-[4cqi] text-[#590A2E] font-serif tracking-[0.16em] opacity-0 header-text-anim">
            <span className="text-[2cqi] uppercase font-bold tracking-[0.2em] leading-normal">
              You are invited to be a guest at
            </span>
            <span className="text-[2.2cqi] uppercase font-bold tracking-[0.25em] leading-normal mt-[0.5cqi] ">
              Our Wedding Ceremony
            </span>
          </div>
        </div>

        {/* ==================== BOTTOM HALF: PLUM BACKGROUND ==================== */}
        <div className="absolute bottom-[-3px] left-0 w-full h-[calc(50%+3px)] bg-[#590A2E] rounded-t-[50%_30%] z-10 shadow-[0_-8px_30px_rgba(0,0,0,0.25)] overflow-hidden plum-bg-anim">
          {/* Sparkles Glitter Overlay */}
          <div className="absolute inset-0 w-full h-full opacity-[0.28] pointer-events-none select-none z-0">
            <Image
              src={`${inviteBase}/sparkles.svg`}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* ==================== CENTRAL OVAL PORTRAIT AREA ==================== */}
        {/* Left Side Flower Branch */}
        <div className="absolute left-[1%] top-[20%] w-[40%] h-[40%] md:w-[30%] md:h-[30%] md:left-[10%] md:top-[24%] z-10 pointer-events-none select-none opacity-0 side-branch-left-anim">
          <Image
            src={`${inviteBase}/side-flowers.png`}
            alt=""
            fill
            className="object-contain w-full"
          />
        </div>

        {/* Right Side Flower Branch */}
        <div className="absolute right-[1%] top-[20%] w-[40%] h-[40%] md:w-[30%] md:h-[30%] md:right-[10%] md:top-[24%] z-10 pointer-events-none select-none opacity-0 side-branch-right-anim">
          <Image
            src={`${inviteBase}/side-flowers.png`}
            alt=""
            fill
            className="object-contain w-full h-full"
          />
        </div>

        {/* Central Oval Photo Frame */}
        <div className="absolute left-[50%] translate-x-[-50%] top-[24%] w-[53cqi] md:w-[40cqi] aspect-[1/1.27] rounded-[50%] border-[5px] border-[#590A2E] bg-[radial-gradient(circle_at_center,_#fff8e7_0%,_#f5d59c_60%,_#a24430_100%)] overflow-hidden shadow-2xl z-20 opacity-0 oval-frame-anim">
          <Image
            src={`${inviteBase}/couple-2.png`}
            alt="Wedding Couple"
            fill
            className="object-cover pointer-events-none select-none"
            priority
          />
        </div>

        {/* Center Flower Bouquet covering bottom edge of the oval */}
        <div className="absolute left-[50%] translate-x-[-50%] top-[30%] md:top-[33%] w-[50%] md:w-[44%] h-[50%] md:h-[44%] z-30 pointer-events-none select-none opacity-0 center-bouquet-anim">
          <Image
            src={`${inviteBase}/center-flower.png`}
            alt="Floral Bouquet"
            fill
            className="object-contain"
          />
        </div>

        {/* ==================== PLUM BOTTOM OVERLAY CONTENT ==================== */}
        {/* Names & Save the Date Row */}
        <div className="absolute left-[14%] top-[60%] flex items-center justify-center gap-[4cqi] z-20">
          {/* Tilted "Save the Date" text with decorative hearts */}
          <div
            className="relative flex flex-col items-center justify-center rotate-[-12deg] leading-none text-[#ffed96] select-none opacity-0 save-date-anim"
            style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.3)" }}
          >
            <div className="absolute left-[-2.5cqi] top-[-1.5cqi] flex gap-[0.5cqi] rotate-[10deg]">
              <span className="text-[2.2cqi] text-white/95">♥</span>
              <span className="text-[1.6cqi] text-white/70 rotate-[-20deg]">♥</span>
            </div>

            <span
              className="font-alex-brush text-[4.8cqi] leading-none"
              style={{ fontFamily: "var(--font-alex-brush), cursive" }}
            >
              Save
            </span>
            <span
              className="font-sans text-[1.6cqi] tracking-[0.2em] uppercase leading-none my-[0.3cqi] opacity-80"
              style={{ fontFamily: "var(--font-arimo), sans-serif" }}
            >
              the
            </span>
            <span
              className="font-alex-brush text-[5.2cqi] leading-none"
              style={{ fontFamily: "var(--font-alex-brush), cursive" }}
            >
              Date
            </span>
          </div>
        </div>

        <div className="w-full absolute left-[0] top-[57%] z-20 mt-20 text-center opacity-0 couple-names-anim">
          <h2
            className="w-full font-alex-brush text-[2.7rem] leading-none text-[#fff8e7] tracking-wider mx-auto"
            style={{
              fontFamily: "var(--font-alex-brush), cursive",
              textShadow: "1px 2px 4px rgba(0,0,0,0.4)"
            }}
          >
            Our Story
          </h2>
        </div>

        {/* Invite Text Block */}
        <div className="absolute left-[6%] right-[6%] top-[76%] text-center z-20 opacity-0 invite-body-anim">
          <p
            className="text-[3.2cqi] leading-[1.5] font-medium text-[#fff8e7] tracking-wide"
            style={{
              fontFamily: "var(--font-arimo), sans-serif",
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
            }}
          >
            Your presence at our wedding truly meant the world to us. Thank you for joining us in creating unforgettable memories. We are incredibly grateful.
          </p>
        </div>

        {/* Address Location Text Block */}
        <div className="absolute left-[6%] right-[6%] top-[88%] text-center z-20 opacity-0 location-text-anim">
          <p
            className="text-[2.8cqi] text-[#fff8e7] tracking-wider uppercase font-medium"
            style={{
              fontFamily: "var(--font-arimo), sans-serif",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
            }}
          >
            123 Anywhere St., Any City
          </p>
        </div>
      </section>

      {/* ==================== VENUE SECTION ==================== */}
      <section
        ref={venueRef}
        className="@container relative z-20 w-full min-h-screen bg-[#590A2E] flex flex-col justify-start py-[12cqi] px-[6cqi] -mt-[3px]"
      >
        {/* Layer 1: Top-Left Floral Corner Graphic Overlay */}
        <div className="absolute top-[-23%] left-[-33%] w-[100%] h-[55%] z-0 overflow-hidden pointer-events-none select-none opacity-0 venue-flowers-tl-anim">
          <Image
            src="/Wedding-card-2/Venue-section/Flower.svg"
            alt=""
            fill
            className="object-cover object-left-top"
            style={{ transform: "scaleY(1.05)", transformOrigin: "top" }}
            priority
          />
        </div>

        {/* Layer 3: Heading "The Venue" (Top Right) */}
        <div className="absolute w-full top-[30%] z-10 text-right opacity-0 venue-title-anim">
          <h1
            className="w-full text-center font-alex-brush text-[4rem] text-white tracking-wider"
            style={{
              fontFamily: "var(--font-alex-brush), cursive",
              textShadow: "1px 1px 3px rgba(0,0,0,0.3)",

            }}
          >
            The Venue
          </h1>
        </div>

        {/* Layer 4: Central Venue details */}
        <div className="absolute top-[50%] left-0 right-0 z-10 flex flex-col items-center justify-center text-center opacity-0 venue-text-anim">
          {/* Venue Name */}
          <h2
            className="font-sans text-[7.5cqi] font-normal text-white tracking-[0.25em] uppercase leading-tight"
            style={{ fontFamily: "var(--font-arimo), sans-serif" }}
          >
            KK BANQUET
            <br />
            HALL
          </h2>

          {/* Marriage Callout */}
          <p
            className="font-sans text-[2.6cqi] font-normal text-white tracking-[0.22em] uppercase mt-[7.5cqi] leading-relaxed"
            style={{ fontFamily: "var(--font-arimo), sans-serif" }}
          >
            INVITE YOU TO
            <br />
            CELEBRATE OUR MARRIAGE
          </p>

          {/* Date */}
          <h3
            className="font-sans text-[6.2cqi] font-bold text-white tracking-[0.12em] mt-[8.5cqi]"
            style={{ fontFamily: "var(--font-arimo), sans-serif" }}
          >
            28.06.28
          </h3>

          {/* Address */}
          <p
            className="font-sans text-[2.8cqi] font-normal text-white tracking-[0.16em] uppercase mt-[4cqi] px-[8cqi] leading-relaxed"
            style={{ fontFamily: "var(--font-arimo), sans-serif" }}
          >
            PILIKOTHI, HALDWANI, UTTARAKHAND, INDIA
          </p>
        </div>

        {/* Layer 5: Interactive Directions Link */}
        <div className="absolute bottom-[10%] left-0 right-0 z-10 flex justify-center opacity-0 venue-link-anim">
          <a
            href="https://maps.google.com/?q=KK+Banquet+Hall+Pilikothi+Haldwani"
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif italic text-[3.8cqi] text-white/90 hover:text-white tracking-[0.15em] transition-all duration-300 hover:scale-[1.05] border-b border-white/40 pb-0.5 uppercase"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Get Direction
          </a>
        </div>
      </section>

    </div>
  );
}
