import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Code, Trophy, MessageSquare, Calendar, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface QuickActionsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickActionsPanel = ({ isOpen, onClose }: QuickActionsPanelProps) => {
  const navigate = useNavigate();

  const actions = [
    { icon: BookOpen, label: "Cours", color: "from-blue-500 to-blue-600", action: () => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: Code, label: "Live Code", color: "from-green-500 to-emerald-600", action: () => document.getElementById("live-code")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: Trophy, label: "Leaderboard", color: "from-yellow-500 to-amber-600", action: () => navigate("/leaderboard") },
    { icon: MessageSquare, label: "Contact", color: "from-purple-500 to-violet-600", action: () => navigate("/contact") },
    { icon: Calendar, label: "Dashboard", color: "from-pink-500 to-rose-600", action: () => navigate("/dashboard") },
    { icon: ArrowUp, label: "Haut", color: "from-gray-500 to-gray-600", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed right-4 bottom-28 z-50"
        >
          <div className="relative">
            {/* Glass background */}
            <div className="absolute inset-0 -m-3 rounded-3xl bg-card/40 backdrop-blur-2xl border border-white/10 shadow-2xl" />
            
            <div className="relative grid grid-cols-2 gap-2 p-1">
              {actions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        action.action();
                        onClose();
                      }}
                      className={`relative w-full px-4 py-3 rounded-2xl bg-gradient-to-br ${action.color} shadow-lg overflow-hidden group`}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      <div className="relative flex items-center gap-2">
                        <Icon className="h-4 w-4 text-white" />
                        <span className="text-sm font-medium text-white">{action.label}</span>
                      </div>
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickActionsPanel;
