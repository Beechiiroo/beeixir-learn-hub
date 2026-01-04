import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Stars, Sparkles, Palette, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useVisualMode } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const VisualModeSelector = () => {
  const { theme, setTheme } = useTheme();
  const { visualMode, setVisualMode } = useVisualMode();

  const visualModes = [
    { id: "normal" as const, name: "Normal", icon: Palette, description: "Thème classique" },
    { id: "starry" as const, name: "Nuit étoilée", icon: Stars, description: "Étoiles scintillantes" },
    { id: "aurora" as const, name: "Aurore boréale", icon: Sparkles, description: "Aurore + étoiles" },
  ];

  const currentVisualMode = visualModes.find((m) => m.id === visualMode);
  const CurrentIcon = currentVisualMode?.icon || Palette;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 px-3">
          <motion.div
            key={theme}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            {theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </motion.div>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Mode d'affichage
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="gap-3 cursor-pointer"
        >
          <Sun className="h-4 w-4" />
          <div className="flex flex-col">
            <span>Mode clair</span>
            <span className="text-xs text-muted-foreground">Thème lumineux</span>
          </div>
          {theme === "light" && (
            <motion.div
              layoutId="themeCheck"
              className="ml-auto h-2 w-2 rounded-full bg-primary"
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="gap-3 cursor-pointer"
        >
          <Moon className="h-4 w-4" />
          <div className="flex flex-col">
            <span>Mode sombre</span>
            <span className="text-xs text-muted-foreground">Thème sombre standard</span>
          </div>
          {theme === "dark" && (
            <motion.div
              layoutId="themeCheck"
              className="ml-auto h-2 w-2 rounded-full bg-primary"
            />
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Effets visuels (mode sombre)
        </DropdownMenuLabel>
        {visualModes.map((mode) => {
          const Icon = mode.icon;
          return (
            <DropdownMenuItem
              key={mode.id}
              onClick={() => setVisualMode(mode.id)}
              className="gap-3 cursor-pointer"
              disabled={theme === "light" && mode.id !== "normal"}
            >
              <Icon className="h-4 w-4" />
              <div className="flex flex-col">
                <span>{mode.name}</span>
                <span className="text-xs text-muted-foreground">{mode.description}</span>
              </div>
              {visualMode === mode.id && (
                <motion.div
                  layoutId="visualCheck"
                  className="ml-auto h-2 w-2 rounded-full bg-secondary"
                />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VisualModeSelector;
