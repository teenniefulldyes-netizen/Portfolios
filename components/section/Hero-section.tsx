"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { easeOut, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';
import { cn } from "@/lib/utils";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import OptimizedImage from "../OptimizedImage";
import Aurora from '@/components/Aurora';
import dynamic from "next/dynamic";

// Optimized dynamic imports - only load for desktop
const DynamicAnimatedBackground = dynamic(
  () => import("../AnimatedBackground").then(mod => ({ default: mod.default })), 
  { 
    ssr: false,
    loading: () => null
  }
);

const DynamicParticles = dynamic(
  () => import("@/components/Particles").then(mod => ({ default: mod.default })), 
  { 
    ssr: false,
    loading: () => null
  }
);

// Enhanced device detection with more granular breakpoints
interface DeviceInfo {
  isMobile: boolean;
  isSmallMobile: boolean;
  isMediumMobile: boolean;
  isLargeMobile: boolean;
  isTablet: boolean;
  isSmallTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  width: number;
  height: number;
  aspectRatio: number;
  orientation: 'portrait' | 'landscape';
}

// Enhanced TypedTextContainer with better mobile optimization
const TypedTextContainer = ({ children, deviceInfo }: { children: React.ReactNode; deviceInfo: DeviceInfo }) => {
  const containerClass = useMemo(() => {
    if (deviceInfo.isSmallMobile) {
      return "relative p-2 rounded-md bg-black/15 backdrop-blur-sm border border-white/8";
    }
    if (deviceInfo.isMediumMobile) {
      return "relative p-2.5 rounded-lg bg-black/18 backdrop-blur-sm border border-white/10";
    }
    if (deviceInfo.isLargeMobile) {
      return "relative p-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/12";
    }
    // Full version for tablets and desktop
    return "typed-text-container relative p-3 overflow-hidden rounded-lg";
  }, [deviceInfo]);

  if (deviceInfo.isMobile) {
    return (
      <div className={containerClass}>
        {children}
      </div>
    );
  }

  // Full animated version for desktop/tablets
  return (
    <motion.div 
      className={containerClass}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/15 to-purple-500/10 rounded-lg"
        animate={{ 
          background: [
            "linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.1))",
            "linear-gradient(90deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.1))",
            "linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.1))"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10">{children}</div>
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500/40 via-indigo-500/60 to-purple-500/40 rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
      />
    </motion.div>
  );
};

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isSmallMobile: false,
    isMediumMobile: false,
    isLargeMobile: false,
    isTablet: false,
    isSmallTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    width: 0,
    height: 0,
    aspectRatio: 1,
    orientation: 'portrait'
  });
  const [hasScrolled, setHasScrolled] = useState(false);
  const nextSectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Enhanced scroll-based animations with device-specific optimizations
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, deviceInfo.isMobile ? 0 : 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, deviceInfo.isMobile ? 1 : 0]);

  // Enhanced device detection with more granular breakpoints
  const updateDeviceInfo = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspectRatio = width / height;
    const orientation = width > height ? 'landscape' : 'portrait';
    
    setDeviceInfo({
      // Mobile breakpoints
      isMobile: width < 768,
      isSmallMobile: width <= 375,           // iPhone SE, small Android phones
      isMediumMobile: width > 375 && width <= 414,  // iPhone 12/13/14, most Android phones
      isLargeMobile: width > 414 && width < 768,     // iPhone Pro Max, large Android phones
      
      // Tablet breakpoints
      isTablet: width >= 768 && width <= 1024,
      isSmallTablet: width >= 768 && width <= 834,   // iPad Mini, small tablets
      
      // Desktop breakpoints
      isDesktop: width > 1024,
      isLargeDesktop: width > 1440,
      
      // Additional info
      width,
      height,
      aspectRatio,
      orientation
    });
  }, []);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    setHasScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    setMounted(true);
    updateDeviceInfo();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateDeviceInfo, 100); // Debounce resize
    };

    let scrollTimeout: NodeJS.Timeout;
    const handleScrollThrottled = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 16); // ~60fps throttling
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScrollThrottled, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScrollThrottled);
      clearTimeout(resizeTimeout);
      clearTimeout(scrollTimeout);
    };
  }, [updateDeviceInfo, handleScroll]);

  const scrollToNextSection = useCallback(() => {
    const target = nextSectionRef.current || document.getElementById('about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Enhanced animation variants with device-specific optimizations
  const containerVariants = useMemo(() => {
    if (deviceInfo.isMobile || shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1, 
          transition: { 
            duration: deviceInfo.isSmallMobile ? 0.2 : 0.3,
            staggerChildren: deviceInfo.isSmallMobile ? 0.1 : 0.15
          } 
        }
      };
    }
    
    return {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: easeOut,
          staggerChildren: 0.2
        }
      }
    };
  }, [shouldReduceMotion, deviceInfo]);

  const itemVariants = useMemo(() => {
    if (deviceInfo.isMobile || shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1, 
          transition: { 
            duration: deviceInfo.isSmallMobile ? 0.2 : 0.3 
          } 
        }
      };
    }
    
    return {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: easeOut }
      }
    };
  }, [shouldReduceMotion, deviceInfo]);

  // Enhanced responsive text sizes with more granular control
  const getTitleSize = useMemo(() => {
    if (deviceInfo.isSmallMobile) {
      return deviceInfo.orientation === 'landscape' 
        ? 'text-2xl' 
        : 'text-3xl';
    }
    if (deviceInfo.isMediumMobile) {
      return deviceInfo.orientation === 'landscape' 
        ? 'text-3xl' 
        : 'text-4xl';
    }
    if (deviceInfo.isLargeMobile) {
      return deviceInfo.orientation === 'landscape' 
        ? 'text-4xl' 
        : 'text-5xl';
    }
    if (deviceInfo.isSmallTablet) {
      return 'text-5xl md:text-6xl';
    }
    return 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl';
  }, [deviceInfo]);

  const getSubtitleSize = useMemo(() => {
    if (deviceInfo.isSmallMobile) {
      return deviceInfo.orientation === 'landscape' 
        ? 'text-sm' 
        : 'text-base';
    }
    if (deviceInfo.isMediumMobile) {
      return deviceInfo.orientation === 'landscape' 
        ? 'text-base' 
        : 'text-lg';
    }
    if (deviceInfo.isLargeMobile) {
      return 'text-lg';
    }
    return 'text-lg sm:text-xl md:text-2xl';
  }, [deviceInfo]);

  // Enhanced container spacing based on device
  const getContainerSpacing = useMemo(() => {
    if (deviceInfo.isSmallMobile) {
      return deviceInfo.orientation === 'landscape' 
        ? 'space-y-2' 
        : 'space-y-3';
    }
    if (deviceInfo.isMediumMobile) {
      return deviceInfo.orientation === 'landscape' 
        ? 'space-y-3' 
        : 'space-y-4';
    }
    if (deviceInfo.isLargeMobile) {
      return 'space-y-4';
    }
    return 'space-y-4 sm:space-y-6';
  }, [deviceInfo]);

  // Enhanced padding for different devices
  const getContainerPadding = useMemo(() => {
    if (deviceInfo.isSmallMobile) {
      return 'px-3 md:px-6';
    }
    if (deviceInfo.isMediumMobile) {
      return 'px-4 md:px-6';
    }
    return 'px-4 md:px-6';
  }, [deviceInfo]);

  // Enhanced top margin for different devices
  const getTopMargin = useMemo(() => {
    if (deviceInfo.isSmallMobile) {
      return deviceInfo.orientation === 'landscape' 
        ? 'mt-16' 
        : 'mt-18';
    }
    if (deviceInfo.isMediumMobile) {
      return deviceInfo.orientation === 'landscape' 
        ? 'mt-18' 
        : 'mt-20';
    }
    if (deviceInfo.isLargeMobile) {
      return 'mt-20';
    }
    return 'mt-20 sm:mt-24 md:mt-0';
  }, [deviceInfo]);

  // Enhanced minimum height calculation
  const getMinHeight = useMemo(() => {
    if (deviceInfo.isSmallMobile) {
      return deviceInfo.orientation === 'landscape' 
        ? 'min-h-[70vh]' 
        : 'min-h-[75vh]';
    }
    if (deviceInfo.isMediumMobile) {
      return deviceInfo.orientation === 'landscape' 
        ? 'min-h-[75vh]' 
        : 'min-h-[80vh]';
    }
    if (deviceInfo.isLargeMobile) {
      return 'min-h-[80vh]';
    }
    return 'min-h-[80vh] sm:min-h-[90vh]';
  }, [deviceInfo]);

  return (
    <>
      <section 
        ref={containerRef}
        className="relative min-h-screen  overflow-hidden -mt-16 rounded-b-[80px]"
        id="home"
      >
        {/* <div className="relative"> */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Reduced number of gradient backgrounds */}
            <div className="absolute top-20 -right-20 md:-right-40 w-64 md:w-96 h-64 md:h-96 rounded-full bg-red-500/8 md:bg-red-500/10 blur-2xl md:blur-3xl" />
            <div className="absolute top-1/4 -left-20 md:-left-40 w-56 md:w-80 h-56 md:h-80 rounded-full bg-blue-500/8 md:bg-blue-500/10 blur-2xl md:blur-3xl" />
            <div className="absolute top-2/4 left-20 md:left-30 w-56 md:w-80 h-56 md:h-80 rounded-full bg-red-900/6 md:bg-red-900/10 blur-2xl md:blur-3xl opacity-40 md:opacity-60" />
            
            {/* Simplified grid pattern for mobile */}
            <div
              className="absolute inset-0 opacity-5 md:opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "30px 30px", // Smaller grid on mobile
              }}
            />
          </div>
        <Aurora
            className="absolute inset-0 -z-10 pointer-events-none h-[60vh]"
            colorStops={["#7B00FF", "#94ff99", "#0900FF"]}
            blend={1.0}
            amplitude={1.0}
            speed={0.5}
          />
        {/* </div> */}
        {/* Enhanced background effects with device-specific optimizations */}
        {/* {mounted && (
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y: shouldReduceMotion || deviceInfo.isMobile ? 0 : y }}
          >
            Enhanced gradient background
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/40 to-purple-950/20" />
            <div className="relative">
    
            <Aurora
            
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
    />
            </div>

            Desktop and large tablet effects
            {deviceInfo.isDesktop && (
              <>
                <DynamicAnimatedBackground 
                  linesCount={deviceInfo.isLargeDesktop ? 25 : 20}
                  colorScheme="gradient" 
                  density="medium"
                />
                <DynamicParticles />
                <GlowingOrbs shouldReduceMotion={shouldReduceMotion} />
              </>
            )}

            Small tablet effects
            {deviceInfo.isSmallTablet && (
              <>
                <DynamicAnimatedBackground 
                  linesCount={12}
                  colorScheme="gradient" 
                  density="low"
                />
                <GlowingOrbs shouldReduceMotion={shouldReduceMotion} />
              </>
            )}

            Mobile effects with device-specific optimizations
            {deviceInfo.isMobile && (
              <SimpleMobileEffects 
                deviceInfo={deviceInfo}
                shouldReduceMotion={shouldReduceMotion}
              />
            )}
          </motion.div>
        )} */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-11">

        {/* Enhanced main content with device-specific optimizations */}
        <motion.div
          className={cn("container relative z-10 ", getContainerPadding, getTopMargin)}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ opacity: shouldReduceMotion || deviceInfo.isMobile ? 1 : opacity }}
        >
          <div className={cn("flex flex-col items-center justify-center text-center", getMinHeight, getContainerSpacing)}>
            <motion.div variants={itemVariants} className="w-full">
              <h1 className={cn("font-normal tracking-tighter items-center flex flex-col", getTitleSize)}>
                <motion.div 
                  className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-blue-400 to-purple-400 tracking-wide text-center w-full"
                  animate={shouldReduceMotion || deviceInfo.isMobile ? {} : {
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Thumthakorn
                </motion.div>
                <motion.div 
                  className={cn("text-white/90 text-center w-full", 
                    deviceInfo.isSmallMobile ? "mt-1" : "mt-2"
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: deviceInfo.isMobile ? 0.2 : 0.5 }}
                >
                  {mounted && (
                    <TypeAnimation
                      sequence={[
                        'Ai engineering', 3000,
                        'Business Ai', 3000,
                        
                        // 'Problem Solver', 3000,
                      ]}
                      wrapper="span"
                      className="text-gray-800 dark:text-white"
                      speed={deviceInfo.isSmallMobile ? 90 : deviceInfo.isMediumMobile ? 80 : 60}
                      repeat={Infinity}
                      cursor={!deviceInfo.isMobile}
                      preRenderFirstString={true}
                    />
                  )}
                </motion.div>
              </h1>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={cn("max-w-[600px] text-muted-foreground w-full", 
                deviceInfo.isSmallMobile ? "px-2" : "px-4", 
                getSubtitleSize
              )}
            >
              {/* <TypedTextContainer deviceInfo={deviceInfo}>
                {mounted && (
                  <TypeAnimation
                    sequence={deviceInfo.isSmallMobile ? [
                      `"Keep growing. Never stop learning."`, 4000,
                      `"เติบโตต่อไป อย่าหยุดเรียนรู้"`, 4000,
                    ] : deviceInfo.isMediumMobile ? [
                      `"Keep growing. Never stop learning."`, 4500,
                      `"เติบโตต่อไป อย่าหยุดเรียนรู้"`, 4500,
                    ] : [
                      `"Keep growing. Never stop learning."`, 5000,
                      `"เติบโตต่อไป อย่าหยุดเรียนรู้"`, 5000,
                      `"Innovation through dedication."`, 5000,
                    ]}
                    wrapper="p"
                    speed={deviceInfo.isSmallMobile ? 80 : deviceInfo.isMediumMobile ? 70 : 50}
                    cursor={!deviceInfo.isMobile}
                    repeat={Infinity}
                    preRenderFirstString={true}
                    className="inline-block font-medium text-center text-gray-800 dark:text-white"
                  />
                )}
              </TypedTextContainer> */}
              <p>
                "Not everyone who makes an effort is rewarded. Howerver! Everyone who has succeeded has undoubtedly made an effort!!!
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className={cn("flex flex-row gap-4 w-full justify-center", 
                deviceInfo.isSmallMobile ? "mt-3" : "mt-4"
              )}
            >
              <Link href="#about">
                <InteractiveHoverButton 
                  className={cn(
                    "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl",
                    deviceInfo.isSmallMobile 
                      ? "px-4 py-2 text-sm" 
                      : deviceInfo.isMediumMobile 
                      ? "px-6 py-2.5 text-sm" 
                      : "px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base"
                  )}
                >
                  About Me
                </InteractiveHoverButton>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced desktop image container */}
        {deviceInfo.isDesktop && (
          <motion.div
            className="container px-6 relative z-10 flex-col items-center hidden md:flex"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="relative group"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="floating-image">
                <div className="image-card">
                  <OptimizedImage
                    src="/profile_hero.jpg"
                    alt="Profile"
                    width={800}
                    height={800}
                    isLCP={true}
                    className="relative z-10 w-full max-w-xs drop-shadow-2xl rounded-2xl"
                    priority
                  />
                </div>
              </div>
              <FloatingBadges shouldReduceMotion={shouldReduceMotion} />
            </motion.div>
          </motion.div>
        )}

        {/* Enhanced scroll indicator */}
        <ScrollIndicator 
          hasScrolled={hasScrolled}
          deviceInfo={deviceInfo}
          onScroll={scrollToNextSection}
          shouldReduceMotion={shouldReduceMotion}
        />
      </div>
      </section>
      
      <div ref={nextSectionRef} className="h-0 w-full" />
    </>
  );
}

