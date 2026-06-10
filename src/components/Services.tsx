import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SERVICES } from "@/constants";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import SpotlightCard from "./ui/SpotlightCard";
import IconRenderer from "./IconRenderer";

const Services = () => {
    const { data } = usePortfolioData();
    const servicesList = data?.services?.length > 0 ? data.services : SERVICES;
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const serviceCount = servicesList.length;
    const safeActiveIndex = serviceCount > 0 ? Math.min(activeIndex, serviceCount - 1) : 0;
    const activeService = servicesList[safeActiveIndex];

    const showService = (nextIndex: number) => {
        if (!serviceCount || nextIndex === safeActiveIndex) return;
        setDirection(nextIndex > safeActiveIndex ? 1 : -1);
        setActiveIndex(nextIndex);
    };

    const showPrevious = () => {
        const nextIndex = safeActiveIndex === 0 ? serviceCount - 1 : safeActiveIndex - 1;
        showService(nextIndex);
    };

    const showNext = () => {
        const nextIndex = safeActiveIndex === serviceCount - 1 ? 0 : safeActiveIndex + 1;
        showService(nextIndex);
    };

    return (
        <section id="services" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-20 relative z-10">
                {/* Section header */}
                <div className="max-w-7xl mx-auto mb-16 md:mb-24">
                    <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4 px-4 py-1.5 bg-primary/10 rounded-full">
                        What I Do
                    </span>
                    <h2 className="text-4xl md:text-7xl font-bold leading-tight text-foreground">
                        <span className="opacity-40">My</span> Services
                    </h2>
                </div>

                {/* Layout: Button controlled carousel */}
                <div className="relative">
                    <div className="mx-auto max-w-[760px]">
                        <div className="relative overflow-visible px-12 md:px-16">
                            <AnimatePresence initial={false} mode="wait">
                                {activeService && (
                                    <motion.div
                                        key={safeActiveIndex}
                                        className="w-full"
                                        initial={{
                                            opacity: 0,
                                            x: direction > 0 ? 80 : -80,
                                            scale: 0.92,
                                            rotate: direction > 0 ? 4 : -4,
                                        }}
                                        animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                                        exit={{
                                            opacity: 0,
                                            x: direction > 0 ? -80 : 80,
                                            scale: 0.92,
                                            rotate: direction > 0 ? -4 : 4,
                                        }}
                                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <ServiceCard service={activeService} index={safeActiveIndex} />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="button"
                                onClick={showPrevious}
                                className="absolute left-0 top-1/2 z-50 h-12 w-12 -translate-y-1/2 rounded-full border border-primary/30 bg-primary text-primary-foreground flex items-center justify-center shadow-[0_18px_40px_hsl(var(--primary)/0.35)] transition-all hover:scale-105 active:scale-95"
                                aria-label="Previous service"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>

                            <button
                                type="button"
                                onClick={showNext}
                                className="absolute right-0 top-1/2 z-50 h-12 w-12 -translate-y-1/2 rounded-full border border-primary/30 bg-primary text-primary-foreground flex items-center justify-center shadow-[0_18px_40px_hsl(var(--primary)/0.35)] transition-all hover:scale-105 active:scale-95"
                                aria-label="Next service"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-2">
                            {servicesList.map((service: any, index: number) => (
                                <button
                                    key={`${service.title}-${index}`}
                                    type="button"
                                    onClick={() => showService(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        index === safeActiveIndex ? "w-8 bg-primary" : "w-2 bg-primary/25"
                                    }`}
                                    aria-label={`Show ${service.title}`}
                                />
                            ))}
                        </div>

                        <div className="mt-4 flex items-center justify-center text-xs text-muted-foreground opacity-50">
                            <span>Use arrows to explore</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ service, index }: { service: any, index: number }) => (
    <SpotlightCard
        className="group h-[450px] md:h-[500px] bg-card/40 dark:bg-white/5 backdrop-blur-3xl border border-border/50 dark:border-white/5 rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-12 flex flex-col justify-between transition-all duration-700 hover:border-primary/50 dark:hover:bg-white/10 shadow-2xl"
        spotlightColor={`${service.color}30` || "rgba(139, 92, 246, 0.3)"}
    >
        <div className="space-y-6">
            <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] flex items-center justify-center mb-6 md:mb-10 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-xl"
                style={{
                    backgroundColor: `${service.color}20`,
                    border: `1px solid ${service.color}40`,
                    color: service.color
                }}
            >
                {typeof service.icon === 'string' ? (
                    <IconRenderer name={service.icon} size={32} />
                ) : (
                    <service.icon size={32} />
                )}
            </div>

            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-500">
                {service.title}
            </h3>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed line-clamp-3">
                {service.description}
            </p>

            {/* Service Skills Tags */}
            {service.skills && (
                <div className="flex flex-wrap gap-2 pt-2">
                    {service.skills.map((skill: string, sIdx: number) => (
                        <span
                            key={sIdx}
                            className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary/70 bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            )}
        </div>

        <div className="pt-6 border-t border-border/10 dark:border-white/5 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">0{index + 1}</span>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                <ChevronRight className="h-5 w-5" />
            </div>
        </div>
    </SpotlightCard>
);

export default Services;
