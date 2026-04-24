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
    scale: number;
}

const RippleButton: React.FC<RippleButtonProps> = ({ children, className, onClick, ...props }) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const [isJumping, setIsJumping] = useState(false);

    useEffect(() => {
        if (ripples.length > 0) {
            const timer = setTimeout(() => {
                setRipples((prevRipples) => prevRipples.filter(r => Date.now() - r.id < 800));
            }, 800);

            return () => clearTimeout(timer);
        }
    }, [ripples]);

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        
        // Create multiple splash droplets for a more "liquid" feel
        const splashCount = 4;
        const newRipples = [];

        for (let i = 0; i < splashCount; i++) {
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            newRipples.push({ 
                x, 
                y, 
                id: Date.now() + i,
                scale: 1 + Math.random() * 0.5,
                xOffset: (Math.random() - 0.5) * 40,
                yOffset: (Math.random() - 0.5) * 40
            });
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
            
            {/* The Gooey Ripples Layer */}
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{ filter: "url(#goo)" }}
            >
                {ripples.map((ripple) => (
                    <span
                        key={ripple.id}
                        className="absolute rounded-full bg-primary/60 animate-liquid-splash"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: '40px',
                            height: '40px',
                            marginLeft: '-20px',
                            marginTop: '-20px',
                            willChange: "transform, opacity",
                            "--x-offset": `${ripple.xOffset}px`,
                            "--y-offset": `${ripple.yOffset}px`,
                            transform: `scale(${ripple.scale}) translateZ(0)`,
                        } as React.CSSProperties}
                    />
                ))}
            </div>
        </button>
    );
};

export default RippleButton;
