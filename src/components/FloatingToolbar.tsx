import { useState } from "react";
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
  Palette,
  Users,
  Glasses,
  Wifi,
  Shield,
  Battery,
  Cloud,
  Rocket,
  Fingerprint,
  Atom,
  Cpu,
  Wand2,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ToolItem {
  id: string;
  icon: typeof MessageCircle;
  label: string;
  description: string;
  gradient: string;
  glowColor: string;
  onClick: () => void;
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
  // New 2026 features
  onARModeToggle?: () => void;
  arModeActive?: boolean;
  onCollabToggle?: () => void;
  collabActive?: boolean;
  onThemesToggle?: () => void;
  themesOpen?: boolean;
  onQuantumToggle?: () => void;
  quantumActive?: boolean;
  onBiometricsToggle?: () => void;
  biometricsActive?: boolean;
  onCloudSyncToggle?: () => void;
  cloudSyncActive?: boolean;
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
  onQuantumToggle,
  quantumActive = false,
  onBiometricsToggle,
  biometricsActive = false,
  onCloudSyncToggle,
  cloudSyncActive = false,
}: FloatingToolbarProps) => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  // Separated floating icons with unique positions
  const floatingIcons: (ToolItem & { position: { right?: string; left?: string; top?: string; bottom?: string } })[] = [
    // Right side - Communication
    {
      id: "chatbot",
      icon: MessageCircle,
      label: "Support IA",
      description: "Assistant intelligent 24/7",
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      glowColor: "rgba(139, 92, 246, 0.6)",
      onClick: onChatbotToggle,
      isActive: chatbotOpen,
      position: { right: "20px", top: "15%" },
    },
    {
      id: "quickActions",
      icon: Zap,
      label: "Actions Rapides",
      description: "Raccourcis intelligents",
      gradient: "from-amber-400 via-orange-500 to-red-500",
      glowColor: "rgba(245, 158, 11, 0.6)",
      onClick: onQuickActionsToggle,
      isActive: quickActionsOpen,
      position: { right: "20px", top: "25%" },
    },
    {
      id: "snippets",
      icon: Code2,
      label: "Code Snippets",
      description: "Bibliothèque de code",
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      glowColor: "rgba(59, 130, 246, 0.6)",
      onClick: onSnippetsToggle,
      isActive: snippetsOpen,
      position: { right: "20px", top: "35%" },
    },
    {
      id: "recommendations",
      icon: Compass,
      label: "Recommandations",
      description: "Parcours personnalisé",
      gradient: "from-emerald-400 via-green-500 to-teal-600",
      glowColor: "rgba(16, 185, 129, 0.6)",
      onClick: onRecommendationsToggle,
      isActive: recommendationsOpen,
      position: { right: "20px", top: "45%" },
    },
    {
      id: "recorder",
      icon: Video,
      label: "Enregistreur",
      description: recording ? "En cours..." : "Capturer l'écran",
      gradient: recording ? "from-red-500 via-rose-500 to-pink-600" : "from-pink-400 via-rose-500 to-red-500",
      glowColor: "rgba(244, 63, 94, 0.6)",
      onClick: onRecorderToggle,
      isActive: recording,
      position: { right: "20px", top: "55%" },
    },
    // Right side - New 2026 features
    {
      id: "arMode",
      icon: Glasses,
      label: "Mode AR/VR",
      description: "Apprentissage immersif 3D",
      gradient: "from-cyan-500 via-sky-500 to-blue-600",
      glowColor: "rgba(14, 165, 233, 0.6)",
      onClick: onARModeToggle || (() => {}),
      isActive: arModeActive,
      position: { right: "20px", top: "65%" },
    },
    {
      id: "collab",
      icon: Users,
      label: "Collaboration",
      description: "Travail d'équipe en temps réel",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      glowColor: "rgba(129, 140, 248, 0.6)",
      onClick: onCollabToggle || (() => {}),
      isActive: collabActive,
      position: { right: "20px", top: "75%" },
    },
    // Left side - Productivity
    {
      id: "voice",
      icon: Mic,
      label: "Commandes Vocales",
      description: voiceListening ? "Écoute active..." : "Contrôle vocal",
      gradient: voiceListening ? "from-red-500 via-rose-500 to-pink-500" : "from-indigo-400 via-violet-500 to-purple-600",
      glowColor: "rgba(139, 92, 246, 0.6)",
      onClick: onVoiceToggle,
      isActive: voiceListening,
      position: { left: "20px", top: "20%" },
    },
    {
      id: "music",
      icon: Music,
      label: "Ambiance Sonore",
      description: musicPlaying ? "En lecture" : "Musique focus",
      gradient: musicPlaying ? "from-green-400 via-emerald-500 to-teal-500" : "from-fuchsia-400 via-pink-500 to-rose-500",
      glowColor: "rgba(236, 72, 153, 0.6)",
      onClick: onMusicToggle,
      isActive: musicOpen || musicPlaying,
      position: { left: "20px", top: "30%" },
    },
    {
      id: "timer",
      icon: Timer,
      label: "Focus Timer",
      description: timerRunning ? "Session active" : "Pomodoro",
      gradient: timerRunning ? "from-rose-500 via-red-500 to-orange-500" : "from-sky-400 via-blue-500 to-indigo-600",
      glowColor: "rgba(56, 189, 248, 0.6)",
      onClick: onTimerToggle,
      isActive: timerOpen || timerRunning,
      position: { left: "20px", top: "40%" },
    },
    {
      id: "themes",
      icon: Palette,
      label: "Thèmes",
      description: "Personnalisation visuelle",
      gradient: "from-rose-400 via-pink-500 to-purple-600",
      glowColor: "rgba(236, 72, 153, 0.6)",
      onClick: onThemesToggle || (() => {}),
      isActive: themesOpen,
      position: { left: "20px", top: "50%" },
    },
    // Left side - New 2026 features
    {
      id: "quantum",
      icon: Atom,
      label: "Quantum AI",
      description: "Calcul quantique avancé",
      gradient: "from-violet-500 via-purple-500 to-indigo-600",
      glowColor: "rgba(139, 92, 246, 0.6)",
      onClick: onQuantumToggle || (() => {}),
      isActive: quantumActive,
      position: { left: "20px", top: "60%" },
    },
    {
      id: "biometrics",
      icon: Fingerprint,
      label: "Biométrie",
      description: "Auth par empreinte",
      gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      glowColor: "rgba(20, 184, 166, 0.6)",
      onClick: onBiometricsToggle || (() => {}),
      isActive: biometricsActive,
      position: { left: "20px", top: "70%" },
    },
    {
      id: "cloudSync",
      icon: Cloud,
      label: "Cloud Sync",
      description: "Synchronisation mondiale",
      gradient: "from-sky-400 via-blue-500 to-indigo-600",
      glowColor: "rgba(59, 130, 246, 0.6)",
      onClick: onCloudSyncToggle || (() => {}),
      isActive: cloudSyncActive,
      position: { left: "20px", top: "80%" },
    },
  ];

  const renderFloatingIcon = (tool: typeof floatingIcons[0], index: number) => {
    const isHovered = hoveredTool === tool.id;
    const isLeft = tool.position.left !== undefined;

    return (
      <motion.div
        key={tool.id}
        initial={{ opacity: 0, scale: 0, x: isLeft ? -50 : 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.3 + index * 0.05, type: "spring", stiffness: 300, damping: 20 }}
        style={{
          position: "fixed",
          ...tool.position,
          zIndex: 50,
        }}
        className="group"
      >
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => setHoveredTool(tool.id)}
                onHoverEnd={() => setHoveredTool(null)}
                onClick={tool.onClick}
                className="relative"
              >
                {/* Outer glow ring */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tool.gradient}`}
                  style={{ filter: `blur(12px)` }}
                  animate={{
                    opacity: isHovered || tool.isActive ? 0.8 : 0.3,
                    scale: isHovered ? 1.4 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Pulse rings for active state */}
                <AnimatePresence>
                  {tool.isActive && (
                    <>
                      <motion.div
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className={`absolute inset-0 rounded-2xl border-2 border-white/50`}
                      />
                      <motion.div
                        initial={{ scale: 1, opacity: 0.4 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                        className={`absolute inset-0 rounded-2xl border border-white/30`}
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* Main button with glass effect */}
                <div
                  className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} shadow-2xl flex items-center justify-center overflow-hidden border border-white/20`}
                >
                  {/* Glass inner highlight */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20" />

                  {/* Shimmer on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: isHovered ? "100%" : "-100%" }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Rotating icon for music */}
                  <motion.div
                    animate={{
                      rotate: tool.isActive && tool.id === "music" ? 360 : 0,
                      scale: isHovered ? 1.15 : 1,
                    }}
                    transition={{
                      rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                      scale: { duration: 0.2 },
                    }}
                    className="relative z-10"
                  >
                    <tool.icon className="w-6 h-6 text-white drop-shadow-lg" />
                  </motion.div>

                  {/* Active indicator dot */}
                  {tool.isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white shadow-lg flex items-center justify-center"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent
              side={isLeft ? "right" : "left"}
              className="bg-background/95 backdrop-blur-xl border-border/50 px-4 py-3 shadow-2xl"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-sm text-foreground">{tool.label}</span>
                <span className="text-xs text-muted-foreground">{tool.description}</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
    );
  };

  return (
    <>
      {/* Render all floating icons */}
      {floatingIcons.map((tool, index) => renderFloatingIcon(tool, index))}

      {/* AI Coach - Premium Side Panel Trigger */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="fixed right-0 top-[50%] -translate-y-1/2 z-40"
      >
        <motion.button
          whileHover={{ x: -12, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAICoachToggle}
          className="relative group overflow-hidden"
        >
          {/* Main container */}
          <div className="relative rounded-l-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-4 py-6 shadow-2xl border-l border-t border-b border-white/20">
            {/* Animated shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Neural pattern background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '8px 8px'
              }} />
            </div>

            {/* Content */}
            <div className="relative flex flex-col items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30"
              >
                <Brain className="w-6 h-6 text-white" />
              </motion.div>
              <div className="flex flex-col items-center">
                <span className="text-white font-bold text-sm" style={{ writingMode: 'vertical-rl' }}>AI COACH</span>
                <Sparkles className="w-4 h-4 text-yellow-300 mt-2" />
              </div>
            </div>

            {/* Active indicator */}
            {aiCoachOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                className="absolute left-0 top-0 w-1.5 bg-white rounded-r-full"
              />
            )}
          </div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-l-3xl bg-gradient-to-br from-violet-500 to-purple-500 blur-2xl opacity-0 -z-10"
            whileHover={{ opacity: 0.7, scale: 1.3 }}
          />
        </motion.button>
      </motion.div>

      {/* Live Activity Counter - Left Side */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="fixed left-0 top-[50%] -translate-y-1/2 z-40"
      >
        <motion.button
          whileHover={{ x: 12, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onActivityToggle}
          className="relative group overflow-hidden"
        >
          {/* Main container */}
          <div className="relative rounded-r-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 px-4 py-6 shadow-2xl border-r border-t border-b border-white/20">
            {/* Pulse animation */}
            <motion.div
              className="absolute inset-0 bg-white/10"
              animate={{ opacity: [0, 0.2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Content */}
            <div className="relative flex flex-col items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30"
              >
                <Activity className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-white font-bold text-xl">{liveCount}</span>
              <div className="flex items-center gap-1.5">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2.5 h-2.5 rounded-full bg-red-400"
                />
                <span className="text-white/90 text-xs font-medium">LIVE</span>
              </div>
            </div>

            {/* Active indicator */}
            {activityOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                className="absolute right-0 top-0 w-1.5 bg-white rounded-l-full"
              />
            )}
          </div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-r-3xl bg-gradient-to-br from-emerald-500 to-teal-500 blur-2xl opacity-0 -z-10"
            whileHover={{ opacity: 0.7, scale: 1.3 }}
          />
        </motion.button>
      </motion.div>

      {/* Bottom Status Bar - Futuristic 2026 */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="fixed left-1/2 -translate-x-1/2 bottom-4 z-40"
      >
        <div className="flex items-center gap-4 bg-background/80 backdrop-blur-2xl rounded-full px-6 py-3 border border-white/10 shadow-2xl">
          {/* Connection status */}
          <motion.div 
            className="flex items-center gap-2"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Wifi className="w-4 h-4 text-green-400" />
            <span className="text-xs text-muted-foreground font-medium">5G Ultra</span>
          </motion.div>

          <div className="w-px h-4 bg-border" />

          {/* Security */}
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-muted-foreground font-medium">Quantique</span>
          </div>

          <div className="w-px h-4 bg-border" />

          {/* Neural Processing */}
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-muted-foreground font-medium">Neural 2.0</span>
          </div>

          <div className="w-px h-4 bg-border" />

          {/* Battery */}
          <div className="flex items-center gap-2">
            <Battery className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-muted-foreground font-medium">∞</span>
          </div>

          <div className="w-px h-4 bg-border" />

          {/* AI Status */}
          <motion.div 
            className="flex items-center gap-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Wand2 className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-muted-foreground font-medium">IA Active</span>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default FloatingToolbar;
