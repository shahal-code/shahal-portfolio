import { ExternalLink, Github, Lock, MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import RippleButton from "@/components/ui/RippleButton";
import Magnetic from "@/components/Magnetic";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { PROJECTS } from "@/constants";

type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  demo: string;
  status?: string;
};

const getProjectType = (title: string) => {
  const normalizedTitle = title.toLowerCase();
  if (normalizedTitle.includes("chat") || normalizedTitle.includes("talks")) return "Realtime Platform";
  if (normalizedTitle.includes("ai") || normalizedTitle.includes("novuai")) return "Agentic AI Build";
  return "Full Stack Build";
};

const Projects = () => {
  const { data } = usePortfolioData();
  const projectsList = (data?.projects?.length > 0 ? data.projects : PROJECTS) as Project[];
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.08 });

  return (
    <section id="projects" className="relative py-24 sm:py-28 scroll-mt-32 overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-32 w-72 h-72 rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute bottom-1/4 -left-32 w-72 h-72 rounded-full bg-cyan-500/8 blur-[100px]" />
      </div>

      <div className="premium-divider top-0" />

      {/* ── Section Header ── */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div ref={sectionRef} className="max-w-6xl mx-auto mb-16">
          <div className={`reveal-base reveal-up ${isVisible ? "revealed" : ""}`}>
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary w-fit">
                Portfolio
              </span>
              <h2 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                Selected <span className="animate-color-cycle">Project</span>{" "}
                <span className="animate-color-cycle-reverse">Missions</span>
              </h2>
              <p className="max-w-md text-sm leading-7 text-muted-foreground">
                Featured builds with live previews, stack details, and direct access to code or live demos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cards: full viewport width, alternating left/right ── */}
      <div className="relative z-10 w-full space-y-6">
        {projectsList.map((project: Project, index: number) => {
          const isLeft = index % 2 === 0;
          const projectType = getProjectType(project.title);

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: isLeft ? -140 : 140 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`freelance-card-wrap ${isLeft ? "freelance-card-left" : "freelance-card-right"}`}
            >
              <article
                className="group relative border border-white/10 bg-white/[0.015] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/25 hover:bg-white/[0.03] hover:shadow-[0_0_50px_hsl(var(--primary)/0.07)] flex flex-col sm:flex-row"
                style={{ minHeight: "200px" }}
              >
                {/* Hover glow line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* ── Image panel — outer edge side ── */}
                <div
                  className="relative w-full sm:w-[38%] flex-shrink-0 overflow-hidden"
                  style={{
                    order: isLeft ? 0 : 1,
                    minHeight: "180px",
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:saturate-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/20 to-transparent" />

                  {/* Badges on image */}
                  <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-white/90 backdrop-blur-md">
                    {projectType}
                  </span>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[9px] font-bold text-white/80 backdrop-blur-md">
                    <ArrowUpRight className="w-3 h-3 text-primary" />
                  </div>
                </div>

                {/* ── Content panel ── */}
                <div
                  className="flex flex-col justify-between gap-4 p-5 sm:p-7 flex-1"
                  style={{ order: isLeft ? 1 : 0 }}
                >
                  {/* Number + status */}
                  <div
                    className="flex items-center gap-2.5 w-full"
                    style={{ flexDirection: isLeft ? "row" : "row-reverse" }}
                  >
                    <span className="font-mono text-xs font-bold text-primary/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-6 bg-primary/30 flex-shrink-0" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                      {projectType}
                    </span>
                    <span className="flex-1" />
                    {project.status && (
                      <span className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary">
                        <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                        {project.status}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div style={{ textAlign: isLeft ? "left" : "right" }}>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    className="text-xs leading-6 text-muted-foreground line-clamp-3"
                    style={{ textAlign: isLeft ? "left" : "right" }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div
                    className="flex flex-wrap gap-1.5"
                    style={{ justifyContent: isLeft ? "flex-start" : "flex-end" }}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* URL + Buttons */}
                  <div
                    className="flex flex-col gap-2 pt-3 border-t border-white/[0.06]"
                    style={{ alignItems: isLeft ? "flex-start" : "flex-end" }}
                  >
                    {project.demo && project.demo !== "#" && (
                      <div
                        className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60"
                        style={{ flexDirection: isLeft ? "row" : "row-reverse" }}
                      >
                        <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                        <span className="font-mono">{project.demo.replace("https://", "")}</span>
                      </div>
                    )}

                    <div
                      className="flex flex-wrap gap-2"
                      style={{ justifyContent: isLeft ? "flex-start" : "flex-end" }}
                    >
                      <Magnetic strength={0.3}>
                        <RippleButton
                          className="h-8 rounded-full border border-white/10 bg-white/[0.04] px-4 text-[10px] font-bold text-foreground backdrop-blur-xl transition-all hover:border-primary/40 hover:bg-primary/10 active:scale-95"
                          onClick={() => window.open(project.github, "_blank", "noopener,noreferrer")}
                        >
                          <span className="flex items-center gap-1.5">
                            <Github className="w-3 h-3" />
                            Code
                          </span>
                        </RippleButton>
                      </Magnetic>

                      <Magnetic strength={0.3}>
                        <RippleButton
                          className={`h-8 rounded-full border px-4 text-[10px] font-bold backdrop-blur-xl transition-all active:scale-95 ${
                            project.demo && project.demo !== "#"
                              ? "border-primary/40 bg-primary/20 text-primary-foreground hover:bg-primary/30"
                              : "cursor-not-allowed border-white/10 bg-white/[0.03] text-muted-foreground"
                          }`}
                          onClick={() => {
                            if (project.demo && project.demo !== "#") {
                              window.open(project.demo, "_blank", "noopener,noreferrer");
                            }
                          }}
                        >
                          <span className="flex items-center gap-1.5">
                            {project.demo && project.demo !== "#" ? (
                              <><ExternalLink className="w-3 h-3" />Live Demo</>
                            ) : (
                              <><Lock className="w-3 h-3" />Not Available</>
                            )}
                          </span>
                        </RippleButton>
                      </Magnetic>
                    </div>
                  </div>
                </div>
              </article>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
