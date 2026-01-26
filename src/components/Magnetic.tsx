import React, { useRef, useState, useEffect } from 'react';

interface MagneticProps {
    children: React.ReactElement;
    strength?: number;
    className?: string;
}

const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.3, className = "" }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMove = (clientX: number, clientY: number) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * strength;
        const y = (clientY - (top + height / 2)) * strength;
        setPosition({ x, y });
    };

    const handleReset = () => {
        setPosition({ x: 0, y: 0 });
    };

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        const onTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            handleMove(touch.clientX, touch.clientY);
        };

        node.addEventListener("mousemove", onMouseMove);
        node.addEventListener("mouseleave", handleReset);
        node.addEventListener("touchstart", (e) => {
            const touch = e.touches[0];
            handleMove(touch.clientX, touch.clientY);
        }, { passive: true });
        node.addEventListener("touchmove", onTouchMove, { passive: true });
        node.addEventListener("touchend", handleReset);

        return () => {
            node.removeEventListener("mousemove", onMouseMove);
            node.removeEventListener("mouseleave", handleReset);
            node.removeEventListener("touchmove", onTouchMove);
            node.removeEventListener("touchend", handleReset);
        };
    }, [strength]);

    const { x, y } = position;

    return (
        <div
            ref={ref}
            className={`inline-block transition-transform duration-100 ease-out ${className}`}
            style={{
                transform: `translate3d(${x}px, ${y}px, 0)`,
                willChange: 'transform'
            }}
        >
            {children}
        </div>
    );
};

export default Magnetic;
