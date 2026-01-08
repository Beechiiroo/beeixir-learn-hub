import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, View, Maximize2, RotateCcw, Layers, Eye, Box, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface ARLearningPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ARLearningPanel = ({ isOpen, onClose }: ARLearningPanelProps) => {
  const [activeModel, setActiveModel] = useState("react");
  const [rotation, setRotation] = useState([0]);
  const [scale, setScale] = useState([1]);

  const models3D = [
    { id: "react", name: "React Architecture", icon: "⚛️", color: "from-cyan-500 to-blue-600" },
    { id: "node", name: "Node.js Flow", icon: "🟢", color: "from-green-500 to-emerald-600" },
    { id: "database", name: "Database Schema", icon: "🗄️", color: "from-purple-500 to-violet-600" },
    { id: "api", name: "API Structure", icon: "🔌", color: "from-orange-500 to-red-600" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed right-20 top-[20%] z-50 w-80"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/90 via-purple-900/90 to-indigo-900/90 backdrop-blur-2xl border border-white/20 shadow-2xl">
            {/* Header */}
            <div className="relative p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"
                  >
                    <Box className="w-4 h-4 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-white flex items-center gap-1">
                      AR Learning
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                    </h3>
                    <p className="text-xs text-white/60">Apprentissage immersif</p>
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

            {/* 3D Viewport Simulation */}
            <div className="p-4">
              <div className="relative h-48 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/10 overflow-hidden">
                {/* Grid floor */}
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px",
                    transform: "perspective(500px) rotateX(60deg)",
                    transformOrigin: "center bottom"
                  }}
                />

                {/* 3D Object placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      rotateY: rotation[0] * 360,
                      scale: scale[0],
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <motion.div
                      animate={{ rotateY: 360, rotateX: 10 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="text-7xl"
                    >
                      {models3D.find(m => m.id === activeModel)?.icon}
                    </motion.div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 blur-2xl opacity-50 scale-150 flex items-center justify-center">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${models3D.find(m => m.id === activeModel)?.color}`} />
                    </div>
                  </motion.div>
                </div>

                {/* Controls overlay */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Model selector */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {models3D.map((model) => (
                  <motion.button
                    key={model.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveModel(model.id)}
                    className={`p-2 rounded-xl text-center transition-all ${
                      activeModel === model.id
                        ? `bg-gradient-to-br ${model.color} shadow-lg`
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <span className="text-xl">{model.icon}</span>
                  </motion.button>
                ))}
              </div>

              {/* Controls */}
              <div className="mt-4 space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Rotation</span>
                    <span>{Math.round(rotation[0] * 360)}°</span>
                  </div>
                  <Slider
                    value={rotation}
                    onValueChange={setRotation}
                    max={1}
                    step={0.01}
                    className="w-full"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Échelle</span>
                    <span>{scale[0].toFixed(1)}x</span>
                  </div>
                  <Slider
                    value={scale}
                    onValueChange={setScale}
                    min={0.5}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Feature info */}
              <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-white/80">
                  <View className="w-4 h-4 text-violet-400" />
                  <span className="text-xs">Mode AR disponible sur mobile</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ARLearningPanel;
