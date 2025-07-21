import React from "react";

export default function AnimatedCamera() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
      <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow */}
        <ellipse cx="160" cy="285" rx="70" ry="18" fill="#1a2633" opacity="0.4" />
        {/* Tripod legs */}
        <rect x="110" y="180" width="12" height="80" rx="6" fill="#ffe066" />
        <rect x="150" y="180" width="12" height="80" rx="6" fill="#ffe066" />
        <rect x="190" y="180" width="12" height="80" rx="6" fill="#ffe066" />
        {/* Camera body with bounce */}
        <g style={{ animation: 'bounce 2.2s cubic-bezier(.68,-0.55,.27,1.55) infinite' }}>
          <rect x="100" y="110" width="120" height="60" rx="16" fill="#22384a" />
          {/* Lens */}
          <rect x="210" y="125" width="40" height="30" rx="10" fill="#e94f4f" />
          {/* Projector light beam */}
          <polygon points="250,140 320,110 320,170 250,170" fill="url(#beam)" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite" />
          </polygon>
          {/* Red button */}
          <rect x="130" y="100" width="30" height="12" rx="6" fill="#e94f4f" />
        </g>
        {/* Left Reel */}
        <g style={{ transformOrigin: '120px 100px', animation: 'spin 2.5s linear infinite' }}>
          <circle cx="120" cy="100" r="28" fill="#fff" stroke="#22384a" strokeWidth="4" />
          <circle cx="120" cy="100" r="20" fill="#22384a" />
          {[0,1,2,3,4,5].map(i => (
            <rect key={i} x={120+20*Math.cos(i*Math.PI/3)-3} y={100+20*Math.sin(i*Math.PI/3)-3} width="6" height="6" rx="2" fill="#e94f4f" />
          ))}
        </g>
        {/* Right Reel */}
        <g style={{ transformOrigin: '200px 100px', animation: 'spin 2.5s linear infinite reverse' }}>
          <circle cx="200" cy="100" r="28" fill="#fff" stroke="#22384a" strokeWidth="4" />
          <circle cx="200" cy="100" r="20" fill="#22384a" />
          {[0,1,2,3,4,5].map(i => (
            <rect key={i} x={200+20*Math.cos(i*Math.PI/3)-3} y={100+20*Math.sin(i*Math.PI/3)-3} width="6" height="6" rx="2" fill="#e94f4f" />
          ))}
        </g>
        {/* SVG Gradients */}
        <defs>
          <linearGradient id="beam" x1="250" y1="140" x2="320" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffe066" stopOpacity="0.7" />
            <stop offset="1" stopColor="#ffe066" stopOpacity="0" />
          </linearGradient>
        </defs>
        <style>{`
          @keyframes spin { 100% { transform: rotate(360deg); } }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            20% { transform: translateY(-8px); }
            40% { transform: translateY(0); }
            60% { transform: translateY(-4px); }
            80% { transform: translateY(0); }
          }
        `}</style>
      </svg>
    </div>
  );
} 