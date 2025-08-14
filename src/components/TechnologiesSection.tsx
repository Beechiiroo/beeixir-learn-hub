import { motion } from "framer-motion";
import { 
  Code2, 
  Database, 
  Cloud, 
  Smartphone, 
  Cpu, 
  Globe,
  Server,
  Layers,
  Zap,
  Shield
} from "lucide-react";

const TechnologiesSection = () => {
  const technologies = [
    { name: "C#", icon: Code2, color: "text-purple-600", category: "Languages" },
    { name: "Azure", icon: Cloud, color: "text-blue-600", category: "Cloud" },
    { name: "SQL Server", icon: Database, color: "text-red-600", category: "Database" },
    { name: "Angular", icon: Globe, color: "text-red-500", category: "Frontend" },
    { name: "TypeScript", icon: Code2, color: "text-blue-500", category: "Languages" },
    { name: "Docker", icon: Layers, color: "text-blue-400", category: "DevOps" },
    { name: "SignalR", icon: Zap, color: "text-green-600", category: "Real-time" },
    { name: "Node.js", icon: Server, color: "text-green-500", category: "Backend" },
    { name: "DevExtreme", icon: Cpu, color: "text-orange-500", category: "UI" },
    { name: "Crystal Reports", icon: Database, color: "text-purple-500", category: "Reporting" },
    { name: "ASP.NET Core", icon: Shield, color: "text-blue-700", category: "Framework" },
    { name: "Ionic", icon: Smartphone, color: "text-blue-400", category: "Mobile" },
    { name: "React", icon: Globe, color: "text-cyan-500", category: "Frontend" },
    { name: "Vue.js", icon: Globe, color: "text-green-400", category: "Frontend" },
    { name: "Python", icon: Code2, color: "text-yellow-500", category: "Languages" },
    { name: "Laravel", icon: Server, color: "text-red-500", category: "Backend" },
    { name: "MongoDB", icon: Database, color: "text-green-600", category: "Database" },
    { name: "PostgreSQL", icon: Database, color: "text-blue-600", category: "Database" },
    { name: "Django", icon: Server, color: "text-green-700", category: "Backend" },
    { name: "Kubernetes", icon: Layers, color: "text-blue-500", category: "DevOps" }
  ];

  const categories = [
    { name: "Languages", count: technologies.filter(t => t.category === "Languages").length },
    { name: "Frontend", count: technologies.filter(t => t.category === "Frontend").length },
    { name: "Backend", count: technologies.filter(t => t.category === "Backend").length },
    { name: "Database", count: technologies.filter(t => t.category === "Database").length },
    { name: "Cloud", count: technologies.filter(t => t.category === "Cloud").length },
    { name: "DevOps", count: technologies.filter(t => t.category === "DevOps").length },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 gradient-primary rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 gradient-neural rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Cpu className="w-4 h-4 mr-2" />
            Nos Technologies
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Technologies que nous
            <br />
            <span className="gradient-primary bg-clip-text text-transparent">maîtrisons</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez l'écosystème technologique complet que nous utilisons pour créer 
            des solutions modernes et performantes
          </p>
        </motion.div>

        {/* Categories Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm rounded-xl p-4 text-center border border-border/50 hover:border-primary/50 transition-smooth"
            >
              <div className="text-2xl font-bold text-primary mb-1">{category.count}</div>
              <div className="text-sm text-muted-foreground">{category.name}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              viewport={{ once: true }}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-smooth hover:shadow-glow"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-12 h-12 ${tech.color} mb-4 mx-auto`}
                >
                  <tech.icon className="w-full h-full" />
                </motion.div>
                
                {/* Name */}
                <h3 className="text-center font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tech.name}
                </h3>
                
                {/* Category Badge */}
                <div className="text-xs text-muted-foreground text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {tech.category}
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${tech.color.replace('text-', 'hsl(var(--')})/0.1) 0%, transparent 70%)`
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Prêt à maîtriser ces technologies ?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Rejoignez nos formations pratiques et apprenez à utiliser ces outils 
              comme un professionnel grâce à notre expertise
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold rounded-xl hover:shadow-glow transition-all duration-300"
            >
              Découvrir nos cours
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                →
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologiesSection;