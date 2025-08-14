import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Code, Brain, BookOpen, User, MessageCircle, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";

interface HeaderProps {
  setQrScannerOpen?: (open: boolean) => void;
}

const Header = ({ setQrScannerOpen }: HeaderProps) => {
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
              <h1 className="text-xl font-bold text-foreground">Beechir Chaieb</h1>
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
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <LanguageSelector />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQrScannerOpen?.(true)}
            >
              <QrCode className="w-4 h-4 mr-2" />
              Scanner QR
            </Button>
            <Link to="/login">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Connexion
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="hero" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Commencer
              </Button>
            </Link>
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
            <Link to="/contact" className="block text-foreground hover:text-primary transition-base font-medium">
              Contact
            </Link>
            <div className="flex flex-col space-y-3 pt-4">
              <div className="flex items-center justify-between mb-2">
                <ThemeToggle />
                <LanguageSelector />
              </div>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="justify-start w-full">
                  <User className="w-4 h-4 mr-2" />
                  Connexion
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="hero" size="sm" className="justify-start w-full">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Commencer
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;