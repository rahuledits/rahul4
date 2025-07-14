import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { handleCSPViolation } from "./utils/security";
import SocialProofPopup from "@/components/ui/SocialProofPopup";
const About = lazy(() => import("./pages/About"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const CreateTogether = lazy(() => import("./pages/CreateTogether"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference, default to dark
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Memoize theme toggle handler
  const handleThemeToggle = useCallback(() => {
    setIsDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Security: Monitor CSP violations
  useEffect(() => {
    document.addEventListener('securitypolicyviolation', handleCSPViolation);
    
    return () => {
      document.removeEventListener('securitypolicyviolation', handleCSPViolation);
    };
  }, []);

  // Spinner fallback for Suspense
  const Spinner = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500" />
    </div>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* Consider moving SocialProofPopup to only the pages where it's needed for further optimization */}
        <SocialProofPopup />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index isDark={isDark} onThemeToggle={handleThemeToggle} />} />
            <Route path="/about" element={<Suspense fallback={<Spinner />}><About isDark={isDark} onThemeToggle={handleThemeToggle} /></Suspense>} />
            <Route path="/portfolio" element={<Suspense fallback={<Spinner />}><Portfolio isDark={isDark} onThemeToggle={handleThemeToggle} /></Suspense>} />
            <Route path="/services" element={<Suspense fallback={<Spinner />}><Services isDark={isDark} onThemeToggle={handleThemeToggle} /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<Spinner />}><Contact isDark={isDark} onThemeToggle={handleThemeToggle} /></Suspense>} />
            <Route path="/create-together" element={<Suspense fallback={<Spinner />}><CreateTogether isDark={isDark} onThemeToggle={handleThemeToggle} /></Suspense>} />
            <Route path="/privacy" element={<Suspense fallback={<Spinner />}><Privacy isDark={isDark} onThemeToggle={handleThemeToggle} /></Suspense>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<Suspense fallback={<Spinner />}><NotFound isDark={isDark} onThemeToggle={handleThemeToggle} /></Suspense>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
