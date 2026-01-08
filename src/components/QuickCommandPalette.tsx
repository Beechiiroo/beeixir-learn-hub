import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command,
  Search,
  Book,
  Code,
  Settings,
  User,
  Home,
  Zap,
  Moon,
  Sun,
  Music,
  Timer,
  MessageCircle,
  Trophy,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
const QuickCommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const commands = [
    { id: "home", icon: Home, label: "Accueil", shortcut: "H", action: () => navigate("/"), category: "Navigation" },
    { id: "courses", icon: Book, label: "Voir les cours", shortcut: "C", action: () => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" }), category: "Navigation" },
    { id: "dashboard", icon: Code, label: "Dashboard", shortcut: "D", action: () => navigate("/dashboard"), category: "Navigation" },
    { id: "quiz", icon: Zap, label: "Quiz", shortcut: "Q", action: () => navigate("/quiz"), category: "Navigation" },
    { id: "leaderboard", icon: Trophy, label: "Classement", shortcut: "L", action: () => navigate("/leaderboard"), category: "Navigation" },
    { id: "profile", icon: User, label: "Mon profil", shortcut: "P", action: () => navigate("/profile"), category: "Navigation" },
    { id: "settings", icon: Settings, label: "Paramètres", shortcut: "S", action: () => {}, category: "Actions" },
    { id: "theme-toggle", icon: theme === "dark" ? Sun : Moon, label: theme === "dark" ? "Mode clair" : "Mode sombre", shortcut: "T", action: () => setTheme(theme === "dark" ? "light" : "dark"), category: "Actions" },
    { id: "music", icon: Music, label: "Musique d'ambiance", shortcut: "M", action: () => {}, category: "Outils" },
    { id: "focus", icon: Timer, label: "Mode Focus", shortcut: "F", action: () => {}, category: "Outils" },
    { id: "ai-chat", icon: MessageCircle, label: "Chat IA", shortcut: "A", action: () => {}, category: "Outils" },
  ];

  const filteredCommands = commands.filter(
    (cmd) => 
      cmd.label.toLowerCase().includes(search.toLowerCase()) ||
      cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, typeof commands>);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Open palette with Cmd/Ctrl + K
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }

    if (isOpen) {
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearch("");
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      }
      if (e.key === "Enter" && filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        setIsOpen(false);
        setSearch("");
      }
    }
  }, [isOpen, filteredCommands, selectedIndex]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <>
      {/* Keyboard shortcut hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
        className="fixed bottom-4 right-4 z-30"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-background/60 backdrop-blur-xl px-3 py-2 rounded-xl border border-white/10 shadow-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Command className="w-4 h-4" />
          <span>⌘K</span>
        </motion.button>
      </motion.div>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOpen(false);
                setSearch("");
              }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-[101]"
            >
              <div className="mx-4 overflow-hidden rounded-2xl bg-card/95 backdrop-blur-2xl border border-white/20 shadow-2xl">
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher une commande..."
                    className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                    autoFocus
                  />
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">ESC</kbd>
                    <span>pour fermer</span>
                  </div>
                </div>

                {/* Commands list */}
                <div className="max-h-[400px] overflow-y-auto p-2">
                  {Object.entries(groupedCommands).map(([category, cmds]) => (
                    <div key={category} className="mb-2">
                      <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                        {category}
                      </div>
                      {cmds.map((cmd, cmdIndex) => {
                        const globalIndex = filteredCommands.indexOf(cmd);
                        return (
                          <motion.button
                            key={cmd.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: cmdIndex * 0.03 }}
                            onClick={() => {
                              cmd.action();
                              setIsOpen(false);
                              setSearch("");
                            }}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                              selectedIndex === globalIndex
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-muted/50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                selectedIndex === globalIndex
                                  ? "bg-primary/20"
                                  : "bg-muted"
                              }`}>
                                <cmd.icon className="w-4 h-4" />
                              </div>
                              <span className="font-medium">{cmd.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <kbd className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                                {cmd.shortcut}
                              </kbd>
                              {selectedIndex === globalIndex && (
                                <ArrowRight className="w-4 h-4 text-primary" />
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  ))}

                  {filteredCommands.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      <Sparkles className="w-8 h-8 mb-2 opacity-50" />
                      <p>Aucune commande trouvée</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-border/50 text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↑</kbd>
                      <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↓</kbd>
                      <span>naviguer</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↵</kbd>
                      <span>sélectionner</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Commande rapide 2026</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuickCommandPalette;
