"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type GridLinesProps = {
  color?: "purple" | "blue" | "gradient";
  spacing?: number;
  opacity?: number;
  animated?: boolean;
  perspective?: boolean;
};

export default function GridLines({
  color = "gradient",
  spacing = 50,
  opacity = 0.4,
  animated = true,
  perspective = true,
}: GridLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Get color based on color scheme
  const getLineColor = (index: number) => {
    switch (color) {
      case "purple":
        return `rgba(147, 51, 234, ${opacity})`;
      case "blue":
        return `rgba(37, 99, 235, ${opacity})`;
      case "gradient":
      default:
        // Alternate between purple and blue
        return index % 2 === 0
          ? `rgba(147, 51, 234, ${opacity})`
          : `rgba(37, 99, 235, ${opacity})`;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Set canvas size to match viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Animation function
    const render = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate grid parameters based on perspective
      const horizonY = perspective ? canvas.height * 0.5 : canvas.height * 0.5;
      const perspectiveStrength = perspective ? 0.8 : 0;
      
      // Draw horizontal lines
      for (let y = -spacing; y < canvas.height + spacing; y += spacing) {
        const adjustedY = perspective 
          ? y + Math.sin(time * 0.001 + y * 0.01) * 5 
          : y;
          
        ctx.beginPath();
        ctx.moveTo(0, adjustedY);
        
        // Draw perspective lines or straight lines
        if (perspective) {
          for (let x = 0; x <= canvas.width; x += 20) {
            // Calculate perspective distortion
            const distFromHorizon = Math.abs(adjustedY - horizonY);
            const perspectiveWave = Math.sin(time * 0.001 + x * 0.005) * 3;
            const yOffset = perspectiveWave * (distFromHorizon / canvas.height) * 15;
            
            ctx.lineTo(x, adjustedY + yOffset);
          }
        } else {
          // For straight lines, just add a slight wave if animated
          if (animated) {
            for (let x = 0; x <= canvas.width; x += 20) {
              const wave = Math.sin(time * 0.001 + x * 0.01) * 2;
              ctx.lineTo(x, adjustedY + wave);
            }
          } else {
            ctx.lineTo(canvas.width, adjustedY);
          }
        }
        
        // Set line properties
        ctx.strokeStyle = getLineColor(Math.floor(y / spacing));
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Draw vertical lines
      for (let x = -spacing; x < canvas.width + spacing; x += spacing) {
        const adjustedX = animated 
          ? x + Math.sin(time * 0.001 + x * 0.01) * 3 
          : x;
          
        ctx.beginPath();
        ctx.moveTo(adjustedX, 0);
        
        // Draw perspective lines or straight lines
        if (perspective) {
          for (let y = 0; y <= canvas.height; y += 20) {
            // Calculate distance from horizon
            const distFromCenter = Math.abs((adjustedX / canvas.width) - 0.5);
            const perspectiveWave = Math.sin(time * 0.001 + y * 0.005) * 3;
            const xOffset = perspectiveWave * distFromCenter * 20;
            
            ctx.lineTo(adjustedX + xOffset, y);
          }
        } else {
          // For straight lines, just add a slight wave if animated
          if (animated) {
            for (let y = 0; y <= canvas.height; y += 20) {
              const wave = Math.sin(time * 0.001 + y * 0.01) * 2;
              ctx.lineTo(adjustedX + wave, y);
            }
          } else {
            ctx.lineTo(adjustedX, canvas.height);
          }
        }
        
        // Set line properties
        ctx.strokeStyle = getLineColor(Math.floor(x / spacing));
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Update time for animation
      if (animated) {
        time += 16; // Approximately 60fps
      }
      
      // Continue animation
      animationFrameId = requestAnimationFrame(render);
    };

    // Start animation
    render();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, spacing, opacity, animated, perspective]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Add dark gradient overlay */}
      <div className="absolute inset-0  z-0"></div>
    </div>
  );
}