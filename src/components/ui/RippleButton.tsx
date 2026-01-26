import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface Ripple {
    x: number;
    y: number;
    id: number;
}

const RippleButton: React.FC<RippleButtonProps> = ({ children, className, onClick, ...props }) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const [isJumping, setIsJumping] = useState(false);

    useEffect(() => {
        if (ripples.length > 0) {
            const timer = setTimeout(() => {
                setRipples((prevRipples) => prevRipples.slice(1));
            }, 800); // Duration matches the liquid-splash animation time

            return () => clearTimeout(timer);
        }
    }, [ripples]);

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        // Create multiple splash droplets for a more "liquid" feel
        const splashCount = 3;
        const newRipples = [];

        for (let i = 0; i < splashCount; i++) {
            const x = event.clientX - rect.left - size / 2 + (Math.random() - 0.5) * 20;
            const y = event.clientY - rect.top - size / 2 + (Math.random() - 0.5) * 20;
            newRipples.push({ x, y, id: Date.now() + i });
        }

        setRipples((prevRipples) => [...prevRipples, ...newRipples]);

        // Trigger the "jump" animation
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 600);

        if (onClick) {
            onClick(event);
        }
    };

    return (
        <button
            className={cn(
                "relative overflow-hidden transition-transform",
                isJumping && "animate-water-jump",
                className
            )}
            onClick={createRipple}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className="absolute rounded-full bg-primary/40 animate-liquid-splash pointer-events-none"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: '100px', // Fixed size, scale handles the growth
                        height: '100px',
                        marginLeft: '-50px',
                        marginTop: '-50px',
                        willChange: "transform, opacity",
                        transform: "scale(0) translateZ(0)",
                        backfaceVisibility: "hidden"
                    }}
                />
            ))}
        </button>
    );
};

export default RippleButton;
