import { Mail, ExternalLink, Copy, Check, Github, Linkedin, Instagram, Twitter, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_INFO } from "@/constants";
import Magnetic from "@/components/Magnetic";
import SpotlightCard from "@/components/ui/SpotlightCard";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
    const [copied, setCopied] = useState(false);
    const { toast } = useToast();

    const copyEmail = () => {
        navigator.clipboard.writeText(CONTACT_INFO.email);
        setCopied(true);
        toast({ title: "Email copied!", description: "My address is now in your clipboard." });
        setTimeout(() => setCopied(false), 2000);
    };

    const contactLinks = [
        { icon: Mail, label: "Email", value: CONTACT_INFO.email, action: copyEmail },
    ];

    const socialHub = [
        {
            name: "LinkedIn",
            label: "Network",
            icon: Linkedin,
            url: CONTACT_INFO.social.find(s => s.name === "LinkedIn")?.url,
            color: "rgba(10, 102, 194, 0.2)",
            iconColor: "#0A66C2"
        },
        {
            name: "Gmail",
            label: "Direct Message",
            icon: Mail,
            url: `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_INFO.email}`,
            color: "rgba(234, 67, 53, 0.15)",
            iconColor: "#EA4335"
        },
        {
            name: "Instagram",
            label: "Follow Me",
            icon: Instagram,
            url: CONTACT_INFO.social.find(s => s.name === "Instagram")?.url,
            color: "rgba(225, 48, 108, 0.2)",
            iconColor: "#E1306C"
        },
        {
            name: "Twitter / X",
            label: "Live Updates",
            icon: Twitter,
            url: CONTACT_INFO.social.find(s => s.name === "Twitter")?.url,
            color: "rgba(29, 155, 240, 0.2)",
            iconColor: "#1D9BF0"
        }
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl bg-background/80 backdrop-blur-3xl border-white/10 p-0 overflow-hidden rounded-[2.5rem] shadow-2xl">
                <div className="relative p-6 md:p-12 overflow-y-auto max-h-[90vh]">
                    {/* Background Decor */}
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

                    <div className="grid lg:grid-cols-12 gap-10 items-center">
                        {/* Left Content */}
                        <div className="lg:col-span-5 text-center lg:text-left">
                            <span className="inline-block text-[10px] font-bold text-primary tracking-[0.4em] uppercase mb-4 opacity-70">
                                Connect
                            </span>

                            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-[1] tracking-tighter">
                                LET'S <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent italic">Talk</span>
                            </h2>

                            <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto lg:mx-0 leading-relaxed">
                                Ready to transform your vision into reality? Pick a channel and let's start.
                            </p>

                            <div className="space-y-3 max-w-[320px] mx-auto lg:mx-0">
                                {contactLinks.map((item, idx) => (
                                    <Magnetic key={idx} strength={0.1}>
                                        <div
                                            onClick={item.action}
                                            className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 backdrop-blur-xl cursor-pointer transition-all duration-500"
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

                        {/* Right Content: Social Grid */}
                        <div className="lg:col-span-7">
                            <div className="grid grid-cols-2 gap-4">
                                {socialHub.map((social, idx) => (
                                    <Magnetic key={idx} strength={0.2}>
                                        <SpotlightCard
                                            className="h-full group p-6 rounded-[2.2rem] bg-white/5 backdrop-blur-3xl border border-white/5 hover:border-white/20 transition-all cursor-pointer min-h-[140px]"
                                            spotlightColor={social.color}
                                            onClick={() => social.url && window.open(social.url, "_blank", "noopener,noreferrer")}
                                        >
                                            <div className="flex flex-col h-full items-start justify-between">
                                                <div
                                                    className="w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 shadow-lg"
                                                    style={{ backgroundColor: social.color, color: social.iconColor }}
                                                >
                                                    <social.icon size={22} strokeWidth={2} />
                                                </div>

                                                <div className="text-left mt-6">
                                                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1 opacity-60">{social.label}</p>
                                                    <h3 className="text-base font-bold text-foreground tracking-tight flex items-center gap-1.5 group-hover:text-primary transition-colors">
                                                        {social.name}
                                                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                                                    </h3>
                                                </div>
                                            </div>
                                        </SpotlightCard>
                                    </Magnetic>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-[10px] text-muted-foreground/40 font-bold tracking-[0.3em] uppercase">Built for high performance with 💜</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ContactModal;
