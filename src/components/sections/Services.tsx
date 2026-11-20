import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

import {
    motion,
    useScroll,
    useTransform,
    useMotionValueEvent,
    type MotionValue,
} from "framer-motion";

import { usePortfolioData } from "@/hooks/usePortfolioData";

import IconRenderer from "@/components/common/IconRenderer";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";


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

        highlights: [
            {
                title: "Modern Web Apps",
                desc: "Fast, SEO-optimized, production-grade applications using React, Next.js & TypeScript.",
            },
            {
                title: "Fluid Micro-Interactions",
                desc: "Buttery 60fps micro-animations and scroll choreographies with Framer Motion and GSAP.",
            },
            {
                title: "Clean Design Systems",
                desc: "Scalable, accessible component architectures built with Tailwind CSS and shadcn/ui.",
            },
        ],
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

        highlights: [
            {
                title: "Scalable APIs",
                desc: "Designing high-throughput RESTful and GraphQL endpoints using Node.js & Express.",
            },
            {
                title: "Security & Authentication",
                desc: "Enterprise-grade JWT authentication, OAuth integrations, and strict RBAC authorization.",
            },
            {
                title: "Database Performance",
                desc: "Mongoose schema optimization, aggregation pipelines, and in-memory Redis caching.",
            },
        ],
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

        highlights: [
            {
                title: "iOS & Android",
                desc: "High-performance, platform-native mobile applications built using React Native.",
            },
            {
                title: "Offline-First Sync",
                desc: "Local data persistence, background sync protocols, and push notification pipelines.",
            },
            {
                title: "Hardware & Native APIs",
                desc: "Deep integration with camera, geolocation, biometric authentication, and device sensors.",
            },
        ],
    },

    {
        id: "mern",
        category: "End-to-End Full-Stack Product Engineering",
        title: "MERN Stack Development",

        tagline:
            "Mastering full-stack development to build robust web products from scratch, focusing on security, performance, real-time features, and clean deployment.",

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

        highlights: [
            {
                title: "Full-Cycle Delivery",
                desc: "Architecting complete software products from database schema to polished UI.",
            },
            {
                title: "Real-Time Systems",
                desc: "Interactive live chat, notifications, and streaming with WebSockets and WebRTC.",
            },
            {
                title: "DevOps & Cloud Delivery",
                desc: "Containerization with Docker, CI/CD automation, and deployment to AWS and Vercel.",
            },
        ],
    },
];


// ======================================================
// MAIN SERVICES COMPONENT
// ======================================================

