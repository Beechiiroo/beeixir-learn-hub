import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Zap, Award, Target, Flame } from "lucide-react";
import { useConfetti } from "@/hooks/useConfetti";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: typeof Trophy;
  color: string;
  points: number;
}

const achievements: Achievement[] = [
  { id: "first_visit", title: "Explorateur", description: "Premier pas sur la plateforme!", icon: Star, color: "from-yellow-400 to-yellow-600", points: 10 },
  { id: "scroll_master", title: "Scrolleur Pro", description: "Tu as exploré toute la page!", icon: Target, color: "from-blue-400 to-blue-600", points: 25 },
  { id: "night_owl", title: "Hibou de Nuit", description: "Visite après 22h", icon: Flame, color: "from-purple-400 to-purple-600", points: 15 },
  { id: "early_bird", title: "Lève-tôt", description: "Visite avant 7h", icon: Zap, color: "from-orange-400 to-orange-600", points: 15 },
];

const AchievementPopup = () => {
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [earnedAchievements, setEarnedAchievements] = useState<string[]>([]);
  const { fireMultiple } = useConfetti();

  useEffect(() => {
    const saved = localStorage.getItem("earned-achievements");
    if (saved) {
      setEarnedAchievements(JSON.parse(saved));
    }
  }, []);

  const unlockAchievement = (achievement: Achievement) => {
    if (earnedAchievements.includes(achievement.id)) return;

    setCurrentAchievement(achievement);
    fireMultiple();

    const updated = [...earnedAchievements, achievement.id];
    setEarnedAchievements(updated);
    localStorage.setItem("earned-achievements", JSON.stringify(updated));

    setTimeout(() => setCurrentAchievement(null), 5000);
  };

  // Check for achievements
  useEffect(() => {
    // First visit
    if (!earnedAchievements.includes("first_visit")) {
      setTimeout(() => unlockAchievement(achievements[0]), 3000);
    }

    // Time-based achievements
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 5) {
      if (!earnedAchievements.includes("night_owl")) {
        setTimeout(() => unlockAchievement(achievements[2]), 5000);
      }
    }
    if (hour >= 5 && hour < 7) {
      if (!earnedAchievements.includes("early_bird")) {
        setTimeout(() => unlockAchievement(achievements[3]), 5000);
      }
    }

    // Scroll achievement
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage > 90 && !earnedAchievements.includes("scroll_master")) {
        unlockAchievement(achievements[1]);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [earnedAchievements]);

  return (
    <AnimatePresence>
      {currentAchievement && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[100]"
        >
          <motion.div
            className="relative bg-card/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-border overflow-hidden min-w-[300px]"
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 40px rgba(168, 85, 247, 0.4)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentAchievement.color} opacity-10`} />

            {/* Content */}
            <div className="relative flex items-center gap-4">
              {/* Icon */}
              <motion.div
                className={`h-16 w-16 rounded-xl bg-gradient-to-br ${currentAchievement.color} flex items-center justify-center`}
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <currentAchievement.icon className="h-8 w-8 text-white" />
              </motion.div>

              {/* Text */}
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-muted-foreground uppercase tracking-wider mb-1"
                >
                  🎉 Achievement Débloqué!
                </motion.p>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-bold text-lg"
                >
                  {currentAchievement.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm text-muted-foreground"
                >
                  {currentAchievement.description}
                </motion.p>
              </div>

              {/* Points */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="ml-auto text-center"
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  +{currentAchievement.points}
                </span>
                <p className="text-xs text-muted-foreground">XP</p>
              </motion.div>
            </div>

            {/* Progress Bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementPopup;
