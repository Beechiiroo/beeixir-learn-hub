import { Code, Brain, Mail, Phone, MapPin, Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                  <Brain className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Beechir Dev</h3>
                <p className="text-sm text-muted">Tech & AI Learning</p>
              </div>
            </div>
            <p className="text-muted mb-6 leading-relaxed">
              Votre plateforme de référence pour maîtriser les technologies modernes et l'intelligence artificielle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center transition-base">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center transition-base">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center transition-base">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center transition-base">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Formations */}
          <div>
            <h4 className="font-semibold mb-6">Formations</h4>
            <ul className="space-y-3 text-muted">
              <li><a href="#" className="hover:text-background transition-base">Frameworks Web</a></li>
              <li><a href="#" className="hover:text-background transition-base">React & Next.js</a></li>
              <li><a href="#" className="hover:text-background transition-base">Angular</a></li>
              <li><a href="#" className="hover:text-background transition-base">Django & Laravel</a></li>
              <li><a href="#" className="hover:text-background transition-base">Intelligence Artificielle</a></li>
              <li><a href="#" className="hover:text-background transition-base">Machine Learning</a></li>
              <li><a href="#" className="hover:text-background transition-base">Deep Learning</a></li>
            </ul>
          </div>

          {/* Langages */}
          <div>
            <h4 className="font-semibold mb-6">Langages</h4>
            <ul className="space-y-3 text-muted">
              <li><a href="#" className="hover:text-background transition-base">Python</a></li>
              <li><a href="#" className="hover:text-background transition-base">JavaScript</a></li>
              <li><a href="#" className="hover:text-background transition-base">TypeScript</a></li>
              <li><a href="#" className="hover:text-background transition-base">Java</a></li>
              <li><a href="#" className="hover:text-background transition-base">C#</a></li>
              <li><a href="#" className="hover:text-background transition-base">Go</a></li>
              <li><a href="#" className="hover:text-background transition-base">Rust</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-6">Contact</h4>
            <div className="space-y-4 text-muted">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-background">contact@beechirdev.com</p>
                  <p className="text-sm">Réponse sous 24h</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-background">+33 1 23 45 67 89</p>
                  <p className="text-sm">Lun-Ven 9h-18h</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-background">Paris, France</p>
                  <p className="text-sm">Formation en ligne</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="max-w-md">
            <h4 className="font-semibold mb-4">Restez informé</h4>
            <p className="text-muted mb-4">Recevez les dernières nouveautés et conseils tech directement dans votre boîte mail.</p>
            <div className="flex gap-3">
              <input 
                type="email" 
                placeholder="votre@email.com" 
                className="flex-1 px-4 py-2 bg-background/10 border border-background/20 rounded-lg text-background placeholder:text-muted focus:outline-none focus:border-primary"
              />
              <Button variant="default" size="sm" className="bg-primary hover:bg-primary-hover">
                S'abonner
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-muted text-sm">
          <p>© 2024 Beechir Dev. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-background transition-base">Mentions légales</a>
            <a href="#" className="hover:text-background transition-base">Confidentialité</a>
            <a href="#" className="hover:text-background transition-base">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;