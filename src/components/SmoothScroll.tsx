import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = () => {
    useEffect(() => {
        // Initialize Lenis for buttery smooth scrolling
        const lenis = new Lenis({
            duration: 1.5, // Heavier, "luxury" feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
            lerp: 0.1,
            smoothWheel: true
        });

        // Force scroll to top on refresh if no hash is present
        if (!window.location.hash) {
            lenis.scrollTo(0, { immediate: true });
        }

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return null; // This component handles side effects only
};

export default SmoothScroll;
