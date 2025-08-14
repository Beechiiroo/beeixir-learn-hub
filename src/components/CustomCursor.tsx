import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code, Brain } from "lucide-react";

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
        {/* Main logo cursor */}
        <motion.div
          className="w-full h-full gradient-primary rounded-lg flex items-center justify-center"
          animate={{
            scale: isHovering ? 1.2 : 1,
            rotate: isHovering ? 180 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Code className="w-3 h-3 text-white" />
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-secondary rounded-full flex items-center justify-center">
            <Brain className="w-1 h-1 text-white" />
          </div>
        </motion.div>
        
        {/* Animated ring around logo */}
        <motion.div
          className="absolute inset-0 border-2 border-primary/50 rounded-lg"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 0.2, 0.8],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Outer glow effect */}
        <motion.div
          className="absolute inset-0 bg-primary/20 rounded-lg blur-sm"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
};

export default CustomCursor;