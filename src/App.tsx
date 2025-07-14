import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { handleCSPViolation } from "./utils/security";
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

  const handleThemeToggle = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

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

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index isDark={isDark} onThemeToggle={handleThemeToggle} />} />
            <Route path="/about" element={<Suspense fallback={<div>Loading...</div>}><About isDark={isDark} onThemeToggle={handleThemeToggle} /></Suspense>} />
            <Route path="/portfolio" element={<Suspense fallback={<div>Loading...</div>}><Portfolio isDark={isDark} onThemeToggle={handleThemeToggle} /></Suspense>} />
            <Route path="/services" element={<Suspense fallback={<div>Loading...</div>}><Services isDark={isDark} onThemeToggle={handleThemeToggle} /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<div>Loading...</div>}><Contact isDark={isDark} onThemeToggle={handleThemeToggle} /></Suspense>} />
            <Route path="/create-together" element={<Suspense fallback={<div>Loading...</div>}><CreateTogether isDark={isDark} onThemeToggle={handleThemeToggle} /></Suspense>} />
            <Route path="/privacy" element={<Suspense fallback={<div>Loading...</div>}><Privacy isDark={isDark} onThemeToggle={handleThemeToggle} /></Suspense>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<Suspense fallback={<div>Loading...</div>}><NotFound isDark={isDark} onThemeToggle={handleThemeToggle} /></Suspense>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
