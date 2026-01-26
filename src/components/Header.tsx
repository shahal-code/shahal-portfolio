import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Magnetic from "@/components/Magnetic";
import RippleButton from "@/components/ui/RippleButton";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  onOpenContact?: () => void;
}

const Header = ({ onOpenContact }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isManualScroll = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking && !isManualScroll.current) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);

          const sections = navLinks.map(link => link.sectionId);
          const currentSection = sections.find(section => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 150 && rect.bottom >= 150;
            }
            return false;
          });

          if (currentSection) {
            setActiveSection(currentSection);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === "/home" && location.state?.scrollTo) {
      // Optimistically set active section active
      setActiveSection(location.state.scrollTo);

      // Lock scroll spy to prevent overrides during page load/animation
      isManualScroll.current = true;

      // Unlock after Index.tsx's 100ms delay + buffer
      setTimeout(() => {
        isManualScroll.current = false;
      }, 300);
    } else if (location.pathname === "/home" && !location.state?.scrollTo) {
      // If simply determining home without specific scroll, usually top
      // But let's trust scroll-spy unless it's a fresh load where we might want default
    }
  }, [location]);

  const navLinks = [
    { label: "Home", sectionId: "hero" },
    { label: "About", sectionId: "about" },
    { label: "Skills", sectionId: "skills" },
    { label: "Mini Projects", sectionId: "projects" }
  ];

  const scrollToSection = (sectionId: string) => {
    if (location.pathname === "/home") {
      const element = document.getElementById(sectionId);
      if (element) {
        // Lock scroll spy
        isManualScroll.current = true;
        setActiveSection(sectionId); // Set immediately

        element.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);

        // Unlock after animation (approx 1000ms)
        setTimeout(() => {
          isManualScroll.current = false;
        }, 1000);
      }
    } else {
      navigate("/home", { state: { scrollTo: sectionId } });
      setIsMobileMenuOpen(false);
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
            ? "max-w-4xl bg-white/[0.02] backdrop-blur-3xl shadow-2xl border border-white/10 py-2.5 rounded-2xl px-6"
            : "max-w-7xl bg-transparent py-4 px-4"
          }
          ${isMobileMenuOpen ? "rounded-3xl bg-background/40 backdrop-blur-3xl border border-white/10 shadow-2xl" : ""}

        `}
      >
        <div className="flex items-center justify-between h-14">
          <Magnetic strength={0.4}>
            <RippleButton
              onClick={() => navigate("/home")}
              className="text-3xl font-black tracking-tighter text-foreground group transition-all duration-500 bg-transparent hover:bg-transparent shadow-none border-none p-0 h-auto"
            >
              <span className="text-foreground transition-colors duration-500 group-hover:text-primary">MS</span>
              <span className="text-primary transition-colors duration-500 group-hover:text-foreground">.</span>
            </RippleButton>
          </Magnetic>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === "/home" && activeSection === link.sectionId;
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Magnetic strength={0.3}>
              <ThemeToggle />
            </Magnetic>
            <Magnetic strength={0.5}>
              <button
                className="text-foreground p-2 rounded-full hover:bg-primary/10 hover:backdrop-blur-3xl hover:border hover:border-primary/20 transition-all duration-500 active:scale-90"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-8 animate-fade-in px-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === "/home" && activeSection === link.sectionId;
                return (
                  <RippleButton
                    key={link.label}
                    onClick={() => scrollToSection(link.sectionId)}
                    className={`
                      w-full text-left text-xl py-4 px-8 rounded-2xl transition-all duration-150 font-bold
                      ${isActive
                        ? "text-primary bg-primary/15 backdrop-blur-[20px] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3),inset_-2px_-4px_8px_rgba(0,0,0,0.3),0_10px_30px_hsl(var(--primary)/0.2)] border border-primary/30"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5 hover:backdrop-blur-[20px] hover:shadow-[inset_2px_2px_8px_rgba(255,255,255,0.2),inset_-2px_-2px_8px_rgba(0,0,0,0.2)] active:scale-[0.98]"
                      }
                    `}
                  >
                    {link.label}
                  </RippleButton>
                );
              })}
              <div className="pt-4">
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
