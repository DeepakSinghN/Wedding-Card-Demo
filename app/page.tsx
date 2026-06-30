"use client";

import React, { useState } from "react";
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

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <main className="w-full min-h-screen bg-[#FAF4EF] flex flex-col items-center relative">
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


      {/* Falling Flower Petals Overlay */}
      <FlowerPetals />
    </main>
  );
}
