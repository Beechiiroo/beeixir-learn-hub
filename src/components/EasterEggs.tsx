import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConfetti } from "@/hooks/useConfetti";
import { Sparkles, Trophy, Rocket, Heart } from "lucide-react";

const EasterEggs = () => {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [secretMessage, setSecretMessage] = useState<string | null>(null);
  const { fireMultiple, fireStars, fireEmoji } = useConfetti();

  // Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "KeyB", "KeyA"
  ];
  const [konamiIndex, setKonamiIndex] = useState(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === konamiCode[konamiIndex]) {
      const nextIndex = konamiIndex + 1;
      if (nextIndex === konamiCode.length) {
        setKonamiActivated(true);
        fireMultiple();
        setSecretMessage("🎮 KONAMI CODE ACTIVÉ ! +1000 XP Secret !");
        setTimeout(() => {
          setKonamiActivated(false);
          setSecretMessage(null);
        }, 5000);
        setKonamiIndex(0);
      } else {
        setKonamiIndex(nextIndex);
      }
    } else {
      setKonamiIndex(0);
    }

    // Secret word detection
    if (e.key.toLowerCase() === "b" && e.ctrlKey && e.shiftKey) {
      fireStars();
      setSecretMessage("⭐ Mode développeur secrètement activé !");
      setTimeout(() => setSecretMessage(null), 3000);
    }
  }, [konamiIndex, fireMultiple, fireStars]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Logo rapid click easter egg
  const handleLogoClick = useCallback(() => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 7) {
        fireEmoji("🚀");
        setSecretMessage("🚀 Tu as trouvé un secret ! Mode fusée activé !");
        setTimeout(() => setSecretMessage(null), 3000);
        return 0;
      }
      return newCount;
    });

    // Reset count after 2 seconds of no clicks
    setTimeout(() => setClickCount(0), 2000);
  }, [fireEmoji]);

  // Expose for external use
  useEffect(() => {
    (window as any).__bcEasterEgg = handleLogoClick;
    return () => {
      delete (window as any).__bcEasterEgg;
    };
  }, [handleLogoClick]);

  return (
    <>
      {/* Secret message popup */}
      <AnimatePresence>
        {secretMessage && (
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
          >
            <div className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white px-8 py-6 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-3 text-xl font-bold">
                <Sparkles className="w-6 h-6 animate-spin" />
                {secretMessage}
                <Sparkles className="w-6 h-6 animate-spin" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konami mode special effects */}
      <AnimatePresence>
        {konamiActivated && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Rainbow border */}
            <div className="absolute inset-0 border-8 border-transparent animate-pulse"
              style={{
                borderImage: "linear-gradient(45deg, red, orange, yellow, green, blue, purple) 1"
              }}
            />
            
            {/* Floating icons */}
            {[Trophy, Rocket, Heart, Sparkles].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50 
                }}
                animate={{
                  y: -50,
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.3,
                  repeat: Infinity,
                }}
              >
                <Icon className="w-12 h-12" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEggs;
