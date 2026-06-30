"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "../components/Hero";
import IntroStory from "../components/IntroStory";
import SaveTheDate from "../components/SaveTheDate";
import Countdown from "../components/Countdown";
import Gallery from "../components/Gallery";
import Venue from "../components/Venue";
import Festivities from "../components/Festivities";
import RSVP from "../components/RSVP";
import Footer from "../components/Footer";
import FloatingControls from "../components/FloatingControls";
import FlowerPetals from "../components/FlowerPetals";
import ScrollReveal from "../components/ScrollReveal";
import ShlokaLoader from "../components/ShlokaLoader";

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Lock scrolling initially for on-load screen
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.stop();
    }
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  const handleEnter = () => {
    setShowLoader(false);
    // Delay unlocking scroll to let the intro video fade off completely (2.0 seconds total)
    setTimeout(() => {
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.start();
      }
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }, 2000);
  };

  return (
    <main className="w-full min-h-screen bg-[#FAF4EF] flex flex-col items-center relative">
      <AnimatePresence>
        {showLoader && <ShlokaLoader onEnter={handleEnter} />}
      </AnimatePresence>

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Intro Story Section */}
      <ScrollReveal animation="fade-in" duration={1.2} className="w-full h-screen">
        <IntroStory />
      </ScrollReveal>

      {/* 3. Save the Date Section */}
      <SaveTheDate onAllRevealed={() => setIsRevealed(true)} />

      {/* 4. Dedicated Countdown Section */}
      <Countdown active={isRevealed} />

      {/* 5. Interactive Stacking Gallery Section */}
      <Gallery />

      {/* 6. Cinematic Parallax Venue Section */}
      <Venue />

      {/* 7. Festivities Section */}
      <Festivities />

      {/* 8. Royal Seal RSVP Section */}
      <RSVP />

      {/* 9. Bollywood Romance Footer */}
      <Footer />

      {/* Floating Audio Controls & CTA Buttons */}
      <FloatingControls />

      {/* Falling Flower Petals Overlay */}
      <FlowerPetals />
    </main>
  );
}
