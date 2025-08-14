import { Button } from "@/components/ui/button";
import { Award, Users, BookOpen, Target, ArrowRight, Code, Brain, Zap } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center bg-secondary-light text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4 mr-2" />
              À propos de Beechir Chaieb
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Votre mentor <span className="gradient-neural bg-clip-text text-transparent">Tech & IA</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Salut ! Je suis Bechir, développeur passionné depuis plus de 8 ans avec une expertise approfondie 
              en développement web moderne et intelligence artificielle. Ma mission ? Vous accompagner dans votre 
              transformation digitale avec des formations pratiques et accessibles.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Expertise Technique</h3>
                  <p className="text-muted-foreground">React, Angular, Django, Laravel, Python, Java, JavaScript, C#</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 gradient-neural rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Intelligence Artificielle</h3>
                  <p className="text-muted-foreground">Machine Learning, Deep Learning, NLP, Computer Vision, Chatbots</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Approche Pratique</h3>
                  <p className="text-muted-foreground">Projets concrets, exercices pratiques, accompagnement personnalisé</p>
                </div>
              </div>
            </div>

            <Button variant="hero" size="lg">
              <Users className="w-5 h-5 mr-2" />
              Rejoindre la communauté
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Right Stats */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Stat Cards */}
              <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-smooth text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">5,000+</div>
                <div className="text-muted-foreground">Étudiants formés</div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-smooth text-center mt-8">
                <div className="w-16 h-16 gradient-neural rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">50+</div>
                <div className="text-muted-foreground">Cours disponibles</div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-smooth text-center -mt-4">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">98%</div>
                <div className="text-muted-foreground">Taux de réussite</div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-smooth text-center mt-4">
                <div className="w-16 h-16 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">8</div>
                <div className="text-muted-foreground">Années d'expérience</div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 gradient-primary rounded-full opacity-20 blur-xl animate-pulse"></div>
            <div className="absolute -bottom-8 -left-4 w-16 h-16 gradient-neural rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto gradient-card rounded-2xl p-8 md:p-12 shadow-card">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Ma mission : démocratiser l'apprentissage de la technologie
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Je crois fermement que chacun peut apprendre à coder et maîtriser l'IA, peu importe son niveau de départ. 
              Mes formations sont conçues pour être accessibles, pratiques et orientées résultats. 
              Ensemble, nous construisons l'avenir numérique.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;