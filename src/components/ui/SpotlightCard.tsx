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

    const updateSpotlight = (x: number, y: number, opacity: number) => {
        if (!spotlightRef.current) return;
        spotlightRef.current.style.opacity = opacity.toString();
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${spotlightColor}, transparent 40%)`;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        updateSpotlight(e.clientX - rect.left, e.clientY - rect.top, 1);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const touch = e.touches[0];
        const rect = divRef.current.getBoundingClientRect();
        updateSpotlight(touch.clientX - rect.left, touch.clientY - rect.top, 1);
    };

    const handleMouseEnter = () => updateSpotlight(0, 0, 1);
    const handleMouseLeave = () => updateSpotlight(0, 0, 0);

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchStart={(e) => {
                handleTouchMove(e);
            }}
            onTouchEnd={handleMouseLeave}
            className={cn(
                "relative overflow-hidden",
                className
            )}
            {...props}
        >
            {/* Spotlight overlay */}
            <div
                ref={spotlightRef}
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10 will-change-[background,opacity]"
                style={{
                    background: `radial-gradient(600px circle at 0px 0px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            {/* Content */}
            <div className="relative z-20 h-full w-full">{children}</div>
        </div>
    );
};

export default SpotlightCard;
