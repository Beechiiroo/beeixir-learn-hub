import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Medal,
  Crown,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  Flame,
  Zap,
  Target,
  Award,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface LeaderboardEntry {
  id: string;
  rank: number;
  previousRank: number;
  name: string;
  avatar: string;
  score: number;
  quizzes: number;
  streak: number;
  level: number;
  badges: string[];
  country: string;
}

const leaderboardData: LeaderboardEntry[] = [
  {
    id: "1",
    rank: 1,
    previousRank: 1,
    name: "Sarah Martin",
    avatar: "",
    score: 15420,
    quizzes: 48,
    streak: 21,
    level: 15,
    badges: ["🏆", "⚡", "🔥"],
    country: "🇫🇷",
  },
  {
    id: "2",
    rank: 2,
    previousRank: 4,
    name: "Ahmed Benali",
    avatar: "",
    score: 14850,
    quizzes: 45,
    streak: 18,
    level: 14,
    badges: ["🎯", "💎"],
    country: "🇹🇳",
  },
  {
    id: "3",
    rank: 3,
    previousRank: 2,
    name: "Emma Wilson",
    avatar: "",
    score: 14200,
    quizzes: 42,
    streak: 15,
    level: 13,
    badges: ["🌟", "🚀"],
    country: "🇬🇧",
  },
  {
    id: "4",
    rank: 4,
    previousRank: 3,
    name: "Lucas Dupont",
    avatar: "",
    score: 13650,
    quizzes: 40,
    streak: 12,
    level: 12,
    badges: ["💪"],
    country: "🇫🇷",
  },
  {
    id: "5",
    rank: 5,
    previousRank: 7,
    name: "Yuki Tanaka",
    avatar: "",
    score: 12900,
    quizzes: 38,
    streak: 9,
    level: 11,
    badges: ["🎓"],
    country: "🇯🇵",
  },
  {
    id: "6",
    rank: 6,
    previousRank: 5,
    name: "Mohamed Ali",
    avatar: "",
    score: 12400,
    quizzes: 36,
    streak: 7,
    level: 10,
    badges: ["📚"],
    country: "🇪🇬",
  },
  {
    id: "7",
    rank: 7,
    previousRank: 8,
    name: "Clara Schmidt",
    avatar: "",
    score: 11800,
    quizzes: 34,
    streak: 5,
    level: 9,
    badges: ["⭐"],
    country: "🇩🇪",
  },
  {
    id: "8",
    rank: 8,
    previousRank: 6,
    name: "Pierre Moreau",
    avatar: "",
    score: 11200,
    quizzes: 32,
    streak: 4,
    level: 8,
    badges: [],
    country: "🇫🇷",
  },
  {
    id: "9",
    rank: 9,
    previousRank: 10,
    name: "Sofia Garcia",
    avatar: "",
    score: 10500,
    quizzes: 30,
    streak: 3,
    level: 7,
    badges: [],
    country: "🇪🇸",
  },
  {
    id: "10",
    rank: 10,
    previousRank: 9,
    name: "David Chen",
    avatar: "",
    score: 9800,
    quizzes: 28,
    streak: 2,
    level: 6,
    badges: [],
    country: "🇨🇳",
  },
];

const weeklyData = leaderboardData.map((entry, index) => ({
  ...entry,
  score: Math.floor(entry.score * 0.3),
  rank: index + 1,
  previousRank: Math.floor(Math.random() * 10) + 1,
}));

const monthlyData = leaderboardData.map((entry, index) => ({
  ...entry,
  score: Math.floor(entry.score * 0.7),
  rank: index + 1,
  previousRank: Math.floor(Math.random() * 10) + 1,
}));

const Leaderboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [hoveredEntry, setHoveredEntry] = useState<string | null>(null);

  const getData = () => {
    switch (selectedPeriod) {
      case "week":
        return weeklyData;
      case "month":
        return monthlyData;
      default:
        return leaderboardData;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankChange = (current: number, previous: number) => {
    const diff = previous - current;
    if (diff > 0) {
      return (
        <div className="flex items-center text-success text-xs">
          <ChevronUp className="w-3 h-3" />
          <span>{diff}</span>
        </div>
      );
    } else if (diff < 0) {
      return (
        <div className="flex items-center text-destructive text-xs">
          <ChevronDown className="w-3 h-3" />
          <span>{Math.abs(diff)}</span>
        </div>
      );
    }
    return <Minus className="w-3 h-3 text-muted-foreground" />;
  };

  const getRowStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 via-yellow-500/10 to-transparent border-yellow-500/30";
      case 2:
        return "bg-gradient-to-r from-gray-400/20 via-gray-400/10 to-transparent border-gray-400/30";
      case 3:
        return "bg-gradient-to-r from-amber-600/20 via-amber-600/10 to-transparent border-amber-600/30";
      default:
        return "bg-card/50 border-border/50";
    }
  };

  const currentUser = {
    rank: 42,
    previousRank: 45,
    name: "Vous",
    score: 4520,
    quizzes: 12,
    streak: 3,
    level: 4,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 mb-4"
        >
          <Trophy className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
          Classement des Champions
        </h2>
        <p className="text-muted-foreground mt-2">
          Comparez vos scores avec les meilleurs étudiants
        </p>
      </div>

      {/* Period Tabs */}
      <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-muted/50">
          <TabsTrigger value="week" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Cette semaine
          </TabsTrigger>
          <TabsTrigger value="month" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Ce mois
          </TabsTrigger>
          <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Tout temps
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-4 py-8">
        {/* 2nd Place */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <Avatar className="w-16 h-16 border-4 border-gray-400 mb-2">
            <AvatarFallback className="bg-gradient-to-br from-gray-300 to-gray-500 text-white text-xl font-bold">
              {getData()[1]?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-sm">{getData()[1]?.name}</span>
          <span className="text-xs text-muted-foreground">{getData()[1]?.score.toLocaleString()} pts</span>
          <div className="mt-2 w-20 h-24 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg flex items-end justify-center pb-2">
            <span className="text-2xl font-bold text-white">2</span>
          </div>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center -mt-8"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Crown className="w-8 h-8 text-yellow-500 mb-1" />
          </motion.div>
          <Avatar className="w-20 h-20 border-4 border-yellow-500 mb-2">
            <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-amber-600 text-white text-2xl font-bold">
              {getData()[0]?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="font-bold">{getData()[0]?.name}</span>
          <span className="text-sm text-muted-foreground">{getData()[0]?.score.toLocaleString()} pts</span>
          <div className="mt-2 w-24 h-32 bg-gradient-to-t from-yellow-500 to-amber-400 rounded-t-lg flex items-end justify-center pb-2">
            <span className="text-3xl font-bold text-white">1</span>
          </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <Avatar className="w-14 h-14 border-4 border-amber-600 mb-2">
            <AvatarFallback className="bg-gradient-to-br from-amber-500 to-amber-700 text-white text-lg font-bold">
              {getData()[2]?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-sm">{getData()[2]?.name}</span>
          <span className="text-xs text-muted-foreground">{getData()[2]?.score.toLocaleString()} pts</span>
          <div className="mt-2 w-20 h-20 bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-lg flex items-end justify-center pb-2">
            <span className="text-2xl font-bold text-white">3</span>
          </div>
        </motion.div>
      </div>

      {/* Your Position Card */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-primary">#{currentUser.rank}</span>
                {getRankChange(currentUser.rank, currentUser.previousRank)}
              </div>
              <Avatar className="w-12 h-12 border-2 border-primary">
                <AvatarFallback className="bg-primary text-primary-foreground font-bold">V</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-foreground">Votre position</p>
                <p className="text-sm text-muted-foreground">{currentUser.score.toLocaleString()} points</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Target className="w-4 h-4" />
                  <span>{currentUser.quizzes}</span>
                </div>
                <span className="text-xs text-muted-foreground">Quiz</span>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-warning">
                  <Flame className="w-4 h-4" />
                  <span>{currentUser.streak}</span>
                </div>
                <span className="text-xs text-muted-foreground">Série</span>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-primary">
                  <Zap className="w-4 h-4" />
                  <span>Niv. {currentUser.level}</span>
                </div>
                <span className="text-xs text-muted-foreground">Niveau</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full Leaderboard */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Award className="w-5 h-5 text-primary" />
            Classement complet
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            <AnimatePresence>
              {getData().map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredEntry(entry.id)}
                  onMouseLeave={() => setHoveredEntry(null)}
                  className={`flex items-center justify-between p-4 transition-all duration-300 ${getRowStyle(entry.rank)} ${
                    hoveredEntry === entry.id ? "scale-[1.01] shadow-lg" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex flex-col items-center w-12">
                      {getRankIcon(entry.rank)}
                      {getRankChange(entry.rank, entry.previousRank)}
                    </div>

                    {/* Avatar & Name */}
                    <Avatar className={`w-10 h-10 ${entry.rank <= 3 ? "ring-2 ring-offset-2 ring-offset-background" : ""} ${
                      entry.rank === 1 ? "ring-yellow-500" : entry.rank === 2 ? "ring-gray-400" : entry.rank === 3 ? "ring-amber-600" : ""
                    }`}>
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold">
                        {entry.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{entry.name}</span>
                        <span>{entry.country}</span>
                        {entry.badges.map((badge, i) => (
                          <span key={i} className="text-sm">{badge}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" /> Niv. {entry.level}
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3 text-warning" /> {entry.streak}j
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6">
                    <div className="text-center hidden sm:block">
                      <p className="font-semibold text-foreground">{entry.quizzes}</p>
                      <p className="text-xs text-muted-foreground">Quiz</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {entry.score.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Participants", value: "1,247", icon: Target, color: "text-primary" },
          { label: "Quiz complétés", value: "8,432", icon: Award, color: "text-success" },
          { label: "Points distribués", value: "2.4M", icon: Zap, color: "text-warning" },
          { label: "Série max", value: "45 jours", icon: Flame, color: "text-destructive" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4 text-center">
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
