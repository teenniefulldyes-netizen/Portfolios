// components/OptimizedCSSLoader.tsx
'use client';

import { useEffect, useState } from 'react';

interface CSSResource {
  href: string;
  media?: string;
  priority: 'high' | 'low';
}

const CSS_RESOURCES: CSSResource[] = [
  {
    href: 'https://cdn.jsdelivr.net/npm/devicon@latest/devicon.min.css',
    media: 'print',
    priority: 'low'
  }
];

export default function OptimizedCSSLoader() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Load CSS เมื่อ user เริ่มมี interaction
    const handleInteraction = () => {
      setIsVisible(true);
      // Remove event listeners หลังจากโหลดแล้ว
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    // เช็คว่า user มี interaction หรือไม่
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Fallback หลัง 2 วินาที

    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('mousemove', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // โหลด CSS แบบ asynchronous
    CSS_RESOURCES.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = resource.href;
      link.media = resource.media || 'all';
      
      // เปลี่ยน media เป็น 'all' หลังจากโหลดเสร็จ
      if (resource.media === 'print') {
        link.onload = () => {
          link.media = 'all';
        };
      }
      
      document.head.appendChild(link);
    });
  }, [isVisible]);

  return null;
}

// Hook สำหรับตรวจจับ intersection
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '100px',
      ...options
    });

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef, options]);

  return isIntersecting;
}