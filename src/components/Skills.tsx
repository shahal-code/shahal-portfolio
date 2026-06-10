import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { SKILLS } from "@/constants";
import Magnetic from "@/components/Magnetic";
import Scroll3DWrapper from "@/components/Scroll3DWrapper";
import IconRenderer from "@/components/IconRenderer";

import RippleButton from "@/components/ui/RippleButton";

const Skills = () => {
  const { data } = usePortfolioData();
  const skillsList = data?.skills?.length > 0 ? data.skills : SKILLS;

  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="skills" className="py-28 relative overflow-hidden scroll-mt-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <Scroll3DWrapper>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div ref={sectionRef} className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-16 reveal-base reveal-up revealed">
              <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4 px-4 py-1.5 bg-primary/10 rounded-full">
                Expertise
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight transition-all">
                <span className="animate-color-cycle">Technical</span> <span className="animate-color-cycle-reverse">Skills</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A curated list of technologies I use to bring ideas to life.
              </p>
            </div>

            {/* Dynamic Balanced Layout */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-5 max-w-5xl mx-auto">
              {skillsList.map((skill: any, index: number) => {
                // Subtle staggered effect that feels "aligned correctly" but still premium
                const offset = (index % 4) * 2;

                return (
                  <Magnetic key={index} strength={0.1}>
                    <RippleButton
                      className={`
                      group relative bg-card/40 dark:bg-primary/5 border border-border/50 dark:border-primary/20 backdrop-blur-[20px] rounded-full px-5 py-2.5
                      flex items-center gap-3 transition-all duration-500 
                      shadow-[inset_2px_2px_4px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.05)]
                      dark:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.1),inset_-2px_-4px_8px_rgba(0,0,0,0.2),0_10px_30px_hsl(var(--primary)/0.1)]
                      hover:bg-primary/20 hover:border-primary/40 hover:scale-105 hover:shadow-xl
                      reveal-base reveal-scale revealed cursor-pointer
                    `}
                      style={{
                        transform: isVisible && typeof window !== 'undefined' && window.innerWidth >= 768 ? `translateY(${offset}px)` : 'none'
                      }}
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-full blur-xl transition-opacity duration-500" />

                      <div className="relative z-10 flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          {typeof skill.icon === 'string' ? (
                            <IconRenderer name={skill.icon} className="w-full h-full" />
                          ) : (
                            <skill.icon />
                          )}
                        </div>
                        <div className="flex flex-col items-start">
                          <h3 className="font-bold text-foreground text-[10px] md:text-xs leading-tight group-hover:text-primary transition-colors">
                            {skill.name}
                          </h3>
                          <span className="text-[7px] font-bold text-primary uppercase opacity-40 mt-0.5">
                            {skill.category}
                          </span>
                        </div>
                      </div>
                    </RippleButton>
                  </Magnetic>
                );
              })}
            </div>
          </div>
        </div>
      </Scroll3DWrapper>

    </section>
  );
};

export default Skills;
