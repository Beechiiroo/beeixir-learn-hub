import { motion } from "framer-motion";
import { Trophy, Target, TrendingUp, Award, Star, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ProgressTracker = () => {
  const progressData = [
    { course: "React Avancé", progress: 75, icon: "⚛️", color: "primary" },
    { course: "Machine Learning", progress: 45, icon: "🤖", color: "secondary" },
    { course: "Angular", progress: 90, icon: "🅰️", color: "success" },
    { course: "Django", progress: 60, icon: "🐍", color: "warning" },
  ];

  const achievements = [
    { title: "Premier Cours", description: "Complétez votre premier cours", unlocked: true },
    { title: "Série de 7 jours", description: "Étudiez 7 jours consécutifs", unlocked: true },
    { title: "Expert React", description: "Maîtrisez React avancé", unlocked: false },
    { title: "ML Champion", description: "Complétez tous les projets ML", unlocked: false },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 via-background to-primary/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 gradient-primary rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 gradient-neural rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-primary-light text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Trophy className="w-4 h-4 mr-2" />
              Votre Progression
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Suivez Votre <span className="gradient-neural bg-clip-text text-transparent">Évolution</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Visualisez vos progrès et débloquez des récompenses
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Overall Stats */}
            <Card className="p-8 gradient-card shadow-hover border-primary/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 gradient-primary rounded-2xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Statistiques Globales</h3>
                  <p className="text-muted-foreground">Vos performances cette semaine</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Heures d'étude</p>
                    <p className="text-3xl font-bold text-primary">24.5h</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Cours complétés</p>
                    <p className="text-3xl font-bold text-success">12</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Objectif mensuel</span>
                    <span className="text-sm font-bold text-primary">68%</span>
                  </div>
                  <Progress value={68} className="h-3" />
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">32</p>
                    <p className="text-xs text-muted-foreground">Objectifs</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <Zap className="w-6 h-6 mx-auto mb-2 text-warning" />
                    <p className="text-2xl font-bold">856</p>
                    <p className="text-xs text-muted-foreground">Points XP</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <Star className="w-6 h-6 mx-auto mb-2 text-secondary" />
                    <p className="text-2xl font-bold">15</p>
                    <p className="text-xs text-muted-foreground">Badges</p>
                  </motion.div>
                </div>
              </div>
            </Card>

            {/* Course Progress */}
            <Card className="p-8 gradient-card shadow-hover border-secondary/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 gradient-neural rounded-2xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Progression des Cours</h3>
                  <p className="text-muted-foreground">Continuez sur votre lancée!</p>
                </div>
              </div>

              <div className="space-y-5">
                {progressData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-semibold flex-1">{item.course}</span>
                      <span className="text-sm font-bold text-primary">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Achievements */}
            <Card className="md:col-span-2 p-8 gradient-card shadow-hover border-success/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-warning to-success rounded-2xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Trophées & Réalisations</h3>
                  <p className="text-muted-foreground">Débloquez des badges en progressant</p>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`p-6 rounded-xl text-center transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30'
                        : 'bg-muted/30 opacity-50'
                    }`}
                  >
                    <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                      achievement.unlocked ? 'gradient-primary' : 'bg-muted'
                    }`}>
                      {achievement.unlocked ? (
                        <Trophy className="w-8 h-8 text-white" />
                      ) : (
                        <Award className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    <h4 className="font-bold text-sm mb-1">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgressTracker;
