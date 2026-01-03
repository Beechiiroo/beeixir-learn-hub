import { useCallback, useRef } from "react";

type SoundType = "click" | "hover" | "success" | "error" | "notification" | "whoosh";

// Web Audio API based sound effects
export const useSoundEffects = () => {
  const audioContext = useRef<AudioContext | null>(null);
  const isEnabled = useRef(true);

  const getContext = () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext.current;
  };

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = "sine", volume: number = 0.1) => {
    if (!isEnabled.current) return;

    try {
      const ctx = getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio not supported
    }
  }, []);

  const playSound = useCallback((sound: SoundType) => {
    if (!isEnabled.current) return;

    switch (sound) {
      case "click":
        playTone(800, 0.1, "sine", 0.05);
        break;
      case "hover":
        playTone(600, 0.05, "sine", 0.02);
        break;
      case "success":
        playTone(523, 0.1, "sine", 0.08);
        setTimeout(() => playTone(659, 0.1, "sine", 0.08), 100);
        setTimeout(() => playTone(784, 0.15, "sine", 0.1), 200);
        break;
      case "error":
        playTone(200, 0.2, "sawtooth", 0.05);
        setTimeout(() => playTone(150, 0.3, "sawtooth", 0.05), 150);
        break;
      case "notification":
        playTone(880, 0.1, "sine", 0.06);
        setTimeout(() => playTone(1047, 0.15, "sine", 0.08), 100);
        break;
      case "whoosh":
        for (let i = 0; i < 10; i++) {
          setTimeout(() => playTone(200 + i * 50, 0.05, "sine", 0.02), i * 10);
        }
        break;
    }
  }, [playTone]);

  const toggle = useCallback(() => {
    isEnabled.current = !isEnabled.current;
    return isEnabled.current;
  }, []);

  const setEnabled = useCallback((enabled: boolean) => {
    isEnabled.current = enabled;
  }, []);

  return {
    playSound,
    toggle,
    setEnabled,
    isEnabled: () => isEnabled.current,
  };
};

export default useSoundEffects;
