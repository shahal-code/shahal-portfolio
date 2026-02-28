import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const [ripples, setRipples] = React.useState<{ x: number; y: number; id: number }[]>([]);

    React.useEffect(() => {
      if (ripples.length > 0) {
        const timer = setTimeout(() => {
          setRipples((prevRipples) => prevRipples.slice(1));
        }, 800);
        return () => clearTimeout(timer);
      }
    }, [ripples]);

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (asChild) {
        onClick?.(event);
        return;
      }

      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const newRipple = { x, y, id: Date.now() };
      setRipples((prevRipples) => [...prevRipples, newRipple]);

      onClick?.(event);
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), "relative overflow-hidden")}
        ref={ref}
        onClick={createRipple}
        {...props}
      >
        {props.children}
        {!asChild && ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: Math.max(buttonVariants({ variant, size }).length || 100, 100) * 4, // Estimate larger size or calculate dynamic
              // Using a fixed large scale for simplicity as we don't have ref access easily inside mapped item without layout shift
              // Better: use the 200% logic from RippleButton relative to state? 
              // Actually we can just style it here.
              height: "200%",
              // Wait, previous logic used pixel width from props.style which is not reliable here.
              // Let's rely on simple large size or pass style style.
              // Re-using the exact logic from RippleButton might be safer if we can.
            }}
          />
        ))}
        {!asChild && ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "250%", // Make it big enough to cover
              height: "250%",
              transform: "scale(0)",
              background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.15), inset 0 0 10px rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(2px)",
              // Centering correction
              marginLeft: "-125%",
              marginTop: "-125%",
            }}
          />
        ))}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button };
