import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { useTheme } from "@/components/common/ThemeProvider";
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

    const doc = document.documentElement;
    const animationClass = nextTheme === "dark" ? "theme-wipe-right" : "theme-wipe-left";

    try {
      doc.classList.add(animationClass, "is-transitioning-theme");

      // @ts-ignore
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setTheme(nextTheme);
        });
      });

      transition.finished
        .catch(() => {})
        .finally(() => {
          doc.classList.remove(animationClass, "is-transitioning-theme");
        });
    } catch {
      setTheme(nextTheme);
      doc.classList.remove(animationClass, "is-transitioning-theme");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full hover:bg-primary/10 hover:backdrop-blur-[20px] transition-all duration-300 active:scale-90 touch-manipulation cursor-pointer select-none"
    >
      <Sun className="h-5 w-5 sm:h-6 sm:w-6 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 sm:h-6 sm:w-6 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
