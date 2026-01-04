import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { Heart, BookmarkPlus, FolderPlus, X, Check, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface Collection {
  id: string;
  name: string;
  courseIds: string[];
  createdAt: Date;
}

interface FavoritesContextType {
  favorites: string[];
  collections: Collection[];
  toggleFavorite: (courseId: string) => void;
  isFavorite: (courseId: string) => boolean;
  addToCollection: (courseId: string, collectionId: string) => void;
  removeFromCollection: (courseId: string, collectionId: string) => void;
  createCollection: (name: string) => void;
  deleteCollection: (collectionId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("beechir-favorites");
    const savedCollections = localStorage.getItem("beechir-collections");
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedCollections) setCollections(JSON.parse(savedCollections));
  }, []);

  useEffect(() => {
    localStorage.setItem("beechir-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("beechir-collections", JSON.stringify(collections));
  }, [collections]);

  const toggleFavorite = (courseId: string) => {
    setFavorites(prev => {
      const isFav = prev.includes(courseId);
      if (isFav) {
        toast({ title: "Retiré des favoris", description: "Cours retiré de vos favoris" });
        return prev.filter(id => id !== courseId);
      } else {
        toast({ title: "Ajouté aux favoris ❤️", description: "Cours ajouté à vos favoris" });
        return [...prev, courseId];
      }
    });
  };

  const isFavorite = (courseId: string) => favorites.includes(courseId);

  const addToCollection = (courseId: string, collectionId: string) => {
    setCollections(prev => prev.map(col => 
      col.id === collectionId && !col.courseIds.includes(courseId)
        ? { ...col, courseIds: [...col.courseIds, courseId] }
        : col
    ));
    toast({ title: "Ajouté à la collection", description: "Cours ajouté avec succès" });
  };

  const removeFromCollection = (courseId: string, collectionId: string) => {
    setCollections(prev => prev.map(col => 
      col.id === collectionId
        ? { ...col, courseIds: col.courseIds.filter(id => id !== courseId) }
        : col
    ));
  };

  const createCollection = (name: string) => {
    const newCollection: Collection = {
      id: Date.now().toString(),
      name,
      courseIds: [],
      createdAt: new Date()
    };
    setCollections(prev => [...prev, newCollection]);
    toast({ title: "Collection créée 📁", description: `"${name}" a été créée` });
  };

  const deleteCollection = (collectionId: string) => {
    setCollections(prev => prev.filter(col => col.id !== collectionId));
    toast({ title: "Collection supprimée", description: "La collection a été supprimée" });
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      collections,
      toggleFavorite,
      isFavorite,
      addToCollection,
      removeFromCollection,
      createCollection,
      deleteCollection
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

interface FavoriteButtonProps {
  courseId: string;
  size?: "sm" | "md" | "lg";
}

export const FavoriteButton = ({ courseId, size = "md" }: FavoriteButtonProps) => {
  const { toggleFavorite, isFavorite, collections, addToCollection, createCollection } = useFavorites();
  const [newCollectionName, setNewCollectionName] = useState("");
  const [showNewCollection, setShowNewCollection] = useState(false);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22
  };

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      createCollection(newCollectionName.trim());
      setNewCollectionName("");
      setShowNewCollection(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(courseId);
        }}
        className={`${sizeClasses[size]} rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-border/50 hover:border-red-400 transition-colors`}
      >
        <Heart
          size={iconSizes[size]}
          className={`transition-all ${isFavorite(courseId) ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-400"}`}
        />
      </motion.button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className={`${sizeClasses[size]} rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-border/50 hover:border-primary transition-colors`}
          >
            <BookmarkPlus size={iconSizes[size]} className="text-muted-foreground hover:text-primary" />
          </motion.button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {collections.map(collection => (
            <DropdownMenuItem
              key={collection.id}
              onClick={() => addToCollection(courseId, collection.id)}
              className="cursor-pointer"
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              {collection.name}
              {collection.courseIds.includes(courseId) && (
                <Check className="w-4 h-4 ml-auto text-green-500" />
              )}
            </DropdownMenuItem>
          ))}
          {collections.length > 0 && <DropdownMenuSeparator />}
          {showNewCollection ? (
            <div className="p-2 flex gap-2">
              <Input
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Nom..."
                className="h-8 text-sm"
                onKeyDown={(e) => e.key === "Enter" && handleCreateCollection()}
              />
              <Button size="sm" onClick={handleCreateCollection} className="h-8 px-2">
                <Check className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <DropdownMenuItem onClick={() => setShowNewCollection(true)} className="cursor-pointer">
              <FolderPlus className="w-4 h-4 mr-2" />
              Nouvelle collection
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const CollectionsManager = () => {
  const { collections, deleteCollection } = useFavorites();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FolderPlus className="w-4 h-4" />
          Mes collections ({collections.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Mes collections</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {collections.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Aucune collection créée
              </p>
            ) : (
              collections.map(collection => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50"
                >
                  <div>
                    <h4 className="font-medium">{collection.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {collection.courseIds.length} cours
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteCollection(collection.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};
