import { useState } from "react";
import { HIGHLIGHTS, PERSONAL_DETAILS, EXPERIENCE_LIST } from "@/constants";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";

const About = () => {
  const profile = PERSONAL_DETAILS;
  const about = profile.about;
  const experienceCount = profile.experience.miniProjects;

  const [expandedExp, setExpandedExp] = useState<number | null>(0);

  return (
    <section id="about" className="relative min-h-screen w-full flex flex-col justify-center items-center z-20 bg-transparent py-20 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        {/* Section header */}
        <div className="mb-14 md:mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-3">
            01 / Background
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            {about.heading} {about.headingAccent}
          </h2>
        </div>

        {/* Story / Summary — Box-free, pure editorial layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-16 border-b border-white/10">
          <div className="md:col-span-8 space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
              BROTOTYPE <span className="text-sm font-normal text-muted-foreground">| Intensive Software Engineering Program</span>
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {about.summary}
            </p>
            <div className="flex items-center gap-6 text-xs font-mono text-muted-foreground/80 pt-2">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> Kerala, India
              </span>
              <a
                href="https://www.brototype.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline underline-offset-4"
              >
                brototype.com
              </a>
            </div>
          </div>

          {/* Humble stats column — no chunky cards */}
          <div className="md:col-span-4 flex flex-col justify-between py-2 border-l border-white/10 pl-6 md:pl-8 space-y-6">
            <div>
              <div className="text-4xl md:text-5xl font-bold font-mono text-foreground">{experienceCount}+</div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mt-1">Projects Built</p>
            </div>
            {HIGHLIGHTS.slice(0, 2).map((item, idx) => (
              <div key={idx}>
                <div className="text-base font-bold text-foreground">{item.title}</div>
                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience — Clean list without box containers */}
        <div className="pt-16">
          <div className="mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
              Experience & Path
            </h3>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mt-1">
              Practical engineering journey
            </p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {EXPERIENCE_LIST.map((exp, idx) => {
              const isExpanded = expandedExp === idx;
              return (
                <div key={idx} className="py-6 transition-colors">
                  <div
                    onClick={() => setExpandedExp(isExpanded ? null : idx)}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-foreground group-hover:text-white transition-colors">
                        {exp.title}
                      </h4>
                      <p className="text-xs font-mono text-muted-foreground">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-muted-foreground">
                        {exp.period}
                      </span>
                      <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 text-sm text-muted-foreground leading-relaxed">
                      {exp.points ? (
                        <ul className="space-y-2 pl-4 list-disc text-sm">
                          {exp.points.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{exp.description}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