// Enhanced Glowing Orbs with device-specific optimizations
function GlowingOrbs({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  return (
    <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={`orb-${index}`}
          className="absolute rounded-full blur-3xl"
          style={{
            background: index === 0 
              ? "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0) 70%)"
              : index === 1
              ? "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(168, 85, 247, 0) 70%)"
              : "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(99, 102, 241, 0) 70%)",
            width: `${Math.random() * 20 + 15}vh`,
            height: `${Math.random() * 20 + 15}vh`,
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          animate={shouldReduceMotion ? {} : {
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

// Enhanced mobile effects with device-specific optimizations
function SimpleMobileEffects({ 
  deviceInfo, 
  shouldReduceMotion 
}: { 
  deviceInfo: DeviceInfo; 
  shouldReduceMotion: boolean 
}) {
  const skillsPosition = useMemo(() => {
    if (deviceInfo.isSmallMobile) {
      return deviceInfo.orientation === 'landscape' ? 'bottom-20' : 'bottom-32';
    }
    if (deviceInfo.isMediumMobile) {
      return deviceInfo.orientation === 'landscape' ? 'bottom-24' : 'bottom-36';
    }
    if (deviceInfo.isLargeMobile) {
      return deviceInfo.orientation === 'landscape' ? 'bottom-28' : 'bottom-40';
    }
    return 'bottom-40';
  }, [deviceInfo]);

  const skillItemClass = useMemo(() => {
    if (deviceInfo.isSmallMobile) {
      return 'px-2 py-1 text-xs';
    }
    if (deviceInfo.isMediumMobile) {
      return 'px-2.5 py-1.5 text-xs';
    }
    return 'px-3 py-1.5 text-sm';
  }, [deviceInfo]);

  return (
    <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-purple-950/10" />
      
      {/* Device-specific floating elements */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0">
          {/* Enhanced floating dots with device-specific positioning */}
          {Array.from({ length: deviceInfo.isSmallMobile ? 2 : 3 }).map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
              style={{
                left: `${20 + (i * (deviceInfo.isSmallMobile ? 35 : 30))}%`,
                top: `${30 + (i * (deviceInfo.isSmallMobile ? 25 : 20))}%`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Enhanced skill indicators with device-specific styling */}
      <div className={cn(
        "absolute inset-x-0 flex justify-center gap-3", 
        skillsPosition,
        deviceInfo.isSmallMobile ? "px-2" : "px-4"
      )}>
        {["React", "Python", "AI"].map((skill, index) => (
          <div
            key={`skill-${index}`}
            className={cn(
              "bg-white/10 backdrop-blur-sm rounded-full border border-blue-300/20 text-white/80 font-medium",
              skillItemClass
            )}
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}

// Desktop-only Floating Badges
function FloatingBadges({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const badges = [
    { name: "React", icon: "devicon-react-original", color: "#61DAFB", position: "top-4 right-4" },
    { name: "Python", icon: "devicon-python-plain", color: "#3776AB", position: "bottom-4 left-4" },
    { name: "Code", icon: "devicon-visualstudio-plain", color: "#5C2D91", position: "top-1/2 -left-4" }
  ];

  return (
    <div className="floating-badges">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.name}
          className={`absolute ${badge.position} bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20 text-white font-medium shadow-lg flex items-center gap-2`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
          whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -5 }}
        >
          <i className={`${badge.icon} text-lg`} style={{ color: badge.color }} />
          <span className="text-sm">{badge.name}</span>
        </motion.div>
      ))}
    </div>
  );
}

// Enhanced Scroll Indicator with device-specific optimizations
function ScrollIndicator({ 
  hasScrolled, 
  deviceInfo, 
  onScroll, 
  shouldReduceMotion
}: { 
  hasScrolled: boolean;
  deviceInfo: DeviceInfo;
  onScroll: () => void;
  shouldReduceMotion: boolean;
}) {
  const getScrollButtonPosition = useMemo(() => {
    if (deviceInfo.isSmallMobile) {
      return deviceInfo.orientation === 'landscape' ? 'bottom-8' : 'bottom-12';
    }
    if (deviceInfo.isMediumMobile) {
      return deviceInfo.orientation === 'landscape' ? 'bottom-10' : 'bottom-14';
    }
    if (deviceInfo.isLargeMobile) {
      return deviceInfo.orientation === 'landscape' ? 'bottom-12' : 'bottom-16';
    }
    return 'bottom-16';
  }, [deviceInfo]);

  const getScrollButtonSize = useMemo(() => {
    if (deviceInfo.isSmallMobile) {
      return { container: 'w-9 h-9', icon: 'h-4 w-4' };
    }
    if (deviceInfo.isMediumMobile) {
      return { container: 'w-10 h-10', icon: 'h-4 w-4' };
    }
    if (deviceInfo.isLargeMobile) {
      return { container: 'w-11 h-11', icon: 'h-5 w-5' };
    }
    return { container: 'w-12 h-12', icon: 'h-5 w-5' };
  }, [deviceInfo]);

  return (
    <>
      {/* Enhanced scroll button with device-specific optimizations */}
      <motion.div 
        className={cn(
          "absolute left-1/2 transform -translate-x-1/2 z-20",
          getScrollButtonPosition
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-full  bg-black/10 hover:bg-black/20 border-black/20  dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-sm border dark:border-white/20 text-gray-800 dark:text-white transition-all duration-300 touch-manipulation",
            getScrollButtonSize.container
          )}
          onClick={onScroll}
          style={{ 
            animation: shouldReduceMotion || deviceInfo.isMobile ? 'none' : 'bounce 2s infinite',
            WebkitTapHighlightColor: 'transparent' // Remove tap highlight on mobile
          }}
        >
          <ChevronDown className={getScrollButtonSize.icon} />
        </Button>
      </motion.div>
      
      {/* Enhanced progress indicator - tablet and desktop only */}
      {!deviceInfo.isMobile && (
        <div className="absolute bottom-6 left-0 w-full z-10 flex justify-center pointer-events-none">
          <div 
            className="h-0.5 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent rounded-full transition-all duration-500"
            style={{ 
              width: hasScrolled ? "40%" : "20%",
              opacity: hasScrolled ? 0.3 : 0.6
            }}
          />
        </div>
      )}
    </>
  );
}