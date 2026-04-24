import { useEffect, useRef, useState } from "react";

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
  const [isVisible, setIsVisible] = useState(true); // Always true immediately

  return { ref, isVisible: true };
};
