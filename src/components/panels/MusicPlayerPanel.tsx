import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, X, Disc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface Track {
  id: number;
  title: string;
  artist: string;
  genre: string;
  frequency: number;
}

const tracks: Track[] = [
  { id: 1, title: "Focus Flow", artist: "Ambient Waves", genre: "Lo-Fi", frequency: 432 },
  { id: 2, title: "Deep Work", artist: "Study Beats", genre: "Ambient", frequency: 528 },
  { id: 3, title: "Code Mode", artist: "Synthetix", genre: "Electronic", frequency: 396 },
  { id: 4, title: "Night Owl", artist: "Chill Masters", genre: "Chillhop", frequency: 639 },
  { id: 5, title: "Algorithm", artist: "Binary Beats", genre: "Techno", frequency: 741 },
];

interface MusicPlayerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isPlaying: boolean;
  onPlayingChange: (playing: boolean) => void;
}

const MusicPlayerPanel = ({ isOpen, onClose, isPlaying, onPlayingChange }: MusicPlayerPanelProps) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const startAudio = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const audioContext = audioContextRef.current;
      if (audioContext.state === 'suspended') audioContext.resume();

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(tracks[currentTrack].frequency, audioContext.currentTime);
      
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();
      lfo.frequency.setValueAtTime(0.3, audioContext.currentTime);
      lfoGain.gain.setValueAtTime(5, audioContext.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      lfo.start();
      
      const effectiveVolume = isMuted ? 0 : (volume / 100) * 0.08;
      gainNode.gain.setValueAtTime(effectiveVolume, audioContext.currentTime);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start();
      
      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;
      lfoRef.current = lfo;
    } catch (error) {
      console.error("Audio error:", error);
    }
  };

  const stopAudio = () => {
    try {
      oscillatorRef.current?.stop();
      oscillatorRef.current?.disconnect();
      lfoRef.current?.stop();
      lfoRef.current?.disconnect();
      gainNodeRef.current?.disconnect();
      oscillatorRef.current = null;
      lfoRef.current = null;
      gainNodeRef.current = null;
    } catch (error) {}
  };

  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      const effectiveVolume = isMuted ? 0 : (volume / 100) * 0.08;
      gainNodeRef.current.gain.setValueAtTime(effectiveVolume, audioContextRef.current.currentTime);
    }
  }, [volume, isMuted]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      startAudio();
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextTrack();
            return 0;
          }
          return prev + 0.5;
        });
      }, 500);
    } else {
      stopAudio();
    }
    return () => {
      clearInterval(interval);
      stopAudio();
    };
  }, [isPlaying, currentTrack]);

  useEffect(() => () => stopAudio(), []);

  const nextTrack = () => { stopAudio(); setCurrentTrack((prev) => (prev + 1) % tracks.length); setProgress(0); };
  const prevTrack = () => { stopAudio(); setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length); setProgress(0); };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.9 }}
          className="fixed bottom-28 left-4 z-50 w-72"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10">
            <div className="absolute inset-0 bg-card/80 backdrop-blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/10 via-transparent to-pink-500/5" />
            
            <div className="relative">
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <span>🎵 Music</span>
                  {isPlaying && (
                    <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-xs text-green-400">● LIVE</motion.span>
                  )}
                </h3>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Album Art */}
              <div className="p-4">
                <motion.div
                  className="relative w-full aspect-square rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 flex items-center justify-center overflow-hidden"
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-600 opacity-50" />
                  <div className="absolute inset-8 rounded-full bg-card flex items-center justify-center">
                    <Disc className="h-10 w-10 text-fuchsia-400" />
                  </div>
                </motion.div>
              </div>

              {/* Track Info */}
              <div className="px-4 text-center">
                <motion.h4 key={tracks[currentTrack].title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-semibold truncate">
                  {tracks[currentTrack].title}
                </motion.h4>
                <p className="text-sm text-muted-foreground">{tracks[currentTrack].artist}</p>
                <span className="text-xs bg-fuchsia-500/10 text-fuchsia-400 px-2 py-0.5 rounded-full">
                  {tracks[currentTrack].genre} • {tracks[currentTrack].frequency}Hz
                </span>
              </div>

              {/* Progress */}
              <div className="px-4 py-3">
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-fuchsia-500 to-pink-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Controls */}
              <div className="px-4 pb-4 flex items-center justify-center gap-4">
                <Button variant="ghost" size="icon" onClick={prevTrack}><SkipBack className="h-5 w-5" /></Button>
                <Button
                  size="icon"
                  className={`h-12 w-12 rounded-full ${isPlaying ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-fuchsia-500 to-pink-600"}`}
                  onClick={() => onPlayingChange(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={nextTrack}><SkipForward className="h-5 w-5" /></Button>
              </div>

              {/* Volume */}
              <div className="px-4 pb-4 flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider value={[isMuted ? 0 : volume]} onValueChange={([val]) => setVolume(val)} max={100} className="flex-1" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MusicPlayerPanel;
