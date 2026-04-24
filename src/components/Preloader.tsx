import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] bg-[#030014] flex flex-col items-center justify-center"
        >
          {/* S Logo with Glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative mb-12"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse-slow" />
            <img 
              src="/loader-logo.png" 
              alt="Loading" 
              className="w-32 h-32 md:w-40 md:h-40 object-contain relative z-10"
            />
          </motion.div>

          {/* Loading Bar Container */}
          <div className="w-64 md:w-80 h-1.5 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
            {/* Dynamic Progress Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-x"
            />
          </div>

          {/* Percentage Text */}
          <motion.div 
            className="mt-4 text-primary font-mono font-bold tracking-widest text-sm"
          >
            {Math.round(progress)}%
          </motion.div>

          {/* Loading Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-8 text-muted-foreground/60 text-[10px] uppercase tracking-[0.3em] font-bold"
          >
            Initializing Portfolio Systems
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
