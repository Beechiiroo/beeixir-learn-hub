import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface VoiceCommandsPanelProps {
  isListening: boolean;
  onListeningChange: (listening: boolean) => void;
}

const VoiceCommandsPanel = ({ isListening, onListeningChange }: VoiceCommandsPanelProps) => {
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) { setIsSupported(false); return; }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'fr-FR';

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const result = event.results[current][0].transcript.toLowerCase();
      setTranscript(result);
      if (event.results[current].isFinal) processCommand(result);
    };

    recognition.onerror = () => onListeningChange(false);
    recognition.onend = () => onListeningChange(false);
    recognitionRef.current = recognition;
  }, []);

  useEffect(() => {
    if (!isSupported) return;
    if (isListening) {
      try {
        recognitionRef.current?.start();
        setTranscript("");
      } catch (e) {}
    } else {
      recognitionRef.current?.stop();
    }
  }, [isListening, isSupported]);

  const processCommand = (command: string) => {
    const commands: Record<string, () => void> = {
      "accueil": () => { window.scrollTo({ top: 0, behavior: "smooth" }); toast.success("Navigation vers l'accueil"); },
      "cours": () => { document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" }); toast.success("Affichage des cours"); },
      "contact": () => { navigate("/contact"); toast.success("Page contact"); },
      "tableau de bord": () => { navigate("/dashboard"); toast.success("Tableau de bord"); },
      "mode sombre": () => { document.documentElement.classList.add("dark"); toast.success("Mode sombre activé"); },
      "mode clair": () => { document.documentElement.classList.remove("dark"); toast.success("Mode clair activé"); },
      "haut de page": () => { window.scrollTo({ top: 0, behavior: "smooth" }); toast.success("Retour en haut"); },
    };

    for (const [key, action] of Object.entries(commands)) {
      if (command.includes(key)) { action(); return; }
    }
    toast.info(`Commande non reconnue: "${command}"`);
  };

  if (!isSupported || !isListening) return null;

  return (
    <AnimatePresence>
      {transcript && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-28 left-4 z-50"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/10">
            <div className="absolute inset-0 bg-card/90 backdrop-blur-2xl" />
            <div className="relative p-4 min-w-48 max-w-64">
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center"
                >
                  <Volume2 className="w-3 h-3 text-white" />
                </motion.div>
                <span className="text-xs font-medium text-muted-foreground">Écoute...</span>
              </div>
              <p className="text-sm">{transcript}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceCommandsPanel;
