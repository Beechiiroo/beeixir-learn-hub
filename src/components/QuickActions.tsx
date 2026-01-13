import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  BookOpen,
  Code,
  MessageSquare,
  Calendar,
  Trophy,
  Settings,
  ArrowUp,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useFuturisticSounds } from "@/hooks/useFuturisticSounds";

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { playSound } = useFuturisticSounds();

  const actions = [
    { icon: BookOpen, label: "Cours", color: "from-blue-500 to-blue-600", action: () => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: Code, label: "Live Code", color: "from-green-500 to-green-600", action: () => document.getElementById("live-code")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: Trophy, label: "Leaderboard", color: "from-yellow-500 to-yellow-600", action: () => navigate("/leaderboard") },
    { icon: MessageSquare, label: "Contact", color: "from-purple-500 to-purple-600", action: () => navigate("/contact") },
    { icon: Calendar, label: "Dashboard", color: "from-pink-500 to-pink-600", action: () => navigate("/dashboard") },
    { icon: ArrowUp, label: "Haut", color: "from-gray-500 to-gray-600", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  ];

  return (
    <div className="fixed right-24 bottom-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 flex flex-col gap-2"
          >
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, y: 20, x: 20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: 20, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2 justify-end"
                >
                  <span className="bg-card/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium shadow-lg border border-border whitespace-nowrap">
                    {action.label}
                  </span>
                  <Button
                    size="icon"
                    onClick={() => {
                      playSound("holographic-click");
                      action.action();
                      setIsOpen(false);
                    }}
                    className={`h-10 w-10 rounded-full bg-gradient-to-br ${action.color} shadow-lg hover:shadow-xl`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="icon"
          onClick={() => {
            playSound(isOpen ? "holographic-click" : "quantum-activate");
            setIsOpen(!isOpen);
          }}
          className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary shadow-xl hover:shadow-2xl"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 90, scale: 0 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -90, scale: 0 }}
              >
                <Zap className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  );
};

export default QuickActions;
