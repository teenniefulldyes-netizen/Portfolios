import type { NextRequest } from 'next/server';

type CacheControlOptions = {
  maxAge?: number;        // Browser cache (in seconds)
  sMaxAge?: number;       // CDN cache (in seconds)
  staleWhileRevalidate?: number;  // Stale while revalidate period (in seconds)
  mustRevalidate?: boolean;  // Force revalidation when maxAge expires
};

/**
 * Create a cache control header value for Next.js API routes and pages
 */
export function createCacheControlHeader({
  maxAge = 60,          // 1 minute default for browser cache
  sMaxAge = 60 * 5,     // 5 minutes default for CDN cache
  staleWhileRevalidate = 60 * 60 * 24, // 1 day default for stale-while-revalidate
  mustRevalidate = false,
}: CacheControlOptions = {}): string {
  const directives = [
    'public',
    `max-age=${maxAge}`,
    `s-maxage=${sMaxAge}`,
    `stale-while-revalidate=${staleWhileRevalidate}`,
  ];

  if (mustRevalidate) {
    directives.push('must-revalidate');
  }

  return directives.join(', ');
}

/**
 * Apply cache control headers for static assets
 */
export function cacheStaticAssets(request: NextRequest) {
  // Define cache times based on asset type
  const assetTypes = {
    image: {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sMaxAge: 60 * 60 * 24 * 365, // 1 year
    },
    font: {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sMaxAge: 60 * 60 * 24 * 365, // 1 year
    },
    css: {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sMaxAge: 60 * 60 * 24 * 30, // 30 days
    },
    js: {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sMaxAge: 60 * 60 * 24 * 30, // 30 days
    },
  };

  // Check URL path to determine asset type
  const url = request.nextUrl.pathname;
  let cacheControl = '';

  if (/\.(jpe?g|png|gif|svg|webp|avif|ico)$/i.test(url)) {
    cacheControl = createCacheControlHeader(assetTypes.image);
  } else if (/\.(woff2?|eot|ttf|otf)$/i.test(url)) {
    cacheControl = createCacheControlHeader(assetTypes.font);
  } else if (/\.css$/i.test(url)) {
    cacheControl = createCacheControlHeader(assetTypes.css);
  } else if (/\.js$/i.test(url)) {
    cacheControl = createCacheControlHeader(assetTypes.js);
  }

  return cacheControl;
} 