const Services = () => {

    const containerRef = useRef<HTMLDivElement>(null);

    const { data } = usePortfolioData();

    const servicesList =
        data?.services?.length === 4
            ? data.services
            : null;


    const [portalReady, setPortalReady] = useState(false);

    const [activeIdx, setActiveIdx] = useState(0);

    // null prevents an initial frame flash before position calculation.
    const [frameTop, setFrameTop] = useState<number | null>(null);


    // ==================================================
    // SCROLL PROGRESS
    // ==================================================

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });


    // ==================================================
    // PORTAL INITIALIZATION
    // ==================================================

    useEffect(() => {
        setPortalReady(true);
    }, []);


    // ==================================================
    // NATURAL FRAME POSITIONING
    //
    // Before section: frame stays below viewport.
    // Inside section: frame stays at top: 0.
    // After section: frame moves above viewport.
    // ==================================================

    useEffect(() => {

        const updateFramePosition = () => {

            const section = containerRef.current;

            if (!section) return;

            const rect = section.getBoundingClientRect();

            const sectionTop =
                window.scrollY + rect.top;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            const viewportHeight =
                window.innerHeight;

            const currentScroll =
                window.scrollY;


            // Natural entrance position.
            const normalTop =
                sectionTop - currentScroll;


            // Natural exit position.
            const endTop =
                sectionBottom -
                currentScroll -
                viewportHeight;


            // Behaves like position: sticky.
            const top = Math.min(
                Math.max(normalTop, 0),
                endTop
            );


            setFrameTop(top);

        };


        updateFramePosition();


        window.addEventListener(
            "scroll",
            updateFramePosition,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateFramePosition
        );


        return () => {

            window.removeEventListener(
                "scroll",
                updateFramePosition
            );

            window.removeEventListener(
                "resize",
                updateFramePosition
            );

        };

    }, []);


    // ==================================================
    // ACTIVE CARD TRACKING
    // ==================================================

    useMotionValueEvent(
        scrollYProgress,
        "change",
        (latest) => {

            const index = Math.min(
                3,
                Math.floor(latest * 4)
            );

            setActiveIdx(index);

        }
    );


    // ==================================================
    // NAVIGATION
    // ==================================================

    const scrollToCard = (index: number) => {

        if (!containerRef.current) return;

        const section = containerRef.current;

        const rect =
            section.getBoundingClientRect();

        const sectionTop =
            window.scrollY + rect.top;

        const availableScroll =
            section.offsetHeight - window.innerHeight;


        const targetProgress =
            (index + 0.5) / 4;


        const targetScroll =
            sectionTop +
            targetProgress * availableScroll;


        window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
        });

    };


    // ==================================================
    // RENDER
    // ==================================================

    return (
        <>

            {/* ==========================================
                NORMAL PAGE SCROLL TRACK
            ========================================== */}

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


            {/* ==========================================
                FIXED FRAME PORTAL
            ========================================== */}

            {portalReady &&
                frameTop !== null &&
                createPortal(

                    <FixedServicesFrame

                        progress={scrollYProgress}

                        activeIdx={activeIdx}

                        scrollToCard={scrollToCard}

                        servicesList={servicesList}

                        frameTop={frameTop}

                    />,

                    document.body

                )
            }

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

    frameTop: number;

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

    const isInViewport =
        frameTop < window.innerHeight &&
        frameTop > -window.innerHeight;


    return (

        <div

            style={{

                position: "fixed",

                top: frameTop,

                left: 0,

                width: "100%",

                height: "100vh",

                height: "100dvh",

                zIndex: 99999,

                pointerEvents: isInViewport
                    ? "auto"
                    : "none",

            }}

            className="
                flex
                flex-col
                items-center

                overflow-hidden

                bg-transparent

                px-4
                sm:px-8
                md:px-12

                pt-4
                sm:pt-6
                pb-4

                border-t
                border-border/80
                dark:border-white/10

                shadow-[0_-30px_70px_rgba(0,0,0,0.9)]
            "
        >

            {/* ======================================
                AMBIENT GLOW
            ====================================== */}

            <div
                className="
                    absolute

                    top-1/2
                    left-1/2

                    -translate-x-1/2
                    -translate-y-1/2

                    w-[700px]
                    h-[700px]

                    bg-foreground/[0.02]

                    rounded-full
                    blur-[140px]

                    pointer-events-none
                "
            />


            {/* ======================================
                HEADER
            ====================================== */}

            <div
                className="
                    w-full
                    max-w-5xl
                    xl:max-w-6xl

                    flex
                    flex-col
                    sm:flex-row

                    items-center
                    justify-between

                    gap-3

                    relative
                    z-20

                    shrink-0
                "
            >

                <div>

                    <span
                        className="
                            text-xs
                            font-mono
                            uppercase
                            tracking-[0.25em]
                            text-muted-foreground
                            block
                        "
                    >
                        02 / Capabilities
                    </span>


                    <h2
                        className="
                            text-2xl
                            sm:text-3xl

                            font-black
                            tracking-tight

                            text-foreground
                        "
                    >
                        Services & Focus Areas
                    </h2>

                </div>


                {/* NAVIGATION TABS */}

                <div
                    className="
                        flex
                        items-center
                        gap-1.5
                        sm:gap-2

                        p-1

                        rounded-full

                        border
                        border-border/80
                        dark:border-white/10

                        bg-muted/60
                        dark:bg-zinc-900/80

                        backdrop-blur-md
                    "
                >

                    {SERVICE_DATA.map((service, index) => {

                        const isCurrent =
                            activeIdx === index;

                        return (

                            <button
                                key={service.id}

                                onClick={() =>
                                    scrollToCard(index)
                                }

                                className={`
                                    px-3
                                    py-1

                                    sm:px-3.5
                                    sm:py-1.5

                                    rounded-full

                                    text-xs
                                    font-mono
                                    font-medium

                                    whitespace-nowrap

                                    transition-all
                                    duration-200

                                    ${
                                        isCurrent
                                            ? "bg-foreground text-background shadow-md scale-105"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    }
                                `}
                            >
                                0{index + 1}{" "}
                                {service.title.split(" ")[0]}

                            </button>

                        );

                    })}

                </div>

            </div>


            {/* ======================================
                CARD STAGE
            ====================================== */}

            <div

                className="
                    relative

                    w-full

                    max-w-5xl
                    xl:max-w-6xl

                    flex-1
                    min-h-0

                    my-5

                    z-10
                "

                style={{
                    perspective: "1600px",
                }}
            >

                {SERVICE_DATA.map((service, index) => {

                    const srvTitle =
                        servicesList?.[index]?.title ||
                        service.title;

                    const srvDesc =
                        servicesList?.[index]?.description ||
                        service.tagline;

                    const srvSkills =
                        servicesList?.[index]?.skills ||
                        service.skills;


                    return (

                        <OverridingCard

                            key={service.id}

                            service={{

                                ...service,

                                title: srvTitle,

                                tagline: srvDesc,

                                skills: srvSkills,

                            }}

                            index={index}

                            progress={progress}

                        />

                    );

                })}

            </div>


            {/* ======================================
                BOTTOM INDICATOR
            ====================================== */}

            <div
                className="
                    flex
                    items-center
                    gap-3

                    relative
                    z-20

                    shrink-0
                "
            >

                <span
                    className="
                        text-xs
                        font-mono
                        text-muted-foreground
                    "
                >
                    0{activeIdx + 1} / 04
                </span>


                <div
                    className="
                        flex
                        items-center
                        gap-2
                    "
                >

                    {SERVICE_DATA.map((_, index) => (

                        <button
                            key={index}

                            onClick={() =>
                                scrollToCard(index)
                            }

                            className={`
                                h-1.5
                                rounded-full

                                transition-all
                                duration-300

                                ${
                                    activeIdx === index
                                        ? "w-8 bg-foreground"
                                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground"
                                }
                            `}

                            aria-label={`Go to service ${index + 1}`}

                        />

                    ))}

                </div>


                <span
                    className="
                        text-[11px]
                        font-mono
                        text-muted-foreground/60

                        hidden
                        sm:inline
                    "
                >
                    Scroll down to explore
                </span>

            </div>

        </div>

    );
};


