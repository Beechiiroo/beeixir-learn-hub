import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners
    document.addEventListener("mousemove", updatePosition);
    
    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll("button, a, input, select, textarea, [role='button']");
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-difference"
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        scale: isHovering ? 2 : 1,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 400,
        mass: 0.5
      }}
    >
      <div className="relative w-full h-full">
        {/* Main cursor circle */}
        <motion.div
          className="w-full h-full bg-white rounded-full"
          animate={{
            scale: isHovering ? 0.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Animated ring */}
        <motion.div
          className="absolute inset-0 border-2 border-white rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Inner pulse dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
};

export default CustomCursor;