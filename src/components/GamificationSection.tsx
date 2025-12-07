import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Crown, Medal, Target, Flame, Award, TrendingUp, Users, Gift, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const GamificationSection = () => {
  const [selectedTab, setSelectedTab] = useState<'xp' | 'leaderboard' | 'rewards'>('xp');

  const userStats = {
    currentXP: 2750,
    nextLevelXP: 3500,
    level: 12,
    rank: 3,
    streak: 7,
    totalPoints: 15420,
    badges: 18,
    coursesCompleted: 8
  };

  const xpProgress = (userStats.currentXP / userStats.nextLevelXP) * 100;

  const leaderboard = [
    { rank: 1, name: 'Sarah M.', xp: 18500, level: 15, avatar: '👩‍💻', badge: 'gold' },
    { rank: 2, name: 'Ahmed K.', xp: 16200, level: 14, avatar: '👨‍💻', badge: 'silver' },
    { rank: 3, name: 'Vous', xp: 15420, level: 12, avatar: '🎯', badge: 'bronze', isUser: true },
    { rank: 4, name: 'Marie L.', xp: 14800, level: 12, avatar: '👩‍🎓', badge: null },
    { rank: 5, name: 'Lucas D.', xp: 13500, level: 11, avatar: '🧑‍💻', badge: null },
    { rank: 6, name: 'Emma B.', xp: 12900, level: 11, avatar: '👩‍🔬', badge: null },
    { rank: 7, name: 'Noah P.', xp: 11200, level: 10, avatar: '👨‍🎓', badge: null },
  ];

  const rewards = [
    { id: 1, name: 'Cours Gratuit', description: 'Débloquez un cours premium', xpRequired: 5000, icon: Gift, unlocked: true, claimed: true },
    { id: 2, name: 'Badge Expert', description: 'Badge exclusif sur votre profil', xpRequired: 10000, icon: Award, unlocked: true, claimed: false },
    { id: 3, name: 'Mentorat 1h', description: 'Session privée avec un expert', xpRequired: 20000, icon: Users, unlocked: false, claimed: false },
    { id: 4, name: 'Certification Pro', description: 'Certification officielle', xpRequired: 35000, icon: Medal, unlocked: false, claimed: false },
    { id: 5, name: 'Accès VIP', description: 'Accès à tous les cours à vie', xpRequired: 50000, icon: Crown, unlocked: false, claimed: false },
  ];

  const dailyChallenges = [
    { id: 1, title: 'Terminer une leçon', xp: 50, progress: 100, completed: true },
    { id: 2, title: 'Quiz parfait', xp: 100, progress: 75, completed: false },
    { id: 3, title: 'Étudier 30 min', xp: 75, progress: 60, completed: false },
  ];

  const levelBenefits = [
    { level: 5, benefit: 'Accès aux forums privés', unlocked: true },
    { level: 10, benefit: 'Téléchargement des ressources', unlocked: true },
    { level: 15, benefit: 'Réductions exclusives', unlocked: false },
    { level: 20, benefit: 'Mentorat prioritaire', unlocked: false },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Sparkles className="w-4 h-4 text-primary/20" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-4"
            animate={{ boxShadow: ['0 0 20px rgba(245, 158, 11, 0.2)', '0 0 40px rgba(245, 158, 11, 0.4)', '0 0 20px rgba(245, 158, 11, 0.2)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="text-amber-500 font-semibold">Système de Gamification</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Gagnez des XP & Récompenses
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Progressez, débloquez des récompenses exclusives et affrontez d'autres apprenants !
          </p>
        </motion.div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Niveau', value: userStats.level, icon: Star, color: 'from-amber-500 to-orange-500' },
            { label: 'XP Total', value: userStats.totalPoints.toLocaleString(), icon: Zap, color: 'from-purple-500 to-pink-500' },
            { label: 'Classement', value: `#${userStats.rank}`, icon: Crown, color: 'from-emerald-500 to-teal-500' },
            { label: 'Série', value: `${userStats.streak} jours`, icon: Flame, color: 'from-red-500 to-orange-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <CardContent className="p-4 text-center">
                  <motion.div
                    className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                    animate={{ boxShadow: ['0 0 20px rgba(245, 158, 11, 0.4)', '0 0 40px rgba(245, 158, 11, 0.6)', '0 0 20px rgba(245, 158, 11, 0.4)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {userStats.level}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Niveau {userStats.level}</h3>
                    <p className="text-muted-foreground">Développeur Confirmé</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">{userStats.currentXP.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">/ {userStats.nextLevelXP.toLocaleString()} XP</p>
                </div>
              </div>
              <div className="relative">
                <Progress value={xpProgress} className="h-4" />
                <motion.div
                  className="absolute top-0 left-0 h-4 bg-gradient-to-r from-amber-400/50 to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </div>
              <p className="text-center mt-2 text-sm text-muted-foreground">
                Plus que <span className="text-amber-500 font-semibold">{(userStats.nextLevelXP - userStats.currentXP).toLocaleString()} XP</span> pour le niveau {userStats.level + 1}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            { id: 'xp', label: 'Défis & XP', icon: Target },
            { id: 'leaderboard', label: 'Classement', icon: TrendingUp },
            { id: 'rewards', label: 'Récompenses', icon: Gift },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedTab === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                  : 'bg-card/50 text-muted-foreground hover:text-foreground border border-border/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedTab === 'xp' && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Daily Challenges */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-500" />
                    Défis du Jour
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dailyChallenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border ${
                        challenge.completed
                          ? 'bg-emerald-500/10 border-emerald-500/30'
                          : 'bg-card border-border/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">{challenge.title}</span>
                        <Badge variant={challenge.completed ? 'default' : 'secondary'} className={challenge.completed ? 'bg-emerald-500' : ''}>
                          +{challenge.xp} XP
                        </Badge>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{challenge.progress}% complété</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Level Benefits */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" />
                    Avantages par Niveau
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {levelBenefits.map((item, index) => (
                    <motion.div
                      key={item.level}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-xl border ${
                        item.unlocked
                          ? 'bg-primary/10 border-primary/30'
                          : 'bg-muted/30 border-border/50 opacity-60'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        item.unlocked
                          ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {item.level}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.benefit}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.unlocked ? '✓ Débloqué' : `Niveau ${item.level} requis`}
                        </p>
                      </div>
                      {item.unlocked && <Star className="w-5 h-5 text-amber-500 fill-amber-500" />}
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {selectedTab === 'leaderboard' && (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  Classement Global
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((player, index) => (
                    <motion.div
                      key={player.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                        player.isUser
                          ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 shadow-lg'
                          : 'bg-card/50 border-border/50 hover:border-primary/30'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        player.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' :
                        player.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800' :
                        player.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {player.rank <= 3 ? (
                          player.rank === 1 ? <Crown className="w-5 h-5" /> :
                          player.rank === 2 ? <Medal className="w-5 h-5" /> :
                          <Award className="w-5 h-5" />
                        ) : player.rank}
                      </div>
                      <div className="text-3xl">{player.avatar}</div>
                      <div className="flex-1">
                        <p className={`font-semibold ${player.isUser ? 'text-amber-500' : 'text-foreground'}`}>
                          {player.name}
                        </p>
                        <p className="text-sm text-muted-foreground">Niveau {player.level}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{player.xp.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">XP</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {selectedTab === 'rewards' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden h-full ${
                    !reward.unlocked ? 'opacity-60' : ''
                  }`}>
                    <div className={`h-2 ${
                      reward.claimed ? 'bg-emerald-500' :
                      reward.unlocked ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                      'bg-muted'
                    }`} />
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                          reward.unlocked
                            ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                            : 'bg-muted'
                        }`}
                        whileHover={reward.unlocked ? { scale: 1.1, rotate: 5 } : {}}
                      >
                        <reward.icon className={`w-8 h-8 ${reward.unlocked ? 'text-white' : 'text-muted-foreground'}`} />
                      </motion.div>
                      <h3 className="font-bold text-lg text-foreground mb-1">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span className="font-semibold text-foreground">{reward.xpRequired.toLocaleString()} XP</span>
                      </div>
                      {reward.claimed ? (
                        <Badge className="bg-emerald-500">✓ Réclamé</Badge>
                      ) : reward.unlocked ? (
                        <motion.button
                          className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Réclamer
                        </motion.button>
                      ) : (
                        <Badge variant="secondary">🔒 Verrouillé</Badge>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default GamificationSection;
