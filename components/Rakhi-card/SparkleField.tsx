"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * SparkleField — 5 tiny gold dust/sparkle dots that drift upward
 * continuously in the background (ambient layer).
 *
 * These run indefinitely at very low opacity so they never distract
 * from the main content, but make the hero feel alive.
 */

interface Sparkle {
  id: number;
  left: string;
  startY: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const SPARKLES: Sparkle[] = [
  { id: 0, left: "15%", startY: "75%", size: 4, duration: 5.5, delay: 0, opacity: 0.5 },
  { id: 1, left: "35%", startY: "85%", size: 3, duration: 7.0, delay: 1.2, opacity: 0.4 },
  { id: 2, left: "58%", startY: "70%", size: 5, duration: 6.2, delay: 0.6, opacity: 0.35 },
  { id: 3, left: "75%", startY: "80%", size: 3, duration: 8.0, delay: 2.1, opacity: 0.45 },
  { id: 4, left: "88%", startY: "65%", size: 4, duration: 5.8, delay: 1.5, opacity: 0.4 },
];

function StarShape({ size }: { size: number }) {
  const s = size;
  return (
    <svg width={s * 2} height={s * 2} viewBox={`0 0 ${s * 2} ${s * 2}`} aria-hidden="true">
      {/* 4-pointed sparkle */}
      <path
        d={`M${s} 0 L${s + 1} ${s - 1} L${s * 2} ${s} L${s + 1} ${s + 1} L${s} ${s * 2} L${s - 1} ${s + 1} L0 ${s} L${s - 1} ${s - 1} Z`}
        fill="var(--rakhi-gold)"
      />
    </svg>
  );
}

export function SparkleField() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {SPARKLES.map((sp) => (
        <motion.div
          key={sp.id}
          className="absolute"
          style={{ left: sp.left, top: sp.startY }}
          animate={{
            y: [0, -180, -360],
            opacity: [0, sp.opacity, sp.opacity * 0.6, 0],
            scale: [0.5, 1, 0.8, 0.3],
          }}
          transition={{
            duration: sp.duration,
            repeat: Infinity,
            ease: "linear",
            delay: sp.delay,
            times: [0, 0.2, 0.7, 1],
          }}
        >
          <StarShape size={sp.size} />
        </motion.div>
      ))}
    </div>
  );
}
