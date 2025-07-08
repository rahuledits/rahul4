'use client';

import React from 'react';
import { motion } from 'framer-motion';

type MediaButtonProps = {
  label: string;
  mediaUrl: string; // .mp4, .webm, or .gif
};

export const MediaButton: React.FC<MediaButtonProps> = ({ label, mediaUrl }) => {
  const isVideo = /\.(mp4|webm)$/i.test(mediaUrl);

  return (
    <motion.button
      className="relative overflow-hidden rounded-2xl px-8 py-3 min-w-[180px] text-white font-semibold text-lg group shadow-lg hover:cursor-pointer"
      whileHover={{ scale: 1.4, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.25), 0 1.5px 6px 0 rgba(168,85,247,0.18)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      initial="rest"
      animate="rest"
    >
      {isVideo ? (
        <motion.video
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          src={mediaUrl}
          muted
          loop
          playsInline
          autoPlay
        />
      ) : (
        <motion.img
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          src={mediaUrl}
          alt="Background"
        />
      )}

      {/* Button Text with animated gradient */}
      <motion.span
        className="relative z-20 bg-gradient-to-r from-fuchsia-300 via-indigo-300 to-blue-300 bg-clip-text text-transparent font-bold text-lg"
        initial={{ backgroundPosition: '0% 50%' }}
        whileHover={{ backgroundPosition: '100% 50%' }}
        transition={{ duration: 1.2, ease: 'linear' }}
      >
        {label}
      </motion.span>
    </motion.button>
  );
}; 