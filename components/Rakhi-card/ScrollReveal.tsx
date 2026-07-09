"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: string;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  stagger?: number;
  scrollStart?: string;
  scrollEnd?: string;
  style?: React.CSSProperties;
}

export default function ScrollReveal({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  stagger = 0.05,
  scrollStart = "top bottom-=10%",
  scrollEnd = "bottom center+=10%",
  style,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const words = useMemo(() => {
    return children.split(" ");
  }, [children]);

  useEffect(() => {
    if (!containerRef.current) return;

    const wordElements = containerRef.current.querySelectorAll(".reveal-word");
    if (wordElements.length === 0) return;

    // Reset styles
    gsap.set(wordElements, {
      opacity: baseOpacity,
      rotation: baseRotation,
      filter: enableBlur ? `blur(${blurStrength}px)` : "none",
    });

    const anim = gsap.fromTo(
      wordElements,
      {
        opacity: baseOpacity,
        rotation: baseRotation,
        filter: enableBlur ? `blur(${blurStrength}px)` : "none",
      },
      {
        opacity: 1,
        rotation: 0,
        filter: "blur(0px)",
        stagger: stagger,
        scrollTrigger: {
          trigger: containerRef.current,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [enableBlur, baseOpacity, baseRotation, blurStrength, stagger, scrollStart, scrollEnd]);

  return (
    <p
      ref={containerRef}
      style={style}
      className={`flex flex-wrap justify-center overflow-visible [perspective:1000px] ${containerClassName}`}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className={`reveal-word inline-block mr-[0.25em] origin-center will-change-transform ${textClassName}`}
        >
          {word}
        </span>
      ))}
    </p>
  );
}
