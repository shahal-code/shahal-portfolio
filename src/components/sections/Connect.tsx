import { useNavigate } from "react-router-dom";
import RippleButton from "@/components/ui/RippleButton";
import Magnetic from "@/components/common/Magnetic";
import Scroll3DWrapper from "@/components/common/Scroll3DWrapper";

const Connect = () => {
    const navigate = useNavigate();

    return (
        <section id="connect" className="sticky top-0 min-h-screen w-full flex flex-col justify-center items-center relative z-[70] bg-background border-t border-white/10 shadow-[0_-30px_70px_rgba(0,0,0,0.9)] py-20 md:py-28">
            <Scroll3DWrapper>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[0.9] tracking-tighter">
                            <span className="animate-color-cycle">Connect</span>
                            <span className="animate-color-cycle-reverse">.</span>
                        </h2>

                        <p className="text-xl md:text-2xl text-foreground font-bold leading-tight max-w-2xl mx-auto">
                            Got a concept in mind? I’d love to help bring it to life.
                        </p>
                        <p className="text-base md:text-lg text-muted-foreground font-medium max-w-xl mx-auto">
                            I’m open to exciting projects and collaborations—feel free to say hello!
                        </p>

                        <div className="pt-8">
                            <Magnetic strength={0.4}>
                                <RippleButton
                                    onClick={() => navigate("/contact")}
                                    className="rounded-full px-10 py-4 h-16 text-xl font-bold text-foreground bg-white/10 dark:bg-white/10 hover:bg-white/20 backdrop-blur-3xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.4)] active:scale-95 transition-all"
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
