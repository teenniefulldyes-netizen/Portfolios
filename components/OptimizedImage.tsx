'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  mobileSrc?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  isLCP?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  mobileSrc,
  width,
  height,
  priority = false,
  isLCP = false
}: OptimizedImageProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile with more detailed breakpoints
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallMobile(window.innerWidth < 400);
    };
    
    // Initial check
    checkDeviceSize();
    
    // Listen for resize events
    window.addEventListener('resize', checkDeviceSize);
    
    return () => {
      window.removeEventListener('resize', checkDeviceSize);
    };
  }, []);

  const imageSrc = isMobile && mobileSrc ? mobileSrc : src;
  
  // Determine image type based on extension
  const isLocalImage = !imageSrc.startsWith('http');
  
  // Adjust width and height for small mobile devices
  const mobileAdjustedWidth = isSmallMobile ? Math.floor(width ? width * 0.8 : 200) : width;
  const mobileAdjustedHeight = isSmallMobile ? Math.floor(height ? height * 0.8 : 200) : height;
  
  // Different sizes for responsive design
  const responsiveSizes = isLCP 
    ? "(max-width: 400px) 80vw, (max-width: 768px) 90vw, 3700px"
    : "(max-width: 400px) 80vw, (max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw";
  
  // LCP images should always use these settings for best performance
  const lcpImageProps = isLCP ? {
    priority: true,
    loading: 'eager' as const,
    fetchPriority: 'high' as const,
    quality: 95,
    sizes: responsiveSizes,
  } : {};
  
  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        width={isMobile ? mobileAdjustedWidth : width}
        height={isMobile ? mobileAdjustedHeight : height}
        priority={isLCP ? true : priority}
        loading={isLCP ? 'eager' : priority ? 'eager' : 'lazy'}
        fetchPriority={isLCP ? 'high' : priority ? 'high' : 'auto'}
        sizes={responsiveSizes}
        quality={isLCP ? 95 : 80}
        className={className}
        placeholder={isLocalImage && (isLCP || priority) ? 'blur' : undefined}
        blurDataURL={isLocalImage && (isLCP || priority) ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2U7zWawAAAABJRU5ErkJggg==' : undefined}
        {...lcpImageProps}
      />
    </div>
  );
} 