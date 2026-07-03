"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

/**
 * RakhiCharm — the decorative pendant/charm that drops in from above
 * at the 0.4s mark in the hero entrance timeline.
 *
 * Tap/click interaction: a spring-physics "swing" (like a real pendant
 * being nudged), then returns to rest.  Purely an easter egg.
 */
export function RakhiCharm() {
  const prefersReduced = useReducedMotion();
  const [swinging, setSwinging] = useState(false);

  const handleTap = () => {
    if (swinging) return;
    setSwinging(true);
    // Return to rest after the spring animation completes (~800ms)
    setTimeout(() => setSwinging(false), 800);
  };

  return (
    <motion.button
      onClick={handleTap}
      aria-label="Tap the rakhi charm for a surprise"
      /* initial position — GSAP drops this in from above (y: -120 → 0),
         so we start invisible; motion handles the swing easter egg */
      initial={{ opacity: 0, y: -120 }}
      className="flex items-center justify-center cursor-pointer bg-transparent border-0 p-2"
      style={{ minHeight: 44, minWidth: 44 }}
      // Tap feedback
      whileTap={prefersReduced ? {} : { scale: 0.92 }}
      animate={
        prefersReduced
          ? {}
          : swinging
          ? {
              rotate: [0, -18, 14, -8, 5, -2, 0],
              transition: {
                duration: 0.75,
                ease: "easeInOut",
              },
            }
          : { rotate: 0 }
      }
    >
      {/* Charm SVG — lotus + bell motif in maroon + gold */}
      <svg
        width="72"
        height="90"
        viewBox="0 0 72 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Suspension loop at top */}
        <path
          d="M36 4 C36 4 32 0 36 0 C40 0 36 4 36 4Z"
          fill="var(--rakhi-gold)"
        />
        <line
          x1="36" y1="0"
          x2="36" y2="12"
          stroke="var(--rakhi-thread-red)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Main circular charm body */}
        <circle cx="36" cy="46" r="28" fill="var(--rakhi-maroon)" />
        <circle
          cx="36" cy="46" r="28"
          stroke="var(--rakhi-gold)"
          strokeWidth="2"
          fill="none"
        />
        {/* Inner ring */}
        <circle
          cx="36" cy="46" r="22"
          stroke="var(--rakhi-gold)"
          strokeWidth="1"
          strokeDasharray="3 3"
          fill="none"
          opacity="0.6"
        />

        {/* Lotus petals (8-fold symmetry) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const px = 36 + Math.cos(angle) * 14;
          const py = 46 + Math.sin(angle) * 14;
          return (
            <ellipse
              key={i}
              cx={px}
              cy={py}
              rx={4}
              ry={7}
              fill="var(--rakhi-gold)"
              opacity="0.85"
              transform={`rotate(${i * 45 + 90}, ${px}, ${py})`}
            />
          );
        })}

        {/* Center jewel */}
        <circle cx="36" cy="46" r="7" fill="var(--rakhi-saffron)" />
        <circle cx="36" cy="46" r="4" fill="var(--rakhi-gold)" />
        <circle cx="34" cy="44" r="1.5" fill="white" opacity="0.7" />

        {/* Hanging bell */}
        <path
          d="M28 74 Q36 80 44 74"
          stroke="var(--rakhi-gold)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="36" cy="74" rx="8" ry="6" fill="var(--rakhi-gold)" />
        <ellipse cx="36" cy="80" rx="2.5" ry="2.5" fill="var(--rakhi-gold)" />
        {/* Bell slit */}
        <line
          x1="36" y1="72"
          x2="36" y2="78"
          stroke="var(--rakhi-maroon)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </motion.button>
  );
}
