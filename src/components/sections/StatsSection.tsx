
import React from 'react';
import { motion } from 'framer-motion';

const StatsSection = () => {
  const stats = [
    {
      number: "150+",
      label: "Projects Completed"
    },
    {
      number: "50+", 
      label: "Happy Clients"
    },
    {
      number: "2",
      label: "Years Experience"
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-black/30 backdrop-blur-sm w-full overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center flex flex-col items-center justify-center py-6 px-2 sm:px-4 rounded-2xl bg-white/5 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: index * 0.2 + 0.3,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200
                }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 mx-0"
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-300 text-base sm:text-lg font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
