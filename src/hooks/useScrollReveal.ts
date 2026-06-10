import { useRef } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollReveal = ({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = false,
}: UseScrollRevealOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Keep content visible immediately instead of waiting for scroll-triggered reveal.
  void threshold;
  void rootMargin;
  void triggerOnce;

  return { ref, isVisible: true };
};
