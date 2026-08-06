"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./hero";
import SaveTheDate from "./SaveTheDate";
import Invitation from "./invitation";
import EventDetails from "./EventDetails";

export default function WeddingCardThreePage() {
  const [isRevealed, setIsRevealed] = useState(false);

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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full flex flex-col"
            >
              <SaveTheDate />
              <Invitation />
              <EventDetails />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
