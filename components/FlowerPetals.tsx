"use client";

import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: string;
  size: number;
  delay: string;
  duration: string;
  swayDuration: string;
  opacity: number;
  color: string;
  path: string;
  rotation: string;
}

const PETAL_COLORS = [
  "#E1B2AF", // Soft Pink Shimmer
  "#C4D3C2", // Soft Sage Green
  "#D5B03A", // Light Yellow Accent
];

const PETAL_PATHS = [
  "M10,0 C11.8,0 13,5 13,10 C13,15 11.8,20 10,20 C8.2,20 7,15 7,10 C7,5 8.2,0 10,0 Z", // Slender Oblong Ellipse
  "M10,0 C12.5,1 14,6 13,12 C12,18 11.5,20 10,20 C8.5,20 8,18 7,12 C6,6 7.5,1 10,0 Z", // Curved Tapered Leaf
  "M10,0 C13,1 14,7 13.5,13 C13,18 11.5,20 10,20 C8.5,20 7,18 6.5,13 C6,7 7,1 10,0 Z", // Organic Stretched Petal
];

export default function FlowerPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Dynamically adjust petal count for performance and visual clarity on mobile
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 15 : 40;

    // Generate petals only on client to avoid hydration mismatch
    const generatedPetals: Petal[] = Array.from({ length: count }).map((_, i) => {
      const left = `${Math.random() * 100}%`;
      const size = Math.floor(Math.random() * 16) + 16; // 16px to 32px
      const delay = `${Math.random() * (isMobile ? 8 : 12)}s`;
      const duration = `${Math.random() * 6 + 4}s`; // 4s to 10s
      const swayDuration = `${Math.random() * 3 + 3}s`; // 3s to 6s
      const opacity = Math.random() * 0.45 + 0.4; // 0.4 to 0.85
      const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
      const path = PETAL_PATHS[Math.floor(Math.random() * PETAL_PATHS.length)];
      const rotation = `${Math.floor(Math.random() * 360)}deg`;

      return {
        id: i,
        left,
        size,
        delay,
        duration,
        swayDuration,
        opacity,
        color,
        path,
        rotation,
      };
    });

    setPetals(generatedPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-[-50px]"
          style={{
            left: petal.left,
            animation: `petalFall ${petal.duration} linear infinite`,
            animationDelay: petal.delay,
            willChange: "transform",
          }}
        >
          {/* Inner swaying and rotating container */}
          <div
            style={{
              animation: `petalSway ${petal.swayDuration} ease-in-out infinite`,
              willChange: "transform",
            }}
          >
            <svg
              width={petal.size}
              height={petal.size}
              viewBox="0 0 20 20"
              fill="none"
              style={{
                opacity: petal.opacity,
                transform: `rotate(${petal.rotation})`,
              }}
            >
              <path d={petal.path} fill={petal.color} />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
