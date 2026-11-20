
import {
  ExternalLink,
  Github,
  Lock,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import RippleButton from "@/components/ui/RippleButton";
import { PROJECTS } from "@/constants";

// ======================================================
// TYPES
// ======================================================

type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  demo: string;
  status?: string;
};

// ======================================================
// PROJECT TYPE
// ======================================================

const getProjectType = (title: string) => {
  const normalizedTitle = title.toLowerCase();

  if (
    normalizedTitle.includes("chat") ||
    normalizedTitle.includes("talks")
  ) {
    return "Realtime Platform";
  }

  if (
    normalizedTitle.includes("ai") ||
    normalizedTitle.includes("novuai")
  ) {
    return "Agentic AI Build";
  }

  return "Full Stack Build";
};

// ======================================================
// PROJECTS COMPONENT
// ======================================================

const Projects = () => {
  return (
    <section
      id="projects"
      className="
        relative min-h-screen w-full
        flex flex-col justify-center items-center
        z-20 bg-transparent
        py-20 md:py-28
        overflow-hidden
      "
    >

      {/* ==================================================
          AMBIENT BACKGROUND
      ================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          className="
            absolute top-1/3 -right-32
            w-64 h-64 rounded-full
            bg-white/[0.02]
            blur-2xl
          "
        />

        <div
          className="
            absolute bottom-1/4 -left-32
            w-64 h-64 rounded-full
            bg-white/[0.01]
            blur-2xl
          "
        />

      </div>

      <div className="premium-divider top-0" />

      {/* ==================================================
          SECTION HEADER
      ================================================== */}

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        <div className="max-w-6xl mx-auto mb-16">

          <div className="flex flex-col gap-4">

            <span
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-border/80
                bg-white/5 dark:bg-white/10
                px-3.5 py-1
                text-xs font-medium
                uppercase tracking-widest
                text-foreground/80
                w-fit
              "
            >
              Portfolio
            </span>

            <h2
              className="
                text-3xl font-bold leading-tight
                md:text-4xl lg:text-5xl
              "
            >
              Selected{" "}
              <span className="animate-color-cycle">
                Project
              </span>{" "}
              <span className="animate-color-cycle-reverse">
                Missions
              </span>
            </h2>

            <p
              className="
                max-w-md
                text-sm leading-7
                text-muted-foreground
              "
            >
              Featured builds with live previews, stack details,
              and direct access to code or live demos.
            </p>

          </div>

        </div>

      </div>

      {/* ==================================================
          PROJECT CARDS
      ================================================== */}

      <div className="relative z-10 w-full space-y-6">

        {PROJECTS.map((project: Project, index: number) => {

          const isLeft = index % 2 === 0;
          const projectType = getProjectType(project.title);

          const hasDemo =
            Boolean(project.demo) && project.demo !== "#";

          return (

            <div
              key={project.title}
              className={`
                freelance-card-wrap
                ${isLeft
                  ? "freelance-card-left"
                  : "freelance-card-right"
                }
              `}
            >

              <article
                className="
                  group relative
                  rounded-xl
                  border border-white/10
                  bg-transparent
                  overflow-hidden
                  transition-colors duration-200
                  hover:border-white/20
                  flex flex-col sm:flex-row
                "
                style={{ minHeight: "160px" }}
              >

                {/* ==================================================
                    PROJECT IMAGE
                ================================================== */}

                <div
                  className={`
                    relative w-full sm:w-[38%]
                    h-36 min-[400px]:h-40
                    sm:h-auto sm:min-h-[180px]
                    flex-shrink-0 overflow-hidden
                    order-1
                    ${isLeft
                      ? "sm:order-0"
                      : "sm:order-1"
                    }
                  `}
                >

                  <img
                    src={project.image}
                    alt={project.title}
                    loading={index < 2 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                    className="
                      absolute inset-0
                      h-full w-full
                      object-cover
                      transition-transform duration-300
                      motion-safe:md:group-hover:scale-105
                    "
                  />

                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-br
                      from-black/50
                      via-black/20
                      to-transparent
                      pointer-events-none
                    "
                  />

                  {/* PROJECT TYPE */}

                  <span
                    className="
                      absolute top-2.5 left-2.5
                      sm:top-3 sm:left-3
                      rounded-full
                      border border-white/20
                      bg-black/70
                      px-2 py-0.5 sm:px-2.5 sm:py-1
                      text-[8px] sm:text-[9px]
                      font-black uppercase
                      tracking-widest text-white/90
                    "
                  >
                    {projectType}
                  </span>

                  {/* IMAGE ICON */}

                  <div
                    className="
                      absolute bottom-2.5 right-2.5
                      sm:bottom-3 sm:right-3
                      flex items-center gap-1
                      rounded-full
                      border border-white/15
                      bg-black/70
                      px-2 py-0.5 sm:px-2.5 sm:py-1
                      text-[8px] sm:text-[9px]
                      font-bold text-white/80
                    "
                  >
                    <ArrowUpRight
                      className="
                        w-2.5 h-2.5 sm:w-3 sm:h-3
                        text-white
                      "
                    />
                  </div>

                </div>

                {/* ==================================================
                    PROJECT CONTENT
                ================================================== */}

                <div
                  className={`
                    flex flex-col justify-between
                    gap-2.5 sm:gap-4
                    p-3.5 sm:p-6 md:p-7
                    flex-1 order-2
                    ${isLeft
                      ? "sm:order-1"
                      : "sm:order-0"
                    }
                  `}
                >

                  {/* NUMBER + STATUS */}

                  <div
                    className="
                      flex items-center gap-2 w-full
                    "
                    style={{
                      flexDirection: isLeft
                        ? "row"
                        : "row-reverse",
                    }}
                  >

                    <span
                      className="
                        font-mono
                        text-[10px] sm:text-xs
                        font-bold text-foreground/70
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="
                        h-px w-4 sm:w-6
                        bg-white/20 flex-shrink-0
                      "
                    />

                    <span
                      className="
                        text-[8px] sm:text-[9px]
                        font-bold uppercase
                        tracking-widest
                        text-muted-foreground
                      "
                    >
                      {projectType}
                    </span>

                    <span className="flex-1" />

                    {project.status && (

                      <span
                        className="
                          flex items-center gap-1
                          rounded-full
                          border border-white/20
                          bg-white/10
                          px-2 py-0.5
                          text-[8px] sm:text-[9px]
                          font-bold uppercase
                          tracking-widest
                          text-foreground
                        "
                      >

                        <span
                          className="
                            w-1 h-1 rounded-full
                            bg-white
                          "
                        />

                        {project.status}

                      </span>

                    )}

                  </div>

                  {/* TITLE */}

                  <div
                    className={`
                      text-left
                      ${isLeft
                        ? "sm:text-left"
                        : "sm:text-right"
                      }
                    `}
                  >

                    <h3
                      className="
                        text-sm sm:text-lg md:text-xl
                        font-bold tracking-tight
                        text-foreground
                      "
                    >
                      {project.title}
                    </h3>

                  </div>

                  {/* DESCRIPTION */}

                  <p
                    className={`
                      text-[11px] sm:text-xs
                      leading-relaxed
                      text-muted-foreground
                      line-clamp-2 sm:line-clamp-3
                      text-left
                      ${isLeft
                        ? "sm:text-left"
                        : "sm:text-right"
                      }
                    `}
                  >
                    {project.description}
                  </p>

                  {/* TECHNOLOGY TAGS */}

                  <div
                    className={`
                      flex flex-wrap gap-1 sm:gap-1.5
                      justify-start
                      ${isLeft
                        ? "sm:justify-start"
                        : "sm:justify-end"
                      }
                    `}
                  >

                    {project.tags.map((tag) => (

                      <span
                        key={tag}
                        className="
                          rounded-full
                          border border-white/10
                          bg-white/[0.03]
                          px-2 py-0.5
                          text-[8px] sm:text-[9px]
                          font-bold uppercase
                          tracking-wider
                          text-foreground/80
                        "
                      >
                        {tag}
                      </span>

                    ))}

                  </div>

                  {/* ==================================================
                      LINKS + BUTTONS
                  ================================================== */}

                  <div
                    className={`
                      flex flex-col sm:flex-row
                      items-start sm:items-center
                      justify-between
                      gap-2
                      pt-2.5 sm:pt-3
                      border-t border-white/[0.06]
                      ${isLeft
                        ? "sm:flex-row"
                        : "sm:flex-row-reverse"
                      }
                    `}
                  >

                    {/* DEMO URL */}

                    {hasDemo ? (

                      <div
                        className={`
                          flex items-center gap-1
                          text-[9px] sm:text-[10px]
                          text-muted-foreground/60
                          min-w-0
                          ${isLeft
                            ? "sm:flex-row"
                            : "sm:flex-row-reverse"
                          }
                        `}
                      >

                        <MapPin
                          className="
                            w-2.5 h-2.5
                            flex-shrink-0
                          "
                        />

                        <span className="
                          font-mono truncate
                        ">
                          {project.demo.replace(
                            "https://",
                            ""
                          )}
                        </span>

                      </div>

                    ) : (
                      <div />
                    )}

                    {/* ACTION BUTTONS */}

                    <div
                      className={`
                        flex flex-wrap items-center
                        gap-1.5 sm:gap-2
                        justify-start
                        ${isLeft
                          ? "sm:justify-start"
                          : "sm:justify-end"
                        }
                      `}
                    >

                      {/* GITHUB */}

                      <RippleButton
                        className="
                          h-7 sm:h-8
                          rounded-full
                          border border-white/10
                          bg-white/[0.04]
                          px-3 sm:px-4
                          text-[9px] sm:text-[10px]
                          font-bold text-foreground
                          transition-colors duration-200
                          hover:border-white/30
                          hover:bg-white/10
                          active:scale-95
                        "
                        onClick={() =>
                          window.open(
                            project.github,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                      >

                        <span className="flex items-center gap-1">

                          <Github
                            className="
                              w-2.5 h-2.5 sm:w-3 sm:h-3
                            "
                          />

                          Code

                        </span>

                      </RippleButton>

                      {/* LIVE DEMO */}

                      <RippleButton
                        className={`
                          h-7 sm:h-8
                          rounded-full
                          border px-3 sm:px-4
                          text-[9px] sm:text-[10px]
                          font-bold
                          transition-colors duration-200
                          active:scale-95
                          ${hasDemo
                            ? `
                              border-white/30
                              bg-white/15
                              text-foreground
                              hover:bg-white/25
                            `
                            : `
                              cursor-not-allowed
                              border-white/10
                              bg-white/[0.03]
                              text-muted-foreground
                            `
                          }
                        `}
                        disabled={!hasDemo}
                        onClick={() => {
                          if (hasDemo) {
                            window.open(
                              project.demo,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }
                        }}
                      >

                        <span className="flex items-center gap-1">

                          {hasDemo ? (

                            <>
                              <ExternalLink
                                className="
                                  w-2.5 h-2.5 sm:w-3 sm:h-3
                                "
                              />
                              Live Demo
                            </>

                          ) : (

                            <>
                              <Lock
                                className="
                                  w-2.5 h-2.5 sm:w-3 sm:h-3
                                "
                              />
                              Not Available
                            </>

                          )}

                        </span>

                      </RippleButton>

                    </div>

                  </div>

                </div>

              </article>

            </div>

          );

        })}

      </div>

    </section>
  );
};

export default Projects;
