import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, Menu, X } from "lucide-react";
import { MediaButton } from "@/components/ui/media-button";

const navItems = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Portfolio", url: "/portfolio" },
  { name: "Let's Talk", url: "/services" },
];

interface NavigationProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export default function Navigation({ isDark, onThemeToggle }: NavigationProps) {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar at the top of the page
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else {
        // Hide when scrolling down, show when scrolling up
        setIsVisible(currentScrollY < lastScrollY);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Mouse move for spotlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 w-screen max-w-none rounded-2xl shadow-2xl px-4 sm:px-8 md:px-12 py-2 sm:py-3 flex items-center justify-between backdrop-blur-xl transition-all duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } ${
      isDark 
        ? 'bg-black/30 border border-white/10' 
        : 'bg-white/80 border border-gray-200/50'
    }`}>
      {/* Logo/Brand */}
      <motion.div
        whileHover={{ scale: 1.2, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.15), 0 1.5px 6px 0 rgba(168,85,247,0.10)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="rounded-2xl"
      >
        <Link
          to="/"
          className="relative overflow-hidden rounded-2xl px-4 sm:px-8 py-1 sm:py-2 min-w-[120px] sm:min-w-[200px] flex items-center justify-center font-bold text-lg sm:text-2xl md:text-3xl tracking-tight drop-shadow-sm group shadow-lg"
          style={{ height: '40px' }}
        >
          {/* Background GIF */}
          <img
            src="/font/r.gif"
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          />
          {/* Animated Gradient Text */}
          <span
            className="relative z-10 bg-gradient-to-r from-fuchsia-300 via-indigo-300 to-blue-300 bg-clip-text text-transparent animate-hireme-text-gradient"
            style={{ backgroundSize: '200% 200%' }}
          >
            Rahul Meena
          </span>
        </Link>
      </motion.div>
      {/* Hamburger for mobile */}
      <button
        className="sm:hidden p-2 ml-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>
      {/* Navigation Links - Desktop */}
      <div className="hidden sm:flex gap-2 md:gap-4 lg:gap-8 items-center">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.url}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-base md:text-lg transition-colors duration-200 drop-shadow-sm ${
              location.pathname === item.url 
                ? isDark 
                  ? "bg-white/20 shadow-md text-white" 
                  : "bg-gray-900/10 shadow-md text-gray-900"
                : isDark
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
      {/* Theme Toggle & Hire Me Button - Desktop */}
      <div className="hidden sm:flex items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={onThemeToggle}
            className={`p-2 rounded-lg transition-all duration-200 drop-shadow-sm ${
              isDark 
                ? 'bg-white/10 hover:bg-white/20 text-white' 
                : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-700'
            }`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        <MediaButton label="Hire Me" mediaUrl="/font/F.gif" />
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`sm:hidden absolute top-full left-0 w-full bg-white dark:bg-black/90 border-t border-gray-200 dark:border-white/10 shadow-xl rounded-b-2xl z-40 flex flex-col items-center py-4 gap-2 animate-fade-in`}> 
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.url}
              className={`w-11/12 text-center px-4 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 drop-shadow-sm ${
                location.pathname === item.url 
                  ? isDark 
                    ? "bg-white/20 shadow-md text-white" 
                    : "bg-gray-900/10 shadow-md text-gray-900"
                  : isDark
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
              }`}
              style={{ minHeight: 44 }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={onThemeToggle}
              className={`p-2 rounded-lg transition-all duration-200 drop-shadow-sm ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-700'
              }`}
              style={{ minWidth: 44, minHeight: 44 }}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <MediaButton label="Hire Me" mediaUrl="/font/F.gif" />
          </div>
        </div>
      )}
    </nav>
  );
}

/* Add to your global CSS (App.css or index.css):
@keyframes hireme-border {
  0% { filter: blur(6px) brightness(1.2); }
  100% { filter: blur(6px) brightness(1.2); }
}
.animate-hireme-border {
  animation: hireme-border 2s linear infinite;
}
@keyframes hireme-pulse {
  0% { opacity: 0.7; transform: scale(0.2); }
  60% { opacity: 0.5; transform: scale(1.1); }
  100% { opacity: 0; transform: scale(1.5); }
}
.animate-hireme-pulse {
  animation: hireme-pulse 0.7s cubic-bezier(.4,2,.6,1) forwards;
}
@keyframes hireme-text-gradient {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
.animate-hireme-text-gradient {
  background-size: 200% 200%;
  animation: hireme-text-gradient 2s linear infinite;
}
*/ 