import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useFuturisticSounds } from "@/hooks/useFuturisticSounds";

const GestureNavigation = () => {
  const [gesture, setGesture] = useState<string | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const { playSound } = useFuturisticSounds();

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const minSwipeDistance = 100;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0) {
            setGesture("right");
            playSound("holographic-click");
            window.history.back();
            toast.info("← Page précédente");
          } else {
            setGesture("left");
            playSound("holographic-click");
            window.history.forward();
            toast.info("→ Page suivante");
          }
        }
      } else {
        if (Math.abs(deltaY) > minSwipeDistance) {
          if (deltaY > 0) {
            setGesture("down");
            playSound("cloud-sync");
            window.scrollTo({ top: 0, behavior: "smooth" });
            toast.info("↑ Haut de page");
          } else {
            setGesture("up");
            playSound("cloud-sync");
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            toast.info("↓ Bas de page");
          }
        }
      }

      touchStartRef.current = null;
      setTimeout(() => setGesture(null), 500);
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            setGesture("up");
            playSound("cloud-sync");
            window.scrollTo({ top: 0, behavior: "smooth" });
            break;
          case "ArrowDown":
            e.preventDefault();
            setGesture("down");
            playSound("cloud-sync");
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            break;
          case "ArrowLeft":
            e.preventDefault();
            setGesture("left");
            playSound("holographic-click");
            window.history.back();
            break;
          case "ArrowRight":
            e.preventDefault();
            setGesture("right");
            playSound("holographic-click");
            window.history.forward();
            break;
        }
        setTimeout(() => setGesture(null), 500);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const gestureIcons = {
    up: ArrowUp,
    down: ArrowDown,
    left: ArrowLeft,
    right: ArrowRight,
  };

  return (
    <AnimatePresence>
      {gesture && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-xl flex items-center justify-center"
          >
            {(() => {
              const Icon = gestureIcons[gesture as keyof typeof gestureIcons];
              return Icon ? <Icon className="w-12 h-12 text-primary" /> : null;
            })()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GestureNavigation;
