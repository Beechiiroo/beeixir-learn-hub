import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ArrowRight, 
  BookOpen,
  Code,
  Brain,
  Rocket,
  Filter,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const categories = [
  { id: "all", name: "Tous", icon: BookOpen, count: 24 },
  { id: "web", name: "Développement Web", icon: Code, count: 8 },
  { id: "ai", name: "Intelligence Artificielle", icon: Brain, count: 6 },
  { id: "mobile", name: "Mobile", icon: Rocket, count: 5 },
  { id: "devops", name: "DevOps", icon: TrendingUp, count: 5 },
];

const blogArticles = [
  {
    id: 1,
    title: "Maîtriser React 18 : Les Nouveautés Essentielles",
    excerpt: "Découvrez les nouvelles fonctionnalités de React 18 incluant le Concurrent Rendering, Suspense amélioré et les nouveaux hooks.",
    category: "web",
    author: "Beechir Chaieb",
    date: "15 Déc 2024",
    readTime: "8 min",
    views: 2450,
    likes: 189,
    comments: 34,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    tags: ["React", "JavaScript", "Frontend"],
    featured: true
  },
  {
    id: 2,
    title: "Introduction au Machine Learning avec Python",
    excerpt: "Guide complet pour débuter en Machine Learning : de la théorie à la pratique avec scikit-learn et TensorFlow.",
    category: "ai",
    author: "Beechir Chaieb",
    date: "12 Déc 2024",
    readTime: "12 min",
    views: 3120,
    likes: 256,
    comments: 45,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
    tags: ["Python", "ML", "Data Science"],
    featured: true
  },
  {
    id: 3,
    title: "Construire une API REST avec Node.js et Express",
    excerpt: "Apprenez à créer une API robuste et scalable avec les meilleures pratiques de sécurité et de performance.",
    category: "web",
    author: "Beechir Chaieb",
    date: "10 Déc 2024",
    readTime: "10 min",
    views: 1890,
    likes: 145,
    comments: 28,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
    tags: ["Node.js", "Express", "API"],
    featured: false
  },
  {
    id: 4,
    title: "Flutter vs React Native : Le Comparatif 2024",
    excerpt: "Analyse détaillée des deux frameworks mobiles les plus populaires pour vous aider à faire le bon choix.",
    category: "mobile",
    author: "Beechir Chaieb",
    date: "8 Déc 2024",
    readTime: "15 min",
    views: 4200,
    likes: 312,
    comments: 67,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
    tags: ["Flutter", "React Native", "Mobile"],
    featured: true
  },
  {
    id: 5,
    title: "Docker et Kubernetes pour les Débutants",
    excerpt: "Conteneurisation et orchestration expliquées simplement avec des exemples pratiques.",
    category: "devops",
    author: "Beechir Chaieb",
    date: "5 Déc 2024",
    readTime: "14 min",
    views: 2100,
    likes: 178,
    comments: 39,
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
    tags: ["Docker", "Kubernetes", "DevOps"],
    featured: false
  },
  {
    id: 6,
    title: "Créer un Chatbot IA avec OpenAI GPT-4",
    excerpt: "Tutoriel pas à pas pour intégrer l'IA conversationnelle dans vos applications.",
    category: "ai",
    author: "Beechir Chaieb",
    date: "3 Déc 2024",
    readTime: "11 min",
    views: 5600,
    likes: 423,
    comments: 89,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    tags: ["OpenAI", "Chatbot", "GPT-4"],
    featured: true
  }
];

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredArticles = blogArticles.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter(a => a.featured);

  return (
    <section id="blog" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

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
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Blog & Tutoriels</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-primary bg-clip-text text-transparent">Articles</span> & Ressources
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explorez nos articles techniques, tutoriels et guides pour approfondir vos connaissances
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un article, tutoriel ou tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-card/50 border-border/50 focus:border-primary/50 rounded-2xl"
              />
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="h-14 px-6 rounded-2xl"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filtres
            </Button>
          </div>

          {/* Categories */}
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex flex-wrap gap-3"
            >
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "bg-card/50 text-foreground hover:bg-card border border-border/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{category.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === category.id
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {category.count}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && selectedCategory === "all" && !searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Articles à la Une
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.slice(0, 2).map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        Featured
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-muted-foreground line-clamp-2">{article.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {article.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {article.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {article.comments}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="group/btn">
                        Lire
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {categories.find(c => c.id === article.category)?.name}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {article.likes}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="group/btn">
                      Lire
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-bold mb-2">Aucun article trouvé</h3>
            <p className="text-muted-foreground">Essayez d'autres mots-clés ou catégories</p>
          </motion.div>
        )}

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" className="rounded-full px-8">
            Voir plus d'articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
