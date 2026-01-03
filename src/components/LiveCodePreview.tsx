import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Copy, Check, Terminal, Code2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import GlassmorphismCard from "./GlassmorphismCard";
import { cn } from "@/lib/utils";

const codeExamples = [
  {
    language: "React",
    color: "text-cyan-400",
    code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clics: {count}
    </button>
  );
}`,
  },
  {
    language: "Python",
    color: "text-yellow-400",
    code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Afficher les 10 premiers nombres
for i in range(10):
    print(fibonacci(i))`,
  },
  {
    language: "Node.js",
    color: "text-green-400",
    code: `const express = require('express');
const app = express();

app.get('/api/courses', (req, res) => {
  res.json({ 
    courses: ['React', 'Vue', 'Angular'],
    instructor: 'BC Coach'
  });
});

app.listen(3000);`,
  },
];

const LiveCodePreview = () => {
  const [selectedExample, setSelectedExample] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentCode = codeExamples[selectedExample].code;

  useEffect(() => {
    if (isPaused) return;

    setDisplayedCode("");
    setIsTyping(true);
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < currentCode.length) {
        setDisplayedCode(currentCode.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [selectedExample, isPaused, currentCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const syntaxHighlight = (code: string) => {
    return code
      .replace(/(import|from|const|let|var|function|return|if|for|def|class)/g, '<span class="text-purple-400">$1</span>')
      .replace(/('.*?'|".*?")/g, '<span class="text-green-300">$1</span>')
      .replace(/(\d+)/g, '<span class="text-orange-400">$1</span>')
      .replace(/(\/\/.*|#.*)/g, '<span class="text-gray-500">$1</span>')
      .replace(/(\(|\)|\{|\}|\[|\])/g, '<span class="text-yellow-300">$1</span>');
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Live Coding</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Apprenez en Pratiquant</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez le code en action avec nos exemples interactifs
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Language selector */}
          <div className="flex gap-2 mb-4 justify-center">
            {codeExamples.map((example, index) => (
              <Button
                key={example.language}
                variant={selectedExample === index ? "default" : "outline"}
                onClick={() => setSelectedExample(index)}
                className="gap-2"
              >
                <Code2 className={cn("w-4 h-4", example.color)} />
                {example.language}
              </Button>
            ))}
          </div>

          {/* Code editor */}
          <GlassmorphismCard className="overflow-hidden">
            {/* Editor header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/30">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className={cn("text-sm font-mono ml-4", codeExamples[selectedExample].color)}>
                  {codeExamples[selectedExample].language.toLowerCase()}.{selectedExample === 1 ? "py" : "js"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsPaused(!isPaused)}
                  className="h-8 w-8"
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="h-8 w-8"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Code content */}
            <div className="p-6 bg-gray-950/80 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300 leading-relaxed">
                <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(displayedCode) }} />
                {isTyping && (
                  <motion.span
                    className="inline-block w-2 h-5 bg-primary ml-0.5"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                )}
              </pre>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-white/10 bg-black/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>{displayedCode.split("\n").length} lignes</span>
              </div>
              <Button variant="hero" size="sm" className="gap-2">
                Essayer ce code
                <Play className="w-3 h-3" />
              </Button>
            </div>
          </GlassmorphismCard>
        </div>
      </div>
    </section>
  );
};

export default LiveCodePreview;
