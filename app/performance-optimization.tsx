'use client';

import { useEffect } from 'react';

export function PerformanceOptimization() {
  useEffect(() => {
    // Add Resource Hints for common third-party domains
    if (typeof window !== 'undefined' && document) {
      // Set up priority hints
      const observer = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          // Log LCP for debugging
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
            // Cast entry to LargestContentfulPaint type which has the element property
            const lcpEntry = entry as PerformanceEntry & { element: Element };
            console.log('LCP element:', lcpEntry.element);
          }
        });
      });
      
      // Observe LCP
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      
      const resourceHints = [
        { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      ];
      
      // Preload critical images with size hints for better performance
      const criticalResources = [
        { 
          rel: 'preload', 
          href: '/devoxia_2.png', 
          as: 'image', 
          type: 'image/png', 
          fetchPriority: 'high',
          imageSizes: '700px'
        },
      ];
      
      // Add resource hints
      resourceHints.forEach(hint => {
        // Skip if already exists
        if (document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`)) return;
        
        const link = document.createElement('link');
        link.rel = hint.rel;
        link.href = hint.href;
        if (hint.crossOrigin) link.crossOrigin = hint.crossOrigin;
        document.head.appendChild(link);
      });
      
      // Add critical resources
      criticalResources.forEach(resource => {
        // Skip if already exists
        if (document.querySelector(`link[rel="${resource.rel}"][href="${resource.href}"]`)) return;
        
        const link = document.createElement('link');
        link.rel = resource.rel;
        link.href = resource.href;
        link.as = resource.as;
        if (resource.type) link.type = resource.type;
        if (resource.fetchPriority) link.setAttribute('fetchPriority', resource.fetchPriority);
        if (resource.imageSizes) link.setAttribute('imageSizes', resource.imageSizes);
        document.head.appendChild(link);
      });
      
      // Use native lazy loading for non-critical images
      document.querySelectorAll('img:not([loading])').forEach(img => {
        if (!img.hasAttribute('priority') && !img.hasAttribute('data-priority')) {
          // Cast to HTMLImageElement to access the loading property
          (img as HTMLImageElement).loading = 'lazy';
        }
      });
    }
  }, []);
  
  return null;
} 
