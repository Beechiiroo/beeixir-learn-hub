import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'fr-FR';

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const result = event.results[current][0].transcript.toLowerCase();
      setTranscript(result);

      if (event.results[current].isFinal) {
        processCommand(result);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const processCommand = (command: string) => {
    const commands: Record<string, () => void> = {
      "accueil": () => { window.scrollTo({ top: 0, behavior: "smooth" }); toast.success("Navigation vers l'accueil"); },
      "cours": () => { document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" }); toast.success("Affichage des cours"); },
      "contact": () => { navigate("/contact"); toast.success("Page contact"); },
      "tableau de bord": () => { navigate("/dashboard"); toast.success("Tableau de bord"); },
      "connexion": () => { navigate("/login"); toast.success("Page de connexion"); },
      "inscription": () => { navigate("/register"); toast.success("Page d'inscription"); },
      "mode sombre": () => { document.documentElement.classList.add("dark"); toast.success("Mode sombre activé"); },
      "mode clair": () => { document.documentElement.classList.remove("dark"); toast.success("Mode clair activé"); },
      "haut de page": () => { window.scrollTo({ top: 0, behavior: "smooth" }); toast.success("Retour en haut"); },
      "bas de page": () => { window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); toast.success("Bas de page"); },
    };

    for (const [key, action] of Object.entries(commands)) {
      if (command.includes(key)) {
        action();
        return;
      }
    }
    
    toast.info(`Commande non reconnue: "${command}"`);
  };

  const toggleListening = () => {
    if (!isSupported) {
      toast.error("Reconnaissance vocale non supportée");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
      setTranscript("");
    }
  };

  if (!isSupported) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <Button
          onClick={toggleListening}
          size="lg"
          className={`w-12 h-12 rounded-full shadow-lg relative overflow-hidden ${
            isListening ? "bg-red-500 hover:bg-red-600" : ""
          }`}
          variant={isListening ? "destructive" : "secondary"}
        >
          {isListening ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <MicOff className="w-5 h-5" />
            </motion.div>
          ) : (
            <Mic className="w-5 h-5" />
          )}
          
          {isListening && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white"
                animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white"
                animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}
        </Button>
      </motion.div>

      {/* Transcript Display */}
      <AnimatePresence>
        {isListening && transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-16 left-0 bg-card/95 backdrop-blur-lg rounded-lg p-3 shadow-xl border border-border min-w-48 max-w-64"
          >
            <div className="flex items-center gap-2 mb-1">
              <Volume2 className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Écoute...</span>
            </div>
            <p className="text-sm">{transcript}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceCommands;
