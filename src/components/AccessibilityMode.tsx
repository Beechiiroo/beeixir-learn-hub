import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { Accessibility, Eye, Type, Keyboard, Volume2, Moon, Sun, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  reduceMotion: boolean;
  focusIndicator: boolean;
  lineHeight: number;
  letterSpacing: number;
  dyslexiaFont: boolean;
  screenReaderOptimized: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  reduceMotion: false,
  focusIndicator: true,
  lineHeight: 1.5,
  letterSpacing: 0,
  dyslexiaFont: false,
  screenReaderOptimized: false
};

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (updates: Partial<AccessibilitySettings>) => void;
  resetSettings: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
};

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem("beechir-accessibility");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("beechir-accessibility", JSON.stringify(settings));
    
    // Apply settings to document
    const root = document.documentElement;
    root.style.fontSize = `${settings.fontSize}%`;
    root.style.setProperty("--line-height-modifier", settings.lineHeight.toString());
    root.style.setProperty("--letter-spacing-modifier", `${settings.letterSpacing}em`);
    
    // High contrast
    if (settings.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
    
    // Reduce motion
    if (settings.reduceMotion) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }
    
    // Focus indicator
    if (settings.focusIndicator) {
      root.classList.add("enhanced-focus");
    } else {
      root.classList.remove("enhanced-focus");
    }
    
    // Dyslexia font
    if (settings.dyslexiaFont) {
      root.classList.add("dyslexia-font");
    } else {
      root.classList.remove("dyslexia-font");
    }
  }, [settings]);

  const updateSettings = (updates: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    toast({ title: "Paramètres réinitialisés", description: "Les paramètres d'accessibilité ont été réinitialisés" });
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const AccessibilityPanel = () => {
  const { settings, updateSettings, resetSettings } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Paramètres d'accessibilité"
        >
          <Accessibility className="w-5 h-5" />
        </motion.button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Accessibility className="w-5 h-5" />
            Accessibilité
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Font Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                Taille du texte
              </Label>
              <span className="text-sm text-muted-foreground">{settings.fontSize}%</span>
            </div>
            <Slider
              value={[settings.fontSize]}
              onValueChange={([value]) => updateSettings({ fontSize: value })}
              min={75}
              max={150}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Petit</span>
              <span>Normal</span>
              <span>Grand</span>
            </div>
          </div>

          {/* Line Height */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Interligne</Label>
              <span className="text-sm text-muted-foreground">{settings.lineHeight}</span>
            </div>
            <Slider
              value={[settings.lineHeight]}
              onValueChange={([value]) => updateSettings({ lineHeight: value })}
              min={1}
              max={2.5}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Letter Spacing */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Espacement des lettres</Label>
              <span className="text-sm text-muted-foreground">{settings.letterSpacing}em</span>
            </div>
            <Slider
              value={[settings.letterSpacing]}
              onValueChange={([value]) => updateSettings({ letterSpacing: value })}
              min={0}
              max={0.2}
              step={0.01}
              className="w-full"
            />
          </div>

          {/* Toggle Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 cursor-pointer" htmlFor="high-contrast">
                <Eye className="w-4 h-4" />
                Contraste élevé
              </Label>
              <Switch
                id="high-contrast"
                checked={settings.highContrast}
                onCheckedChange={(checked) => updateSettings({ highContrast: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 cursor-pointer" htmlFor="reduce-motion">
                <Moon className="w-4 h-4" />
                Réduire les animations
              </Label>
              <Switch
                id="reduce-motion"
                checked={settings.reduceMotion}
                onCheckedChange={(checked) => updateSettings({ reduceMotion: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 cursor-pointer" htmlFor="focus-indicator">
                <Keyboard className="w-4 h-4" />
                Indicateur de focus amélioré
              </Label>
              <Switch
                id="focus-indicator"
                checked={settings.focusIndicator}
                onCheckedChange={(checked) => updateSettings({ focusIndicator: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 cursor-pointer" htmlFor="dyslexia-font">
                <Type className="w-4 h-4" />
                Police dyslexie
              </Label>
              <Switch
                id="dyslexia-font"
                checked={settings.dyslexiaFont}
                onCheckedChange={(checked) => updateSettings({ dyslexiaFont: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 cursor-pointer" htmlFor="screen-reader">
                <Volume2 className="w-4 h-4" />
                Optimisé lecteur d'écran
              </Label>
              <Switch
                id="screen-reader"
                checked={settings.screenReaderOptimized}
                onCheckedChange={(checked) => updateSettings({ screenReaderOptimized: checked })}
              />
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 rounded-lg bg-muted/50 border">
            <p className="text-sm">
              Aperçu du texte avec les paramètres actuels. Vous pouvez ajuster les options ci-dessus pour améliorer votre confort de lecture.
            </p>
          </div>

          {/* Reset Button */}
          <Button variant="outline" className="w-full gap-2" onClick={resetSettings}>
            <RotateCcw className="w-4 h-4" />
            Réinitialiser les paramètres
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// CSS to be added to index.css
export const accessibilityStyles = `
.high-contrast {
  --foreground: 0 0% 0%;
  --background: 0 0% 100%;
  --primary: 220 90% 40%;
}

.dark.high-contrast {
  --foreground: 0 0% 100%;
  --background: 0 0% 0%;
  --primary: 220 90% 70%;
}

.reduce-motion * {
  animation-duration: 0.001ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.001ms !important;
}

.enhanced-focus *:focus-visible {
  outline: 3px solid hsl(var(--primary)) !important;
  outline-offset: 2px !important;
}

.dyslexia-font {
  font-family: 'OpenDyslexic', 'Comic Sans MS', cursive, sans-serif !important;
}

body {
  line-height: calc(1.5 * var(--line-height-modifier, 1));
  letter-spacing: var(--letter-spacing-modifier, 0);
}
`;
