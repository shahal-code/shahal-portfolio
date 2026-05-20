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
    // Primary page title — optimized for "Muhammed Shahal" + "freelance web developers"
    document.title = "Muhammed Shahal | Freelance MERN Stack & Full Stack Developer in Kerala, India";

    // Ensure meta description is set correctly for this page
    let desc = document.querySelector('meta[name="description"]');
    if (desc) {
      (desc as HTMLMetaElement).content =
        "Muhammed Shahal is a professional freelance MERN Stack Developer and Full Stack Web Engineer in Kerala, India. Expert in React, Node.js, MongoDB, and Express. Hire a skilled web developer for scalable, high-performance web applications.";
    }

    // Ensure canonical points to homepage
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      (canonical as HTMLLinkElement).href = "https://www.shahl.in/";
    }

    // Ensure robots is set correctly for homepage
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute("content", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    }

    // Ensure OG tags are correct for homepage
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", "Muhammed Shahal | Freelance MERN Stack & Full Stack Developer");

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", "Muhammed Shahal is a professional freelance MERN Stack Developer and Full Stack Web Engineer from Kerala, India. Expert in React, Node.js, MongoDB, and Express. Hire now.");

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", "https://www.shahl.in/");
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
