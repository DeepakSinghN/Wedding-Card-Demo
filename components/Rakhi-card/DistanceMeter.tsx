"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface CityData {
  name: string;
  photo: string;
}

interface DistanceMeterProps {
  fromCity?: CityData;
  toCity?: CityData;
  distanceKm?: number;
}

const DEFAULT_FROM = { name: "Mumbai", photo: "/Rakhi-card-media/photo-1.webp" };
const DEFAULT_TO = { name: "Toronto", photo: "/Rakhi-card-media/photo-2.jpg" };
const DEFAULT_DISTANCE = 12480;

export default function DistanceMeter({
  fromCity = DEFAULT_FROM,
  toCity = DEFAULT_TO,
  distanceKm = DEFAULT_DISTANCE,
}: DistanceMeterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const traveledPathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGSVGElement>(null);
  const trail1Ref = useRef<SVGSVGElement>(null);
  const trail2Ref = useRef<SVGSVGElement>(null);

  const [displayValue, setDisplayValue] = useState(0);
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  // Format counter value (e.g. 12,480)
  const formattedDistance = displayValue.toLocaleString();

  // ── Heart Icon Pulsing ────────────────────────────────────────────────────
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.fromTo(
      ".pulse-heart-icon",
      { scale: 1 },
      {
        scale: 1.25,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }
    );
  }, { scope: containerRef, dependencies: [] });


  // ── Scroll Trigger & Main Animation Timeline ─────────────────────────────
  useGSAP(() => {
    if (!containerRef.current || !pathRef.current || !traveledPathRef.current) return;

    const path = pathRef.current;
    const traveledPath = traveledPathRef.current;
    const totalLength = path.getTotalLength();

    // 1. Initial Path Setup (Invisible path via stroke offsets)
    gsap.set([path, traveledPath], {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
      opacity: 1,
    });

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Direct completed state fallback for reduced motion
      gsap.set([path, traveledPath], { strokeDashoffset: 0 });
      gsap.set(planeRef.current, { opacity: 0.8, x: 420, y: 160, rotation: 12 });
      setDisplayValue(distanceKm);
      return;
    }

    // 2. Build Master Timeline
    const tl = gsap.timeline({ paused: true });

    // Step A: Path Draw-In
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power2.inOut",
    });

    // Step B: Plane & Trails Flight Sequence (flying along the curved arc)
    tl.addLabel("flight", "-=0.2");

    // Traveled path colored reveal in sync with plane
    tl.to(
      traveledPath,
      {
        strokeDashoffset: 0,
        duration: 2.0,
        ease: "power1.inOut",
      },
      "flight"
    );

    // Primary Plane flight path tween
    tl.to(
      planeRef.current,
      {
        motionPath: {
          path: path,
          align: path,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
        duration: 2.0,
        ease: "power1.inOut",
      },
      "flight"
    );

    // Trail 1 flight offset
    tl.to(
      trail1Ref.current,
      {
        motionPath: {
          path: path,
          align: path,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
        duration: 2.0,
        ease: "power1.inOut",
      },
      "flight+=0.06"
    );

    // Trail 2 flight offset
    tl.to(
      trail2Ref.current,
      {
        motionPath: {
          path: path,
          align: path,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
        duration: 2.0,
        ease: "power1.inOut",
      },
      "flight+=0.12"
    );

    // Opacity fades during flight start
    tl.fromTo(
      [planeRef.current, trail1Ref.current, trail2Ref.current],
      { opacity: 0 },
      {
        opacity: (index) => (index === 0 ? 0.95 : index === 1 ? 0.4 : 0.18),
        duration: 0.25,
      },
      "flight"
    );

    // Fade out trails as plane approaches the landing pin
    tl.to(
      [trail1Ref.current, trail2Ref.current],
      {
        opacity: 0,
        duration: 0.2,
      },
      "flight+=1.7"
    );

    // Settle plane scale on landing
    tl.fromTo(
      planeRef.current,
      { scale: 1 },
      {
        scale: 0.85,
        opacity: 0.8,
        duration: 0.3,
        ease: "back.out(1.5)",
      },
      "flight+=1.8"
    );

    // Step C: Counter Digit Tick-Up (starts midway through flight)
    const counterObj = { value: 0 };
    tl.to(
      counterObj,
      {
        value: distanceKm,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          setDisplayValue(Math.round(counterObj.value));
        },
      },
      "flight+=0.4"
    );

    setTimeline(tl);

    // ScrollTrigger viewport gate
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 70%",
      once: true,
      onEnter: () => tl.play(),
    });
  }, { scope: containerRef, dependencies: [distanceKm] });

  // ── Replay Trigger ────────────────────────────────────────────────────────
  const handleReplay = () => {
    if (!timeline) return;
    timeline.restart();
  };

  const skipRender = fromCity.name.toLowerCase() === toCity.name.toLowerCase() || distanceKm <= 0;
  if (skipRender) return null;

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full py-20 px-6 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#FFF8F0" }}
    >
      <div className="w-full max-w-[500px] flex flex-col items-center select-none text-center">

        {/* Caption Header */}
        <p
          className="text-stone-700/80 text-[1.4rem] italic mb-10 font-normal scroll-animate-text"
          style={{ fontFamily: "var(--font-crimson-pro), serif" }}
        >
          Miles apart, always close in heart
        </p>

        {/* Illustrated Map Area */}
        <div className="map-area-container relative w-full aspect-[2/1] border border-amber-800/10 rounded-2xl bg-amber-50/20 p-2 shadow-inner overflow-hidden mb-12">

          {/* Stationary Clouds Layer */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {/* Top Left Cloud */}
            <div className="absolute top-[8%] left-[10%] w-24 h-24 opacity-25">
              <Image src="/Rakhi-card-media/clouds.svg" alt="Cloud" fill className="object-contain" />
            </div>
            {/* Middle Right Cloud */}
            <div className="absolute top-[22%] right-[8%] w-32 h-32 opacity-[0.15]">
              <Image src="/Rakhi-card-media/clouds.svg" alt="Cloud" fill className="object-contain" />
            </div>
            {/* Center Top Cloud */}
            <div className="absolute top-[1%] left-[50%] w-20 h-20 opacity-[0.35]">
              <Image src="/Rakhi-card-media/clouds.svg" alt="Cloud" fill className="object-contain" />
            </div>
          </div>

          {/* SVG Map Backdrop (clouds, mountains squiggles, curved path) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <svg viewBox="0 0 500 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Hand-drawn ink terrain squiggles */}
              <path d="M 30,220 Q 70,185 110,220 T 190,220" stroke="#7A1F3D" strokeWidth="0.6" opacity="0.12" />
              <path d="M 310,220 Q 350,190 390,220 T 470,220" stroke="#7A1F3D" strokeWidth="0.6" opacity="0.12" />
              <path d="M 120,230 Q 150,210 180,230" stroke="#F5A623" strokeWidth="0.6" opacity="0.15" />

              {/* Dotted Cloud Doodle */}
              <path d="M 210,65 Q 225,50 245,55 Q 265,50 280,65 Q 295,65 290,80 H 200 Q 195,65 210,65 Z" stroke="#F5A623" strokeWidth="0.5" opacity="0.12" />
              <path d="M 60,70 Q 70,60 85,63 Q 95,60 105,70 H 55 Z" stroke="#7A1F3D" strokeWidth="0.5" opacity="0.1" />

              {/* Curved Flight Path SVG Arc (M 80,160 -> Q 250,50 -> 420,160) */}
              <path
                ref={pathRef}
                d="M 80,160 Q 250,50 420,160"
                stroke="#F5A623"
                strokeWidth="1.8"
                strokeDasharray="6 6"
                opacity="0" // Set to 0 initially, animated via GSAP
              />
              {/* Traveled colored path */}
              <path
                ref={traveledPathRef}
                d="M 80,160 Q 250,50 420,160"
                stroke="#7A1F3D"
                strokeWidth="2.2"
                strokeDasharray="6 6"
                opacity="0" // Set to 0 initially, animated via GSAP
              />
            </svg>
          </div>

          {/* Sibling Pins (Layered over the SVG coordinate grid) */}

          {/* FROM marker pin (left side) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
            className="absolute flex flex-col items-center z-30"
            style={{
              left: "6%", // maps to x: 80
              top: "64%",  // maps to y: 160
              transform: "translate(-50%, -90%)", // center the pin bottom point
            }}
          >
            {/* Location Icon SVG Pin */}
            <div className="relative w-14 h-14 drop-shadow-md select-none pointer-events-none">
              <Image
                src="/Rakhi-card-media/Location-icon.svg"
                alt="Location Pin"
                fill
                className="object-contain"
              />
              {/* Sibling Circular Photo (positioned in the white circle) */}
              <div
                className="absolute overflow-hidden rounded-full border border-[#7A1F3D]/10"
                style={{
                  top: "14%",
                  left: "35%",
                  width: "30%",
                  height: "30%",
                }}
              >
                <Image
                  src={fromCity.photo}
                  alt={fromCity.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* City Label */}
            <p
              className="text-[1.2rem] text-stone-700 mt-2 font-normal whitespace-nowrap"
              style={{ fontFamily: "var(--font-dancing, cursive)" }}
            >
              {fromCity.name}
            </p>
          </motion.div>

          {/* TO marker pin (right side) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.18 }}
            className="absolute flex flex-col items-center z-30"
            style={{
              left: "84%", // maps to x: 420
              top: "64%",  // maps to y: 160
              transform: "translate(-50%, -90%)", // center the pin bottom point
            }}
          >
            {/* Location Icon SVG Pin */}
            <div className="relative w-14 h-14 drop-shadow-md select-none pointer-events-none">
              <Image
                src="/Rakhi-card-media/Location-icon.svg"
                alt="Location Pin"
                fill
                className="object-contain"
              />
              {/* Sibling Circular Photo (positioned in the white circle) */}
              <div
                className="absolute overflow-hidden rounded-full border border-[#7A1F3D]/10"
                style={{
                  top: "14%",
                  left: "35%",
                  width: "30%",
                  height: "30%",
                }}
              >
                <Image
                  src={toCity.photo}
                  alt={toCity.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* City Label */}
            <p
              className="text-[1.2rem] text-stone-700 mt-2 font-normal whitespace-nowrap"
              style={{ fontFamily: "var(--font-dancing, cursive)" }}
            >
              {toCity.name}
            </p>
          </motion.div>

          {/* ✈ Paper Plane SVG & Faint Trails (Animated by GSAP MotionPath) */}

          {/* Trail 2 (Ghost 2) */}
          <svg
            ref={trail2Ref}
            viewBox="0 0 60 40"
            className="absolute w-[44px] h-[30px] opacity-0 pointer-events-none z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M54 20 L6 12 L24 22 Z" fill="#FFEFC2" opacity="0.3" stroke="#B38728" strokeWidth="0.5" />
            <path d="M54 20 L24 22 L20 34 Z" fill="#F5A623" opacity="0.3" stroke="#B38728" strokeWidth="0.5" />
            <path d="M54 20 L24 22 L6 12" stroke="#7A1F3D" strokeWidth="0.5" opacity="0.3" />
          </svg>

          {/* Trail 1 (Ghost 1) */}
          <svg
            ref={trail1Ref}
            viewBox="0 0 60 40"
            className="absolute w-[44px] h-[30px] opacity-0 pointer-events-none z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M54 20 L6 12 L24 22 Z" fill="#FFEFC2" opacity="0.55" stroke="#B38728" strokeWidth="0.5" />
            <path d="M54 20 L24 22 L20 34 Z" fill="#F5A623" opacity="0.55" stroke="#B38728" strokeWidth="0.5" />
            <path d="M54 20 L24 22 L6 12" stroke="#7A1F3D" strokeWidth="0.5" opacity="0.55" />
          </svg>

          {/* Primary Paper Plane */}
          <svg
            ref={planeRef}
            viewBox="0 0 60 40"
            className="absolute w-[44px] h-[30px] opacity-0 pointer-events-none z-20 drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Right wing */}
            <path d="M54 20 L6 12 L24 22 Z" fill="#FFEFC2" stroke="#B38728" strokeWidth="0.5" />
            {/* Left wing */}
            <path d="M54 20 L24 22 L20 34 Z" fill="#F5A623" stroke="#B38728" strokeWidth="0.5" />
            {/* Center crease line */}
            <path d="M54 20 L24 22 L6 12" stroke="#7A1F3D" strokeWidth="1" />
          </svg>
        </div>

        {/* Counter Card */}
        <div
          className="bg-white px-8 py-5 rounded-2xl flex flex-col items-center gap-1 shadow-[0_8px_30px_rgba(122,31,61,0.08)] border border-stone-100 max-w-[320px] w-full"
        >
          <p
            className="text-3xl font-black text-[#7A1F3D] tracking-tight"
            style={{ fontFamily: "var(--font-body, Poppins, sans-serif)" }}
          >
            {formattedDistance} km <span className="text-xl font-normal text-stone-500 font-sans">apart</span>
          </p>

          <div className="w-12 h-[1px] bg-amber-800/10 my-2" />

          <p
            className="text-[1.6rem] text-[#F5A623] font-semibold flex items-center justify-center gap-1.5"
            style={{ fontFamily: "var(--font-crimson-pro), serif" }}
          >
            0 km in heart
            <Heart className="pulse-heart-icon w-4 h-4 fill-current text-red-700" />
          </p>
        </div>

        {/* Replay Button */}
        <button
          onClick={handleReplay}
          className="mt-8 text-xs font-semibold text-amber-700/80 hover:text-amber-800 underline hover:no-underline font-sans cursor-pointer transition-colors"
        >
          ✈ Replay Path
        </button>

        {/* Section Divider Accent */}
        <div className="mt-16 text-amber-700/20 text-[10px] tracking-[0.8em] select-none" aria-hidden="true">
          ✦ ── ✦ ── ✦
        </div>
      </div>
    </section>
  );
}
