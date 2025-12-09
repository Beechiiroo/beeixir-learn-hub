import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Settings, 
  Award, 
  BookOpen, 
  Trophy, 
  Flame,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Bell,
  Moon,
  Shield,
  Download,
  Trash2,
  Save,
  CheckCircle,
  Star,
  Zap,
  Target,
  Clock,
  GraduationCap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    bio: "Développeur passionné en reconversion, je suis actuellement en train de maîtriser React et Node.js. Mon objectif : devenir Full-Stack Developer d'ici 6 mois !",
    website: "https://jeandupont.dev",
    github: "jeandupont",
    linkedin: "jean-dupont",
    twitter: "@jeandupont",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    studyReminders: true,
    darkMode: true,
    twoFactorAuth: false,
  });

  // Stats
  const stats = {
    totalCourses: 12,
    completedCourses: 8,
    totalHours: 127,
    certificates: 5,
    xpPoints: 2450,
    level: 8,
    streak: 12,
    rank: 156,
  };

  // Achievements
  const achievements = [
    { id: 1, name: "Premier Pas", icon: "🎯", description: "Terminer votre premier cours", earned: true, date: "15 Jan 2024" },
    { id: 2, name: "Série de 7 jours", icon: "🔥", description: "Étudier 7 jours consécutifs", earned: true, date: "22 Jan 2024" },
    { id: 3, name: "Apprenant Dévoué", icon: "📚", description: "Terminer 10 cours", earned: true, date: "10 Fév 2024" },
    { id: 4, name: "Maître React", icon: "⚛️", description: "Compléter toutes les formations React", earned: true, date: "28 Fév 2024" },
    { id: 5, name: "Code Ninja", icon: "🥷", description: "Écrire 10 000 lignes de code", earned: true, date: "15 Mar 2024" },
    { id: 6, name: "Série de 30 jours", icon: "💎", description: "Étudier 30 jours consécutifs", earned: false, progress: 40 },
    { id: 7, name: "Full-Stack Master", icon: "🚀", description: "Maîtriser front-end et back-end", earned: false, progress: 65 },
    { id: 8, name: "Mentor", icon: "🎓", description: "Aider 50 étudiants", earned: false, progress: 20 },
  ];

  // Certificates
  const certificates = [
    { id: 1, name: "React Masterclass", date: "28 Fév 2024", hours: 24, grade: "A+", verified: true },
    { id: 2, name: "Node.js Backend Development", date: "15 Mar 2024", hours: 18, grade: "A", verified: true },
    { id: 3, name: "Python pour l'IA", date: "1 Avr 2024", hours: 32, grade: "A+", verified: true },
    { id: 4, name: "JavaScript Avancé", date: "10 Avr 2024", hours: 20, grade: "B+", verified: true },
    { id: 5, name: "TypeScript Fundamentals", date: "20 Avr 2024", hours: 12, grade: "A", verified: true },
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos modifications ont été enregistrées avec succès.",
    });
  };

  const xpForNextLevel = 3000;
  const xpProgress = (stats.xpPoints / xpForNextLevel) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <ParticleBackground />
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
            {/* Cover Image */}
            <div className="h-32 md:h-48 bg-gradient-to-r from-primary via-secondary to-primary relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
            </div>

            <CardContent className="relative px-6 pb-6">
              {/* Avatar */}
              <div className="absolute -top-16 left-6 md:left-8">
                <div className="relative">
                  <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-background shadow-xl">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" />
                    <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Profile Info */}
              <div className="pt-16 md:pt-20">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="text-2xl md:text-3xl font-bold text-foreground">{profileData.name}</h1>
                      <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                        <Trophy className="w-3 h-3 mr-1" />
                        Niveau {stats.level}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-warning" />
                        {stats.streak} jours
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {profileData.location}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                      {profileData.bio}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                      <Settings className="w-4 h-4 mr-2" />
                      {isEditing ? "Annuler" : "Modifier"}
                    </Button>
                    {isEditing && (
                      <Button onClick={handleSave} className="bg-gradient-to-r from-primary to-secondary">
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </Button>
                    )}
                  </div>
                </div>

                {/* XP Progress */}
                <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-warning" />
                      <span className="font-semibold text-foreground">{stats.xpPoints} XP</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {xpForNextLevel - stats.xpPoints} XP pour le niveau {stats.level + 1}
                    </span>
                  </div>
                  <Progress value={xpProgress} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Cours complétés", value: `${stats.completedCourses}/${stats.totalCourses}`, icon: BookOpen, color: "text-primary" },
            { label: "Heures d'étude", value: `${stats.totalHours}h`, icon: Clock, color: "text-secondary" },
            { label: "Certificats", value: stats.certificates, icon: Award, color: "text-warning" },
            { label: "Classement", value: `#${stats.rank}`, icon: Target, color: "text-success" },
          ].map((stat, index) => (
            <Card key={stat.label} className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="bg-card/80 border border-border p-1 rounded-xl">
            <TabsTrigger value="achievements" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
              <Trophy className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="certificates" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
              <GraduationCap className="w-4 h-4 mr-2" />
              Certificats
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`border-border/50 bg-card/80 backdrop-blur-sm h-full transition-all duration-300 ${
                    achievement.earned ? "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10" : "opacity-70"
                  }`}>
                    <CardContent className="p-6 text-center">
                      <div className={`text-4xl mb-3 ${!achievement.earned && "grayscale"}`}>
                        {achievement.icon}
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{achievement.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{achievement.description}</p>
                      {achievement.earned ? (
                        <Badge className="bg-success/20 text-success border-success/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {achievement.date}
                        </Badge>
                      ) : (
                        <div className="space-y-1">
                          <Progress value={achievement.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground">{achievement.progress}%</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-warning/20 to-warning/10 border border-warning/20">
                          <Award className="w-8 h-8 text-warning" />
                        </div>
                        {cert.verified && (
                          <Badge variant="outline" className="border-success/30 text-success">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Vérifié
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{cert.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        {cert.date}
                        <span className="mx-1">•</span>
                        <Clock className="w-4 h-4" />
                        {cert.hours}h
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          Note: {cert.grade}
                        </Badge>
                        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Personal Info */}
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <User className="w-5 h-5 text-primary" />
                    Informations personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Globe className="w-5 h-5 text-secondary" />
                    Liens sociaux
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Site web</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="github"
                        value={profileData.github}
                        onChange={(e) => setProfileData({...profileData, github: e.target.value})}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="linkedin"
                        value={profileData.linkedin}
                        onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Bell className="w-5 h-5 text-warning" />
                    Préférences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: "emailNotifications", label: "Notifications par email", description: "Recevoir les mises à jour par email" },
                    { key: "pushNotifications", label: "Notifications push", description: "Notifications en temps réel" },
                    { key: "studyReminders", label: "Rappels d'étude", description: "Rappels quotidiens pour étudier" },
                  ].map((pref) => (
                    <div key={pref.key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium text-foreground">{pref.label}</p>
                        <p className="text-sm text-muted-foreground">{pref.description}</p>
                      </div>
                      <Switch
                        checked={preferences[pref.key as keyof typeof preferences]}
                        onCheckedChange={(checked) => setPreferences({...preferences, [pref.key]: checked})}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Security */}
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Shield className="w-5 h-5 text-success" />
                    Sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-foreground">Authentification à deux facteurs</p>
                      <p className="text-sm text-muted-foreground">Sécurisez votre compte</p>
                    </div>
                    <Switch
                      checked={preferences.twoFactorAuth}
                      onCheckedChange={(checked) => setPreferences({...preferences, twoFactorAuth: checked})}
                    />
                  </div>
                  <Button variant="outline" className="w-full">
                    Changer le mot de passe
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer le compte
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
