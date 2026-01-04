import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type VisualMode = "normal" | "starry" | "aurora";

interface ThemeContextType {
  visualMode: VisualMode;
  setVisualMode: (mode: VisualMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useVisualMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useVisualMode must be used within a ThemeContextProvider");
  }
  return context;
};

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [visualMode, setVisualMode] = useState<VisualMode>(() => {
    const saved = localStorage.getItem("visual-mode");
    return (saved as VisualMode) || "normal";
  });

  useEffect(() => {
    localStorage.setItem("visual-mode", visualMode);
  }, [visualMode]);

  return (
    <ThemeContext.Provider value={{ visualMode, setVisualMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
