'use client';

import { motion } from 'framer-motion';

export default function Particles() {
  return (
    <div className="hidden md:block absolute inset-0 z-5 pointer-events-none">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-purple-400/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0, 0.8, 0],
            scale: [0, Math.random() + 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
} 
