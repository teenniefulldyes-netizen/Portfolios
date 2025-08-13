'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface ResponsiveImageProps extends Omit<ImageProps, 'src'> {
  mobileSrc?: string;
  desktopSrc: string;
  alt: string;
  mobileBreakpoint?: number;
}

export default function ResponsiveImage({
  mobileSrc,
  desktopSrc,
  alt,
  mobileBreakpoint = 768,
  ...props
}: ResponsiveImageProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for screen size changes
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [mobileBreakpoint]);

  // Use desktop src by default when SSR rendering or mobile src not provided
  const imageSrc = isMounted && isMobile && mobileSrc ? mobileSrc : desktopSrc;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      loading="lazy"
      quality={isMobile ? 80 : 90}
      {...props}
    />
  );
} 