import { SERVICES } from "@/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SpotlightCard from "./ui/SpotlightCard";
import Magnetic from "./Magnetic";

const Services = () => {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

    return (
        <section id="services" className="py-28 relative overflow-hidden scroll-mt-32">
            {/* Background decoration */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div ref={sectionRef} className="max-w-6xl mx-auto">
                    {/* Section header */}
                    <div className={`text-center mb-16 reveal-base reveal-up ${isVisible ? 'revealed' : ''}`}>
                        <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4 px-4 py-1.5 bg-primary/10 rounded-full">
                            What I Do
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight transition-all">
                            <span className="animate-color-cycle">My</span> <span className="animate-color-cycle-reverse">Services</span>
                        </h2>
                        <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            I specialize in building high-quality digital products and experiences that help businesses grow and succeed online.
                        </p>
                    </div>

                    {/* Services grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SERVICES.map((service, index) => (
                            <Magnetic key={index} strength={0.1}>
                                <SpotlightCard
                                    className={`
                    group h-full bg-card/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8
                    transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl 
                    reveal-base reveal-up ${isVisible ? 'revealed' : ''}
                  `}
                                    style={{ transitionDelay: `${index * 0.1}s` }}
                                    spotlightColor={`${service.color}20` || "rgba(139, 92, 246, 0.2)"}
                                >
                                    <div className="flex flex-col h-full">
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
                                            style={{
                                                backgroundColor: `${service.color}15`,
                                                border: `1px solid ${service.color}30`,
                                                color: service.color
                                            }}
                                        >
                                            <service.icon size={28} />
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">
                                            {service.title}
                                        </h3>

                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                </SpotlightCard>
                            </Magnetic>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
