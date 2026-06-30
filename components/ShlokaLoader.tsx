"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ShlokaLoaderProps {
  onEnter: () => void;
}

export default function ShlokaLoader({ onEnter }: ShlokaLoaderProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Play video & music on user click
  const handlePlayClick = () => {
    if (hasStarted) return;
    setHasStarted(true);

    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Video playback blocked or failed:", err);
      });
    }
  };

  // Auto trigger onEnter when the video ends
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnded = () => {
      onEnter();
    };

    video.addEventListener("ended", handleVideoEnded);
    return () => {
      if (video) {
        video.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, [onEnter]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 2.0, ease: "easeInOut" }}
      className="fixed inset-0 w-full h-full bg-[#FAF4EF] z-[99999] flex items-center justify-center select-none overflow-hidden"
    >
      {/* Background/Backdrop while loading first frame */}
      <div className="absolute inset-0 bg-[#FAF4EF] z-0" />

      {/* The video element */}
      <video
        ref={videoRef}
        src="/card%20video/Pre-Load%20Card%20Animation.mp4"
        playsInline
        preload="auto"
        onClick={handlePlayClick}
        className="w-full h-full object-cover z-10 cursor-pointer pointer-events-auto"
      />
    </motion.div>
  );
}
