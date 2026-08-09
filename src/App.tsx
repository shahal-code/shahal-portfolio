import { useEffect, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import React from "react";
import { useLowPerformanceMode } from "@/hooks/usePerformanceMode";

// Lazy-load heavy components — keeps initial bundle lean and unblocks first paint
const SpaceBackground = lazy(() => import("@/components/common/SpaceBackground"));
const CinematicPageTransition = lazy(() => import("@/components/layout/CinematicPageTransition"));
const MobileDock = lazy(() => import("@/components/layout/MobileDock"));

const queryClient = new QueryClient();

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen relative z-10">
      <SmoothScroll />
      <Suspense fallback={null}>
        <SpaceBackground />
      </Suspense>
      <Header />
      <main className="flex-grow">
        <Suspense fallback={null}>
          <CinematicPageTransition>
            <Outlet />
          </CinematicPageTransition>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <MobileDock />
      </Suspense>
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
