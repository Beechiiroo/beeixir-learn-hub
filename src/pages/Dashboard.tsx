import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Calendar,
  Star,
  Target,
  Zap,
  Brain,
  Flame,
  Award,
  ChevronLeft,
  ChevronRight,
  Play,
  BarChart3,
  PieChart,
  Activity,
  Lightbulb,
  Sparkles
} from "lucide-react";

const Dashboard = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Stats data
  const stats = [
    { 
      title: "Heures d'étude", 
      value: "127", 
      change: "+12%", 
      icon: Clock, 
      color: "from-primary to-secondary",
      bgColor: "bg-primary/10 dark:bg-primary/20"
    },
    { 
      title: "Cours complétés", 
      value: "8", 
      change: "+2", 
      icon: BookOpen, 
      color: "from-success to-primary",
      bgColor: "bg-success/10 dark:bg-success/20"
    },
    { 
      title: "Certificats", 
      value: "5", 
      change: "+1", 
      icon: Award, 
      color: "from-warning to-destructive",
      bgColor: "bg-warning/10 dark:bg-warning/20"
    },
    { 
      title: "Points XP", 
      value: "2,450", 
      change: "+350", 
      icon: Zap, 
      color: "from-secondary to-primary",
      bgColor: "bg-secondary/10 dark:bg-secondary/20"
    },
  ];

  // Course progress data
  const courseProgress = [
    { name: "React Masterclass", progress: 85, total: 24, completed: 20, color: "bg-primary" },
    { name: "Node.js Backend", progress: 60, total: 18, completed: 11, color: "bg-success" },
    { name: "Python pour l'IA", progress: 45, total: 32, completed: 14, color: "bg-warning" },
    { name: "Vue.js Avancé", progress: 30, total: 20, completed: 6, color: "bg-secondary" },
  ];

  // Weekly activity data
  const weeklyActivity = [
    { day: "Lun", hours: 3, target: 4 },
    { day: "Mar", hours: 5, target: 4 },
    { day: "Mer", hours: 2, target: 4 },
    { day: "Jeu", hours: 4, target: 4 },
    { day: "Ven", hours: 6, target: 4 },
    { day: "Sam", hours: 3, target: 4 },
    { day: "Dim", hours: 1, target: 4 },
  ];

  // AI Recommendations
  const aiRecommendations = [
    {
      title: "TypeScript Avancé",
      reason: "Basé sur votre progression en React",
      match: 95,
      duration: "8h",
      level: "Intermédiaire",
      icon: "🎯"
    },
    {
      title: "Docker & Kubernetes",
      reason: "Complément idéal pour Node.js",
      match: 88,
      duration: "12h",
      level: "Avancé",
      icon: "🐳"
    },
    {
      title: "Machine Learning Basics",
      reason: "Extension naturelle de Python IA",
      match: 82,
      duration: "15h",
      level: "Intermédiaire",
      icon: "🤖"
    },
  ];

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  // Study events for calendar
  const studyEvents: Record<number, { type: string; title: string }> = {
    5: { type: "course", title: "React Session" },
    8: { type: "exam", title: "Quiz Node.js" },
    12: { type: "course", title: "Python IA" },
    15: { type: "deadline", title: "Projet Final" },
    18: { type: "course", title: "Vue.js Lab" },
    22: { type: "course", title: "Docker Workshop" },
    25: { type: "exam", title: "Certification React" },
  };

  const navigateMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

    // Day names header
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={`header-${i}`} className="text-center text-xs font-medium text-muted-foreground py-2">
          {dayNames[i]}
        </div>
      );
    }

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const event = studyEvents[day];
      const isToday = day === new Date().getDate() && 
        currentMonth.getMonth() === new Date().getMonth() &&
        currentMonth.getFullYear() === new Date().getFullYear();
      
      days.push(
        <motion.button
          key={day}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedDate(day)}
          className={`
            relative p-2 rounded-lg text-sm font-medium transition-all
            ${isToday ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
            ${selectedDate === day ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}
            ${event ? "font-bold" : ""}
          `}
        >
          {day}
          {event && (
            <span className={`
              absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full
              ${event.type === "course" ? "bg-primary" : event.type === "exam" ? "bg-warning" : "bg-destructive"}
            `} />
          )}
        </motion.button>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <ParticleBackground />
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Bienvenue, Étudiant! 👋
              </h1>
              <p className="text-muted-foreground mt-2">
                Continuez votre apprentissage là où vous l'avez laissé
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1.5">
                <Flame className="w-4 h-4 text-warning" />
                <span>12 jours de suite</span>
              </Badge>
              <Badge className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary">
                <Trophy className="w-4 h-4" />
                <span>Niveau 8</span>
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <Badge variant="outline" className="text-success border-success/30 bg-success/10">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Course Progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Activity className="w-5 h-5 text-primary" />
                  Progression des cours
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Voir tout
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {courseProgress.map((course, index) => (
                  <motion.div
                    key={course.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${course.color}`} />
                        <span className="font-medium text-foreground">{course.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Link to={`/quiz?course=${encodeURIComponent(course.name)}`}>
                          <Button variant="outline" size="sm" className="text-xs h-7">
                            <Brain className="w-3 h-3 mr-1" />
                            Quiz
                          </Button>
                        </Link>
                        <span className="text-sm text-muted-foreground">
                          {course.completed}/{course.total} leçons
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={course.progress} className="h-2" />
                      <span className="absolute right-0 -top-6 text-xs font-medium text-foreground">
                        {course.progress}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <BarChart3 className="w-5 h-5 text-secondary" />
                  Activité hebdomadaire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-2 h-40">
                  {weeklyActivity.map((day, index) => (
                    <motion.div
                      key={day.day}
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex flex-col items-center flex-1"
                    >
                      <div className="relative w-full flex flex-col items-center">
                        <div 
                          className={`w-full max-w-[30px] rounded-t-lg transition-all duration-500 ${
                            day.hours >= day.target 
                              ? "bg-gradient-to-t from-success to-success/70" 
                              : "bg-gradient-to-t from-primary to-primary/70"
                          }`}
                          style={{ height: `${(day.hours / 6) * 100}px` }}
                        />
                        <div 
                          className="absolute w-full max-w-[30px] border-t-2 border-dashed border-warning/50"
                          style={{ bottom: `${(day.target / 6) * 100}px` }}
                        />
                      </div>
                      <span className="mt-2 text-xs text-muted-foreground">{day.day}</span>
                      <span className="text-xs font-medium text-foreground">{day.hours}h</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-primary" />
                    <span className="text-xs text-muted-foreground">Heures étudiées</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-1 border-t-2 border-dashed border-warning" />
                    <span className="text-xs text-muted-foreground">Objectif</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Calendar & AI Recommendations */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Study Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-5 h-5 text-warning" />
                  Calendrier d'étude
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigateMonth(-1)}
                    className="hover:bg-muted"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="font-medium min-w-[120px] text-center text-foreground">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigateMonth(1)}
                    className="hover:bg-muted"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {renderCalendar()}
                </div>
                
                {/* Event Legend */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-xs text-muted-foreground">Cours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                    <span className="text-xs text-muted-foreground">Quiz</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                    <span className="text-xs text-muted-foreground">Deadline</span>
                  </div>
                </div>

                {/* Selected Date Events */}
                {selectedDate && studyEvents[selectedDate] && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{studyEvents[selectedDate].title}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedDate} {monthNames[currentMonth.getMonth()]}
                        </p>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                        <Play className="w-3 h-3 mr-1" />
                        Commencer
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Brain className="w-5 h-5 text-secondary" />
                  Recommandations IA
                  <Sparkles className="w-4 h-4 text-warning animate-pulse" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <motion.div
                    key={rec.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{rec.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {rec.title}
                          </h4>
                          <Badge className="bg-gradient-to-r from-success/20 to-success/10 text-success border-0">
                            {rec.match}% match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{rec.reason}</p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {rec.duration}
                          </span>
                          <Badge variant="outline" className="text-xs border-border">
                            {rec.level}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Voir plus de recommandations
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Trophy className="w-5 h-5 text-warning" />
                Derniers accomplissements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "Premier Cours", icon: "🎯", unlocked: true },
                  { name: "5 Jours Consécutifs", icon: "🔥", unlocked: true },
                  { name: "Quiz Master", icon: "🧠", unlocked: true },
                  { name: "Code Ninja", icon: "🥷", unlocked: true },
                  { name: "Full Stack Hero", icon: "🦸", unlocked: false },
                  { name: "Certification Pro", icon: "📜", unlocked: false },
                ].map((achievement, index) => (
                  <motion.div
                    key={achievement.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className={`
                      flex flex-col items-center p-4 rounded-xl border transition-all cursor-pointer
                      ${achievement.unlocked 
                        ? "bg-gradient-to-br from-warning/10 to-warning/5 border-warning/30 hover:border-warning" 
                        : "bg-muted/30 border-border opacity-50 grayscale"
                      }
                    `}
                  >
                    <span className="text-3xl mb-2">{achievement.icon}</span>
                    <span className="text-xs font-medium text-center text-foreground">{achievement.name}</span>
                    {achievement.unlocked && (
                      <Star className="w-3 h-3 text-warning mt-1" />
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
