import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import dynamic from 'next/dynamic';
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { PerformanceOptimization } from "./performance-optimization";

// Dynamically import non-critical components
const NavBar = dynamic(() => import("@/components/NavBar/NavBar"), {
  ssr: true,
  loading: () => <div style={{ height: '64px' }} /> // Prevent layout shift
});

const OptimizedScripts = dynamic(() => import("@/components/OptimizedScripts"), { ssr: false });
const StylesheetLoader = dynamic(() => import("@/components/StylesheetLoader"), { ssr: false });
const AosProvider = dynamic(() => import("./AosProvider"), { ssr: false });

// Optimize font loading
const kanit = Kanit({
  weight: ["300", "400", "500"],
  subsets: ["latin", "thai"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true, // Prevents layout shift
  variable: '--font-kanit',
});

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
    default: "Sirayuth | นักพัฒนาเว็บและนักศึกษารุ่นใหม่",
    template: "%s Sirayuth | นักพัฒนาเว็บและนักศึกษารุ่นใหม่",
  },
  description: "ยินดีต้อนรับสู่พอร์ตโฟลิโอของ Sirayuth - นักพัฒนาและนักออกแบบที่มีความเชี่ยวชาญในการสร้างประสบการณ์ดิจิทัลที่สวยงาม ตอบโจทย์ และใช้งานง่าย ด้วยเทคโนโลยีล่าสุด",
  keywords: ["Next.js", "Tailwind", "React", "Web App", "Sirayuth", "Sirayuth Naensing", "Siraxuth", "Devoxia"],
  authors: [{ name: "Sirayuth", url: "https://siraxuth.xyz" }],
  creator: "Sirayuth Naensing",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  openGraph: {
    title: "Sirayuth | นักพัฒนาเว็บและนักศึกษารุ่นใหม่",
    description: "ยินดีต้อนรับสู่พอร์ตโฟลิโอของ Sirayuth - นักพัฒนาและนักออกแบบที่มีความเชี่ยวชาญในการสร้างประสบการณ์ดิจิทัลที่สวยงาม ตอบโจทย์ และใช้งานง่าย ด้วยเทคโนโลยีล่าสุด",
    url: "https://siraxuth.xyz",
    siteName: "Sirayuth | นักพัฒนาเว็บและนักศึกษารุ่นใหม่",
    images: [
      {
        url: "https://siraxuth.xyz/devoxai.png",
        alt: "Sirayuth | นักพัฒนาเว็บและนักศึกษารุ่นใหม่ Preview",
      },
    ],
    locale: "th_TH",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sirayuth | นักพัฒนาเว็บและนักศึกษารุ่นใหม่",
    description: "ยินดีต้อนรับสู่พอร์ตโฟลิโอของ Sirayuth - นักพัฒนาและนักออกแบบที่มีความเชี่ยวชาญในการสร้างประสบการณ์ดิจิทัลที่สวยงาม ตอบโจทย์ และใช้งานง่าย ด้วยเทคโนโลยีล่าสุด",
    creator: "@siraxuth",
    images: ["https://siraxuth.xyz/devoxai.png"],
  },

  metadataBase: new URL("https://siraxuth.xyz"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        {/* Resource hints for critical resources */}
        <link 
          rel="preconnect" 
          href="https://cdn.jsdelivr.net" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="dns-prefetch" 
          href="https://cdn.jsdelivr.net"
        />
        
        {/* Preload critical images */}
        <link
          rel="preload"
          href="/devoxia_2.png"
          as="image"
          type="image/png"
          fetchPriority="high"
          imageSizes="700px"
        />

        {/* Add resource hints for fonts */}
        <link
          rel="preload"
          href={kanit.url}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${kanit.variable} font-sans antialiased`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          <AosProvider>
            <PerformanceOptimization />
            <OptimizedScripts />
            <StylesheetLoader />
            <NavBar />
            <main className="relative">
              <ScrollProgress/>
              {children}
            </main>
          </AosProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

