import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Zap,
  Music,
  Timer,
  Video,
  Code2,
  Compass,
  Mic,
  Brain,
  Activity,
  Settings,
  X,
  ChevronUp,
  Sparkles,
} from "lucide-react";

interface ToolItem {
  id: string;
  icon: typeof MessageCircle;
  label: string;
  color: string;
  glowColor: string;
  position: "left" | "right";
  onClick: () => void;
  badge?: string | number;
  isActive?: boolean;
}

interface FloatingToolbarProps {
  onChatbotToggle: () => void;
  chatbotOpen: boolean;
  onQuickActionsToggle: () => void;
  quickActionsOpen: boolean;
  onMusicToggle: () => void;
  musicOpen: boolean;
  musicPlaying: boolean;
  onTimerToggle: () => void;
  timerOpen: boolean;
  timerRunning: boolean;
  onRecorderToggle: () => void;
  recording: boolean;
  onSnippetsToggle: () => void;
  snippetsOpen: boolean;
  onRecommendationsToggle: () => void;
  recommendationsOpen: boolean;
  onVoiceToggle: () => void;
  voiceListening: boolean;
  onAICoachToggle: () => void;
  aiCoachOpen: boolean;
  onActivityToggle: () => void;
  activityOpen: boolean;
  liveCount?: number;
}

