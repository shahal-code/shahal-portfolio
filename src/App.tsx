import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import CinematicPageTransition from "@/components/CinematicPageTransition";
import SpaceBackground from "@/components/SpaceBackground";

// Admin Imports
import Login from "./admin/Login";
import ProtectedRoute from "./admin/ProtectedRoute";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import EditProfile from "./admin/sections/EditProfile";
import EditProjects from "./admin/sections/EditProjects";
import EditSkills from "./admin/sections/EditSkills";
import EditServices from "./admin/sections/EditServices";
import EditContact from "./admin/sections/EditContact";

const queryClient = new QueryClient();

import MobileDock from "@/components/MobileDock";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
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
  const hostname = window.location.hostname;
  const isAdminSubdomain = hostname.startsWith('admin.') || hostname.includes('admin-');
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

  // If we are on the admin subdomain
  if (isAdminSubdomain) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<EditProfile />} />
            <Route path="projects" element={<EditProjects />} />
            <Route path="skills" element={<EditSkills />} />
            <Route path="services" element={<EditServices />} />
            <Route path="contact" element={<EditContact />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    );
  }

  // Main Site Routes (or local development with /admin fallback)
  return (
    <Routes>
      {/* Admin routes on localhost - kept separate from MainLayout to avoid user-side background/header/footer */}
      {isLocalhost && (
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<EditProfile />} />
            <Route path="projects" element={<EditProjects />} />
            <Route path="skills" element={<EditSkills />} />
            <Route path="services" element={<EditServices />} />
            <Route path="contact" element={<EditContact />} />
          </Route>
        </Route>
      )}

      {isLocalhost && (
        <Route path="/admin/login" element={<Login />} />
      )}

      <Route element={<MainLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

