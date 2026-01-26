import { useIsMobile } from "@/hooks/use-mobile";

const Noise = () => {
    const isMobile = useIsMobile();

    if (isMobile) return null;

    return (
        <div className="noise-overlay" />
    );
};

export default Noise;
