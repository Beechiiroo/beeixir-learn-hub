import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Activity, X, Users, BookOpen, Trophy, Star, Zap, Clock } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "enrollment" | "completion" | "achievement" | "review" | "live";
  user: string;
  content: string;
  time: string;
  icon: typeof Users;
}

const generateActivity = (): ActivityItem => {
  const users = ["Marie L.", "Jean P.", "Sophie M.", "Ahmed K.", "Lucas D.", "Emma R.", "Paul B.", "Léa S."];
  const courses = ["React Avancé", "Python IA", "Node.js", "Vue.js", "Angular", "Machine Learning"];
  const achievements = ["Premier Cours", "10 Heures", "Expert React", "Quiz Master", "Code Ninja"];
  
  const types: ActivityItem["type"][] = ["enrollment", "completion", "achievement", "review", "live"];
  const type = types[Math.floor(Math.random() * types.length)];
  const user = users[Math.floor(Math.random() * users.length)];
  
  const templates: Record<ActivityItem["type"], { content: string; icon: typeof Users }> = {
    enrollment: { 
      content: `s'est inscrit à ${courses[Math.floor(Math.random() * courses.length)]}`,
      icon: BookOpen 
    },
    completion: { 
      content: `a terminé ${courses[Math.floor(Math.random() * courses.length)]}`,
      icon: Trophy 
    },
    achievement: { 
      content: `a débloqué "${achievements[Math.floor(Math.random() * achievements.length)]}"`,
      icon: Star 
    },
    review: { 
      content: `a donné 5 étoiles à ${courses[Math.floor(Math.random() * courses.length)]}`,
      icon: Star 
    },
    live: { 
      content: `suit un cours en direct maintenant`,
      icon: Zap 
    },
  };

  return {
    id: Date.now().toString() + Math.random(),
    type,
    user,
    content: templates[type].content,
    time: "À l'instant",
    icon: templates[type].icon,
  };
};

const LiveActivityFeed = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [liveCount, setLiveCount] = useState(0);

  useEffect(() => {
    // Initialize with some activities
    const initial = Array.from({ length: 5 }, generateActivity);
    setActivities(initial);
    setLiveCount(Math.floor(Math.random() * 50) + 100);

    // Add new activity every 5-10 seconds
    const interval = setInterval(() => {
      const newActivity = generateActivity();
      setActivities((prev) => [newActivity, ...prev.slice(0, 19)]);
      setLiveCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Activity Button */}
      <motion.div
        className="fixed top-1/3 left-0 z-40"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-r-full rounded-l-none pl-3 pr-4 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg"
        >
          <Activity className="w-5 h-5 mr-2" />
          <div className="text-left">
            <span className="text-sm font-bold">{liveCount}</span>
            <span className="text-xs block -mt-0.5">en ligne</span>
          </div>
        </Button>
      </motion.div>

      {/* Activity Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed left-0 top-0 h-full w-80 z-50 bg-card/95 backdrop-blur-xl shadow-2xl border-r border-border"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                >
                  <Activity className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-white">Activité en Direct</h3>
                  <div className="flex items-center gap-1 text-xs text-white/80">
                    <Users className="w-3 h-3" />
                    <span>{liveCount} apprenants actifs</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Activity List */}
            <div className="p-4 h-[calc(100%-80px)] overflow-y-auto space-y-3">
              <AnimatePresence mode="popLayout">
                {activities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === "live" ? "bg-red-500/20 text-red-500" :
                        activity.type === "achievement" ? "bg-yellow-500/20 text-yellow-500" :
                        activity.type === "completion" ? "bg-green-500/20 text-green-500" :
                        "bg-primary/20 text-primary"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{" "}
                          <span className="text-muted-foreground">{activity.content}</span>
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{activity.time}</span>
                        </div>
                      </div>
                      {activity.type === "live" && (
                        <motion.div
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-red-500"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveActivityFeed;
