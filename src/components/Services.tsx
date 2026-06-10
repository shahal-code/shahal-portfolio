import { motion } from "framer-motion";
import { SERVICES } from "@/constants";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import SpotlightCard from "./ui/SpotlightCard";
import IconRenderer from "./IconRenderer";

const Services = () => {
    const { data } = usePortfolioData();
    const servicesList = data?.services?.length > 0 ? data.services : SERVICES;

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

                {/* Layout: Carousel on Mobile, Grid on Desktop */}
                <div className="relative">
                    {/* Mobile: Horizontal Snap Carousel */}
                    <div
                        className="flex md:hidden gap-6 overflow-x-auto snap-x snap-mandatory pb-8 hide-scrollbar"
                    >
                        {servicesList.map((service: any, index: number) => (
                            <motion.div
                                key={index}
                                className="min-w-[85vw] snap-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ServiceCard service={service} index={index} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Desktop: Centered Flex Grid Layout */}
                    <div className="hidden md:flex flex-wrap justify-center gap-8">
                        {servicesList.map((service: any, index: number) => (
                            <motion.div
                                key={index}
                                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] max-w-[450px]"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                            >
                                <ServiceCard service={service} index={index} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Visual Hint */}
                    <div className="md:hidden flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground opacity-50">
                        <span>Swipe to explore</span>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                            <div className="w-1 h-1 rounded-full bg-primary animate-pulse delay-75" />
                            <div className="w-1 h-1 rounded-full bg-primary animate-pulse delay-150" />
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
                →
            </div>
        </div>
    </SpotlightCard>
);

export default Services;
