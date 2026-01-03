import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Clock, Target, Zap, TrendingUp, Award } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import GlassmorphismCard from "./GlassmorphismCard";
import { Badge } from "./ui/badge";

const ProgressCalculator = () => {
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [targetSkill, setTargetSkill] = useState("React");

  const skillLevels = [
    { level: 1, name: "Débutant", hours: 0 },
    { level: 2, name: "Initié", hours: 50 },
    { level: 3, name: "Intermédiaire", hours: 150 },
    { level: 4, name: "Avancé", hours: 400 },
    { level: 5, name: "Expert", hours: 800 },
    { level: 6, name: "Maître", hours: 1500 },
  ];

  const skills = ["React", "Vue.js", "Angular", "Node.js", "Python", "Laravel"];

  const calculateTimeToMaster = () => {
    const targetLevel = skillLevels[skillLevels.length - 1];
    const currentHours = skillLevels[currentLevel - 1].hours;
    const remainingHours = targetLevel.hours - currentHours;
    const weeks = Math.ceil(remainingHours / hoursPerWeek);
    return { weeks, months: Math.ceil(weeks / 4), hours: remainingHours };
  };

  const progress = calculateTimeToMaster();
  const progressPercentage = ((skillLevels[currentLevel - 1].hours / 1500) * 100).toFixed(0);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-success/10 px-4 py-2 rounded-full mb-4">
            <Calculator className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success">Calculateur</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Calculez Votre Progression</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estimez le temps nécessaire pour maîtriser une compétence
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Configuration */}
          <GlassmorphismCard className="p-6" glowColor="success">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Configuration
            </h3>

            {/* Skill selector */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Compétence cible</label>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Button
                    key={skill}
                    variant={targetSkill === skill ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTargetSkill(skill)}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>

            {/* Current level */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">
                Niveau actuel: <span className="text-primary">{skillLevels[currentLevel - 1].name}</span>
              </label>
              <div className="flex gap-2">
                {skillLevels.map((level) => (
                  <motion.button
                    key={level.level}
                    onClick={() => setCurrentLevel(level.level)}
                    className={`flex-1 p-2 rounded-lg text-xs font-medium transition-all ${
                      currentLevel === level.level
                        ? "bg-primary text-white"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {level.level}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Hours per week */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">
                Heures par semaine: <span className="text-primary font-bold">{hoursPerWeek}h</span>
              </label>
              <Slider
                value={[hoursPerWeek]}
                onValueChange={(value) => setHoursPerWeek(value[0])}
                min={1}
                max={40}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>1h/sem</span>
                <span>40h/sem</span>
              </div>
            </div>
          </GlassmorphismCard>

          {/* Results */}
          <GlassmorphismCard className="p-6" glowColor="primary">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Estimation
            </h3>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progression vers Maître</span>
                <span className="font-bold text-primary">{progressPercentage}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.div
                className="bg-primary/10 rounded-xl p-4 text-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
              >
                <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{progress.hours}h</div>
                <div className="text-xs text-muted-foreground">Heures restantes</div>
              </motion.div>

              <motion.div
                className="bg-secondary/10 rounded-xl p-4 text-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Zap className="w-6 h-6 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold">{progress.weeks}</div>
                <div className="text-xs text-muted-foreground">Semaines</div>
              </motion.div>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-yellow-500" />
                <div>
                  <div className="font-bold">Objectif: Maître en {targetSkill}</div>
                  <div className="text-sm text-muted-foreground">
                    Estimé dans <span className="text-primary font-medium">~{progress.months} mois</span> à {hoursPerWeek}h/semaine
                  </div>
                </div>
              </div>
            </div>

            <Button variant="hero" className="w-full mt-6">
              Commencer mon parcours
            </Button>
          </GlassmorphismCard>
        </div>
      </div>
    </section>
  );
};

export default ProgressCalculator;
