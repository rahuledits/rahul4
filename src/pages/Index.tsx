import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from "@/components/navigation/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

import { Component as InfinityBrand } from "@/components/ui/infinity-brand";
import { Footerdemo } from "@/components/ui/footer-section";
import { SparklesCore } from "@/components/ui/sparkles";
import { CreativePricing } from "@/components/ui/creative-pricing";
import type { PricingTier } from "@/components/ui/creative-pricing";
import { Pencil, Star, Sparkles } from "lucide-react";
import SiteBackground from "@/components/ui/site-background";
import { SocialRevealLinks } from "@/components/ui/social-reveal-links";
import { ProfileCard } from "@/components/ui/profile-card";
import { motion } from "framer-motion";

interface IndexProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

const Index = ({ isDark, onThemeToggle }: IndexProps) => {
  const isDarkMode = isDark;

  const pricingTiers: PricingTier[] = [
    {
      name: "Essential",
      icon: <Pencil className="w-6 h-6" />,
      price: 19,
      description: "Professional editing for quality content",
      color: "amber",
      features: [
        "Professional Video Editing",
        "Color Grading & Correction",
        "Audio Enhancement",
        "2-3 Business Day Delivery",
        "Social Media Optimization",
      ],
    },
    {
      name: "Professional",
      icon: <Star className="w-6 h-6" />,
      price: 69,
      description: "Comprehensive video production with advanced creative solutions for brands and businesses",
      color: "blue",
      features: [
        "Cinematic Editing & Visual Storytelling",
        "Custom Motion Graphics & Animation",
        "Broadcast-Quality Sound Design & Mixing",
        "3-5 Business Day Priority Delivery",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      icon: <Sparkles className="w-6 h-6" />,
      price: 149,
      description: "Production, consultation, unlimited revisions.",
      color: "purple",
      features: [
        "Full Post-Production Suite",
        "Custom Visual Effects",
        "Strategic Consultation",
        "5-7 Business Day Delivery",
        "Unlimited Revisions",
        "Premium Support & Project Management",
      ],
    },
  ];



  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Mobile scale wrapper: scale down all content on small screens */}
      <div className="w-full" style={{ minWidth: 0 }}>
        {/* Site Background */}
        <SiteBackground 
          isDarkMode={isDarkMode} 
          showInfinityLines={true}
          sparkleDensity={30}
          sparkleColor={isDarkMode ? "#8b5cf6" : "#f97316"}
          sparkleSpeed={0.5}
        />
        {/* Navigation */}
        <div className="relative z-[999999999]">
          <Navigation 
            isDark={isDarkMode} 
            onThemeToggle={onThemeToggle} 
          />
        </div>
        {/* Hero Section */}
        <div className="relative z-30">
          <HeroSection isDarkMode={isDarkMode} />
        </div>
        {/* Stats Section */}
        <div className="relative z-30">
          <StatsSection />
        </div>
        {/* Portfolio Section */}
        <div className="relative z-30">
          <PortfolioSection />
          <div className="text-center mt-8 pb-8">
            <Link to="/portfolio">
              <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                View All Projects
              </button>
            </Link>
          </div>
        </div>
        {/* Services Section */}
        <div className="relative z-30">
          <ServicesSection isDarkMode={isDarkMode} />
        </div>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 relative z-30">
          <CreativePricing 
            tag="Service Packages"
            title="Professional Video Production"
            description="Comprehensive video editing and post-production services designed for businesses and content creators"
            tiers={pricingTiers}
          />
        </section>
        {/* Testimonials Section */}
        <div className="relative z-30">
          <TestimonialsSection />
        </div>
        {/* Social Media Section (Animated Handles + Profile Card) */}
        <div className="relative z-30 py-16 flex flex-row items-center justify-center gap-6 flex-wrap">
          <SocialRevealLinks />
          <ProfileCard />
        </div>
        {/* Footer */}
        <div className="relative z-30">
          <Footerdemo isDarkMode={isDarkMode} onThemeToggle={onThemeToggle} />
        </div>
      </div>
      
      {/* Infinity Brand */}
      <div className="relative z-30">
        <InfinityBrand />
      </div>
    </div>
  );
};

export default Index;
