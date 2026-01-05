import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Timer, Play, Pause, RotateCcw, X, Coffee, Brain, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

type TimerMode = "focus" | "break" | "longBreak";

const FocusTimer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const modes: Record<TimerMode, { duration: number; label: string; icon: typeof Brain }> = {
    focus: { duration: 25 * 60, label: "Focus", icon: Brain },
    break: { duration: 5 * 60, label: "Pause", icon: Coffee },
    longBreak: { duration: 15 * 60, label: "Longue Pause", icon: Coffee },
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (mode === "focus") {
      setSessions((prev) => prev + 1);
      toast.success("🎉 Session de focus terminée ! Prenez une pause.");
      
      if ((sessions + 1) % 4 === 0) {
        setMode("longBreak");
        setTimeLeft(modes.longBreak.duration);
      } else {
        setMode("break");
        setTimeLeft(modes.break.duration);
      }
    } else {
      toast.info("⏰ Pause terminée ! Prêt pour une nouvelle session ?");
      setMode("focus");
      setTimeLeft(modes.focus.duration);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modes[mode].duration);
  };

  const selectMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(modes[newMode].duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((modes[mode].duration - timeLeft) / modes[mode].duration) * 100;
  const Icon = modes[mode].icon;

  return (
    <>
      {/* Timer Button */}
      <motion.div
        className="fixed bottom-6 left-20 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className={`w-12 h-12 rounded-full shadow-lg relative overflow-hidden ${
            isRunning && mode === "focus" ? "bg-gradient-to-br from-rose-500 to-pink-600" : ""
          }`}
          variant={isRunning ? "default" : "secondary"}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Timer className="w-5 h-5" />}
          {isRunning && !isOpen && (
            <motion.div
              className="absolute inset-0 border-2 border-white/50 rounded-full"
              style={{ 
                background: `conic-gradient(transparent ${progress}%, rgba(255,255,255,0.3) ${progress}%)` 
              }}
            />
          )}
        </Button>
      </motion.div>

      {/* Timer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 left-6 z-50 w-72"
          >
            <div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border overflow-hidden">
              {/* Header */}
              <div className={`p-4 ${
                mode === "focus" 
                  ? "bg-gradient-to-r from-rose-500 to-pink-600" 
                  : "bg-gradient-to-r from-teal-500 to-cyan-600"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-white" />
                    <span className="font-medium text-white">{modes[mode].label}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/80 text-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{sessions} sessions</span>
                  </div>
                </div>
              </div>

              {/* Timer Display */}
              <div className="p-6 text-center">
                <div className="relative inline-block">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted"
                    />
                    <motion.circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={440}
                      strokeDashoffset={440 - (progress / 100) * 440}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={mode === "focus" ? "#f43f5e" : "#14b8a6"} />
                        <stop offset="100%" stopColor={mode === "focus" ? "#ec4899" : "#06b6d4"} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold font-mono">{formatTime(timeLeft)}</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="px-4 pb-4 flex items-center justify-center gap-3">
                <Button variant="outline" size="icon" onClick={resetTimer}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  onClick={toggleTimer}
                  className={`h-12 w-12 rounded-full ${
                    mode === "focus"
                      ? "bg-gradient-to-br from-rose-500 to-pink-600"
                      : "bg-gradient-to-br from-teal-500 to-cyan-600"
                  }`}
                >
                  {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </Button>
              </div>

              {/* Mode Selector */}
              <div className="border-t border-border p-3 flex gap-2">
                {(Object.keys(modes) as TimerMode[]).map((m) => (
                  <Button
                    key={m}
                    variant={mode === m ? "default" : "ghost"}
                    size="sm"
                    onClick={() => selectMode(m)}
                    className="flex-1 text-xs"
                  >
                    {modes[m].label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FocusTimer;
