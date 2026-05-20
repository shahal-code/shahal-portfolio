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
    document.title = "Muhammed Shahal | Freelance MERN Stack & Full Stack Developer";
  }, []);

  useEffect(() => {
    // If we came from another page (like Contact) with a scrollTo request
    if (location.state?.scrollTo) {
      const timer = setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          // Clear the state so it doesn't scroll again on refresh
          navigate(location.pathname, { replace: true, state: {} });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Regular load - scroll to top
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

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
