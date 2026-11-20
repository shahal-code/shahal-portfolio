

import { motion, useReducedMotion } from "framer-motion";
import { SKILLS } from "@/constants";
import IconRenderer from "@/components/common/IconRenderer";
import { Layout, Server, Database, Cloud, Wrench } from "lucide-react";

const SECTION_GROUPS = [
{
id: "frontend",
title: "Frontend & Mobile",
subtitle: "Client interfaces, state management & reactive UIs",
icon: Layout,
categories: ["Frontend", "Styling", "Mobile"],
},
{
id: "backend",
title: "Backend & Systems",
subtitle: "REST APIs, authentication & scalable services",
icon: Server,
categories: ["Backend"],
},
{
id: "database",
title: "Databases & Storage",
subtitle: "Relational SQL, NoSQL & in-memory caching",
icon: Database,
categories: ["Database"],
},
{
id: "devops",
title: "DevOps & Cloud",
subtitle: "Containers, reverse proxies & deployment",
icon: Cloud,
categories: ["DevOps"],
},
{
id: "tools",
title: "Tools & Workflow",
subtitle: "Version control, API testing & design prototyping",
icon: Wrench,
categories: ["Tools", "Design"],
},
];

const Skills = () => {
const shouldReduceMotion = useReducedMotion();

return (
<section
id="skills"
className="relative min-h-screen w-full flex flex-col justify-center items-center z-20 bg-transparent py-24 md:py-32 overflow-hidden"
style={{ perspective: "1600px" }}
>
{/* Ambient Background Glow */}
<div className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-blue-500/[0.06] blur-[120px] pointer-events-none" />
<div className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-purple-500/[0.06] blur-[120px] pointer-events-none" />
  <div className="container relative mx-auto px-6 md:px-12 max-w-6xl">

    {/* Section Header */}
    <motion.div
      className="mb-16 md:mb-24"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground block mb-4">
        03 / Technology Stack
      </span>

      <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
        Core{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white ">
          Proficiencies.
        </span>
      </h2>

      <p className="mt-5 text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
        The technologies and tools I use to transform ideas into
        scalable digital experiences.
      </p>
    </motion.div>

    {/* Skill Categories */}
    <div className="space-y-5">
      {SECTION_GROUPS.map((group, index) => {
        const groupSkills = SKILLS.filter((skill) =>
          group.categories.includes(skill.category)
        );

        if (groupSkills.length === 0) return null;

        const GroupIcon = group.icon;

        return (
          <motion.div
            key={group.id}
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 55, rotateX: -8 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
              rotateX: 0,
            }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.8,
              delay: shouldReduceMotion ? 0 : index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative group/category"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative grid grid-cols-1 md:grid-cols-[0.8fr_1.5fr] gap-8 md:gap-12 p-6 md:p-9 rounded-2xl border border-white/[0.07] bg-white/[0.015] backdrop-blur-sm transition-all duration-500 hover:border-white/[0.16] hover:bg-white/[0.035]">

              {/* Category Information */}
              <div className="flex items-start gap-4">
                <span className="text-xs font-mono text-muted-foreground/50 pt-1">
                  0{index + 1}
                </span>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.04] group-hover/category:border-blue-400/30 group-hover/category:bg-blue-400/[0.08] transition-all duration-500">
                      <GroupIcon className="w-4 h-4 text-muted-foreground group-hover/category:text-blue-400 transition-colors duration-500" />
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight">
                      {group.title}
                    </h3>
                  </div>

                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {group.subtitle}
                  </p>
                </div>
              </div>

              {/* 3D Floating Skill Tags */}
              <div
                className="flex flex-wrap items-center gap-3 md:gap-4"
                style={{ perspective: "1000px" }}
              >
                {groupSkills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 25,
                            scale: 0.8,
                            rotateX: -20,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      rotateX: 0,
                    }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.55,
                      delay: shouldReduceMotion
                        ? 0
                        : skillIndex * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -9,
                            z: 35,
                            scale: 1.1,
                            rotateX: 12,
                            rotateY: -10,
                            transition: {
                              type: "spring",
                              stiffness: 350,
                              damping: 14,
                            },
                          }
                    }
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: [0, -3, 0],
                          }
                    }
                    className="relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/[0.09] bg-gradient-to-br from-white/[0.07] to-white/[0.015] hover:from-white/[0.12] hover:to-white/[0.04] hover:border-blue-400/40 cursor-default group/skill"
                    style={{
                      transformStyle: "preserve-3d",
                      boxShadow:
                        "0 5px 20px rgba(0,0,0,0.12)",
                    }}
                  >
                    {/* Hover Glow */}
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/[0.12] via-transparent to-purple-400/[0.12] opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* 3D Icon */}
                    <div
                      className="relative w-4 h-4 flex items-center justify-center opacity-80 group-hover/skill:opacity-100 transition-all duration-300 group-hover/skill:scale-110"
                      style={{ transform: "translateZ(22px)" }}
                    >
                      {typeof skill.icon === "string" ? (
                        <IconRenderer
                          name={skill.icon}
                          className="w-full h-full"
                        />
                      ) : (
                        <skill.icon />
                      )}
                    </div>

                    {/* Skill Name */}
                    <span
                      className="relative text-xs md:text-sm font-medium text-foreground whitespace-nowrap"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      {skill.name}
                    </span>

                    {/* Bottom Highlight */}
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>

    {/* Bottom Label */}
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="mt-12 flex items-center justify-center gap-3"
    >
      <span className="w-8 h-px bg-white/20" />
      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground/60">
        Always Learning · Always Building
      </span>
      <span className="w-8 h-px bg-white/20" />
    </motion.div>

  </div>
</section>
);
};

export default Skills;