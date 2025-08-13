import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Play, ArrowRight, BookOpen } from "lucide-react";
import reactCourse from "@/assets/react-course.jpg";
import aiCourse from "@/assets/ai-course.jpg";
import pythonCourse from "@/assets/python-course.jpg";

const courses = [
  {
    id: 1,
    title: "React & Next.js Masterclass",
    category: "Framework",
    level: "Intermédiaire",
    duration: "12h",
    students: "1,234",
    rating: 4.9,
    price: "199€",
    originalPrice: "299€",
    image: reactCourse,
    description: "Maîtrisez React et Next.js avec des projets concrets et les meilleures pratiques.",
    features: ["Hooks avancés", "SSR & SSG", "Optimisation", "Déploiement"]
  },
  {
    id: 2,
    title: "Machine Learning avec Python",
    category: "Intelligence Artificielle",
    level: "Débutant",
    duration: "20h",
    students: "892",
    rating: 4.8,
    price: "249€",
    originalPrice: "349€",
    image: aiCourse,
    description: "Découvrez le Machine Learning de A à Z avec TensorFlow et scikit-learn.",
    features: ["Algorithmes ML", "Deep Learning", "Projets réels", "Déploiement AI"]
  },
  {
    id: 3,
    title: "Python pour Data Science",
    category: "Langage",
    level: "Débutant",
    duration: "15h",
    students: "2,156",
    rating: 4.9,
    price: "179€",
    originalPrice: "249€",
    image: pythonCourse,
    description: "Apprenez Python et les librairies essentielles pour la Data Science.",
    features: ["Pandas & NumPy", "Visualisation", "APIs", "Automatisation"]
  }
];

const CoursesSection = () => {
  return (
    <section id="cours" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary-light text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Play className="w-4 h-4 mr-2" />
            Cours populaires
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Formations qui transforment
            <br />
            votre <span className="gradient-primary bg-clip-text text-transparent">carrière</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choisissez parmi nos cours les plus appréciés et rejoignez des milliers de développeurs qui ont boosté leur carrière.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course) => (
            <div key={course.id} className="group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-smooth hover:-translate-y-2">
              {/* Course Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {course.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-background/90 text-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {course.level}
                  </span>
                </div>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-base">
                  {course.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.features.map((feature, index) => (
                    <span key={index} className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Course Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-warning fill-warning" />
                    {course.rating}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">{course.price}</span>
                    <span className="text-sm text-muted-foreground line-through">{course.originalPrice}</span>
                  </div>
                  <Button variant="default" size="sm" className="group/btn">
                    S'inscrire
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-base" />
                  </Button>
                </div>
              </div>

              {/* Sale Badge */}
              <div className="absolute -top-2 -right-2 bg-warning text-warning-foreground px-3 py-1 rounded-full text-xs font-bold transform rotate-12">
                -33%
              </div>
            </div>
          ))}
        </div>

        {/* View All Courses CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="bg-background">
            <BookOpen className="w-5 h-5 mr-2" />
            Voir tous les cours
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;