import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Destinations", url: "/destinations" },
  { name: "Blog", url: "/blog" },
  { name: "About Us", url: "/about" },
  { name: "Contact", url: "/contact" },
];

export default function GlowidayNavBar() {
  const location = useLocation();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-5xl rounded-2xl bg-white/80 border border-gray-200 shadow-lg px-8 py-3 flex items-center justify-between backdrop-blur-md">
      {/* Logo/Brand */}
      <Link to="/" className="text-xl font-bold text-gray-800 tracking-tight">
        Glowidays
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.url}
            to={item.url}
            className={`text-gray-700 font-medium hover:text-black transition ${
              location.pathname === item.url ? "text-black underline underline-offset-8" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Right Side: Get in Touch Button */}
      <Link to="/contact">
        <Button className="bg-black text-white rounded-full px-6 py-2 font-semibold shadow hover:bg-gray-900 transition">
          Get in touch
        </Button>
      </Link>
    </nav>
  );
} 