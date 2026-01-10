import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, Scan, Eye, Shield, Lock, Unlock, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface BiometricsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const BiometricsPanel = ({ isOpen, onClose }: BiometricsPanelProps) => {
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "verified">("idle");
  const [selectedMethod, setSelectedMethod] = useState<"fingerprint" | "face" | "iris">("fingerprint");

  const handleScan = () => {
    setScanStatus("scanning");
    setTimeout(() => {
      setScanStatus("verified");
      setTimeout(() => setScanStatus("idle"), 3000);
    }, 2000);
  };

  const methods = [
    { id: "fingerprint", icon: Fingerprint, label: "Empreinte", color: "from-emerald-500 to-teal-600" },
    { id: "face", icon: Scan, label: "Visage", color: "from-blue-500 to-cyan-600" },
    { id: "iris", icon: Eye, label: "Iris", color: "from-purple-500 to-violet-600" },
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.9 }}
          className="fixed left-20 top-[60%] z-50 w-72"
        >
          {/* Glass container */}
          <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950/90 via-teal-900/80 to-cyan-950/90 backdrop-blur-2xl border border-emerald-500/30 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="relative p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Biométrie 2026</h3>
                    <p className="text-xs text-emerald-300">Auth Sécurisée</p>
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
              {/* Method Selection */}
              <div className="flex gap-2">
                {methods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`flex-1 p-3 rounded-xl border transition-all ${
                        selectedMethod === method.id
                          ? `bg-gradient-to-br ${method.color} border-white/30`
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-white mx-auto mb-1" />
                      <span className="text-xs text-white/80 block">{method.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Scan Area */}
              <div className="relative aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                {/* Scan animation */}
                {scanStatus === "scanning" && (
                  <motion.div
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: scanStatus === "scanning" ? [1, 1.1, 1] : 1,
                      opacity: scanStatus === "verified" ? [1, 0.5, 1] : 1,
                    }}
                    transition={{ duration: 0.5, repeat: scanStatus === "scanning" ? Infinity : 0 }}
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
                      scanStatus === "verified"
                        ? "bg-green-500/20"
                        : "bg-white/10"
                    }`}
                  >
                    {scanStatus === "verified" ? (
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    ) : selectedMethod === "fingerprint" ? (
                      <Fingerprint className="w-10 h-10 text-white/60" />
                    ) : selectedMethod === "face" ? (
                      <Scan className="w-10 h-10 text-white/60" />
                    ) : (
                      <Eye className="w-10 h-10 text-white/60" />
                    )}
                  </motion.div>
                </div>

                {/* Status text */}
                <div className="absolute bottom-4 inset-x-0 text-center">
                  <span className="text-sm text-white/70">
                    {scanStatus === "idle" && "Prêt pour le scan"}
                    {scanStatus === "scanning" && "Analyse en cours..."}
                    {scanStatus === "verified" && "✓ Identité vérifiée"}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleScan}
                disabled={scanStatus === "scanning"}
                className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                  scanStatus === "scanning"
                    ? "bg-white/10 text-white/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                }`}
              >
                {scanStatus === "scanning" ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Scan className="w-4 h-4" />
                  </motion.div>
                ) : scanStatus === "verified" ? (
                  <Unlock className="w-4 h-4" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                {scanStatus === "idle" && "Démarrer le Scan"}
                {scanStatus === "scanning" && "Analyse..."}
                {scanStatus === "verified" && "Accès Autorisé"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BiometricsPanel;