// ======================================================
// CARD PROPS
// ======================================================

interface OverridingCardProps {

    service: (typeof SERVICE_DATA)[0];

    index: number;

    progress: MotionValue<number>;

}


// ======================================================
// CARD ANIMATION
// ======================================================

const OverridingCard = ({
    service,
    index,
    progress,
}: OverridingCardProps) => {


    // ==============================================
    // ANIMATION RANGES
    // ==============================================

    const start = index * 0.25;

    const end = start + 0.25;


    // ==============================================
    // VERTICAL MOVEMENT
    // ==============================================

    const y = useTransform(

        progress,

        index === 0
            ? [0, 1]
            : [start, end],

        index === 0
            ? ["0%", "0%"]
            : ["100%", "0%"],

        {
            clamp: true,
        }

    );


    // ==============================================
    // SCALE
    // ==============================================

    const scale = useTransform(

        progress,

        index === 0
            ? [0, 1]
            : [start, end],

        index === 0
            ? [1, 1]
            : [0.97, 1],

        {
            clamp: true,
        }

    );


    // ==============================================
    // 3D ROTATION
    // ==============================================

    const rotateX = useTransform(

        progress,

        index === 0
            ? [0, 1]
            : [start, end],

        index === 0
            ? [0, 0]
            : [8, 0],

        {
            clamp: true,
        }

    );


    // ==============================================
    // CARD RENDER
    // ==============================================

    return (

        <motion.div

            style={{

                y,

                scale,

                rotateX,

                opacity: 1,

                zIndex: (index + 1) * 10,

                transformStyle: "preserve-3d",

                transformOrigin: "center bottom",

                backfaceVisibility: "hidden",

            }}

            className="
                absolute
                inset-0

                w-full
                h-full

                rounded-2xl
                sm:rounded-3xl

                border
                border-border/80
                dark:border-white/15

                bg-card
                backdrop-blur-md

                p-5
                sm:p-8
                md:p-12

                flex
                flex-col
                justify-between

                shadow-[0_-25px_60px_rgba(0,0,0,0.85)]

                dark:shadow-[0_-30px_70px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.08)]

                will-change-transform

                overflow-hidden
            "
        >

            {/* ======================================
                WATERMARK
            ====================================== */}

            <div
                className="
                    absolute

                    right-6
                    -bottom-6

                    sm:right-10
                    sm:-bottom-10

                    text-8xl
                    sm:text-9xl
                    md:text-[140px]

                    font-black
                    font-mono

                    text-foreground/[0.03]
                    dark:text-white/[0.04]

                    select-none
                    pointer-events-none
                "
            >
                0{index + 1}
            </div>


            {/* ======================================
                TOP ROW
            ====================================== */}

            <div
                className="
                    flex
                    items-center
                    justify-between

                    relative
                    z-10
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    <span
                        className="
                            text-xs
                            sm:text-sm

                            font-mono
                            font-bold

                            text-foreground

                            px-3.5
                            py-1.5

                            rounded-full

                            border
                            border-border
                            dark:border-white/15

                            bg-muted
                            dark:bg-white/[0.05]
                        "
                    >
                        0{index + 1}
                    </span>


                    <span
                        className="
                            text-xs
                            font-mono
                            uppercase

                            tracking-[0.25em]

                            text-muted-foreground
                        "
                    >
                        {service.category}
                    </span>

                </div>


                <div
                    className="
                        w-11
                        h-11

                        rounded-2xl

                        bg-secondary
                        dark:bg-white/[0.06]

                        border
                        border-border
                        dark:border-white/15

                        flex
                        items-center
                        justify-center

                        text-foreground

                        shadow-sm
                    "
                >

                    <IconRenderer
                        name={service.icon}
                        size={24}
                    />

                </div>

            </div>


            {/* ======================================
                MIDDLE CONTENT
            ====================================== */}

            <div
                className="
                    space-y-4
                    sm:space-y-6

                    my-auto

                    relative
                    z-10
                "
            >

                <div>

                    <h3
                        className="
                            text-2xl
                            sm:text-4xl
                            md:text-5xl
                            lg:text-6xl

                            font-black
                            tracking-tight

                            text-foreground
                        "
                    >
                        {service.title}
                    </h3>


                    <p
                        className="
                            text-sm
                            sm:text-base
                            md:text-lg

                            text-muted-foreground

                            leading-relaxed

                            max-w-3xl

                            mt-2
                            sm:mt-3
                        "
                    >
                        {service.tagline}
                    </p>

                </div>


                {/* HIGHLIGHTS */}

                <div
                    className="
                        grid

                        grid-cols-1
                        sm:grid-cols-3

                        gap-3
                        sm:gap-4

                        pt-1
                        sm:pt-2
                    "
                >

                    {service.highlights.map((item, idx) => (

                        <div
                            key={idx}

                            className="
                                p-3.5
                                sm:p-4

                                rounded-xl

                                border
                                border-border/70
                                dark:border-white/10

                                bg-muted/40
                                dark:bg-white/[0.02]
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2

                                    mb-1.5
                                "
                            >

                                <CheckCircle2
                                    size={15}
                                    className="
                                        text-foreground
                                        shrink-0
                                    "
                                />


                                <h4
                                    className="
                                        text-xs
                                        sm:text-sm

                                        font-bold

                                        text-foreground

                                        tracking-tight
                                    "
                                >
                                    {item.title}
                                </h4>

                            </div>


                            <p
                                className="
                                    text-xs

                                    text-muted-foreground

                                    leading-relaxed
                                "
                            >
                                {item.desc}
                            </p>

                        </div>

                    ))}

                </div>

            </div>


            {/* ======================================
                BOTTOM ROW
            ====================================== */}

            <div
                className="
                    pt-4
                    sm:pt-6

                    border-t
                    border-border/60
                    dark:border-white/10

                    flex
                    flex-wrap

                    items-center
                    justify-between

                    gap-3

                    relative
                    z-10
                "
            >

                {/* TECH STACK */}

                <div
                    className="
                        flex
                        flex-wrap

                        items-center

                        gap-1.5
                        sm:gap-2
                    "
                >

                    {service.skills?.map(
                        (skill: string, idx: number) => (

                            <span
                                key={idx}

                                className="
                                    text-xs
                                    font-mono

                                    text-foreground/90

                                    bg-muted
                                    dark:bg-white/[0.05]

                                    border
                                    border-border
                                    dark:border-white/10

                                    px-2.5
                                    sm:px-3

                                    py-1

                                    rounded-full
                                "
                            >
                                {skill}
                            </span>

                        )
                    )}

                </div>


                {/* PROJECT LINK */}

                <a
                    href="#projects"

                    className="
                        flex
                        items-center
                        gap-1.5

                        text-xs
                        font-mono

                        text-muted-foreground

                        hover:text-foreground

                        transition-colors

                        group
                    "
                >

                    <span>
                        Explore Projects
                    </span>


                    <ArrowUpRight
                        size={14}

                        className="
                            group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5

                            transition-transform
                        "
                    />

                </a>

            </div>

        </motion.div>

    );

};


// ======================================================
// EXPORT
// ======================================================

export default Services;