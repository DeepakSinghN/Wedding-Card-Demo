"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./hero";
import SaveTheDate from "./SaveTheDate";
import Invitation from "./invitation";
import Collage from "./collage";
import EventDetails from "./EventDetails";
import RSVP from "./rsvp";
import Closing from "./Closing";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WeddingCardThreePage() {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (!isRevealed) return;

    const wrapper = document.getElementById("card-scroll-container");
    const content = document.getElementById("card-scroll-content");
    if (!wrapper || !content) return;

    const lenis = new Lenis({
      wrapper: wrapper,
      content: content,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      syncTouch: false, // Use native touch scroll on mobile for buttery smooth inertial scrolling
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    const updateScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", updateScroll);
    wrapper.addEventListener("scroll", updateScroll, { passive: true });
    
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      wrapper.removeEventListener("scroll", updateScroll);
      lenis.destroy();
    };
  }, [isRevealed]);

  return (
    <main className="w-full h-screen bg-[#96390f]/15 flex flex-col items-center justify-center overflow-hidden">
      <div
        id="card-scroll-container"
        className={`w-full max-w-[480px] h-full shadow-[0_0_60px_rgba(0,0,0,0.75)] relative bg-[#FFECEF] flex flex-col ${isRevealed ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden cursor-pointer"}`}
        onClick={() => {
          if (!isRevealed) {
            setIsRevealed(true);
          }
        }}
      >
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="hero"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full h-full"
            >
              <Hero />
            </motion.div>
          ) : (
            <motion.div
              key="revealed-content"
              id="card-scroll-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full flex flex-col"
            >
              <SaveTheDate />
              <Invitation />
              <Collage />
              <EventDetails />
              <RSVP />
              <Closing />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
