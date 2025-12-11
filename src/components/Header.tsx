import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, User, QrCode, Brain, Trophy, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import NotificationSystem from "./NotificationSystem";
import bcLogo from "@/assets/bc-logo-official.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  setQrScannerOpen?: (open: boolean) => void;
}

const Header = ({ setQrScannerOpen }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainNavItems = [
    { label: "Accueil", href: "#accueil", type: "anchor" },
    { label: "Cours", href: "#cours", type: "anchor" },
    { label: "Dashboard", href: "/dashboard", type: "link" },
  ];

  const featuresNavItems = [
    { label: "Quiz", href: "/quiz", type: "link", icon: Brain },
    { label: "Classement", href: "/leaderboard", type: "link", icon: Trophy },
  ];

  const moreNavItems = [
    { label: "À propos", href: "#about", type: "anchor" },
    { label: "Blog", href: "#blog", type: "anchor" },
    { label: "Contact", href: "#contact", type: "anchor" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group shrink-0">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={bcLogo}
                alt="Beechir Chaieb Logo"
                className="w-10 h-10 lg:w-11 lg:h-11"
              />
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-lg blur-md -z-10"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-base lg:text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-tight">
                Beechir Chaieb
              </h1>
              <p className="text-[10px] lg:text-xs text-muted-foreground">Tech & AI Learning</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {mainNavItems.map((item) => (
              item.type === "anchor" ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                >
                  {item.label}
                </Link>
              )
            ))}

            {featuresNavItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 flex items-center gap-1.5"
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            ))}

            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 flex items-center gap-1">
                  Plus
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-40">
                {moreNavItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <a href={item.href} className="cursor-pointer">
                      {item.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden xl:flex items-center gap-1">
            <ThemeToggle />
            <LanguageSelector />
            <NotificationSystem />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQrScannerOpen?.(true)}
              className="h-9 w-9"
            >
              <QrCode className="w-4 h-4" />
            </Button>
            
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <User className="w-4 h-4" />
              </Button>
            </Link>
            
            <Link to="/register" className="ml-1">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
              >
                <BookOpen className="w-4 h-4 mr-1.5" />
                Commencer
              </Button>
            </Link>
          </div>

          {/* Tablet Navigation (simplified) */}
          <div className="hidden lg:flex xl:hidden items-center gap-2">
            <nav className="flex items-center gap-1">
              <a href="#accueil" className="px-2.5 py-1.5 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg transition-colors">
                Accueil
              </a>
              <a href="#cours" className="px-2.5 py-1.5 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg transition-colors">
                Cours
              </a>
              <Link to="/dashboard" className="px-2.5 py-1.5 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg transition-colors">
                Dashboard
              </Link>
              <Link to="/quiz" className="px-2.5 py-1.5 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg transition-colors flex items-center gap-1">
                <Brain className="w-3.5 h-3.5" />
                Quiz
              </Link>
            </nav>
            
            <div className="flex items-center gap-1 ml-2 border-l border-border/50 pl-2">
              <ThemeToggle />
              <NotificationSystem />
              <Link to="/register">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <BookOpen className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMenuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 border-t border-border/50 space-y-1">
                {/* Main Navigation */}
                {mainNavItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.type === "anchor" ? (
                      <a
                        href={item.href}
                        className="block px-4 py-2.5 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="block px-4 py-2.5 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}

                {/* Features */}
                {featuresNavItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: (mainNavItems.length + index) * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      className="flex items-center gap-2 px-4 py-2.5 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* More Items */}
                {moreNavItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: (mainNavItems.length + featuresNavItems.length + index) * 0.05 }}
                  >
                    <a
                      href={item.href}
                      className="block px-4 py-2.5 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}

                {/* Actions */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4 mt-2 border-t border-border/50 space-y-3"
                >
                  <div className="flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                      <ThemeToggle />
                      <LanguageSelector />
                      <NotificationSystem />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setQrScannerOpen?.(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      Scanner
                    </Button>
                  </div>
                  
                  <div className="flex gap-2 px-4">
                    <Link to="/profile" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <User className="w-4 h-4 mr-2" />
                        Profil
                      </Button>
                    </Link>
                    <Link to="/register" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Commencer
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;