import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Plus, Trash2, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  date?: string;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Compléter le cours React avancé', completed: false, priority: 'high', date: '2025-08-20' },
    { id: '2', title: 'Pratiquer les exercices Machine Learning', completed: true, priority: 'medium', date: '2025-08-15' },
    { id: '3', title: 'Réviser Angular Components', completed: false, priority: 'low', date: '2025-08-25' },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        priority: 'medium'
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 via-background to-primary/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Gestionnaire de <span className="gradient-primary bg-clip-text text-transparent">Tâches</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Organisez votre apprentissage et suivez vos objectifs quotidiens
            </p>
          </div>

          <Card className="max-w-4xl mx-auto p-8 shadow-hover gradient-card border-primary/20">
            {/* Add Task Input */}
            <div className="flex gap-3 mb-6">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="Ajouter une nouvelle tâche..."
                className="flex-1 bg-background/50 border-primary/20 focus:border-primary transition-all"
              />
              <Button onClick={addTask} variant="hero" size="icon" className="shrink-0">
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            {/* Task Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-primary/10 rounded-lg p-4 text-center border border-primary/20"
              >
                <div className="text-3xl font-bold text-primary">{tasks.length}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-success/10 rounded-lg p-4 text-center border border-success/20"
              >
                <div className="text-3xl font-bold text-success">{tasks.filter(t => t.completed).length}</div>
                <div className="text-sm text-muted-foreground">Complétées</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-warning/10 rounded-lg p-4 text-center border border-warning/20"
              >
                <div className="text-3xl font-bold text-warning">{tasks.filter(t => !t.completed).length}</div>
                <div className="text-sm text-muted-foreground">En cours</div>
              </motion.div>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    layout
                    className={`flex items-center gap-4 p-4 rounded-lg bg-background/50 border transition-all ${
                      task.completed 
                        ? 'border-success/30 bg-success/5' 
                        : 'border-border/50 hover:border-primary/50'
                    }`}
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="shrink-0 transition-transform hover:scale-110"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-success" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground hover:text-primary" />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        {task.date && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {task.date}
                          </span>
                        )}
                        <span className={`text-xs flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                          <Tag className="w-3 h-3" />
                          {task.priority}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => deleteTask(task.id)}
                      variant="ghost"
                      size="icon"
                      className="shrink-0 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TaskManager;
