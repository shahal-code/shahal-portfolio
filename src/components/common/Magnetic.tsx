import React, { useRef, useEffect } from 'react';
import { useLowPerformanceMode } from "@/hooks/usePerformanceMode";

interface MagneticProps {
    children: React.ReactElement;
    strength?: number;
    className?: string;
}

const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.3, className = "" }) => {
    const ref = useRef<HTMLDivElement>(null);
    const lowPerformance = useLowPerformanceMode();

    useEffect(() => {
        if (lowPerformance) return;
        // Don't bind on touch devices to preserve buttery smooth touch scrolling
        if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
            return;
        }

        const node = ref.current;
        if (!node) return;

        let rafId: number | null = null;

        const handleMove = (clientX: number, clientY: number) => {
            if (rafId !== null) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const rect = node.getBoundingClientRect();
                const x = (clientX - (rect.left + rect.width / 2)) * strength;
                const y = (clientY - (rect.top + rect.height / 2)) * strength;
                node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            });
        };

        const handleMouseEnter = () => {
            node.style.willChange = 'transform';
        };

        const handleReset = () => {
            if (rafId !== null) cancelAnimationFrame(rafId);
            node.style.transform = `translate3d(0, 0, 0)`;
            node.style.willChange = 'auto';
        };

        const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);

        node.addEventListener("mouseenter", handleMouseEnter);
        node.addEventListener("mousemove", onMouseMove);
        node.addEventListener("mouseleave", handleReset);

        return () => {
            if (rafId !== null) cancelAnimationFrame(rafId);
            node.removeEventListener("mouseenter", handleMouseEnter);
            node.removeEventListener("mousemove", onMouseMove);
            node.removeEventListener("mouseleave", handleReset);
        };
    }, [strength, lowPerformance]);

    return (
        <div
            ref={ref}
            className={`inline-block ${lowPerformance ? "" : "transition-transform duration-150 ease-out"} ${className}`}
        >
            {children}
        </div>
    );
};

export default Magnetic;
