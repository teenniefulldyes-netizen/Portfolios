'use client';

import { useEffect, useState } from 'react';

export default function StylesheetLoader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Delay non-critical stylesheet loading to improve LCP
    const loadStylesheet = () => {
      // Create a link element
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
      
      // Use print media to prevent blocking render
      link.media = 'print';
      
      // Add the load event listener
      link.onload = () => {
        // Switch to all media once loaded
        link.media = 'all';
        setIsLoaded(true);
      };
      
      // Append to head
      document.head.appendChild(link);
    };
    
    // Load after a small delay to prioritize LCP
    const timer = setTimeout(loadStylesheet, 1000);
    
    // Clean up
    return () => {
      clearTimeout(timer);
      const link = document.querySelector('link[href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"]');
      if (link) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return null;
} 