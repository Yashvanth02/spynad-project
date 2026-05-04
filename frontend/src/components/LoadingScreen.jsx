import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const slashVariants = {
  initial: { scaleY: 0, opacity: 0 },
  animate: (i) => ({
    scaleY: 1,
    opacity: [0, 1, 1, 0],
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2200;
    const startedAt = performance.now();
    let frame;

    const updateProgress = (now) => {
      const elapsed = now - startedAt;
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100));

      setProgress(nextProgress);

      if (nextProgress < 100) {
        frame = requestAnimationFrame(updateProgress);
      }
    };

    frame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        clipPath: "inset(0 0 100% 0)",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
      role="status"
      aria-label="Loading Spynad"
    >
      <div className="loading-grid" aria-hidden="true" />
      <div className="loading-scanline" aria-hidden="true" />

      <div className="loading-center-stack">
        <motion.div
          className="loading-logo-wrap"
          initial={{ scale: 0.86, opacity: 0, filter: "blur(14px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="/SPYNAD logo.png"
            alt="Spynad logo"
            className="loading-logo"
            initial={{ y: 18 }}
            animate={{ y: [18, 0, 0, -10], scale: [1, 1.03, 1.03, 0.98] }}
            transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="loading-ring"
            initial={{ scale: 0.65, opacity: 0 }}
            animate={{ scale: [0.65, 1.12, 1.28], opacity: [0, 0.7, 0] }}
            transition={{ duration: 1.55, delay: 0.35, ease: "easeOut" }}
          />
        </motion.div>

        <motion.div
          className="loading-progress"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <div className="loading-progress-meta">
            <span>INITIALIZING</span>
            <span>{progress}%</span>
          </div>
          <div className="loading-progress-track" aria-hidden="true">
            <motion.div
              className="loading-progress-fill"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.12, ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>

      <div className="loading-slashes" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((item) => (
          <motion.span key={item} custom={item} variants={slashVariants} initial="initial" animate="animate" />
        ))}
      </div>

      <motion.div
        className="loading-copy"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <span>SPYNAD</span>
        <span>OPENING</span>
      </motion.div>
    </motion.div>
  );
}
