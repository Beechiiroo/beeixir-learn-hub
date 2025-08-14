import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Chatbot = ({ isOpen, onToggle }: ChatbotProps) => {
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

  const predefinedResponses = {
    "cours": "Nous proposons des cours en React, Angular, Vue.js, Python, IA, Machine Learning et bien plus ! Quel domaine vous intéresse ?",
    "prix": "Nos cours sont proposés à partir de 29€ avec des réductions régulières. Consultez notre catalogue pour voir les prix détaillés.",
    "inscription": "Pour vous inscrire, cliquez sur 'S'inscrire' sur le cours qui vous intéresse, ou créez un compte via le bouton 'Commencer'.",
    "contact": "Vous pouvez me contacter via la page Contact ou directement ici. Je suis là pour répondre à toutes vos questions !",
    "certificat": "Oui ! Tous nos cours incluent un certificat de completion reconnu dans l'industrie.",
    "niveau": "Nous avons des cours pour tous niveaux : Débutant, Intermédiaire et Avancé. Filtrez par niveau dans notre catalogue.",
    "durée": "La durée varie selon le cours : de 2h pour les ateliers à 40h+ pour les formations complètes.",
    "support": "Un support personnalisé est inclus dans tous nos cours premium avec un forum dédié et des sessions Q&A.",
    "default": "C'est une excellente question ! Pour plus d'informations détaillées, n'hésitez pas à consulter notre catalogue de cours ou à me poser une question plus spécifique. 🚀"
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

    // Simulate bot typing delay
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <Button
          onClick={onToggle}
          size="lg"
          className="w-14 h-14 rounded-full shadow-glow relative overflow-hidden group"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageCircle className="w-6 h-6" />
                {/* Notification dot */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96"
          >
            <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-lg overflow-hidden">
              <CardHeader className="gradient-primary text-white relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      <Bot className="w-5 h-5" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-lg">Assistant IA</CardTitle>
                      <p className="text-xs text-white/80">Toujours disponible</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 text-white/60" />
                  </motion.div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                    >
                      <div className={`flex items-end space-x-2 max-w-[80%] ${message.isBot ? "" : "flex-row-reverse space-x-reverse"}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.isBot 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-secondary text-secondary-foreground"
                        }`}>
                          {message.isBot ? (
                            <Bot className="w-3 h-3" />
                          ) : (
                            <User className="w-3 h-3" />
                          )}
                        </div>
                        <div className={`px-3 py-2 rounded-2xl ${
                          message.isBot
                            ? "bg-muted text-foreground rounded-bl-sm"
                            : "bg-primary text-primary-foreground rounded-br-sm"
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-end space-x-2">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Bot className="w-3 h-3 text-primary-foreground" />
                        </div>
                        <div className="bg-muted px-3 py-2 rounded-2xl rounded-bl-sm">
                          <div className="flex space-x-1">
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{ y: [0, -5, 0] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }}
                                className="w-2 h-2 bg-muted-foreground rounded-full"
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
                <div className="border-t border-border p-4">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Tapez votre message..."
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      size="icon"
                      className="relative overflow-hidden"
                    >
                      <Send className="w-4 h-4" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;