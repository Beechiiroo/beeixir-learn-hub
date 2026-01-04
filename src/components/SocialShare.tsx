import { useState } from "react";
import { Share2, Twitter, Facebook, Linkedin, Link2, Check, MessageCircle, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface ShareData {
  title: string;
  description?: string;
  url?: string;
  type?: "course" | "achievement" | "progress";
}

interface SocialShareProps {
  data: ShareData;
  trigger?: React.ReactNode;
}

export const SocialShare = ({ data, trigger }: SocialShareProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = data.url || window.location.href;
  const shareText = data.description || data.title;

  const socialPlatforms = [
    {
      name: "Twitter/X",
      icon: Twitter,
      color: "bg-black hover:bg-gray-800",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-700 hover:bg-blue-800",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-500 hover:bg-green-600",
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
      url: `mailto:?subject=${encodeURIComponent(data.title)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({ title: "Lien copié! 🔗", description: "Le lien a été copié dans le presse-papiers" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Erreur", description: "Impossible de copier le lien", variant: "destructive" });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.title,
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        // User cancelled or error
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" />
            Partager
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Partager
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <h4 className="font-semibold text-sm line-clamp-2">{data.title}</h4>
            {data.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{data.description}</p>
            )}
            {data.type && (
              <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary">
                {data.type === "course" ? "📚 Cours" : data.type === "achievement" ? "🏆 Badge" : "📈 Progression"}
              </span>
            )}
          </div>

          {/* Social Buttons Grid */}
          <div className="grid grid-cols-5 gap-2">
            <AnimatePresence>
              {socialPlatforms.map((platform, index) => (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${platform.color} p-3 rounded-xl flex items-center justify-center text-white transition-all shadow-lg`}
                  onClick={() => setIsOpen(false)}
                >
                  <platform.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </AnimatePresence>
          </div>

          {/* Copy Link */}
          <div className="flex gap-2">
            <div className="flex-1 px-3 py-2 rounded-lg bg-muted text-sm truncate">
              {shareUrl}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyToClipboard}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
            </motion.button>
          </div>

          {/* Native Share (Mobile) */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleNativeShare}
            >
              <Share2 className="w-4 h-4" />
              Partager via...
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Quick Share Button for inline use
export const QuickShareButton = ({ data }: { data: ShareData }) => {
  return (
    <SocialShare
      data={data}
      trigger={
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-border/50 hover:border-primary transition-colors"
        >
          <Share2 className="w-4 h-4 text-muted-foreground hover:text-primary" />
        </motion.button>
      }
    />
  );
};
