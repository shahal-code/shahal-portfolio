import { useState } from "react";
import { HIGHLIGHTS, PERSONAL_DETAILS, EXPERIENCE_LIST } from "@/constants";
import { Briefcase, MapPin, Globe, ChevronDown, ChevronUp } from "lucide-react";

const About = () => {
  const profile = PERSONAL_DETAILS;
  const about = profile.about;
  const experienceCount = profile.experience.miniProjects;

  const [expandedExp, setExpandedExp] = useState<number | null>(null);

  return (
    <section id="about" className="py-28 relative overflow-hidden scroll-mt-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4 px-4 py-1.5 bg-primary/10 rounded-full">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight transition-all">
              <span className="animate-color-cycle">{about.heading}</span><br />
              <span className="animate-color-cycle-reverse">{about.headingAccent}</span>
            </h2>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-min">

            {/* Summary Card - Highlight Brototype */}
            <div className="lg:col-span-8">
              <div className="p-8 rounded-[2.5rem] bg-card/85 dark:bg-white/[0.03] border border-border/60 dark:border-white/10 shadow-lg h-full hover:border-primary/50 transition-colors duration-300">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <Globe className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground">
                      BROTOTYPE <span className="text-primary text-sm font-normal">| Intensive Software Engineering Program</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                      {about.summary}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-sm text-primary/80">
                        <MapPin size={16} /> Kerala, India
                      </div>
                      <a href="https://www.brototype.com" target="_blank" rel="noopener" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4">
                        www.brototype.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats/Highlights */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              {HIGHLIGHTS.map((item, idx) => (
                <div key={idx} className="p-6 rounded-[2rem] bg-card/85 dark:bg-white/[0.03] border border-border/60 dark:border-white/10 shadow-lg hover:border-primary/50 transition-colors duration-300 group h-full">
                  <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="font-bold text-sm mb-1 text-foreground">{item.title}</h4>
                  <p className="text-[10px] text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Professional Experience Row */}
            <div className="lg:col-span-12">
              <div className="p-8 rounded-[2.5rem] bg-card/85 dark:bg-white/[0.03] border border-border/60 dark:border-white/10 shadow-lg flex flex-col h-full hover:border-primary/50 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                    <Briefcase className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Experience</h3>
                    <p className="text-xs text-muted-foreground">My technical path and hands-on engineering journey</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {EXPERIENCE_LIST.map((exp, idx) => (
                    <div
                      key={idx}
                      onClick={() => setExpandedExp(expandedExp === idx ? null : idx)}
                      className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-border/20 dark:border-white/5 cursor-pointer hover:border-primary/30 transition-colors duration-200 group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-base text-primary">{exp.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-full">{exp.period}</span>
                          <div className="text-primary/50">
                            {expandedExp === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </div>
                        </div>
                      </div>
                      <div className={`transition-all duration-300 overflow-hidden ${expandedExp === idx ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                        {exp.points ? (
                          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-2">
                            {exp.points.map((p, i) => <li key={i}>{p}</li>)}
                          </ul>
                        ) : (
                          <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Engineering Focus & Highlights Row */}
            <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Engineering Focus */}
              <div className="p-8 rounded-[2.5rem] bg-card/85 dark:bg-white/[0.03] border border-border/60 dark:border-white/10 shadow-lg h-full group hover:border-primary/50 transition-colors duration-300">
                <h3 className="text-lg font-bold mb-3 text-foreground">Engineering Focus</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Committed to crafting scalable architectures, resilient distributed microservices, and high-performance applications with clean, modular code.
                </p>
              </div>

              {/* Counter */}
              <div className="p-8 rounded-[2.5rem] bg-card/85 dark:bg-white/[0.03] border border-border/60 dark:border-white/10 shadow-lg flex items-center justify-center group overflow-hidden relative h-full hover:border-primary/50 transition-colors duration-300">
                <div className="z-10 text-center">
                  <span className="text-6xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{experienceCount}</span>
                  <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mt-2">Projects Completed</p>
                </div>
                <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 blur-2xl group-hover:bg-primary/15 transition-colors duration-300" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
