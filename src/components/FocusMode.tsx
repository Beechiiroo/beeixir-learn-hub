import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Focus, X, Moon, Volume2, VolumeX, Timer, Coffee } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface FocusModeContextType {
  isFocusMode: boolean;
  toggleFocusMode: () => void;
  focusTime: number;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const FocusModeContext = createContext<FocusModeContextType | null>(null);

export const useFocusMode = () => {
  const context = useContext(FocusModeContext);
  if (!context) {
    throw new Error("useFocusMode must be used within FocusModeProvider");
  }
  return context;
};

export const FocusModeProvider = ({ children }: { children: ReactNode }) => {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [focusTime, setFocusTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isFocusMode) {
      interval = setInterval(() => {
        setFocusTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFocusMode]);

  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
    if (isFocusMode) {
      setFocusTime(0);
    }
  };

  const toggleSound = () => setSoundEnabled(!soundEnabled);

  return (
    <FocusModeContext.Provider
      value={{ isFocusMode, toggleFocusMode, focusTime, soundEnabled, toggleSound }}
    >
      {children}
      <FocusModeOverlay />
      <FocusModeButton />
    </FocusModeContext.Provider>
  );
};

const FocusModeButton = () => {
  const { isFocusMode, toggleFocusMode } = useFocusMode();

  return (
    <motion.div
      className="fixed bottom-24 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1 }}
    >
      <Button
        onClick={toggleFocusMode}
        variant={isFocusMode ? "neural" : "outline"}
        size="icon"
        className={cn(
          "rounded-full w-12 h-12 shadow-lg",
          isFocusMode && "animate-pulse"
        )}
      >
        {isFocusMode ? <X className="w-5 h-5" /> : <Focus className="w-5 h-5" />}
      </Button>
    </motion.div>
  );
};

const FocusModeOverlay = () => {
  const { isFocusMode, focusTime, soundEnabled, toggleSound } = useFocusMode();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {isFocusMode && (
        <>
          {/* Dimming overlay for non-essential elements */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Focus timer panel */}
          <motion.div
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
          >
            <div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-primary/20 px-8 py-4 flex items-center gap-6">
              <div className="flex items-center gap-2 text-primary">
                <Moon className="w-5 h-5" />
                <span className="font-semibold">Mode Focus</span>
              </div>

              <div className="flex items-center gap-2 text-2xl font-mono font-bold">
                <Timer className="w-5 h-5 text-muted-foreground" />
                {formatTime(focusTime)}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSound}
                className="rounded-full"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </Button>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Coffee className="w-4 h-4" />
                <span>Concentré</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FocusModeProvider;
