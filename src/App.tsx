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
      <Footer />
    </div>
  );
};

const AppContent = () => {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<EditProfile />} />
          <Route path="projects" element={<EditProjects />} />
          <Route path="skills" element={<EditSkills />} />
          <Route path="services" element={<EditServices />} />
          <Route path="contact" element={<EditContact />} />
        </Route>
      </Route>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Main Site Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
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

