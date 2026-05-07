import { useQuery } from "@tanstack/react-query";

export const usePortfolioData = () => {
  return useQuery({
    queryKey: ["portfolio-data"],
    queryFn: async () => {
      // Backend removed, using local constants via fallbacks in components
      return { profile: {}, projects: [], skills: [], services: [] };
    },
    staleTime: Infinity, 
  });
};
