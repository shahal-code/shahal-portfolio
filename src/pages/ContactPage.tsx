import Contact from "@/components/Contact";
import { useEffect } from "react";

const ContactPage = () => {
    useEffect(() => {
        // Update page title for SEO
        document.title = "Contact Muhammed Shahal | Hire Freelance MERN Stack Developer Kerala";

        // Update meta description dynamically
        let desc = document.querySelector('meta[name="description"]');
        if (!desc) {
            desc = document.createElement('meta');
            (desc as HTMLMetaElement).name = "description";
            document.head.appendChild(desc);
        }
        (desc as HTMLMetaElement).content = "Contact Muhammed Shahal — professional freelance MERN Stack Developer and Full Stack Web Engineer in Malappuram, Kerala, India. Available for hire. Reach out via email, LinkedIn, or the contact form.";

        // Update canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            (canonical as HTMLLinkElement).rel = "canonical";
            document.head.appendChild(canonical);
        }
        (canonical as HTMLLinkElement).href = "https://www.shahl.in/contact";

        // Update OG tags for contact page
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute("content", "Contact Muhammed Shahal | Hire Freelance MERN Stack Developer");

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute("content", "Hire Muhammed Shahal — a professional freelance MERN Stack Developer from Kerala, India. Available for web development, React, Node.js, and full stack projects globally.");

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute("content", "https://www.shahl.in/contact");

        window.scrollTo(0, 0);

        // Restore homepage defaults on unmount
        return () => {
            document.title = "Muhammed Shahal | Freelance MERN Stack & Full Stack Developer in Kerala, India";
            if (desc) (desc as HTMLMetaElement).content = "Muhammed Shahal is a professional freelance MERN Stack Developer and Full Stack Web Engineer in Kerala, India. Expert in React, Node.js, MongoDB, and Express. Hire a skilled web developer for scalable, high-performance web applications.";
            if (canonical) (canonical as HTMLLinkElement).href = "https://www.shahl.in/";
            if (ogTitle) ogTitle.setAttribute("content", "Muhammed Shahal | Freelance MERN Stack & Full Stack Developer");
            if (ogDesc) ogDesc.setAttribute("content", "Muhammed Shahal is a professional freelance MERN Stack Developer and Full Stack Web Engineer from Kerala, India. Expert in React, Node.js, MongoDB, and Express. Hire now.");
            if (ogUrl) ogUrl.setAttribute("content", "https://www.shahl.in/");
        };
    }, []);

    return (
        <div className="w-full pt-16 md:pt-20">
            {/* Hidden SEO semantic content for contact page crawlers */}
            <div style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }} aria-hidden="true">
                <h1>Contact Muhammed Shahal — Hire Freelance Web Developer Kerala</h1>
                <p>Get in touch with Muhammed Shahal, a professional freelance MERN Stack Developer and Full Stack Web Engineer based in Malappuram, Kerala, India. Available for hire for web development projects globally. Contact via email: shahalwork14@gmail.com or phone: +917510107241.</p>
                <p>Muhammed Shahal is open to freelance web development projects, remote collaborations, and full-time opportunities. Specializes in React, Node.js, MongoDB, Express, TypeScript, and Flutter.</p>
            </div>
            <Contact />
        </div>
    );
};

export default ContactPage;
