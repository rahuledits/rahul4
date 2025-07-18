"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SparklesCore } from "@/components/ui/sparkles";
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react";
import { openExternalLink } from "@/utils/security";
import { useState } from "react";
interface FooterdemoProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}
function Footerdemo({
  isDarkMode,
  onThemeToggle
}: FooterdemoProps) {
  // Animated quote rotator
  const quotes = [
    "Creativity is intelligence having fun.",
    "Every frame tells a story.",
    "Edit. Inspire. Repeat.",
    "Dream in color, edit in style.",
    "Magic happens in the timeline."
  ];
  const [quoteIdx, setQuoteIdx] = useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setQuoteIdx((i) => (i + 1) % quotes.length), 3500);
    return () => clearInterval(interval);
  }, []);
  // Confetti burst on Back to Top
  const [showConfetti, setShowConfetti] = useState(false);
  const handleBackToTop = () => {
    setShowConfetti(true);
    window.scrollTo({top: 0, behavior: 'smooth'});
    setTimeout(() => setShowConfetti(false), 1800);
  };
  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300 overflow-hidden">
      {/* Animated Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-40 blur-2xl animate-float${i % 2 === 0 ? '1' : '2'}`}
            style={{
              width: `${60 + i * 18}px`,
              height: `${60 + i * 18}px`,
              left: `${10 + i * 10}%`,
              top: `${i % 2 === 0 ? 10 + i * 7 : 60 - i * 5}%`,
              background: `linear-gradient(135deg, hsl(${220 + i * 20}, 80%, 70%), hsl(${320 - i * 15}, 90%, 60%))`,
              zIndex: 0
            }}
          />
        ))}
      </div>
      {/* Centered Logo & Tagline */}
      <div className="flex flex-col items-center justify-center py-10 relative z-10">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 via-pink-400 to-indigo-500 flex items-center justify-center shadow-2xl mb-4 animate-pulse border-4 border-white/20" style={{boxShadow: '0 0 32px 8px #f472b6, 0 0 64px 16px #818cf8'}}>
          <img src="/e.png" alt="Rahul Meena Logo" className="w-14 h-14 rounded-full object-cover border-4 border-white/30 animate-neon-glow" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent mb-2 tracking-tight animate-gradient-move text-center">Rahul Meena</h1>
        <p className="text-base text-muted-foreground mb-2 italic animate-fade-in text-center">Crafting stories, one frame at a time.</p>
        {/* Animated Quote Rotator */}
        <div className="mb-4 min-h-[28px]">
          <span className="block text-sm font-semibold text-pink-400 animate-fade-in-slow transition-all duration-700 ease-in-out text-center drop-shadow-lg">
            {quotes[quoteIdx]}
          </span>
        </div>
        <div className="w-32 h-1 bg-gradient-to-r from-orange-400 via-pink-400 to-indigo-500 rounded-full mb-8 animate-gradient-move" />
      </div>
      <div className="container mx-auto px-4 pb-8 md:px-6 lg:px-8 relative z-10">
        {/* Symmetrical Grid: 4 columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Newsletter */}
          <div className="flex flex-col items-center md:items-center bg-white/10 dark:bg-black/20 rounded-2xl p-6 shadow-lg backdrop-blur-md border border-white/10">
            <h2 className="mb-3 text-xl font-bold tracking-tight flex items-center justify-center gap-2"><Send className="w-6 h-6 text-orange-400 animate-pulse" /> Newsletter</h2>
            <p className="mb-4 text-muted-foreground text-sm">Get updates & offers.</p>
            <form className="w-full flex flex-col items-center gap-2">
              <Input type="email" placeholder="Your email" className="w-full max-w-xs text-center" />
              <Button type="submit" size="icon" className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-lg hover:scale-110 transition-transform">
                <Send className="h-5 w-5" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-center bg-white/10 dark:bg-black/20 rounded-2xl p-6 shadow-lg backdrop-blur-md border border-white/10">
            <h3 className="mb-3 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a href="#home" className="block transition-colors hover:text-primary">Home</a>
              <a href="#portfolio" className="block transition-colors hover:text-primary">My Works</a>
              <a href="#services" className="block transition-colors hover:text-primary">Services</a>
              <a href="#testimonials" className="block transition-colors hover:text-primary">Testimonials</a>
              <a href="#contact" className="block transition-colors hover:text-primary">Contact</a>
            </nav>
          </div>
          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-center bg-white/10 dark:bg-black/20 rounded-2xl p-6 shadow-lg backdrop-blur-md border border-white/10">
            <h3 className="mb-3 text-lg font-semibold">Contact</h3>
            <address className="space-y-2 text-sm not-italic text-center">
              <p>Mumbai, India</p>
              <p>NIT Nagpur Student</p>
              <p>Video Editor & Cinematographer</p>
              <p><a href="mailto:jirahulmeena@gmail.com" className="underline hover:text-primary">jirahulmeena@gmail.com</a></p>
            </address>
          </div>
          {/* Social & Back to Top */}
          <div className="flex flex-col items-center md:items-center bg-white/10 dark:bg-black/20 rounded-2xl p-6 shadow-lg backdrop-blur-md border border-white/10">
            <h3 className="mb-3 text-lg font-semibold">Follow Me</h3>
            <div className="flex justify-center space-x-4 mb-4">
              <Button variant="outline" size="icon" className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-pink-400 to-orange-400 shadow-lg hover:scale-110 transition-transform" onClick={() => openExternalLink('https://instagram.com/its_rahul_fu')}><Instagram className="h-6 w-6 text-white" /></Button>
              <Button variant="outline" size="icon" className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg hover:scale-110 transition-transform" onClick={() => openExternalLink('https://linkedin.com/in/rahul-meena')}><Linkedin className="h-6 w-6 text-white" /></Button>
              <Button variant="outline" size="icon" className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-sky-400 to-blue-500 shadow-lg hover:scale-110 transition-transform" onClick={() => openExternalLink('https://twitter.com/rahul_meena')}><Twitter className="h-6 w-6 text-white" /></Button>
              <Button variant="outline" size="icon" className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-700 to-blue-400 shadow-lg hover:scale-110 transition-transform" onClick={() => openExternalLink('https://facebook.com/itsrahuledits')}><Facebook className="h-6 w-6 text-white" /></Button>
            </div>
            <Button variant="ghost" size="sm" className="mt-2 animate-bounce text-xs text-muted-foreground hover:text-primary shadow-lg ring-2 ring-orange-400/40 hover:ring-pink-400/60 transition-all" onClick={handleBackToTop}>
              <span className="inline-block animate-pulse">↑</span> Back to Top
            </Button>
            {/* Confetti Burst Animation */}
            {showConfetti && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                <svg width="180" height="80">
                  {[...Array(24)].map((_, i) => (
                    <circle key={i} cx={90} cy={40} r={4 + Math.random() * 3} fill={`hsl(${Math.random()*360},90%,60%)`} style={{
                      transform: `translate(${Math.cos((i/24)*2*Math.PI)*60}px,${Math.sin((i/24)*2*Math.PI)*30}px)`
                    }}>
                      <animate attributeName="r" from="7" to="0" dur="1.2s" fill="freeze" />
                    </circle>
                  ))}
                </svg>
              </div>
            )}
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">© 2024 Rahul Meena. All rights reserved.</p>
          <nav className="flex gap-4 text-sm justify-center">
            <a href="/privacy" className="transition-colors hover:text-primary">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-primary">Terms of Service</a>
          </nav>
        </div>
        {/* Extra Sparkles Animation at bottom */}
        <div className="w-full h-20 relative mt-6">
          <SparklesCore background="transparent" minSize={0.4} maxSize={1.2} particleDensity={200} className="w-full h-full" particleColor={isDarkMode ? "#fb923c" : "#ea580c"} speed={2} />
        </div>
      </div>
      {/* Keyframes for floating shapes and neon glow */}
      <style>{`
        @keyframes float1 { 0%{transform:translateY(0);} 50%{transform:translateY(-30px);} 100%{transform:translateY(0);} }
        @keyframes float2 { 0%{transform:translateY(0);} 50%{transform:translateY(30px);} 100%{transform:translateY(0);} }
        .animate-float1 { animation: float1 7s ease-in-out infinite; }
        .animate-float2 { animation: float2 9s ease-in-out infinite; }
        .animate-neon-glow { box-shadow: 0 0 16px 4px #f472b6, 0 0 32px 8px #818cf8, 0 0 0 0 #fff0; animation: neon-glow 2s alternate infinite; }
        @keyframes neon-glow { 0%{box-shadow:0 0 16px 4px #f472b6,0 0 32px 8px #818cf8;} 100%{box-shadow:0 0 32px 8px #f472b6,0 0 64px 16px #818cf8;} }
        .animate-fade-in-slow { animation: fadeInSlow 1.2s; }
        @keyframes fadeInSlow { from{opacity:0;transform:translateY(10px);} to{opacity:1;transform:translateY(0);} }
      `}</style>
    </footer>
  );
}
export { Footerdemo };