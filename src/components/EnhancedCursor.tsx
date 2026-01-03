import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import bcLogo from "@/assets/bc-logo.png";

const EnhancedCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverTarget, setHoverTarget] = useState<"button" | "link" | "card" | null>(null);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailId = useRef(0);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Add to trail
      trailId.current += 1;
      setTrail((prev) => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id: trailId.current }]);

      // Check what we're hovering
      const target = e.target as HTMLElement;
      const isButton = target.closest("button") || target.tagName === "BUTTON";
      const isLink = target.closest("a") || target.tagName === "A";
      const isCard = target.closest("[data-card]") || target.closest(".card");

      if (isButton) {
        setHoverTarget("button");
        setIsHovering(true);
      } else if (isLink) {
        setHoverTarget("link");
        setIsHovering(true);
      } else if (isCard) {
        setHoverTarget("card");
        setIsHovering(true);
      } else {
        setHoverTarget(null);
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  const getCursorSize = () => {
    if (isClicking) return 30;
    switch (hoverTarget) {
      case "button": return 60;
      case "link": return 50;
      case "card": return 80;
      default: return 40;
    }
  };

  const getCursorColor = () => {
    switch (hoverTarget) {
      case "button": return "rgba(59, 130, 246, 0.3)";
      case "link": return "rgba(168, 85, 247, 0.3)";
      case "card": return "rgba(34, 197, 94, 0.2)";
      default: return "rgba(255, 255, 255, 0.1)";
    }
  };

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Trail effect */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed pointer-events-none z-[9998] rounded-full bg-primary/30"
          initial={{ x: point.x - 4, y: point.y - 4, opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: 8, height: 8 }}
        />
      ))}

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full border-2 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: isHovering ? "hsl(var(--primary))" : "rgba(255, 255, 255, 0.5)",
        }}
        animate={{
          width: getCursorSize(),
          height: getCursorSize(),
          rotate: isHovering ? 180 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Inner circle with logo */}
      <motion.div
        className="fixed pointer-events-none z-[10000] rounded-full flex items-center justify-center overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: getCursorColor(),
        }}
        animate={{
          width: getCursorSize() - 10,
          height: getCursorSize() - 10,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <motion.img
          src={bcLogo}
          alt="BC"
          className="w-4/5 h-4/5 object-contain"
          animate={{
            rotate: isHovering ? [0, 360] : 0,
            scale: isClicking ? 1.2 : 1,
          }}
          transition={{
            rotate: { duration: 2, repeat: isHovering ? Infinity : 0, ease: "linear" },
            scale: { duration: 0.2 },
          }}
        />
      </motion.div>

      {/* Magnetic effect indicator */}
      {hoverTarget === "button" && (
        <motion.div
          className="fixed pointer-events-none z-[9997] rounded-full bg-primary/10"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{ width: 100, height: 100, opacity: 1 }}
          exit={{ width: 0, height: 0, opacity: 0 }}
        />
      )}
    </>
  );
};

export default EnhancedCursor;
