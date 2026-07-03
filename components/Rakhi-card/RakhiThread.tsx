"use client";

/**
 * RakhiThread — a decorative SVG thread that draws itself across the
 * top of the Hero section using GSAP stroke-dashoffset animation.
 *
 * The parent Hero.tsx controls the draw timing via the GSAP master
 * timeline; this component just renders the SVG with the correct
 * initial state so GSAP can animate it.
 */

interface RakhiThreadProps {
  /** forwarded ref so the Hero's GSAP timeline can target the <path> */
  pathRef?: React.RefObject<SVGPathElement | null>;
}

export function RakhiThread({ pathRef }: RakhiThreadProps) {
  return (
    <svg
      viewBox="0 0 390 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-8 pointer-events-none"
      aria-hidden="true"
    >
      {/* Main decorative thread path — starts with dashoffset = full length
          GSAP will animate dashoffset → 0 to "draw" it */}
      <path
        ref={pathRef}
        d="
          M -10 16
          Q 40 6  80 16
          Q 120 26 160 14
          Q 200 3  240 16
          Q 280 28 320 13
          Q 360 2  400 16
        "
        stroke="var(--rakhi-gold)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        /* stroke-dasharray and dashoffset are set inline so they survive
           any CSS resets; GSAP will read and animate strokeDashoffset */
        strokeDasharray="600"
        strokeDashoffset="600"
        className="rakhi-thread-path"
      />

      {/* Small knotted decorative diamonds along the thread */}
      {[60, 150, 240, 330].map((cx) => (
        <circle
          key={cx}
          cx={cx}
          cy={16}
          r={3}
          fill="var(--rakhi-gold)"
          opacity={0}
          className="rakhi-thread-bead"
        />
      ))}
    </svg>
  );
}
