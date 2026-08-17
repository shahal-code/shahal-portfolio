import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
    children,
    className = "",
    spotlightColor = "rgba(139, 92, 246, 0.25)", // Default primary purple
    ...props
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);

    const rafId = useRef<number | null>(null);

    const updateSpotlight = (x: number, y: number, opacity: number) => {
        if (!spotlightRef.current) return;
        spotlightRef.current.style.opacity = opacity.toString();
        spotlightRef.current.style.background = `radial-gradient(500px circle at ${x}px ${y}px, ${spotlightColor}, transparent 40%)`;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;

        if (rafId.current !== null) cancelAnimationFrame(rafId.current);
        rafId.current = requestAnimationFrame(() => {
            updateSpotlight(clientX - rect.left, clientY - rect.top, 1);
        });
    };

    const handleMouseEnter = () => {
        if (spotlightRef.current) spotlightRef.current.style.willChange = "background, opacity";
    };

    const handleMouseLeave = () => {
        if (rafId.current !== null) cancelAnimationFrame(rafId.current);
        updateSpotlight(0, 0, 0);
        if (spotlightRef.current) spotlightRef.current.style.willChange = "auto";
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative overflow-hidden",
                className
            )}
            {...props}
        >
            {/* Spotlight overlay */}
            <div
                ref={spotlightRef}
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10"
                style={{
                    background: `radial-gradient(500px circle at 0px 0px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            {/* Content */}
            <div className="relative z-20 h-full w-full">{children}</div>
        </div>
    );
};

export default SpotlightCard;
