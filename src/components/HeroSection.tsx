import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Star, Users, BookOpen, Zap, Sparkles, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { motion } from "framer-motion";
import bcLogo from "@/assets/bc-logo.png";

const HeroSection = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Beechir Chaieb - Formation Tech et IA" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
      </div>

      {/* Floating elements for visual appeal */}
      <motion.div 
        className="absolute top-20 right-20 w-32 h-32 gradient-primary rounded-full opacity-20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-40 left-20 w-24 h-24 gradient-neural rounded-full opacity-20 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/4 w-20 h-20 gradient-success rounded-full opacity-15 blur-xl"
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Animated BC Logo Watermark */}
      <motion.img
        src={bcLogo}
        alt=""
        className="absolute top-1/4 left-1/2 w-64 h-64 opacity-5"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center bg-primary-light text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
            </motion.div>
            Nouvelle plateforme de formation Tech & IA
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Maîtrisez la <span className="gradient-primary bg-clip-text text-transparent">Tech</span> et l'
            <span className="gradient-neural bg-clip-text text-transparent">IA</span>
            <br />
            avec <motion.span 
              className="gradient-cosmic bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Beechir Chaieb
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Formations de pointe en React, Angular, Django, Machine Learning et plus encore. 
            Transformez votre passion en expertise avec nos cours pratiques et projets concrets.
          </motion.p>

          {/* Stats */}
          <motion.div 
            className="flex flex-wrap gap-6 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div 
              className="flex items-center text-muted-foreground bg-warning/10 px-4 py-2 rounded-full border border-warning/20"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Star className="w-5 h-5 text-warning mr-2" />
              <span className="font-semibold text-foreground">4.9/5</span>
              <span className="ml-1">étoiles</span>
            </motion.div>
            <motion.div 
              className="flex items-center text-muted-foreground bg-primary/10 px-4 py-2 rounded-full border border-primary/20"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Users className="w-5 h-5 text-primary mr-2" />
              <span className="font-semibold text-foreground">5,000+</span>
              <span className="ml-1">étudiants</span>
            </motion.div>
            <motion.div 
              className="flex items-center text-muted-foreground bg-secondary/10 px-4 py-2 rounded-full border border-secondary/20"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <BookOpen className="w-5 h-5 text-secondary mr-2" />
              <span className="font-semibold text-foreground">50+</span>
              <span className="ml-1">cours</span>
            </motion.div>
            <motion.div 
              className="flex items-center text-muted-foreground bg-success/10 px-4 py-2 rounded-full border border-success/20"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <TrendingUp className="w-5 h-5 text-success mr-2" />
              <span className="font-semibold text-foreground">98%</span>
              <span className="ml-1">satisfaction</span>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="hero" size="lg" className="text-lg px-8 py-4 shadow-hover">
                <Play className="w-5 h-5 mr-2" />
                Commencer l'apprentissage
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-background/80 hover:bg-background border-2">
                <BookOpen className="w-5 h-5 mr-2" />
                Explorer les cours
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="mt-12 pt-8 border-t border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-sm text-muted-foreground mb-4">Approuvé par des développeurs de :</p>
            <div className="flex flex-wrap gap-8 items-center">
              {["Google", "Microsoft", "OpenAI", "Meta", "Amazon"].map((company, index) => (
                <motion.div
                  key={company}
                  className="text-lg font-semibold text-foreground opacity-60"
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;