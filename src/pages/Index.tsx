import { useEffect, Suspense, lazy } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

// Hero loads eagerly — it's the LCP element
import Hero from "@/components/sections/Hero";

// All below-fold sections lazy-loaded — dramatically reduces initial JS parse time
const About = lazy(() => import("@/components/sections/About"));
const Services = lazy(() => import("@/components/sections/Services"));
const Skills = lazy(() => import("@/components/sections/Skills"));
const Projects = lazy(() => import("@/components/sections/Projects"));
const FreelanceProjects = lazy(() => import("@/components/sections/FreelanceProjects"));
const Connect = lazy(() => import("@/components/sections/Connect"));

// Placeholder that reserves height to prevent CLS while sections load
const SectionPlaceholder = ({ height = "100vh" }: { height?: string }) => (
  <div style={{ minHeight: height }} />
);

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
        "Muhammed Shahal is a freelance MERN stack developer based in Kerala, India. Expert in React, Node.js, MongoDB, and Express. Hire a skilled full stack web developer for scalable, high-performance web applications.";
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
    if (ogDesc) ogDesc.setAttribute("content", "Muhammed Shahal is a freelance MERN stack developer from Kerala, India. Expert in React, Node.js, MongoDB, and Express. Hire now.");

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
      {/* Hero loads immediately — LCP element */}
      <Hero />

      {/* Below-fold sections load lazily — big TBT win */}
      <Suspense fallback={<SectionPlaceholder />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <FreelanceProjects />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder height="50vh" />}>
        <Connect />
      </Suspense>
    </div>
  );
};

export default Index;
