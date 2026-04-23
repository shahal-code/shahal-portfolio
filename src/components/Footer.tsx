import { usePortfolioData } from "@/hooks/usePortfolioData";
import { PERSONAL_DETAILS } from "@/constants";

const Footer = () => {
  const { data } = usePortfolioData();
  const profile = data?.profile || PERSONAL_DETAILS;
  const initials = profile.name.split(" ").map((n: string) => n[0]).join("");
  return (
    <footer className="py-12 border-t border-border/50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">{initials}<span className="text-primary">.</span></span>
              <span className="text-muted-foreground text-sm ml-2">
                © {new Date().getFullYear()} All rights reserved.
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs text-center">
              Crafted with passion using React & Tailwind. Building clean, functional digital experiences.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
