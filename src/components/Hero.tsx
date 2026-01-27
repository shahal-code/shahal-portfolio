import { useRef } from "react";
import { ArrowDown, Instagram, Github, Twitter } from "lucide-react";
import { PERSONAL_DETAILS, CONTACT_INFO } from "@/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Magnetic from "@/components/Magnetic";
import RippleButton from "@/components/ui/RippleButton";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroProps {
  onOpenContact?: () => void;
}

const Hero = ({ onOpenContact }: HeroProps) => {
  const navigate = useNavigate();
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();

  // Scroll Parallax settings (Lens Focus)
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);
  const blurValue = useTransform(scrollY, [0, 300], [0, 10]);
  // Completely disable filter (blur) on mobile to save performance
  const filter = useTransform(blurValue, (v) => isMobile ? "none" : `blur(${v}px)`);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  // 3D Tilt settings
  const x = useMotionValue(0);
  const yTilt = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(yTilt);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    yTilt.set(yPct);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const touch = e.touches[0];
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    yTilt.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    yTilt.set(0);
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-screen flex items-start pt-24 pb-20 md:items-center md:pt-0 md:pb-0 justify-center relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div style={{ y: useTransform(scrollY, [0, 500], [0, 100]) }} className="w-full h-full">
          <img
            src="/hero-bg.png"
            alt=""
            className="w-full h-full object-cover opacity-[0.07] dark:opacity-[0.15] scale-110 animate-pulse-slow pointer-events-none"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/8 via-primary/0 to-primary/0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/30 via-accent/0 to-accent/0" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-violet-500/10 to-violet-500/0 blur-2xl md:block hidden" />

      {/* Seamless transition mask */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-background/0" />

      {/* Premium Divider - Visible on all devices */}
      <div className="premium-divider bottom-0" />

      {/* Floating decorative elements - Scaled down for mobile */}
      <motion.div
        style={{ y: useTransform(scrollY, [0, 500], [0, -100]) }}
        className="absolute top-1/4 right-1/4 w-48 h-48 md:w-64 md:h-64 bg-primary/5 rounded-full blur-[60px] md:blur-3xl animate-float will-change-transform"
      />
      <motion.div
        style={{ y: useTransform(scrollY, [0, 500], [0, -150]) }}
        className="absolute bottom-1/4 left-1/4 w-60 h-60 md:w-80 md:h-80 bg-accent/20 rounded-full blur-[80px] md:blur-3xl animate-float-delayed will-change-transform"
      />

      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-12">
          <div className={`flex-1 text-center lg:text-left reveal-base reveal-up ${isVisible ? 'revealed' : ''}`}>
            {/* Main heading with gradient */}
            <h1 className="w-fit mx-auto lg:mx-0 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 leading-tight tracking-tight shrink-0 transition-all">
              <span className="animate-color-cycle">Muhammed</span> <span className="animate-color-cycle-reverse">Shahal.</span>
            </h1>

            {/* Decorative Gradient Line */}
            <div className={`w-24 h-1.5 bg-gradient-to-r from-primary to-accent rounded-full mb-8 opacity-80 transition-all duration-1000 delay-300 ${isVisible ? 'w-24 opacity-80' : 'w-0 opacity-0'}`} />

            {/* Role/subtitle */}
            <p className="text-lg md:text-2xl font-medium text-primary mb-4 md:mb-6 tracking-wide">
              {PERSONAL_DETAILS.role}
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              {PERSONAL_DETAILS.bio}
            </p>

            {/* CTA buttons - Desktop only position */}
            <div className="hidden lg:flex flex-row gap-4 items-center justify-center lg:justify-start">
              <Magnetic strength={0.4}>
                <RippleButton
                  className="relative text-base px-8 h-12 rounded-full overflow-hidden group text-primary-foreground bg-primary/20 backdrop-blur-3xl border border-primary/30 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3),inset_-2px_-4px_8px_rgba(0,0,0,0.3),0_10px_30px_hsl(var(--primary)/0.2)] hover:scale-105 active:scale-95 transition-all duration-300"
                  onClick={() => window.open(CONTACT_INFO.social.find(s => s.name === "LinkedIn")?.url, "_blank", "noopener,noreferrer")}
                >
                  Let's Connect
                </RippleButton>
              </Magnetic>

              <Magnetic strength={0.6}>
                <a
                  href={CONTACT_INFO.social.find(s => s.name === "GitHub")?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:text-primary hover:bg-primary/15 backdrop-blur-3xl transition-all duration-300 hover:scale-110 active:scale-95 border border-primary/20 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)]"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
              </Magnetic>

              <Magnetic strength={0.6}>
                <a
                  href={CONTACT_INFO.social.find(s => s.name === "Twitter")?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:text-primary hover:bg-primary/15 backdrop-blur-3xl transition-all duration-300 hover:scale-110 active:scale-95 border border-primary/20 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)]"
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </Magnetic>

              <Magnetic strength={0.6}>
                <a
                  href={CONTACT_INFO.social.find(s => s.name === "Instagram")?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:text-primary hover:bg-primary/15 backdrop-blur-3xl transition-all duration-300 hover:scale-110 active:scale-95 border border-primary/20 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </Magnetic>
            </div>

          </div>

          {/* Right Image Column with 3D Tilt & Scroll Parallax */}
          <motion.div
            style={{ scale, filter, opacity }}
            className={`flex-1 relative perspective-1000 lens-focus ${isVisible ? 'opacity-100' : 'opacity-0'}`} // Lens Focus effect
          >
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                touchAction: "pan-y",
              }}
              className="relative w-52 h-52 min-[390px]:w-64 min-[390px]:h-64 sm:w-80 sm:h-80 md:w-[30rem] md:h-[30rem] mx-auto group cursor-pointer"
            >
              {/* Decorative background blob */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full rotate-6 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500"
                style={{ transform: "translateZ(-50px)" }} // Push back in 3D space
              />

              {/* Image container with Pure Water Effect */}
              <div
                className="relative w-full h-full rounded-full overflow-hidden transition-all duration-500 group-hover:scale-[1.02]
                  bg-blue-400/5 md:backdrop-blur-[2px] border border-white/30 p-2
                  shadow-[0_10px_30px_rgba(0,0,0,0.1)] md:shadow-[inset_0_0_20px_rgba(255,255,255,0.6),inset_10px_10px_40px_rgba(255,255,255,0.5),0_25px_60px_rgba(0,0,0,0.2)]
                  group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] md:group-hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.8),inset_20px_20px_60px_rgba(255,255,255,0.6),0_35px_80px_rgba(0,0,0,0.3)]
                "
                style={{ transform: "translateZ(20px)" }} // Pop forward
              >

                {/* Portrait Image (BW -> Color Toggle) */}
                <img
                  src="/Me-color.jpg"
                  alt={PERSONAL_DETAILS.name}
                  loading="lazy"
                  className="w-full h-full rounded-full object-cover shadow-inner grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out select-none"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                />

                {/* Subtle soft overlay for depth */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-background/40 to-background/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile-only CTA buttons (Text -> Image -> Buttons order) */}
          <div className="flex lg:hidden flex-row gap-4 items-center justify-center w-full mt-2 animate-fade-in delay-500">
            <Magnetic strength={0.4}>
              <RippleButton
                className="relative text-base px-8 h-12 rounded-full overflow-hidden group text-primary-foreground bg-primary/20 backdrop-blur-3xl border border-primary/30 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3),inset_-2px_-4px_8px_rgba(0,0,0,0.3),0_10px_30px_hsl(var(--primary)/0.2)] hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => window.open(CONTACT_INFO.social.find(s => s.name === "LinkedIn")?.url, "_blank", "noopener,noreferrer")}
              >
                Let's Connect
              </RippleButton>
            </Magnetic>

            <Magnetic strength={0.6}>
              <a
                href={CONTACT_INFO.social.find(s => s.name === "GitHub")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:text-primary hover:bg-primary/15 backdrop-blur-3xl transition-all duration-300 hover:scale-110 active:scale-95 border border-primary/20 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)]"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
            </Magnetic>

            <Magnetic strength={0.6}>
              <a
                href={CONTACT_INFO.social.find(s => s.name === "Twitter")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:text-primary hover:bg-primary/15 backdrop-blur-3xl transition-all duration-300 hover:scale-110 active:scale-95 border border-primary/20 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)]"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </Magnetic>

            <Magnetic strength={0.6}>
              <a
                href={CONTACT_INFO.social.find(s => s.name === "Instagram")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:text-primary hover:bg-primary/15 backdrop-blur-3xl transition-all duration-300 hover:scale-110 active:scale-95 border border-primary/20 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)]"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ArrowDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
