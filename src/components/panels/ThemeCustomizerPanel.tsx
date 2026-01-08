import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Palette, Sun, Moon, Sparkles, Check, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "next-themes";
interface ThemeCustomizerPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeCustomizerPanel = ({ isOpen, onClose }: ThemeCustomizerPanelProps) => {
  const { theme, setTheme } = useTheme();
  const [activePreset, setActivePreset] = useState("ocean");
  const [glowIntensity, setGlowIntensity] = useState([50]);
  const [animationSpeed, setAnimationSpeed] = useState([50]);

  const colorPresets = [
    { id: "ocean", name: "Ocean", colors: ["#0ea5e9", "#0284c7", "#0369a1"], emoji: "🌊" },
    { id: "forest", name: "Forest", colors: ["#22c55e", "#16a34a", "#15803d"], emoji: "🌲" },
    { id: "sunset", name: "Sunset", colors: ["#f97316", "#ea580c", "#c2410c"], emoji: "🌅" },
    { id: "galaxy", name: "Galaxy", colors: ["#a855f7", "#9333ea", "#7e22ce"], emoji: "🌌" },
    { id: "rose", name: "Rose", colors: ["#f43f5e", "#e11d48", "#be123c"], emoji: "🌹" },
    { id: "aurora", name: "Aurora", colors: ["#14b8a6", "#0d9488", "#0f766e"], emoji: "✨" },
  ];

  const themes = [
    { id: "light", name: "Clair", icon: Sun },
    { id: "dark", name: "Sombre", icon: Moon },
    { id: "system", name: "Auto", icon: Sparkles },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed right-20 bottom-20 z-50 w-72"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-900/90 via-purple-900/90 to-indigo-900/90 backdrop-blur-2xl border border-white/20 shadow-2xl">
            {/* Header */}
            <div className="relative p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center"
                  >
                    <Palette className="w-4 h-4 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-white">Personnalisation</h3>
                    <p className="text-xs text-white/60">Thèmes & couleurs</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* Theme mode selector */}
              <div>
                <h4 className="text-xs font-semibold text-white/60 mb-2">Mode d'affichage</h4>
                <div className="grid grid-cols-3 gap-2">
                  {themes.map((t) => (
                    <motion.button
                      key={t.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setTheme(t.id as "light" | "dark" | "system")}
                      className={`relative p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                        theme === t.id
                          ? "bg-white/20 border-2 border-white/40"
                          : "bg-white/5 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <t.icon className="w-4 h-4 text-white" />
                      <span className="text-[10px] text-white/80">{t.name}</span>
                      {theme === t.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"
                        >
                          <Check className="w-2.5 h-2.5 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Color presets */}
              <div>
                <h4 className="text-xs font-semibold text-white/60 mb-2">Palette de couleurs</h4>
                <div className="grid grid-cols-3 gap-2">
                  {colorPresets.map((preset) => (
                    <motion.button
                      key={preset.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActivePreset(preset.id)}
                      className={`relative p-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
                        activePreset === preset.id
                          ? "bg-white/20 border-2 border-white/40"
                          : "bg-white/5 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {/* Color preview */}
                      <div className="flex gap-0.5">
                        {preset.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-white/80">{preset.emoji} {preset.name}</span>
                      {activePreset === preset.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"
                        >
                          <Check className="w-2.5 h-2.5 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Advanced controls */}
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Intensité des effets</span>
                    <span>{glowIntensity[0]}%</span>
                  </div>
                  <Slider
                    value={glowIntensity}
                    onValueChange={setGlowIntensity}
                    max={100}
                    className="w-full"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Vitesse d'animation</span>
                    <span>{animationSpeed[0]}%</span>
                  </div>
                  <Slider
                    value={animationSpeed}
                    onValueChange={setAnimationSpeed}
                    max={100}
                    className="w-full"
                  />
                </div>
              </div>

              {/* AI Generate button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <Wand2 className="w-4 h-4" />
                Générer un thème IA
                <Sparkles className="w-3 h-3 text-yellow-300" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThemeCustomizerPanel;
