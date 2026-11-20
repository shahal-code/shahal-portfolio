import { useRef, useEffect } from "react";
import { ArrowDown, Instagram, Github, MessageCircle } from "lucide-react";
import { PERSONAL_DETAILS, CONTACT_INFO } from "@/constants";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import Magnetic from "@/components/common/Magnetic";
import RippleButton from "@/components/ui/RippleButton";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useMobile";
import { useLowPerformanceMode } from "@/hooks/usePerformanceMode";
import gsap from "gsap";
interface HeroProps {
  onOpenContact?: () => void;
}

const Hero = ({ onOpenContact }: HeroProps) => {
  const { data } = usePortfolioData();
  const profile = (data?.profile && Object.keys(data.profile).length > 0) ? data.profile : PERSONAL_DETAILS;
  const contact = (data?.profile?.contact) ? data.profile.contact : CONTACT_INFO;

  const fullName = (profile && profile.name) ? profile.name : PERSONAL_DETAILS.name;
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  const headRef = useRef<HTMLImageElement>(null);

  const isMobile = useIsMobile();
  const isLowPerformance = useLowPerformanceMode();
  const reduceMotion = isMobile || isLowPerformance;

  // Scroll Parallax
  const { scrollY } = useScroll();
  const yFly = useTransform(scrollY, [0, 600], reduceMotion ? [0, 0] : [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const blob1Y = useTransform(scrollY, [0, 600], reduceMotion ? [0, 0] : [0, -50]);
  const blob2Y = useTransform(scrollY, [0, 600], reduceMotion ? [0, 0] : [0, -80]);
  const bgImageY = useTransform(scrollY, [0, 600], reduceMotion ? [0, 0] : [0, 50]);

  // GSAP global mouse → ONLY head & neck tracking (body stays completely stationary)
  useEffect(() => {
    if (reduceMotion) return;
    const head = headRef.current;
    if (!head) return;

    let ry = 0, rx = 0, rz = 0;
    let tx = 0, ty = 0;
    let targetRy = 0, targetRx = 0, targetRz = 0;
    let targetTx = 0, targetTy = 0;
    let rafId: number;

    const MAX_ROT_Y = 22;   // Head turn left/right (degrees)
    const MAX_ROT_X = 12;   // Head pitch up/down (degrees)
    const MAX_ROT_Z = 5;    // Subtle natural neck tilt
    const MAX_TRANS_X = 5;  // Very subtle parallax so neck stays anchored inside collar
    const MAX_TRANS_Y = 3;
    const LERP = 0.08;      // Smooth tracking easing

    const onMouseMove = (e: MouseEvent) => {
      const rect = head.getBoundingClientRect();
      const headCX = rect.left + rect.width / 2;
      const headCY = rect.top + rect.height * 0.42; // face level

      const dx = (e.clientX - headCX) / (window.innerWidth / 2);
      const dy = (e.clientY - headCY) / (window.innerHeight / 2);

      const cDx = Math.max(-1, Math.min(1, dx));
      const cDy = Math.max(-1, Math.min(1, dy));

      targetRy = cDx * MAX_ROT_Y;
      targetRx = -cDy * MAX_ROT_X;
      targetRz = -cDx * MAX_ROT_Z;
      targetTx = cDx * MAX_TRANS_X;
      targetTy = cDy * MAX_TRANS_Y;
    };

    const onMouseLeave = () => {
      targetRy = 0;
      targetRx = 0;
      targetRz = 0;
      targetTx = 0;
      targetTy = 0;
    };

    const tick = () => {
      ry += (targetRy - ry) * LERP;
      rx += (targetRx - rx) * LERP;
      rz += (targetRz - rz) * LERP;
      tx += (targetTx - tx) * LERP;
      ty += (targetTy - ty) * LERP;

      gsap.set(head, {
        rotateY: ry,
        rotateX: rx,
        rotateZ: rz,
        x: tx,
        y: ty,
        transformPerspective: 1000,
        transformOrigin: "50% 70%", // neck base pivot inside collar
      });

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
      gsap.set(head, { clearProps: "all" });
    };
  }, [reduceMotion]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="sticky top-0 min-h-screen w-full flex items-center justify-center relative overflow-hidden z-10 bg-transparent pt-20 pb-16 md:py-0">
      {/* Background layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div style={{ y: bgImageY }} className="w-full h-full">
          <img
            src="/hero-bg.png"
            alt=""
            className="w-full h-full object-cover opacity-[0.03] dark:opacity-[0.15] scale-110 animate-pulse-slow pointer-events-none"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-transparent" />
      </div>

      <div className="absolute inset-0 bg-transparent" />
      {!reduceMotion && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/[0.02] to-transparent blur-2xl md:block hidden" />
        </>
      )}

      {/* Seamless transition mask */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-transparent" />

      {/* Premium Divider - Visible on all devices */}
      <div className="premium-divider bottom-0" />

      {/* Floating decorative elements - Hidden on mobile for buttery smooth scrolling */}
      {!reduceMotion && (
        <>
          <motion.div
            style={{ y: blob1Y }}
            className="absolute top-1/4 right-1/4 w-48 h-48 md:w-64 md:h-64 bg-white/[0.03] rounded-full blur-[70px] md:blur-3xl animate-float will-change-transform"
          />
          <motion.div
            style={{ y: blob2Y }}
            className="absolute bottom-1/4 left-1/4 w-60 h-60 md:w-80 md:h-80 bg-white/[0.02] rounded-full blur-[90px] md:blur-3xl animate-float-delayed will-change-transform"
          />
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-12">
          <div className="flex-1 text-center lg:text-left">
            {/* Main heading with gradient */}
            <h1 className="w-fit mx-auto lg:mx-0 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 leading-tight tracking-tight shrink-0 transition-all">
              <span className="animate-color-cycle">{firstName}</span> <span className="animate-color-cycle-reverse">{lastName}.</span>
            </h1>

            {/* Decorative Gradient Line - Clean monochrome */}
            <div className="w-24 h-1 bg-gradient-to-r from-foreground via-muted-foreground to-transparent rounded-full mb-8 opacity-80 transition-all duration-1000" />

            {/* Role/subtitle */}
            <p className="text-lg md:text-2xl font-medium text-foreground/90 mb-4 md:mb-6 tracking-wide">
              {profile.role}
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              {profile.bio}
            </p>

            {/* CTA buttons - Desktop only position */}
            <div className="hidden lg:flex flex-row gap-4 items-center justify-center lg:justify-start">
              <Magnetic strength={0.4}>
                <RippleButton
                  className="relative text-base px-8 h-12 rounded-full overflow-hidden group text-foreground bg-white/10 dark:bg-white/10 hover:bg-white/20 backdrop-blur-2xl border border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
                  onClick={() => {
                    const linkedin = contact.social?.find((s: any) => s.name === "LinkedIn") ||
                      contact.socials?.find((s: any) => s.name === "LinkedIn");
                    if (linkedin) window.open(linkedin.url, "_blank", "noopener,noreferrer");
                  }}
                >
                  Let's Connect
                </RippleButton>
              </Magnetic>

              <Magnetic strength={0.6}>
                <a
                  href={CONTACT_INFO.social.find(s => s.name === "GitHub")?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/[0.05] text-foreground hover:text-white hover:bg-white/15 backdrop-blur-2xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                  aria-label="GitHub"
                >
                 <Github className="w-6 h-6 text-[#181717] dark:text-white" />
                </a>
              </Magnetic>

              <Magnetic strength={0.6}>
                <a
                  href={CONTACT_INFO.social.find(s => s.name === "WhatsApp")?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/[0.05] text-foreground hover:text-white hover:bg-white/15 backdrop-blur-2xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
              </Magnetic>

              <Magnetic strength={0.6}>
                <a
                  href={CONTACT_INFO.social.find(s => s.name === "Instagram")?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/[0.05] text-foreground hover:text-white hover:bg-white/15 backdrop-blur-2xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </Magnetic>
            </div>

          </div>

          {/* Right Image Column — frameless, transparent bg, independent head & neck tracking */}
          <motion.div
            style={{ opacity, y: yFly }}
            className="flex-1 relative flex items-end justify-center"
          >
            {/* Soft glow behind avatar */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-white/[0.05] rounded-full blur-[90px] pointer-events-none" />

            {/* Avatar container matching image aspect ratio */}
            <div className="relative w-72 min-[390px]:w-80 sm:w-[26rem] md:w-[32rem] lg:w-[38rem] xl:w-[42rem] aspect-[1024/768] select-none drop-shadow-[0_25px_50px_rgba(255,255,255,0.08)]">
              {/* Head & Neck layer — smoothly turns towards mouse */}
              <img
                ref={headRef}
                src="/images/Me-head.png"
                alt=""
                loading="eager"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                className="absolute inset-0 w-full h-full object-contain pointer-events-none will-change-transform z-10"
                style={{ transformStyle: "preserve-3d" }}
              />

              {/* Body & Shoulders layer — 100% stationary */}
              <img
                src="/images/Me-body.png"
                alt={PERSONAL_DETAILS.name}
                loading="eager"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
              />
            </div>
          </motion.div>

          {/* Mobile-only CTA buttons (Text -> Image -> Buttons order) */}
          <div className={`flex lg:hidden flex-row gap-4 items-center justify-center w-full mt-2 ${reduceMotion ? "" : "animate-fade-in"}`}>
            <Magnetic strength={0.4}>
              <RippleButton
                className="relative text-base px-8 h-12 rounded-full overflow-hidden group text-foreground bg-white/10 dark:bg-white/10 hover:bg-white/20 backdrop-blur-2xl border border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => window.open(CONTACT_INFO.social.find(s => s.name === "LinkedIn")?.url, "_blank", "noopener,noreferrer")}
              >
                Let's Connect
              </RippleButton>
            </Magnetic>

            <Magnetic strength={0.6}>
              <a
                href={(contact.social?.find((s: any) => s.name === "GitHub") || contact.socials?.find((s: any) => s.name === "GitHub"))?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/[0.05] text-foreground hover:text-white hover:bg-white/15 backdrop-blur-2xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                aria-label="GitHub"
              >
<Github className="w-6 h-6 text-[#181717] dark:text-white" />              </a>
            </Magnetic>

            <Magnetic strength={0.6}>
              <a
                href={(contact.social?.find((s: any) => s.name === "WhatsApp") || contact.socials?.find((s: any) => s.name === "WhatsApp"))?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/[0.05] text-foreground hover:text-white hover:bg-white/15 backdrop-blur-2xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
            </Magnetic>

            <Magnetic strength={0.6}>
              <a
                href={(contact.social?.find((s: any) => s.name === "Instagram") || contact.socials?.find((s: any) => s.name === "Instagram"))?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/[0.05] text-foreground hover:text-white hover:bg-white/15 backdrop-blur-2xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
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

