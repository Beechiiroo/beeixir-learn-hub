import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  Zap,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Home,
  Star,
  Target,
  Flame,
  Award,
  BookOpen,
  Brain,
  Sparkles,
  Timer
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  timeLimit: number; // in seconds
  questions: Question[];
}

const quizzes: Quiz[] = [
  {
    id: "react",
    title: "React Masterclass",
    description: "Testez vos connaissances en React",
    icon: "⚛️",
    color: "from-blue-500 to-cyan-500",
    timeLimit: 300,
    questions: [
      {
        id: 1,
        question: "Quelle méthode permet de gérer l'état local dans un composant fonctionnel React?",
        options: ["this.state", "useState()", "createState()", "getState()"],
        correctAnswer: 1,
        explanation: "useState() est le Hook React qui permet de gérer l'état local dans les composants fonctionnels.",
        difficulty: "easy",
        points: 10
      },
      {
        id: 2,
        question: "Quel Hook est utilisé pour effectuer des effets de bord dans React?",
        options: ["useSideEffect()", "useEffect()", "useChange()", "useWatch()"],
        correctAnswer: 1,
        explanation: "useEffect() permet d'effectuer des effets de bord comme les appels API, les abonnements, etc.",
        difficulty: "easy",
        points: 10
      },
      {
        id: 3,
        question: "Comment passer des données d'un composant parent à un composant enfant?",
        options: ["Via le state global", "Via les props", "Via localStorage", "Via les cookies"],
        correctAnswer: 1,
        explanation: "Les props (propriétés) sont le mécanisme principal pour passer des données du parent vers l'enfant.",
        difficulty: "easy",
        points: 10
      },
      {
        id: 4,
        question: "Quelle est la différence entre useMemo et useCallback?",
        options: [
          "useMemo mémorise une valeur, useCallback mémorise une fonction",
          "useMemo est pour les classes, useCallback pour les fonctions",
          "Il n'y a pas de différence",
          "useMemo est plus rapide"
        ],
        correctAnswer: 0,
        explanation: "useMemo retourne une valeur mémorisée, tandis que useCallback retourne une fonction mémorisée.",
        difficulty: "medium",
        points: 20
      },
      {
        id: 5,
        question: "Quel est le rôle du Virtual DOM dans React?",
        options: [
          "Remplacer le DOM réel",
          "Optimiser les mises à jour du DOM en minimisant les manipulations directes",
          "Stocker les données de l'application",
          "Gérer le routing"
        ],
        correctAnswer: 1,
        explanation: "Le Virtual DOM permet à React de calculer les changements nécessaires avant de les appliquer au DOM réel, optimisant ainsi les performances.",
        difficulty: "medium",
        points: 20
      },
      {
        id: 6,
        question: "Comment éviter le prop drilling dans React?",
        options: [
          "Utiliser plus de composants",
          "Utiliser Context API ou des state managers comme Redux",
          "Utiliser des classes au lieu de fonctions",
          "Augmenter le nombre de props"
        ],
        correctAnswer: 1,
        explanation: "Context API ou des gestionnaires d'état comme Redux permettent de partager des données sans passer les props à travers chaque niveau.",
        difficulty: "hard",
        points: 30
      }
    ]
  },
  {
    id: "javascript",
    title: "JavaScript Avancé",
    description: "Maîtrisez les concepts avancés de JS",
    icon: "🟨",
    color: "from-yellow-500 to-orange-500",
    timeLimit: 300,
    questions: [
      {
        id: 1,
        question: "Qu'est-ce qu'une closure en JavaScript?",
        options: [
          "Une fonction qui n'a pas de nom",
          "Une fonction qui a accès aux variables de son scope parent même après que celui-ci soit terminé",
          "Une méthode pour fermer une fenêtre",
          "Un type de boucle"
        ],
        correctAnswer: 1,
        explanation: "Une closure est une fonction qui conserve l'accès aux variables de son scope englobant, même après l'exécution de celui-ci.",
        difficulty: "medium",
        points: 20
      },
      {
        id: 2,
        question: "Quelle est la différence entre '==' et '===' en JavaScript?",
        options: [
          "Aucune différence",
          "'===' compare les types aussi, '==' ne le fait pas",
          "'==' est plus rapide",
          "'===' est deprecated"
        ],
        correctAnswer: 1,
        explanation: "'===' effectue une comparaison stricte (valeur ET type), tandis que '==' effectue une conversion de type avant la comparaison.",
        difficulty: "easy",
        points: 10
      },
      {
        id: 3,
        question: "Qu'est-ce que le hoisting en JavaScript?",
        options: [
          "Une technique d'optimisation",
          "Le déplacement des déclarations de variables et fonctions en haut de leur scope",
          "Un framework JavaScript",
          "Une méthode de débogage"
        ],
        correctAnswer: 1,
        explanation: "Le hoisting est le comportement de JavaScript qui déplace les déclarations en haut de leur scope avant l'exécution.",
        difficulty: "medium",
        points: 20
      },
      {
        id: 4,
        question: "Qu'est-ce qu'une Promise en JavaScript?",
        options: [
          "Une variable globale",
          "Un objet représentant la complétion ou l'échec d'une opération asynchrone",
          "Une fonction de callback",
          "Un type de boucle"
        ],
        correctAnswer: 1,
        explanation: "Une Promise est un objet qui représente une valeur qui peut être disponible maintenant, dans le futur, ou jamais.",
        difficulty: "medium",
        points: 20
      },
      {
        id: 5,
        question: "Quelle est la différence entre 'let', 'const' et 'var'?",
        options: [
          "Aucune différence",
          "'let' et 'const' ont un scope de bloc, 'var' a un scope de fonction",
          "'var' est plus moderne",
          "'const' peut être réassigné"
        ],
        correctAnswer: 1,
        explanation: "'let' et 'const' sont block-scoped, tandis que 'var' est function-scoped. 'const' ne peut pas être réassigné.",
        difficulty: "easy",
        points: 10
      }
    ]
  },
  {
    id: "python",
    title: "Python pour l'IA",
    description: "Les bases de Python pour l'intelligence artificielle",
    icon: "🐍",
    color: "from-green-500 to-emerald-500",
    timeLimit: 300,
    questions: [
      {
        id: 1,
        question: "Quelle bibliothèque Python est principalement utilisée pour le Deep Learning?",
        options: ["NumPy", "Pandas", "TensorFlow/PyTorch", "Matplotlib"],
        correctAnswer: 2,
        explanation: "TensorFlow et PyTorch sont les deux principales bibliothèques utilisées pour le Deep Learning.",
        difficulty: "easy",
        points: 10
      },
      {
        id: 2,
        question: "Quelle est la différence entre une liste et un tuple en Python?",
        options: [
          "Aucune différence",
          "Les tuples sont immuables, les listes sont mutables",
          "Les listes sont plus rapides",
          "Les tuples ne peuvent contenir que des nombres"
        ],
        correctAnswer: 1,
        explanation: "Les tuples sont immuables (ne peuvent pas être modifiés après création), contrairement aux listes qui sont mutables.",
        difficulty: "easy",
        points: 10
      },
      {
        id: 3,
        question: "Qu'est-ce qu'un décorateur en Python?",
        options: [
          "Un commentaire spécial",
          "Une fonction qui modifie le comportement d'une autre fonction",
          "Un type de variable",
          "Une classe de style"
        ],
        correctAnswer: 1,
        explanation: "Un décorateur est une fonction qui prend une autre fonction en argument et étend son comportement sans la modifier explicitement.",
        difficulty: "medium",
        points: 20
      },
      {
        id: 4,
        question: "Quelle bibliothèque est utilisée pour la manipulation de données tabulaires?",
        options: ["NumPy", "Pandas", "Scikit-learn", "Keras"],
        correctAnswer: 1,
        explanation: "Pandas est la bibliothèque standard pour la manipulation et l'analyse de données tabulaires en Python.",
        difficulty: "easy",
        points: 10
      },
      {
        id: 5,
        question: "Qu'est-ce que le GIL (Global Interpreter Lock) en Python?",
        options: [
          "Un outil de débogage",
          "Un verrou qui empêche l'exécution simultanée de bytecode Python par plusieurs threads",
          "Une bibliothèque graphique",
          "Un gestionnaire de packages"
        ],
        correctAnswer: 1,
        explanation: "Le GIL est un mutex qui protège l'accès aux objets Python, limitant l'exécution à un seul thread à la fois.",
        difficulty: "hard",
        points: 30
      }
    ]
  }
];

