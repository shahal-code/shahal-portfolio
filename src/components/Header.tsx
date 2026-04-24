import { useState, useEffect, useRef } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Magnetic from "@/components/Magnetic";
import RippleButton from "@/components/ui/RippleButton";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  onOpenContact?: () => void;
}

const Header = ({ onOpenContact }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navigate = useNavigate();
  const location = useLocation();
  const isManualScroll = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);

          if (!isManualScroll.current) {
            const sections = ["hero", "about", "services", "skills", "projects"];
            let minDistance = Infinity;
            let currentSection = activeSection;

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

            if (currentSection && currentSection !== activeSection) {
              setActiveSection(currentSection);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const navLinks = [
    { label: "Home", sectionId: "hero" },
    { label: "About", sectionId: "about" },
    { label: "Services", sectionId: "services" },
    { label: "Skills", sectionId: "skills" },
    { label: "Mini Projects", sectionId: "projects" }
  ];

  const scrollToSection = (sectionId: string) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        isManualScroll.current = true;
        setActiveSection(sectionId);
        element.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          isManualScroll.current = false;
        }, 1000);
      }
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] pt-4 px-4`}
    >
      <div
        className={`
          mx-auto transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${isScrolled
            ? "max-w-[92%] sm:max-w-4xl bg-white/[0.05] dark:bg-black/20 backdrop-blur-2xl shadow-2xl border border-white/10 py-2 rounded-2xl px-6"
            : "max-w-full md:max-w-7xl bg-transparent py-4 px-4"
          }
          md:block hidden
        `}
      >
        <div className="flex items-center justify-between h-14">
          <Magnetic strength={0.4}>
            <Link
              to="/"
              className="flex items-center gap-1.5 transition-all duration-300"
            >
              <span className="text-2xl font-bold tracking-tighter animate-color-cycle">
                MS
              </span>
              <span className="text-2xl font-black animate-color-cycle-reverse">
                .
              </span>
            </Link>
          </Magnetic>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <Magnetic key={link.label} strength={0.2}>
                    <RippleButton
                      onClick={() => scrollToSection(link.sectionId)}
                      className={`
                        relative px-6 py-2 rounded-full text-sm font-semibold transition-all duration-150 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                        ${isActive
                          ? "text-primary bg-primary/15 backdrop-blur-[20px] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3),inset_-2px_-4px_8px_rgba(0,0,0,0.3),0_10px_30px_hsl(var(--primary)/0.2)] border border-primary/30"
                          : "text-muted-foreground hover:text-primary hover:bg-primary/5 hover:backdrop-blur-[20px] hover:scale-110 hover:shadow-[inset_3px_3px_10px_rgba(255,255,255,0.2),inset_-3px_-3px_10px_rgba(0,0,0,0.2),0_15px_25px_hsl(var(--primary)/0.15)] active:scale-95"
                        }
                      `}
                    >
                      {link.label}
                    </RippleButton>
                  </Magnetic>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <Magnetic strength={0.3}>
                <ThemeToggle />
              </Magnetic>
            </div>
          </nav>
        </div>
      </div>

      {/* Dynamic Island Header for Mobile */}
      <div className="md:hidden flex justify-center w-full">
        <div className={`
          flex items-center justify-between gap-8 px-8 py-3 rounded-full border border-white/10 transition-all duration-500
          ${isScrolled 
            ? "bg-background/60 backdrop-blur-2xl shadow-2xl w-[92%] border-white/20" 
            : "bg-transparent w-full border-transparent"
          }
        `}>
          <Magnetic strength={0.4}>
            <Link
              to="/"
              className="flex items-center gap-1.5"
            >
              <span className="text-2xl font-bold tracking-tighter animate-color-cycle">MS</span>
              <span className="text-2xl font-black animate-color-cycle-reverse">.</span>
            </Link>
          </Magnetic>

          <Magnetic strength={0.3}>
            <ThemeToggle />
          </Magnetic>
        </div>
      </div>
    </header>
  );
};

export default Header;
