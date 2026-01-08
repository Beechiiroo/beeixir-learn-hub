import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Sparkles,
  Wand2,
  Palette,
  BookOpen,
  Trophy,
  Globe,
  Wifi,
  Battery,
  Shield,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ToolItem {
  id: string;
  icon: typeof MessageCircle;
  label: string;
  description: string;
  gradient: string;
  onClick: () => void;
  isActive?: boolean;
  badge?: string | number;
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
  // New 2026 features
  onARModeToggle?: () => void;
  arModeActive?: boolean;
  onCollabToggle?: () => void;
  collabActive?: boolean;
  onThemesToggle?: () => void;
  themesOpen?: boolean;
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
  onARModeToggle,
  arModeActive = false,
  onCollabToggle,
  collabActive = false,
  onThemesToggle,
  themesOpen = false,
}: FloatingToolbarProps) => {
  const [leftExpanded, setLeftExpanded] = useState(true);
  const [rightExpanded, setRightExpanded] = useState(true);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  // Right side tools - Communication & Creation
  const rightTools: ToolItem[] = [
    {
      id: "chatbot",
      icon: MessageCircle,
      label: "Support IA",
      description: "Assistant intelligent 24/7",
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      onClick: onChatbotToggle,
      isActive: chatbotOpen,
    },
    {
      id: "quickActions",
      icon: Zap,
      label: "Actions Rapides",
      description: "Raccourcis intelligents",
      gradient: "from-amber-400 via-orange-500 to-red-500",
      onClick: onQuickActionsToggle,
      isActive: quickActionsOpen,
    },
    {
      id: "snippets",
      icon: Code2,
      label: "Code Snippets",
      description: "Bibliothèque de code",
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      onClick: onSnippetsToggle,
      isActive: snippetsOpen,
    },
    {
      id: "recommendations",
      icon: Compass,
      label: "Recommandations",
      description: "Parcours personnalisé",
      gradient: "from-emerald-400 via-green-500 to-teal-600",
      onClick: onRecommendationsToggle,
      isActive: recommendationsOpen,
    },
    {
      id: "recorder",
      icon: Video,
      label: "Enregistreur",
      description: recording ? "En cours..." : "Capturer l'écran",
      gradient: recording ? "from-red-500 via-rose-500 to-pink-600" : "from-pink-400 via-rose-500 to-red-500",
      onClick: onRecorderToggle,
      isActive: recording,
    },
  ];

  // Left side tools - Productivity & Focus
  const leftTools: ToolItem[] = [
    {
      id: "voice",
      icon: Mic,
      label: "Commandes Vocales",
      description: voiceListening ? "Écoute active..." : "Contrôle vocal",
      gradient: voiceListening ? "from-red-500 via-rose-500 to-pink-500" : "from-indigo-400 via-violet-500 to-purple-600",
      onClick: onVoiceToggle,
      isActive: voiceListening,
    },
    {
      id: "music",
      icon: Music,
      label: "Ambiance Sonore",
      description: musicPlaying ? "En lecture" : "Musique focus",
      gradient: musicPlaying ? "from-green-400 via-emerald-500 to-teal-500" : "from-fuchsia-400 via-pink-500 to-rose-500",
      onClick: onMusicToggle,
      isActive: musicOpen || musicPlaying,
    },
    {
      id: "timer",
      icon: Timer,
      label: "Focus Timer",
      description: timerRunning ? "Session active" : "Pomodoro",
      gradient: timerRunning ? "from-rose-500 via-red-500 to-orange-500" : "from-sky-400 via-blue-500 to-indigo-600",
      onClick: onTimerToggle,
      isActive: timerOpen || timerRunning,
    },
  ];

  const renderToolButton = (tool: ToolItem, index: number, position: "left" | "right") => {
    const isHovered = hoveredTool === tool.id;

    return (
      <TooltipProvider key={tool.id} delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              initial={{ opacity: 0, scale: 0.5, x: position === "right" ? 20 : -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: index * 0.08, type: "spring", stiffness: 400, damping: 25 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onHoverStart={() => setHoveredTool(tool.id)}
              onHoverEnd={() => setHoveredTool(null)}
              onClick={tool.onClick}
              className="relative group"
            >
              {/* Outer glow */}
              <motion.div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tool.gradient} blur-xl`}
                animate={{ 
                  opacity: isHovered || tool.isActive ? 0.7 : 0,
                  scale: isHovered ? 1.3 : 1
                }}
                transition={{ duration: 0.25 }}
              />

              {/* Pulse rings for active state */}
              {tool.isActive && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-white/40"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-white/20"
                    animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  />
                </>
              )}

              {/* Main button */}
              <div
                className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.gradient} shadow-lg flex items-center justify-center overflow-hidden transition-all duration-300 ${
                  isHovered || tool.isActive ? "shadow-2xl" : "shadow-md"
                }`}
              >
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/20" />
                
                {/* Shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: isHovered ? "100%" : "-100%" }}
                  transition={{ duration: 0.5 }}
                />

                {/* Icon with rotation for music */}
                <motion.div
                  animate={{ 
                    rotate: tool.isActive && tool.id === "music" ? 360 : 0,
                    scale: isHovered ? 1.1 : 1
                  }}
                  transition={{ 
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    scale: { duration: 0.2 }
                  }}
                >
                  <tool.icon className="w-5 h-5 text-white drop-shadow-lg relative z-10" />
                </motion.div>

                {/* Active dot indicator */}
                {tool.isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-white shadow-lg border-2 border-green-400"
                  />
                )}
              </div>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent 
            side={position === "right" ? "left" : "right"} 
            className="bg-card/95 backdrop-blur-xl border-border/50 px-3 py-2"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{tool.label}</span>
              <span className="text-xs text-muted-foreground">{tool.description}</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <>
      {/* Right Toolbar - Cleaner Design */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50"
      >
        <motion.div 
          className="relative"
          animate={{ width: rightExpanded ? "auto" : "auto" }}
        >
          {/* Glass background */}
          <div className="absolute inset-0 -m-3 rounded-3xl bg-background/40 backdrop-blur-2xl border border-white/10 shadow-2xl" />
          
          {/* Tools */}
          <div className="relative flex flex-col gap-3 p-2">
            {rightTools.map((tool, index) => renderToolButton(tool, index, "right"))}
          </div>

          {/* Decorative gradient line */}
          <motion.div
            className="absolute -left-1 top-4 bottom-4 w-0.5 rounded-full bg-gradient-to-b from-violet-500 via-purple-500 to-fuchsia-500 opacity-50"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Left Toolbar - Cleaner Design */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50"
      >
        <motion.div className="relative">
          {/* Glass background */}
          <div className="absolute inset-0 -m-3 rounded-3xl bg-background/40 backdrop-blur-2xl border border-white/10 shadow-2xl" />
          
          {/* Tools */}
          <div className="relative flex flex-col gap-3 p-2">
            {leftTools.map((tool, index) => renderToolButton(tool, index, "left"))}
          </div>

          {/* Decorative gradient line */}
          <motion.div
            className="absolute -right-1 top-4 bottom-4 w-0.5 rounded-full bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-500 opacity-50"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          />
        </motion.div>
      </motion.div>

      {/* AI Coach - Premium Side Panel Trigger */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="fixed right-0 top-[30%] z-40"
      >
        <motion.button
          whileHover={{ x: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAICoachToggle}
          className="relative group overflow-hidden"
        >
          {/* Main container */}
          <div className="relative rounded-l-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-3 py-4 shadow-2xl border-l border-t border-b border-white/20">
            {/* Animated shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Neural pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 50 100">
                <defs>
                  <pattern id="neural2" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="5" cy="5" r="0.8" fill="white" />
                  </pattern>
                </defs>
                <rect width="50" height="100" fill="url(#neural2)" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative flex flex-col items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm"
              >
                <Brain className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex items-center gap-1">
                <span className="text-white font-bold text-xs writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>AI</span>
                <Sparkles className="w-3 h-3 text-yellow-300" />
              </div>
            </div>

            {/* Active indicator */}
            {aiCoachOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                className="absolute left-0 top-0 w-1 bg-white rounded-r-full"
              />
            )}
          </div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-l-2xl bg-gradient-to-br from-violet-500 to-purple-500 blur-xl opacity-0 -z-10"
            whileHover={{ opacity: 0.6, scale: 1.2 }}
          />
        </motion.button>
      </motion.div>

      {/* Live Activity Counter - Left Side */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="fixed left-0 top-[30%] z-40"
      >
        <motion.button
          whileHover={{ x: 8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onActivityToggle}
          className="relative group overflow-hidden"
        >
          {/* Main container */}
          <div className="relative rounded-r-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 px-3 py-4 shadow-2xl border-r border-t border-b border-white/20">
            {/* Pulse animation */}
            <motion.div
              className="absolute inset-0 bg-white/10"
              animate={{ opacity: [0, 0.15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            
            {/* Content */}
            <div className="relative flex flex-col items-center gap-1">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm"
              >
                <Activity className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-white font-bold text-lg">{liveCount}</span>
              <div className="flex items-center gap-1">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-red-400"
                />
                <span className="text-white/80 text-[10px]">en ligne</span>
              </div>
            </div>

            {/* Active indicator */}
            {activityOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                className="absolute right-0 top-0 w-1 bg-white rounded-l-full"
              />
            )}
          </div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-r-2xl bg-gradient-to-br from-emerald-500 to-teal-500 blur-xl opacity-0 -z-10"
            whileHover={{ opacity: 0.6, scale: 1.2 }}
          />
        </motion.button>
      </motion.div>

      {/* Status Indicators - Bottom Left Corner */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="fixed left-4 bottom-4 z-40"
      >
        <div className="flex items-center gap-2 bg-background/60 backdrop-blur-xl rounded-full px-3 py-2 border border-white/10 shadow-lg">
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 text-green-400" />
            <span className="text-[10px] text-muted-foreground">Connecté</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] text-muted-foreground">Sécurisé</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1">
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
            </motion.div>
            <span className="text-[10px] text-muted-foreground">100%</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FloatingToolbar;
