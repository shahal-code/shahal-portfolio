import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Connect from "@/components/Connect";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. If we have a scrollTo request, handle it
    if (location.state?.scrollTo) {
      const timer = setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "auto" });
          // Clear state so it doesn't happen again on refresh, 
          // but add a flag so we don't jump back to top immediately
          navigate(location.pathname, { replace: true, state: { _scrolled: true } });
        }
      }, 100);
      return () => clearTimeout(timer);
    }

    // 2. If we AREN'T currently in the middle of clearing a scroll, 
    // and we DON'T have a scrollTo request, go to top.
    if (!location.state?._scrolled) {
      window.scrollTo(0, 0);
    }
  }, [location.state, navigate, location.pathname]);

  return (
    <div className="w-full">
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Connect />
    </div>
  );
};

export default Index;
