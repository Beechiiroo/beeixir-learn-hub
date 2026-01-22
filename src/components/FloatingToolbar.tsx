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
  Fingerprint,
  Atom,
  Cpu,
  Wand2,
  Focus,
  Eye,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useFuturisticSounds, FuturisticSoundType } from "@/hooks/useFuturisticSounds";

interface ToolItem {
  id: string;
  icon: typeof MessageCircle;
  label: string;
  description: string;
  gradient: string;
  glowColor: string;
  onClick: () => void;
  isActive?: boolean;
  soundType: FuturisticSoundType;
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
  onFocusModeToggle?: () => void;
  focusModeActive?: boolean;
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
  onFocusModeToggle,
  focusModeActive = false,
}: FloatingToolbarProps) => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const { playSound } = useFuturisticSounds();

  // Left sidebar icons - well spaced and professional
  const leftIcons: (ToolItem & { order: number })[] = [
    {
      id: "voice",
      icon: Mic,
      label: "Commandes Vocales",
      description: voiceListening ? "Écoute active..." : "Contrôle vocal IA",
      gradient: voiceListening ? "from-red-500 to-rose-600" : "from-violet-500 to-purple-600",
      glowColor: "rgba(139, 92, 246, 0.5)",
      onClick: onVoiceToggle,
      isActive: voiceListening,
      soundType: "voice-activate",
      order: 0,
    },
    {
      id: "music",
      icon: Music,
      label: "Ambiance Sonore",
      description: musicPlaying ? "En lecture" : "Musique focus",
      gradient: musicPlaying ? "from-green-500 to-emerald-600" : "from-orange-500 to-amber-600",
      glowColor: "rgba(249, 115, 22, 0.5)",
      onClick: onMusicToggle,
      isActive: musicOpen || musicPlaying,
      soundType: "music-start",
      order: 1,
    },
    {
      id: "timer",
      icon: Timer,
      label: "Focus Timer",
      description: timerRunning ? "Session active" : "Pomodoro 25min",
      gradient: timerRunning ? "from-red-500 to-orange-500" : "from-cyan-500 to-blue-600",
      glowColor: "rgba(6, 182, 212, 0.5)",
      onClick: onTimerToggle,
      isActive: timerOpen || timerRunning,
      soundType: "timer-tick",
      order: 2,
    },
    {
      id: "quantum",
      icon: Atom,
      label: "Quantum AI",
      description: "Intelligence quantique",
      gradient: "from-pink-500 to-rose-600",
      glowColor: "rgba(236, 72, 153, 0.5)",
      onClick: onQuantumToggle || (() => {}),
      isActive: quantumActive,
      soundType: "quantum-activate",
      order: 3,
    },
    {
      id: "biometrics",
      icon: Fingerprint,
      label: "Biométrie",
      description: "Authentification sécurisée",
      gradient: "from-emerald-500 to-teal-600",
      glowColor: "rgba(20, 184, 166, 0.5)",
      onClick: onBiometricsToggle || (() => {}),
      isActive: biometricsActive,
      soundType: "biometric-scan",
      order: 4,
    },
    {
      id: "cloudSync",
      icon: Cloud,
      label: "Cloud Sync",
      description: "Synchronisation globale",
      gradient: "from-sky-500 to-indigo-600",
      glowColor: "rgba(59, 130, 246, 0.5)",
      onClick: onCloudSyncToggle || (() => {}),
      isActive: cloudSyncActive,
      soundType: "cloud-sync",
      order: 5,
    },
  ];

  // Right sidebar icons - well spaced and professional
  const rightIcons: (ToolItem & { order: number })[] = [
    {
      id: "chatbot",
      icon: MessageCircle,
      label: "Support IA",
      description: "Assistant intelligent 24/7",
      gradient: "from-violet-500 to-fuchsia-600",
      glowColor: "rgba(139, 92, 246, 0.5)",
      onClick: onChatbotToggle,
      isActive: chatbotOpen,
      soundType: "ai-response",
      order: 0,
    },
    {
      id: "quickActions",
      icon: Zap,
      label: "Actions Rapides",
      description: "Raccourcis intelligents",
      gradient: "from-amber-500 to-orange-600",
      glowColor: "rgba(245, 158, 11, 0.5)",
      onClick: onQuickActionsToggle,
      isActive: quickActionsOpen,
      soundType: "holographic-click",
      order: 1,
    },
    {
      id: "snippets",
      icon: Code2,
      label: "Code Snippets",
      description: "Bibliothèque de code",
      gradient: "from-cyan-500 to-blue-600",
      glowColor: "rgba(6, 182, 212, 0.5)",
      onClick: onSnippetsToggle,
      isActive: snippetsOpen,
      soundType: "code-snippet",
      order: 2,
    },
    {
      id: "recommendations",
      icon: Compass,
      label: "Recommandations",
      description: "Parcours personnalisé",
      gradient: "from-emerald-500 to-green-600",
      glowColor: "rgba(16, 185, 129, 0.5)",
      onClick: onRecommendationsToggle,
      isActive: recommendationsOpen,
      soundType: "recommendation",
      order: 3,
    },
    {
      id: "recorder",
      icon: Video,
      label: "Enregistreur",
      description: recording ? "En cours..." : "Capturer l'écran",
      gradient: recording ? "from-red-500 to-rose-600" : "from-pink-500 to-rose-600",
      glowColor: "rgba(244, 63, 94, 0.5)",
      onClick: onRecorderToggle,
      isActive: recording,
      soundType: "recorder-start",
      order: 4,
    },
    {
      id: "arMode",
      icon: Glasses,
      label: "Mode AR/VR",
      description: "Apprentissage immersif",
      gradient: "from-indigo-500 to-violet-600",
      glowColor: "rgba(99, 102, 241, 0.5)",
      onClick: onARModeToggle || (() => {}),
      isActive: arModeActive,
      soundType: "ar-toggle",
      order: 5,
    },
    {
      id: "collab",
      icon: Users,
      label: "Collaboration",
      description: "Travail d'équipe",
      gradient: "from-purple-500 to-pink-600",
      glowColor: "rgba(168, 85, 247, 0.5)",
      onClick: onCollabToggle || (() => {}),
      isActive: collabActive,
      soundType: "collaboration",
      order: 6,
    },
    {
      id: "themes",
      icon: Palette,
      label: "Thèmes",
      description: "Personnalisation",
      gradient: "from-rose-500 to-red-600",
      glowColor: "rgba(244, 63, 94, 0.5)",
      onClick: onThemesToggle || (() => {}),
      isActive: themesOpen,
      soundType: "theme-switch",
      order: 7,
    },
  ];

  const renderIcon = (tool: ToolItem & { order: number }, isLeft: boolean) => {
    const isHovered = hoveredTool === tool.id;

    return (
      <TooltipProvider key={tool.id} delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.15, x: isLeft ? 4 : -4 }}
              whileTap={{ scale: 0.92 }}
              onHoverStart={() => {
                setHoveredTool(tool.id);
                playSound("cyber-hover");
              }}
              onHoverEnd={() => setHoveredTool(null)}
              onClick={() => {
                playSound(tool.soundType);
                tool.onClick();
              }}
              className="relative"
            >
              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tool.gradient}`}
                style={{ filter: "blur(10px)" }}
                animate={{
                  opacity: isHovered || tool.isActive ? 0.7 : 0.2,
                  scale: isHovered ? 1.3 : 1,
                }}
                transition={{ duration: 0.25 }}
              />

              {/* Pulse rings for active */}
              <AnimatePresence>
                {tool.isActive && (
                  <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="absolute inset-0 rounded-xl border-2 border-white/40"
                  />
                )}
              </AnimatePresence>

              {/* Main button */}
              <div
                className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} shadow-xl flex items-center justify-center overflow-hidden border border-white/25`}
              >
                {/* Glass highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20" />

                {/* Shimmer on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: isHovered ? "100%" : "-100%" }}
                  transition={{ duration: 0.5 }}
                />

                {/* Icon */}
                <motion.div
                  animate={{
                    rotate: tool.isActive && tool.id === "music" ? 360 : 0,
                    scale: isHovered ? 1.1 : 1,
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 0.2 },
                  }}
                  className="relative z-10"
                >
                  <tool.icon className="w-5 h-5 text-white drop-shadow-md" />
                </motion.div>

                {/* Active indicator */}
                {tool.isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-white shadow flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent
            side={isLeft ? "right" : "left"}
            className="bg-background/95 backdrop-blur-xl border-border/50 px-3 py-2 shadow-xl"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-xs text-foreground">{tool.label}</span>
              <span className="text-[10px] text-muted-foreground">{tool.description}</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <>
      {/* Left Sidebar - Vertically centered icons */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
      >
        {leftIcons.map((tool) => renderIcon(tool, true))}
      </motion.div>

      {/* Right Sidebar - Vertically centered icons */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
      >
        {rightIcons.map((tool) => renderIcon(tool, false))}
      </motion.div>

      {/* TOP PREMIUM BAR - AI Coach, Live Activity, Focus Mode */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
        className="fixed top-24 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="flex items-center gap-4 p-2 rounded-2xl bg-background/60 backdrop-blur-2xl border border-white/15 shadow-2xl">
          {/* AI Learning Coach */}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playSound("neural-pulse");
                    onAICoachToggle();
                  }}
                  className="relative group"
                >
                  {/* Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600"
                    style={{ filter: "blur(12px)" }}
                    animate={{ opacity: aiCoachOpen ? 0.8 : 0.3, scale: aiCoachOpen ? 1.2 : 1 }}
                  />
                  
                  {/* Main button */}
                  <div className={`relative flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 shadow-xl border border-white/25 ${aiCoachOpen ? 'ring-2 ring-white/50' : ''}`}>
                    {/* Shimmer */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    />
                    
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="relative w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm"
                    >
                      <Brain className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="relative flex flex-col items-start">
                      <span className="text-white font-bold text-sm">AI Learning Coach</span>
                      <span className="text-white/70 text-xs">Assistant IA Personnel</span>
                    </div>
                    <Sparkles className="w-4 h-4 text-yellow-300 ml-1" />
                  </div>

                  {/* Pulse ring */}
                  {aiCoachOpen && (
                    <motion.div
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl border-2 border-purple-400"
                    />
                  )}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-background/95 backdrop-blur-xl border-border/50">
                <span className="font-medium text-xs">Coach IA Personnalisé</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Separator */}
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent" />

          {/* Live Activity */}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playSound("success-chime");
                    onActivityToggle();
                  }}
                  className="relative group"
                >
                  {/* Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600"
                    style={{ filter: "blur(12px)" }}
                    animate={{ opacity: activityOpen ? 0.8 : 0.3, scale: activityOpen ? 1.2 : 1 }}
                  />
                  
                  {/* Main button */}
                  <div className={`relative flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 shadow-xl border border-white/25 ${activityOpen ? 'ring-2 ring-white/50' : ''}`}>
                    {/* Pulse animation */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-white/10"
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="relative w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm"
                    >
                      <Activity className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="relative flex flex-col items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-sm">Activité Live</span>
                        <motion.div
                          animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-red-400"
                        />
                      </div>
                      <span className="text-white/70 text-xs">{liveCount} utilisateurs actifs</span>
                    </div>
                  </div>

                  {/* Pulse ring */}
                  {activityOpen && (
                    <motion.div
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl border-2 border-emerald-400"
                    />
                  )}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-background/95 backdrop-blur-xl border-border/50">
                <span className="font-medium text-xs">Voir l'activité en temps réel</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Separator */}
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent" />

          {/* Focus Mode */}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playSound("focus-mode");
                    onFocusModeToggle?.();
                  }}
                  className="relative group"
                >
                  {/* Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600"
                    style={{ filter: "blur(12px)" }}
                    animate={{ opacity: focusModeActive ? 0.8 : 0.3, scale: focusModeActive ? 1.2 : 1 }}
                  />
                  
                  {/* Main button */}
                  <div className={`relative flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 shadow-xl border border-white/25 ${focusModeActive ? 'ring-2 ring-white/50' : ''}`}>
                    {/* Shimmer */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-200%" }}
                      animate={{ x: focusModeActive ? "200%" : "-200%" }}
                      transition={{ duration: 1.5, repeat: focusModeActive ? Infinity : 0 }}
                    />
                    
                    <motion.div
                      animate={{ scale: focusModeActive ? [1, 1.15, 1] : 1 }}
                      transition={{ duration: 1.5, repeat: focusModeActive ? Infinity : 0 }}
                      className="relative w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm"
                    >
                      <Eye className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="relative flex flex-col items-start">
                      <span className="text-white font-bold text-sm">Mode Focus</span>
                      <span className="text-white/70 text-xs">{focusModeActive ? 'Activé' : 'Concentration max'}</span>
                    </div>
                    <Focus className="w-4 h-4 text-yellow-200 ml-1" />
                  </div>

                  {/* Pulse ring */}
                  {focusModeActive && (
                    <motion.div
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl border-2 border-amber-400"
                    />
                  )}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-background/95 backdrop-blur-xl border-border/50">
                <span className="font-medium text-xs">Activer le mode concentration</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </motion.div>

      {/* Bottom Status Bar - Futuristic 2026 */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
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
