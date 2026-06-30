"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in" | "fade-in-up" | "fade-in-down" | "fade-in-left" | "fade-in-right" | "zoom-in";
  duration?: number; // in seconds
  delay?: number; // in seconds
  threshold?: number;
  style?: React.CSSProperties;
}

export default function ScrollReveal({
  children,
  className = "",
  animation = "fade-in-up",
  duration = 0.8,
  delay = 0,
  threshold = 0.1,
  style = {},
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Only animate once: disconnect observer immediately after trigger to stop CPU load
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // trigger slightly before entering viewport fully
      }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold]);

  const getAnimationStyles = () => {
    let transform = "";
    if (!isVisible) {
      if (animation === "fade-in-up") transform = "translateY(35px)";
      else if (animation === "fade-in-down") transform = "translateY(-35px)";
      else if (animation === "fade-in-left") transform = "translateX(-35px)";
      else if (animation === "fade-in-right") transform = "translateX(35px)";
      else if (animation === "zoom-in") transform = "scale(0.95)";
    } else {
      if (animation === "zoom-in") transform = "scale(1)";
      else if (animation.startsWith("fade-in-")) transform = "translateY(0) translateX(0)";
    }

    return {
      opacity: isVisible ? 1 : 0,
      transform,
      transition: `opacity ${duration}s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s, transform ${duration}s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s`,
      ...style, // Merge user-provided styles
    };
  };

  return (
    <div ref={ref} className={className} style={getAnimationStyles()}>
      {children}
    </div>
  );
}
