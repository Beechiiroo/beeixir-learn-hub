import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Star, Users, BookOpen, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

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
      <div className="absolute top-20 right-20 w-32 h-32 gradient-primary rounded-full opacity-20 blur-xl animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 gradient-neural rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center bg-primary-light text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <Zap className="w-4 h-4 mr-2" />
            Nouvelle plateforme de formation Tech & IA
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in">
            Maîtrisez la <span className="gradient-primary bg-clip-text text-transparent">Tech</span> et l'
            <span className="gradient-neural bg-clip-text text-transparent">IA</span>
            <br />
            avec Beechir Chaieb
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed animate-fade-in">
            Formations de pointe en React, Angular, Django, Machine Learning et plus encore. 
            Transformez votre passion en expertise avec nos cours pratiques et projets concrets.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-10 animate-fade-in">
            <div className="flex items-center text-muted-foreground">
              <Star className="w-5 h-5 text-warning mr-2" />
              <span className="font-semibold text-foreground">4.9/5</span>
              <span className="ml-1">étoiles</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users className="w-5 h-5 text-primary mr-2" />
              <span className="font-semibold text-foreground">5,000+</span>
              <span className="ml-1">étudiants</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <BookOpen className="w-5 h-5 text-secondary mr-2" />
              <span className="font-semibold text-foreground">50+</span>
              <span className="ml-1">cours</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              <Play className="w-5 h-5 mr-2" />
              Commencer l'apprentissage
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-background/80 hover:bg-background">
              <BookOpen className="w-5 h-5 mr-2" />
              Explorer les cours
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-border/50 animate-fade-in">
            <p className="text-sm text-muted-foreground mb-4">Approuvé par des développeurs de :</p>
            <div className="flex flex-wrap gap-8 items-center opacity-60">
              <div className="text-lg font-semibold text-foreground">Google</div>
              <div className="text-lg font-semibold text-foreground">Microsoft</div>
              <div className="text-lg font-semibold text-foreground">OpenAI</div>
              <div className="text-lg font-semibold text-foreground">Meta</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;