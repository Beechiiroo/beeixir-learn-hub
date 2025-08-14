import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle, 
  Clock, 
  ArrowLeft,
  Github,
  Linkedin,
  Twitter,
  Youtube
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      description: "Contactez-nous directement",
      value: "contact@beechirdev.com",
      action: "mailto:contact@beechirdev.com"
    },
    {
      icon: Phone,
      title: "Téléphone",
      description: "Appelez-nous",
      value: "+33 1 23 45 67 89",
      action: "tel:+33123456789"
    },
    {
      icon: MapPin,
      title: "Adresse",
      description: "Notre bureau",
      value: "Paris, France",
      action: ""
    },
    {
      icon: Clock,
      title: "Horaires",
      description: "Lun - Ven",
      value: "9h00 - 18h00",
      action: ""
    }
  ];

  const socialLinks = [
    { icon: Github, name: "GitHub", url: "https://github.com/beechirdev" },
    { icon: Linkedin, name: "LinkedIn", url: "https://linkedin.com/in/beechirdev" },
    { icon: Twitter, name: "Twitter", url: "https://twitter.com/beechirdev" },
    { icon: Youtube, name: "YouTube", url: "https://youtube.com/beechirdev" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header setQrScannerOpen={() => {}} />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center bg-primary-light text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contactez-nous
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Parlons de votre
                <br />
                <span className="gradient-primary bg-clip-text text-transparent">projet</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Une question ? Un projet ? Nous sommes là pour vous accompagner dans votre parcours d'apprentissage.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
                    <CardDescription>
                      Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="firstName">Prénom</Label>
                          <Input id="firstName" placeholder="John" required />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="lastName">Nom</Label>
                          <Input id="lastName" placeholder="Doe" required />
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" required />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="subject">Sujet</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisissez un sujet" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="course">Question sur un cours</SelectItem>
                            <SelectItem value="technical">Support technique</SelectItem>
                            <SelectItem value="partnership">Partenariat</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Décrivez votre demande..."
                          className="min-h-[120px]"
                          required
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <Button type="submit" className="w-full relative overflow-hidden" disabled={isLoading}>
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Envoyer le message
                            </>
                          )}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Informations de contact</h3>
                  <p className="text-muted-foreground mb-8">
                    Nous sommes disponibles pour répondre à toutes vos questions et vous accompagner dans votre apprentissage.
                  </p>
                </div>

                <div className="grid gap-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="group"
                      >
                        <Card className="p-6 hover:shadow-hover transition-smooth cursor-pointer">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
                              {info.action ? (
                                <a
                                  href={info.action}
                                  className="text-primary hover:underline font-medium"
                                >
                                  {info.value}
                                </a>
                              ) : (
                                <p className="text-foreground font-medium">{info.value}</p>
                              )}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <h4 className="font-semibold text-foreground mb-4">Suivez-nous</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"
                        >
                          <Icon className="w-5 h-5" />
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Questions fréquentes
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Trouvez rapidement les réponses aux questions les plus courantes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "Comment puis-je m'inscrire à un cours ?",
                  answer: "Il suffit de créer un compte, choisir votre cours et procéder au paiement sécurisé."
                },
                {
                  question: "Les cours sont-ils disponibles à vie ?",
                  answer: "Oui, une fois acheté, vous avez un accès illimité au cours et aux mises à jour."
                },
                {
                  question: "Proposez-vous des certificats ?",
                  answer: "Oui, nous délivrons des certificats de completion pour tous nos cours."
                },
                {
                  question: "Y a-t-il une garantie de remboursement ?",
                  answer: "Nous offrons une garantie satisfait ou remboursé de 30 jours."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card className="p-6">
                    <h4 className="font-semibold text-foreground mb-3">{faq.question}</h4>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;