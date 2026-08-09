import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import CinematicPageTransition from "@/components/layout/CinematicPageTransition";
import React from "react";
import SpaceBackground from "@/components/common/SpaceBackground";
import { useLowPerformanceMode } from "@/hooks/usePerformanceMode";

const queryClient = new QueryClient();

import MobileDock from "@/components/layout/MobileDock";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen relative z-10">
      <SmoothScroll />
      <SpaceBackground />
      <Header />
      <main className="flex-grow">
        <CinematicPageTransition>
          <Outlet />
        </CinematicPageTransition>
      </main>
      <MobileDock />
      <Footer />
    </div>
  );
};

const AppContent = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  const lowPerformance = useLowPerformanceMode();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.lowPerformance = lowPerformance ? "true" : "false";
  }, [lowPerformance]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
        <Analytics />
        <SpeedInsights />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

