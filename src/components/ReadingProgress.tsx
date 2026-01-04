import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollPercentage(Math.round(latest * 100));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-success origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Floating Progress Indicator */}
      <motion.div
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        {/* Vertical Track */}
        <div className="relative h-32 w-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-secondary rounded-full"
            style={{ height: `${scrollPercentage}%` }}
          />
        </div>

        {/* Percentage Badge */}
        <motion.div
          className="bg-card/90 backdrop-blur-sm border border-border rounded-full px-2 py-1 shadow-lg"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-xs font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {scrollPercentage}%
          </span>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ReadingProgress;
