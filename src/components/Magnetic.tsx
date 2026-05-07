import React, { useRef, useState, useEffect } from 'react';

interface MagneticProps {
    children: React.ReactElement;
    strength?: number;
    className?: string;
}

const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.3, className = "" }) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const node = ref.current;
        if (!node || window.innerWidth < 768) return;

        const handleMove = (clientX: number, clientY: number) => {
            const { left, top, width, height } = node.getBoundingClientRect();
            const x = (clientX - (left + width / 2)) * strength;
            const y = (clientY - (top + height / 2)) * strength;
            node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        };

        const handleReset = () => {
            node.style.transform = `translate3d(0, 0, 0)`;
        };

        const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        const onTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            handleMove(touch.clientX, touch.clientY);
        };

        node.addEventListener("mousemove", onMouseMove);
        node.addEventListener("mouseleave", handleReset);
        node.addEventListener("touchmove", onTouchMove, { passive: true });
        node.addEventListener("touchend", handleReset);

        return () => {
            node.removeEventListener("mousemove", onMouseMove);
            node.removeEventListener("mouseleave", handleReset);
            node.removeEventListener("touchmove", onTouchMove);
            node.removeEventListener("touchend", handleReset);
        };
    }, [strength]);

    return (
        <div
            ref={ref}
            className={`inline-block transition-transform duration-150 ease-out ${className}`}
            style={{
                willChange: 'transform'
            }}
        >
            {children}
        </div>
    );
};

export default Magnetic;
