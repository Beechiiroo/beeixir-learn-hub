import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles, X } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotPanel = ({ isOpen, onClose }: ChatbotPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Bonjour ! Je suis l'assistant virtuel de Beechir Chaieb. Comment puis-je vous aider aujourd'hui ? 😊",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const predefinedResponses: Record<string, string> = {
    "cours": "Nous proposons des cours en React, Angular, Vue.js, Python, IA, Machine Learning et bien plus ! Quel domaine vous intéresse ?",
    "prix": "Nos cours sont proposés à partir de 29€ avec des réductions régulières.",
    "inscription": "Pour vous inscrire, cliquez sur 'S'inscrire' sur le cours qui vous intéresse.",
    "contact": "Vous pouvez me contacter via la page Contact ou directement ici.",
    "certificat": "Oui ! Tous nos cours incluent un certificat de completion.",
    "default": "C'est une excellente question ! Pour plus d'informations, consultez notre catalogue. 🚀"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (key !== "default" && message.includes(key)) {
        return response;
      }
    }
    return predefinedResponses.default;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-28 right-4 z-50 w-80 sm:w-96"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10">
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-card/80 backdrop-blur-2xl" />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-purple-500/5" />
            
            {/* Content */}
            <div className="relative">
              {/* Header */}
              <div className="relative overflow-hidden p-4 border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg"
                    >
                      <Bot className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold">Assistant IA</h3>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-muted-foreground">En ligne</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                      <Sparkles className="w-4 h-4 text-violet-400" />
                    </motion.div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-72 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div className={`flex items-end space-x-2 max-w-[85%] ${message.isBot ? "" : "flex-row-reverse space-x-reverse"}`}>
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        message.isBot 
                          ? "bg-gradient-to-br from-violet-500 to-purple-600" 
                          : "bg-gradient-to-br from-primary to-secondary"
                      }`}>
                        {message.isBot ? <Bot className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div className={`px-4 py-2.5 rounded-2xl ${
                        message.isBot
                          ? "bg-muted/80 rounded-bl-md"
                          : "bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-br-md"
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className="text-[10px] opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                    <div className="flex items-end space-x-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="bg-muted/80 px-4 py-3 rounded-2xl rounded-bl-md">
                        <div className="flex space-x-1.5">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -6, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                              className="w-2 h-2 bg-violet-400 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Tapez votre message..."
                    className="flex-1 bg-muted/50 border-white/10 rounded-xl"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    size="icon"
                    className="rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatbotPanel;
