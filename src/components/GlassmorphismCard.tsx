import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowColor?: string;
}

const GlassmorphismCard = ({ 
  children, 
  className, 
  hoverEffect = true,
  glowColor = "primary"
}: GlassmorphismCardProps) => {
  const glowColors: Record<string, string> = {
    primary: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    secondary: "hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]",
    success: "hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]",
    warning: "hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]",
  };

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-white/10 dark:bg-white/5",
        "backdrop-blur-xl backdrop-saturate-150",
        "border border-white/20 dark:border-white/10",
        "shadow-xl",
        hoverEffect && [
          "transition-all duration-500",
          "hover:-translate-y-2",
          "hover:bg-white/15 dark:hover:bg-white/10",
          "hover:border-white/30",
          glowColors[glowColor],
        ],
        className
      )}
      whileHover={hoverEffect ? { scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        whileHover={{ opacity: 1, x: ["0%", "200%"] }}
        transition={{ duration: 0.8 }}
      />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlassmorphismCard;
