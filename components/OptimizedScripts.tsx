'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function OptimizedScripts() {
  useEffect(() => {
    // Delay loading non-critical resources
    const loadNonCriticalResources = () => {
      // Load devicon after initial page render
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.js";
      script.async = true;
      document.body.appendChild(script);
    };

    // Use requestIdleCallback to load during browser idle time
    if ('requestIdleCallback' in window) {
      // @ts-ignore - Safari compatibility
      window.requestIdleCallback(loadNonCriticalResources);
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(loadNonCriticalResources, 2000);
    }
  }, []);

  return (
    <>
      {/* Google Analytics script with optimal loading strategy */}
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />

          <Script strategy="afterInteractive" id="ga-script">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
    </>
  );
} 