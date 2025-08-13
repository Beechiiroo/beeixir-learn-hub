import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Code, Brain, BookOpen, User, MessageCircle } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                <Brain className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Beechir Dev</h1>
              <p className="text-xs text-muted-foreground">Tech & AI Learning</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#accueil" className="text-foreground hover:text-primary transition-base font-medium">
              Accueil
            </a>
            <a href="#cours" className="text-foreground hover:text-primary transition-base font-medium">
              Cours & Formations
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-base font-medium">
              À propos
            </a>
            <a href="#blog" className="text-foreground hover:text-primary transition-base font-medium">
              Blog
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-base font-medium">
              Contact
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4 mr-2" />
              Connexion
            </Button>
            <Button variant="hero" size="sm">
              <BookOpen className="w-4 h-4 mr-2" />
              Commencer
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-base"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-6 pb-6 border-t border-border pt-6 space-y-4">
            <a href="#accueil" className="block text-foreground hover:text-primary transition-base font-medium">
              Accueil
            </a>
            <a href="#cours" className="block text-foreground hover:text-primary transition-base font-medium">
              Cours & Formations
            </a>
            <a href="#about" className="block text-foreground hover:text-primary transition-base font-medium">
              À propos
            </a>
            <a href="#blog" className="block text-foreground hover:text-primary transition-base font-medium">
              Blog
            </a>
            <a href="#contact" className="block text-foreground hover:text-primary transition-base font-medium">
              Contact
            </a>
            <div className="flex flex-col space-y-3 pt-4">
              <Button variant="ghost" size="sm" className="justify-start">
                <User className="w-4 h-4 mr-2" />
                Connexion
              </Button>
              <Button variant="hero" size="sm" className="justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Commencer
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;