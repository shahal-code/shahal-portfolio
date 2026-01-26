import Contact from "@/components/Contact";
import { useEffect } from "react";

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full pt-16 md:pt-20">
            <Contact />
        </div>
    );
};

export default ContactPage;
