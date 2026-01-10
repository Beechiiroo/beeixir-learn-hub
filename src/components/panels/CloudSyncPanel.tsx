import { motion, AnimatePresence } from "framer-motion";
import { Cloud, RefreshCw, Download, Upload, Check, X, Globe, Database, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface CloudSyncPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SyncItem {
  id: string;
  name: string;
  type: "progress" | "settings" | "snippets" | "achievements";
  status: "synced" | "syncing" | "pending";
  lastSync: string;
}

const CloudSyncPanel = ({ isOpen, onClose }: CloudSyncPanelProps) => {
  const [syncItems, setSyncItems] = useState<SyncItem[]>([
    { id: "1", name: "Progression cours", type: "progress", status: "synced", lastSync: "Il y a 2 min" },
    { id: "2", name: "Préférences", type: "settings", status: "synced", lastSync: "Il y a 5 min" },
    { id: "3", name: "Code snippets", type: "snippets", status: "pending", lastSync: "Il y a 1h" },
    { id: "4", name: "Badges", type: "achievements", status: "synced", lastSync: "Il y a 10 min" },
  ]);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setSyncItems(items => items.map(item => ({ ...item, status: "syncing" as const })));

    setTimeout(() => {
      setSyncItems(items => items.map(item => ({ ...item, status: "synced", lastSync: "À l'instant" })));
      setIsSyncing(false);
    }, 2000);
  };

  const getStatusIcon = (status: SyncItem["status"]) => {
    switch (status) {
      case "synced":
        return <Check className="w-4 h-4 text-green-400" />;
      case "syncing":
        return (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
            <RefreshCw className="w-4 h-4 text-blue-400" />
          </motion.div>
        );
      case "pending":
        return <Cloud className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.9 }}
          className="fixed left-20 top-[70%] z-50 w-80"
        >
          {/* Glass container */}
          <div className="relative rounded-3xl bg-gradient-to-br from-sky-950/90 via-blue-900/80 to-indigo-950/90 backdrop-blur-2xl border border-sky-500/30 shadow-2xl overflow-hidden">
            {/* Animated cloud background */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-4 right-4"
              >
                <Cloud className="w-20 h-20 text-white" />
              </motion.div>
            </div>

            {/* Header */}
            <div className="relative p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center"
                  >
                    <Cloud className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-white">Cloud Sync</h3>
                    <p className="text-xs text-sky-300">Synchronisation Mondiale</p>
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
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Globe className="w-5 h-5 text-sky-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">5</div>
                  <div className="text-xs text-white/50">Appareils</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Database className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">2.4</div>
                  <div className="text-xs text-white/50">GB sync</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">99%</div>
                  <div className="text-xs text-white/50">Uptime</div>
                </div>
              </div>

              {/* Sync Items */}
              <div className="space-y-2">
                {syncItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(item.status)}
                      <div>
                        <div className="text-sm text-white font-medium">{item.name}</div>
                        <div className="text-xs text-white/50">{item.lastSync}</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                        <Download className="w-3.5 h-3.5 text-white/60" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                        <Upload className="w-3.5 h-3.5 text-white/60" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Sync Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSync}
                disabled={isSyncing}
                className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                  isSyncing
                    ? "bg-white/10 text-white/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-sky-500 to-blue-600 text-white"
                }`}
              >
                {isSyncing ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <RefreshCw className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                {isSyncing ? "Synchronisation..." : "Synchroniser Tout"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CloudSyncPanel;
