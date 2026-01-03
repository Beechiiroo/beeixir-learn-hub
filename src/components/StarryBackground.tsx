import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Stars
    const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    // Shooting stars
    const shootingStars: { x: number; y: number; length: number; speed: number; opacity: number; active: boolean }[] = [];
    
    const createShootingStar = () => {
      if (shootingStars.length < 3 && Math.random() > 0.995) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: 0,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 15 + 10,
          opacity: 1,
          active: true,
        });
      }
    };

    // Aurora colors
    const auroraColors = [
      "rgba(34, 197, 94, 0.1)",
      "rgba(59, 130, 246, 0.1)",
      "rgba(168, 85, 247, 0.1)",
      "rgba(236, 72, 153, 0.08)",
    ];

    let time = 0;

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw aurora
      time += 0.005;
      auroraColors.forEach((color, i) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.3);
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = canvas.height * 0.3 + 
            Math.sin(x * 0.003 + time + i) * 50 +
            Math.sin(x * 0.007 + time * 1.5) * 30;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, 0);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      });

      // Draw stars with twinkling
      stars.forEach((star) => {
        star.opacity = 0.3 + Math.sin(time * 2 + star.x) * 0.5;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Subtle movement
        star.y += star.speed * 0.1;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw and update shooting stars
      createShootingStar();
      shootingStars.forEach((star, index) => {
        if (!star.active) return;

        const gradient = ctx.createLinearGradient(
          star.x, star.y, 
          star.x - star.length * 0.7, star.y - star.length * 0.7
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.length * 0.7, star.y - star.length * 0.7);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        star.x += star.speed;
        star.y += star.speed;
        star.opacity -= 0.02;

        if (star.opacity <= 0 || star.x > canvas.width || star.y > canvas.height) {
          shootingStars.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 dark:opacity-100 opacity-0 transition-opacity duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  );
};

export default StarryBackground;
