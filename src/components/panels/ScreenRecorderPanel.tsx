import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { toast } from "sonner";

interface ScreenRecorderPanelProps {
  isRecording: boolean;
  onRecordingChange: (recording: boolean) => void;
}

const ScreenRecorderPanel = ({ isRecording, onRecordingChange }: ScreenRecorderPanelProps) => {
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [duration, setDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        setRecordedBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
        if (intervalRef.current) clearInterval(intervalRef.current);
        onRecordingChange(false);
        toast.success("Enregistrement terminé !");
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      onRecordingChange(true);
      setDuration(0);
      intervalRef.current = setInterval(() => setDuration((prev) => prev + 1), 1000);
      toast.info("Enregistrement en cours...");
    } catch (error) {
      toast.error("Impossible de démarrer l'enregistrement");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const downloadRecording = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `recording-${Date.now()}.webm`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Téléchargement démarré");
    }
  };

  const formatDuration = (seconds: number) => `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  // Only show when recording or has a recording
  if (!isRecording && !recordedBlob) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-20 right-4 z-50"
      >
        <div className="flex items-center gap-2">
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 py-2 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-lg"
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full bg-white"
              />
              <span>{formatDuration(duration)}</span>
              <Button
                onClick={stopRecording}
                size="sm"
                variant="ghost"
                className="ml-2 h-7 px-2 text-white hover:bg-white/20"
              >
                Stop
              </Button>
            </motion.div>
          )}

          {recordedBlob && !isRecording && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 bg-card/90 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-lg"
            >
              <Button onClick={downloadRecording} size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <Download className="w-4 h-4 mr-1" />
                Télécharger
              </Button>
              <Button onClick={() => setRecordedBlob(null)} size="sm" variant="ghost" className="rounded-xl">
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScreenRecorderPanel;
