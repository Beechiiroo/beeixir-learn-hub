import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
  overlay?: boolean;
  backgroundImage?: string;
}

const ParallaxSection = ({
  children,
  className,
  speed = 0.5,
  direction = "up",
  overlay = true,
  backgroundImage,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const multiplier = direction === "up" ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed * multiplier]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.section
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ opacity, scale }}
    >
      {/* Parallax background */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 -z-10"
          style={{ y }}
        >
          <div
            className="w-full h-[120%] bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        </motion.div>
      )}

      {/* Floating elements parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-5"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100 * speed]) }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-accent/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Overlay gradient */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/80 pointer-events-none -z-5" />
      )}

      {/* Content */}
      <motion.div style={{ y }} className="relative z-10">
        {children}
      </motion.div>
    </motion.section>
  );
};

export default ParallaxSection;
