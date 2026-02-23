import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { HIGHLIGHTS, PERSONAL_DETAILS, EDUCATION, EXPERIENCE_LIST } from "@/constants";
import Magnetic from "@/components/Magnetic";
import { GraduationCap, Briefcase, MapPin, Globe, ChevronDown, ChevronUp } from "lucide-react";

const About = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [expandedEdu, setExpandedEdu] = useState<number | null>(null);
  const [expandedExp, setExpandedExp] = useState<number | null>(null);

  return (
    <section id="about" className="py-28 relative overflow-hidden scroll-mt-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div ref={sectionRef} className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className={`text-center mb-20 reveal-base reveal-up ${isVisible ? 'revealed' : ''}`}>
            <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4 px-4 py-1.5 bg-primary/10 rounded-full">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight transition-all">
              <span className="animate-color-cycle">{PERSONAL_DETAILS.about.heading}</span><br />
              <span className="animate-color-cycle-reverse">{PERSONAL_DETAILS.about.headingAccent}</span>
            </h2>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-min">

            {/* Summary Card - Highlight Brototype */}
            <div className={`lg:col-span-8 reveal-base reveal-up ${isVisible ? 'revealed' : ''}`}>
              <Magnetic strength={0.1} className="w-full h-full">
                <div className="p-8 rounded-[2.5rem] bg-card border border-border/50 shadow-sm backdrop-blur-3xl h-full cursor-pointer hover:border-primary/30 transition-all duration-500">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 animate-pulse-slow">
                      <Globe className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        BROTOTYPE <span className="text-primary text-sm font-normal">| Intensive MERN Program</span>
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                        {PERSONAL_DETAILS.about.summary}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm text-primary/80">
                          <MapPin size={16} /> Kerala, India
                        </div>
                        <a href="https://www.brototype.com" target="_blank" rel="noopener" className="flex items-center gap-2 text-sm hover:text-primary transition-colors underline underline-offset-4">
                          www.brototype.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Magnetic>
            </div>

            {/* Quick Stats/Highlights */}
            <div className={`lg:col-span-4 grid grid-cols-2 gap-4 reveal-base reveal-up ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '0.2s' }}>
              {HIGHLIGHTS.map((item, idx) => (
                <Magnetic key={idx} strength={0.2} className="w-full">
                  <div className="p-6 rounded-[2rem] bg-card border border-border/50 shadow-sm backdrop-blur-3xl hover:border-primary/30 transition-all duration-500 group h-full cursor-pointer">
                    <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-[10px] text-muted-foreground">{item.description}</p>
                  </div>
                </Magnetic>
              ))}
            </div>

            {/* Education & Experience Row */}
            <div className={`lg:col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-6 reveal-base reveal-up ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '0.3s' }}>

              {/* Education Timeline */}
              <div className="p-8 rounded-[2.5rem] bg-card border border-border/50 shadow-sm backdrop-blur-3xl flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold">Education</h3>
                </div>
                <div className="space-y-4">
                  {EDUCATION.map((edu, idx) => (
                    <div
                      key={idx}
                      onClick={() => setExpandedEdu(expandedEdu === idx ? null : idx)}
                      className="p-5 rounded-2xl bg-white/5 border border-white/5 cursor-pointer hover:border-primary/30 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-primary text-xs font-bold tracking-widest uppercase mb-1 block">{edu.period}</span>
                          <h4 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">{edu.title}</h4>
                          <p className="text-xs text-muted-foreground">{edu.institution}</p>
                        </div>
                        <div className="text-primary/50">
                          {expandedEdu === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </div>
                      <div className={`text-sm leading-relaxed text-muted-foreground/80 transition-all duration-500 overflow-hidden ${expandedEdu === idx ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                        {edu.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Experience */}
              <div className="p-8 rounded-[2.5rem] bg-card border border-border/50 shadow-sm backdrop-blur-3xl flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold">Experience</h3>
                </div>
                <div className="space-y-4">
                  {EXPERIENCE_LIST.map((exp, idx) => (
                    <div
                      key={idx}
                      onClick={() => setExpandedExp(expandedExp === idx ? null : idx)}
                      className="p-5 rounded-2xl bg-white/5 border border-white/5 cursor-pointer hover:border-primary/30 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-base text-primary">{exp.title}</h4>
                          <p className="text-xs text-foreground/80 mb-2">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">{exp.period}</span>
                          <div className="text-primary/50">
                            {expandedExp === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </div>
                        </div>
                      </div>
                      <div className={`transition-all duration-500 overflow-hidden ${expandedExp === idx ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
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

            {/* Video & Highlights Row */}
            <div className={`lg:col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-6 reveal-base reveal-up ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '0.4s' }}>

              {/* Video Editing */}
              <Magnetic strength={0.2} className="w-full h-full">
                <div className="p-8 rounded-[2.5rem] bg-card border border-border/50 shadow-sm backdrop-blur-3xl h-full cursor-pointer group hover:border-primary/30 transition-all">
                  <h3 className="text-lg font-bold mb-3">Video Editing</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Intermediate-level experience crafting engaging visuals with smooth transitions, clean cuts, effects, and sound design to enhance storytelling.
                  </p>
                </div>
              </Magnetic>

              {/* Counter */}
              <Magnetic strength={0.3} className="w-full h-full">
                <div className="p-8 rounded-[2.5rem] bg-card border border-border/50 shadow-sm backdrop-blur-3xl flex items-center justify-center group overflow-hidden relative h-full cursor-pointer hover:border-primary/30 transition-all">
                  <div className="z-10 text-center">
                    <span className="text-6xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{PERSONAL_DETAILS.experience.miniProjects}</span>
                    <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mt-2">Projects Completed</p>
                  </div>
                  <div className="absolute inset-0 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />
                </div>
              </Magnetic>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
