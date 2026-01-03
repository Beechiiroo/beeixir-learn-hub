import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Award, Rocket, Star, Code, Users, Trophy } from "lucide-react";
import GlassmorphismCard from "./GlassmorphismCard";

const timelineEvents = [
  {
    year: "2015",
    title: "Début du Parcours",
    description: "Premiers pas dans le développement web et passion pour le code",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
  },
  {
    year: "2017",
    title: "Formation Professionnelle",
    description: "Diplôme en informatique et premières expériences en entreprise",
    icon: GraduationCap,
    color: "from-purple-500 to-pink-500",
  },
  {
    year: "2019",
    title: "Expert Reconnu",
    description: "Certifications multiples et spécialisation en technologies modernes",
    icon: Award,
    color: "from-yellow-500 to-orange-500",
  },
  {
    year: "2020",
    title: "Lancement BC Coach",
    description: "Création de la plateforme de formation pour partager mes connaissances",
    icon: Rocket,
    color: "from-green-500 to-emerald-500",
  },
  {
    year: "2022",
    title: "1000+ Étudiants",
    description: "Cap symbolique atteint avec une communauté grandissante",
    icon: Users,
    color: "from-indigo-500 to-violet-500",
  },
  {
    year: "2024",
    title: "Excellence Reconnue",
    description: "Top formateur avec 4.9/5 de satisfaction et des milliers de success stories",
    icon: Trophy,
    color: "from-rose-500 to-red-500",
  },
];

const CareerTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Mon Parcours</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Une Passion Devenue Mission</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez le parcours qui m'a mené à devenir formateur et à créer BC Coach
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Animated line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-secondary to-primary"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline events */}
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              className={`flex items-center gap-8 mb-12 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
            >
              {/* Content card */}
              <div className="flex-1">
                <GlassmorphismCard className="p-6" hoverEffect>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${event.color} text-white`}>
                      <event.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-primary mb-1">{event.year}</div>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                </GlassmorphismCard>
              </div>

              {/* Center dot */}
              <motion.div
                className="relative z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg`}>
                  <Star className="w-5 h-5 text-white" />
                </div>
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${event.color} opacity-50`}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Empty space for alignment */}
              <div className="flex-1" />
            </motion.div>
          ))}

          {/* End marker */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-bold shadow-lg">
              Et ce n'est que le début... 🚀
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
