import Contact from "@/components/Contact";
import { useEffect } from "react";

const ContactPage = () => {
    useEffect(() => {
        document.title = "Contact Muhammed Shahal | Hire Freelance MERN Stack Developer";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full pt-16 md:pt-20">
            <Contact />
        </div>
    );
};

export default ContactPage;
