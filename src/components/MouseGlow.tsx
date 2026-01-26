import { useEffect, useState } from "react";

const MouseGlow = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only enable on non-touch devices with sufficient width
        const checkMobile = () => {
            setIsVisible(window.innerWidth >= 1024 && !('ontouchstart' in window));
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        const handleMouseMove = (e: MouseEvent) => {
            if (isVisible) setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", checkMobile);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div
            className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
            style={{
                background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--mouse-glow), transparent 80%)`,
            }}
        />
    );
};

export default MouseGlow;
