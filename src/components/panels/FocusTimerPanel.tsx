import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, X, Coffee, Brain, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

type TimerMode = "focus" | "break" | "longBreak";

interface FocusTimerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isRunning: boolean;
  onRunningChange: (running: boolean) => void;
}

const FocusTimerPanel = ({ isOpen, onClose, isRunning, onRunningChange }: FocusTimerPanelProps) => {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const modes: Record<TimerMode, { duration: number; label: string; icon: typeof Brain }> = {
    focus: { duration: 25 * 60, label: "Focus", icon: Brain },
    break: { duration: 5 * 60, label: "Pause", icon: Coffee },
    longBreak: { duration: 15 * 60, label: "Longue Pause", icon: Coffee },
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    onRunningChange(false);
    if (mode === "focus") {
      setSessions((prev) => prev + 1);
      toast.success("🎉 Session terminée !");
      if ((sessions + 1) % 4 === 0) { setMode("longBreak"); setTimeLeft(modes.longBreak.duration); }
      else { setMode("break"); setTimeLeft(modes.break.duration); }
    } else {
      toast.info("⏰ Pause terminée !");
      setMode("focus");
      setTimeLeft(modes.focus.duration);
    }
  };

  const resetTimer = () => { onRunningChange(false); setTimeLeft(modes[mode].duration); };
  const selectMode = (newMode: TimerMode) => { onRunningChange(false); setMode(newMode); setTimeLeft(modes[newMode].duration); };
  const formatTime = (seconds: number) => `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
  const progress = ((modes[mode].duration - timeLeft) / modes[mode].duration) * 100;
  const Icon = modes[mode].icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-28 left-4 z-50 w-72"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10">
            <div className="absolute inset-0 bg-card/80 backdrop-blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 via-transparent to-blue-500/5" />
            
            <div className="relative">
              {/* Header */}
              <div className={`p-4 ${mode === "focus" ? "bg-gradient-to-r from-rose-500/20 to-pink-500/20" : "bg-gradient-to-r from-teal-500/20 to-cyan-500/20"}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{modes[mode].label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{sessions} sessions</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Timer Display */}
              <div className="p-6 text-center">
                <div className="relative inline-block">
                  <svg className="w-36 h-36 transform -rotate-90">
                    <circle cx="72" cy="72" r="65" stroke="currentColor" strokeWidth="6" fill="none" className="text-muted" />
                    <motion.circle
                      cx="72" cy="72" r="65" stroke="url(#timerGradient)" strokeWidth="6" fill="none" strokeLinecap="round"
                      strokeDasharray={408} strokeDashoffset={408 - (progress / 100) * 408}
                    />
                    <defs>
                      <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={mode === "focus" ? "#f43f5e" : "#14b8a6"} />
                        <stop offset="100%" stopColor={mode === "focus" ? "#ec4899" : "#06b6d4"} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold font-mono">{formatTime(timeLeft)}</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="px-4 pb-4 flex items-center justify-center gap-3">
                <Button variant="outline" size="icon" onClick={resetTimer} className="rounded-xl"><RotateCcw className="w-4 h-4" /></Button>
                <Button
                  size="lg" onClick={() => onRunningChange(!isRunning)}
                  className={`h-12 w-12 rounded-xl ${mode === "focus" ? "bg-gradient-to-br from-rose-500 to-pink-600" : "bg-gradient-to-br from-teal-500 to-cyan-600"}`}
                >
                  {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </Button>
              </div>

              {/* Mode Selector */}
              <div className="border-t border-white/10 p-3 flex gap-2">
                {(Object.keys(modes) as TimerMode[]).map((m) => (
                  <Button key={m} variant={mode === m ? "default" : "ghost"} size="sm" onClick={() => selectMode(m)} className="flex-1 text-xs rounded-xl">
                    {modes[m].label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FocusTimerPanel;
