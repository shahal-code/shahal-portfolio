import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface Scroll3DWrapperProps {
    children: ReactNode;
    className?: string;
}

const Scroll3DWrapper = ({ children, className = "" }: Scroll3DWrapperProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    // Track the scroll progress of THIS specific section within the viewport
    // offset: ["start end", "end start"] means it starts tracking when the top of the element hits the bottom of the viewport
    // and stops when the bottom of the element hits the top of the viewport.
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Mapping scrollYProgress (0 to 1):
    // 0.0 - 0.2: Entering the screen from bottom (Emerging from background)
    // 0.2 - 0.7: Reading Zone (Locked at scale 1, sharp, no translation)
    // 0.7 - 1.0: Exiting the screen from top (Flying past the camera)

    // Scale
    // Mobile: less aggressive scaling to prevent layout issues
    const scale = useTransform(
        scrollYProgress,
        [0, 0.2, 0.7, 1],
        [0.95, 1, 1, isMobile ? 1.1 : 2.5]
    );

    // Y Translation (Fly up)
    const y = useTransform(
        scrollYProgress,
        [0, 0.2, 0.7, 1],
        [50, 0, 0, isMobile ? -50 : -250]
    );

    // Blur (Camera Lens Depth of Field)
    const blurValue = useTransform(
        scrollYProgress,
        [0, 0.2, 0.7, 1],
        [10, 0, 0, isMobile ? 5 : 25]
    );

    // Apply blur filter. Disable entirely on mobile if performance becomes an issue, but we'll try it first
    const filter = useTransform(blurValue, (v) => isMobile ? 'none' : `blur(${v}px)`);

    // Opacity
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.15, 0.75, 1],
        [0, 1, 1, 0]
    );

    // Z-Axis perspective to enforce hardware acceleration and 3D rendering context
    // This helps prevent jittering during the aggressive scale phase
    const transform = useTransform(
        [scale, y],
        ([s, yVal]) => `translate3d(0, ${yVal}px, 0) scale(${s})`
    );

    return (
        <motion.div
            ref={ref}
            style={{
                opacity,
                filter,
                transform,
                willChange: "transform, opacity, filter" // Hint to browser for performance
            }}
            className={`relative w-full z-10 flex flex-col items-center perspective-1000 ${className}`}
        >
            {/* Container inside motion to prevent layout thrashing */}
            <div className="w-full h-full transform-gpu">
                {children}
            </div>
        </motion.div>
    );
};

export default Scroll3DWrapper;
