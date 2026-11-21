import {
    useRef,
    useState,
    useLayoutEffect,
    useCallback,
} from "react";

import { createPortal } from "react-dom";

import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useMotionValueEvent,
    type MotionValue,
} from "framer-motion";

import { usePortfolioData } from "@/hooks/usePortfolioData";
import IconRenderer from "@/components/common/IconRenderer";

import { ArrowUpRight } from "lucide-react";

// ======================================================
// SERVICES DATA
// ======================================================

const SERVICE_DATA = [
    {
        id: "frontend",
        category: "Client Architecture & Modern Web",
        title: "Frontend Development",
        tagline:
            "Crafting beautiful, responsive, and high-performance user interfaces using React, Next.js, and TypeScript focusing on modern web standards.",
        skills: [
            "React",
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
            "HTML5",
            "CSS3",
        ],
        icon: "Layout",
    },
    {
        id: "backend",
        category: "Server Engineering & Distributed APIs",
        title: "Backend Development",
        tagline:
            "Building scalable server-side logic, enterprise authentication, and managing robust database systems with Node.js, Express, AWS, and MongoDB.",
        skills: [
            "Node.js",
            "Express",
            "MongoDB",
            "AWS",
            "REST API",
            "GraphQL",
            "Redis",
            "JWT",
        ],
        icon: "Server",
    },
    {
        id: "mobile",
        category: "Cross-Platform Mobile Engineering",
        title: "Mobile App Development",
        tagline:
            "Creating high-performance, cross-platform mobile applications using React Native for iOS and Android with platform-native feel and responsiveness.",
        skills: [
            "React Native",
            "TypeScript",
            "Firebase",
            "Redux",
            "Mobile UI",
            "Offline Sync",
        ],
        icon: "Zap",
    },
    {
        id: "mern",
        category: "End-to-End Full-Stack Product Engineering",
        title: "MERN Stack Development",
        tagline:
            "Building complete full-stack products from database architecture to polished user interfaces, focusing on security, performance, real-time features, and deployment.",
        skills: [
            "MongoDB",
            "Express",
            "React",
            "Node.js",
            "WebSockets",
            "Docker",
            "CI/CD",
        ],
        icon: "Code",
    },
] as const;

type Service = (typeof SERVICE_DATA)[number];

type DisplayService = Omit<
    Service,
    "title" | "tagline" | "skills"
> & {
    title: string;
    tagline: string;
    skills: string[];
};

// ======================================================
// MAIN SERVICES COMPONENT
// ======================================================

const Services = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { data } = usePortfolioData();

    const servicesList =
        data?.services?.length === SERVICE_DATA.length
            ? data.services
            : null;

    const [portalReady, setPortalReady] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);

    const frameTop = useMotionValue(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // ==================================================
    // FRAME POSITIONING
    // ==================================================

    useLayoutEffect(() => {
        const section = containerRef.current;

        if (!section) return;

        let sectionTop = 0;
        let sectionBottom = 0;

        let viewportHeight = window.innerHeight;

        let rafId = 0;

        const updateFramePosition = () => {
            const scrollY = window.scrollY;

            const normalTop =
                sectionTop - scrollY;

            const endTop =
                sectionBottom - scrollY - viewportHeight;

            // Before section: frame enters naturally.
            // Inside section: frame remains fixed.
            // After section: frame exits naturally.

            const nextTop = Math.max(
                normalTop,
                Math.min(0, endTop)
            );

            frameTop.set(nextTop);
        };

        const measureSection = () => {
            const rect = section.getBoundingClientRect();

            sectionTop = window.scrollY + rect.top;

            sectionBottom =
                sectionTop + section.offsetHeight;

            viewportHeight = window.innerHeight;

            updateFramePosition();
        };

        const handleScroll = () => {
            if (rafId) return;

            rafId = requestAnimationFrame(() => {
                rafId = 0;

                updateFramePosition();
            });
        };

        measureSection();

        setPortalReady(true);

        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            measureSection,
            { passive: true }
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );

            window.removeEventListener(
                "resize",
                measureSection
            );

            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [frameTop]);

    // ==================================================
    // ACTIVE CARD TRACKING
    // ==================================================

    useMotionValueEvent(
        scrollYProgress,
        "change",
        (latest) => {
            const index = Math.min(
                SERVICE_DATA.length - 1,
                Math.floor(
                    latest * SERVICE_DATA.length
                )
            );

            setActiveIdx((previous) =>
                previous === index
                    ? previous
                    : index
            );
        }
    );

    // ==================================================
    // NAVIGATION
    // ==================================================

    const scrollToCard = useCallback(
        (index: number) => {
            const section = containerRef.current;

            if (!section) return;

            const rect = section.getBoundingClientRect();

            const sectionTop =
                window.scrollY + rect.top;

            const availableScroll =
                section.offsetHeight - window.innerHeight;

            const targetProgress =
                (index + 0.5) / SERVICE_DATA.length;

            window.scrollTo({
                top:
                    sectionTop +
                    targetProgress * availableScroll,
                behavior: "smooth",
            });
        },
        []
    );

    // ==================================================
    // RENDER
    // ==================================================

    return (
        <>
            <section
                id="services"
                ref={containerRef}
                className="
                    relative
                    h-[400vh]
                    w-full
                    bg-transparent
                    scroll-mt-0
                "
            />

            {portalReady &&
                createPortal(
                    <FixedServicesFrame
                        progress={scrollYProgress}
                        activeIdx={activeIdx}
                        scrollToCard={scrollToCard}
                        servicesList={servicesList}
                        frameTop={frameTop}
                    />,
                    document.body
                )}
        </>
    );
};

