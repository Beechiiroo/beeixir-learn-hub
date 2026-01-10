import { motion, AnimatePresence } from "framer-motion";
import { Atom, Sparkles, Zap, Brain, X, Activity, ChartLine, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface QuantumAIPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuantumAIPanel = ({ isOpen, onClose }: QuantumAIPanelProps) => {
  const [processingPower, setProcessingPower] = useState(0);
  const [quantumBits, setQuantumBits] = useState(0);
  const [predictions, setPredictions] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setProcessingPower(Math.random() * 100);
        setQuantumBits(Math.floor(Math.random() * 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const aiPredictions = [
        "📊 Recommandation: Focus sur React Hooks avancé",
        "🎯 Prédiction: 95% de réussite au prochain quiz",
        "💡 Insight: Votre pattern d'apprentissage optimal: 25min sessions",
        "🚀 Suggestion: TypeScript générera +40% productivité",
        "🧠 Analyse: Mémoire à long terme optimale le matin",
      ];
      setPredictions(aiPredictions.slice(0, 3 + Math.floor(Math.random() * 2)));
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.9 }}
          className="fixed right-20 top-1/4 z-50 w-80"
        >
          {/* Glass container */}
          <div className="relative rounded-3xl bg-gradient-to-br from-violet-950/90 via-purple-900/80 to-indigo-950/90 backdrop-blur-2xl border border-violet-500/30 shadow-2xl overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
                style={{
                  backgroundImage: 'conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
                }}
              />
            </div>

            {/* Header */}
            <div className="relative p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"
                  >
                    <Atom className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-white">Quantum AI</h3>
                    <p className="text-xs text-violet-300">Calcul Quantique 2026</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="relative p-4 space-y-4">
              {/* Quantum Stats */}
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  className="p-3 rounded-xl bg-white/5 border border-white/10"
                  animate={{ borderColor: ['rgba(139,92,246,0.3)', 'rgba(236,72,153,0.3)', 'rgba(139,92,246,0.3)'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-4 h-4 text-violet-400" />
                    <span className="text-xs text-violet-300">Processing</span>
                  </div>
                  <div className="text-xl font-bold text-white">{processingPower.toFixed(1)}%</div>
                  <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
                      animate={{ width: `${processingPower}%` }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="p-3 rounded-xl bg-white/5 border border-white/10"
                  animate={{ borderColor: ['rgba(236,72,153,0.3)', 'rgba(139,92,246,0.3)', 'rgba(236,72,153,0.3)'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-pink-400" />
                    <span className="text-xs text-pink-300">Qubits</span>
                  </div>
                  <div className="text-xl font-bold text-white">{quantumBits}</div>
                  <div className="text-xs text-white/50 mt-2">Actifs</div>
                </motion.div>
              </div>

              {/* AI Predictions */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-white">Prédictions IA</span>
                </div>
                <div className="space-y-2">
                  {predictions.map((prediction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white/80"
                    >
                      {prediction}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Lancer Analyse Quantique
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuantumAIPanel;
