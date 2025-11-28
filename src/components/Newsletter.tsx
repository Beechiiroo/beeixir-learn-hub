import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast.success("Merci de vous être abonné! 🎉");
      setTimeout(() => {
        setEmail("");
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-success/5 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 gradient-primary rounded-full opacity-10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 gradient-neural rounded-full opacity-10 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="max-w-4xl mx-auto p-12 gradient-card shadow-hover border-primary/20 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 mx-auto gradient-primary rounded-full flex items-center justify-center shadow-primary">
                <Mail className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Restez <span className="gradient-primary bg-clip-text text-transparent">Informé</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Recevez les dernières nouvelles, cours et ressources directement dans votre boîte mail. 
              Rejoignez notre communauté de 5,000+ apprenants passionnés!
            </p>

            <form onSubmit={handleSubscribe} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="votre.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-14 text-lg bg-background/50 border-primary/20 focus:border-primary"
                  required
                  disabled={isSubscribed}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="h-14 px-8 text-lg"
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Abonné!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        S'abonner
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                🔒 Nous respectons votre vie privée. Désabonnez-vous à tout moment.
              </p>
            </form>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/50">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary mb-2">📚</div>
                <p className="text-sm font-medium">Nouveaux cours chaque semaine</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-secondary mb-2">💡</div>
                <p className="text-sm font-medium">Astuces et tutoriels exclusifs</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-success mb-2">🎁</div>
                <p className="text-sm font-medium">Ressources gratuites premium</p>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
