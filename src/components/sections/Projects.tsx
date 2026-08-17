import { ExternalLink, Github, Lock, MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import RippleButton from "@/components/ui/RippleButton";
import Magnetic from "@/components/common/Magnetic";
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

  return (
    <section id="projects" className="relative py-24 sm:py-28 scroll-mt-32 overflow-hidden">
      {/* Ambient glows - optimized */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-32 w-64 h-64 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-64 h-64 rounded-full bg-cyan-500/8 blur-3xl" />
      </div>

      <div className="premium-divider top-0" />

      {/* ── Section Header ── */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto mb-16">
          <div>
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
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`freelance-card-wrap ${isLeft ? "freelance-card-left" : "freelance-card-right"}`}
            >
              <article
                className="group relative rounded-[1.75rem] sm:rounded-2xl border border-white/10 bg-card/80 dark:bg-white/[0.02] overflow-hidden transition-colors duration-300 hover:border-primary/30 hover:bg-white/[0.04] shadow-md hover:shadow-xl flex flex-col sm:flex-row"
                style={{ minHeight: "160px" }}
              >
                {/* Hover glow line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* ── Image panel — outer edge side ── */}
                <div
                  className={`relative w-full sm:w-[38%] h-36 min-[400px]:h-40 sm:h-auto sm:min-h-[180px] rounded-t-[1.75rem] sm:rounded-none flex-shrink-0 overflow-hidden order-1 ${
                    isLeft ? "sm:order-0" : "sm:order-1"
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/20 to-transparent" />

                  {/* Badges on image */}
                  <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 rounded-full border border-white/20 bg-black/70 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-white/90">
                    {projectType}
                  </span>
                  <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 flex items-center gap-1 rounded-full border border-white/15 bg-black/70 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[9px] font-bold text-white/80">
                    <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                  </div>
                </div>

                {/* ── Content panel ── */}
                <div
                  className={`flex flex-col justify-between gap-2.5 sm:gap-4 p-3.5 sm:p-6 md:p-7 flex-1 order-2 ${
                    isLeft ? "sm:order-1" : "sm:order-0"
                  }`}
                >
                  {/* Number + status */}
                  <div
                    className="flex items-center gap-2 w-full"
                    style={{ flexDirection: isLeft ? "row" : "row-reverse" }}
                  >
                    <span className="font-mono text-[10px] sm:text-xs font-bold text-primary/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-4 sm:w-6 bg-primary/30 flex-shrink-0" />
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                      {projectType}
                    </span>
                    <span className="flex-1" />
                    {project.status && (
                      <span className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-primary">
                        <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                        {project.status}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div className={`text-left ${isLeft ? "sm:text-left" : "sm:text-right"}`}>
                    <h3 className="text-sm sm:text-lg md:text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-[11px] sm:text-xs leading-relaxed text-muted-foreground line-clamp-2 sm:line-clamp-3 text-left ${
                      isLeft ? "sm:text-left" : "sm:text-right"
                    }`}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div
                    className={`flex flex-wrap gap-1 sm:gap-1.5 justify-start ${
                      isLeft ? "sm:justify-start" : "sm:justify-end"
                    }`}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-primary/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* URL + Buttons */}
                  <div
                    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2.5 sm:pt-3 border-t border-white/[0.06] ${
                      isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    {project.demo && project.demo !== "#" ? (
                      <div
                        className={`flex items-center gap-1 text-[9px] sm:text-[10px] text-muted-foreground/60 ${
                          isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                        }`}
                      >
                        <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                        <span className="font-mono">{project.demo.replace("https://", "")}</span>
                      </div>
                    ) : <div />}

                    <div
                      className={`flex flex-wrap items-center gap-1.5 sm:gap-2 justify-start ${
                        isLeft ? "sm:justify-start" : "sm:justify-end"
                      }`}
                    >
                      <Magnetic strength={0.3}>
                        <RippleButton
                          className="h-7 sm:h-8 rounded-full border border-white/10 bg-white/[0.04] px-3 sm:px-4 text-[9px] sm:text-[10px] font-bold text-foreground backdrop-blur-xl transition-all hover:border-primary/40 hover:bg-primary/10 active:scale-95"
                          onClick={() => window.open(project.github, "_blank", "noopener,noreferrer")}
                        >
                          <span className="flex items-center gap-1">
                            <Github className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            Code
                          </span>
                        </RippleButton>
                      </Magnetic>

                      <Magnetic strength={0.3}>
                        <RippleButton
                          className={`h-7 sm:h-8 rounded-full border px-3 sm:px-4 text-[9px] sm:text-[10px] font-bold backdrop-blur-xl transition-all active:scale-95 ${
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
                          <span className="flex items-center gap-1">
                            {project.demo && project.demo !== "#" ? (
                              <><ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />Live Demo</>
                            ) : (
                              <><Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />Not Available</>
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
