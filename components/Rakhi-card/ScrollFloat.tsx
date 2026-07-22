"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: string;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  style?: React.CSSProperties;
}

export default function ScrollFloat({
  children,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1.2,
  ease = "back.out(2)",
  scrollStart = "top bottom-=10%",
  scrollEnd = "bottom center+=10%",
  stagger = 0.03,
  style,
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const words = useMemo(() => {
    return children.trim().replace(/\s+/g, " ").split(" ");
  }, [children]);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".scroll-char");
    if (chars.length === 0) return;

    // Reset initial styles
    gsap.set(chars, {
      y: "120%",
      opacity: 0,
      rotateX: -45,
    });

    const anim = gsap.fromTo(
      chars,
      {
        y: "120%",
        opacity: 0,
        rotateX: -45,
      },
      {
        y: "0%",
        opacity: 1,
        rotateX: 0,
        stagger: stagger,
        duration: animationDuration,
        ease: ease,
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
  }, [ease, scrollStart, scrollEnd, stagger, animationDuration, children]);

  return (
    <h2
      ref={containerRef}
      style={style}
      className={`flex flex-wrap justify-center overflow-visible [perspective:1000px] [transform-style:preserve-3d] ${containerClassName}`}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className={`scroll-char inline-block will-change-transform origin-bottom ${textClassName}`}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}
