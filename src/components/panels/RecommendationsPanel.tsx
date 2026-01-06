import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Compass, X, TrendingUp, Clock, Target, ChevronRight } from "lucide-react";

interface Recommendation {
  id: string;
  title: string;
  reason: string;
  match: number;
  duration: string;
  category: string;
  trending: boolean;
}

interface RecommendationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecommendationsPanel = ({ isOpen, onClose }: RecommendationsPanelProps) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    setRecommendations([
      { id: "1", title: "React 19 - Nouveautés", reason: "Basé sur votre intérêt pour React", match: 98, duration: "4h 30min", category: "frontend", trending: true },
      { id: "2", title: "IA Générative avec Python", reason: "Tendance 2026 - Très demandé", match: 95, duration: "8h", category: "ai", trending: true },
      { id: "3", title: "Architecture Microservices", reason: "Complète vos compétences backend", match: 88, duration: "6h", category: "backend", trending: false },
      { id: "4", title: "TypeScript Avancé", reason: "Améliore votre code React", match: 92, duration: "5h", category: "frontend", trending: true },
      { id: "5", title: "DevOps & CI/CD", reason: "Skill en forte demande", match: 85, duration: "7h", category: "devops", trending: false },
    ]);
  }, []);

  const filters = [{ id: "all", label: "Tous" }, { id: "frontend", label: "Frontend" }, { id: "backend", label: "Backend" }, { id: "ai", label: "IA" }, { id: "devops", label: "DevOps" }];
  const filteredRecs = activeFilter === "all" ? recommendations : recommendations.filter(r => r.category === activeFilter);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-28 right-4 z-50 w-80 sm:w-96"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10">
            <div className="absolute inset-0 bg-card/80 backdrop-blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-teal-500/5" />
            
            <div className="relative">
              {/* Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <Compass className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold">Recommandations IA</h3>
                      <p className="text-xs text-muted-foreground">Personnalisées pour vous</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8"><X className="w-4 h-4" /></Button>
                </div>
              </div>

              {/* Filters */}
              <div className="p-3 border-b border-white/10 flex gap-2 overflow-x-auto">
                {filters.map((filter) => (
                  <Button key={filter.id} variant={activeFilter === filter.id ? "default" : "ghost"} size="sm" onClick={() => setActiveFilter(filter.id)} className="text-xs whitespace-nowrap rounded-xl">
                    {filter.label}
                  </Button>
                ))}
              </div>

              {/* List */}
              <div className="max-h-72 overflow-y-auto p-3 space-y-2">
                <AnimatePresence mode="popLayout">
                  {filteredRecs.map((rec, index) => (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="group p-3 rounded-2xl bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm truncate">{rec.title}</h4>
                            {rec.trending && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{rec.reason}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{rec.duration}</span>
                            <span className="flex items-center gap-1 text-xs text-emerald-400"><Target className="w-3 h-3" />{rec.match}%</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecommendationsPanel;
