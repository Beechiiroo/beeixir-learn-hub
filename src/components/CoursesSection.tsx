import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Users, Star, Play, ArrowRight, BookOpen, Filter, Search, Brain } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { allCourses, categories, levels, frameworks } from "@/data/courses";
import reactCourse from "@/assets/react-course.jpg";
import aiCourse from "@/assets/ai-course.jpg";
import pythonCourse from "@/assets/python-course.jpg";
import vueCourse from "@/assets/vue-course.jpg";
import angularCourse from "@/assets/angular-course.jpg";
import nodejsCourse from "@/assets/nodejs-course.jpg";
import laravelCourse from "@/assets/laravel-course.jpg";

// Image mapping
const imageMap: { [key: string]: string } = {
  "/src/assets/react-course.jpg": reactCourse,
  "/src/assets/ai-course.jpg": aiCourse,
  "/src/assets/python-course.jpg": pythonCourse,
  "/src/assets/vue-course.jpg": vueCourse,
  "/src/assets/angular-course.jpg": angularCourse,
  "/src/assets/nodejs-course.jpg": nodejsCourse,
  "/src/assets/laravel-course.jpg": laravelCourse,
};

const CoursesSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedLevel, setSelectedLevel] = useState("Tous");
  const [selectedFramework, setSelectedFramework] = useState("Tous");
  const [showAllCourses, setShowAllCourses] = useState(false);

  // Filter courses based on search and filters
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.framework.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "Tous" || course.level === selectedLevel;
    const matchesFramework = selectedFramework === "Tous" || course.framework === selectedFramework;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesFramework;
  });

  // Show only first 6 courses unless "show all" is clicked
  const displayedCourses = showAllCourses ? filteredCourses : filteredCourses.slice(0, 6);

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

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-glow border border-primary/20 relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, hsl(var(--primary)/0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 100%, hsl(var(--primary)/0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 100%, hsl(var(--primary)/0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 0%, hsl(var(--primary)/0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 0%, hsl(var(--primary)/0.1) 0%, transparent 50%)",
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute inset-0"
              />
            </div>

            <div className="relative z-10">
              {/* Filter Header */}
              <div className="flex items-center justify-center mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres intelligents
                </motion.div>
              </div>

              {/* Enhanced Search Bar */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-primary z-10" />
                <Input
                  placeholder="🔍 Rechercher un cours, framework ou technologie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-14 h-16 text-lg bg-background/50 backdrop-blur-sm border-2 border-primary/30 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-primary font-medium"
                >
                  ⚡ Recherche instantanée
                </motion.div>
              </div>

              {/* Enhanced Filters */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: "🎯 Catégorie", value: selectedCategory, onChange: setSelectedCategory, options: categories },
                  { label: "📊 Niveau", value: selectedLevel, onChange: setSelectedLevel, options: levels },
                  { label: "⚡ Framework", value: selectedFramework, onChange: setSelectedFramework, options: frameworks }
                ].map((filter, index) => (
                  <motion.div
                    key={filter.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="space-y-3"
                  >
                    <label className="text-sm font-semibold text-foreground flex items-center">
                      {filter.label}
                    </label>
                    <Select value={filter.value} onValueChange={filter.onChange}>
                      <SelectTrigger className="h-12 bg-background/50 border-2 border-muted-foreground/30 hover:border-primary/50 focus:border-primary transition-all duration-300 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-primary/20 bg-card/95 backdrop-blur-sm">
                        {filter.options.map(option => (
                          <SelectItem 
                            key={option} 
                            value={option}
                            className="hover:bg-primary/10 focus:bg-primary/10 rounded-lg"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Results Count */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-center"
              >
                <div className="inline-flex items-center bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-success rounded-full mr-2"
                  />
                  {filteredCourses.length} cours trouvé{filteredCourses.length > 1 ? 's' : ''} 
                  {searchTerm && ` pour "${searchTerm}"`}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedCourses.map((course, index) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-smooth hover:-translate-y-2"
            >
              {/* Course Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={imageMap[course.image] || course.image} 
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
                  <div className="flex items-center gap-2">
                    <Link to={`/quiz?course=${encodeURIComponent(course.framework)}`}>
                      <Button variant="outline" size="sm" className="group/btn">
                        <Brain className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="default" size="sm" className="group/btn">
                      S'inscrire
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-base" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sale Badge */}
              <div className="absolute -top-2 -right-2 bg-warning text-warning-foreground px-3 py-1 rounded-full text-xs font-bold transform rotate-12">
                -33%
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Courses CTA */}
        {!showAllCourses && filteredCourses.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-background"
              onClick={() => setShowAllCourses(true)}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Voir tous les cours ({filteredCourses.length - 6} de plus)
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}

        {showAllCourses && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-background"
              onClick={() => setShowAllCourses(false)}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Voir moins de cours
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;