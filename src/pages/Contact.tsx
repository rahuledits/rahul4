import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from "@/components/navigation/Navigation";
import SiteBackground from "@/components/ui/site-background";
import { PremiumContact } from "@/components/ui/premium-contact";

const Contact = ({ isDark, onThemeToggle }) => {
  return (
    <>
      <Navigation isDark={isDark} onThemeToggle={onThemeToggle} />
      <div className="min-h-screen relative overflow-hidden">
        {/* Site Background */}
        <SiteBackground 
          isDarkMode={isDark} 
          sparkleDensity={35}
          sparkleColor="#8b5cf6"
          sparkleSpeed={0.5}
        />

        {/* Premium Contact Component */}
        <div className="relative z-40">
          <PremiumContact />
        </div>
      </div>
    </>
  );
};

export default Contact;
