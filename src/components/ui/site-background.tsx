import React from 'react';
import { BackgroundPaths } from "@/components/ui/animated-infinity-background";
import { SparklesCore } from "@/components/ui/sparkles";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";

interface SiteBackgroundProps {
  isDarkMode: boolean;
  showRobot?: boolean;
  showInfinityLines?: boolean;
  sparkleDensity?: number;
  sparkleColor?: string;
  sparkleSpeed?: number;
}

const SiteBackground = ({ 
  isDarkMode, 
  showRobot = false, 
  showInfinityLines = false,
  sparkleDensity = 30,
  sparkleColor = "#8b5cf6",
  sparkleSpeed = 0.5
}: SiteBackgroundProps) => {
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  return (
    <>
      {/* Animated Infinity Background (bottom layer) - only show if showInfinityLines is true */}
      {showInfinityLines && (
        <div className="absolute inset-0 z-0">
          <BackgroundPaths titleBackground={false} showGradientOrb={true} backgroundStyle="gradient" />
        </div>
      )}
      
      {/* Sparkles (stars) */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <SparklesCore 
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={sparkleDensity}
          className="w-full h-full"
          particleColor={sparkleColor}
          speed={sparkleSpeed}
        />
      </div>
      
      {/* 3D Robot Background (optional) */}
      {showRobot && (
        <InteractiveRobotSpline scene={ROBOT_SCENE_URL} className="absolute inset-0 z-10" />
      )}
      
      {/* Dark overlay for better text readability */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/20' : 'bg-orange-100/10'} z-30`}></div>
    </>
  );
};

export default SiteBackground; 