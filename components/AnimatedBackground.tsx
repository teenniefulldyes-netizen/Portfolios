"use client";

import React, { useEffect, useState } from "react";
import { motion, easeIn, easeInOut } from "framer-motion";

type Line = {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  color: string;
  delay: number;
  duration: number;
};

type AnimatedBackgroundProps = {
  linesCount?: number;
  colorScheme?: "purple" | "blue" | "gradient";
  density?: "low" | "medium" | "high";
};

export default function AnimatedBackground({
  linesCount = 50,
  colorScheme = "gradient",
  density = "medium",
}: AnimatedBackgroundProps) {
  const [lines, setLines] = useState<Line[]>([]);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  // Determine line length based on density
  const getLineLength = () => {
    switch (density) {
      case "low":
        return { min: 100, max: 300 };
      case "high":
        return { min: 200, max: 600 };
      default:
        return { min: 150, max: 400 };
    }
  };

  // Get color based on color scheme
  const getLineColor = (index: number) => {
    switch (colorScheme) {
      case "purple":
        return `rgba(147, 51, 234, ${Math.random() * 0.5 + 0.2})`;
      case "blue":
        return `rgba(37, 99, 235, ${Math.random() * 0.5 + 0.2})`;
      case "gradient":
      default:
        // Alternate between purple and blue with variations
        return index % 2 === 0
          ? `rgba(${124 + Math.floor(Math.random() * 40)}, ${58 + Math.floor(Math.random() * 30)}, ${237 - Math.floor(Math.random() * 40)}, ${Math.random() * 0.5 + 0.2})`
          : `rgba(${79 + Math.floor(Math.random() * 30)}, ${70 + Math.floor(Math.random() * 30)}, ${229 - Math.floor(Math.random() * 40)}, ${Math.random() * 0.5 + 0.2})`;
    }
  };

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Handle resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const lineLength = getLineLength();
    const newLines: Line[] = [];

    for (let i = 0; i < linesCount; i++) {
      // Random angle in radians
      const angle = Math.random() * Math.PI * 2;
      // Random length
      const length = Math.random() * (lineLength.max - lineLength.min) + lineLength.min;
      
      // Random starting point
      const x1 = Math.random() * dimensions.width;
      const y1 = Math.random() * dimensions.height;
      
      // Calculate end point based on angle and length
      const x2 = x1 + Math.cos(angle) * length;
      const y2 = y1 + Math.sin(angle) * length;

      newLines.push({
        id: i,
        x1,
        y1,
        x2,
        y2,
        opacity: Math.random() * 0.5 + 0.1,
        color: getLineColor(i),
        delay: Math.random() * 2,
        duration: Math.random() * 8 + 4,
      });
    }

    setLines(newLines);
  }, [dimensions, linesCount, colorScheme, density]);

  const lineVariants = {
    initial: (line: Line) => ({
      pathLength: 0,
      opacity: 0,
    }),
    animate: (line: Line) => ({
      pathLength: 1,
      opacity: line.opacity,
      transition: {
        pathLength: {
          delay: line.delay,
          duration: line.duration,
          ease: easeInOut,
          repeat: Infinity,
          repeatType: "reverse" as const,
        },
        opacity: {
          delay: line.delay,
          duration: line.duration * 0.3,
          ease: easeIn,
        },
      },
    }),
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      <div className="absolute inset-0  z-0"></div>
      <svg width="100%" height="100%" className="absolute inset-0">
        {lines.map((line) => (
          <motion.line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={line.color}
            strokeWidth={Math.random() * 2 + 0.5}
            custom={line}
            variants={lineVariants}
            initial="initial"
            animate="animate"
          />
        ))}
      </svg>
      
      {/* Glowing orbs */}
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={`orb-${index}`}
          className="absolute rounded-full blur-3xl"
          style={{

            width: `${Math.random() * 40 + 20}vh`,
            height: `${Math.random() * 40 + 20}vh`,
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 80}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: easeInOut,
          }}
        />
      ))}
    </div>
  );
}