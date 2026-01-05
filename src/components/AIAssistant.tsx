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

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const generateResponse = async (input: string) => {
    setIsThinking(true);
    setResponse("");

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const responses: Record<string, string> = {
      react: "🚀 Pour maîtriser React, commencez par comprendre les composants, les props et le state. Ensuite, explorez les hooks (useState, useEffect) et le Context API. Notre cours React couvre tout cela avec des projets pratiques!",
      ai: "🤖 L'IA est fascinante! Commencez par Python, puis explorez NumPy, Pandas, et scikit-learn. Pour le deep learning, TensorFlow ou PyTorch sont essentiels. Notre parcours IA vous guide étape par étape!",
      fullstack: "💻 Le Full-Stack combine front-end (React, Vue) et back-end (Node.js, Python). Apprenez également les bases de données (PostgreSQL, MongoDB) et le déploiement. Nos cours couvrent tout le spectre!",
      projects: "🛠️ Les projets pratiques sont clés! Commencez par un portfolio, puis créez une app CRUD, un clone de réseau social, et finalement une app avec IA. Chaque projet renforce vos compétences!",
      default: "💡 Je peux vous aider à trouver le parcours d'apprentissage idéal. Dites-moi ce qui vous intéresse: développement web, mobile, IA, data science, ou autre chose?",
    };

    const key = Object.keys(responses).find((k) => input.toLowerCase().includes(k)) || "default";
    
    // Simulate typing effect
    const fullResponse = responses[key];
    for (let i = 0; i <= fullResponse.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      setResponse(fullResponse.slice(0, i));
    }

    setIsThinking(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      generateResponse(query);
      setQuery("");
    }
  };

  const handleSuggestion = (action: string) => {
    generateResponse(action);
  };

  return (
    <>
      {/* AI Button */}
      <motion.div
        className="fixed top-1/2 -translate-y-1/2 right-0 z-40"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-l-full rounded-r-none pr-3 pl-4 h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg"
        >
          <Brain className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">AI Coach</span>
        </Button>
      </motion.div>

      {/* AI Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 top-0 h-full w-80 sm:w-96 z-50 bg-card/95 backdrop-blur-xl shadow-2xl border-l border-border"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                >
                  <Brain className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-white">AI Learning Coach</h3>
                  <p className="text-xs text-white/80">Votre assistant personnel</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-4 h-[calc(100%-140px)] overflow-y-auto">
              {/* Suggestions */}
              {!response && !isThinking && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-4">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    Suggestions pour commencer:
                  </p>
                  {suggestions.map((suggestion) => {
                    const Icon = suggestion.icon;
                    return (
                      <motion.button
                        key={suggestion.action}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSuggestion(suggestion.action)}
                        className="w-full p-3 rounded-lg bg-muted/50 hover:bg-muted text-left flex items-start gap-3 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
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

              {/* Thinking Animation */}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted/50"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="w-5 h-5 text-primary" />
                  </motion.div>
                  <span className="text-sm">L'IA réfléchit...</span>
                </motion.div>
              )}

              {/* Response */}
              {response && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20"
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{response}</p>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Posez une question..."
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={isThinking}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
