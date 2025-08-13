'use client';

import { useState, useEffect } from 'react';

export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    // Set the initial value
    setMatches(mediaQuery.matches);
    
    // Define a callback function to handle changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add the callback as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleChange);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);
  
  return matches;
}

// Common media query breakpoints
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
  
  // Device specific
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  
  // Orientation
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
  
  // Reduced motion preference
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
  
  // Dark mode preference
  prefersDarkMode: '(prefers-color-scheme: dark)',
  prefersLightMode: '(prefers-color-scheme: light)',
}; 