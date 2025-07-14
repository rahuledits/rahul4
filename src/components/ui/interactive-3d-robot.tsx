
'use client';

import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white ${className}`}>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse mb-4 flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
            <span className="text-sm font-medium">Loading 3D Robot...</span>
            <span className="text-xs text-gray-300 mt-1">This may take a few seconds</span>
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={() => {
          console.log('✅ Spline scene loaded successfully');
          console.log('Scene URL:', scene);
        }}
        onError={(error) => {
          console.error('❌ Spline scene error:', error);
          console.error('Scene URL:', scene);
        }}
      />
    </Suspense>
  );
}
