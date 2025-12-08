import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Youtube, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import siteQrCode from "@/assets/site-qr-code.png";
import bcLogo from "@/assets/bc-logo-official.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black text-white relative overflow-hidden">
      {/* Dark design background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={bcLogo} 
                alt="Beechir Chaieb Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold text-white">Beechir Chaieb</h3>
                <p className="text-sm text-muted">Tech & AI Learning</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Votre plateforme de référence pour maîtriser les technologies modernes et l'intelligence artificielle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-base transform hover:scale-110 hover:rotate-6">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-lg flex items-center justify-center transition-base transform hover:scale-110 hover:rotate-6">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-success rounded-lg flex items-center justify-center transition-base transform hover:scale-110 hover:rotate-6">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-warning rounded-lg flex items-center justify-center transition-base transform hover:scale-110 hover:rotate-6">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Formations */}
          <div>
            <h4 className="font-semibold mb-6 text-white">Formations</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-base hover:translate-x-1 transform inline-block">Frameworks Web</a></li>
              <li><a href="#" className="hover:text-white transition-base hover:translate-x-1 transform inline-block">React & Next.js</a></li>
              <li><a href="#" className="hover:text-white transition-base hover:translate-x-1 transform inline-block">Angular</a></li>
              <li><a href="#" className="hover:text-white transition-base hover:translate-x-1 transform inline-block">Django & Laravel</a></li>
              <li><a href="#" className="hover:text-white transition-base hover:translate-x-1 transform inline-block">Intelligence Artificielle</a></li>
              <li><a href="#" className="hover:text-white transition-base hover:translate-x-1 transform inline-block">Machine Learning</a></li>
              <li><a href="#" className="hover:text-white transition-base hover:translate-x-1 transform inline-block">Deep Learning</a></li>
            </ul>
          </div>

          {/* Langages */}
          <div>
            <h4 className="font-semibold mb-6 text-white">Langages</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-base hover:translate-x-1 transform inline-block">Python</a></li>
              <li><a href="#" className="hover:text-white transition-base hover:translate-x-1 transform inline-block">JavaScript</a></li>
              <li><a href="#" className="hover:text-white transition-base hover:translate-x-1 transform inline-block">TypeScript</a></li>
              <li><a href="#" className="hover:text-white transition-base hover:translate-x-1 transform inline-block">Java</a></li>
              <li><a href="#" className="hover:text-white transition-base hover:translate-x-1 transform inline-block">C#</a></li>
              <li><a href="#" className="hover:text-white transition-base hover:translate-x-1 transform inline-block">Go</a></li>
              <li><a href="#" className="hover:text-white transition-base hover:translate-x-1 transform inline-block">Rust</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-6 text-white">Contact</h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3 hover:translate-x-1 transform transition-base">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-white">contact@beechirchaieb.com</p>
                  <p className="text-sm">Réponse sous 24h</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 hover:translate-x-1 transform transition-base">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary" />
                <div>
                  <p className="font-medium text-white">+33 1 23 45 67 89</p>
                  <p className="text-sm">Lun-Ven 9h-18h</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 hover:translate-x-1 transform transition-base">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-success" />
                <div>
                  <p className="font-medium text-white">Paris, France</p>
                  <p className="text-sm">Formation en ligne</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter & QR Code */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Restez informé</h4>
              <p className="text-gray-300 mb-4">Recevez les dernières nouveautés et conseils tech directement dans votre boîte mail.</p>
              <div className="flex gap-3">
                <input 
                  type="email" 
                  placeholder="votre@email.com" 
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
                />
                <Button variant="default" size="sm" className="bg-primary hover:bg-primary-hover">
                  S'abonner
                </Button>
              </div>
            </div>
            
            {/* QR Code */}
            <div className="flex flex-col items-center text-center">
              <h4 className="font-semibold mb-4 text-white">Scannez pour visiter</h4>
              <div className="bg-white p-4 rounded-xl shadow-hover">
                <img 
                  src={siteQrCode} 
                  alt="QR Code du site Beechir Chaieb" 
                  className="w-24 h-24"
                />
              </div>
              <p className="text-gray-300 text-sm mt-3">
                <QrCode className="w-4 h-4 inline mr-1" />
                Accès rapide au site
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
          <p>© 2024 Beechir Chaieb. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-base relative group">
              Mentions légales
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="hover:text-white transition-base relative group">
              Confidentialité
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="hover:text-white transition-base relative group">
              CGV
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-success group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;