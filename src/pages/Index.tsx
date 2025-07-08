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
      ],
    },
    {
      name: "Professional",
      icon: <Star className="w-6 h-6" />,
      price: 69,
      description: "Advanced production with premium features",
      color: "blue",
      features: [
        "Advanced Editing & Effects",
        "Motion Graphics & Animation",
        "Professional Sound Design",
        "3-5 Business Day Delivery",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      icon: <Sparkles className="w-6 h-6" />,
      price: 149,
      description: "Complete production with consultation",
      color: "purple",
      features: [
        "Full Post-Production Suite",
        "Custom Visual Effects",
        "Strategic Consultation",
        "5-7 Business Day Delivery",
      ],
    },
  ];



  return (
    <div className="min-h-screen relative overflow-hidden">
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
      
      {/* Social Media Section */}
      <section className="py-20 relative z-30">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur-sm border border-orange-500/30 mb-6">
              <Sparkles className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-300">Connect With Me</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Follow My Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stay updated with my latest projects, behind-the-scenes content, and creative insights
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Social Media Links - Left Side */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-gray-50/80 to-white/90 dark:from-slate-800/20 dark:to-purple-800/10 backdrop-blur-sm rounded-3xl p-12 border border-gray-200 dark:border-white/20 h-full">
                <SocialRevealLinks />
              </div>
            </motion.div>

            {/* Profile Card Section - Right Side */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center items-center h-full"
            >
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <ProfileCard 
                  name="Rahul Meena"
                  description="Video Editor & Cinematographer who focuses on creative excellence & visual storytelling. NIT Nagpur student passionate about bringing stories to life through compelling visuals."
                  image="img.jpg"
                  isVerified={true}
                  followers={546}
                  following={226}
                  enableAnimations={true}
                  onFollow={() => {
                    // Handle follow action
                    console.log("Follow clicked!")
                  }}
                  isFollowing={false}
                />
              </div>
            </motion.div>
          </div>
      </div>
      </section>
      
      {/* Infinity Brand */}
      <div className="relative z-30">
        <InfinityBrand />
      </div>
      
      {/* Footer */}
      <div className="relative z-30">
        <Footerdemo isDarkMode={isDarkMode} onThemeToggle={onThemeToggle} />
      </div>
    </div>
  );
};

export default Index;
