import { useState, useMemo } from "react";
import { SKILLS } from "@/constants";
import IconRenderer from "@/components/common/IconRenderer";
import { Layout, Server, Database, Cloud, Wrench, Layers } from "lucide-react";

interface SkillItem {
  name: string;
  icon: any;
  category: string;
}

const SECTION_GROUPS: {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  categories: string[];
  colSpan: string;
}[] = [
  {
    id: "frontend",
    title: "Frontend Architecture",
    subtitle: "Client interfaces, state management & reactive UIs",
    icon: Layout,
    categories: ["Frontend", "Styling", "Mobile"],
    colSpan: "lg:col-span-1",
  },
  {
    id: "backend",
    title: "Backend & Server Systems",
    subtitle: "Microservices, REST, GraphQL & real-time APIs",
    icon: Server,
    categories: ["Backend"],
    colSpan: "lg:col-span-1",
  },
  {
    id: "database",
    title: "Databases & Caching",
    subtitle: "Relational SQL, NoSQL & in-memory stores",
    icon: Database,
    categories: ["Database"],
    colSpan: "lg:col-span-1",
  },
  {
    id: "devops",
    title: "DevOps & Cloud Infrastructure",
    subtitle: "Containerization, reverse proxies & automated CI/CD",
    icon: Cloud,
    categories: ["DevOps"],
    colSpan: "lg:col-span-1",
  },
  {
    id: "tools",
    title: "Tools & Creative Design",
    subtitle: "Version control, API workflows & UI/UX prototyping",
    icon: Wrench,
    categories: ["Tools", "Design"],
    colSpan: "lg:col-span-2",
  },
];

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterTabs = useMemo(() => [
    { id: "all", label: "All Disciplines", icon: Layers },
    ...SECTION_GROUPS.map((g) => ({ id: g.id, label: g.title.split(" ")[0], icon: g.icon })),
  ], []);

  const visibleGroups = useMemo(() => 
    activeFilter === "all"
      ? SECTION_GROUPS
      : SECTION_GROUPS.filter((g) => g.id === activeFilter),
    [activeFilter]
  );

  return (
    <section id="skills" className="py-24 sm:py-28 relative overflow-hidden scroll-mt-32">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4 px-4 py-1.5 bg-primary/10 rounded-full">
                Technical Stack
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
                <span className="animate-color-cycle">Core</span>{" "}
                <span className="animate-color-cycle-reverse">Expertise</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Structured full-stack proficiencies across modern frontend ecosystems, scalable backend APIs, databases, and DevOps automation.
              </p>
            </div>

            {/* Quick Filter Tabs */}
            <div className="flex flex-wrap justify-center items-center gap-2 mb-10 max-w-3xl mx-auto">
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab.id;
                const TabIcon = tab.icon;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`
                      inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200
                      ${
                        isActive
                          ? "bg-primary/20 text-primary border border-primary/40 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.1),0_8px_20px_hsl(var(--primary)/0.15)] scale-105"
                          : "bg-card/60 dark:bg-white/[0.02] text-muted-foreground border border-border/40 dark:border-white/5 hover:text-foreground hover:bg-white/[0.06]"
                      }
                    `}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* 2-Column Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-7">
              {visibleGroups.map((group) => {
                const groupSkills = SKILLS.filter((s) => group.categories.includes(s.category));
                if (groupSkills.length === 0) return null;
                const GroupIcon = group.icon;
                const isFullWidth = activeFilter === "all" && group.colSpan === "lg:col-span-2";

                return (
                  <div
                    key={group.id}
                    className={`
                      relative p-6 sm:p-8 rounded-[2rem] bg-card/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/10
                      shadow-sm flex flex-col justify-between overflow-hidden group/bento transition-all duration-300 hover:border-primary/30
                      ${activeFilter === "all" ? group.colSpan : "col-span-1 lg:col-span-2"}
                    `}
                  >
                    {/* Top ambient glow */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover/bento:bg-primary/10 transition-colors" />

                    <div>
                      {/* Bento Card Header */}
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/30 dark:border-white/5 relative z-10">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                            <GroupIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                              {group.title}
                            </h3>
                            <p className="text-xs text-muted-foreground hidden sm:block">
                              {group.subtitle}
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 whitespace-nowrap">
                          {groupSkills.length} Skills
                        </span>
                      </div>

                      {/* Glass & Water Specular Capsule Pills */}
                      <div className={`flex flex-wrap gap-2.5 sm:gap-3 relative z-10 ${isFullWidth ? "justify-start" : ""}`}>
                        {groupSkills.map((skill) => (
                          <div
                            key={skill.name}
                            className="
                              group/pill relative bg-card/40 dark:bg-primary/5 border border-border/50 dark:border-primary/20 backdrop-blur-md rounded-full px-4 py-2 sm:px-4.5 sm:py-2.5
                              flex items-center gap-2.5 transition-all duration-300
                              shadow-[inset_2px_2px_4px_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.05)]
                              dark:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.12),inset_-2px_-4px_8px_rgba(0,0,0,0.25),0_8px_25px_hsl(var(--primary)/0.1)]
                              hover:bg-primary/20 hover:border-primary/40 hover:scale-105 hover:shadow-xl
                              cursor-pointer select-none
                            "
                          >
                            {/* Inner Water Glow on hover */}
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/pill:opacity-100 rounded-full blur-xl transition-opacity duration-300 pointer-events-none" />

                            <div className="relative z-10 flex items-center gap-2.5">
                              <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center group-hover/pill:scale-110 transition-transform duration-300">
                                {typeof skill.icon === "string" ? (
                                  <IconRenderer name={skill.icon} className="w-full h-full" />
                                ) : (
                                  <skill.icon />
                                )}
                              </div>
                              <div className="flex flex-col items-start">
                                <h4 className="font-bold text-foreground text-[10px] sm:text-xs leading-tight group-hover/pill:text-primary transition-colors">
                                  {skill.name}
                                </h4>
                                <span className="text-[7px] sm:text-[8px] font-bold text-primary uppercase opacity-60 mt-0.5 tracking-wider">
                                  {skill.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    </section>
  );
};

export default Skills;
