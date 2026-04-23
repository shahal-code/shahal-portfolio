import { Mail, ExternalLink, Copy, Check, Github, Linkedin, Instagram, Twitter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { CONTACT_INFO } from "@/constants";
import Magnetic from "@/components/Magnetic";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Scroll3DWrapper from "@/components/Scroll3DWrapper";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { data } = usePortfolioData();
  const contact = data?.profile?.contact || CONTACT_INFO;
  const socialLinks = contact.social || contact.socials || CONTACT_INFO.social;

  const copyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    toast({ title: "Email copied!", description: "My address is now in your clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  const contactLinks = [
    { icon: Mail, label: "Email", value: contact.email, action: copyEmail },
  ];

  const socialHub = [
    {
      name: "LinkedIn",
      label: "Network",
      icon: Linkedin,
      url: socialLinks.find((s: any) => s.name === "LinkedIn")?.url,
      color: "rgba(10, 102, 194, 0.2)",
      iconColor: "#0A66C2"
    },
    {
      name: "Gmail",
      label: "Direct Message",
      icon: Mail,
      url: `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`,
      color: "rgba(234, 67, 53, 0.15)",
      iconColor: "#EA4335"
    },
    {
      name: "Instagram",
      label: "Follow Me",
      icon: Instagram,
      url: socialLinks.find((s: any) => s.name === "Instagram")?.url,
      color: "rgba(225, 48, 108, 0.2)",
      iconColor: "#E1306C"
    },
    {
      name: "Twitter / X",
      label: "Live Updates",
      icon: Twitter,
      url: socialLinks.find((s: any) => s.name === "Twitter")?.url,
      color: "rgba(29, 155, 240, 0.2)",
      iconColor: "#1D9BF0"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <Scroll3DWrapper>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

              {/* Left Content: Typography & Quick Contact */}
              <div className="lg:col-span-12 xl:col-span-5 text-center lg:text-left">
                <span className="inline-block text-[10px] font-bold text-primary tracking-[0.4em] uppercase mb-6 opacity-60">
                  Contact
                </span>

                <h2 className="text-4xl md:text-5xl xl:text-6xl font-black text-foreground mb-10 leading-[0.95] tracking-tighter">
                  LET'S BUILD <br />
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent uppercase">Something</span> <br />
                  REMARKABLE.
                </h2>

                <p className="text-base text-muted-foreground mb-12 max-w-md mx-auto lg:mx-0 leading-relaxed opacity-70">
                  Ready to start your next project? Reach out directly through your preferred channel.
                </p>

                <div className="space-y-3 max-w-[320px] mx-auto lg:mx-0">
                  {contactLinks.map((item, idx) => (
                    <Magnetic key={idx} strength={0.1}>
                      <div
                        onClick={item.action}
                        className="group flex items-center justify-between p-4 rounded-2xl bg-white/2 border border-white/5 hover:border-primary/30 backdrop-blur-xl cursor-pointer transition-all duration-500"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <item.icon size={18} />
                          </div>
                          <div className="text-left">
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5 opacity-60">{item.label}</p>
                            <p className="text-sm font-medium text-foreground">{item.value}</p>
                          </div>
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all">
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                        </div>
                      </div>
                    </Magnetic>
                  ))}
                </div>
              </div>

              {/* Right Content: Social Interactive Hub */}
              <div className="lg:col-span-12 xl:col-span-7">
                <div className="grid grid-cols-2 gap-4">
                  {socialHub.map((social, idx) => (
                    <Magnetic key={idx} strength={0.2}>
                      <SpotlightCard
                        className="h-full group p-6 rounded-[1.8rem] bg-white/2 backdrop-blur-3xl border border-white/5 hover:border-white/20 transition-all cursor-pointer min-h-[140px]"
                        spotlightColor={social.color}
                        onClick={() => social.url && window.open(social.url, "_blank", "noopener,noreferrer")}
                      >
                        <div className="flex flex-col h-full items-start justify-between">
                          <div
                            className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 shadow-lg"
                            style={{ backgroundColor: social.color, color: social.iconColor }}
                          >
                            <social.icon size={20} strokeWidth={2} />
                          </div>

                          <div className="text-left">
                            <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1.5 opacity-60">{social.label}</p>
                            <h3 className="text-lg font-bold text-foreground tracking-tight flex items-center gap-1.5 group-hover:text-primary transition-colors">
                              {social.name}
                              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 text-muted-foreground" />
                            </h3>
                          </div>
                        </div>
                      </SpotlightCard>
                    </Magnetic>
                  ))}
                </div>

                <div className="mt-10 flex items-center gap-4 justify-center">
                  <div className="h-px w-6 bg-primary/20" />
                  <p className="text-[9px] text-muted-foreground/40 font-bold tracking-[0.25em] uppercase">Open for new collaborations</p>
                  <div className="h-px w-6 bg-primary/20" />
                </div>

              </div>
            </div>
          </div>
        </div>
      </Scroll3DWrapper>
    </section>
  );
};

export default Contact;
