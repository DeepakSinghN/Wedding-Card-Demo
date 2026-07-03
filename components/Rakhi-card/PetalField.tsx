"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * PetalField — renders 5 marigold petal SVGs that drift in from the
 * edges of the hero during the entrance sequence (0.8s mark) and then
 * idle-float continuously, giving the scene a living, festive feel.
 *
 * The GSAP timeline in Hero.tsx fades these in; motion handles the
 * infinite idle float afterward via animate + repeat: Infinity.
 */

interface Petal {
  id: number;
  /** Starting x (% of container width) */
  fromX: string;
  /** Starting y (% of container height) */
  fromY: string;
  /** Final resting x (%) */
  toX: string;
  /** Final resting y (%) */
  toY: string;
  /** Idle float amplitude y (px) */
  floatY: number;
  /** Idle float amplitude x (px) */
  floatX: number;
  /** Idle float duration */
  floatDuration: number;
  /** Initial rotation */
  rotation: number;
  /** Idle rotation amplitude */
  rotAmp: number;
  /** Scale */
  scale: number;
  /** Color variant */
  color: "gold" | "saffron" | "maroon";
  delay: number;
}

const PETALS: Petal[] = [
  { id: 0, fromX: "-10%", fromY: "10%", toX: "6%", toY: "22%", floatY: 6, floatX: 3, floatDuration: 3.4, rotation: 30, rotAmp: 8, scale: 0.9, color: "gold", delay: 0 },
  { id: 1, fromX: "110%", fromY: "8%", toX: "88%", toY: "18%", floatY: 8, floatX: -4, floatDuration: 4.1, rotation: -20, rotAmp: -10, scale: 0.8, color: "saffron", delay: 0.12 },
  { id: 2, fromX: "-5%", fromY: "55%", toX: "8%", toY: "62%", floatY: 5, floatX: 4, floatDuration: 3.8, rotation: 50, rotAmp: 6, scale: 0.7, color: "maroon", delay: 0.06 },
  { id: 3, fromX: "105%", fromY: "50%", toX: "85%", toY: "58%", floatY: 7, floatX: -3, floatDuration: 4.5, rotation: -40, rotAmp: -7, scale: 0.85, color: "gold", delay: 0.18 },
  { id: 4, fromX: "48%", fromY: "-5%", toX: "46%", toY: "8%", floatY: 9, floatX: 2, floatDuration: 3.2, rotation: 15, rotAmp: 12, scale: 0.75, color: "saffron", delay: 0.09 },
];

const FILL: Record<string, string> = {
  gold: "var(--rakhi-gold)",
  saffron: "var(--rakhi-saffron)",
  maroon: "var(--rakhi-maroon)",
};

function MarigoldPetal({
  fill,
  scale,
}: {
  fill: string;
  scale: number;
}) {
  return (
    <svg
      width={32 * scale}
      height={38 * scale}
      viewBox="0 0 32 38"
      fill="none"
      aria-hidden="true"
    >
      {/* Marigold petal — teardrop shape */}
      <ellipse cx="16" cy="22" rx="8" ry="14" fill={fill} opacity="0.88" />
      <ellipse cx="16" cy="10" rx="5" ry="8" fill={fill} opacity="0.7" />
      {/* Vein */}
      <line
        x1="16" y1="6"
        x2="16" y2="34"
        stroke="white"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export function PetalField() {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {PETALS.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: p.toX, top: p.toY, rotate: p.rotation }}
          /* Start invisible; GSAP entrance timeline will fade in.
             motion handles the idle float loop afterward. */
          initial={{ opacity: 0, x: p.fromX, y: p.fromY, rotate: p.rotation - 20 }}
          animate={
            prefersReduced
              ? { opacity: 0.7 }
              : {
                  opacity: [0.6, 0.85, 0.6],
                  y: [0, -p.floatY, 0],
                  x: [0, p.floatX, 0],
                  rotate: [p.rotation, p.rotation + p.rotAmp, p.rotation],
                }
          }
          transition={
            prefersReduced
              ? { duration: 0.5 }
              : {
                  duration: p.floatDuration,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: p.delay,
                }
          }
        >
          <MarigoldPetal fill={FILL[p.color]} scale={p.scale} />
        </motion.div>
      ))}
    </div>
  );
}
