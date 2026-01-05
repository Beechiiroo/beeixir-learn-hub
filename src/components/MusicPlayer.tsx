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

const MusicPlayer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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
      
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      // Create oscillator for ambient tones
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(tracks[currentTrack].frequency, audioContext.currentTime);
      
      // Add slight modulation for more interesting sound
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
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
      if (lfoRef.current) {
        lfoRef.current.stop();
        lfoRef.current.disconnect();
        lfoRef.current = null;
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
        gainNodeRef.current = null;
      }
    } catch (error) {
      console.error("Stop audio error:", error);
    }
  };

  // Update volume in real-time
  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      const effectiveVolume = isMuted ? 0 : (volume / 100) * 0.08;
      gainNodeRef.current.gain.setValueAtTime(effectiveVolume, audioContextRef.current.currentTime);
    }
  }, [volume, isMuted]);

  // Handle playback
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const nextTrack = () => {
    stopAudio();
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setProgress(0);
  };

  const prevTrack = () => {
    stopAudio();
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setProgress(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Floating Music Button */}
      <motion.div
        className="fixed bottom-24 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className={`h-14 w-14 rounded-full shadow-lg hover:shadow-xl ${
            isPlaying 
              ? "bg-gradient-to-br from-green-500 to-emerald-600" 
              : "bg-gradient-to-br from-primary to-secondary"
          }`}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="playing"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
                className="animate-spin"
                style={{ animationDuration: "3s" }}
              >
                <Disc className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="paused"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Music className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Player Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            className="fixed bottom-44 left-6 z-50 w-72 bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <span>🎵 Music Player</span>
                {isPlaying && (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-xs text-green-500"
                  >
                    ● LIVE
                  </motion.span>
                )}
              </h3>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Album Art */}
            <div className="p-4">
              <motion.div
                className="relative w-full aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden"
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary to-secondary opacity-50" />
                <div className="absolute inset-8 rounded-full bg-card flex items-center justify-center">
                  <Disc className="h-12 w-12 text-primary" />
                </div>
              </motion.div>
            </div>

            {/* Track Info */}
            <div className="px-4 text-center">
              <motion.h4 
                key={tracks[currentTrack].title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-semibold truncate"
              >
                {tracks[currentTrack].title}
              </motion.h4>
              <p className="text-sm text-muted-foreground">{tracks[currentTrack].artist}</p>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {tracks[currentTrack].genre} • {tracks[currentTrack].frequency}Hz
              </span>
            </div>

            {/* Progress Bar */}
            <div className="px-4 py-3">
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="px-4 pb-4 flex items-center justify-center gap-4">
              <Button variant="ghost" size="icon" onClick={prevTrack}>
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                className={`h-12 w-12 rounded-full ${
                  isPlaying
                    ? "bg-gradient-to-r from-green-500 to-emerald-600"
                    : "bg-gradient-to-r from-primary to-secondary"
                }`}
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={nextTrack}>
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            {/* Volume */}
            <div className="px-4 pb-4 flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={([val]) => setVolume(val)}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>

            {/* Playlist */}
            <div className="max-h-32 overflow-y-auto border-t border-border">
              {tracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                  onClick={() => {
                    stopAudio();
                    setCurrentTrack(index);
                    setProgress(0);
                    setIsPlaying(true);
                  }}
                  className={`px-4 py-2 cursor-pointer flex items-center gap-3 ${
                    currentTrack === index ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="h-8 w-8 rounded bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    {currentTrack === index && isPlaying ? (
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            className="w-0.5 bg-primary"
                            animate={{ height: [4, 12, 4] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                          />
                        ))}
                      </div>
                    ) : (
                      <Music className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{track.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;
