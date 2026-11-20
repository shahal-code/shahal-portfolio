import { useState, useEffect, useRef } from "react";
import ThemeToggle from "@/components/common/ThemeToggle";
import Magnetic from "@/components/common/Magnetic";
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
    let lastScrolled = window.scrollY > 50;
    setIsScrolled(lastScrolled);

    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled;
        setIsScrolled(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const sections = ["hero", "about", "services", "skills", "projects", "freelance"];
    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return;
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { label: "Home", sectionId: "hero" },
    { label: "About", sectionId: "about" },
    { label: "Services", sectionId: "services" },
    { label: "Skills", sectionId: "skills" },
    { label: "Projects", sectionId: "projects" },
    { label: "Freelance", sectionId: "freelance" }
  ];

  const scrollToSection = (sectionId: string) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        isManualScroll.current = true;
        setActiveSection(sectionId);
        if (window.__lenis) {
          window.__lenis.scrollTo(element, { offset: -70, duration: 1.2 });
        } else {
          element.scrollIntoView({ behavior: "smooth" });
        }
        setTimeout(() => {
          isManualScroll.current = false;
        }, 1200);
      }
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      {/* Desktop — compact floating pill */}
      <div
        className="hidden md:flex items-center gap-2 pointer-events-auto rounded-full border px-3 py-1.5 bg-white/[0.06] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] border-white/10"
      >
        {/* Logo */}
        <Magnetic strength={0.4}>
          <Link
            to="/"
            className="flex items-center gap-0.5 px-2 py-1 transition-all duration-300"
          >
            <span className="text-lg font-bold tracking-tighter animate-color-cycle">MS</span>
            <span className="text-lg font-black animate-color-cycle-reverse">.</span>
          </Link>
        </Magnetic>

        {/* Divider */}
        <div className="w-px h-4 bg-white/10 mx-1" />

        {/* Nav links */}
        <nav className="flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.sectionId;
            return (
              <Magnetic key={link.label} strength={0.2}>
                <RippleButton
                  onClick={() => scrollToSection(link.sectionId)}
                  className={`
                    relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                    ${isActive
                      ? "text-foreground bg-white/15 dark:bg-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.3)] border border-white/25"
                      : "text-foreground/70 hover:text-foreground hover:bg-white/[0.07] hover:scale-105 active:scale-95"
                    }
                  `}
                >
                  {link.label}
                </RippleButton>
              </Magnetic>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="w-px h-4 bg-white/10 mx-1" />

        {/* Theme toggle */}
        <Magnetic strength={0.3}>
          <div className="px-1">
            <ThemeToggle />
          </div>
        </Magnetic>
      </div>

      {/* Dynamic Island Header for Mobile */}
      <div className="md:hidden flex justify-center w-full pointer-events-none">
        <div className={`
          flex items-center justify-between gap-6 px-6 py-2.5 rounded-full border border-white/10 transition-all duration-500 pointer-events-auto
          ${isScrolled
            ? "bg-background/85 backdrop-blur-2xl shadow-2xl w-[92%] border-white/20"
            : "bg-background/50 backdrop-blur-xl w-full border-white/10 shadow-lg"
          }
        `}>
          <Magnetic strength={0.4}>
            <Link
              to="/"
              className="flex items-center gap-1.5 pointer-events-auto p-1 cursor-pointer"
            >
              <span className="text-xl font-bold tracking-tighter animate-color-cycle">MS</span>
              <span className="text-xl font-black animate-color-cycle-reverse">.</span>
            </Link>
          </Magnetic>

          <div className="pointer-events-auto flex items-center justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
