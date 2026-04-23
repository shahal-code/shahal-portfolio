import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = "http://localhost:5000/api";

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
