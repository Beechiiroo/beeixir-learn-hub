import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Star, Clock, Users, Award, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import GlassmorphismCard from "./GlassmorphismCard";
import { allCourses as courses } from "@/data/courses";
import { cn } from "@/lib/utils";

const CourseComparator = () => {
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  const toggleCourse = (courseId: number) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else if (selectedCourses.length < 3) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const selectedCoursesData = courses.filter((c) => selectedCourses.includes(c.id));

  const comparisonFeatures = [
    { key: "duration", label: "Durée", icon: Clock },
    { key: "students", label: "Étudiants", icon: Users },
    { key: "rating", label: "Note", icon: Star },
    { key: "level", label: "Niveau", icon: Award },
    { key: "price", label: "Prix", icon: Sparkles },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4" variant="outline">
            <Sparkles className="w-3 h-3 mr-1" />
            Nouveau
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Comparez les Formations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sélectionnez jusqu'à 3 formations pour les comparer côte à côte
          </p>
        </motion.div>

        {/* Course selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {courses.map((course) => (
            <motion.button
              key={course.id}
              onClick={() => toggleCourse(course.id)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all duration-300",
                selectedCourses.includes(course.id)
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                  : "border-border hover:border-primary/50 bg-card"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-sm font-medium truncate">{course.title.split(" ")[0]}</div>
              {selectedCourses.includes(course.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1"
                >
                  <Check className="w-3 h-3" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Compare button */}
        <div className="flex justify-center mb-12">
          <Button
            onClick={() => setIsComparing(true)}
            disabled={selectedCourses.length < 2}
            variant="hero"
            size="lg"
            className="gap-2"
          >
            Comparer {selectedCourses.length} formation{selectedCourses.length > 1 ? "s" : ""}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Comparison table */}
        <AnimatePresence>
          {isComparing && selectedCoursesData.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
            >
              <GlassmorphismCard className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Comparaison</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsComparing(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-4 border-b border-border">Critère</th>
                        {selectedCoursesData.map((course) => (
                          <th key={course.id} className="text-center p-4 border-b border-border min-w-[200px]">
                            <div className="font-bold">{course.title}</div>
                            <Badge variant="outline" className="mt-1">{course.category}</Badge>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((feature, index) => (
                        <motion.tr
                          key={feature.key}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-border/50"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <feature.icon className="w-4 h-4 text-primary" />
                              {feature.label}
                            </div>
                          </td>
                          {selectedCoursesData.map((course) => (
                            <td key={course.id} className="text-center p-4">
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                              >
                                {feature.key === "rating" ? (
                                  <div className="flex items-center justify-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold">{course.rating}</span>
                                  </div>
                                ) : feature.key === "price" ? (
                                  <span className="text-2xl font-bold text-primary">
                                    {course.price}€
                                  </span>
                                ) : (
                                  <span className="font-medium">
                                    {(course as any)[feature.key]}
                                  </span>
                                )}
                              </motion.div>
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassmorphismCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CourseComparator;
