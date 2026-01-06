import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Code2, Plus, X, Copy, Trash2, Search, Tag } from "lucide-react";
import { toast } from "sonner";

interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  createdAt: Date;
}

interface CodeSnippetsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CodeSnippetsPanel = ({ isOpen, onClose }: CodeSnippetsPanelProps) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newSnippet, setNewSnippet] = useState({ title: "", code: "", language: "javascript", tags: "" });

  useEffect(() => {
    const saved = localStorage.getItem("code-snippets");
    if (saved) setSnippets(JSON.parse(saved));
  }, []);

  const saveSnippets = (newSnippets: Snippet[]) => {
    setSnippets(newSnippets);
    localStorage.setItem("code-snippets", JSON.stringify(newSnippets));
  };

  const addSnippet = () => {
    if (!newSnippet.title || !newSnippet.code) { toast.error("Titre et code requis"); return; }
    const snippet: Snippet = {
      id: Date.now().toString(), title: newSnippet.title, code: newSnippet.code,
      language: newSnippet.language, tags: newSnippet.tags.split(",").map(t => t.trim()).filter(Boolean), createdAt: new Date(),
    };
    saveSnippets([snippet, ...snippets]);
    setNewSnippet({ title: "", code: "", language: "javascript", tags: "" });
    setIsAdding(false);
    toast.success("Snippet sauvegardé !");
  };

  const deleteSnippet = (id: string) => { saveSnippets(snippets.filter(s => s.id !== id)); toast.success("Supprimé"); };
  const copySnippet = (code: string) => { navigator.clipboard.writeText(code); toast.success("Copié !"); };
  const filteredSnippets = snippets.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
  const languages = ["javascript", "typescript", "python", "html", "css", "sql", "bash", "json"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-28 right-4 z-50 w-80 sm:w-96"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10 max-h-[65vh] flex flex-col">
            <div className="absolute inset-0 bg-card/80 backdrop-blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-blue-500/5" />
            
            <div className="relative flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  <span className="font-semibold">Mes Snippets</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" onClick={() => setIsAdding(!isAdding)} className="h-8 w-8"><Plus className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={onClose} className="h-8 w-8"><X className="w-4 h-4" /></Button>
                </div>
              </div>

              {/* Add Form */}
              <AnimatePresence>
                {isAdding && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-b border-white/10 overflow-hidden">
                    <div className="p-3 space-y-2">
                      <Input placeholder="Titre" value={newSnippet.title} onChange={(e) => setNewSnippet({ ...newSnippet, title: e.target.value })} className="rounded-xl" />
                      <select value={newSnippet.language} onChange={(e) => setNewSnippet({ ...newSnippet, language: e.target.value })} className="w-full p-2 rounded-xl bg-muted text-sm">
                        {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                      </select>
                      <Textarea placeholder="Votre code..." value={newSnippet.code} onChange={(e) => setNewSnippet({ ...newSnippet, code: e.target.value })} className="font-mono text-sm h-20 rounded-xl" />
                      <Input placeholder="Tags (virgules)" value={newSnippet.tags} onChange={(e) => setNewSnippet({ ...newSnippet, tags: e.target.value })} className="rounded-xl" />
                      <Button onClick={addSnippet} className="w-full rounded-xl" size="sm">Sauvegarder</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Search */}
              <div className="p-3 border-b border-white/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Rechercher..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 rounded-xl" />
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {filteredSnippets.length === 0 ? (
                  <p className="text-center text-muted-foreground text-sm py-8">Aucun snippet</p>
                ) : filteredSnippets.map((snippet) => (
                  <motion.div key={snippet.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-2xl bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{snippet.title}</h4>
                        <span className="text-xs text-muted-foreground">{snippet.language}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copySnippet(snippet.code)}><Copy className="w-3 h-3" /></Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => deleteSnippet(snippet.id)}><Trash2 className="w-3 h-3" /></Button>
                      </div>
                    </div>
                    <pre className="mt-2 p-2 rounded-xl bg-background text-xs font-mono overflow-x-auto max-h-16">{snippet.code.slice(0, 80)}{snippet.code.length > 80 && "..."}</pre>
                    {snippet.tags.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {snippet.tags.map((tag) => <span key={tag} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg text-xs bg-cyan-500/10 text-cyan-400"><Tag className="w-2.5 h-2.5" />{tag}</span>)}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CodeSnippetsPanel;
