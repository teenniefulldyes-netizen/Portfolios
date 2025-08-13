import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cacheStaticAssets } from './lib/cache-control';

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  
  // Get existing response to modify
  const response = NextResponse.next({
    request: {
      // Apply the headers to the request
      headers: requestHeaders,
    },
  });
  
  // Add cache control headers for static assets
  const cacheControl = cacheStaticAssets(request);
  if (cacheControl) {
    response.headers.set('Cache-Control', cacheControl);
  }
  
  // Add security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  
  // Apply special performance optimizations for homepage
  const url = request.nextUrl.pathname;
  
  if (url === '/' || url === '/index') {
    // Set priority hints for critical assets on homepage
    response.headers.set('Link', '</devoxia_2.png>; rel=preload; as=image; fetchpriority=high');
    
    // Use early hints where supported
    response.headers.set('103-Early-Hints', 'true');
    
    // Set specific caching for homepage
    response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=240, stale-while-revalidate=3600');
  }
  
  // Add content security policy (CSP) - customize as needed
  response.headers.set(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.jsdelivr.net *.googletagmanager.com; style-src 'self' 'unsafe-inline' cdn.jsdelivr.net fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' fonts.gstatic.com cdn.jsdelivr.net; connect-src 'self' *.vercel-insights.com *.google-analytics.com; frame-src 'self' *.youtube.com;`
  );
  
  // Add permissions policy
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(self), interest-cohort=()'
  );
  
  // Enable Save-Data for mobile optimization
  if (request.headers.get('Save-Data')) {
    // Add header to signal that Save-Data mode is active
    response.headers.set('X-Save-Data-Mode', 'on');
  }
  
  return response;
}

// Define which paths this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public folder)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /sitemap.xml (static files)
     */
    '/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)',
  ],
}; 