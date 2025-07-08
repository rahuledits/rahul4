import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/navigation/Navigation";
import SiteBackground from "@/components/ui/site-background";

const NotFound = ({ isDark, onThemeToggle }) => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navigation isDark={isDark} onThemeToggle={onThemeToggle} />
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        {/* Site Background */}
        <SiteBackground 
          isDarkMode={isDark} 
          sparkleDensity={25}
          sparkleColor="#8b5cf6"
          sparkleSpeed={0.4}
        />
        <div className="relative z-40 text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">404</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Oops! Page not found</p>
          <a href="/" className="text-orange-400 hover:text-orange-300 underline">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
