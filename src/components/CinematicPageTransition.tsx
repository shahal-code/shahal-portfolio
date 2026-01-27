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
                    clipPath: "inset(0 0 0 100%)",
                }}
                animate={{
                    clipPath: "inset(0 0 0 0)",
                }}
                exit={{
                    clipPath: "inset(0 100% 0 0)",
                }}
                transition={{
                    duration: 1.0,
                    ease: [0.7, 0, 0.3, 1],
                }}
                className="w-full relative origin-center lens-focus"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default CinematicPageTransition;
