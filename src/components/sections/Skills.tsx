import { useMemo } from "react";
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
  return (
    <section id="skills" className="sticky top-0 min-h-screen w-full flex flex-col justify-center items-center relative z-40 bg-background border-t border-white/10 shadow-[0_-30px_70px_rgba(0,0,0,0.9)] py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        {/* Section Header */}
        <div className="mb-14 md:mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-3">
            03 / Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Core Proficiencies
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
            Technologies and tooling I use daily to architect, build, and deploy production software.
          </p>
        </div>

        {/* Clean, box-free skill groups */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {SECTION_GROUPS.map((group, index) => {
            const groupSkills = SKILLS.filter((s) => group.categories.includes(s.category));
            if (groupSkills.length === 0) return null;

            return (
              <div key={group.id} className="py-10 md:py-12 group transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12">
                  {/* Left: Category info */}
                  <div className="md:w-2/5 flex items-start gap-4">
                    <span className="text-xs font-mono text-muted-foreground/60 pt-1">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                        {group.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {group.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Right: Skills as clean tags */}
                  <div className="md:w-3/5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      {groupSkills.map((skill) => (
                        <div
                          key={skill.name}
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06] transition-colors"
                        >
                          <div className="w-3.5 h-3.5 flex items-center justify-center opacity-80">
                            {typeof skill.icon === "string" ? (
                              <IconRenderer name={skill.icon} className="w-full h-full" />
                            ) : (
                              <skill.icon />
                            )}
                          </div>
                          <span className="text-xs font-medium text-foreground">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
