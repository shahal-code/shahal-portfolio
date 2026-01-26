import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import React from "react";

interface CinematicPageTransitionProps {
    children: React.ReactNode;
}

const CinematicPageTransition: React.FC<CinematicPageTransitionProps> = ({ children }) => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{
                    opacity: 0,
                    scale: 1.15,
                    y: 20,
                    filter: "blur(30px) brightness(1.5) saturate(1.8)"
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    filter: "blur(0px) brightness(1) saturate(1)"
                }}
                exit={{
                    opacity: 0,
                    scale: 0.85,
                    y: -20,
                    filter: "blur(30px) brightness(1.5) saturate(1.8)"
                }}
                transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                    // Spring for scale and movement to feel physical
                    scale: { type: "spring", stiffness: 60, damping: 15 },
                    y: { type: "spring", stiffness: 60, damping: 15 },
                    // Lighting filters use the base duration
                    filter: { duration: 0.8 }
                }}
                className="w-full relative origin-center"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default CinematicPageTransition;
