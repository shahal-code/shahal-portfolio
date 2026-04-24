import { useState, useEffect } from "react";
import { Home, User, Layers, Code, Briefcase } from "lucide-react";
import { useLocation } from "react-router-dom";
import Magnetic from "./Magnetic";
import RippleButton from "./ui/RippleButton";
import { motion, AnimatePresence } from "framer-motion";

const MobileDock = () => {
    const [activeSection, setActiveSection] = useState("hero");
    const location = useLocation();

    const navLinks = [
        { id: "hero", icon: Home, label: "Home" },
        { id: "about", icon: User, label: "About" },
        { id: "services", icon: Layers, label: "Services" },
        { id: "skills", icon: Code, label: "Skills" },
        { id: "projects", icon: Briefcase, label: "Projects" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map(link => link.id);
            let currentSection = activeSection;
            let minDistance = Infinity;

            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const distance = Math.abs(rect.top - 100);
                    if (distance < minDistance) {
                        minDistance = distance;
                        currentSection = section;
                    }
                }
            });

            if (currentSection !== activeSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeSection]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center md:hidden pointer-events-none">
            <div className="bg-background/40 backdrop-blur-3xl border border-white/10 rounded-full p-2.5 flex items-center gap-1 shadow-[0_12px_40px_rgba(0,0,0,0.4)] pointer-events-auto mx-4">
                {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    const Icon = link.icon;

                    return (
                        <Magnetic key={link.id} strength={0.2}>
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
                                
                                {isActive && (
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
