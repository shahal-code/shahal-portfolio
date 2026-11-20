import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import React from "react";
import { useLowPerformanceMode } from "@/hooks/usePerformanceMode";

interface CinematicPageTransitionProps {
    children: React.ReactNode;
}

const CinematicPageTransition: React.FC<CinematicPageTransitionProps> = ({ children }) => {
    const location = useLocation();
    const isLowPerformance = useLowPerformanceMode();

    if (isLowPerformance) {
        return <>{children}</>;
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full relative"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default CinematicPageTransition;
