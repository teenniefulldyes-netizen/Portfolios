"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function SectionDivider({ 
  variant = "wave", 
  topColor = "#000000", 
  bottomColor = "#111111",
  className = "" 
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform values for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  
  // Render different divider shapes based on variant
  const renderDivider = () => {
    switch(variant) {
      case 'wave':
        return (
          <motion.svg 
            style={{ y }}
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-24 transform rotate-180"
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
              fill={bottomColor}
            />
          </motion.svg>
        );
      
      case 'curve':
        return (
          <motion.svg 
            style={{ y }}
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-20 transform rotate-180"
          >
            <path 
              d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" 
              fill={bottomColor}
            />
          </motion.svg>
        );
      
      case 'triangle':
        return (
          <motion.svg 
            style={{ y }}
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-20 transform rotate-180"
          >
            <path 
              d="M1200 0L0 0 598.97 114.72 1200 0z" 
              fill={bottomColor}
            />
          </motion.svg>
        );
      
      case 'split':
        return (
          <motion.svg 
            style={{ y }}
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-24 transform rotate-180"
          >
            <path 
              d="M1200 120L0 16.48 0 0 1200 0 1200 120z" 
              fill={bottomColor}
            />
          </motion.svg>
        );
        
      case 'arrow':
        return (
          <motion.svg 
            style={{ y }}
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-24 transform rotate-180"
          >
            <path 
              d="M649.97 0L550.03 0 599.91 54.12 649.97 0z" 
              fill={bottomColor}
            />
          </motion.svg>
        );
        
      case 'glassy':
        return (
          <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
            <motion.div 
              style={{ y }}
              className="absolute bottom-0 left-0 w-full h-full bg-white/5 backdrop-blur-lg border-t border-white/10"
            >
              <div className="w-full h-full" style={{
                background: `linear-gradient(to bottom, transparent, ${bottomColor})`
              }}></div>
            </motion.div>
          </div>
        );
      
      case 'layered':
        return (
          <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]), backgroundColor: bottomColor }}
              className="absolute bottom-0 left-0 w-full h-12 opacity-30"
            ></motion.div>
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -20]), backgroundColor: bottomColor }}
              className="absolute bottom-0 left-0 w-full h-12 opacity-60"
            ></motion.div>
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -10]), backgroundColor: bottomColor }}
              className="absolute bottom-0 left-0 w-full h-12"
            ></motion.div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundColor: topColor }}></div>
      {renderDivider()}
    </div>
  );
}

export default SectionDivider;