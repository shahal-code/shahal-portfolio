import { useQuery } from "@tanstack/react-query";

export const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (typeof window !== "undefined" && window.location.hostname === "localhost" 
    ? "http://localhost:5000/api" 
    : "https://shahal-portfolio.onrender.com/api");

export const usePortfolioData = () => {
  return useQuery({
    queryKey: ["portfolio-data"],
    queryFn: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/portfolio`);
        if (!response.ok) {
          console.warn("API returned error, using local constants");
          return { profile: {}, projects: [], skills: [], services: [] };
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.warn("API did not return JSON, using local constants");
          return { profile: {}, projects: [], skills: [], services: [] };
        }
        return response.json();
      } catch (error) {
        console.error("API fetch failed, using local constants:", error);
        return { profile: {}, projects: [], skills: [], services: [] };
      }
    },
    // Keep data fresh but allow manual refetching
    staleTime: 30 * 1000, 
  });
};
