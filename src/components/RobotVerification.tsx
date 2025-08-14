import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

interface RobotVerificationProps {
  onVerified: () => void;
}

const RobotVerification = ({ onVerified }: RobotVerificationProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [captcha, setCaptcha] = useState({ question: "", answer: 0 });
  const [userAnswer, setUserAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showError, setShowError] = useState(false);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let answer;
    switch(operator) {
      case '+': answer = num1 + num2; break;
      case '-': answer = num1 - num2; break;
      case '*': answer = num1 * num2; break;
      default: answer = num1 + num2;
    }
    
    setCaptcha({
      question: `${num1} ${operator} ${num2} = ?`,
      answer
    });
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerification = async () => {
    setIsVerifying(true);
    setShowError(false);
    
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (parseInt(userAnswer) === captcha.answer) {
      setIsVerified(true);
      setTimeout(() => {
        onVerified();
      }, 1000);
    } else {
      setAttempts(prev => prev + 1);
      setShowError(true);
      generateCaptcha();
      setUserAnswer("");
      
      if (attempts >= 2) {
        // Force verification after 3 attempts
        setIsVerified(true);
        setTimeout(() => {
          onVerified();
        }, 1000);
      }
    }
    
    setIsVerifying(false);
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <motion.div
              animate={{ 
                rotate: isVerifying ? 360 : 0,
                scale: isVerified ? 1.2 : 1 
              }}
              transition={{ 
                rotate: { duration: 1, repeat: isVerifying ? Infinity : 0 },
                scale: { duration: 0.3 }
              }}
              className="mx-auto w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center"
            >
              {isVerified ? (
                <CheckCircle className="w-10 h-10 text-white" />
              ) : (
                <Shield className="w-10 h-10 text-white" />
              )}
            </motion.div>
            
            <div>
              <CardTitle className="text-2xl font-bold">
                {isVerified ? "Vérification réussie !" : "Vérification de sécurité"}
              </CardTitle>
              <CardDescription>
                {isVerified 
                  ? "Bienvenue sur Beechir Chaieb" 
                  : "Prouvez que vous n'êtes pas un robot"
                }
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <AnimatePresence mode="wait">
              {!isVerified ? (
                <motion.div
                  key="verification"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {/* Math Captcha */}
                  <div className="bg-muted/50 rounded-lg p-4 border-2 border-dashed border-muted-foreground/30">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Résolvez cette équation :</p>
                      <div className="text-2xl font-bold text-foreground mb-4">
                        {captcha.question}
                      </div>
                      <div className="flex items-center gap-2 justify-center">
                        <input
                          type="number"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          className="w-20 h-10 text-center bg-background border border-border rounded-md text-foreground font-bold text-lg"
                          placeholder="?"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={generateCaptcha}
                          className="h-10 w-10"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {showError && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-lg"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">
                          Réponse incorrecte. {attempts < 2 ? "Essayez encore." : "Dernière tentative !"}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Verify Button */}
                  <Button
                    onClick={handleVerification}
                    disabled={isVerifying || !userAnswer}
                    className="w-full relative overflow-hidden"
                  >
                    {isVerifying ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      "Vérifier"
                    )}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5, repeat: 2 }}
                    className="text-6xl mb-4"
                  >
                    🎉
                  </motion.div>
                  <p className="text-lg font-medium text-foreground">
                    Accès autorisé !
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Redirection en cours...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RobotVerification;