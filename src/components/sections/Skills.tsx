
import { motion, useReducedMotion } from "framer-motion";

import { SKILLS } from "@/constants";
import IconRenderer from "@/components/common/IconRenderer";

import {
    Layout,
    Server,
    Database,
    Cloud,
    Wrench,
} from "lucide-react";

// ======================================================
// SKILL GROUPS
// ======================================================

const SECTION_GROUPS = [
    {
        id: "frontend",
        title: "Frontend & Mobile",
        subtitle: "Client interfaces, state management & reactive UIs",
        icon: Layout,
        categories: ["Frontend", "Styling", "Mobile"],
    },
    {
        id: "backend",
        title: "Backend & Systems",
        subtitle: "REST APIs, authentication & scalable services",
        icon: Server,
        categories: ["Backend"],
    },
    {
        id: "database",
        title: "Databases & Storage",
        subtitle: "Relational SQL, NoSQL & in-memory caching",
        icon: Database,
        categories: ["Database"],
    },
    {
        id: "devops",
        title: "DevOps & Cloud",
        subtitle: "Containers, reverse proxies & deployment",
        icon: Cloud,
        categories: ["DevOps"],
    },
    {
        id: "tools",
        title: "Tools & Workflow",
        subtitle: "Version control, API testing & design prototyping",
        icon: Wrench,
        categories: ["Tools", "Design"],
    },
];

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

            {/* ==================================================
                AMBIENT BACKGROUND
            ================================================== */}

            <div
                className="
                    absolute top-1/4 -left-40
                    w-80 h-80 rounded-full
                    bg-blue-500/[0.05]
                    blur-[90px]
                    pointer-events-none
                "
            />

            <div
                className="
                    absolute bottom-1/4 -right-40
                    w-80 h-80 rounded-full
                    bg-purple-500/[0.05]
                    blur-[90px]
                    pointer-events-none
                "
            />

            <div className="container relative mx-auto px-6 md:px-12 max-w-6xl">

                {/* ==================================================
                    SECTION HEADER
                ================================================== */}

                <motion.div
                    className="mb-16 md:mb-24"
                    initial={
                        shouldReduceMotion
                            ? false
                            : { opacity: 0, y: 20 }
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
                        The technologies and tools I use to transform ideas into
                        scalable digital experiences.
                    </p>

                </motion.div>

                {/* ==================================================
                    SKILL CATEGORIES
                ================================================== */}

                <div className="space-y-5">

                    {SECTION_GROUPS.map((group, index) => {

                        const groupSkills = SKILLS.filter((skill) =>
                            group.categories.includes(skill.category)
                        );

                        if (groupSkills.length === 0) return null;

                        const GroupIcon = group.icon;

                        return (

                            <motion.div
                                key={group.id}

                                initial={
                                    shouldReduceMotion
                                        ? false
                                        : { opacity: 0, y: 20 }
                                }

                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}

                                viewport={{
                                    once: true,
                                    amount: 0.1,
                                }}

                                transition={{
                                    duration: 0.45,
                                    ease: "easeOut",
                                }}

                                className="relative group/category"
                            >

                                {/* CATEGORY CARD */}

                                <div className="
                                    relative
                                    grid grid-cols-1
                                    md:grid-cols-[0.8fr_1.5fr]
                                    gap-8 md:gap-12
                                    p-6 md:p-9
                                    rounded-2xl
                                    border border-white/[0.07]
                                    bg-white/[0.025]
                                    transition-colors duration-200
                                    md:hover:border-white/[0.16]
                                    md:hover:bg-white/[0.04]
                                ">

                                    {/* ==================================================
                                        CATEGORY INFORMATION
                                    ================================================== */}

                                    <div className="flex items-start gap-4">

                                        <span className="
                                            text-xs font-mono
                                            text-muted-foreground/50
                                            pt-1
                                        ">
                                            0{index + 1}
                                        </span>

                                        <div>

                                            <div className="flex items-center gap-3 mb-3">

                                                <div className="
                                                    w-9 h-9 rounded-xl
                                                    flex items-center justify-center
                                                    border border-white/10
                                                    bg-white/[0.04]
                                                    transition-colors duration-200
                                                    md:group-hover/category:border-blue-400/30
                                                    md:group-hover/category:bg-blue-400/[0.08]
                                                ">

                                                    <GroupIcon className="
                                                        w-4 h-4
                                                        text-muted-foreground
                                                        transition-colors duration-200
                                                        md:group-hover/category:text-blue-400
                                                    " />

                                                </div>

                                                <h3 className="
                                                    text-lg md:text-xl
                                                    font-bold
                                                    text-foreground
                                                    tracking-tight
                                                ">
                                                    {group.title}
                                                </h3>

                                            </div>

                                            <p className="
                                                text-xs md:text-sm
                                                text-muted-foreground
                                                leading-relaxed
                                                max-w-xs
                                            ">
                                                {group.subtitle}
                                            </p>

                                        </div>

                                    </div>

                                    {/* ==================================================
                                        SKILL TAGS
                                    ================================================== */}

                                    <div className="
                                        flex flex-wrap
                                        items-center
                                        gap-3 md:gap-4
                                    ">

                                        {groupSkills.map((skill) => (

                                            <div
                                                key={skill.name}

                                                className="
                                                    relative inline-flex
                                                    items-center gap-2.5
                                                    px-4 py-2.5
                                                    rounded-xl

                                                    border border-white/[0.09]
                                                    bg-white/[0.04]

                                                    transition-colors duration-200

                                                    md:hover:border-blue-400/40
                                                    md:hover:bg-white/[0.08]

                                                    cursor-default
                                                    group/skill
                                                "
                                            >

                                                {/* SKILL ICON */}

                                                <div className="
                                                    relative
                                                    w-4 h-4
                                                    flex items-center justify-center
                                                    opacity-80
                                                    transition-opacity duration-200
                                                    md:group-hover/skill:opacity-100
                                                ">

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

                                                <span className="
                                                    relative
                                                    text-xs md:text-sm
                                                    font-medium
                                                    text-foreground
                                                    whitespace-nowrap
                                                ">
                                                    {skill.name}
                                                </span>

                                                {/* BOTTOM HIGHLIGHT */}

                                                <span className="
                                                    absolute
                                                    bottom-0 left-4 right-4
                                                    h-px
                                                    bg-gradient-to-r
                                                    from-transparent
                                                    via-blue-400/50
                                                    to-transparent
                                                    opacity-0
                                                    transition-opacity duration-200
                                                    md:group-hover/skill:opacity-100
                                                " />

                                            </div>

                                        ))}

                                    </div>

                                </div>

                            </motion.div>

                        );

                    })}

                </div>

                {/* ==================================================
                    BOTTOM LABEL
                ================================================== */}

                <motion.div
                    initial={
                        shouldReduceMotion
                            ? false
                            : { opacity: 0 }
                    }

                    whileInView={{
                        opacity: 1,
                    }}

                    viewport={{
                        once: true,
                    }}

                    transition={{
                        duration: 0.5,
                    }}

                    className="
                        mt-12
                        flex items-center justify-center gap-3
                    "
                >

                    <span className="w-8 h-px bg-white/20" />

                    <span className="
                        text-[10px] font-mono
                        uppercase tracking-[0.25em]
                        text-muted-foreground/60
                    ">
                        Always Learning · Always Building
                    </span>

                    <span className="w-8 h-px bg-white/20" />

                </motion.div>

            </div>

        </section>
    );
};

export default Skills;