const FloatingToolbar = ({
  onChatbotToggle,
  chatbotOpen,
  onQuickActionsToggle,
  quickActionsOpen,
  onMusicToggle,
  musicOpen,
  musicPlaying,
  onTimerToggle,
  timerOpen,
  timerRunning,
  onRecorderToggle,
  recording,
  onSnippetsToggle,
  snippetsOpen,
  onRecommendationsToggle,
  recommendationsOpen,
  onVoiceToggle,
  voiceListening,
  onAICoachToggle,
  aiCoachOpen,
  onActivityToggle,
  activityOpen,
  liveCount = 128,
}: FloatingToolbarProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [pulseIndex, setPulseIndex] = useState(0);

  // Animated pulse effect cycling through tools
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const rightTools: ToolItem[] = [
    {
      id: "chatbot",
      icon: MessageCircle,
      label: "Support",
      color: "from-violet-500 to-purple-600",
      glowColor: "shadow-violet-500/50",
      position: "right",
      onClick: onChatbotToggle,
      isActive: chatbotOpen,
    },
    {
      id: "quickActions",
      icon: Zap,
      label: "Actions",
      color: "from-amber-500 to-orange-600",
      glowColor: "shadow-amber-500/50",
      position: "right",
      onClick: onQuickActionsToggle,
      isActive: quickActionsOpen,
    },
    {
      id: "snippets",
      icon: Code2,
      label: "Snippets",
      color: "from-cyan-500 to-blue-600",
      glowColor: "shadow-cyan-500/50",
      position: "right",
      onClick: onSnippetsToggle,
      isActive: snippetsOpen,
    },
    {
      id: "recommendations",
      icon: Compass,
      label: "Suggestions",
      color: "from-emerald-500 to-teal-600",
      glowColor: "shadow-emerald-500/50",
      position: "right",
      onClick: onRecommendationsToggle,
      isActive: recommendationsOpen,
    },
    {
      id: "recorder",
      icon: Video,
      label: "Enregistrer",
      color: recording ? "from-red-500 to-rose-600" : "from-pink-500 to-rose-600",
      glowColor: "shadow-pink-500/50",
      position: "right",
      onClick: onRecorderToggle,
      isActive: recording,
    },
  ];

  const leftTools: ToolItem[] = [
    {
      id: "voice",
      icon: Mic,
      label: "Vocal",
      color: voiceListening ? "from-red-500 to-rose-600" : "from-indigo-500 to-purple-600",
      glowColor: "shadow-indigo-500/50",
      position: "left",
      onClick: onVoiceToggle,
      isActive: voiceListening,
    },
    {
      id: "music",
      icon: Music,
      label: "Musique",
      color: musicPlaying ? "from-green-500 to-emerald-600" : "from-fuchsia-500 to-pink-600",
      glowColor: "shadow-fuchsia-500/50",
      position: "left",
      onClick: onMusicToggle,
      isActive: musicOpen || musicPlaying,
    },
    {
      id: "timer",
      icon: Timer,
      label: "Focus",
      color: timerRunning ? "from-rose-500 to-pink-600" : "from-sky-500 to-blue-600",
      glowColor: "shadow-sky-500/50",
      position: "left",
      onClick: onTimerToggle,
      isActive: timerOpen || timerRunning,
    },
  ];

  const renderToolButton = (tool: ToolItem, index: number, totalTools: number) => {
    const isHovered = hoveredTool === tool.id;
    const shouldPulse = index === pulseIndex && !tool.isActive;

    return (
      <motion.div
        key={tool.id}
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
        }}
        transition={{ 
          delay: index * 0.1,
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        onHoverStart={() => setHoveredTool(tool.id)}
        onHoverEnd={() => setHoveredTool(null)}
        className="relative"
      >
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tool.color} blur-xl opacity-0`}
          animate={{ 
            opacity: isHovered || tool.isActive ? 0.6 : shouldPulse ? 0.3 : 0,
            scale: isHovered ? 1.5 : 1
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Pulse ring animation */}
        {(tool.isActive || shouldPulse) && (
          <>
            <motion.div
              className={`absolute inset-0 rounded-2xl border-2 border-white/30`}
              animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className={`absolute inset-0 rounded-2xl border-2 border-white/20`}
              animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
          </>
        )}

        {/* Main button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={tool.onClick}
          className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color} shadow-lg ${tool.glowColor} flex items-center justify-center overflow-hidden group transition-shadow duration-300 ${
            isHovered || tool.isActive ? "shadow-2xl" : ""
          }`}
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-white/10" />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 0.6 }}
          />

          {/* Icon */}
          <motion.div
            animate={{ 
              rotate: tool.isActive && tool.id === "music" ? 360 : 0,
            }}
            transition={{ 
              duration: tool.id === "music" ? 3 : 0.3, 
              repeat: tool.isActive && tool.id === "music" ? Infinity : 0,
              ease: "linear"
            }}
          >
            <tool.icon className="w-5 h-5 text-white relative z-10" />
          </motion.div>

          {/* Active indicator dot */}
          {tool.isActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-current"
            />
          )}
        </motion.button>

        {/* Label tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: tool.position === "right" ? 10 : -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: tool.position === "right" ? 10 : -10, scale: 0.9 }}
              className={`absolute top-1/2 -translate-y-1/2 ${
                tool.position === "right" ? "right-full mr-3" : "left-full ml-3"
              } whitespace-nowrap`}
            >
              <div className="relative">
                <div className="bg-card/95 backdrop-blur-xl px-3 py-1.5 rounded-xl shadow-xl border border-border">
                  <span className="text-sm font-medium">{tool.label}</span>
                </div>
                {/* Arrow */}
                <div className={`absolute top-1/2 -translate-y-1/2 ${
                  tool.position === "right" ? "-right-1.5" : "-left-1.5"
                } w-3 h-3 bg-card/95 border-border rotate-45 ${
                  tool.position === "right" ? "border-r border-t" : "border-l border-b"
                }`} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <>
      {/* Right Toolbar */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="fixed right-4 bottom-8 z-50"
      >
        <div className="relative">
          {/* Background glass panel */}
          <motion.div
            className="absolute inset-0 -m-2 rounded-3xl bg-card/30 backdrop-blur-xl border border-white/10 shadow-2xl"
            style={{ 
              background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)"
            }}
          />
          
          {/* Tools grid */}
          <div className="relative flex flex-col gap-3 p-2">
            {rightTools.map((tool, index) => renderToolButton(tool, index, rightTools.length))}
          </div>
        </div>
      </motion.div>

      {/* Left Toolbar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.5 }}
        className="fixed left-4 bottom-8 z-50"
      >
        <div className="relative">
          {/* Background glass panel */}
          <motion.div
            className="absolute inset-0 -m-2 rounded-3xl bg-card/30 backdrop-blur-xl border border-white/10 shadow-2xl"
            style={{ 
              background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)"
            }}
          />
          
          {/* Tools grid */}
          <div className="relative flex flex-col gap-3 p-2">
            {leftTools.map((tool, index) => renderToolButton(tool, index, leftTools.length))}
          </div>
        </div>
      </motion.div>

      {/* AI Coach Side Button - Innovative 2026 Design */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40"
      >
        <motion.button
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAICoachToggle}
          className="relative group"
        >
          {/* Main panel */}
          <div className="relative overflow-hidden rounded-l-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-4 py-3 shadow-xl">
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-400/20 via-transparent to-violet-400/20"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Neural network pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <pattern id="neural" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="white" />
                    <line x1="10" y1="10" x2="20" y2="0" stroke="white" strokeWidth="0.3" />
                    <line x1="10" y1="10" x2="20" y2="20" stroke="white" strokeWidth="0.3" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#neural)" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm"
              >
                <Brain className="w-4 h-4 text-white" />
              </motion.div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-white font-semibold text-sm">AI Coach</span>
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                </div>
                <span className="text-white/70 text-xs">Assistant IA</span>
              </div>
            </div>

            {/* Active indicator */}
            {aiCoachOpen && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                className="absolute bottom-0 left-0 h-0.5 bg-white"
              />
            )}
          </div>

          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 rounded-l-2xl bg-gradient-to-br from-violet-500 to-purple-500 blur-xl opacity-0 -z-10"
            whileHover={{ opacity: 0.5, scale: 1.1 }}
          />
        </motion.button>
      </motion.div>

      {/* Live Activity Side Button */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40"
      >
        <motion.button
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={onActivityToggle}
          className="relative group"
        >
          {/* Main panel */}
          <div className="relative overflow-hidden rounded-r-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 px-4 py-3 shadow-xl">
            {/* Animated pulse */}
            <motion.div
              className="absolute inset-0 bg-white/10"
              animate={{ opacity: [0, 0.2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Content */}
            <div className="relative flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm"
              >
                <Activity className="w-4 h-4 text-white" />
              </motion.div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-lg">{liveCount}</span>
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-red-400"
                  />
                </div>
                <span className="text-white/70 text-xs">en ligne</span>
              </div>
            </div>

            {/* Active indicator */}
            {activityOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                className="absolute top-0 right-0 w-0.5 bg-white"
              />
            )}
          </div>

          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 rounded-r-2xl bg-gradient-to-br from-emerald-500 to-teal-500 blur-xl opacity-0 -z-10"
            whileHover={{ opacity: 0.5, scale: 1.1 }}
          />
        </motion.button>
      </motion.div>
    </>
  );
};

export default FloatingToolbar;
