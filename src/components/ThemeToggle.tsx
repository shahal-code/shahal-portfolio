import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    // @ts-ignore
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    // Apply the correct animation direction class
    const doc = document.documentElement;
    const animationClass = nextTheme === "dark" ? "theme-wipe-right" : "theme-wipe-left";
    doc.classList.add(animationClass);

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    transition.finished.finally(() => {
      doc.classList.remove("theme-wipe-right", "theme-wipe-left");
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full hover:bg-primary/10 hover:backdrop-blur-[20px] hover:shadow-[inset_2px_2px_8px_rgba(255,255,255,0.2),inset_-2px_-2px_8px_rgba(0,0,0,0.2)] transition-all duration-500 active:scale-90"
    >
      <Sun className="h-6 w-6 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
