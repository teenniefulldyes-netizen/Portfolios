import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import NavBar from "@/components/NavBar/NavBar";
import { PerformanceOptimization } from "./performance-optimization";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense, lazy } from "react";


const kanit = Kanit({
  weight: ["400", "500"], 
  subsets: ["latin", "thai"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  variable: '--font-kanit', 
});

const OptimizedScripts = lazy(() => import("@/components/OptimizedScripts"));
const AosProvider = lazy(() => import("./AosProvider"));

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Portfolio | Teennie AI engineering",
    template: "%s | teenie",
  },
  description: "ตั้งเอาเองง้าบบ",
  keywords: ["Next.js", "Tailwind", "React", "Web App", "Sirxyuth",  "Devoxia"],
  authors: [{ name: "Thumthakorn Wanghamklang", url: "https://domain.com" }],
  creator: "Thumthakorn Wanghamklang",
  
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  
  openGraph: {
    title: "Portfolio | Teennie AI engineering",
    description: "ตั้งเอาเองน้าา",
    url: "https://domain.com",
    siteName: "thumthakorn Portfolio",
    images: [
      {
        url: "https://domain.com/image", // เปลี่ยนเป็น WebP
        width: 1200,
        height: 630,
        alt: "Thumthakorn Portfolio Preview",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Teennie AI engineering",
    description: "ยินดีต้อนรับสู่พอร์ตโฟลิโอของ Thumthakorn",
    creator: "@thumthakorn",
    images: ["https://domain.com/image-url"],
  },
  
  metadataBase: new URL("https://domain.com"),
  
  // เพิ่ม robots และ verification
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link 
          rel="preconnect" 
          href="https://cdn.jsdelivr.net" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="dns-prefetch" 
          href="https://cdn.jsdelivr.net" 
        />
        
        {/* Critical resource preloads */}

        
        {/* Inline critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical above-the-fold styles */
            body { font-family: var(--font-kanit), system-ui, sans-serif; }
            .loading-skeleton { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: loading 1.5s infinite; }
            @keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
          `
        }} />
        
        {/* Preload important fonts */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/kanit/v15/nKKZ-Go6G5tXcoaSEQGodLxA.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      
      <body className={`${kanit.className} ${kanit.variable} antialiased`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem 
          disableTransitionOnChange
        >
          <SpeedInsights />
          {/* Performance monitoring component */}
          <PerformanceOptimization />
          
          {/* Critical above-the-fold components */}
          <NavBar />
          
          {/* Main content with loading boundary */}
          <main>
            <ScrollProgress />
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="loading-skeleton w-full h-96 rounded-lg mx-4" />
              </div>
            }>
              {children}
            </Suspense>
          </main>
          
          {/* Lazy load non-critical components */}
          <Suspense fallback={null}>
            <AosProvider>
              <div /> {/* AOS จะ wrap ใน component ลูก */}
            </AosProvider>
          </Suspense>
          
          <Suspense fallback={null}>
            <OptimizedScripts />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}