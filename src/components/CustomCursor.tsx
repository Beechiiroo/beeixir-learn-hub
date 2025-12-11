import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bcLogo from "@/assets/bc-logo.png";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseOut = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    
    const interactiveElements = document.querySelectorAll("button, a, input, select, textarea, [role='button']");
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor with logo */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 400,
          mass: 0.3
        }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30 overflow-hidden">
          <img 
            src={bcLogo} 
            alt="" 
            className="w-5 h-5 object-contain"
          />
        </div>
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: isHovering ? 1.4 : 1,
          rotate: isHovering ? 90 : 0,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 150,
          mass: 0.5
        }}
      >
        <div className="w-12 h-12 border-2 border-primary/40 rounded-full border-dashed" />
      </motion.div>

      {/* Trailing particles */}
      <AnimatePresence>
        {isHovering && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="fixed top-0 left-0 pointer-events-none z-[9997]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  x: position.x - 4 + Math.sin(i * 2) * 20,
                  y: position.y - 4 + Math.cos(i * 2) * 20,
                  opacity: 0.6,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 100,
                  delay: i * 0.05,
                }}
              >
                <div className="w-2 h-2 bg-primary/60 rounded-full" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996]"
        animate={{
          x: position.x - 30,
          y: position.y - 30,
          opacity: isHovering ? 0.4 : 0.15,
          scale: isClicking ? 1.5 : isHovering ? 1.3 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 150,
        }}
      >
        <div className="w-[60px] h-[60px] bg-primary/30 rounded-full blur-xl" />
      </motion.div>
    </>
  );
};

export default CustomCursor;