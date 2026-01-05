import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Video, StopCircle, Download, X } from "lucide-react";
import { toast } from "sonner";

const ScreenRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [duration, setDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9",
      });

      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        setRecordedBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
        if (intervalRef.current) clearInterval(intervalRef.current);
        toast.success("Enregistrement terminé !");
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      setDuration(0);

      intervalRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);

      toast.info("Enregistrement en cours...");
    } catch (error) {
      toast.error("Impossible de démarrer l'enregistrement");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
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

  const clearRecording = () => {
    setRecordedBlob(null);
    setDuration(0);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      className="fixed top-24 right-6 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3, duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-white"
            />
            {formatDuration(duration)}
          </motion.div>
        )}

        {recordedBlob && !isRecording && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1"
          >
            <Button
              onClick={downloadRecording}
              size="sm"
              className="bg-green-500 hover:bg-green-600"
            >
              <Download className="w-4 h-4 mr-1" />
              Télécharger
            </Button>
            <Button onClick={clearRecording} size="sm" variant="ghost">
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        <Button
          onClick={isRecording ? stopRecording : startRecording}
          size="lg"
          className={`w-12 h-12 rounded-full shadow-lg ${
            isRecording ? "bg-red-500 hover:bg-red-600" : ""
          }`}
          variant={isRecording ? "destructive" : "secondary"}
        >
          {isRecording ? (
            <StopCircle className="w-5 h-5" />
          ) : (
            <Video className="w-5 h-5" />
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default ScreenRecorder;
