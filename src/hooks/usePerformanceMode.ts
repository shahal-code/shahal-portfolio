import * as React from "react";

const MOBILE_BREAKPOINT = 768;

const getLowPerformanceHint = () => {
  if (typeof window === "undefined") return false;

  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  const hardwareConcurrency = navigator.hardwareConcurrency ?? 8;
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const saveData = Boolean((navigator as Navigator & {
    connection?: { saveData?: boolean };
  }).connection?.saveData);

  return isMobile && (hardwareConcurrency <= 4 || deviceMemory <= 4 || saveData);
};

export function useLowPerformanceMode() {
  const [isLowPerformance, setIsLowPerformance] = React.useState(false);

  React.useEffect(() => {
    const update = () => setIsLowPerformance(getLowPerformanceHint());
    update();

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    mql.addEventListener("change", update);
    window.addEventListener("orientationchange", update);
    window.addEventListener("resize", update);

    return () => {
      mql.removeEventListener("change", update);
      window.removeEventListener("orientationchange", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return isLowPerformance;
}
