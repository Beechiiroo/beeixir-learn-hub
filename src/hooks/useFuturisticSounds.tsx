import { useCallback, useRef } from "react";

type FuturisticSoundType = 
  | "holographic-click"
  | "quantum-activate"
  | "neural-pulse"
  | "cyber-hover"
  | "ai-response"
  | "biometric-scan"
  | "cloud-sync"
  | "ar-toggle"
  | "collaboration"
  | "music-start"
  | "timer-tick"
  | "recorder-start"
  | "voice-activate"
  | "code-snippet"
  | "recommendation"
  | "theme-switch"
  | "success-chime"
  | "error-glitch"
  | "focus-mode";

export const useFuturisticSounds = () => {
  const audioContext = useRef<AudioContext | null>(null);
  const isEnabled = useRef(true);

  const getContext = () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext.current;
  };

  const createOscillator = (
    ctx: AudioContext,
    frequency: number,
    type: OscillatorType,
    startTime: number,
    duration: number,
    gainValue: number
  ) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(gainValue, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
    
    return { oscillator, gainNode };
  };

  const createFilteredNoise = (
    ctx: AudioContext,
    startTime: number,
    duration: number,
    filterFreq: number,
    gainValue: number
  ) => {
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gainNode = ctx.createGain();
    
    noise.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.value = filterFreq;
    filter.Q.value = 10;
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    gainNode.gain.setValueAtTime(gainValue, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    noise.start(startTime);
    noise.stop(startTime + duration);
  };

  const playSound = useCallback((sound: FuturisticSoundType) => {
    if (!isEnabled.current) return;

    try {
      const ctx = getContext();
      const now = ctx.currentTime;

      switch (sound) {
        case "holographic-click":
          // Futuristic UI click - layered crystal tones
          createOscillator(ctx, 2400, "sine", now, 0.08, 0.06);
          createOscillator(ctx, 3200, "sine", now + 0.02, 0.06, 0.04);
          createOscillator(ctx, 4800, "sine", now + 0.04, 0.04, 0.02);
          break;

        case "quantum-activate":
          // Deep quantum resonance with harmonics
          createOscillator(ctx, 80, "sine", now, 0.3, 0.08);
          createOscillator(ctx, 160, "sine", now + 0.05, 0.25, 0.06);
          createOscillator(ctx, 320, "triangle", now + 0.1, 0.2, 0.04);
          createOscillator(ctx, 640, "sine", now + 0.15, 0.15, 0.03);
          createFilteredNoise(ctx, now, 0.2, 800, 0.02);
          break;

        case "neural-pulse":
          // Brain-computer interface sound
          for (let i = 0; i < 5; i++) {
            createOscillator(ctx, 800 + i * 200, "sine", now + i * 0.03, 0.1, 0.04 - i * 0.006);
          }
          createOscillator(ctx, 100, "sine", now, 0.2, 0.05);
          break;

        case "cyber-hover":
          // Subtle digital shimmer
          createOscillator(ctx, 1800, "sine", now, 0.04, 0.02);
          createOscillator(ctx, 2700, "sine", now + 0.01, 0.03, 0.015);
          break;

        case "ai-response":
          // AI thinking/processing
          createOscillator(ctx, 440, "sine", now, 0.15, 0.05);
          createOscillator(ctx, 550, "sine", now + 0.08, 0.12, 0.04);
          createOscillator(ctx, 660, "sine", now + 0.16, 0.1, 0.05);
          createOscillator(ctx, 880, "sine", now + 0.24, 0.08, 0.06);
          break;

        case "biometric-scan":
          // Fingerprint scan sweep
          const scanOsc = ctx.createOscillator();
          const scanGain = ctx.createGain();
          scanOsc.connect(scanGain);
          scanGain.connect(ctx.destination);
          scanOsc.type = "sine";
          scanOsc.frequency.setValueAtTime(200, now);
          scanOsc.frequency.linearRampToValueAtTime(2000, now + 0.3);
          scanGain.gain.setValueAtTime(0.05, now);
          scanGain.gain.linearRampToValueAtTime(0.08, now + 0.15);
          scanGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          scanOsc.start(now);
          scanOsc.stop(now + 0.35);
          createOscillator(ctx, 1200, "sine", now + 0.32, 0.08, 0.04);
          break;

        case "cloud-sync":
          // Data upload/sync whoosh
          for (let i = 0; i < 8; i++) {
            createOscillator(ctx, 300 + i * 100, "sine", now + i * 0.02, 0.08, 0.03);
          }
          createFilteredNoise(ctx, now, 0.15, 2000, 0.015);
          break;

        case "ar-toggle":
          // VR/AR spatial activation
          createOscillator(ctx, 150, "sine", now, 0.25, 0.06);
          createOscillator(ctx, 300, "triangle", now + 0.08, 0.2, 0.04);
          createOscillator(ctx, 600, "sine", now + 0.16, 0.15, 0.05);
          createFilteredNoise(ctx, now + 0.1, 0.15, 3000, 0.02);
          break;

        case "collaboration":
          // Team connect ping
          createOscillator(ctx, 523, "sine", now, 0.1, 0.05);
          createOscillator(ctx, 784, "sine", now + 0.08, 0.12, 0.05);
          createOscillator(ctx, 1047, "sine", now + 0.16, 0.15, 0.06);
          break;

        case "music-start":
          // Ambient music activation
          createOscillator(ctx, 220, "sine", now, 0.3, 0.04);
          createOscillator(ctx, 330, "sine", now + 0.1, 0.25, 0.035);
          createOscillator(ctx, 440, "sine", now + 0.2, 0.2, 0.03);
          createOscillator(ctx, 550, "triangle", now + 0.25, 0.15, 0.025);
          break;

        case "timer-tick":
          // Precision timer sound
          createOscillator(ctx, 1000, "sine", now, 0.05, 0.04);
          createOscillator(ctx, 2000, "sine", now + 0.02, 0.03, 0.02);
          break;

        case "recorder-start":
          // Recording activation
          createOscillator(ctx, 440, "sine", now, 0.1, 0.05);
          createOscillator(ctx, 880, "sine", now + 0.12, 0.15, 0.06);
          createOscillator(ctx, 440, "sine", now + 0.28, 0.1, 0.04);
          break;

        case "voice-activate":
          // Voice assistant wake
          createOscillator(ctx, 600, "sine", now, 0.08, 0.04);
          createOscillator(ctx, 900, "sine", now + 0.06, 0.1, 0.05);
          createOscillator(ctx, 1200, "sine", now + 0.12, 0.12, 0.06);
          createFilteredNoise(ctx, now, 0.08, 4000, 0.01);
          break;

        case "code-snippet":
          // Code/typing sound
          createOscillator(ctx, 1500, "square", now, 0.03, 0.02);
          createOscillator(ctx, 1800, "square", now + 0.04, 0.03, 0.018);
          createOscillator(ctx, 2100, "square", now + 0.08, 0.02, 0.015);
          break;

        case "recommendation":
          // AI suggestion
          createOscillator(ctx, 392, "sine", now, 0.12, 0.04);
          createOscillator(ctx, 523, "sine", now + 0.1, 0.12, 0.05);
          createOscillator(ctx, 659, "sine", now + 0.2, 0.15, 0.06);
          break;

        case "theme-switch":
          // Mode/theme change
          createOscillator(ctx, 400, "triangle", now, 0.15, 0.04);
          createOscillator(ctx, 600, "triangle", now + 0.08, 0.12, 0.04);
          createOscillator(ctx, 800, "sine", now + 0.16, 0.1, 0.05);
          break;

        case "success-chime":
          // Success confirmation
          createOscillator(ctx, 523, "sine", now, 0.1, 0.06);
          createOscillator(ctx, 659, "sine", now + 0.08, 0.12, 0.06);
          createOscillator(ctx, 784, "sine", now + 0.16, 0.15, 0.07);
          createOscillator(ctx, 1047, "sine", now + 0.24, 0.2, 0.08);
          break;

        case "error-glitch":
          // Error/warning
          createOscillator(ctx, 150, "sawtooth", now, 0.15, 0.04);
          createOscillator(ctx, 120, "sawtooth", now + 0.1, 0.2, 0.04);
          createFilteredNoise(ctx, now, 0.1, 500, 0.03);
          break;

        case "focus-mode":
          // Deep focus activation - calming but attention-grabbing
          createOscillator(ctx, 256, "sine", now, 0.3, 0.05);
          createOscillator(ctx, 384, "sine", now + 0.1, 0.25, 0.04);
          createOscillator(ctx, 512, "sine", now + 0.2, 0.2, 0.05);
          createOscillator(ctx, 768, "triangle", now + 0.3, 0.15, 0.03);
          break;
      }
    } catch (e) {
      // Audio not supported or context failed
      console.log("Audio not supported");
    }
  }, []);

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

export type { FuturisticSoundType };
export default useFuturisticSounds;
