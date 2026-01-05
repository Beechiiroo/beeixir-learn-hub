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

const SmartRecommendations = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    // Simulate AI-powered recommendations
    const recs: Recommendation[] = [
      {
        id: "1",
        title: "React 19 - Nouvelles Fonctionnalités",
        reason: "Basé sur votre intérêt pour React",
        match: 98,
        duration: "4h 30min",
        category: "frontend",
        trending: true,
      },
      {
        id: "2",
        title: "IA Générative avec Python",
        reason: "Tendance 2026 - Très demandé",
        match: 95,
        duration: "8h",
        category: "ai",
        trending: true,
      },
      {
        id: "3",
        title: "Architecture Microservices",
        reason: "Complète vos compétences backend",
        match: 88,
        duration: "6h",
        category: "backend",
        trending: false,
      },
      {
        id: "4",
        title: "TypeScript Avancé",
        reason: "Améliore votre code React",
        match: 92,
        duration: "5h",
        category: "frontend",
        trending: true,
      },
      {
        id: "5",
        title: "DevOps & CI/CD",
        reason: "Skill en forte demande",
        match: 85,
        duration: "7h",
        category: "devops",
        trending: false,
      },
    ];
    setRecommendations(recs);
  }, []);

  const filters = [
    { id: "all", label: "Tous" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "ai", label: "IA" },
    { id: "devops", label: "DevOps" },
  ];

  const filteredRecs = activeFilter === "all" 
    ? recommendations 
    : recommendations.filter(r => r.category === activeFilter);

  return (
    <>
      {/* Floating Compass Button */}
      <motion.div
        className="fixed bottom-40 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="w-12 h-12 rounded-full shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Compass className="w-5 h-5" />}
        </Button>
      </motion.div>

      {/* Recommendations Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-56 right-6 z-50 w-80 sm:w-96"
          >
            <div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                  >
                    <Compass className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-white">Recommandations IA</h3>
                    <p className="text-xs text-white/80">Personnalisées pour vous</p>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="p-3 border-b border-border flex gap-2 overflow-x-auto">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={activeFilter === filter.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveFilter(filter.id)}
                    className="text-xs whitespace-nowrap"
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>

              {/* Recommendations List */}
              <div className="max-h-80 overflow-y-auto p-3 space-y-2">
                <AnimatePresence mode="popLayout">
                  {filteredRecs.map((rec, index) => (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="group p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm truncate">{rec.title}</h4>
                            {rec.trending && (
                              <span className="flex items-center gap-0.5 text-xs text-orange-500">
                                <TrendingUp className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{rec.reason}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {rec.duration}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-green-500">
                              <Target className="w-3 h-3" />
                              {rec.match}% match
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SmartRecommendations;