const Quiz = () => {
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get("course") || "react";
  const { toast } = useToast();
  
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; selected: number; correct: boolean }[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz) {
      setCurrentQuiz(quiz);
      setTimeLeft(quiz.timeLimit);
    }
  }, [quizId]);

  useEffect(() => {
    if (!quizStarted || quizComplete || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setQuizComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizComplete, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    toast({
      title: "Quiz démarré !",
      description: "Bonne chance ! Le temps est compté.",
    });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuiz) return;

    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    setShowFeedback(true);
    setAnswers(prev => [...prev, { 
      questionId: currentQuestion.id, 
      selected: selectedAnswer, 
      correct: isCorrect 
    }]);

    if (isCorrect) {
      const bonusMultiplier = 1 + (streak * 0.1);
      const earnedPoints = Math.round(currentQuestion.points * bonusMultiplier);
      setScore(prev => prev + earnedPoints);
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > maxStreak) setMaxStreak(newStreak);
        return newStreak;
      });
      
      toast({
        title: "🎉 Correct !",
        description: `+${earnedPoints} points${streak > 0 ? ` (x${bonusMultiplier.toFixed(1)} streak bonus!)` : ""}`,
      });
    } else {
      setStreak(0);
      toast({
        title: "❌ Incorrect",
        description: "Ne vous découragez pas !",
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = () => {
    if (!currentQuiz) return;

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setCorrectAnswers(0);
    setQuizComplete(false);
    setStreak(0);
    setMaxStreak(0);
    setAnswers([]);
    setQuizStarted(false);
    if (currentQuiz) {
      setTimeLeft(currentQuiz.timeLimit);
    }
  };

  const getScoreGrade = () => {
    if (!currentQuiz) return { grade: "F", color: "text-destructive", message: "" };
    const percentage = (correctAnswers / currentQuiz.questions.length) * 100;
    
    if (percentage >= 90) return { grade: "A+", color: "text-success", message: "Exceptionnel ! Vous êtes un expert !" };
    if (percentage >= 80) return { grade: "A", color: "text-success", message: "Excellent travail !" };
    if (percentage >= 70) return { grade: "B", color: "text-primary", message: "Très bien ! Continuez comme ça !" };
    if (percentage >= 60) return { grade: "C", color: "text-warning", message: "Pas mal ! Encore un peu d'effort !" };
    if (percentage >= 50) return { grade: "D", color: "text-orange-500", message: "Vous pouvez faire mieux !" };
    return { grade: "F", color: "text-destructive", message: "Révisez et réessayez !" };
  };

  if (!currentQuiz) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Chargement du quiz...</p>
      </div>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

  // Quiz Selection Screen
  if (!quizStarted && !quizComplete) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <CustomCursor />
        <ParticleBackground />
        <Header />

        <main className="container mx-auto px-4 py-8 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Quiz Header */}
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden mb-8">
              <div className={`h-32 bg-gradient-to-r ${currentQuiz.color} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">{currentQuiz.icon}</span>
                </div>
              </div>
              <CardContent className="p-6 text-center">
                <h1 className="text-3xl font-bold text-foreground mb-2">{currentQuiz.title}</h1>
                <p className="text-muted-foreground mb-6">{currentQuiz.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <BookOpen className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-foreground">{currentQuiz.questions.length}</p>
                    <p className="text-sm text-muted-foreground">Questions</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <Timer className="w-6 h-6 mx-auto mb-2 text-warning" />
                    <p className="text-2xl font-bold text-foreground">{Math.floor(currentQuiz.timeLimit / 60)} min</p>
                    <p className="text-sm text-muted-foreground">Durée</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <Zap className="w-6 h-6 mx-auto mb-2 text-secondary" />
                    <p className="text-2xl font-bold text-foreground">
                      {currentQuiz.questions.reduce((acc, q) => acc + q.points, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Points max</p>
                  </div>
                </div>

                <Button 
                  onClick={handleStartQuiz}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 px-12"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Commencer le Quiz
                </Button>
              </CardContent>
            </Card>

            {/* Other Quizzes */}
            <h2 className="text-xl font-bold text-foreground mb-4">Autres Quiz Disponibles</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {quizzes.filter(q => q.id !== quizId).map((quiz) => (
                <Link key={quiz.id} to={`/quiz?course=${quiz.id}`}>
                  <Card className="border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <span className="text-4xl mb-3 block">{quiz.icon}</span>
                      <h3 className="font-semibold text-foreground">{quiz.title}</h3>
                      <p className="text-sm text-muted-foreground">{quiz.questions.length} questions</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    );
  }

  // Quiz Complete Screen
  if (quizComplete) {
    const { grade, color, message } = getScoreGrade();
    const percentage = Math.round((correctAnswers / currentQuiz.questions.length) * 100);

    return (
      <div className="min-h-screen bg-background text-foreground">
        <CustomCursor />
        <ParticleBackground />
        <Header />

        <main className="container mx-auto px-4 py-8 pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
              <div className={`h-32 bg-gradient-to-r ${currentQuiz.color} relative flex items-center justify-center`}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <Trophy className="w-20 h-20 text-white" />
                </motion.div>
              </div>

              <CardContent className="p-8 text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-foreground mb-2"
                >
                  Quiz Terminé !
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="my-8"
                >
                  <div className={`text-8xl font-black ${color}`}>{grade}</div>
                  <p className="text-lg text-muted-foreground mt-2">{message}</p>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-4 rounded-xl bg-primary/10 border border-primary/20"
                  >
                    <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-3xl font-bold text-foreground">{score}</p>
                    <p className="text-sm text-muted-foreground">Points gagnés</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-4 rounded-xl bg-success/10 border border-success/20"
                  >
                    <Target className="w-8 h-8 mx-auto mb-2 text-success" />
                    <p className="text-3xl font-bold text-foreground">{percentage}%</p>
                    <p className="text-sm text-muted-foreground">Précision</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-4 rounded-xl bg-warning/10 border border-warning/20"
                  >
                    <Flame className="w-8 h-8 mx-auto mb-2 text-warning" />
                    <p className="text-3xl font-bold text-foreground">{maxStreak}</p>
                    <p className="text-sm text-muted-foreground">Meilleure série</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-4 rounded-xl bg-secondary/10 border border-secondary/20"
                  >
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-secondary" />
                    <p className="text-3xl font-bold text-foreground">{correctAnswers}/{currentQuiz.questions.length}</p>
                    <p className="text-sm text-muted-foreground">Bonnes réponses</p>
                  </motion.div>
                </div>

                {/* Answer Review */}
                <div className="mb-8">
                  <h3 className="font-semibold text-foreground mb-4 text-left">Récapitulatif des réponses</h3>
                  <div className="space-y-2">
                    {answers.map((answer, index) => {
                      const question = currentQuiz.questions.find(q => q.id === answer.questionId);
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.05 }}
                          className={`flex items-center gap-3 p-3 rounded-lg ${
                            answer.correct ? "bg-success/10 border border-success/20" : "bg-destructive/10 border border-destructive/20"
                          }`}
                        >
                          {answer.correct ? (
                            <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                          )}
                          <span className="text-sm text-foreground text-left flex-1 line-clamp-1">
                            Q{index + 1}: {question?.question}
                          </span>
                          <Badge variant={answer.correct ? "default" : "destructive"} className="flex-shrink-0">
                            {answer.correct ? `+${question?.points}` : "0"}
                          </Badge>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={handleRestartQuiz} variant="outline" size="lg">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Recommencer
                  </Button>
                  <Link to="/leaderboard">
                    <Button size="lg" variant="outline" className="border-warning text-warning hover:bg-warning/10">
                      <Trophy className="w-4 h-4 mr-2" />
                      Voir le Classement
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                      <Home className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>

        <Footer />
      </div>
    );
  }

  // Active Quiz Screen
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <ParticleBackground />
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-3xl mx-auto">
          {/* Quiz Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentQuiz.icon}</span>
                <div>
                  <h1 className="text-xl font-bold text-foreground">{currentQuiz.title}</h1>
                  <p className="text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1} sur {currentQuiz.questions.length}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Streak */}
                {streak > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-warning/20 border border-warning/30"
                  >
                    <Flame className="w-4 h-4 text-warning" />
                    <span className="font-bold text-warning">{streak}</span>
                  </motion.div>
                )}
                
                {/* Timer */}
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                  timeLeft < 60 ? "bg-destructive/20 border border-destructive/30" : "bg-muted border border-border"
                }`}>
                  <Clock className={`w-4 h-4 ${timeLeft < 60 ? "text-destructive animate-pulse" : "text-muted-foreground"}`} />
                  <span className={`font-mono font-bold ${timeLeft < 60 ? "text-destructive" : "text-foreground"}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>

                {/* Score */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="font-bold text-primary">{score}</span>
                </div>
              </div>
            </div>

            <Progress value={progress} className="h-2" />
          </motion.div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      variant="outline" 
                      className={
                        currentQuestion.difficulty === "easy" 
                          ? "border-success/50 text-success" 
                          : currentQuestion.difficulty === "medium"
                          ? "border-warning/50 text-warning"
                          : "border-destructive/50 text-destructive"
                      }
                    >
                      {currentQuestion.difficulty === "easy" ? "Facile" : currentQuestion.difficulty === "medium" ? "Moyen" : "Difficile"}
                    </Badge>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {currentQuestion.points} pts
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-foreground leading-relaxed">
                    {currentQuestion.question}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const showCorrect = showFeedback && isCorrect;
                    const showWrong = showFeedback && isSelected && !isCorrect;

                    return (
                      <motion.button
                        key={index}
                        whileHover={!showFeedback ? { scale: 1.02 } : {}}
                        whileTap={!showFeedback ? { scale: 0.98 } : {}}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showFeedback}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                          showCorrect
                            ? "border-success bg-success/10 text-foreground"
                            : showWrong
                            ? "border-destructive bg-destructive/10 text-foreground"
                            : isSelected
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border hover:border-primary/50 text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            showCorrect
                              ? "bg-success text-success-foreground"
                              : showWrong
                              ? "bg-destructive text-destructive-foreground"
                              : isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {showCorrect ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : showWrong ? (
                              <XCircle className="w-5 h-5" />
                            ) : (
                              String.fromCharCode(65 + index)
                            )}
                          </div>
                          <span className="flex-1">{option}</span>
                        </div>
                      </motion.button>
                    );
                  })}

                  {/* Feedback */}
                  <AnimatePresence>
                    {showFeedback && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4"
                      >
                        <div className={`p-4 rounded-xl ${
                          selectedAnswer === currentQuestion.correctAnswer
                            ? "bg-success/10 border border-success/30"
                            : "bg-primary/10 border border-primary/30"
                        }`}>
                          <div className="flex items-start gap-3">
                            <Brain className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                              <p className="font-semibold text-foreground mb-1">Explication</p>
                              <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-between mt-6"
          >
            <Button
              variant="ghost"
              onClick={() => {
                if (currentQuestionIndex > 0 && !showFeedback) {
                  setCurrentQuestionIndex(prev => prev - 1);
                  setSelectedAnswer(null);
                }
              }}
              disabled={currentQuestionIndex === 0 || showFeedback}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>

            {!showFeedback ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="bg-gradient-to-r from-primary to-secondary"
              >
                Valider
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="bg-gradient-to-r from-primary to-secondary"
              >
                {currentQuestionIndex < currentQuiz.questions.length - 1 ? "Suivant" : "Terminer"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
