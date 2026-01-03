import confetti from "canvas-confetti";
import { useCallback } from "react";

export const useConfetti = () => {
  const fireConfetti = useCallback((options?: confetti.Options) => {
    const defaults = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#3b82f6", "#8b5cf6", "#22c55e", "#eab308", "#ef4444"],
    };

    confetti({ ...defaults, ...options });
  }, []);

  const fireMultiple = useCallback(() => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#3b82f6", "#8b5cf6", "#22c55e", "#eab308", "#ef4444"],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  const fireStars = useCallback(() => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  }, []);

  const fireSideCannons = useCallback(() => {
    const end = Date.now() + 2000;
    const colors = ["#3b82f6", "#8b5cf6", "#22c55e"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const fireEmoji = useCallback((emoji: string = "🎉") => {
    const scalar = 2;
    const confettiEmoji = confetti.shapeFromText({ text: emoji, scalar });

    confetti({
      shapes: [confettiEmoji],
      scalar,
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
    });
  }, []);

  return {
    fireConfetti,
    fireMultiple,
    fireStars,
    fireSideCannons,
    fireEmoji,
  };
};

export default useConfetti;
