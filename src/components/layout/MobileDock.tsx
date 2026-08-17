import { useState, useEffect } from "react";
import { Home, User, Layers, Code, Briefcase, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Magnetic from "@/components/common/Magnetic";
import RippleButton from "@/components/ui/RippleButton";
import { motion, AnimatePresence } from "framer-motion";
import { useLowPerformanceMode } from "@/hooks/usePerformanceMode";

const MobileDock = () => {
    const [activeSection, setActiveSection] = useState("hero");
    const location = useLocation();
    const navigate = useNavigate();
    const lowPerformance = useLowPerformanceMode();

    const navLinks = [
        { id: "hero", icon: Home, label: "Home" },
        { id: "about", icon: User, label: "About" },
        { id: "services", icon: Layers, label: "Services" },
        { id: "skills", icon: Code, label: "Skills" },
        { id: "projects", icon: Briefcase, label: "Projects" },
        { id: "freelance", icon: Sparkles, label: "Freelance" },
    ];

    useEffect(() => {
        const sections = navLinks.map(link => link.id);
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter((e) => e.isIntersecting);
                if (visibleEntries.length > 0) {
                    const mostVisible = visibleEntries.reduce((prev, curr) =>
                        curr.intersectionRatio > prev.intersectionRatio ? curr : prev
                    );
                    if (mostVisible.target.id) {
                        setActiveSection(mostVisible.target.id);
                    }
                }
            },
            {
                rootMargin: "-20% 0px -40% 0px",
                threshold: [0.1, 0.3, 0.6],
            }
        );

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (sectionId: string) => {
        const performScroll = () => {
            const element = document.getElementById(sectionId);
            if (element) {
                if (window.__lenis) {
                    window.__lenis.scrollTo(element, { offset: -70, duration: 1.2 });
                } else {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        };

        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(performScroll, 100);
            return;
        }

        performScroll();
    };

    return (
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center md:hidden pointer-events-none">
            <div className="bg-background/40 backdrop-blur-3xl border border-white/10 rounded-full p-2.5 flex items-center gap-1 shadow-[0_12px_40px_rgba(0,0,0,0.4)] pointer-events-auto mx-4">
                {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    const Icon = link.icon;

                    return (
                        <Magnetic key={link.id} strength={lowPerformance ? 0 : 0.2}>
                            <RippleButton
                                onClick={() => scrollToSection(link.id)}
                                className={`
                                    relative p-4 rounded-full transition-all duration-300
                                    ${isActive 
                                        ? "text-primary bg-primary/15 backdrop-blur-[20px] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3),inset_-2px_-4px_8px_rgba(0,0,0,0.3),0_10px_30px_hsl(var(--primary)/0.2)] border border-primary/30 scale-110" 
                                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                    }
                                `}
                            >
                                <Icon size={24} className={isActive ? "scale-105" : "scale-100"} />
                                
                                {isActive && !lowPerformance && (
                                    <motion.div
                                        layoutId="active-pill-mobile"
                                        className="absolute inset-0 rounded-full -z-10"
                                        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                    />
                                )}
                            </RippleButton>
                        </Magnetic>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileDock;