// ======================================================
// FRAME PROPS
// ======================================================

interface FixedServicesFrameProps {
    progress: MotionValue<number>;
    activeIdx: number;
    scrollToCard: (index: number) => void;
    servicesList: any;
    frameTop: MotionValue<number>;
}

// ======================================================
// FIXED SERVICES FRAME
// ======================================================

const FixedServicesFrame = ({
    progress,
    activeIdx,
    scrollToCard,
    servicesList,
    frameTop,
}: FixedServicesFrameProps) => {

    return (
        <motion.div
            style={{
                position: "fixed",
                top: frameTop,
                left: 0,
                width: "100%",
                height: "100dvh",
                zIndex: 99999,
                pointerEvents: "auto",
            }}
            className="
                flex flex-col
                items-center
                overflow-hidden
                bg-transparent
                px-4 sm:px-8 md:px-12
                pt-4 sm:pt-6
                pb-4
                border-t
                border-border/80
                dark:border-white/10
            "
        >

            {/* HEADER */}

            <div className="
                w-full max-w-6xl
                flex flex-col sm:flex-row
                items-center justify-between
                gap-3 relative z-50 shrink-0
            ">

                <div className="text-center sm:text-left">

                    <span className="
                        text-xs font-mono uppercase
                        tracking-[0.25em]
                        text-muted-foreground
                        block mb-1
                    ">
                        02 / Capabilities
                    </span>

                    <h2 className="
                        text-2xl sm:text-3xl
                        font-black tracking-tight
                        text-foreground
                    ">
                        Services & Focus Areas
                    </h2>

                </div>

            </div>

            {/* CARD STAGE */}

            <div className="
                relative w-full
                flex-1 min-h-0
                my-4 z-10
                isolate
            ">

                {SERVICE_DATA.map((service, index) => {

                    const srvTitle =
                        servicesList?.[index]?.title ||
                        service.title;

                    const srvDesc =
                        servicesList?.[index]?.description ||
                        service.tagline;

                    const srvSkills =
                        servicesList?.[index]?.skills ||
                        [...service.skills];

                    const displayService: DisplayService = {
                        ...service,
                        title: srvTitle,
                        tagline: srvDesc,
                        skills: srvSkills,
                    };

                    return (
                        <OverridingCard
                            key={service.id}
                            service={displayService}
                            index={index}
                            progress={progress}
                        />
                    );
                })}

            </div>

            {/* BOTTOM INDICATOR */}

            <div className="
                flex items-center gap-3
                relative z-50 shrink-0
            ">

                <span className="
                    text-xs font-mono
                    text-muted-foreground
                ">
                    0{activeIdx + 1} / 04
                </span>

                <div className="flex items-center gap-2">

                    {SERVICE_DATA.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToCard(index)}
                            className={`
                                h-1.5 rounded-full transition-all

                                ${
                                    activeIdx === index
                                        ? "w-8 bg-foreground"
                                        : "w-2 bg-muted-foreground/30"
                                }
                            `}
                            aria-label={`Go to service ${index + 1}`}
                        />
                    ))}

                </div>

                <span className="
                    hidden sm:inline
                    text-[11px] font-mono
                    text-muted-foreground/60
                ">
                    Scroll down to explore
                </span>

            </div>

        </motion.div>
    );
};

// ======================================================
// CARD PROPS
// ======================================================

interface OverridingCardProps {
    service: DisplayService;
    index: number;
    progress: MotionValue<number>;
}

// ======================================================
// SCROLL-DRIVEN CARD ANIMATION
// ======================================================

