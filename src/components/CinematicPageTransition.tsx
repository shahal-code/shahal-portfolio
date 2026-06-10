import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLowPerformanceMode } from "@/hooks/usePerformanceMode";

interface CinematicPageTransitionProps {
    children: React.ReactNode;
}

const CinematicPageTransition: React.FC<CinematicPageTransitionProps> = ({ children }) => {
    const location = useLocation();
    const isMobile = useIsMobile();
    const isLowPerformance = useLowPerformanceMode();

    if (isLowPerformance) {
        return <>{children}</>;
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{
                    opacity: 0,
                    scale: isMobile ? 1 : 1.15,
                    y: isMobile ? 10 : 20,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                }}
                exit={{
                    opacity: 0,
                    scale: isMobile ? 1 : 0.85,
                    y: isMobile ? -10 : -20,
                }}
                transition={{
                    duration: isMobile ? 0.6 : 2.0,
                    ease: isMobile ? "easeOut" : [0.22, 1, 0.36, 1],
                    // Spring for scale and movement to feel physical but slower
                    scale: isMobile ? { duration: 0.6 } : { type: "spring", stiffness: 30, damping: 20 },
                    y: isMobile ? { duration: 0.6 } : { type: "spring", stiffness: 30, damping: 20 },
                    // Lighting filters use the base duration
                    filter: { duration: isMobile ? 0.2 : 1.5 }
                }}
                className="w-full relative origin-center lens-focus"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default CinematicPageTransition;
