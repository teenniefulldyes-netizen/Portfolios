import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import { motion } from "framer-motion";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import NavBar from "@/components/NavBar/NavBar";
import { PerformanceOptimization } from "./performance-optimization";
import OptimizedScripts from "@/components/OptimizedScripts";
import StylesheetLoader from "@/components/StylesheetLoader";
import AosProvider from "./AosProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const kanit = Kanit({
  weight: ["300", "400", "500"],
  subsets: ["latin", "thai"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
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
        <link 
          rel="preconnect" 
          href="https://cdn.jsdelivr.net" 
          crossOrigin="anonymous" 
        />
        <link
          rel="preload"
          href="/devoxia_2.png"
          as="image"
          type="image/png"
          fetchPriority="high"
          imageSizes="700px"
        />
      </head>
      <body
        className={`${kanit.className} antialiased`}
      >
        <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem disableTransitionOnChange>
          <AosProvider>

          <PerformanceOptimization />
          <OptimizedScripts />
          <StylesheetLoader />
          <NavBar />
          <main>
            <ScrollProgress/>
            {children}
          </main>
          </AosProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

