import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Scroll3DWrapperProps {
    children: ReactNode;
    className?: string;
}

const Scroll3DWrapper = ({ children, className = "" }: Scroll3DWrapperProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Neutralize animations by returning constant values
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 0]);
    const filter = "none";
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

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
                willChange: "transform, opacity, filter"
            }}
            className={`relative w-full z-10 flex flex-col items-center perspective-1000 ${className}`}
        >
            <div className="w-full h-full transform-gpu">
                {children}
            </div>
        </motion.div>
    );
};

export default Scroll3DWrapper;
