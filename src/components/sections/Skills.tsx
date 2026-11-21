import { motion, useReducedMotion } from "framer-motion";

import { SKILLS } from "@/constants";
import IconRenderer from "@/components/common/IconRenderer";
import type { CSSProperties } from "react";

// ======================================================
// SKILLS COMPONENT
// ======================================================

const Skills = () => {
    const shouldReduceMotion = useReducedMotion();

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

                        return (
                            <div
                                key={skill.name}
                                className={`
                                    skill-float
                                    ${shouldReduceMotion ? "motion-disabled" : ""}
                                `}
                                style={floatStyle}
                            >
                                {/* PILL */}

                                <div className="skill-glass-pill relative inline-flex items-center gap-3 px-5 py-3 md:px-6 md:py-3.5 rounded-full cursor-default select-none overflow-hidden transition-all duration-300">

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
                        );
                    })}

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
