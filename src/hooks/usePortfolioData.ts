import { useQuery } from "@tanstack/react-query";

export const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (typeof window !== "undefined" && window.location.hostname === "localhost" 
    ? "http://localhost:5000/api" 
    : "/api"); // Fallback to relative path on production to avoid permission prompts

export const usePortfolioData = () => {
  return useQuery({
    queryKey: ["portfolio-data"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/portfolio`);
      if (!response.ok) {
        throw new Error("Failed to fetch portfolio data");
      }
      return response.json();
    },
    // Keep data fresh but allow manual refetching
    staleTime: 30 * 1000, 
  });
};
