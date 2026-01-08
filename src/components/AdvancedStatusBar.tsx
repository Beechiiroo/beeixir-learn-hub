import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Wifi, 
  Battery, 
  Shield, 
  Cpu, 
  HardDrive, 
  Clock, 
  Zap, 
  Globe,
  TrendingUp,
  Eye
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const AdvancedStatusBar = () => {
  const [time, setTime] = useState(new Date());
  const [cpuUsage, setCpuUsage] = useState(45);
  const [memoryUsage, setMemoryUsage] = useState(62);
  const [networkSpeed, setNetworkSpeed] = useState(150);
  const [fps, setFps] = useState(60);
  const [visitors, setVisitors] = useState(1247);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setCpuUsage(prev => Math.max(20, Math.min(80, prev + (Math.random() - 0.5) * 10)));
      setMemoryUsage(prev => Math.max(40, Math.min(85, prev + (Math.random() - 0.5) * 5)));
      setNetworkSpeed(prev => Math.max(50, Math.min(300, prev + (Math.random() - 0.5) * 30)));
      setFps(prev => Math.max(55, Math.min(60, prev + Math.floor((Math.random() - 0.5) * 4))));
      setVisitors(prev => prev + Math.floor((Math.random() - 0.3) * 5));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const stats = [
    {
      icon: Clock,
      value: formatTime(time),
      label: "Heure locale",
      color: "text-blue-400"
    },
    {
      icon: Wifi,
      value: `${networkSpeed} Mb/s`,
      label: "Débit réseau",
      color: "text-green-400"
    },
    {
      icon: Cpu,
      value: `${Math.round(cpuUsage)}%`,
      label: "Utilisation CPU",
      color: cpuUsage > 70 ? "text-orange-400" : "text-cyan-400"
    },
    {
      icon: HardDrive,
      value: `${Math.round(memoryUsage)}%`,
      label: "Mémoire utilisée",
      color: memoryUsage > 75 ? "text-orange-400" : "text-purple-400"
    },
    {
      icon: Zap,
      value: `${fps} FPS`,
      label: "Performance",
      color: fps >= 58 ? "text-green-400" : "text-yellow-400"
    },
    {
      icon: Eye,
      value: visitors.toLocaleString(),
      label: "Visiteurs aujourd'hui",
      color: "text-pink-400"
    },
    {
      icon: Shield,
      value: "Actif",
      label: "Protection",
      color: "text-emerald-400"
    },
  ];

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 mb-4"
    >
      <div className="flex items-center gap-1 bg-background/60 backdrop-blur-2xl rounded-full px-4 py-2 border border-white/10 shadow-2xl">
        {stats.map((stat, index) => (
          <TooltipProvider key={index} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 + index * 0.1 }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-white/10 transition-colors cursor-default"
                >
                  <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                  <span className="text-xs font-medium text-foreground/80">{stat.value}</span>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-card/95 backdrop-blur-xl">
                <span className="text-xs">{stat.label}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        
        {/* Animated indicator */}
        <motion.div
          animate={{ 
            boxShadow: ["0 0 0 0 rgba(34, 197, 94, 0.4)", "0 0 0 8px rgba(34, 197, 94, 0)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-green-500 ml-1"
        />
      </div>
    </motion.div>
  );
};

export default AdvancedStatusBar;