const OverridingCard = ({
    service,
    index,
    progress,
}: OverridingCardProps) => {

    const totalCards = SERVICE_DATA.length;

    // First card is already visible.
    // Other cards enter one by one.

    const start = index / totalCards;
    const end = (index + 1) / totalCards;

    // ==================================================
    // BOTTOM TO TOP ANIMATION
    // ==================================================

    const y = useTransform(
        progress,
        [start, end],
        index === 0
            ? ["0%", "0%"]
            : ["100%", "0%"],
        {
            clamp: true,
        }
    );

    const isRight = index % 2 === 1;

    return (
        <motion.article
            style={{
                y,

                // Later cards appear above previous cards.
                zIndex: index + 1,

                // All cards remain completely opaque.
                opacity: 1,
            }}
            className="
                absolute inset-0
                w-full h-full
                flex items-center
                pointer-events-none
                will-change-transform
            "
        >

            <div className="
                relative w-full h-full
                flex items-center
            ">

                <div className={`
                    relative w-full h-full
                    flex flex-col justify-between
                    overflow-hidden

                    rounded-2xl sm:rounded-3xl

                    border border-border/80
                    dark:border-white/15

                    bg-card

                    p-6 sm:p-10 md:p-14 lg:p-16

                    shadow-[0_15px_45px_rgba(0,0,0,0.15)]
                    dark:shadow-[0_20px_55px_rgba(0,0,0,0.45)]

                    ${
                        isRight
                            ? "text-right items-end"
                            : "text-left items-start"
                    }
                `}>

                    {/* BACKGROUND NUMBER */}

                    <span className={`
                        absolute -bottom-8

                        ${isRight ? "left-5" : "right-5"}

                        text-[130px]
                        sm:text-[190px]
                        md:text-[240px]

                        font-black font-mono

                        text-foreground/[0.035]
                        dark:text-white/[0.04]

                        pointer-events-none select-none
                    `}>
                        0{index + 1}
                    </span>

                    {/* TOP */}

                    <div className="
                        relative z-10 w-full
                        flex items-center
                        justify-between gap-4
                    ">

                        <div className={`
                            flex flex-col gap-2

                            ${isRight ? "items-end" : "items-start"}
                        `}>

                            <span className="
                                text-xs sm:text-sm
                                font-mono font-bold
                                tracking-[0.2em]
                                text-muted-foreground
                            ">
                                SERVICE / 0{index + 1}
                            </span>

                            <span className="
                                text-[10px] sm:text-xs
                                font-mono uppercase
                                tracking-[0.15em]
                                text-muted-foreground/70
                            ">
                                {service.category}
                            </span>

                        </div>

                        <div className="
                            w-12 h-12 sm:w-16 sm:h-16
                            shrink-0 rounded-2xl

                            border border-border
                            dark:border-white/15

                            bg-muted
                            dark:bg-white/[0.05]

                            flex items-center justify-center
                            text-foreground
                        ">
                            <IconRenderer
                                name={service.icon}
                                size={28}
                            />
                        </div>

                    </div>

                    {/* MAIN CONTENT */}

                    <div className={`
                        relative z-10 w-full

                        flex flex-col
                        gap-5 sm:gap-7

                        ${isRight ? "items-end" : "items-start"}
                    `}>

                        <h3 className="
                            text-4xl sm:text-6xl
                            md:text-7xl lg:text-8xl

                            font-black tracking-tight
                            leading-[1.05]

                            text-foreground
                            max-w-5xl
                        ">
                            {service.title}

                            <span className="text-muted-foreground">
                                .
                            </span>
                        </h3>

                        <p className="
                            text-sm sm:text-lg md:text-xl
                            text-muted-foreground
                            leading-relaxed
                            max-w-3xl
                        ">
                            {service.tagline}
                        </p>

                        {/* TECHNOLOGY TAGS */}

                        <div className={`
                            flex flex-wrap
                            gap-2 sm:gap-3
                            w-full

                            ${isRight ? "justify-end" : "justify-start"}
                        `}>

                            {service.skills?.map((skill, idx) => (
                                <span
                                    key={`${skill}-${idx}`}
                                    className="
                                        px-3 sm:px-4 py-2

                                        rounded-full

                                        border border-border
                                        dark:border-white/10

                                        bg-muted/60
                                        dark:bg-white/[0.04]

                                        text-xs sm:text-sm
                                        font-mono

                                        text-foreground/80
                                    "
                                >
                                    {skill}
                                </span>
                            ))}

                        </div>

                    </div>

                    {/* BOTTOM */}

                    <div className="
                        relative z-10 w-full

                        pt-4 sm:pt-6

                        border-t border-border/60
                        dark:border-white/10

                        flex items-center
                        justify-between gap-3
                    ">

                        <span className="
                            text-xs sm:text-sm
                            font-mono text-muted-foreground
                        ">
                            0{index + 1} — 04
                        </span>

                        <a
                            href="#projects"
                            className="
                                pointer-events-auto

                                inline-flex items-center gap-2

                                text-sm sm:text-base
                                font-medium text-foreground

                                hover:text-muted-foreground
                                transition-colors group
                            "
                        >
                            Explore Projects

                            <ArrowUpRight
                                size={18}
                                className="
                                    transition-transform
                                    group-hover:translate-x-1
                                    group-hover:-translate-y-1
                                "
                            />
                        </a>

                    </div>

                </div>

            </div>

        </motion.article>
    );
};

export default Services;