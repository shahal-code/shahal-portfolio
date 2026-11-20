import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SERVICES } from "@/constants";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import IconRenderer from "@/components/common/IconRenderer";
import { ArrowUpRight } from "lucide-react";

const Services = () => {
    const { data } = usePortfolioData();
    const servicesList = data?.services?.length > 0 ? data.services : SERVICES;
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll progress across the entire sticky height
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section
            id="services"
            ref={containerRef}
            className="relative h-[400vh] scroll-mt-20"
        >
            {/* Pinned / Fixed Stage Container — Frame filled */}
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 z-30 bg-background border-t border-white/10 shadow-[0_-30px_70px_rgba(0,0,0,0.9)]">
                {/* Background ambient lighting */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />

                {/* Section Header */}
                <div className="text-center mb-8 sm:mb-12 z-10 max-w-xl">
                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground block mb-2">
                        02 / Capabilities
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
                        Services & Focus
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                        Scroll to explore core development proficiencies
                    </p>
                </div>

                {/* Fixed 3D Stage Frame */}
                <div
                    className="relative w-full max-w-2xl h-[420px] sm:h-[400px] z-10"
                    style={{ perspective: "1200px" }}
                >
                    {servicesList.map((service: any, index: number) => (
                        <ServiceCard3D
                            key={index}
                            service={service}
                            index={index}
                            total={servicesList.length}
                            progress={scrollYProgress}
                        />
                    ))}
                </div>

                {/* Bottom Step Indicator Bar */}
                <div className="mt-8 sm:mt-10 flex items-center gap-2 z-10">
                    {servicesList.map((_: any, idx: number) => (
                        <StepDot
                            key={idx}
                            index={idx}
                            total={servicesList.length}
                            progress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

interface ServiceCard3DProps {
    service: any;
    index: number;
    total: number;
    progress: any;
}

const ServiceCard3D = ({ service, index, total, progress }: ServiceCard3DProps) => {
    // Break the scroll into segments based on index
    // Segment bounds:
    const step = 1 / total;
    const enterStart = Math.max(0, (index - 0.7) * step);
    const enterEnd = index * step;
    const exitStart = (index + 0.3) * step;
    const exitEnd = Math.min(1, (index + 1) * step);

    // Initial item is visible from the very start
    const isFirst = index === 0;
    const isLast = index === total - 1;

    // Y translation: comes up from bottom (+100px), settles at center (0), exits to top (-100px)
    const y = useTransform(
        progress,
        isFirst
            ? [0, exitStart, exitEnd]
            : isLast
            ? [enterStart, enterEnd, 1]
            : [enterStart, enterEnd, exitStart, exitEnd],
        isFirst
            ? ["0%", "0%", "-100%"]
            : isLast
            ? ["100%", "0%", "0%"]
            : ["100%", "0%", "0%", "-100%"]
    );

    // 3D X rotation: tilted slightly entering, flat centered, tilted exiting
    const rotateX = useTransform(
        progress,
        isFirst
            ? [0, exitStart, exitEnd]
            : isLast
            ? [enterStart, enterEnd, 1]
            : [enterStart, enterEnd, exitStart, exitEnd],
        isFirst
            ? [0, 0, -20]
            : isLast
            ? [20, 0, 0]
            : [20, 0, 0, -20]
    );

    // Opacity: fade in and fade out
    const opacity = useTransform(
        progress,
        isFirst
            ? [0, exitStart, exitEnd]
            : isLast
            ? [enterStart, enterEnd, 1]
            : [enterStart, enterEnd, exitStart, exitEnd],
        isFirst
            ? [1, 1, 0]
            : isLast
            ? [0, 1, 1]
            : [0, 1, 1, 0]
    );

    // Scale: slightly smaller entering and exiting
    const scale = useTransform(
        progress,
        isFirst
            ? [0, exitStart, exitEnd]
            : isLast
            ? [enterStart, enterEnd, 1]
            : [enterStart, enterEnd, exitStart, exitEnd],
        isFirst
            ? [1, 1, 0.92]
            : isLast
            ? [0.92, 1, 1]
            : [0.92, 1, 1, 0.92]
    );

    return (
        <motion.div
            style={{
                y,
                rotateX,
                opacity,
                scale,
                transformStyle: "preserve-3d",
            }}
            className="absolute inset-0 w-full h-full rounded-3xl border border-white/15 bg-black/60 backdrop-blur-2xl p-7 sm:p-10 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] will-change-transform"
        >
            {/* Top row: Number & Icon */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-white/50 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04]">
                        0{index + 1}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                        Capability
                    </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-white">
                    {typeof service.icon === "string" ? (
                        <IconRenderer name={service.icon} size={24} />
                    ) : (
                        <service.icon size={24} />
                    )}
                </div>
            </div>

            {/* Middle: Title & Description */}
            <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                    {service.title}
                </h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-lg">
                    {service.description}
                </p>
            </div>

            {/* Bottom: Tech tags & action hint */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {service.skills?.map((skill: string, sIdx: number) => (
                        <span
                            key={sIdx}
                            className="text-[10px] sm:text-xs font-mono text-white/80 bg-white/[0.05] border border-white/10 px-2.5 py-0.5 rounded-full"
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-1 text-xs font-mono text-white/60">
                    <span>Active</span>
                    <ArrowUpRight size={14} />
                </div>
            </div>
        </motion.div>
    );
};

const StepDot = ({ index, total, progress }: { index: number; total: number; progress: any }) => {
    const step = 1 / total;
    const center = (index + 0.5) * step;

    // Dot expands when active
    const width = useTransform(
        progress,
        [Math.max(0, center - step * 0.5), center, Math.min(1, center + step * 0.5)],
        [8, 28, 8]
    );

    const opacity = useTransform(
        progress,
        [Math.max(0, center - step * 0.5), center, Math.min(1, center + step * 0.5)],
        [0.3, 1, 0.3]
    );

    return (
        <motion.div
            style={{ width, opacity }}
            className="h-2 rounded-full bg-white transition-colors"
        />
    );
};

export default Services;
