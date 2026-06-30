"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Backlight } from "./ui/backlight";
import ParallaxHeader from "./ParallaxHeader";

interface CardData {
  id: number;
  src: string;
  caption: string;
}

const GALLERY_PHOTOS: CardData[] = [
  { id: 1, src: "/Gallery/1.svg", caption: "The beginning of our forever" },
  { id: 2, src: "/Gallery/2.svg", caption: "Laughter shared, dreams built" },
  { id: 3, src: "/Gallery/3.svg", caption: "Two hearts, one journey" },
  { id: 4, src: "/Gallery/4.svg", caption: "Memories together" },
];

const Card = ({
  photo,
  index,
  total,
  progress,
  range,
  targetScale,
}: {
  photo: CardData;
  index: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) => {
  // Zoom photo image down as card enters screen (using shared parent progress to avoid layout thrashing)
  const imageScale = useTransform(progress, [range[0] - 0.25, range[0]], [1.2, 1.0], { clamp: true });

  // Scale down card as subsequent cards stack on top of it
  const scale = useTransform(progress, range, [1, targetScale]);

  // Alternating rotations for a natural, premium polaroid stack look
  const rotate = index % 2 === 0 ? index * 1.2 : index * -1.2;

  return (
    <div
      className="w-full min-h-[60vh] md:min-h-[75vh] flex justify-center items-start sticky top-[20vh] md:top-[23vh]"
      style={{
        // Padding offset ensures previous cards' tops remain visible
        paddingTop: `${index * 24}px`,
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{
          scale,
          rotate,
          transformStyle: "preserve-3d",
          willChange: "transform",
          backfaceVisibility: "hidden",
          boxShadow: "0 30px 60px -15px rgba(163, 102, 98, 0.24), 0 12px 25px -10px rgba(163, 102, 98, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)",
        }}
        className="relative w-[330px] h-[500px] md:w-[400px] md:h-[500px] rounded-[18px] bg-white border border-[#A36662]/10 overflow-hidden flex flex-col justify-start items-center gap-2 p-3 pb-0 md:p-3 md:pb-0"
      >

        {/* Polaroid Square Photo Frame */}
        <div className="relative w-full h-[87%] aspect-square rounded-lg overflow-hidden z-10 flex items-center justify-center  rounded-[18px]">
          <motion.div
            style={{ scale: imageScale }}
            className="relative w-full h-full "
          >
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              className="object-cover pointer-events-none p-4  rounded-[26px]"
              draggable={false}
              priority={index === 0}
            />
          </motion.div>
        </div>

        {/* Polaroid Cursive Caption Bottom Margin */}
        <div className="w-full h-[30px] md:h-[40px] flex items-center justify-center bg-white z-10">
          <p className="font-cormorant italic font-semibold text-[clamp(1.2rem,2vw,1.6rem)] text-[#7A1C2C] leading-none select-none tracking-wide text-center">
            {photo.caption}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the entire stack list
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#FAF4EF] relative border-t border-[#A36662]/5"
    >


      {/* Sticky Header Wrapper spanning full width */}
      <div className="w-full sticky top-0 z-30 bg-[#FAF4EF]">
        <ParallaxHeader
          category="Our Story"
          title="Forever Us"
          backgroundText="GALLERY"
          className="pt-12 pb-4 md:pt-16 md:pb-4 px-6"
        />
      </div>

      {/* Cards Stack Parent List */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center relative z-10 px-6 pb-[20vh]">
        {GALLERY_PHOTOS.map((photo, index) => {
          // Calculate mapping range: Card index starts scaling down as subsequent cards scroll over it
          const startRange = index * 0.25;
          const targetScale = 1.0 - (GALLERY_PHOTOS.length - index) * 0.04;
          return (
            <Card
              key={photo.id}
              photo={photo}
              index={index}
              total={GALLERY_PHOTOS.length}
              progress={scrollYProgress}
              range={[startRange, 1.0]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
