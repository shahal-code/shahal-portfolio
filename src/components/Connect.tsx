import { useNavigate } from "react-router-dom";
import RippleButton from "@/components/ui/RippleButton";
import Magnetic from "@/components/Magnetic";
import Scroll3DWrapper from "@/components/Scroll3DWrapper";

const Connect = () => {
    const navigate = useNavigate();

    return (
        <section id="connect" className="py-24 md:py-32 relative overflow-hidden scroll-mt-32">
            <Scroll3DWrapper>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[0.9] tracking-tighter">
                            <span className="animate-color-cycle">Connect</span>
                            <span className="animate-color-cycle-reverse">.</span>
                        </h2>

                        <p className="text-xl md:text-2xl text-primary font-bold leading-tight max-w-2xl mx-auto">
                            Got a concept in mind? I’d love to help bring it to life.
                        </p>
                        <p className="text-base md:text-lg text-muted-foreground font-medium max-w-xl mx-auto">
                            I’m open to exciting projects and collaborations—feel free to say hello!
                        </p>

                        <div className="pt-8">
                            <Magnetic strength={0.4}>
                                <RippleButton
                                    onClick={() => navigate("/contact")}
                                    className="rounded-full px-10 py-4 h-16 text-xl font-bold text-primary-foreground bg-primary/20 backdrop-blur-3xl border border-primary/30 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3),inset_-2px_-4px_8px_rgba(0,0,0,0.3),0_10px_30px_hsl(var(--primary)/0.2)] active:scale-95 transition-all"
                                >
                                    Let's Talk
                                </RippleButton>
                            </Magnetic>
                        </div>
                    </div>
                </div>
            </Scroll3DWrapper>
        </section>
    );
};

export default Connect;
