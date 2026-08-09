import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = () => {
    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isMobile = window.innerWidth < 768;

        if (isTouchDevice || isMobile) {
            return;
        }

        // Initialize Lenis for buttery smooth scrolling only on desktop
        const lenis = new Lenis({
            duration: 1.0, // Snappier
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            lerp: 0.15, // Higher for more responsiveness
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
