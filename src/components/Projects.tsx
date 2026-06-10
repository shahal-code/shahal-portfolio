import { ExternalLink, Github, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import RippleButton from "@/components/ui/RippleButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { PROJECTS } from "@/constants";
import Magnetic from "@/components/Magnetic";
import SpotlightCard from "@/components/ui/SpotlightCard"; // Imported SpotlightCard
import Scroll3DWrapper from "@/components/Scroll3DWrapper";

const Projects = () => {
  const { data } = usePortfolioData();
  const projectsList = data?.projects?.length > 0 ? data.projects : PROJECTS;

  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="projects" className="py-28 relative scroll-mt-32">
      {/* Section divider */}
      <div className="premium-divider top-0" />

      <Scroll3DWrapper>
        <div className="container mx-auto px-4 sm:px-6">
          <div ref={sectionRef} className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-20 reveal-base reveal-up revealed">
              <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4 px-4 py-1.5 bg-primary/10 rounded-full">
                Portfolio
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                My <span className="animate-color-cycle">Recent</span> <span className="animate-color-cycle-reverse">Works</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A showcase of my recent projects, featuring full-stack applications and professional web solutions.
              </p>
            </div>

            {/* Project cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
              {projectsList.map((project: any, index: number) => (
                <SpotlightCard
                  key={index}
                  className="group bg-card border border-border/50 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] reveal-base reveal-up revealed"
                  spotlightColor="rgba(139, 92, 246, 0.2)"
                >
                  {/* Image */}
                  <div className="h-60 relative overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                    
                    {/* Currently Working Badge */}
                    {project.status && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-4 py-1.5 bg-primary/20 backdrop-blur-xl border border-primary/40 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(139,92,246,0.3)] animate-pulse">
                          {project.status}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-lg border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-6 grid grid-cols-2 gap-4">
                      <Magnetic strength={0.4} className="w-full">
                        <RippleButton
                          className="w-full h-11 text-[11px] font-bold rounded-full text-foreground bg-card/40 dark:bg-white/5 backdrop-blur-3xl border border-border/20 dark:border-white/10 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.1),0_5px_15px_rgba(0,0,0,0.1)] hover:bg-card/60 dark:hover:bg-white/10 active:scale-95 transition-all"
                          onClick={() => window.open(project.github, "_blank", "noopener,noreferrer")}
                        >
                          <span className="flex items-center justify-center">
                            <Github className="w-3.5 h-3.5 mr-1.5" />
                            Code
                          </span>
                        </RippleButton>
                      </Magnetic>

                      <Magnetic strength={0.4} className="w-full">
                        <RippleButton
                          className="w-full h-11 text-[11px] font-bold rounded-full text-primary-foreground bg-primary/20 backdrop-blur-3xl border border-primary/30 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3),inset_-2px_-4px_8px_rgba(0,0,0,0.3),0_10px_20px_hsl(var(--primary)/0.15)] hover:scale-[1.03] active:scale-95 transition-all"
                          onClick={() => {
                            if (project.demo && project.demo !== "#") {
                              window.open(project.demo, "_blank", "noopener,noreferrer");
                            }
                          }}
                        >
                          <span className="flex items-center justify-center">
                            {project.demo && project.demo !== "#" ? (
                              <>
                                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                                Live Demo
                              </>
                            ) : (
                              <>
                                <Lock className="w-3.5 h-3.5 mr-1.5" />
                                Not Available
                              </>
                            )}
                          </span>
                        </RippleButton>
                      </Magnetic>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </Scroll3DWrapper>

    </section>
  );
};

export default Projects;
