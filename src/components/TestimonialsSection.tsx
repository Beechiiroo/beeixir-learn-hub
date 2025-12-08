import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Quote, 
  Star, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Award,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Users,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const testimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Développeuse Full-Stack",
    company: "Google France",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    rating: 5,
    text: "Grâce aux formations de Beechir, j'ai pu décrocher mon poste de rêve chez Google. Les cours React et Node.js sont exceptionnels, avec une pédagogie claire et des projets concrets.",
    course: "React & Node.js",
    beforeSalary: "35K€",
    afterSalary: "75K€",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    featured: true
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Data Scientist",
    company: "Amazon",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    rating: 5,
    text: "La formation en Machine Learning m'a ouvert les portes du monde de la Data Science. Les explications sont claires et les projets pratiques m'ont permis de construire un portfolio solide.",
    course: "Machine Learning",
    beforeSalary: "40K€",
    afterSalary: "85K€",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    featured: true
  },
  {
    id: 3,
    name: "Marie Chen",
    role: "Lead Developer",
    company: "Meta",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    rating: 5,
    text: "J'ai commencé de zéro et maintenant je dirige une équipe de 10 développeurs. Les formations sont complètes et le support de la communauté est incroyable.",
    course: "Angular & TypeScript",
    beforeSalary: "0€",
    afterSalary: "90K€",
    videoUrl: null,
    featured: true
  },
  {
    id: 4,
    name: "Alexandre Petit",
    role: "Freelance Developer",
    company: "Indépendant",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    rating: 5,
    text: "Après 15 ans dans la restauration, j'ai réussi ma reconversion grâce à Beechir. Aujourd'hui je facture 500€/jour en tant que freelance.",
    course: "Python & Django",
    beforeSalary: "22K€",
    afterSalary: "120K€",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    featured: false
  },
  {
    id: 5,
    name: "Léa Bernard",
    role: "AI Engineer",
    company: "OpenAI",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    rating: 5,
    text: "La formation Deep Learning est la plus complète que j'ai suivie. J'ai pu intégrer OpenAI grâce aux compétences acquises.",
    course: "Deep Learning",
    beforeSalary: "45K€",
    afterSalary: "150K€",
    videoUrl: null,
    featured: false
  },
  {
    id: 6,
    name: "Pierre Moreau",
    role: "CTO",
    company: "Startup Tech",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    rating: 5,
    text: "J'ai lancé ma startup après avoir suivi les formations. Les cours sur l'architecture et les bonnes pratiques m'ont été essentiels.",
    course: "Full-Stack Mastery",
    beforeSalary: "50K€",
    afterSalary: "200K€+",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    featured: false
  }
];

const successStats = [
  { icon: Users, value: "15,000+", label: "Étudiants formés" },
  { icon: Award, value: "98%", label: "Taux de satisfaction" },
  { icon: Briefcase, value: "89%", label: "Trouvent un emploi" },
  { icon: TrendingUp, value: "+65%", label: "Augmentation salaire" }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const featuredTestimonials = testimonials.filter(t => t.featured);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, featuredTestimonials.length]);

  const nextSlide = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % featuredTestimonials.length);
  };

  const prevSlide = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Success Stories</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ils ont <span className="gradient-primary bg-clip-text text-transparent">transformé</span> leur carrière
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez les parcours inspirants de nos étudiants qui ont changé de vie grâce à nos formations
          </p>
        </motion.div>

        {/* Success Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {successStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Featured Carousel */}
        <div className="relative mb-16">
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-border/50 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Left: Video/Image */}
                      <div className="relative h-64 md:h-[400px] bg-gradient-to-br from-primary/20 to-accent/20">
                        <img
                          src={featuredTestimonials[currentIndex].avatar}
                          alt={featuredTestimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                        
                        {featuredTestimonials[currentIndex].videoUrl && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl shadow-primary/50"
                              >
                                <Play className="w-8 h-8 text-primary-foreground ml-1" />
                              </motion.button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl p-0 bg-black">
                              <div className="aspect-video">
                                <iframe
                                  src={featuredTestimonials[currentIndex].videoUrl}
                                  className="w-full h-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}

                        {/* Salary Evolution Badge */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between bg-background/90 backdrop-blur-sm rounded-xl p-3">
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">Avant</p>
                              <p className="font-bold text-destructive">{featuredTestimonials[currentIndex].beforeSalary}</p>
                            </div>
                            <TrendingUp className="w-6 h-6 text-primary animate-pulse" />
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">Après</p>
                              <p className="font-bold text-primary">{featuredTestimonials[currentIndex].afterSalary}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Content */}
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        <Quote className="w-12 h-12 text-primary/30 mb-6" />
                        
                        <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
                          "{featuredTestimonials[currentIndex].text}"
                        </p>

                        <div className="flex items-center gap-1 mb-6">
                          {[...Array(featuredTestimonials[currentIndex].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          <img
                            src={featuredTestimonials[currentIndex].avatar}
                            alt={featuredTestimonials[currentIndex].name}
                            className="w-14 h-14 rounded-full border-2 border-primary"
                          />
                          <div>
                            <h4 className="font-bold text-foreground">{featuredTestimonials[currentIndex].name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {featuredTestimonials[currentIndex].role} @ {featuredTestimonials[currentIndex].company}
                            </p>
                          </div>
                          <Badge className="ml-auto bg-primary/10 text-primary border-primary/20">
                            <GraduationCap className="w-3 h-3 mr-1" />
                            {featuredTestimonials[currentIndex].course}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {featuredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoPlay(false);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Success Stories Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Plus de Success Stories
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full border-2 border-primary/50 group-hover:border-primary transition-colors"
                      />
                      <div>
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                      {testimonial.videoUrl && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-auto">
                              <Play className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl p-0 bg-black">
                            <div className="aspect-video">
                              <iframe
                                src={testimonial.videoUrl}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <Badge variant="secondary" className="text-xs">
                        {testimonial.course}
                      </Badge>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-destructive line-through">{testimonial.beforeSalary}</span>
                        <TrendingUp className="w-3 h-3 text-primary" />
                        <span className="text-primary font-bold">{testimonial.afterSalary}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20 p-8">
            <h3 className="text-2xl font-bold mb-4">Prêt à écrire votre propre success story ?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Rejoignez plus de 15,000 étudiants qui ont transformé leur carrière grâce à nos formations
            </p>
            <Button size="lg" className="rounded-full px-8">
              Commencer maintenant
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
