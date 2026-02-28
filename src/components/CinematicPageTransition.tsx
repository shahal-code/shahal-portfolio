import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface CinematicPageTransitionProps {
    children: React.ReactNode;
}

const CinematicPageTransition: React.FC<CinematicPageTransitionProps> = ({ children }) => {
    const location = useLocation();
    const isMobile = useIsMobile();

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
                    duration: isMobile ? 0.4 : 1.2,
                    ease: isMobile ? "easeOut" : [0.22, 1, 0.36, 1],
                    // Spring for scale and movement to feel physical
                    scale: isMobile ? { duration: 0.4 } : { type: "spring", stiffness: 60, damping: 15 },
                    y: isMobile ? { duration: 0.4 } : { type: "spring", stiffness: 60, damping: 15 },
                    // Lighting filters use the base duration
                    filter: { duration: isMobile ? 0.1 : 0.8 }
                }}
                className="w-full relative origin-center lens-focus"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default CinematicPageTransition;
