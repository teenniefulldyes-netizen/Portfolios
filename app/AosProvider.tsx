"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AosProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    AOS.init({
      duration: 800,
      once: false,
      mirror: false,
      offset: 50,
      easing: 'ease-in-out',
      // Disable AOS on mobile devices
      // disable: window.innerWidth < 768,
    });

    // Add refresh on window resize
    window.addEventListener('resize', () => {
      AOS.refresh();
    });

    return () => {
      window.removeEventListener('resize', () => {
        AOS.refresh();
      });
    };
  }, []);

  // Don't render children until mounted on client
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}