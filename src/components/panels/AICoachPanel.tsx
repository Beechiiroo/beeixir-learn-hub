import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Send, X, Sparkles, Lightbulb, Code, BookOpen, Zap } from "lucide-react";

interface Suggestion {
  icon: typeof Brain;
  title: string;
  description: string;
  action: string;
}

const suggestions: Suggestion[] = [
  { icon: Code, title: "Apprendre React", description: "Commencez par les fondamentaux", action: "react" },
  { icon: BookOpen, title: "IA & Machine Learning", description: "Explorez l'intelligence artificielle", action: "ai" },
  { icon: Zap, title: "Développement Full-Stack", description: "Maîtrisez le front et back", action: "fullstack" },
  { icon: Lightbulb, title: "Projets Pratiques", description: "Apprenez en construisant", action: "projects" },
];

interface AICoachPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AICoachPanel = ({ isOpen, onClose }: AICoachPanelProps) => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const generateResponse = async (input: string) => {
    setIsThinking(true);
    setResponse("");
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const responses: Record<string, string> = {
      react: "🚀 Pour maîtriser React, commencez par les composants, props et state. Notre cours React couvre tout avec des projets pratiques!",
      ai: "🤖 Commencez par Python, puis NumPy, Pandas et scikit-learn. Notre parcours IA vous guide étape par étape!",
      fullstack: "💻 Le Full-Stack combine front-end (React) et back-end (Node.js). Nos cours couvrent tout le spectre!",
      projects: "🛠️ Commencez par un portfolio, puis créez une app CRUD. Chaque projet renforce vos compétences!",
      default: "💡 Je peux vous aider à trouver le parcours idéal. Dites-moi ce qui vous intéresse!",
    };

    const key = Object.keys(responses).find((k) => input.toLowerCase().includes(k)) || "default";
    const fullResponse = responses[key];
    for (let i = 0; i <= fullResponse.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 15));
      setResponse(fullResponse.slice(0, i));
    }
    setIsThinking(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) { generateResponse(query); setQuery(""); }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-0 top-0 h-full w-80 sm:w-96 z-50"
        >
          <div className="relative h-full overflow-hidden">
            <div className="absolute inset-0 bg-card/80 backdrop-blur-2xl border-l border-white/10" />
            <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-purple-500/5" />
            
            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-white/10 bg-gradient-to-r from-violet-600/20 to-purple-600/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"
                    >
                      <Brain className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold">AI Learning Coach</h3>
                      <p className="text-xs text-muted-foreground">Votre assistant personnel</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8"><X className="w-4 h-4" /></Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-4 overflow-y-auto">
                {!response && !isThinking && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      Suggestions pour commencer:
                    </p>
                    {suggestions.map((suggestion) => {
                      const Icon = suggestion.icon;
                      return (
                        <motion.button
                          key={suggestion.action}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => generateResponse(suggestion.action)}
                          className="w-full p-3 rounded-2xl bg-muted/50 hover:bg-muted text-left flex items-start gap-3 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-violet-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{suggestion.title}</h4>
                            <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                )}

                {isThinking && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Brain className="w-5 h-5 text-violet-400" />
                    </motion.div>
                    <span className="text-sm">L'IA réfléchit...</span>
                  </motion.div>
                )}

                {response && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{response}</p>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Posez une question..." className="flex-1 rounded-xl" />
                  <Button type="submit" size="icon" disabled={isThinking} className="rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AICoachPanel;
