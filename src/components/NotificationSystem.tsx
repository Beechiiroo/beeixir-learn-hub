import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  X, 
  BookOpen, 
  Trophy, 
  Clock, 
  Sparkles,
  Gift,
  Flame,
  Target,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type: "course" | "achievement" | "reminder" | "promotion" | "system";
  title: string;
  message: string;
  time: Date;
  read: boolean;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const NotificationSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "course",
      title: "Nouveau cours disponible !",
      message: "React 19 : Toutes les nouveautés - Maîtrisez les dernières fonctionnalités",
      time: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
    },
    {
      id: "2",
      type: "achievement",
      title: "🏆 Achievement débloqué !",
      message: "Vous avez terminé 10 cours ! Badge 'Apprenant Dévoué' obtenu",
      time: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
    },
    {
      id: "3",
      type: "reminder",
      title: "⏰ Rappel d'étude",
      message: "Il est temps de continuer votre cours Node.js ! 3 leçons vous attendent",
      time: new Date(Date.now() - 1000 * 60 * 60),
      read: false,
    },
    {
      id: "4",
      type: "promotion",
      title: "🎁 Offre spéciale",
      message: "-30% sur tous les cours AI & Machine Learning ce weekend !",
      time: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: true,
    },
    {
      id: "5",
      type: "achievement",
      title: "🔥 Série maintenue !",
      message: "12 jours consécutifs d'apprentissage ! Continuez comme ça !",
      time: new Date(Date.now() - 1000 * 60 * 60 * 5),
      read: true,
    },
    {
      id: "6",
      type: "system",
      title: "Mise à jour du système",
      message: "De nouvelles fonctionnalités ont été ajoutées à votre dashboard",
      time: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true,
    },
  ]);

  const [showToast, setShowToast] = useState(false);
  const [toastNotification, setToastNotification] = useState<Notification | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotifications = [
        {
          type: "reminder" as const,
          title: "⏰ C'est l'heure d'étudier !",
          message: "Votre objectif quotidien n'est pas encore atteint. 2h restantes !",
        },
        {
          type: "course" as const,
          title: "📚 Contenu mis à jour",
          message: "Le cours Python a été enrichi avec 5 nouvelles leçons",
        },
        {
          type: "achievement" as const,
          title: "⭐ Nouveau niveau !",
          message: "Félicitations ! Vous êtes maintenant niveau 9",
        },
      ];

      const random = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
      const newNotification: Notification = {
        id: Date.now().toString(),
        ...random,
        time: new Date(),
        read: false,
      };

      setToastNotification(newNotification);
      setShowToast(true);
      setNotifications(prev => [newNotification, ...prev]);

      setTimeout(() => setShowToast(false), 5000);
    }, 45000); // Every 45 seconds

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "course":
        return <BookOpen className="w-5 h-5 text-primary" />;
      case "achievement":
        return <Trophy className="w-5 h-5 text-warning" />;
      case "reminder":
        return <Clock className="w-5 h-5 text-secondary" />;
      case "promotion":
        return <Gift className="w-5 h-5 text-success" />;
      case "system":
        return <Info className="w-5 h-5 text-muted-foreground" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: Notification["type"]) => {
    switch (type) {
      case "course":
        return "bg-primary/10 border-primary/20";
      case "achievement":
        return "bg-warning/10 border-warning/20";
      case "reminder":
        return "bg-secondary/10 border-secondary/20";
      case "promotion":
        return "bg-success/10 border-success/20";
      case "system":
        return "bg-muted border-border";
      default:
        return "bg-card border-border";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `Il y a ${minutes}min`;
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${days}j`;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <>
      {/* Notification Bell Button */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all"
        >
          <Bell className="w-5 h-5 text-foreground" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Notification Panel */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-40"
              />

              {/* Panel */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="absolute right-0 top-12 w-[380px] max-h-[500px] bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl shadow-primary/10 z-50 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {unreadCount} nouvelles
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Tout lire
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Notifications List */}
                <ScrollArea className="h-[400px]">
                  <div className="p-2">
                    {notifications.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>Aucune notification</p>
                      </div>
                    ) : (
                      notifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => markAsRead(notification.id)}
                          className={`relative p-3 rounded-xl mb-2 cursor-pointer transition-all duration-300 border ${getTypeColor(notification.type)} ${
                            !notification.read
                              ? "bg-primary/5"
                              : "hover:bg-muted/50"
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {getIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                                  {notification.title}
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded transition-all"
                                >
                                  <X className="w-3 h-3 text-muted-foreground" />
                                </button>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-muted-foreground/70">
                                  {formatTime(notification.time)}
                                </span>
                                {!notification.read && (
                                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && toastNotification && (
          <motion.div
            initial={{ opacity: 0, y: -100, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -100, x: "-50%" }}
            className="fixed top-4 left-1/2 z-[100] w-[90%] max-w-md"
          >
            <div className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-xl ${getTypeColor(toastNotification.type)}`}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {getIcon(toastNotification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">{toastNotification.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{toastNotification.message}</p>
                </div>
                <button
                  onClick={() => setShowToast(false)}
                  className="p-1 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NotificationSystem;
