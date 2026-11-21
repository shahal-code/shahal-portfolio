import { motion, useReducedMotion } from "framer-motion";

import { SKILLS } from "@/constants";
import IconRenderer from "@/components/common/IconRenderer";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";

// ======================================================
// SKILLS COMPONENT
// ======================================================

const Skills = () => {
    const shouldReduceMotion = useReducedMotion();
    const dragRef = useRef<{
        name: string;
        startX: number;
        startY: number;
        baseX: number;
        baseY: number;
    } | null>(null);
    const [activeSkill, setActiveSkill] = useState<string | null>(null);
    const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() => {
        try {
            const saved = localStorage.getItem("portfolio-skill-positions");
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

    const positionsRef = useRef(positions);

    const savePositions = (next: Record<string, { x: number; y: number }>) => {
        positionsRef.current = next;
        setPositions(next);
        try {
            localStorage.setItem("portfolio-skill-positions", JSON.stringify(next));
        } catch {
            // Position persistence is an enhancement; dragging still works in memory.
        }
    };

    const toggleMoving = (
        skillName: string,
        event: ReactMouseEvent<HTMLDivElement>
    ) => {
        if (activeSkill === skillName) {
            dragRef.current = null;
            setActiveSkill(null);
            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const position = positionsRef.current[skillName] ?? {
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY,
        };
        dragRef.current = {
            name: skillName,
            startX: event.clientX,
            startY: event.clientY,
            baseX: position.x,
            baseY: position.y,
        };
        savePositions({
            ...positionsRef.current,
            [skillName]: { x: position.x, y: position.y },
        });
        setActiveSkill(skillName);
    };

    useEffect(() => {
        const handlePointerMove = (event: PointerEvent) => {
            const drag = dragRef.current;
            if (!drag) return;

            const width = document.documentElement.scrollWidth;
            const height = document.documentElement.scrollHeight;
            const nextX = Math.max(
                8,
                Math.min(width - 160, drag.baseX + event.clientX - drag.startX)
            );
            const nextY = Math.max(
                8,
                Math.min(height - 48, drag.baseY + event.clientY - drag.startY)
            );

            savePositions({
                ...positionsRef.current,
                [drag.name]: { x: nextX, y: nextY },
            });
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                dragRef.current = null;
                setActiveSkill(null);
            }
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const resetPositions = () => {
        savePositions({});
    };

    return (
        <section
            id="skills"
            className="
                relative min-h-screen w-full
                flex flex-col justify-center items-center
                z-20 bg-transparent
                py-24 md:py-32
                overflow-hidden
            "
        >
            {/* AMBIENT BACKGROUND */}

            <div className="
                absolute top-1/4 -left-40
                w-72 h-72 rounded-full
                bg-blue-500/[0.05]
                blur-[80px]
                pointer-events-none
            " />

            <div className="
                absolute bottom-1/4 -right-40
                w-72 h-72 rounded-full
                bg-purple-500/[0.05]
                blur-[80px]
                pointer-events-none
            " />

            <div className="
                container relative mx-auto
                px-6 md:px-12 max-w-6xl
            ">

                {/* HEADER */}

                <motion.div
                    className="mb-16 md:mb-20"
                    initial={
                        shouldReduceMotion
                            ? false
                            : { opacity: 0, y: 15 }
                    }
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                    }}
                >
                    <span className="
                        text-xs font-mono uppercase
                        tracking-[0.3em]
                        text-muted-foreground
                        block mb-4
                    ">
                        03 / Technology Stack
                    </span>

                    <h2 className="
                        text-4xl md:text-6xl
                        font-bold tracking-tight
                        text-foreground
                    ">
                        Core{" "}
                        <span className="
                            text-transparent
                            bg-clip-text
                            bg-gradient-to-r
                            from-white 
                        ">
                            Proficiencies.
                        </span>
                    </h2>

                    <p className="
                        mt-5 text-sm md:text-base
                        text-muted-foreground
                        max-w-xl leading-relaxed
                    ">
                        The technologies and tools I use to transform ideas
                        into scalable digital experiences.
                    </p>
                </motion.div>

                {/* FLOATING SKILLS */}

                <div className="
                    relative
                    flex flex-wrap
                    items-center justify-center
                    gap-4 md:gap-6
                    py-10 md:py-16
                ">

                    {SKILLS.map((skill, index) => {

                        const floatX = ((index % 3) - 1) * 10;
                        const floatY = ((index % 4) - 1.5) * 9;

                        const floatDuration = 6 + (index % 4);

                        const floatStyle = {
                            "--float-x": `${floatX}px`,
                            "--float-y": `${floatY}px`,
                            "--float-duration": `${floatDuration}s`,
                            "--float-delay": `${(index % 7) * -0.6}s`,
                        } as CSSProperties;
                        const position = positions[skill.name] ?? { x: 0, y: 0 };
                        const isActive = activeSkill === skill.name;
                        const isPlaced = Boolean(
                            positionsRef.current[skill.name] &&
                            (positionsRef.current[skill.name].x !== 0 ||
                                positionsRef.current[skill.name].y !== 0)
                        );

                        const skillElement = (
                            <div
                                key={skill.name}
                                className={`
                                    relative
                                    ${isActive ? "z-50 cursor-grabbing" : "z-10 cursor-grab"}
                                `}
                                style={isPlaced ? {
                                    position: "absolute",
                                    left: position.x,
                                    top: position.y,
                                    zIndex: isActive ? 1000 : 40,
                                } : undefined}
                                onDoubleClick={(event) => toggleMoving(skill.name, event)}
                                onKeyDown={(event) => {
                                    if (event.key === "Escape" && isActive) {
                                        dragRef.current = null;
                                        setActiveSkill(null);
                                    }
                                }}
                                tabIndex={0}
                                role="button"
                                aria-label={`${skill.name}. Double click to move, double click again to place.`}
                            >
                                <div
                                    className={`
                                        skill-float
                                        ${shouldReduceMotion ? "motion-disabled" : ""}
                                    `}
                                    style={floatStyle}
                                >
                                {/* PILL */}

                                <div className={`skill-glass-pill relative inline-flex items-center gap-3 px-5 py-3 md:px-6 md:py-3.5 rounded-full cursor-default select-none overflow-hidden transition-all duration-300 ${isActive ? "ring-2 ring-blue-400/70 scale-105" : ""}`}>

                                    {/* GLASS REFLECTION */}
                                    <span className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-br from-white/[0.13] via-white/[0.025] to-blue-400/[0.06]" />

                                    {/* ICON */}
                                    <div className="relative z-10 w-5 h-5 flex items-center justify-center shrink-0 opacity-90">
                                        {typeof skill.icon === "string" ? (
                                            <IconRenderer
                                                name={skill.icon}
                                                className="w-full h-full"
                                            />
                                        ) : (
                                            <skill.icon />
                                        )}
                                    </div>

                                    {/* SKILL NAME */}
                                    <span className="relative z-10 text-xs md:text-sm font-medium text-foreground whitespace-nowrap">
                                        {skill.name}
                                    </span>

                                    {/* TOP GLASS HIGHLIGHT */}
                                    <span className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                                </div>
                                </div>
                            </div>
                        );

                        return isPlaced
                            ? createPortal(skillElement, document.body)
                            : skillElement;
                    })}

                </div>

                <div className="
                    -mt-4 mb-8
                    flex items-center justify-center
                    gap-3
                ">
                    <span className="
                        text-[10px] font-mono
                        uppercase tracking-[0.18em]
                        text-muted-foreground/60
                    ">
                        Double-click a skill to move it
                    </span>
                    {Object.keys(positions).length > 0 && (
                        <>
                            <span className="w-px h-3 bg-white/15" />
                            <button
                                type="button"
                                onClick={resetPositions}
                                className="
                                    text-[10px] font-mono uppercase tracking-[0.18em]
                                    text-muted-foreground/60
                                    transition-colors hover:text-foreground
                                "
                            >
                                Reset
                            </button>
                        </>
                    )}
                </div>

                {/* BOTTOM LABEL */}

                <div className="
                    mt-12
                    flex items-center
                    justify-center gap-3
                ">
                    <span className="w-8 h-px bg-white/20" />

                    <span className="
                        text-[10px] font-mono
                        uppercase tracking-[0.25em]
                        text-muted-foreground/60
                    ">
                        Always Learning · Always Building
                    </span>

                    <span className="w-8 h-px bg-white/20" />
                </div>

            </div>
        </section>
    );
};

export default Skills;
