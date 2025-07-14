import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "Priya from Mumbai just submitted a project inquiry.",
  "Someone just booked a consultation!",
  "5 people requested a quote in the last 24 hours.",
  "Ajay  from Delhi just sent a message.",
  "A new client just joined from Bangalore!",
  "A project was just completed successfully!",
  "Someone is viewing your portfolio right now!",
  "A new testimonial was just added!"
];

export default function SocialProofPopup() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(messages[0]);
  const lastIndex = useRef(-1);
  const timers = useRef([]);

  function getRandomMessage() {
    let idx;
    do {
      idx = Math.floor(Math.random() * messages.length);
    } while (idx === lastIndex.current && messages.length > 1);
    lastIndex.current = idx;
    return messages[idx];
  }

  useEffect(() => {
    // Show first popup after 30 seconds
    const firstTimer = setTimeout(() => {
      setMessage(getRandomMessage());
      setShow(true);
      // Hide after 6 seconds
      const hideFirst = setTimeout(() => setShow(false), 6000);
      timers.current.push(hideFirst);
    }, 30000); // 30 seconds
    timers.current.push(firstTimer);

    // Show second popup after 5 minutes (300 seconds)
    const secondTimer = setTimeout(() => {
      setMessage(getRandomMessage());
      setShow(true);
      // Hide after 6 seconds
      const hideSecond = setTimeout(() => setShow(false), 6000);
      timers.current.push(hideSecond);
    }, 300000); // 5 minutes
    timers.current.push(secondTimer);

    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: [0, -2, 2, 0] }}
          exit={{ opacity: 0, y: 60, scale: 0.9 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          className="fixed bottom-24 left-8 bg-gradient-to-br from-pink-400/80 via-white/60 to-indigo-400/80 shadow-2xl backdrop-blur-lg border border-white/40 rounded-2xl px-8 py-5 text-gray-900 z-[9999] flex items-center gap-3"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', minWidth: 320 }}
        >
          <span role="img" aria-label="notification" className="mr-2 text-2xl animate-bounce">✨</span>
          <span className="font-medium text-base drop-shadow-lg">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 