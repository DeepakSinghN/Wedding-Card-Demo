import { type ReactElement } from "react";
import { motion } from "framer-motion";

type BacklightProps = {
  children?: ReactElement;
  className?: string;
  blur?: number;
  animate?: boolean;
};

export function Backlight({ blur = 20, children, className, animate = true }: BacklightProps) {
  return (
    <div className={className}>
      <motion.div
        className="h-full w-full"
        style={{
          filter: `blur(${blur}px)`,
          willChange: "transform, opacity",
        }}
        animate={
          animate
            ? {
                scale: [0.96, 1.05, 0.96],
                opacity: [0.65, 0.95, 0.65],
              }
            : {}
        }
        transition={
          animate
            ? {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : undefined
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
