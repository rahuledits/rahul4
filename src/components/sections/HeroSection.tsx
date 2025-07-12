import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { BackgroundPaths } from "@/components/ui/animated-infinity-background";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";

interface HeroSectionProps {
  isDarkMode: boolean;
}

const HeroSection = ({
  isDarkMode
}: HeroSectionProps) => {
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";
  // Responsive: reduce sparkles and robot size on mobile
  const [particleDensity, setParticleDensity] = useState(120);
  const [particleMinSize, setParticleMinSize] = useState(0.4);
  const [particleMaxSize, setParticleMaxSize] = useState(1.2);
  const [robotSize, setRobotSize] = useState({ w: 'w-48', h: 'h-36' });
  const [sparkleFps, setSparkleFps] = useState(120);
  const [sparkleSpeed, setSparkleSpeed] = useState(1);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) {
        setParticleDensity(3); // ultra-low for mobile
        setParticleMinSize(0.2);
        setParticleMaxSize(0.5);
        setRobotSize({ w: 'w-32', h: 'h-24' }); // smaller robot for mobile
        setSparkleFps(30); // lower FPS for mobile
        setSparkleSpeed(0.5); // slower for mobile
      } else {
        setParticleDensity(120);
        setParticleMinSize(0.4);
        setParticleMaxSize(1.2);
        setRobotSize({ w: 'w-48', h: 'h-36' });
        setSparkleFps(120);
        setSparkleSpeed(1);
      }
    }
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setParticleDensity(3);
        setParticleMinSize(0.2);
        setParticleMaxSize(0.5);
        setRobotSize({ w: 'w-32', h: 'h-24' });
        setSparkleFps(30);
        setSparkleSpeed(0.5);
      } else {
        setParticleDensity(120);
        setParticleMinSize(0.4);
        setParticleMaxSize(1.2);
        setRobotSize({ w: 'w-48', h: 'h-36' });
        setSparkleFps(120);
        setSparkleSpeed(1);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center overflow-hidden">
      {/* Animated Infinity Background (bottom layer) */}
      <div className="absolute inset-0 z-0">
        <BackgroundPaths titleBackground={false} showGradientOrb={true} backgroundStyle="gradient" />
      </div>
      {/* Animated 'RAHUL' heading centered at the top with extra space */}
      <div className="absolute top-4 sm:top-8 left-1/2 transform -translate-x-1/2 z-20 mt-16 sm:mt-32 w-full flex justify-center px-2">
        <motion.h1
          initial={{ opacity: 0, y: -40, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-3xl xs:text-4xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter bg-gradient-to-br from-red-800 via-red-500 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl hero-star-dock whitespace-nowrap px-1 sm:px-2"
        >
          {"RAHUL".split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: i * 0.08,
                type: "spring",
                stiffness: 150,
                damping: 25,
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
      </div>
      {/* Sparkles (stars) behind robot, text, and lines */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <SparklesCore 
          background="transparent"
          minSize={particleMinSize}
          maxSize={particleMaxSize}
          particleDensity={particleDensity}
          className="w-full h-full"
          particleColor="#fff"
          speed={sparkleSpeed}
          fpsLimit={sparkleFps}
        />
      </div>
      {/* 3D Robot Background (above sparkles) */}
      <div className="absolute z-10 w-full h-full pointer-events-none">
        <div className="hidden sm:block absolute inset-0">
          <InteractiveRobotSpline scene={ROBOT_SCENE_URL} className="w-full h-full" />
        </div>
        {/* Mobile robot: absolutely positioned, not cut off, behind heading */}
        <div className={`block sm:hidden absolute left-1/2 top-[60%] w-96 h-96 -translate-x-1/2 -translate-y-1/2 z-10 overflow-visible pointer-events-none`}>
          <InteractiveRobotSpline scene={ROBOT_SCENE_URL} className="w-full h-full" />
        </div>
      </div>
      {/* Dark overlay for better text readability (above all backgrounds) */}
      <div className={`absolute inset-0 top-20 ${isDarkMode ? 'bg-black/20' : 'bg-orange-100/10'} z-5`}></div>
      {/* Main content in bottom-left corner, no background (topmost) */}
      <div className="relative z-10 w-full flex-1 flex items-end justify-start">
        <div className="mb-16 lg:mb-24 animate-fade-in text-left max-w-xl ml-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
            Video Editor & Creative Director
          </h1>
        </div>
      </div>
      {/* Floating Elements (topmost) */}
      <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 ${isDarkMode ? 'text-white/60' : 'text-orange-600'} animate-bounce-gentle z-10`}>
        <div className="text-sm">Scroll to explore</div>
      </div>
    </section>
  );
};

export default HeroSection;
