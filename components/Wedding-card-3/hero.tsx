"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Import SVGs statically for Next.js image optimization
import CenterWreath from "./Hero-section-resources/Center-flower-frame.svg";
import TopFlower from "./Hero-section-resources/Top-flower.svg";
import BottomFlower from "./Hero-section-resources/bottom-flower.svg";
import CoupleImage from "./Hero-section-resources/Couple.svg";

export default function Hero() {
    return (
        <section
            className=" relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden p-6 select-none"
            style={{
                background: "radial-gradient(circle at center, #FFFDFE 0%, #FFECEF 100%)",
                color: "#96390F",
            }}
        >
            {/* ────────────────── CORNER FLOWERS ────────────────── */}

            {/* Top Left Bouquet */}
            <motion.div
                className="absolute -top-[11%] -left-[13%] w-[45cqi] h-[60cqi] z-10 pointer-events-none"
                initial={{ x: -80, y: -80, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <Image
                    src={TopFlower}
                    alt="Top Left Flower Frame"
                    fill
                    priority
                    className="object-contain"
                />
            </motion.div>

            {/* Top Right Bouquet (Flipped) */}
            <motion.div
                className="absolute -top-[11%] -right-[13%] w-[45cqi] h-[60cqi] z-10 pointer-events-none"
                initial={{ x: 80, y: -80, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="relative w-full h-full scale-x-[-1]">
                    <Image
                        src={TopFlower}
                        alt="Top Right Flower Frame"
                        fill
                        priority
                        className="object-contain"
                    />
                </div>
            </motion.div>

            {/* Bottom Left Bouquet (Flipped) */}
            <motion.div
                className="absolute -bottom-[6%] -left-[9%] w-[60cqi] h-[100cqi] z-10 pointer-events-none"
                initial={{ x: -80, y: 80, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="relative w-full h-full scale-x-[-1]">
                    <Image
                        src={BottomFlower}
                        alt="Bottom Left Flower Frame"
                        fill
                        priority
                        className="object-contain"
                    />
                </div>
            </motion.div>

            {/* Bottom Right Bouquet  */}
            <motion.div
                className="absolute -bottom-[6%] -right-[9%] w-[60cqi] h-[100cqi] z-10 pointer-events-none"
                initial={{ x: 80, y: 80, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="relative w-full h-full">
                    <Image
                        src={BottomFlower}
                        alt="Bottom Right Flower Frame"
                        fill
                        priority
                        className="object-contain"
                    />
                </div>
            </motion.div>

            {/* ────────────────── CONTENT OVERLAY ────────────────── */}

            {/* Top Banner Text */}
            <motion.div
                className="z-20 mt-[2vh] text-center"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
            >
                <span
                    className="text-[3.2cqi] tracking-[0.25em] uppercase font-medium opacity-80"
                    style={{ fontFamily: "var(--font-display), serif" }}
                >
                    Tap Anywhere
                </span>
            </motion.div>

            {/* Center Wreath & Cursive Names */}
            <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full mt-6">
                {/* Wreath Image Container */}
                <motion.div
                    className="absolute top-[-13%] right-[-20%] w-[125cqi] aspect-square flex items-center justify-center"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                    {/* Slow Rotating Wreath Decoration */}
                    <motion.div
                        className="absolute inset-0 w-full h-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 150 }}
                    >
                        <Image
                            src={CenterWreath}
                            alt="Flower Wreath"
                            fill
                            priority
                            className="object-contain pointer-events-none select-none"
                        />
                    </motion.div>

                    {/* Names inside the wreath - static */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pb-2">
                        <motion.h1
                            className="text-[12cqi] leading-none font-thin select-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
                            style={{ fontFamily: "var(--font-script)" }}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                        >
                            Daniel
                        </motion.h1>

                        <motion.span
                            className="text-[7cqi] font-normal leading-normal my-[0.5cqi] select-none opacity-90 drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]"
                            style={{ fontFamily: "var(--font-script)" }}
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
                        >
                            weds
                        </motion.span>

                        <motion.h1
                            className="text-[12cqi] leading-none font-normal select-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
                            style={{ fontFamily: "var(--font-script)" }}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.7 }}
                        >
                            Maria
                        </motion.h1>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Text & Date Details */}
            <motion.div
                className="absolute top-[60%] right-[0%] z-20 w-full flex flex-col items-center text-center px-4 mb-[4vh]"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1 }}
            >
                {/* Quote / Subtitle */}
                <p
                    className="text-[3.6cqi] leading-relaxed max-w-[85%] font-normal italic opacity-95 mb-2"
                >
                    Wishing you a lifetime of love and happiness as you embark on this beautiful journey together
                </p>

                {/* Couple Image with floating hearts */}
                <div className="relative w-[38cqi] aspect-square my-2 z-20">
                    {/* Left Heart */}
                    <motion.div
                        className="absolute left-[-20%] top-[14%] z-20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 180, damping: 11, delay: 1.4 }}
                    >
                        <motion.div
                            animate={{
                                y: [0, -6, 0],
                                rotate: [-12, -7, -12]
                            }}
                            transition={{
                                duration: 4.2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <HeartLeft />
                        </motion.div>
                    </motion.div>

                    {/* Left Tiny Heart */}
                    <motion.div
                        className="absolute left-[-40%] top-[45%] z-20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 180, damping: 11, delay: 1.8 }}
                    >
                        <motion.div
                            animate={{
                                y: [0, 4, 0],
                                rotate: [15, 20, 15]
                            }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <HeartSmall className="w-[5.5cqi] h-[5.5cqi]" />
                        </motion.div>
                    </motion.div>

                    <Image
                        src={CoupleImage}
                        alt="Couple Illustration"
                        fill
                        priority
                        className="object-contain pointer-events-none select-none"
                    />

                    {/* Right Heart */}
                    <motion.div
                        className="absolute right-[-42%] top-[10%] z-20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 180, damping: 11, delay: 1.6 }}
                    >
                        <motion.div
                            animate={{
                                y: [0, 6, 0],
                                rotate: [12, 17, 12]
                            }}
                            transition={{
                                duration: 4.8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <HeartRight />
                        </motion.div>
                    </motion.div>

                    {/* Right Tiny Heart */}
                    <motion.div
                        className="absolute right-[-28%] top-[50%] z-20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 180, damping: 11, delay: 2.0 }}
                    >
                        <motion.div
                            animate={{
                                y: [0, -4, 0],
                                rotate: [-10, -5, -10]
                            }}
                            transition={{
                                duration: 3.8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <HeartSmall className="w-[5.5cqi] h-[5.5cqi]" />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

        </section>
    );
}


const HeartLeft = () => (
    <svg viewBox="0 0 64 64" fill="currentColor" className="w-[8cqi] h-[8cqi] text-[#9B4B32] opacity-85 select-none pointer-events-none">
        {/* Single organic outline heart */}
        <path
            d="M32,54 C24,46.5 12,36.5 12,24 C12,15 19,9 28,12 C30.5,13 31.5,14.5 32,15.5 C32.5,14.5 33.5,13 36,12 C45,9 52,15 52,24 C52,36.5 40,46.5 32,54 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const HeartRight = () => (
    <svg viewBox="0 0 64 64" fill="currentColor" className="w-[10cqi] h-[10cqi] text-[#9B4B32] opacity-85 select-none pointer-events-none">
        {/* Interlocking/double organic outline hearts */}
        {/* Main Heart */}
        <path
            d="M24,44 C18,37.8 9,29.5 9,19.2 C9,11.8 14.5,6.8 21,9.3 C23,10.1 23.8,11.3 24,12.1 C24.2,11.3 25,10.1 27,9.3 C33.5,6.8 39,11.8 39,19.2 C39,29.5 30,37.8 24,44 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        {/* Secondary Smaller Heart overlapping on the right */}
        <path
            d="M40,48 C36,44.2 30,38.8 30,31.7 C30,26.5 33.6,23 38,24.8 C39.3,25.3 39.8,26.2 40,26.7 C40.2,26.2 40.7,25.3 42,24.8 C46.4,23 50,26.5 50,31.7 C50,38.8 44,44.2 40,48 Z"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const HeartSmall = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 64 64" fill="currentColor" className={`text-[#9B4B32] opacity-80 select-none pointer-events-none ${className}`}>
        {/* Simple small organic outline heart */}
        <path
            d="M32,54 C24,46.5 12,36.5 12,24 C12,15 19,9 28,12 C30.5,13 31.5,14.5 32,15.5 C32.5,14.5 33.5,13 36,12 C45,9 52,15 52,24 C52,36.5 40,46.5 32,54 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
