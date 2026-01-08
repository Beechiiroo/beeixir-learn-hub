import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Video, Mic, MicOff, VideoOff, MessageSquare, Share2, Crown, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CollaborationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CollaborationPanel = ({ isOpen, onClose }: CollaborationPanelProps) => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [message, setMessage] = useState("");

  const collaborators = [
    { id: 1, name: "Ahmed K.", avatar: "/placeholder.svg", status: "online", isHost: true },
    { id: 2, name: "Sara M.", avatar: "/placeholder.svg", status: "online", isHost: false },
    { id: 3, name: "Youssef B.", avatar: "/placeholder.svg", status: "away", isHost: false },
    { id: 4, name: "Leila R.", avatar: "/placeholder.svg", status: "online", isHost: false },
  ];

  const messages = [
    { id: 1, user: "Ahmed K.", text: "Super cette approche!", time: "2m" },
    { id: 2, user: "Sara M.", text: "On peut optimiser ce code 👍", time: "1m" },
    { id: 3, user: "Youssef B.", text: "J'ajoute les tests unitaires", time: "30s" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed left-20 top-[15%] z-50 w-80"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/90 via-indigo-900/90 to-purple-900/90 backdrop-blur-2xl border border-white/20 shadow-2xl">
            {/* Header */}
            <div className="relative p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center"
                  >
                    <Users className="w-4 h-4 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-white">Collaboration Live</h3>
                    <p className="text-xs text-white/60">Session: React Workshop</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Video preview area */}
            <div className="p-4">
              <div className="relative h-32 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl">📹</span>
                </div>
                
                {/* Mini participants */}
                <div className="absolute bottom-2 right-2 flex -space-x-2">
                  {collaborators.slice(0, 3).map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative"
                    >
                      <Avatar className="w-8 h-8 border-2 border-gray-800">
                        <AvatarImage src={c.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                          {c.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-gray-800 ${
                        c.status === "online" ? "bg-green-500" : "bg-yellow-500"
                      }`} />
                    </motion.div>
                  ))}
                  {collaborators.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center">
                      <span className="text-xs text-white">+{collaborators.length - 3}</span>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="absolute bottom-2 left-2 flex gap-1.5">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setMicOn(!micOn)}
                    className={`h-7 w-7 rounded-full ${micOn ? "bg-white/20" : "bg-red-500/80"} hover:bg-white/30 text-white`}
                  >
                    {micOn ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setVideoOn(!videoOn)}
                    className={`h-7 w-7 rounded-full ${videoOn ? "bg-white/20" : "bg-red-500/80"} hover:bg-white/30 text-white`}
                  >
                    {videoOn ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 rounded-full bg-white/20 hover:bg-white/30 text-white"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Participants list */}
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-white/60 mb-2">Participants ({collaborators.length})</h4>
                <div className="space-y-2">
                  {collaborators.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Avatar className="w-7 h-7">
                            <AvatarImage src={c.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                              {c.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-gray-800 ${
                            c.status === "online" ? "bg-green-500" : "bg-yellow-500"
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-white font-medium">{c.name}</span>
                            {c.isHost && <Crown className="w-3 h-3 text-yellow-400" />}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-white/40">
                        <Mic className="w-3 h-3" />
                        <Video className="w-3 h-3" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mini chat */}
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-white/60 mb-2">Chat</h4>
                <div className="space-y-2 max-h-24 overflow-y-auto custom-scrollbar">
                  {messages.map((m, i) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-xs"
                    >
                      <span className="text-blue-400 font-medium">{m.user}</span>
                      <span className="text-white/40 mx-1">·</span>
                      <span className="text-white/40">{m.time}</span>
                      <p className="text-white/80">{m.text}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message..."
                    className="bg-white/10 border-white/10 text-white placeholder:text-white/40 text-xs h-8"
                  />
                  <Button size="icon" className="h-8 w-8 bg-blue-600 hover:bg-blue-700">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CollaborationPanel;
